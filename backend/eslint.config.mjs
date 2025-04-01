import plugin from 'eslint-plugin-mist3rbru'

export default [
  plugin.configs.node,
  plugin.configs.jest,
  {
    rules: {
      '@typescript-eslint/related-getter-setter-pairs': 'off',
    },
  },
  {
    files: ['**/index.ts'],
    rules: {
      '@stylistic/padding-line-between-statements': 'off',
    },
  },
  {
    files: ['**/controllers/**/*.ts', '**/domain/entities/**/*.ts'],
    rules: {
      '@typescript-eslint/no-magic-numbers': 'off',
    },
  },
  {
    files: ['**/controllers/**/*.ts', '**/services/**/*.ts'],
    rules: {
      '@typescript-eslint/max-params': 'off',
    },
  },
  {
    files: ['**/*-mapper.ts'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
    },
  },
]
