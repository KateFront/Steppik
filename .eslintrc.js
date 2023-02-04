module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends: [
        'prettier',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
    ],
    //extends: '@react-native-community',
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['prettier', '@typescript-eslint', 'react', 'unused-imports'],
    rules: {
        'unused-imports/no-unused-imports-ts': 2,
        'prettier/prettier': 'error',
        'react/prop-types': 0,
        '@typescript-eslint/no-explicit-any': 1,
        '@typescript-eslint/prefer-interface': 0,
        '@typescript-eslint/no-non-null-assertion': 1,
        // '@typescript-eslint/ban-ts-ignore': 2, TODO set Error in the beginning document, why?
        '@typescript-eslint/no-unused-vars': 2,
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/camelcase': 0,
    },
    settings: {
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            typescript: {},
        },
        react: {
            version: 'detect',
        },
    },
};
