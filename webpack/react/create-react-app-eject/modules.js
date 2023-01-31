'use strict';

const fs = require('fs');
const path = require('path');
const chalk = require('react-dev-utils/chalk');
const resolve = require('resolve');

/**
 * Get additional module paths based on the baseUrl of a compilerOptions object.
 *
 * @param {Object} options
 */
function getAdditionalModulePaths (config, options = {}) {
    const baseUrl = options.baseUrl;

    // We need to explicitly check for null and undefined (and not a falsy value) because
    // TypeScript treats an empty string as `.`.
    if (baseUrl == null) {
        // If there's no baseUrl set we respect NODE_PATH
        // Note that NODE_PATH is deprecated and will be removed
        // in the next major release of create-react-app.

        const nodePath = process.env.NODE_PATH || '';
        return nodePath.split(path.delimiter).filter(Boolean);
    }

    const baseUrlResolved = path.resolve(config.paths.appPath, baseUrl);

    // We don't need to do anything if `baseUrl` is set to `node_modules`. This is
    // the default behavior.
    if (path.relative(config.paths.appNodeModules, baseUrlResolved) === '') {
        return null;
    }

    // Allow the user set the `baseUrl` to `appSrc`.
    if (path.relative(config.paths.appSrc, baseUrlResolved) === '') {
        return [config.paths.appSrc];
    }

    // If the path is equal to the root directory we ignore it here.
    // We don't want to allow importing from the root directly as source files are
    // not transpiled outside of `src`. We do allow importing them with the
    // absolute path (e.g. `src/Components/Button.js`) but we set that up with
    // an alias.
    if (path.relative(config.paths.appPath, baseUrlResolved) === '') {
        return null;
    }

    // Otherwise, throw an error.
    throw new Error(
        chalk.red.bold(
            "Your project's `baseUrl` can only be set to `src` or `node_modules`." +
            ' Create React App does not support other values at this time.'
        )
    );
}

/**
 * Get webpack aliases based on the baseUrl of a compilerOptions object.
 *
 * @param {*} options
 */
function getWebpackAliases (config, options = {}) {
    const baseUrl = options.baseUrl;

    if (!baseUrl) {
        return {};
    }

    const baseUrlResolved = path.resolve(config.paths.appPath, baseUrl);

    if (path.relative(config.paths.appPath, baseUrlResolved) === '') {
        return {
            src: config.paths.appSrc,
        };
    }
}

/**
 * Get jest aliases based on the baseUrl of a compilerOptions object.
 *
 * @param {*} options
 */
function getJestAliases (config, options = {}) {
    const baseUrl = options.baseUrl;

    if (!baseUrl) {
        return {};
    }

    const baseUrlResolved = path.resolve(config.paths.appPath, baseUrl);

    if (path.relative(config.paths.appPath, baseUrlResolved) === '') {
        return {
            '^src/(.*)$': '<rootDir>/src/$1',
        };
    }
}

function getModules (config) {
    // Check if TypeScript is setup
    const hasTsConfig = fs.existsSync(config.paths.appTsConfig);
    // Set this to false since we should always be using typescript
    const hasJsConfig = false;

    if (hasTsConfig && hasJsConfig) {
        throw new Error(
            'You have both a tsconfig.json and a jsconfig.json. If you are using TypeScript please remove your jsconfig.json file.'
        );
    }

    let tsConfig;

    // If there's a tsconfig.json we assume it's a
    // TypeScript project and set up the config
    // based on tsconfig.json
    if (hasTsConfig) {
        const ts = require(resolve.sync('typescript', {
            basedir: config.paths.appNodeModules,
        }));
        tsConfig = ts.readConfigFile(config.paths.appTsConfig, ts.sys.readFile).config;
        // Otherwise we'll check if there is jsconfig.json
        // for non TS projects.
    } else if (hasJsConfig) {
        tsConfig = require(config.paths.appJsConfig);
    }

    tsConfig = tsConfig || {};
    const options = tsConfig.compilerOptions || {};

    const additionalModulePaths = getAdditionalModulePaths(config, options);

    return {
        additionalModulePaths: additionalModulePaths,
        webpackAliases: getWebpackAliases(config, options),
        jestAliases: getJestAliases(config, options),
        hasTsConfig: hasTsConfig,
    };
}

module.exports = getModules;
