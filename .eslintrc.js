module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'standard-with-typescript',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.json'
  },
  rules: {
    semi: ['error', 'always'],
    '@typescript-eslint/semi': ['error', 'always'],
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: { delimiter: 'semi' },
        singleline: { delimiter: 'comma', requireLast: false }
      }
    ],
    'no-multi-spaces': ['error']
  }
};
