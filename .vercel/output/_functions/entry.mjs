import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CgMPVMzz.mjs';
import { manifest } from './manifest_sa_CAyx0.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/revalidate.astro.mjs');
const _page2 = () => import('./pages/category/_slug_.astro.mjs');
const _page3 = () => import('./pages/category.astro.mjs');
const _page4 = () => import('./pages/search.astro.mjs');
const _page5 = () => import('./pages/_slug_.astro.mjs');
const _page6 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/revalidate.ts", _page1],
    ["src/pages/category/[slug].astro", _page2],
    ["src/pages/category/index.astro", _page3],
    ["src/pages/search.astro", _page4],
    ["src/pages/[slug].astro", _page5],
    ["src/pages/index.astro", _page6]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "22de2ed6-a183-4bc2-a9f1-18a7fa4f7022",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
