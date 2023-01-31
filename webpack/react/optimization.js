const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const TerserPlugin = require('terser-webpack-plugin');

function getJsMinimizer (config) {
    return new TerserPlugin({
        terserOptions: {
            parse: {
                ecma: 8,
            },
            compress: {
                ecma: 5,
                warnings: false,
                comparisons: false,
                inline: 2,
            },
            mangle: {
                safari10: true,
            },
            keep_classnames: config.isEnvProductionProfile,
            keep_fnames: config.isEnvProductionProfile,
            output: {
                ecma: 5,
                comments: false,
                ascii_only: true,
            },
        },
        sourceMap: config.shouldUseSourceMap,
    });
}

function getCssMinimizer (config) {
    let mapConfig = false;

    if (config.shouldUseSourceMaps) {
        mapConfig = {
            inline: false,
            annotation: true,
        }
    }

    return new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
            parser: safePostCssParser,
            map: mapConfig,
        },
        cssProcessorPluginOptions: {
            preset: [
                'default',
                {
                    minifyFontValues: {
                        removeQuotes: false,
                    },
                },
            ],
        },
    });
}

module.exports = function addOptimization (config, webpackConfig) {
    webpackConfig.optimization = {
        minimize: config.isEnvProduction,
        minimizer: [
            getJsMinimizer(config),
            getCssMinimizer(config),
        ],
        splitChunks: {
            chunks: 'all',
            name: false,
        },
        runtimeChunk: {
            name: (entrypoint) => {
                return `runtime-${entrypoint.name}`;
            }
        },
    };
};
