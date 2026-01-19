import { GraphQLClient } from 'graphql-request';

const endpoint = import.meta.env.WORDPRESS_GRAPHQL_URL || 'https://catatan.co.id/graphql';

export const graphqlClient = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
  },
});

// GraphQL Queries
export const GET_POSTS_QUERY = `
  query GetPosts($first: Int = 10) {
    posts(first: $first, where: {orderby: {field: DATE, order: DESC}}) {
      nodes {
        id
        databaseId
        slug
        title
        excerpt
        content
        date
        author {
          node {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
            caption
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;

export const GET_POSTS_FROM_DATE_QUERY = `
  query GetPostsFromDate($first: Int = 10) {
    posts(first: $first, where: {orderby: {field: DATE, order: DESC}}) {
      nodes {
        id
        databaseId
        slug
        title
        excerpt
        content
        date
        author {
          node {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
            caption
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;

export const GET_POST_BY_SLUG_QUERY = `
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      databaseId
      slug
      title
      excerpt
      content
      date
      author {
        node {
          name
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      tags {
        nodes {
          name
        }
      }
    }
  }
`;

export const SEARCH_POSTS_QUERY = `
  query SearchPosts($search: String!, $first: Int = 20) {
    posts(first: $first, where: {search: $search}) {
      nodes {
        id
        databaseId
        slug
        title
        excerpt
        content
        date
        author {
          node {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
            caption
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;

export const GET_POSTS_BY_CATEGORY_QUERY = `
  query GetPostsByCategory($categoryName: String!, $first: Int = 20) {
    posts(first: $first, where: {categoryName: $categoryName}) {
      nodes {
        id
        databaseId
        slug
        title
        excerpt
        content
        date
        author {
          node {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
            caption
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;

export const GET_CATEGORIES_QUERY = `
  query GetCategories {
    categories(first: 100) {
      nodes {
        id
        name
        slug
        count
        parent {
          node {
            name
            slug
          }
        }
      }
    }
  }
`;

export const GET_HOMEPAGE_DATA_QUERY = `
  query GetHomepageData {
    # Ambil 50 post terbaru untuk dibagi ke berbagai section
    allPosts: posts(first: 50, where: {orderby: {field: DATE, order: DESC}}) {
      nodes {
        id
        databaseId
        slug
        title
        excerpt
        date
        author { node { name } }
        featuredImage { node { sourceUrl caption } }
        categories { nodes { name slug } }
      }
    }
    # Terpopuler
    popular: posts(first: 5, where: {orderby: {field: DATE, order: DESC}}) {
      nodes {
        id
        databaseId
        slug
        title
        date
        author { node { name } }
        categories { nodes { name slug } }
      }
    }
    ragam: posts(first: 3, where: {categoryName: "Ragam Dan Peristiwa"}) {
      nodes {
        id
        databaseId
        slug
        title
        date
        featuredImage { node { sourceUrl caption } }
        categories { nodes { name slug } }
      }
    }
    pemkabKotim: posts(first: 3, where: {categoryName: "Pemkab Kotim"}) {
      nodes {
        id
        databaseId
        slug
        title
        date
        featuredImage { node { sourceUrl caption } }
        categories { nodes { name slug } }
      }
    }
    palangkaraya: posts(first: 3, where: {categoryName: "Palangka Raya"}) {
      nodes {
        id
        databaseId
        slug
        title
        date
        featuredImage { node { sourceUrl caption } }
        categories { nodes { name slug } }
      }
    }
    politik: posts(first: 3, where: {categoryName: "Politik"}) {
      nodes {
        id
        databaseId
        slug
        title
        date
        featuredImage { node { sourceUrl caption } }
        categories { nodes { name slug } }
      }
    }
  }
`;
