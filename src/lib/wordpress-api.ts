import type { WPPost, Post } from '../types/wordpress';

const WORDPRESS_API_URL = import.meta.env.WORDPRESS_API_URL || 'https://catatan.co.id/wp-json/wp/v2';

/**
 * Strip HTML tags from string
 */
function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '').trim();
}

/**
 * Transform WordPress post to application Post format
 */
export function transformPost(wpPost: WPPost): Post {
    const author = wpPost._embedded?.author?.[0]?.name || 'Admin';
    const featuredImage = wpPost._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
        'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80&w=2000';
    const category = wpPost._embedded?.['wp:term']?.[0]?.[0]?.name || 'Uncategorized';

    return {
        id: wpPost.id,
        slug: wpPost.slug,
        title: stripHtml(wpPost.title.rendered),
        excerpt: stripHtml(wpPost.excerpt.rendered),
        content: wpPost.content.rendered,
        date: wpPost.date,
        author,
        image: featuredImage,
        category,
    };
}

/**
 * Fetch posts from WordPress API
 */
export async function fetchPosts(params: {
    per_page?: number;
    page?: number;
    categories?: string;
    orderby?: string;
    order?: 'asc' | 'desc';
    search?: string;
} = {}): Promise<Post[]> {
    const queryParams = new URLSearchParams({
        _embed: 'true',
        per_page: (params.per_page || 10).toString(),
        page: (params.page || 1).toString(),
        orderby: params.orderby || 'date',
        order: params.order || 'desc',
        ...(params.categories && { categories: params.categories }),
        ...(params.search && { search: params.search }),
    });

    try {
        const response = await fetch(`${WORDPRESS_API_URL}/posts?${queryParams}`);

        if (!response.ok) {
            throw new Error(`WordPress API error: ${response.status}`);
        }

        const wpPosts: WPPost[] = await response.json();
        return wpPosts.map(transformPost);
    } catch (error) {
        console.error('Error fetching posts from WordPress:', error);
        return [];
    }
}

/**
 * Fetch single post by slug
 */
export async function fetchPostBySlug(slug: string): Promise<Post | null> {
    try {
        const response = await fetch(`${WORDPRESS_API_URL}/posts?slug=${slug}&_embed=true`);

        if (!response.ok) {
            throw new Error(`WordPress API error: ${response.status}`);
        }

        const wpPosts: WPPost[] = await response.json();

        if (wpPosts.length === 0) {
            return null;
        }

        return transformPost(wpPosts[0]);
    } catch (error) {
        console.error('Error fetching post by slug:', error);
        return null;
    }
}

/**
 * Search posts
 */
export async function searchPosts(query: string): Promise<Post[]> {
    return fetchPosts({ search: query, per_page: 20 });
}

/**
 * Get featured post (most recent post)
 */
export async function fetchFeaturedPost(): Promise<Post | null> {
    const posts = await fetchPosts({ per_page: 1 });
    return posts[0] || null;
}

/**
 * Get latest posts
 */
export async function fetchLatestPosts(count: number = 6): Promise<Post[]> {
    return fetchPosts({ per_page: count });
}

/**
 * Get popular posts (by comment count)
 */
export async function fetchPopularPosts(count: number = 5): Promise<Post[]> {
    // WordPress doesn't have a direct "popular" endpoint
    // We'll use comment_count as a proxy for popularity
    const posts = await fetchPosts({ per_page: count * 2, orderby: 'comment_count' });
    return posts.slice(0, count);
}

/**
 * Get posts by category
 */
export async function fetchPostsByCategory(categorySlug: string, count: number = 10): Promise<Post[]> {
    try {
        // First, get the category ID by slug
        const categoryResponse = await fetch(`${WORDPRESS_API_URL}/categories?slug=${categorySlug}`);
        const categories = await categoryResponse.json();

        if (categories.length === 0) {
            return [];
        }

        const categoryId = categories[0].id;
        return fetchPosts({ categories: categoryId.toString(), per_page: count });
    } catch (error) {
        console.error('Error fetching posts by category:', error);
        return [];
    }
}
