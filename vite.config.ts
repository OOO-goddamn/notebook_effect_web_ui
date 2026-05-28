import { defineConfig } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        babel({ presets: [reactCompilerPreset()] }),
        tailwindcss(),
    ],
    css: {
        modules: {
            localsConvention: 'camelCase',
        },
    },
    resolve: {
        alias: {
            Features: path.resolve(__dirname, './src/features'),
            Components: path.resolve(__dirname, './src/components'),
            Api: path.resolve(__dirname, './src/api'),
            Lib: path.resolve(__dirname, './src/lib'),
            Config: path.resolve(__dirname, './src/config'),
            Hooks: path.resolve(__dirname, './src/hooks'),
            Store: path.resolve(__dirname, './src/store'),
            Styles: path.resolve(__dirname, './src/styles'),
            Utils: path.resolve(__dirname, './src/utils'),
            Shared: path.resolve(__dirname, './src/shared'),
        },
    },
});
