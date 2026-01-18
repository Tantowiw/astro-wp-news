const today = new Date();
const getTimeAgo = (hours: number) => new Date(today.getTime() - hours * 60 * 60 * 1000).toISOString();

export const posts = [
  {
    id: 1,
    slug: 'meluncurkan-roket-baru-indonesia-maju-teknologi-antariksa',
    title: 'Meluncurkan Roket Baru, Indonesia Maju Teknologi Antariksa',
    excerpt: 'Lembaga Penerbangan dan Antariksa Nasional (LAPAN) berhasil meluncurkan roket eksperimental terbaru yang menandai kemajuan signifikan dalam teknologi antariksa Indonesia.',
    content: `...`,
    date: getTimeAgo(2), // 2 hours ago
    author: 'Budi Santoso',
    image: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?q=80&w=2670&auto=format&fit=crop',
    category: 'Teknologi'
  },
  {
    id: 2,
    slug: 'wisata-alam-tersembunyi-di-papua-yang-wajib-dikunjungi',
    title: 'Wisata Alam Tersembunyi di Papua yang Wajib Dikunjungi',
    excerpt: 'Papua tidak hanya Raja Ampat. Temukan surga tersembunyi lainnya yang menawarkan keindahan alam yang belum terjamah dan budaya yang kaya.',
    content: `...`,
    date: getTimeAgo(5), // 5 hours ago
    author: 'Siti Aminah',
    image: 'https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?auto=format&fit=crop&q=80&w=2000',
    category: 'Travel'
  },
  {
    id: 3,
    slug: 'tips-menjaga-kesehatan-mental-di-era-digital',
    title: 'Tips Menjaga Kesehatan Mental di Era Digital',
    excerpt: 'Di tengah gempuran informasi dan media sosial, menjaga kewarasan menjadi tantangan tersendiri. Simak tips praktis berikut ini.',
    content: `...`,
    date: getTimeAgo(12), // 12 hours ago
    author: 'Dr. Andi Wijaya',
    image: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=2000',
    category: 'Kesehatan'
  },
  {
    id: 4,
    slug: 'perkembangan-ekonomi-digital-indonesia-2024',
    title: 'Perkembangan Ekonomi Digital Indonesia 2024',
    excerpt: 'Ekonomi digital Indonesia diprediksi akan terus tumbuh pesat pada tahun 2024, didorong oleh e-commerce dan layanan keuangan digital.',
    content: `...`,
    date: getTimeAgo(20), // 20 hours ago
    author: 'Rina S.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000',
    category: 'Bisnis'
  },
  {
    id: 5,
    slug: 'resep-masakan-nusantara-rendang-domba',
    title: 'Resep Masakan Nusantara: Rendang Domba yang Empuk',
    excerpt: 'Ingin mencoba variasi rendang? Coba resep rendang domba berikut ini yang dijamin empuk dan bumbunya meresap sempurna.',
    content: `...`,
    date: getTimeAgo(25), // 25 hours ago (Just older than 24h)
    author: 'Chef Junaidi',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=2000',
    category: 'Kuliner'
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
    category: 'Tekno'
  },
  {
    id: 7,
    slug: 'timnas-indonesia-siap-hadapi-kualifikasi-piala-dunia',
    title: 'Timnas Indonesia Siap Hadapi Kualifikasi Piala Dunia',
    excerpt: 'Pelatih timnas optimis dengan skuad Garuda saat ini. Persiapan matang telah dilakukan jelang laga krusial mendatang.',
    content: '<p>Konten berita...</p>',
    date: getTimeAgo(2), // Recent
    author: 'Bambang Pamungkas',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=2000',
    category: 'Bola'
  },
  {
    id: 8,
    slug: 'tren-fashion-2024-kembali-ke-era-90an',
    title: 'Tren Fashion 2024: Kembali ke Era 90-an dengan Sentuhan Modern',
    excerpt: 'Gaya busana vintage 90-an diprediksi akan kembali mendominasi runway dan street style tahun depan.',
    content: '<p>Konten berita...</p>',
    date: getTimeAgo(3), // Recent
    author: 'Ivan Gunawan',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=2000',
    category: 'Lifestyle'
  },
  {
    id: 9,
    slug: 'mobil-listrik-terbaru-siap-mengaspal-di-jakarta',
    title: 'Mobil Listrik Terbaru Siap Mengaspal di Jakarta',
    excerpt: 'Produsen otomotif raksasa mulai memasarkan mobil listrik terjangkau untuk pasar Indonesia.',
    content: '<p>Konten berita...</p>',
    date: getTimeAgo(10), // Recent
    author: 'Ridwan Hanif',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=2000',
    category: 'Otomotif'
  },
  {
    id: 10,
    slug: 'festival-musik-jazz-gunung-kembali-digelar',
    title: 'Festival Musik Jazz Gunung Kembali Digelar Tahun Ini',
    excerpt: 'Menikmati alunan musik jazz di ketinggian 2000 mdpl menjadi pengalaman tak terlupakan bagi para penikmat musik.',
    content: '<p>Konten berita...</p>',
    date: getTimeAgo(22), // Recent
    author: 'Tulus',
    image: 'https://images.unsplash.com/photo-1459749411177-05be25b15f77?auto=format&fit=crop&q=80&w=2000',
    category: 'Entertainment'
  },
  {
    id: 11,
    slug: 'tips-mengatur-keuangan-untuk-gen-z',
    title: 'Tips Mengatur Keuangan untuk Gen Z Agar Melek Investasi',
    excerpt: 'Jangan habiskan uang untuk gaya hidup semata. Mulai investasi sejak dini demi masa depan cerah.',
    content: '<p>Konten berita...</p>',
    date: getTimeAgo(26), // Older
    author: 'Ligwina Hananto',
    image: 'https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?auto=format&fit=crop&q=80&w=2000',
    category: 'Money'
  },
  {
    id: 12,
    slug: 'beasiswa-lpdp-tahap-2-mulai-dibuka',
    title: 'Pendaftaran Beasiswa LPDP Tahap 2 Mulai Dibuka Hari Ini',
    excerpt: 'Kesempatan emas bagi putra-putri terbaik bangsa untuk melanjutkan studi S2 dan S3 di dalam dan luar negeri.',
    content: '<p>Konten berita...</p>',
    date: getTimeAgo(48), // Older
    author: 'Nadiem Makarim',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=2000',
    category: 'Edukasi'
  },
  {
    id: 13,
    slug: 'konser-coldplay-jakarta-tiket-ludes',
    title: 'Tiket Konser Coldplay Jakarta Ludes dalam 5 Menit',
    excerpt: 'Antusiasme fans Coldplay di Indonesia sangat luar biasa. War tiket berlangsung sengit pagi tadi.',
    content: '<p>Konten berita...</p>',
    date: getTimeAgo(50),
    author: 'Najwa Shihab',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=2000',
    category: 'Entertainment'
  },
  {
    id: 14,
    slug: 'kenaikan-harga-properti-di-jabodetabek',
    title: 'Kenaikan Harga Properti di Jabodetabek Melambat',
    excerpt: 'Analis memprediksi pasar properti akan stagnan hingga akhir tahun akibat isu resesi global.',
    content: '<p>Konten berita...</p>',
    date: getTimeAgo(72),
    author: 'Hotman Paris',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=2000',
    category: 'Properti'
  },
  {
    id: 15,
    slug: 'penemuan-spesies-anggrek-baru-di-kalimantan',
    title: 'Penemuan Spesies Anggrek Baru di Hutan Kalimantan',
    excerpt: 'Peneliti BRIN menemukan spesies anggrek langka yang belum pernah tercatat sebelumnya di pedalaman Kalimantan.',
    content: '<p>Konten berita...</p>',
    date: getTimeAgo(90),
    author: 'Raline Shah',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=2000',
    category: 'Sains'
  },
  {
    id: 16,
    slug: 'presiden-resmikan-tol-baru-di-sumatera',
    title: 'Presiden Resmikan Ruas Tol Baru di Sumatera',
    excerpt: 'Pembangunan infrastruktur terus dikebut. Presiden meresmikan ruas tol yang menghubungkan dua kota besar di Sumatera.',
    content: '<p>Konten berita...</p>',
    date: getTimeAgo(4),
    author: 'Setpres',
    image: 'https://images.unsplash.com/photo-1545459720-aacfb50908ea?auto=format&fit=crop&q=80&w=2000',
    category: 'Nasional'
  },
  {
    id: 17,
    slug: 'kpu-tetapkan-jadwal-pilkada-serentak',
    title: 'KPU Tetapkan Jadwal Kampanye Pilkada Serentak',
    excerpt: 'Komisi Pemilihan Umum (KPU) telah resmi merilis jadwal tahapan kampanye untuk Pilkada serentak mendatang.',
    content: '<p>Konten berita...</p>',
    date: getTimeAgo(6),
    author: 'Antara',
    image: 'https://images.unsplash.com/photo-1540910419868-474947cebacb?auto=format&fit=crop&q=80&w=2000',
    category: 'Nasional'
  },
  {
    id: 18,
    slug: 'bmkg-ingatkan-potensi-cuaca-ekstrem',
    title: 'BMKG Ingatkan Potensi Cuaca Ekstrem di Sejumlah Wilayah',
    excerpt: 'Masyarakat diminta waspada terhadap potensi hujan lebat disertai angin kencang dalam sepekan ke depan.',
    content: '<p>Konten berita...</p>',
    date: getTimeAgo(8),
    author: 'Dwikorita',
    image: 'https://images.unsplash.com/photo-1514632542677-48fae74a01b2?auto=format&fit=crop&q=80&w=2000',
    category: 'Nasional'
  },
  {
    id: 19,
    slug: 'ai-semakin-canggih-pekerjaan-ini-terancam',
    title: 'AI Semakin Canggih, Deretan Pekerjaan Ini Terancam Digantikan Robot',
    excerpt: 'Perkembangan kecerdasan buatan (AI) yang masif menimbulkan kekhawatiran akan hilangnya sejumlah jenis pekerjaan.',
    content: '<p>Konten berita...</p>',
    date: getTimeAgo(5),
    author: 'Elon Musk',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=2000',
    category: 'Teknologi'
  },
  {
    id: 20,
    slug: 'ponsel-lipat-terbaru-siap-rilis',
    title: 'Bocoran Spesifikasi Ponsel Lipat Terbaru yang Siap Rilis Bulan Depan',
    excerpt: 'Persaingan pasar smartphone lipat semakin sengit. Salah satu brand besar siap meluncurkan jagoan barunya.',
    content: '<p>Konten berita...</p>',
    date: getTimeAgo(15),
    author: 'GadgetIn',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=2000',
    category: 'Teknologi'
  },
  {
    id: 21,
    slug: 'ihsg-menguat-di-awal-pekan',
    title: 'IHSG Diprediksi Menguat Terbatas di Awal Pekan',
    excerpt: 'Indeks Harga Saham Gabungan (IHSG) berpotensi melanjutkan penguatan didorong oleh sentimen positif global.',
    content: '<p>Konten berita...</p>',
    date: getTimeAgo(9),
    author: 'Ellen May',
    image: 'https://images.unsplash.com/photo-1611974765270-ca12586343bb?auto=format&fit=crop&q=80&w=2000',
    category: 'Bisnis'
  },
  {
    id: 22,
    slug: 'ekspor-indonesia-tembus-rekor-baru',
    title: 'Nilai Ekspor Komoditas Unggulan Indonesia Tembus Rekor Baru',
    excerpt: 'Kinerja ekspor non-migas Indonesia menunjukkan tren positif di tengah ketidakpastian ekonomi global.',
    content: '<p>Konten berita...</p>',
    date: getTimeAgo(14),
    author: 'Sri Mulyani',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=2000',
    category: 'Bisnis'
  },
  {
    id: 23,
    slug: 'tren-work-from-cafe-meningkat',
    title: 'Tren "Work From Cafe" Meningkat, Ini Rekomendasi Cafe Nyaman di Jaksel',
    excerpt: 'Bosan kerja di rumah? Berikut daftar cafe di Jakarta Selatan yang cocok untuk WFC dengan fasilitas lengkap.',
    content: '<p>Konten berita...</p>',
    date: getTimeAgo(11),
    author: 'Anak Jaksel',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=2000',
    category: 'Lifestyle'
  },
  {
    id: 24,
    slug: 'manfaat-meditasi-untuk-pekerja',
    title: '5 Manfaat Rutin Meditasi Bagi Pekerja Kantoran',
    excerpt: 'Stres karena pekerjaan menumpuk? Coba luangkan waktu 10 menit setiap hari untuk meditasi.',
    content: '<p>Konten berita...</p>',
    date: getTimeAgo(18),
    author: 'Deepak Chopra',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=2000',
    category: 'Lifestyle'
  }
];

export const getFeaturedPost = () => posts[0];
export const getLatestPosts = () => posts.slice(1, 7); // Main grid posts 6 items
export const getPopularPosts = () => [...posts].sort(() => 0.5 - Math.random()).slice(0, 5); // Random 5 for popular
export const getSorotanPosts = () => [...posts].sort(() => 0.5 - Math.random()).slice(0, 6); // Random 6 for Sorotan
export const getBeritaTerkini = () => posts.slice(7); // Remaining posts for Berita Terkini
export const getAllPosts = () => posts;
export const getPostBySlug = (slug: string) => posts.find(post => post.slug === slug);
export const getAllCategories = () => [...new Set(posts.map(post => post.category))];
export const getPostsByCategory = (category: string) => posts.filter(post => post.category === category);
export const searchPosts = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return posts.filter(post =>
    post.title.toLowerCase().includes(lowerQuery) ||
    post.content.toLowerCase().includes(lowerQuery) ||
    post.excerpt.toLowerCase().includes(lowerQuery)
  );
};
