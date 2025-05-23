import github from 'eslint-plugin-github';

export default [
  // github.getFlatConfigs().browser,
  github.getFlatConfigs().recommended,
  github.getFlatConfigs().react,
  ...github.getFlatConfigs().typescript,
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    ignores: ['eslint.config.mjs'],
    rules: {
      'github/array-foreach': 'error',
      'github/async-preventdefault': 'warn',
      'github/no-then': 'error',
      'github/no-blur': 'error',
      'i18n-text/no-en': 'off',
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: false,
          project: './tsconfig.json',
        },
      },
    },
  },
];
