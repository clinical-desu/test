const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/App.js',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'test-b'
        }),
    ],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['@babel/preset-react'],
                    plugins: ['transform-class-properties']
                }
            },
            {
                test: /.*\.(gif|png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: "",
                            publicPath : "",
                            name: '[name]_[hash:7].[ext]',
                        }
                    },
                ]
            },
        ]
    }
};