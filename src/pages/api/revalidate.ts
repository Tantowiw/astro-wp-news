/**
 * API Endpoint untuk trigger rebuild
 * Di-trigger dari WordPress saat post publish
 * 
 * Pure SSG approach: Trigger Vercel Deploy Hook untuk rebuild penuh
 * 
 * Usage:
 * POST /api/revalidate?type=all
 * Headers: x-revalidate-token: YOUR_SECRET_TOKEN
 */

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  // Verify security token
  const token = request.headers.get('x-revalidate-token');
  const SECRET_TOKEN = import.meta.env.REVALIDATE_SECRET || 'your-secret-token';
  
  if (token !== SECRET_TOKEN) {
    return new Response(JSON.stringify({ 
      error: 'Unauthorized',
      message: 'Invalid revalidation token'
    }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const url = new URL(request.url);
  const type = url.searchParams.get('type');

  try {
    if (type === 'all') {
      // Trigger full rebuild via Vercel Deploy Hook
      const vercelHook = import.meta.env.VERCEL_DEPLOY_HOOK;
      
      if (!vercelHook) {
        return new Response(JSON.stringify({ 
          error: 'Configuration error',
          message: 'VERCEL_DEPLOY_HOOK not configured'
        }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      // Call Vercel webhook to trigger rebuild
      const response = await fetch(vercelHook, { method: 'POST' });
      
      if (!response.ok) {
        throw new Error(`Vercel webhook failed: ${response.status}`);
      }
      
      return new Response(JSON.stringify({ 
        message: 'Full rebuild triggered via Vercel',
        status: 'success',
        timestamp: new Date().toISOString()
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ 
      error: 'Invalid request',
      message: 'Use ?type=all to trigger rebuild'
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Revalidation error:', error);
    return new Response(JSON.stringify({ 
      error: 'Rebuild failed',
      message: String(error)
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
