const getStyleLoaders = require('./styleLoaders');
const getLocalIdent = require('./cssModulesLocalIdent');

function getLinter (config) {
    return {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        enforce: 'pre',
        use: [{
            loader: require.resolve('eslint-loader'),
        }],
        include: config.paths.appSrc,
    };
}

function getUrlLoader (config) {
    const imageInlineSizeLimit = parseInt(
        process.env.IMAGE_INLINE_SIZE_LIMIT || '10000'
    );

    return {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
            limit: imageInlineSizeLimit,
            name: `${config.name}-[name].[hash:8].[ext]`,
        },
    };
}

function getBabelLoader (config) {
    return {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        include: config.paths.appSrc,
        loader: require.resolve('babel-loader'),
        options: {
            customize: require.resolve(
                'babel-preset-react-app/webpack-overrides'
            ),

            plugins: [
                require.resolve('babel-plugin-transform-class-properties'),
                [
                    require.resolve('babel-plugin-named-asset-import'),
                    {
                        loaderMap: {
                            svg: {
                                ReactComponent: '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                            },
                        },
                    },
                ],
            ],
            // This is a feature of `babel-loader` for webpack (not Babel itself).
            // It enables caching results in ./node_modules/.cache/babel-loader/
            // directory for faster rebuilds.
            cacheDirectory: true,
            // See #6846 for context on why cacheCompression is disabled
            cacheCompression: false,
            compact: config.isEnvProduction,
            presets: ['react-app'],
        },
    };
}

function getJsBabelLoader (config) {
    return {
        test: /\.(js|mjs)$/,
        exclude: /@babel(?:\/|\\{1,2})runtime/,
        loader: require.resolve('babel-loader'),
        options: {
            babelrc: false,
            configFile: false,
            compact: false,
            presets: [
                [
                    require.resolve('babel-preset-react-app/dependencies'),
                    {
                        helpers: true,
                    },
                ],
            ],
            cacheDirectory: true,
            cacheCompression: false,
            sourceMaps: config.shouldUseSourceMap,
            inputSourceMap: config.shouldUseSourceMap,
        },
    };
}

function getCssLoader (config) {
    return {
        test: config.cssRegex,
        exclude: config.cssModuleRegex,
        use: getStyleLoaders(config, {
            importLoaders: 1,
            sourceMap: config.isEnvProduction && config.shouldUseSourceMap,
        }),
        // Don't consider CSS imports dead code even if the
        // containing package claims to have no side effects.
        // Remove this when webpack adds a warning or an error for this.
        // See https://github.com/webpack/webpack/issues/6571
        sideEffects: true,
    };
}

function getCssModuleLoader (config) {
    return {
        test: config.cssModuleRegex,
        use: getStyleLoaders(config, {
            importLoaders: 1,
            sourceMap: config.isEnvProduction && config.shouldUseSourceMap,
            useModules: true,
        }),
    };
}

function getFileLoader (config) {
    return {
        loader: require.resolve('file-loader'),
        // Exclude `js` files to keep "css" loader working as it injects
        // its runtime that would otherwise be processed through "file" loader.
        // Also exclude `html` and `json` extensions so they get processed
        // by webpacks internal loaders.
        exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
        options: {
            name: `${config.name}-[name].[hash:8].[ext]`,
        },
    };
}

module.exports = function addModule (config, webpackConfig) {
    webpackConfig.module = {
        strictExportPresence: true,
        rules: [
            {
                parser: {
                    requireEnsure: false,
                },
            },
            getLinter(config),
            {
                oneOf: [
                    getUrlLoader(config),
                    getBabelLoader(config),
                    getJsBabelLoader(config),
                    getCssLoader(config),
                    getCssModuleLoader(config),
                    getFileLoader(config),
                ],
            },
        ],
    };
};
