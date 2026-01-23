// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Output: server (SSR) - Enable real-time updates
  output: 'server',
  adapter: vercel(),

  image: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'catatan.co.id',
      },
    ],
  },

  vite: {
    plugins: [tailwindcss()]
  }
});