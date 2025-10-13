/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:astro/recommended',
    'plugin:jsx-a11y/strict',
    'plugin:tailwindcss/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
    tailwindcss: {
      callees: ['cn'],
      config: 'apps/web/tailwind.config.ts',
    },
  },
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      rules: {
        'astro/no-conflict-set-directives': 'error',
        'astro/prefer-class-list-directive': 'warn',
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.base.json', 'apps/web/tsconfig.json'],
        tsconfigRootDir: __dirname,
      },
      extends: ['plugin:@typescript-eslint/recommended', 'plugin:@typescript-eslint/recommended-requiring-type-checking'],
      rules: {
        '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
        '@typescript-eslint/no-floating-promises': 'error',
      },
    },
    {
      files: ['**/__tests__/**', '**/*.spec.ts', '**/*.test.ts', '**/*.test.tsx'],
      env: { jest: false, node: true },
      extends: ['plugin:testing-library/react', 'plugin:jest-dom/recommended'],
    },
  ],
};
