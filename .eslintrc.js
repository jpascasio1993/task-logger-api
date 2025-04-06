module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
        'prettier/prettier': [
            'warn',
            {
                "singleQuote": true,

                // "trailingComma": "all",
                // "printWidth": 120,
                
            }
        ],
        "@typescript-eslint/no-non-null-assertion": "warn"
    },
};