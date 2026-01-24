// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Output: static (default) - Astro 5 handles caching & revalidation automatically
  output: 'static',

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