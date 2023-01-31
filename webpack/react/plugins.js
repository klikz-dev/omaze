// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function createShopifyAssetUrl (tag) {
    let assetUrl;

    if (tag.tagName === 'script') {
        assetUrl = tag.attributes.src;

        assetUrl = assetUrl.split('assets/')[1];

        return `{{ '${assetUrl}' | asset_url | script_tag }}`;
    }

    if (tag.tagName === 'link') {
        assetUrl = tag.attributes.href;

        assetUrl = assetUrl.split('assets/')[1];

        return `{{ '${assetUrl}' | asset_url | stylesheet_tag }}`;
    }

    throw new Error(`unknown html tag ${tag.tagName}`);
}

function generateTemplateContent (templateParams) {
    const { htmlWebpackPlugin } = templateParams;

    const tags = (htmlWebpackPlugin.tags.headTags || []).concat(htmlWebpackPlugin.tags.bodyTags || []);

    const content = tags.map((tag) => {
        return createShopifyAssetUrl(tag);
    });

    return content.join('\n');
}

module.exports = function addPlugins (config, webpackConfig) {
    webpackConfig.plugins = [
        // new CleanWebpackPlugin({
        //     cleanOnceBeforeBuildPatterns: [
        //         config.name + '*',
        //     ],
        // }),
        new HtmlWebpackPlugin({
            inject: false,
            templateContent: generateTemplateContent,
            filename: config.paths.templateName,
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: `${config.name}-[name].[contenthash:8].css`,
            chunkFilename: `${config.name}-[name].[contenthash:8].chunk.css`,
        }),
    ];
};
