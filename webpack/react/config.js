module.exports = class Config {
    constructor (name, webpackEnv, paths) {
        this.name = name;

        this.shouldUseSourceMaps = process.env.GENERATE_SOURCEMAP !== 'false';

        this.paths = paths;

        this.isEnvDevelopment = webpackEnv === 'development';
        this.isEnvProduction = webpackEnv === 'production';

        this.isEnvProductionProfile = this.isEnvProduction && process.argv.includes('--profile');

        this.shouldUseSourceMaps = process.env.GENERATE_SOURCEMAP !== 'false';

        this.appPackageJson = require(this.paths.appPackageJson);

        this.cssRegex = /\.css$/;
        this.cssModuleRegex = /\.styles\.css$/;
    }
}
