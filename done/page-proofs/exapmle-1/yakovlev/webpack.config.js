var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

module.exports = {
    entry: './main.js',
    //context: __dirname,
    debug: true,
    devServer: {
        //contentBase: './dist',
        //info: true,
        //hot: false,
        inline: true,
        port: 10000
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'bundle.js',
        publicPath: "/assets/"
    },
    resolve: {
        alias: {
            moment: 'moment/moment.js'
        },
        modulesDirectories: ['node_modules']
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                include: /\.pug/,
                // pass options to pug as a query ('pug-html-loader?pretty')
                loader: 'pug-html-loader'
            }

        ]
    }
};