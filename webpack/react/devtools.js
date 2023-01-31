const path = require('path');

function getDevTool (config) {
    if (config.isEnvProduction) {
        if (config.shouldUseSourceMaps) {
            return 'source-map';
        }

        return false;
    }

    if (config.isEnvDevelopment) {
        return 'cheap-module-source-map';
    }

    return false;
}

function createSourcemapPathMapper (config) {
    return (info) => {
        let filenameTemplate = '';

        if (config.isEnvProduction) {
            filenameTemplate = path.relative(config.paths.appSrc, info.absoluteResourcePath);
        }

        if (config.isEnvDevelopment) {
            filenameTemplate = path.resolve(info.absoluteResourcePath);
        }

        return filenameTemplate.replace(/\\/g, '/');
    }
}

module.exports = function addDevTools (config, webpackConfig) {
    webpackConfig.devtool = getDevTool(config);
    webpackConfig.output.devtoolModuleFilenameTemplate = createSourcemapPathMapper(config);
};
