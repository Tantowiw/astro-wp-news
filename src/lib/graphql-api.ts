import { graphqlClient, GET_POSTS_QUERY, GET_POST_BY_SLUG_QUERY, SEARCH_POSTS_QUERY, GET_POSTS_BY_CATEGORY_QUERY, GET_HOMEPAGE_DATA_QUERY, GET_CATEGORIES_QUERY } from './graphql-client';
import type { Post } from '../types/wordpress';

export interface Category {
    id: string;
    name: string;
    slug: string;
    count: number;
    parent?: {
        node: {
            name: string;
            slug: string;
        }
    };
}

// Simple server-side cache
const cache = new Map<string, { data: any, timestamp: number }>();
const CACHE_TTL = 60 * 1000; // 1 minute cache for development

async function cachedRequest(query: string, variables: any = {}) {
    const key = JSON.stringify({ query, variables });
    const cached = cache.get(key);
    const now = Date.now();

    if (cached && now - cached.timestamp < CACHE_TTL) {
        return cached.data;
    }

    const data = await graphqlClient.request(query, variables);
    cache.set(key, { data, timestamp: now });
    return data;
}

/**
 * Strip HTML tags from string
 */
function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '').trim();
}

/**
 * Transform GraphQL post to application Post format
 */
function transformGraphQLPost(node: any): Post {
    return {
        id: node.databaseId,
        slug: node.slug,
        title: stripHtml(node.title || ''),
        excerpt: stripHtml(node.excerpt || ''),
        content: node.content || '',
        date: node.date,
        author: node.author?.node?.name || 'Admin',
        image: node.featuredImage?.node?.sourceUrl || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80&w=2000',
        imageCaption: node.featuredImage?.node?.caption ? node.featuredImage.node.caption.replace(/<[^>]*>/g, '').trim() : 'Ilustrasi',
        category: node.categories?.nodes?.[0]?.name || 'Uncategorized',
        categorySlug: node.categories?.nodes?.[0]?.slug || 'uncategorized',
    };
}

/**
 * Fetch all homepage data in one request
 */
export async function fetchHomepageDataGraphQL(): Promise<{
    featured: Post | null;
    latest: Post[];
    popular: Post[];
    sorotan: Post[];
    beritaTerkini: Post[];
    ragam: Post[];
    pemkabKotim: Post[];
    palangkaraya: Post[];
    politik: Post[];
}> {
    try {
        const data: any = await cachedRequest(GET_HOMEPAGE_DATA_QUERY);

        const allPosts = (data.allPosts?.nodes || []).map(transformGraphQLPost);

        return {
            featured: allPosts[0] || null,
            latest: allPosts.slice(0, 6),
            popular: (data.popular?.nodes || []).map(transformGraphQLPost),
            sorotan: allPosts.slice(6, 12),
            beritaTerkini: allPosts.slice(0, 15),
            ragam: (data.ragam?.nodes || []).map(transformGraphQLPost),
            pemkabKotim: (data.pemkabKotim?.nodes || []).map(transformGraphQLPost),
            palangkaraya: (data.palangkaraya?.nodes || []).map(transformGraphQLPost),
            politik: (data.politik?.nodes || []).map(transformGraphQLPost),
        };
    } catch (error: any) {
        console.error('Error fetching homepage data from GraphQL:', error);
        if (error.response) {
            console.error('GraphQL Response Errors:', JSON.stringify(error.response.errors, null, 2));
        }
        throw error;
    }
}

/**
 * Fetch categories using GraphQL
 */
export async function fetchCategoriesGraphQL(): Promise<Category[]> {
    try {
        const data: any = await cachedRequest(GET_CATEGORIES_QUERY);
        return data.categories.nodes || [];
    } catch (error) {
        console.error('Error fetching categories from GraphQL:', error);
        return [];
    }
}

/**
 * Fetch posts using GraphQL
 */
export async function fetchPostsGraphQL(first: number = 10): Promise<Post[]> {
    try {
        const data: any = await cachedRequest(GET_POSTS_QUERY, { first });
        return data.posts.nodes.map(transformGraphQLPost);
    } catch (error) {
        console.error('Error fetching posts from GraphQL:', error);
        return [];
    }
}

/**
 * Fetch single post by slug using GraphQL
 */
export async function fetchPostBySlugGraphQL(slug: string): Promise<Post | null> {
    try {
        const data: any = await cachedRequest(GET_POST_BY_SLUG_QUERY, { slug });

        if (!data.post) {
            return null;
        }

        return transformGraphQLPost(data.post);
    } catch (error) {
        console.error('Error fetching post by slug from GraphQL:', error);
        return null;
    }
}

/**
 * Search posts using GraphQL
 */
export async function searchPostsGraphQL(query: string): Promise<Post[]> {
    try {
        const data: any = await cachedRequest(SEARCH_POSTS_QUERY, {
            search: query,
            first: 20
        });
        return data.posts.nodes.map(transformGraphQLPost);
    } catch (error) {
        console.error('Error searching posts from GraphQL:', error);
        return [];
    }
}

/**
 * Get posts by category using GraphQL
 */
export async function fetchPostsByCategoryGraphQL(categoryName: string, first: number = 20): Promise<Post[]> {
    try {
        const data: any = await cachedRequest(GET_POSTS_BY_CATEGORY_QUERY, {
            categoryName,
            first
        });
        return data.posts.nodes.map(transformGraphQLPost);
    } catch (error) {
        console.error('Error fetching posts by category from GraphQL:', error);
        return [];
    }
}

/**
 * Get featured post (most recent)
 */
export async function fetchFeaturedPostGraphQL(): Promise<Post | null> {
    const posts = await fetchPostsGraphQL(1);
    return posts[0] || null;
}

/**
 * Get latest posts
 */
export async function fetchLatestPostsGraphQL(count: number = 6): Promise<Post[]> {
    return fetchPostsGraphQL(count);
}

/**
 * Get popular posts (by comment count - not available in basic GraphQL, using latest as fallback)
 */
export async function fetchPopularPostsGraphQL(count: number = 5): Promise<Post[]> {
    return fetchPostsGraphQL(count);
}
