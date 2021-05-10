const path = require('path'),

    HtmlWebpackPlugin = require('html-webpack-plugin'),
    HtmlInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default,

    CopyWebpackPlugin = require('copy-webpack-plugin');

const ROOT = path.resolve(__dirname, './'),
    DEST = path.resolve(__dirname, 'dest');

module.exports = {
    mode: 'development',
    entry: {
        index: ['index']
    },
    output: {
        filename: `[name].js`,
        path: DEST,
        publicPath: '/'
    },
    resolve: {
        modules: [
            ROOT,
            path.resolve(ROOT, 'node_modules')
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: 'css-loader'
            },
        ]
    },
    stats: 'minimal',
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['index'],
            filename: 'index.html',
            template: path.resolve(ROOT, 'index.html')
        }),
        new HtmlInlineCSSWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(ROOT, 'vendor'),
                    to: path.resolve(DEST, 'vendor')
                }
            ]
        })
    ]
};