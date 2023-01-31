const PnpWebpackPlugin = require('pnp-webpack-plugin');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

const getModules = require('./create-react-app-eject/modules');

function getProfilingAliases (config) {
    if (!config.isEnvProductionProfile) {
        return {};
    }

    return {
        'react-dom$': 'react-dom/profiling',
        'scheduler/tracing': 'scheduler/tracing-profiling',
    };
}

module.exports = function addResolve (config, webpackConfig) {
    const modules = getModules(config);

    webpackConfig.resolve = {
        modules: [
            'node_modules',
            config.paths.appNodeModules
        ].concat(modules.additionalModulePaths || []),
        extensions: config.paths.moduleFileExtensions.map((ext) => {
            return `.${ext}`;
        }),
        alias: {
            'react-native': 'react-native-web',
            ...getProfilingAliases(config),
        },
        plugins: [
            PnpWebpackPlugin,
            new ModuleScopePlugin(config.paths.appSrc, [config.paths.appPackageJson]),
        ],
    };

    webpackConfig.resolveLoader = {
        plugins: [
            PnpWebpackPlugin.moduleLoader(module),
        ],
    };
};
