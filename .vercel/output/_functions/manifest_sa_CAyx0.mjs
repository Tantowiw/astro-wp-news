import 'piccolore';
import { p as decodeKey } from './chunks/astro/server_DUxqW-ZV.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_BDphTjip.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///D:/VibeCoding%20AntiGravity/astro-wp-news/","cacheDir":"file:///D:/VibeCoding%20AntiGravity/astro-wp-news/node_modules/.astro/","outDir":"file:///D:/VibeCoding%20AntiGravity/astro-wp-news/dist/","srcDir":"file:///D:/VibeCoding%20AntiGravity/astro-wp-news/src/","publicDir":"file:///D:/VibeCoding%20AntiGravity/astro-wp-news/public/","buildClientDir":"file:///D:/VibeCoding%20AntiGravity/astro-wp-news/dist/client/","buildServerDir":"file:///D:/VibeCoding%20AntiGravity/astro-wp-news/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/revalidate","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/revalidate\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"revalidate","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/revalidate.ts","pathname":"/api/revalidate","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.DOlVrI5f.css"}],"routeData":{"route":"/category/[slug]","isIndex":false,"type":"page","pattern":"^\\/category\\/([^/]+?)\\/?$","segments":[[{"content":"category","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/category/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.DOlVrI5f.css"}],"routeData":{"route":"/category","isIndex":true,"type":"page","pattern":"^\\/category\\/?$","segments":[[{"content":"category","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/category/index.astro","pathname":"/category","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.DOlVrI5f.css"}],"routeData":{"route":"/search","isIndex":false,"type":"page","pattern":"^\\/search\\/?$","segments":[[{"content":"search","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/search.astro","pathname":"/search","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.DOlVrI5f.css"},{"type":"inline","content":".share-buttons-container[data-astro-cid-zllr3mxm]{margin:2rem 0;padding:1.5rem;background-color:#f9fafb;border-radius:.5rem;border:1px solid #e5e7eb}.share-label[data-astro-cid-zllr3mxm]{font-size:.875rem;font-weight:600;color:#374151;margin:0 0 1rem;text-transform:uppercase;letter-spacing:.05em}.share-buttons-group[data-astro-cid-zllr3mxm]{display:flex;flex-wrap:wrap;gap:.75rem}.share-button[data-astro-cid-zllr3mxm]{display:inline-flex;align-items:center;gap:.5rem;padding:.625rem 1.25rem;border-radius:.375rem;font-weight:600;font-size:.875rem;text-decoration:none;transition:all .2s ease-in-out;border:none;cursor:pointer;color:#fff;text-transform:capitalize}.share-icon[data-astro-cid-zllr3mxm]{width:1.25rem;height:1.25rem}.share-button[data-astro-cid-zllr3mxm].facebook{background-color:#1877f2}.share-button[data-astro-cid-zllr3mxm].facebook:hover{background-color:#166fe5;transform:translateY(-2px);box-shadow:0 4px 12px #1877f24d}.share-button[data-astro-cid-zllr3mxm].twitter{background-color:#1da1f2}.share-button[data-astro-cid-zllr3mxm].twitter:hover{background-color:#1a91da;transform:translateY(-2px);box-shadow:0 4px 12px #1da1f24d}.share-button[data-astro-cid-zllr3mxm].whatsapp{background-color:#25d366}.share-button[data-astro-cid-zllr3mxm].whatsapp:hover{background-color:#20ba5a;transform:translateY(-2px);box-shadow:0 4px 12px #25d3664d}@media(max-width:640px){.share-buttons-group[data-astro-cid-zllr3mxm]{gap:.5rem}.share-button[data-astro-cid-zllr3mxm]{flex:1;justify-content:center;padding:.5rem .75rem;font-size:.75rem}.share-icon[data-astro-cid-zllr3mxm]{width:1rem;height:1rem}}.wp-content p{margin-bottom:1.5rem;line-height:1.8}.wp-content h2,.wp-content h3{margin-top:2rem;margin-bottom:1rem;font-weight:700}.wp-content img{height:auto;max-width:100%;border-radius:.75rem;margin:2rem 0}.wp-content blockquote{font-style:italic;border-left:4px solid #3b82f6;padding-left:1.5rem;margin:2rem 0;color:#4b5563}\n"}],"routeData":{"route":"/[slug]","isIndex":false,"type":"page","pattern":"^\\/([^/]+?)\\/?$","segments":[[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/_slug_.DOlVrI5f.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["D:/VibeCoding AntiGravity/astro-wp-news/src/pages/[slug].astro",{"propagation":"none","containsHead":true}],["D:/VibeCoding AntiGravity/astro-wp-news/src/pages/category/[slug].astro",{"propagation":"none","containsHead":true}],["D:/VibeCoding AntiGravity/astro-wp-news/src/pages/category/index.astro",{"propagation":"none","containsHead":true}],["D:/VibeCoding AntiGravity/astro-wp-news/src/pages/index.astro",{"propagation":"none","containsHead":true}],["D:/VibeCoding AntiGravity/astro-wp-news/src/pages/search.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/api/revalidate@_@ts":"pages/api/revalidate.astro.mjs","\u0000@astro-page:src/pages/category/[slug]@_@astro":"pages/category/_slug_.astro.mjs","\u0000@astro-page:src/pages/category/index@_@astro":"pages/category.astro.mjs","\u0000@astro-page:src/pages/search@_@astro":"pages/search.astro.mjs","\u0000@astro-page:src/pages/[slug]@_@astro":"pages/_slug_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_sa_CAyx0.mjs","D:/VibeCoding AntiGravity/astro-wp-news/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DZI8jpzc.mjs","D:/VibeCoding AntiGravity/astro-wp-news/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.BYiTfAvP.js","D:/VibeCoding AntiGravity/astro-wp-news/src/components/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.DuKapMi3.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["D:/VibeCoding AntiGravity/astro-wp-news/src/pages/index.astro?astro&type=script&index=0&lang.ts","const e=document.getElementById(\"load-more-btn\"),d=document.querySelectorAll(\".berita-item.hidden\");e&&d.length>0&&e.addEventListener(\"click\",()=>{d.forEach(t=>{t.classList.remove(\"hidden\")}),e.classList.add(\"hidden\")});"],["D:/VibeCoding AntiGravity/astro-wp-news/src/components/Header.astro?astro&type=script&index=0&lang.ts","const n=document.getElementById(\"mobile-search-btn\"),s=document.getElementById(\"close-search-btn\"),e=document.getElementById(\"mobile-search-overlay\"),c=document.getElementById(\"mobile-search-input\");n?.addEventListener(\"click\",()=>{e?.classList.remove(\"hidden\"),setTimeout(()=>c?.focus(),100)});s?.addEventListener(\"click\",()=>{e?.classList.add(\"hidden\")});document.addEventListener(\"keydown\",t=>{t.key===\"Escape\"&&!e?.classList.contains(\"hidden\")&&e?.classList.add(\"hidden\")});"]],"assets":["/_astro/plus-jakarta-sans-latin-400-normal.Dhut76fR.woff2","/_astro/plus-jakarta-sans-latin-700-normal.CfpNZvy6.woff2","/_astro/plus-jakarta-sans-vietnamese-500-normal.DiU8zqi-.woff2","/_astro/plus-jakarta-sans-latin-ext-500-normal.9VZagAe1.woff2","/_astro/plus-jakarta-sans-latin-500-normal.Bf-nb4oT.woff2","/_astro/plus-jakarta-sans-latin-600-normal.DLTa1BUW.woff2","/_astro/plus-jakarta-sans-vietnamese-600-normal.Y4VTTRme.woff2","/_astro/plus-jakarta-sans-latin-ext-700-normal.BajbvANd.woff2","/_astro/plus-jakarta-sans-vietnamese-700-normal.CV6qDkkj.woff2","/_astro/plus-jakarta-sans-latin-ext-600-normal.DQgPU_Cg.woff2","/_astro/plus-jakarta-sans-vietnamese-400-normal.Cg2kxhWu.woff2","/_astro/plus-jakarta-sans-latin-400-normal.BDKaGhyp.woff","/_astro/plus-jakarta-sans-latin-700-normal.DqEcQeE5.woff","/_astro/plus-jakarta-sans-latin-ext-400-normal.D127hM_v.woff2","/_astro/plus-jakarta-sans-latin-ext-800-normal.B6BjB2Ju.woff2","/_astro/plus-jakarta-sans-vietnamese-800-normal.CxbopLd3.woff2","/_astro/plus-jakarta-sans-latin-800-normal.CusIZhrK.woff2","/_astro/plus-jakarta-sans-vietnamese-500-normal.CvE5C8T-.woff","/_astro/plus-jakarta-sans-latin-500-normal.DYtqi0QS.woff","/_astro/plus-jakarta-sans-latin-ext-500-normal.CqEEAICU.woff","/_astro/plus-jakarta-sans-vietnamese-600-normal.5YsyKbU1.woff","/_astro/plus-jakarta-sans-latin-600-normal.BR_Ojra4.woff","/_astro/plus-jakarta-sans-vietnamese-700-normal.BCh_uG_5.woff","/_astro/plus-jakarta-sans-latin-ext-700-normal.8-d-IyIQ.woff","/_astro/plus-jakarta-sans-latin-ext-600-normal.B0WRRYJ1.woff","/_astro/plus-jakarta-sans-vietnamese-400-normal.B8TCSmUq.woff","/_astro/plus-jakarta-sans-latin-ext-400-normal.2ppkqaOR.woff","/_astro/plus-jakarta-sans-latin-ext-800-normal.BPkb-LBK.woff","/_astro/plus-jakarta-sans-vietnamese-800-normal.BkoGl_sr.woff","/_astro/plus-jakarta-sans-latin-800-normal.BRNHt2w0.woff","/_astro/_slug_.DOlVrI5f.css","/favicon.svg"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"sM1uv0C2O/uKxRaurux6j8+wwjwweVDrWUeApGrFYp4="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
