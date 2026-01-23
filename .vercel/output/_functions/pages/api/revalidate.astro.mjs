export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  const token = request.headers.get("x-revalidate-token");
  const SECRET_TOKEN = "your-secret-token";
  if (token !== SECRET_TOKEN) {
    return new Response(JSON.stringify({
      error: "Unauthorized",
      message: "Invalid revalidation token"
    }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }
  const url = new URL(request.url);
  const type = url.searchParams.get("type");
  try {
    if (type === "all") {
      const vercelHook = undefined                                  ;
      if (!vercelHook) {
        return new Response(JSON.stringify({
          error: "Configuration error",
          message: "VERCEL_DEPLOY_HOOK not configured"
        }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
      const response = await fetch(vercelHook, { method: "POST" });
      if (!response.ok) {
        throw new Error(`Vercel webhook failed: ${response.status}`);
      }
      return new Response(JSON.stringify({
        message: "Full rebuild triggered via Vercel",
        status: "success",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({
      error: "Invalid request",
      message: "Use ?type=all to trigger rebuild"
    }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return new Response(JSON.stringify({
      error: "Rebuild failed",
      message: String(error)
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
