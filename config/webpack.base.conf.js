const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: ['babel-polyfill','./src/index.js'], // 此处babel-polyfill解决编译async/await不被解析问题
    output: {
        filename: 'js/[name].[hash:6].js',
        path: path.join(__dirname, '../dist'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                exclude: /(node_modules)/,
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ],
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]-[local]-[hash:base64:6]',
                            }
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            }
                        }
                    }
                ],
                exclude: /(node_modules)/,// 不解析三方样式例如antd
            },
            {
                test: /\.(eot|woff|ttf|woff2|svg|gif)(\?|$)/,
                loader: 'file-loader?name=[hash].[ext]'
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name: '[name].[hash:8].[ext]',
                    outputPath: 'img/',
                    publicPath: '/img/',
                }
            }
        ],
    },
    plugins: [
        // 分离css文件
        new MiniCssExtractPlugin({
            filename: 'css/[name].[chunkhash:8].css',
        }),
    ]
};