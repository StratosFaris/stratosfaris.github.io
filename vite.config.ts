import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import pinyVite from '@pinegrow/piny-vite';

export default defineConfig(() => {
  return {
    base: '/',
    plugins: [react(), tailwindcss(), pinyVite()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      // .vscode/** is ignored so Piny writing its own state there doesn't force full page reloads.
      watch: process.env.DISABLE_HMR === 'true' ? null : { ignored: ['**/.vscode/**'] },
    },
  };
});
