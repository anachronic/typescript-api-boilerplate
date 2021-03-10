module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  env: {
    node: true,
  },
  ignorePatterns: ['build/**/*'],
  overrides: [
    {
      files: '**/*.js',
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: 'src/**/*.ts',
      parserOptions: {
        project: ['tsconfig.json'],
      },
      rules: {
        '@typescript-eslint/await-thenable': 'error',
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
      },
    },
    {
      files: '**/*.ts',
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
  ],
}
