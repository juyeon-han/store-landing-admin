import react from '@vitejs/plugin-react';
import path from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  return {
    plugins: [react(), tsconfigPaths()],
    resolve: {
      alias: [
        { find: '@', replacement: path.resolve(__dirname, './src') },
        {
          find: 'node_modules',
          replacement: path.resolve(__dirname, './node_modules'),
        },
      ],
    },
    build: {
      outDir: './dist',
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            const extType = (() => {
              const ext = assetInfo.name?.split('.').at(-1) || '';
              if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
                return 'img';
              }
              return ext;
            })();
            return `assets/${extType}/[name]-[hash][extname]`;
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              const module =
                id.split('node_modules/').pop()?.split('/')[0] || '';
              return `vendor/${module}`;
            }
          },
        },
      },
    },
    esbuild: {
      drop: command === 'build' ? ['console'] : undefined,
    },
    server: {
      port: 3000,
      open: true,
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      include: ['./src/**/*.{spec,test}.*'],
      passWithNoTests: true,
      coverage: {
        reporter: ['text'],
        include: ['./src/**/*.ts'],
        exclude: ['./src/**/*.test.ts'],
      },
    },
  };
});
