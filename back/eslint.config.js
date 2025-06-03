import js from '@eslint/js';
import ts from 'typescript-eslint';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      semi: 'off',
      quotes: 'off',
      indent: 'off',

      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
    ignores: ['**/node_modules/', 'dist/', '**/*.d.ts'],
  },
  prettier,
];
