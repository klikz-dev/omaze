const fs = require('fs');
const postcssNormalize = require('postcss-normalize');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getLocalIdent = require('./cssModulesLocalIdent');

function getCssOptions (config, cssConfig) {
    const isEnvProduction = config.isEnvProduction;
    const useModules = cssConfig.useModules;
    const options = {
        importLoaders: 1,
    };

    if (isEnvProduction) {
        options.sourceMap = true;
    }

    if (useModules) {
        options.modules = {
            getLocalIdent: getLocalIdent,
        };
    }

    return options;
}

module.exports = function getStyleLoaders (config, options) {
    const isEnvDevelopment = config.isEnvDevelopment;
    const isEnvProduction = config.isEnvProduction;

    const loaders = [];

    if (isEnvDevelopment) {
        loaders.push(require.resolve('style-loader'));
    }

    if (isEnvProduction) {
        loaders.push({
            loader: MiniCssExtractPlugin.loader,
            // css is located in `static/css`, use '../../' to locate index.html folder
            // in production `paths.publicUrlOrPath` can be a relative path
            options: config.paths.publicUrlOrPath.startsWith('.') ? {publicPath: '../../'} : {},
        });
    }

    loaders.push({
        loader: require.resolve('css-loader'),
        options: getCssOptions(config, options),
    });

    const customTailwindConfigPath = config.paths.appSrc + '/tailwind.config.js';
    const tailwindConfig = {};

    if (fs.existsSync(customTailwindConfigPath)) {
        tailwindConfig.config = customTailwindConfigPath;
    }

    loaders.push({
        // Options for PostCSS as we reference these options twice
        // Adds vendor prefixing based on your specified browser support in
        // package.json
        loader: require.resolve('postcss-loader'),
        options: {
            // Necessary for external CSS imports to work
            // https://github.com/facebook/create-react-app/issues/2677
            ident: 'postcss',
            plugins: () => [
                require('tailwindcss')(tailwindConfig),
                require('postcss-flexbugs-fixes'),
                require('postcss-preset-env')({
                    autoprefixer: {
                        flexbox: 'no-2009',
                    },
                    stage: 3,
                }),
                // Adds PostCSS Normalize as the reset css with default options,
                // so that it honors browserslist config in package.json
                // which in turn let's users customize the target behavior as per their needs.
                postcssNormalize(),
            ],
            sourceMap: config.isEnvProduction && config.shouldUseSourceMap,
        },
    });

    return loaders;
}
