import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import astro from 'eslint-plugin-astro';
import prettierConfig from 'eslint-config-prettier';

export default [
  { ignores: ['dist', '.astro'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs['flat/recommended'],
  prettierConfig,
  {
    files: ['**/*.{ts,astro}'],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    // Inline <script> blocks inside .astro files run in the browser.
    files: ['**/*.astro/*.ts'],
    languageOptions: {
      globals: globals.browser,
    },
  },
];
