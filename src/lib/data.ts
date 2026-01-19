import {
  fetchFeaturedPostGraphQL,
  fetchLatestPostsGraphQL,
  fetchPopularPostsGraphQL,
  fetchPostsByCategoryGraphQL,
  searchPostsGraphQL,
  fetchHomepageDataGraphQL,
  fetchCategoriesGraphQL,
  fetchPostsFromDateGraphQL
} from './graphql-api';
import type { Post, Category } from '../types/wordpress';

// Mock data as fallback
const today = new Date();
const getTimeAgo = (hours: number) => new Date(today.getTime() - hours * 60 * 60 * 1000).toISOString();

const mockPosts: Post[] = [
  {
    id: 1,
    slug: 'meluncurkan-roket-baru-indonesia-maju-teknologi-antariksa',
    title: 'Meluncurkan Roket Baru, Indonesia Maju Teknologi Antariksa',
    excerpt: 'Lembaga Penerbangan dan Antariksa Nasional (LAPAN) berhasil meluncurkan roket eksperimental terbaru yang menandai kemajuan signifikan dalam teknologi antariksa Indonesia.',
    content: `<p>Konten berita...</p>`,
    date: getTimeAgo(2),
    author: 'Budi Santoso',
    image: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=2670&auto=format&fit=crop',
    category: 'Teknologi',
    categorySlug: 'teknologi',
    imageCaption: 'Ilustrasi Roket LAPAN (Sumber: Unsplash)'
  },
  {
    id: 2,
    slug: 'wisata-alam-tersembunyi-di-papua-yang-wajib-dikunjungi',
    title: 'Wisata Alam Tersembunyi di Papua yang Wajib Dikunjungi',
    excerpt: 'Papua tidak hanya Raja Ampat. Temukan surga tersembunyi lainnya yang menawarkan keindahan alam yang belum terjamah dan budaya yang kaya.',
    content: `<p>Konten berita...</p>`,
    date: getTimeAgo(5),
    author: 'Siti Aminah',
    image: 'https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?auto=format&fit=crop&q=80&w=2000',
    category: 'Travel',
    categorySlug: 'travel',
    imageCaption: 'Keindahan Alam Papua (Sumber: Unsplash)'
  },
  {
    id: 3,
    slug: 'tips-menjaga-kesehatan-mental-di-era-digital',
    title: 'Tips Menjaga Kesehatan Mental di Era Digital',
    excerpt: 'Di tengah gempuran informasi dan media sosial, menjaga kewarasan menjadi tantangan tersendiri. Simak tips praktis berikut ini.',
    content: `<p>Konten berita...</p>`,
    date: getTimeAgo(12),
    author: 'Dr. Andi Wijaya',
    image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=2000',
    category: 'Kesehatan',
    categorySlug: 'kesehatan',
    imageCaption: 'Menjaga Kesehatan Mental (Sumber: Unsplash)'
  },
  {
    id: 4,
    slug: 'perkembangan-ekonomi-digital-indonesia-2024',
    title: 'Perkembangan Ekonomi Digital Indonesia 2024',
    excerpt: 'Ekonomi digital Indonesia diprediksi akan terus tumbuh pesat pada tahun 2024, didorong oleh e-commerce dan layanan keuangan digital.',
    content: `<p>Konten berita...</p>`,
    date: getTimeAgo(20),
    author: 'Rina S.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000',
    category: 'Bisnis',
    categorySlug: 'bisnis',
    imageCaption: 'Pertumbuhan Ekonomi Digital (Sumber: Unsplash)'
  },
  {
    id: 5,
    slug: 'resep-masakan-nusantara-rendang-domba',
    title: 'Resep Masakan Nusantara: Rendang Domba yang Empuk',
    excerpt: 'Ingin mencoba variasi rendang? Coba resep rendang domba berikut ini yang dijamin empuk dan bumbunya meresap sempurna.',
    content: `<p>Konten berita...</p>`,
    date: getTimeAgo(25),
    author: 'Chef Junaidi',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=2000',
    category: 'Kuliner',
    categorySlug: 'kuliner',
    imageCaption: 'Sajian Rendang Nusantara (Sumber: Unsplash)'
  },
  {
    id: 6,
    slug: 'startup-teknologi-indonesia-raih-pendanaan-seri-b',
    title: 'Startup Teknologi Indonesia Raih Pendanaan Seri B Sebesar 50 Juta USD',
    excerpt: 'Kabar gembira bagi ekosistem startup tanah air. Salah satu startup fintech berhasil mengamankan pendanaan segar dari investor global.',
    content: '<p>Konten berita...</p>',
    date: getTimeAgo(26),
    author: 'Dian Sastro',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=2000',
    category: 'Tekno',
    categorySlug: 'tekno',
    imageCaption: 'Ekosistem Startup Indonesia (Sumber: Unsplash)'
  },
  {
    id: 7,
    slug: 'timnas-indonesia-siap-hadapi-kualifikasi-piala-dunia',
    title: 'Timnas Indonesia Siap Hadapi Kualifikasi Piala Dunia',
    excerpt: 'Pelatih timnas optimis dengan skuad Garuda saat ini. Persiapan matang telah dilakukan jelang laga krusial mendatang.',
    content: '<p>Konten berita...</p>',
    date: getTimeAgo(2),
    author: 'Bambang Pamungkas',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=2000',
    category: 'Bola',
    categorySlug: 'bola',
    imageCaption: 'Skuad Timnas Indonesia (Sumber: Unsplash)'
  },
  {
    id: 8,
    slug: 'tren-fashion-2024-kembali-ke-era-90an',
    title: 'Tren Fashion 2024: Kembali ke Era 90-an dengan Sentuhan Modern',
    excerpt: 'Gaya busana vintage 90-an diprediksi akan kembali mendominasi runway dan street style tahun depan.',
    content: '<p>Konten berita...</p>',
    date: getTimeAgo(3),
    author: 'Ivan Gunawan',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=2000',
    category: 'Lifestyle',
    categorySlug: 'lifestyle',
    imageCaption: 'Tren Fashion Modern (Sumber: Unsplash)'
  }
];

// Export functions with GraphQL API integration and fallback
export async function getHomepageData() {
  try {
    const data = await fetchHomepageDataGraphQL();
    // Ensure featured post is always present
    if (!data.featured && mockPosts.length > 0) {
      data.featured = mockPosts[0];
    }
    return data;
  } catch (error) {
    console.error('Error fetching homepage data, using mock data:', error);
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

export async function getFeaturedPost(): Promise<Post> {
  try {
    const post = await fetchFeaturedPostGraphQL();
    return post || mockPosts[0];
  } catch (error) {
    console.error('Error fetching featured post, using mock data:', error);
    return mockPosts[0];
  }
}

export async function getLatestPosts(): Promise<Post[]> {
  try {
    const posts = await fetchLatestPostsGraphQL(6);
    return posts.length > 0 ? posts : mockPosts.slice(1, 7);
  } catch (error) {
    console.error('Error fetching latest posts, using mock data:', error);
    return mockPosts.slice(1, 7);
  }
}

export async function getPopularPosts(): Promise<Post[]> {
  try {
    const posts = await fetchPopularPostsGraphQL(5);
    return posts.length > 0 ? posts : [...mockPosts].sort(() => 0.5 - Math.random()).slice(0, 5);
  } catch (error) {
    console.error('Error fetching popular posts, using mock data:', error);
    return [...mockPosts].sort(() => 0.5 - Math.random()).slice(0, 5);
  }
}

export async function getSorotanPosts(): Promise<Post[]> {
  try {
    const posts = await fetchLatestPostsGraphQL(12);
    // Get random 6 posts from the fetched posts
    const shuffled = [...posts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  } catch (error) {
    console.error('Error fetching sorotan posts, using mock data:', error);
    return [...mockPosts].sort(() => 0.5 - Math.random()).slice(0, 6);
  }
}

export async function getBeritaTerkini(): Promise<Post[]> {
  try {
    const posts = await fetchLatestPostsGraphQL(15);
    return posts.slice(6); // Skip first 6 (already used in latest)
  } catch (error) {
    console.error('Error fetching berita terkini, using mock data:', error);
    return mockPosts.slice(7);
  }
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    // ✅ Fetch posts from 1 January 2025 onwards
    const dateFilter = '2025-01-01T00:00:00Z';
    const posts = await fetchPostsFromDateGraphQL(dateFilter, 9999);
    return posts.length > 0 ? posts : mockPosts;
  } catch (error) {
    console.error('Error fetching all posts, using mock data:', error);
    return mockPosts;
  }
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  try {
    const posts = await getAllPosts();
    return posts.find(post => post.slug === slug);
  } catch (error) {
    console.error('Error fetching post by slug, using mock data:', error);
    return mockPosts.find(post => post.slug === slug);
  }
}

export const PRIORITY_CATEGORIES = [
  'Berita Utama',
  'Ragam Dan Peristiwa',
  'Daerah',
  'Pendidikan',
  'Politik',
  'Bisnis',
  'Lingkungan Hidup',
  'Olahraga',
  'Wisata',
  'Hobi',
  'Humaniora',
  'Editorial',
  'DPRD'
];

export async function getCategories(): Promise<Category[]> {
  let wpCategoriesRaw: any[] = [];
  try {
    const categories = await fetchCategoriesGraphQL();
    if (categories.length > 0) {
      wpCategoriesRaw = categories;
    }
  } catch (error) {
    console.error('Error fetching categories from GraphQL:', error);
  }

  // 1. Map all categories for easy lookup
  const allNodesMap = new Map<string, Category>();
  wpCategoriesRaw.forEach(node => {
    allNodesMap.set(node.slug, {
      name: node.name,
      slug: node.slug,
      children: []
    });
  });

  // 2. Build the tree
  const wpRootCategories: Category[] = [];
  wpCategoriesRaw.forEach(node => {
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

  // 3. Merge with Priority Categories
  const finalCategoryMap = new Map<string, Category>();

  // Start with Priority Categories defaults
  PRIORITY_CATEGORIES.forEach(name => {
    const slug = name.toLowerCase().replace(/ /g, '-');
    finalCategoryMap.set(name.toLowerCase(), { name, slug, children: [] });
  });

  // 4. Custom grouping: Identify regional categories that should be children of 'Daerah' or 'DPRD'
  const regionalKeywords = [
    'pemkab', 'pemko', 'barito', 'mura', 'gumas', 'barsel', 'bartim', 'batara',
    'kapuas', 'katingan', 'kobar', 'kotim', 'lamandau', 'pulpis', 'seruyan',
    'sukamara', 'palangka raya', 'pulang pisau', 'bupati', 'pemerintah'
  ];

  const daerahCategory = finalCategoryMap.get('daerah');
  const dprdCategory = finalCategoryMap.get('dprd');

  // Overlay with real data
  wpRootCategories.forEach(cat => {
    const lowerName = cat.name.toLowerCase();

    // 4a. Handle DPRD Grouping (Priority)
    if (lowerName.includes('dprd') && lowerName !== 'dprd') {
      if (dprdCategory) {
        dprdCategory.children = dprdCategory.children || [];
        if (!dprdCategory.children.some(c => c.slug === cat.slug)) {
          dprdCategory.children.push(cat);
        }
        return;
      }
    }

    // 4b. Handle Regional Grouping
    const isRegional = regionalKeywords.some(keyword => lowerName.includes(keyword));

    // Jangan masukkan 'Daerah' ke dalam 'Daerah' sendiri
    if (isRegional && lowerName !== 'daerah') {
      if (daerahCategory) {
        daerahCategory.children = daerahCategory.children || [];
        // Hindari duplikasi jika sudah ada di children (dari WP)
        if (!daerahCategory.children.some(c => c.slug === cat.slug)) {
          daerahCategory.children.push(cat);
        }
        return; // Don't add to root
      }
    }

    if (finalCategoryMap.has(lowerName)) {
      const priorityCat = finalCategoryMap.get(lowerName)!;
      priorityCat.slug = cat.slug; // use actual slug from WP
      priorityCat.children = cat.children;
    } else {
      // Jika root kategori dari WP tidak ada di prioritas, tambahkan saja
      finalCategoryMap.set(lowerName, cat);
    }
  });

  return Array.from(finalCategoryMap.values());
}

export function getAllCategories(): string[] {
  return [...new Set(mockPosts.map(post => post.category))];
}

export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  try {
    const posts = await fetchPostsByCategoryGraphQL(categorySlug, 20);
    if (posts.length > 0) return posts;
    // Fallback to mock data by filtering with slug or name
    return mockPosts.filter(post =>
      post.category.toLowerCase() === categorySlug.toLowerCase() ||
      post.category === categorySlug
    );
  } catch (error) {
    console.error(`Error fetching posts for category ${categorySlug}, using mock data:`, error);
    return mockPosts.filter(post =>
      post.category.toLowerCase() === categorySlug.toLowerCase() ||
      post.category === categorySlug
    );
  }
}

export async function getCategoryBySlug(slug: string) {
  const categories = await getCategories();
  return categories.find(cat => cat.slug === slug);
}

export async function searchPosts(query: string): Promise<Post[]> {
  try {
    const posts = await searchPostsGraphQL(query);
    if (posts.length > 0) return posts;
    // Fallback to mock data search
    const lowerQuery = query.toLowerCase();
    return mockPosts.filter(post =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.content.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery)
    );
  } catch (error) {
    console.error('Error searching posts, using mock data:', error);
    const lowerQuery = query.toLowerCase();
    return mockPosts.filter(post =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.content.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery)
    );
  }
}
