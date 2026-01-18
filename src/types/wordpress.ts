// WordPress API Response Types
export interface WPPost {
    id: number;
    date: string;
    date_gmt: string;
    modified: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    title: {
        rendered: string;
    };
    content: {
        rendered: string;
        protected: boolean;
    };
    excerpt: {
        rendered: string;
        protected: boolean;
    };
    author: number;
    featured_media: number;
    comment_status: string;
    categories: number[];
    tags: number[];
    _embedded?: {
        author?: WPAuthor[];
        'wp:featuredmedia'?: WPMedia[];
        'wp:term'?: WPCategory[][];
    };
}

export interface WPAuthor {
    id: number;
    name: string;
    url: string;
    description: string;
    link: string;
    slug: string;
    avatar_urls: {
        [key: string]: string;
    };
}

export interface WPMedia {
    id: number;
    date: string;
    slug: string;
    type: string;
    link: string;
    title: {
        rendered: string;
    };
    author: number;
    caption: {
        rendered: string;
    };
    alt_text: string;
    media_type: string;
    mime_type: string;
    media_details: {
        width: number;
        height: number;
        file: string;
        sizes: {
            [key: string]: {
                file: string;
                width: number;
                height: number;
                mime_type: string;
                source_url: string;
            };
        };
    };
    source_url: string;
}

export interface WPCategory {
    id: number;
    count: number;
    description: string;
    link: string;
    name: string;
    slug: string;
    taxonomy: string;
    parent: number;
}

export interface WPTag {
    id: number;
    count: number;
    description: string;
    link: string;
    name: string;
    slug: string;
    taxonomy: string;
}

export interface Category {
    name: string;
    slug: string;
    children?: Category[];
}

// Application Post Type (transformed from WordPress)
export interface Post {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    author: string;
    image: string;
    category: string;
    categorySlug: string;
    imageCaption?: string;
}
