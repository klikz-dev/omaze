module.exports = {
    'env': {
        'node': true,
        'jest': true,
        'es6': true,
    },
    'extends': [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true,
        },
    },
    'plugins': [
        'import',
        'jsx-a11y',
        '@typescript-eslint/eslint-plugin',
        'react',
    ],
    'settings': {
        'react': {
            'version': 'require(\'./package.json\').dependencies.react',
        },
    },
    'globals': {
        'document': true,
        'window': true,
        'localStorage': true,
    },
    'rules': {
        'prettier/prettier': 'off',
        '@typescript-eslint/ban-types': [
            'error',
            {
                'types': {
                    'React.ReactElement': 'Import ReactElement directly',
                    'React.Fragment': 'Import Fragment directly',
                },
            },
        ],
        '@typescript-eslint/explicit-function-return-type': [
            'error',
            {
                allowExpressions: false,
                allowTypedFunctionExpressions: false,
                allowHigherOrderFunctions: false,
            },
        ],
        'arrow-body-style': ['error', 'always'],
        'eol-last': ['error', 'always'],
        'arrow-parens': ['error', 'always'],
        'indent': 'off',
        'import/no-unresolved': [
            'error',
        ],
        'import/named': [
            'error',
        ],
        'import/default': [
            'error',
        ],
        'import/no-absolute-path': [
            'error',
        ],
        'import/no-webpack-loader-syntax': [
            'error',
        ],
        'import/no-self-import': [
            'error',
        ],
        'import/no-cycle': [
            'error',
        ],
        'import/no-useless-path-segments': [
            'error',
        ],
        'import/first': [
            'error',
        ],
        'import/no-duplicates': [
            'error',
        ],
        'import/order': [
            'error',
            {
                'groups': [
                    'external',
                    'parent',
                    'sibling',
                ],
                'newlines-between': 'always',
                'alphabetize': {
                    'order': 'asc',
                    'caseInsensitive': true,
                },
            },
        ],
        'import/newline-after-import': [
            'error',
            {
                'count': 1,
            },
        ],
        'import/no-default-export': ['error'],
        'semi': ['error', 'always'],
        'no-extra-semi': ['error'],
        'space-before-function-paren': ['error', 'always'],
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/explicit-member-accessibility': [
            'error',
        ],
        '@typescript-eslint/space-before-function-paren': [
            'error',
        ],
        '@typescript-eslint/semi': [
            'error',
        ],
        '@typescript-eslint/indent': ['error', 4],
        '@typescript-eslint/naming-convention': [
            'error',
            {
                'selector': 'interface',
                'format': ['PascalCase'],
                'custom': {
                    'regex': '^I[A-Z]',
                    'match': true,
                },
            },
            {
                'selector': 'typeParameter',
                'format': ['PascalCase'],
                'custom': {
                    'regex': 'T[A-Z][a-zA-Z]+$',
                    'match': true,
                },
            },
        ],
        'camelcase': [2, { 'properties': 'always' }],
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/typedef': [
            'error',
            {
                arrayDestructuring: true,
                arrowParameter: true,
                memberVariableDeclaration: true,
                objectDestructuring: true,
                parameter: true,
                propertyDeclaration: true,
                variableDeclaration: true,
            },
        ],
        'object-shorthand': [
            'error',
            'never',
        ],
        'comma-dangle': [
            'error',
            'always-multiline',
        ],
        'no-unused-vars': [
            'error',
            {
                'vars': 'all',
                'args': 'none',
                'ignoreRestSiblings': false,
            },
        ],
        'quotes': [
            'error',
            'single',
        ],
        'object-property-newline': [
            'error',
            {
                'allowAllPropertiesOnSameLine': false,
            },
        ],
        'react/jsx-wrap-multilines': 'error',
        'react/jsx-closing-bracket-location': ['error', { 'location': 'line-aligned' }],
        'no-mixed-spaces-and-tabs': 'error',
        'no-trailing-spaces': 'error',
        'no-whitespace-before-property': 'error',
        'space-before-blocks': ['error', 'always'],
        'spaced-comment': ['error', 'always'],
        'no-spaced-func': 'error',
        'semi-spacing': [
            'error',
            {
                'before': false,
                'after': true,
            },
        ],
        'keyword-spacing': [
            'error',
            {
                'before': true,
                'after': true,
            },
        ],
        'object-curly-spacing': ['error', 'always'],
        'no-multiple-empty-lines': ['error', {
            'max': 1,
            'maxBOF': 0,
        }],
        'padding-line-between-statements': [
            'error',
            {
                'blankLine': 'always',
                'prev': '*',
                'next': [
                    'block',
                    'block-like',
                    'cjs-export',
                    'class',
                    'const',
                    'let',
                    'var',
                ],
            },
            {
                'blankLine': 'always',
                'prev': [
                    'block',
                    'block-like',
                    'cjs-export',
                    'class',
                    'const',
                    'let',
                    'var',
                ],
                'next': '*',
            },
            {
                'blankLine': 'never',
                'prev': ['const', 'let', 'var'],
                'next': ['const', 'let', 'var'],
            },
            {
                'blankLine': 'always',
                'prev': ['multiline-const', 'multiline-let'],
                'next': '*',
            },
            {
                'blankLine': 'always',
                'prev': '*',
                'next': ['multiline-const', 'multiline-let'],
            },
            {
                'blankLine': 'always',
                'prev': ['cjs-import'],
                'next': ['const', 'let', 'var'],
            },
            {
                'blankLine': 'never',
                'prev': ['cjs-import'],
                'next': ['cjs-import'],
            },
        ],
        'react/forbid-elements': ['error', { 'forbid': ['React.Fragment'] }],
    },
    'overrides': [
        {
            'files': [
                '**/*.test.tsx',
            ],
            'env': {
                'jest': true,
            },
        },
    ],
};
