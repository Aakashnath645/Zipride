import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['pwa-icons/*.png', 'robots.txt'],
      manifest: {
        name: 'ZipRide - Your city, your pace.',
        short_name: 'ZipRide',
        description: 'Book cabs instantly with ZipRide',
        theme_color: '#FFD700',
        background_color: '#0A0A0F',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          { src: 'pwa-icons/icon-72.png', sizes: '72x72', type: 'image/png' },
          { src: 'pwa-icons/icon-96.png', sizes: '96x96', type: 'image/png' },
          { src: 'pwa-icons/icon-128.png', sizes: '128x128', type: 'image/png' },
          { src: 'pwa-icons/icon-144.png', sizes: '144x144', type: 'image/png' },
          { src: 'pwa-icons/icon-152.png', sizes: '152x152', type: 'image/png' },
          { src: 'pwa-icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: 'pwa-icons/icon-384.png', sizes: '384x384', type: 'image/png' },
          { src: 'pwa-icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/[abc]\.tile\.openstreetmap\.org\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'osm-tiles',
              expiration: { maxEntries: 500, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
          {
            urlPattern: /^https:\/\/[abc]\.basemaps\.cartocdn\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'carto-tiles',
              expiration: { maxEntries: 500, maxAgeSeconds: 60 * 60 * 24 * 30 },
            },
          },
          {
            urlPattern: /^https:\/\/nominatim\.openstreetmap\.org\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'nominatim-api',
              expiration: { maxEntries: 100, maxAgeSeconds: 60 * 60 },
            },
          },
          {
            urlPattern: /^https:\/\/router\.project-osrm\.org\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'osrm-api',
              expiration: { maxEntries: 50, maxAgeSeconds: 60 * 30 },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});
