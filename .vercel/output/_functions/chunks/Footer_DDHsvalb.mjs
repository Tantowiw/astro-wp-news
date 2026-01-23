import { c as createComponent, a as createAstro, d as addAttribute, n as renderHead, o as renderSlot, b as renderTemplate, m as maybeRenderHead, e as renderScript } from './astro/server_DUxqW-ZV.mjs';
import 'piccolore';
import 'clsx';
/* empty css                          */
import { GraphQLClient } from 'graphql-request';

const font400 = "/_astro/plus-jakarta-sans-latin-400-normal.Dhut76fR.woff2";

const font700 = "/_astro/plus-jakarta-sans-latin-700-normal.CfpNZvy6.woff2";

const $$Astro = createAstro();
const $$MainLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const { title, description = "Berita Terkini dan Terpercaya", preloadImage } = Astro2.props;
  return renderTemplate`<html lang="id"> <head><meta charset="UTF-8"><meta name="description"${addAttribute(description, "content")}><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><!-- Preload Critical Fonts --><link rel="preload"${addAttribute(font400, "href")} as="font" type="font/woff2" crossorigin><link rel="preload"${addAttribute(font700, "href")} as="font" type="font/woff2" crossorigin>${preloadImage && renderTemplate`<link rel="preload" as="image"${addAttribute(preloadImage, "href")} fetchpriority="high">`}<title>${title}</title>${renderHead()}</head> <body class="bg-gray-50 text-gray-900 font-sans antialiased selection:bg-blue-600 selection:text-white"> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "D:/VibeCoding AntiGravity/astro-wp-news/src/layouts/MainLayout.astro", void 0);

const endpoint = "https://catatan.co.id/graphql";
const graphqlClient = new GraphQLClient(endpoint, {
  headers: {
    "Content-Type": "application/json"
  }
});
const GET_POSTS_QUERY = `
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
const SEARCH_POSTS_QUERY = `
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
const GET_POSTS_BY_CATEGORY_QUERY = `
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
const GET_CATEGORIES_QUERY = `
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
const GET_HOMEPAGE_DATA_QUERY = `
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

const cache = /* @__PURE__ */ new Map();
const CACHE_TTL = 60 * 1e3;
async function cachedRequest(query, variables = {}) {
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
function stripHtml(html) {
  return html.replace(/<[^>]*>/g, "").trim();
}
function transformGraphQLPost(node) {
  return {
    id: node.databaseId,
    slug: node.slug,
    title: stripHtml(node.title || ""),
    excerpt: stripHtml(node.excerpt || ""),
    content: node.content || "",
    date: node.date,
    author: node.author?.node?.name || "Admin",
    image: node.featuredImage?.node?.sourceUrl || "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&q=80&w=2000",
    imageCaption: node.featuredImage?.node?.caption ? node.featuredImage.node.caption.replace(/<[^>]*>/g, "").trim() : "Ilustrasi",
    category: node.categories?.nodes?.[0]?.name || "Uncategorized",
    categorySlug: node.categories?.nodes?.[0]?.slug || "uncategorized"
  };
}
async function fetchHomepageDataGraphQL() {
  try {
    const data = await cachedRequest(GET_HOMEPAGE_DATA_QUERY);
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
      politik: (data.politik?.nodes || []).map(transformGraphQLPost)
    };
  } catch (error) {
    console.error("Error fetching homepage data from GraphQL:", error);
    if (error.response) {
      console.error("GraphQL Response Errors:", JSON.stringify(error.response.errors, null, 2));
    }
    throw error;
  }
}
async function fetchCategoriesGraphQL() {
  try {
    const data = await cachedRequest(GET_CATEGORIES_QUERY);
    return data.categories.nodes || [];
  } catch (error) {
    console.error("Error fetching categories from GraphQL:", error);
    return [];
  }
}
async function fetchPostsGraphQL(first = 10) {
  try {
    const data = await cachedRequest(GET_POSTS_QUERY, { first });
    return data.posts.nodes.map(transformGraphQLPost);
  } catch (error) {
    console.error("Error fetching posts from GraphQL:", error);
    return [];
  }
}
async function searchPostsGraphQL(query) {
  try {
    const data = await cachedRequest(SEARCH_POSTS_QUERY, {
      search: query,
      first: 20
    });
    return data.posts.nodes.map(transformGraphQLPost);
  } catch (error) {
    console.error("Error searching posts from GraphQL:", error);
    return [];
  }
}
async function fetchPostsByCategoryGraphQL(categoryName, first = 20) {
  try {
    const data = await cachedRequest(GET_POSTS_BY_CATEGORY_QUERY, {
      categoryName,
      first
    });
    return data.posts.nodes.map(transformGraphQLPost);
  } catch (error) {
    console.error("Error fetching posts by category from GraphQL:", error);
    return [];
  }
}
async function fetchLatestPostsGraphQL(count = 6) {
  return fetchPostsGraphQL(count);
}
async function fetchPopularPostsGraphQL(count = 5) {
  return fetchPostsGraphQL(count);
}

const today = /* @__PURE__ */ new Date();
const getTimeAgo = (hours) => new Date(today.getTime() - hours * 60 * 60 * 1e3).toISOString();
const mockPosts = [
  {
    id: 1,
    slug: "meluncurkan-roket-baru-indonesia-maju-teknologi-antariksa",
    title: "Meluncurkan Roket Baru, Indonesia Maju Teknologi Antariksa",
    excerpt: "Lembaga Penerbangan dan Antariksa Nasional (LAPAN) berhasil meluncurkan roket eksperimental terbaru yang menandai kemajuan signifikan dalam teknologi antariksa Indonesia.",
    content: `<p>Konten berita...</p>`,
    date: getTimeAgo(2),
    author: "Budi Santoso",
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=2670&auto=format&fit=crop",
    category: "Teknologi",
    categorySlug: "teknologi",
    imageCaption: "Ilustrasi Roket LAPAN (Sumber: Unsplash)"
  },
  {
    id: 2,
    slug: "wisata-alam-tersembunyi-di-papua-yang-wajib-dikunjungi",
    title: "Wisata Alam Tersembunyi di Papua yang Wajib Dikunjungi",
    excerpt: "Papua tidak hanya Raja Ampat. Temukan surga tersembunyi lainnya yang menawarkan keindahan alam yang belum terjamah dan budaya yang kaya.",
    content: `<p>Konten berita...</p>`,
    date: getTimeAgo(5),
    author: "Siti Aminah",
    image: "https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?auto=format&fit=crop&q=80&w=2000",
    category: "Travel",
    categorySlug: "travel",
    imageCaption: "Keindahan Alam Papua (Sumber: Unsplash)"
  },
  {
    id: 3,
    slug: "tips-menjaga-kesehatan-mental-di-era-digital",
    title: "Tips Menjaga Kesehatan Mental di Era Digital",
    excerpt: "Di tengah gempuran informasi dan media sosial, menjaga kewarasan menjadi tantangan tersendiri. Simak tips praktis berikut ini.",
    content: `<p>Konten berita...</p>`,
    date: getTimeAgo(12),
    author: "Dr. Andi Wijaya",
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=2000",
    category: "Kesehatan",
    categorySlug: "kesehatan",
    imageCaption: "Menjaga Kesehatan Mental (Sumber: Unsplash)"
  },
  {
    id: 4,
    slug: "perkembangan-ekonomi-digital-indonesia-2024",
    title: "Perkembangan Ekonomi Digital Indonesia 2024",
    excerpt: "Ekonomi digital Indonesia diprediksi akan terus tumbuh pesat pada tahun 2024, didorong oleh e-commerce dan layanan keuangan digital.",
    content: `<p>Konten berita...</p>`,
    date: getTimeAgo(20),
    author: "Rina S.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000",
    category: "Bisnis",
    categorySlug: "bisnis",
    imageCaption: "Pertumbuhan Ekonomi Digital (Sumber: Unsplash)"
  },
  {
    id: 5,
    slug: "resep-masakan-nusantara-rendang-domba",
    title: "Resep Masakan Nusantara: Rendang Domba yang Empuk",
    excerpt: "Ingin mencoba variasi rendang? Coba resep rendang domba berikut ini yang dijamin empuk dan bumbunya meresap sempurna.",
    content: `<p>Konten berita...</p>`,
    date: getTimeAgo(25),
    author: "Chef Junaidi",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=2000",
    category: "Kuliner",
    categorySlug: "kuliner",
    imageCaption: "Sajian Rendang Nusantara (Sumber: Unsplash)"
  },
  {
    id: 6,
    slug: "startup-teknologi-indonesia-raih-pendanaan-seri-b",
    title: "Startup Teknologi Indonesia Raih Pendanaan Seri B Sebesar 50 Juta USD",
    excerpt: "Kabar gembira bagi ekosistem startup tanah air. Salah satu startup fintech berhasil mengamankan pendanaan segar dari investor global.",
    content: "<p>Konten berita...</p>",
    date: getTimeAgo(26),
    author: "Dian Sastro",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=2000",
    category: "Tekno",
    categorySlug: "tekno",
    imageCaption: "Ekosistem Startup Indonesia (Sumber: Unsplash)"
  },
  {
    id: 7,
    slug: "timnas-indonesia-siap-hadapi-kualifikasi-piala-dunia",
    title: "Timnas Indonesia Siap Hadapi Kualifikasi Piala Dunia",
    excerpt: "Pelatih timnas optimis dengan skuad Garuda saat ini. Persiapan matang telah dilakukan jelang laga krusial mendatang.",
    content: "<p>Konten berita...</p>",
    date: getTimeAgo(2),
    author: "Bambang Pamungkas",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=2000",
    category: "Bola",
    categorySlug: "bola",
    imageCaption: "Skuad Timnas Indonesia (Sumber: Unsplash)"
  },
  {
    id: 8,
    slug: "tren-fashion-2024-kembali-ke-era-90an",
    title: "Tren Fashion 2024: Kembali ke Era 90-an dengan Sentuhan Modern",
    excerpt: "Gaya busana vintage 90-an diprediksi akan kembali mendominasi runway dan street style tahun depan.",
    content: "<p>Konten berita...</p>",
    date: getTimeAgo(3),
    author: "Ivan Gunawan",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=2000",
    category: "Lifestyle",
    categorySlug: "lifestyle",
    imageCaption: "Tren Fashion Modern (Sumber: Unsplash)"
  }
];
async function getHomepageData() {
  try {
    const data = await fetchHomepageDataGraphQL();
    if (!data.featured && mockPosts.length > 0) {
      data.featured = mockPosts[0];
    }
    return data;
  } catch (error) {
    console.error("Error fetching homepage data, using mock data:", error);
    return {
      featured: mockPosts[0],
      latest: mockPosts.slice(1, 7),
      popular: [...mockPosts].sort(() => 0.5 - Math.random()).slice(0, 5),
      sorotan: [...mockPosts].sort(() => 0.5 - Math.random()).slice(0, 6),
      beritaTerkini: mockPosts.slice(0, 10),
      ragam: mockPosts.slice(0, 3),
      pemkabKotim: mockPosts.slice(0, 3),
      palangkaraya: mockPosts.slice(0, 3),
      politik: mockPosts.slice(0, 3)
    };
  }
}
async function getPopularPosts() {
  try {
    const posts = await fetchPopularPostsGraphQL(5);
    return posts.length > 0 ? posts : [...mockPosts].sort(() => 0.5 - Math.random()).slice(0, 5);
  } catch (error) {
    console.error("Error fetching popular posts, using mock data:", error);
    return [...mockPosts].sort(() => 0.5 - Math.random()).slice(0, 5);
  }
}
async function getAllPosts() {
  try {
    const posts = await fetchLatestPostsGraphQL(9999);
    return posts.length > 0 ? posts : mockPosts;
  } catch (error) {
    console.error("Error fetching all posts, using mock data:", error);
    return mockPosts;
  }
}
const PRIORITY_CATEGORIES = [
  "Berita Utama",
  "Ragam Dan Peristiwa",
  "Daerah",
  "Pendidikan",
  "Politik",
  "Bisnis",
  "Lingkungan Hidup",
  "Olahraga",
  "Wisata",
  "Hobi",
  "Humaniora",
  "Editorial",
  "DPRD"
];
async function getCategories() {
  let wpCategoriesRaw = [];
  try {
    const categories = await fetchCategoriesGraphQL();
    if (categories.length > 0) {
      wpCategoriesRaw = categories;
    }
  } catch (error) {
    console.error("Error fetching categories from GraphQL:", error);
  }
  const allNodesMap = /* @__PURE__ */ new Map();
  wpCategoriesRaw.forEach((node) => {
    allNodesMap.set(node.slug, {
      name: node.name,
      slug: node.slug,
      children: []
    });
  });
  const wpRootCategories = [];
  wpCategoriesRaw.forEach((node) => {
    const category = allNodesMap.get(node.slug);
    if (category) {
      if (node.parent?.node) {
        const parent = allNodesMap.get(node.parent.node.slug);
        if (parent) {
          parent.children = parent.children || [];
          parent.children.push(category);
        } else {
          wpRootCategories.push(category);
        }
      } else {
        wpRootCategories.push(category);
      }
    }
  });
  const finalCategoryMap = /* @__PURE__ */ new Map();
  PRIORITY_CATEGORIES.forEach((name) => {
    const slug = name.toLowerCase().replace(/ /g, "-");
    finalCategoryMap.set(name.toLowerCase(), { name, slug, children: [] });
  });
  const regionalKeywords = [
    "pemkab",
    "pemko",
    "barito",
    "mura",
    "gumas",
    "barsel",
    "bartim",
    "batara",
    "kapuas",
    "katingan",
    "kobar",
    "kotim",
    "lamandau",
    "pulpis",
    "seruyan",
    "sukamara",
    "palangka raya",
    "pulang pisau",
    "bupati",
    "pemerintah"
  ];
  const daerahCategory = finalCategoryMap.get("daerah");
  const dprdCategory = finalCategoryMap.get("dprd");
  wpRootCategories.forEach((cat) => {
    const lowerName = cat.name.toLowerCase();
    if (lowerName.includes("dprd") && lowerName !== "dprd") {
      if (dprdCategory) {
        dprdCategory.children = dprdCategory.children || [];
        if (!dprdCategory.children.some((c) => c.slug === cat.slug)) {
          dprdCategory.children.push(cat);
        }
        return;
      }
    }
    const isRegional = regionalKeywords.some((keyword) => lowerName.includes(keyword));
    if (isRegional && lowerName !== "daerah") {
      if (daerahCategory) {
        daerahCategory.children = daerahCategory.children || [];
        if (!daerahCategory.children.some((c) => c.slug === cat.slug)) {
          daerahCategory.children.push(cat);
        }
        return;
      }
    }
    if (finalCategoryMap.has(lowerName)) {
      const priorityCat = finalCategoryMap.get(lowerName);
      priorityCat.slug = cat.slug;
      priorityCat.children = cat.children;
    } else {
      finalCategoryMap.set(lowerName, cat);
    }
  });
  return Array.from(finalCategoryMap.values());
}
async function getPostsByCategory(categorySlug) {
  try {
    const posts = await fetchPostsByCategoryGraphQL(categorySlug, 20);
    if (posts.length > 0) return posts;
    return mockPosts.filter(
      (post) => post.category.toLowerCase() === categorySlug.toLowerCase() || post.category === categorySlug
    );
  } catch (error) {
    console.error(`Error fetching posts for category ${categorySlug}, using mock data:`, error);
    return mockPosts.filter(
      (post) => post.category.toLowerCase() === categorySlug.toLowerCase() || post.category === categorySlug
    );
  }
}
async function searchPosts(query) {
  try {
    const posts = await searchPostsGraphQL(query);
    if (posts.length > 0) return posts;
    const lowerQuery = query.toLowerCase();
    return mockPosts.filter(
      (post) => post.title.toLowerCase().includes(lowerQuery) || post.content.toLowerCase().includes(lowerQuery) || post.excerpt.toLowerCase().includes(lowerQuery)
    );
  } catch (error) {
    console.error("Error searching posts, using mock data:", error);
    const lowerQuery = query.toLowerCase();
    return mockPosts.filter(
      (post) => post.title.toLowerCase().includes(lowerQuery) || post.content.toLowerCase().includes(lowerQuery) || post.excerpt.toLowerCase().includes(lowerQuery)
    );
  }
}

const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const allCategories = await getCategories();
  const categoryMap = /* @__PURE__ */ new Map();
  allCategories.forEach((cat) => {
    categoryMap.set(cat.name.toLowerCase(), cat);
  });
  const categories = PRIORITY_CATEGORIES.map((name) => categoryMap.get(name.toLowerCase())).filter(Boolean);
  return renderTemplate`${maybeRenderHead()}<header id="main-header" class="fixed w-full top-0 z-50 bg-black text-white shadow-md" data-astro-cid-3ef6ksr2> <!-- Top Bar: Logo + Utility Icons --> <div class="border-b border-gray-800" data-astro-cid-3ef6ksr2> <div class="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between" data-astro-cid-3ef6ksr2> <!-- Logo --> <a href="/" class="flex items-center" data-astro-cid-3ef6ksr2> <img src="https://catatan.co.id/wp-content/uploads/2022/10/tanpa-c-tanpa-border.png" alt="Catatan.co.id" class="h-8 md:h-10 w-auto object-contain filter brightness-0 invert" data-astro-cid-3ef6ksr2> </a> <!-- Utility Icons --> <div class="flex items-center gap-2 md:gap-4" data-astro-cid-3ef6ksr2> <!-- Search Icon (Mobile) --> <button id="mobile-search-btn" class="md:hidden p-2 text-gray-300 hover:text-white transition-colors" aria-label="Search" data-astro-cid-3ef6ksr2> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-3ef6ksr2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-astro-cid-3ef6ksr2></path></svg> </button> <!-- Search Bar (Desktop) --> <div class="hidden md:flex flex-1 max-w-md" data-astro-cid-3ef6ksr2> <form action="/search" method="get" class="relative w-full" data-astro-cid-3ef6ksr2> <input type="text" name="q" placeholder="Cari tokoh, topik atau peristiwa" class="w-full bg-[#1F1F1F] text-gray-200 text-sm rounded px-4 py-2 border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 placeholder-gray-500 transition-all" data-astro-cid-3ef6ksr2> <button type="submit" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white" data-astro-cid-3ef6ksr2> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-3ef6ksr2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-astro-cid-3ef6ksr2></path></svg> </button> </form> </div> <!-- Menu Icon --> <button class="p-2 text-gray-300 hover:text-white transition-colors" aria-label="Menu" data-astro-cid-3ef6ksr2> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-3ef6ksr2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" data-astro-cid-3ef6ksr2></path></svg> </button> </div> </div> </div> <!-- Navigation Bar --> <div class="bg-black border-b border-gray-800" data-astro-cid-3ef6ksr2> <div class="max-w-7xl mx-auto px-4" data-astro-cid-3ef6ksr2> <nav class="overflow-x-auto md:overflow-visible no-scrollbar" data-astro-cid-3ef6ksr2> <ul class="flex items-center gap-4 md:gap-6 whitespace-nowrap text-xs md:text-sm font-medium h-10 md:h-11" data-astro-cid-3ef6ksr2> <li data-astro-cid-3ef6ksr2><a href="/" class="text-white hover:text-orange-500 transition-colors" data-astro-cid-3ef6ksr2>Terpopuler</a></li> ${categories.map((category) => renderTemplate`<li class="relative group h-full flex items-center" data-astro-cid-3ef6ksr2> <div class="flex items-center gap-1 py-2 md:py-3 h-full" data-astro-cid-3ef6ksr2> <a${addAttribute(`/category/${category.slug}`, "href")} class="text-gray-300 hover:text-orange-500 transition-colors" data-astro-cid-3ef6ksr2> ${category.name} </a> ${category.children && category.children.length > 0 && renderTemplate`<svg class="w-2.5 h-2.5 text-gray-500 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-3ef6ksr2> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" data-astro-cid-3ef6ksr2></path> </svg>`} </div> ${category.children && category.children.length > 0 && renderTemplate`<div class="absolute top-full left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[60] pt-2" data-astro-cid-3ef6ksr2> <ul class="bg-black border border-gray-800 shadow-2xl py-2 min-w-[200px] border-t-2 border-t-orange-500 rounded-b-md" data-astro-cid-3ef6ksr2> ${category.children.map((child) => renderTemplate`<li data-astro-cid-3ef6ksr2> <a${addAttribute(`/category/${child.slug}`, "href")} class="block px-4 py-2.5 text-xs text-gray-400 hover:bg-gray-900 hover:text-white transition-colors border-b border-gray-900 last:border-0" data-astro-cid-3ef6ksr2> ${child.name} </a> </li>`)} </ul> </div>`} </li>`)} </ul> </nav> </div> </div> </header> <!-- Mobile Search Overlay --> <div id="mobile-search-overlay" class="fixed inset-0 bg-black z-50 hidden md:hidden" data-astro-cid-3ef6ksr2> <div class="flex flex-col h-full" data-astro-cid-3ef6ksr2> <!-- Search Header --> <div class="flex items-center justify-between p-4 border-b border-gray-800" data-astro-cid-3ef6ksr2> <h2 class="text-white font-bold text-lg" data-astro-cid-3ef6ksr2>Pencarian</h2> <button id="close-search-btn" class="p-2 text-gray-300 hover:text-white transition-colors" data-astro-cid-3ef6ksr2> <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-3ef6ksr2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-astro-cid-3ef6ksr2></path></svg> </button> </div> <!-- Search Form --> <div class="p-4" data-astro-cid-3ef6ksr2> <form action="/search" method="get" class="relative" data-astro-cid-3ef6ksr2> <input type="text" name="q" id="mobile-search-input" placeholder="Cari tokoh, topik atau peristiwa..." class="w-full bg-[#1F1F1F] text-white text-base rounded-lg px-4 py-3 pr-12 border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 placeholder-gray-500" autofocus data-astro-cid-3ef6ksr2> <button type="submit" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white" data-astro-cid-3ef6ksr2> <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-3ef6ksr2><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-astro-cid-3ef6ksr2></path></svg> </button> </form> </div> <!-- Search Suggestions (Optional) --> <div class="flex-1 overflow-y-auto p-4" data-astro-cid-3ef6ksr2> <p class="text-gray-400 text-sm" data-astro-cid-3ef6ksr2>Mulai ketik untuk mencari berita...</p> </div> </div> </div>  ${renderScript($$result, "D:/VibeCoding AntiGravity/astro-wp-news/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/VibeCoding AntiGravity/astro-wp-news/src/components/Header.astro", void 0);

const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const allCategories = await getCategories();
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const categoryMap = /* @__PURE__ */ new Map();
  allCategories.forEach((cat) => {
    categoryMap.set(cat.name.toLowerCase(), cat);
  });
  const categories = PRIORITY_CATEGORIES.map((name) => categoryMap.get(name.toLowerCase())).filter(Boolean);
  return renderTemplate`${maybeRenderHead()}<footer class="bg-black text-white pt-16 pb-8 border-t border-gray-800"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12"> <!-- Brand & Info --> <div class="col-span-1 md:col-span-1"> <a href="/" class="flex flex-col mb-6"> <div class="text-2xl font-serif font-bold tracking-tighter leading-none text-white">
KOMPAS<span class="text-orange-500">.com</span> </div> <span class="text-[9px] text-gray-400 tracking-[0.2em] uppercase mt-1">Jernih Melihat Dunia</span> </a> <p class="text-gray-400 text-sm leading-relaxed">
Platform berita terdepan yang menyajikan informasi terkini, akurat, dan terpercaya dari seluruh penjuru nusantara.
</p> </div> <!-- Dynamic Categories --> <div> <h3 class="text-sm font-bold uppercase tracking-widest text-white mb-6">Kategori</h3> <ul class="space-y-3"> ${categories.slice(0, 6).map((category) => renderTemplate`<li> <a${addAttribute(`/category/${category.slug}`, "href")} class="text-gray-400 hover:text-orange-500 transition-colors text-sm"> ${category.name} </a> </li>`)} <li> <a href="/category" class="text-blue-500 hover:text-blue-400 transition-colors text-xs font-bold uppercase tracking-wider">
Lihat Semua Kategori &rarr;
</a> </li> </ul> </div> <!-- Quick Links --> <div> <h3 class="text-sm font-bold uppercase tracking-widest text-white mb-6">Informasi</h3> <ul class="space-y-3 text-sm"> <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Tentang Kami</a></li> <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Redaksi</a></li> <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Pedoman Media Siber</a></li> <li><a href="#" class="text-gray-400 hover:text-white transition-colors">Kontak</a></li> </ul> </div> <!-- Newsletter --> <div> <h3 class="text-sm font-bold uppercase tracking-widest text-white mb-6">Newsletter</h3> <p class="text-gray-400 text-sm mb-4">Dapatkan update berita harian langsung di email Anda.</p> <form class="flex flex-col gap-2"> <input type="email" placeholder="Email Anda" class="bg-[#1F1F1F] border border-gray-700 px-4 py-2.5 rounded text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"> <button class="bg-blue-600 px-4 py-2.5 rounded text-white text-sm font-bold hover:bg-blue-700 transition-all uppercase tracking-wider">
Berlangganan
</button> </form> </div> </div> <div class="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4"> <p class="text-[11px] text-gray-500 font-medium uppercase tracking-[0.1em]">
&copy; ${currentYear} KOMPAS.com (Cloned). All rights reserved.
</p> <div class="flex items-center gap-6"> <a href="#" class="text-gray-500 hover:text-white transition-colors"><span class="sr-only">Facebook</span><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg></a> <a href="#" class="text-gray-500 hover:text-white transition-colors"><span class="sr-only">Twitter</span><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path></svg></a> <a href="#" class="text-gray-500 hover:text-white transition-colors"><span class="sr-only">Instagram</span><svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c2.717 0 3.056.01 4.122.058 1.066.048 1.79.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.637.417 1.361.465 2.427.048 1.066.058 1.36.058 4.122 0 2.717-.01 3.056-.058 4.122-.048 1.066-.217 1.79-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.637.247-1.361.417-2.427.465-1.066.048-1.36.058-4.122.058-2.717 0-3.056-.01-4.122-.058-1.066-.048-1.79-.217-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.637-.417-1.361-.465-2.427-.048-1.066-.058-1.36-.058-4.122 0-2.717.01-3.056.058-4.122.048-1.066.217-1.79.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 3.55c.637-.247 1.361-.417 2.427-.465C8.944 2.01 9.24 2 12 2m0-2C8.835 0 8.411.01 7.152.067 5.892.11 4.756.287 3.736.685a6.903 6.903 0 00-2.49 1.623A6.903 6.903 0 00.38 4.798c-.398 1.02-.575 2.156-.632 3.416C-.316 9.474-.326 9.897-.326 13.062 0 16.227.01 16.65.067 17.91c.057 1.26.234 2.396.632 3.416a6.903 6.903 0 001.623 2.49 6.903 6.903 0 002.49 1.623c1.02.398 2.156.575 3.416.632 1.26.057 1.683.067 4.848.067 3.165 0 3.588-.01 4.848-.067 1.26-.057 2.396-.234 3.416-.632a6.903 6.903 0 002.49-1.623 6.903 6.903 0 001.623-2.49c.398-1.02.575-2.156.632-3.416.057-1.26.067-1.683.067-4.848 0-3.165-.01-3.588-.067-4.848-.057-1.26-.234-2.396-.632-3.416a6.903 6.903 0 00-1.623-2.49 6.903 6.903 0 00-2.49-1.623c-1.02-.398-2.156-.575-3.416-.632C15.65.01 15.227 0 12.062 0z"></path><path d="M12 5.838a6.162 6.162 0 106.162 6.162A6.162 6.162 0 0012 5.838m0 10.162a4 4 0 114-4 4 4 0 01-4 4"></path><path d="M18.437 5.563a1.44 1.44 0 101.44 1.44 1.44 1.44 0 00-1.44-1.44"></path></svg></a> </div> </div> </div> </footer>`;
}, "D:/VibeCoding AntiGravity/astro-wp-news/src/components/Footer.astro", void 0);

export { $$Header as $, getPopularPosts as a, getCategories as b, $$Footer as c, $$MainLayout as d, getAllPosts as e, getHomepageData as f, getPostsByCategory as g, searchPosts as s };
