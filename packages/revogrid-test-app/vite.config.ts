import { basename, join } from 'path';
import { cwd } from 'process';
import { defineConfig, UserConfigExport } from 'vite';
import vue from '@vitejs/plugin-vue';
import checker from 'vite-plugin-checker';

export default defineConfig(({ command }) => {
  const port = 8080;

  const defaults: UserConfigExport = {
    build: {
      outDir: join('..', '..', 'build', basename(cwd())),
      emptyOutDir: true,
    },

    plugins: [
      vue({
        template: {
          compilerOptions: {
            isCustomElement: (tag) => tag.includes('-'),
          },
        },
      }),

      checker({
        typescript: true,
        vueTsc: true,
        eslint: {
          lintCommand: 'eslint "./src/**/*.{ts,vue,js,json}"',
        },
      }),
    ],
  };

  if (command === 'serve') {
    return {
      ...defaults,

      server: {
        port,
      },
    };
  }

  return defaults;
});
