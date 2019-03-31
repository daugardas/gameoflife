var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
//const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: {
        app: './src/ts/index.ts'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: ['/src'],
        watchContentBase: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        //new CleanWebpackPlugin(['build']),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    }
};
//# sourceMappingURL=webpack.config.js.map