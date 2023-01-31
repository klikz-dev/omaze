const fs = require('fs');
const path = require('path');
const Config = require('./config');
const addDevTools = require('./devtools');
const addOptimization = require('./optimization');
const addResolve = require('./resolve');
const addModule = require('./module');
const addPlugins = require('./plugins');

const appDirectory = fs.realpathSync(process.cwd());

function resolveApp (relativePath) {
    return path.resolve(appDirectory, relativePath);
}

function getMode (config) {
    if (config.isEnvProduction) {
        return 'production';
    }

    if (config.isEnvDevelopment) {
        return 'development';
    }
}

const moduleFileExtensions = [
    'web.mjs',
    'mjs',
    'web.js',
    'js',
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'json',
    'web.jsx',
    'jsx',
];

const resolveModule = (resolveFn, filePath) => {
    const extension = moduleFileExtensions.find(extension =>
        fs.existsSync(resolveFn(`${filePath}.${extension}`))
    );

    if (extension) {
        return resolveFn(`${filePath}.${extension}`);
    }

    return resolveFn(`${filePath}.js`);
};

module.exports = function createBuild (appName, webpackEnv) {
    const paths = {
        appPath: resolveApp('.'),
        appBuild: resolveApp('assets'),
        appIndexJs: resolveModule(resolveApp, `src/js/apps/${appName}/index`),
        appPackageJson: resolveApp('package.json'),
        appSrc: resolveApp(`src/js/apps/${appName}`),
        appTsConfig: resolveApp('tsconfig.json'),
        // testsSetup: resolveModule(resolveApp, 'src/setupTests'),
        appNodeModules: resolveApp('node_modules'),
        moduleFileExtensions: moduleFileExtensions,
        templateName: resolveApp(`snippets/${appName}.liquid`),
        publicUrlOrPath: resolveApp('assets'),
    };

    return function () {
        if (!webpackEnv) {
            webpackEnv = 'production';
        }

        const config = new Config(appName, webpackEnv, paths);

        const webpackConfig = {
            mode: getMode(config),
            // Stop compilation early in production
            bail: config.isEnvProduction,
            entry: [config.paths.appIndexJs].concat(paths.entries || []),
            output: {
                path: config.paths.appBuild,
                pathinfo: config.isEnvDevelopment,
                filename: `${config.name}-[name].[contenthash:8].js`,
                // TODO: remove this when upgrading to webpack 5
                // futureEmitAssets: true,
                chunkFilename: `${config.name}-[name].[contenthash:8].chunk.js`,
                jsonpFunction: `webpackJsonp${config.name}`,
                globalObject: 'this',
            },
        };

        addDevTools(config, webpackConfig);
        addOptimization(config, webpackConfig);
        addResolve(config, webpackConfig);
        addModule(config, webpackConfig);
        addPlugins(config, webpackConfig);

        return webpackConfig;
    }
}
