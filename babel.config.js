const presets = [
    'react-app',
    [
        '@babel/preset-env',
        {
            useBuiltIns: 'entry',
        },
    ],
];

const plugins = ['@babel/plugin-proposal-class-properties', 'import-graphql'];

module.exports = {
    presets,
    plugins,
};