module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:react/recommended' //add
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],// add
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      "react/jsx-uses-vars:error",//add
      "react/jsx-uses-react:error",//add
      { allowConstantExport: true },
    ],
  },
}
