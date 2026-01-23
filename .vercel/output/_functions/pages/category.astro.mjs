import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_DUxqW-ZV.mjs';
import 'piccolore';
import { b as getCategories, d as $$MainLayout, $ as $$Header, c as $$Footer } from '../chunks/Footer_DDHsvalb.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const categories = await getCategories();
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Daftar Kategori Berita - NewsPortal" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", $$Header, {})} ${maybeRenderHead()}<main class="pt-32 pb-16 min-h-screen bg-gray-50"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <!-- Page Header --> <div class="mb-12 border-b border-gray-200 pb-8 bg-white p-8 rounded-xl shadow-sm text-center"> <h1 class="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight">
Eksplorasi <span class="text-blue-600">Kategori</span> </h1> <p class="mt-4 text-gray-500 text-lg max-w-2xl mx-auto">
Temukan topik berita yang Anda sukai melalui daftar kategori lengkap kami.
</p> </div> <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"> ${categories.map((category) => renderTemplate`<a${addAttribute(`/category/${category.slug}`, "href")} class="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 text-center hover:-translate-y-1"> <div class="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors"> <span class="text-2xl font-bold">${category.name.charAt(0)}</span> </div> <h3 class="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors"> ${category.name} </h3> <p class="text-xs text-gray-400 mt-2 font-medium">Klik untuk melihat berita</p> </a>`)} </div> </div> </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ` })}`;
}, "D:/VibeCoding AntiGravity/astro-wp-news/src/pages/category/index.astro", void 0);

const $$file = "D:/VibeCoding AntiGravity/astro-wp-news/src/pages/category/index.astro";
const $$url = "/category";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
