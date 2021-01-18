const webpack = require('webpack')
const path = require('path')

module.exports = {
    mode: 'development',
    entry: {
        react: ['react', "react-dom"]
    },

    output: {
        filename: '[name].dll.js',
        path: path.join(__dirname, '../dist'),
        library: '[name]_[chunkhash:4]'
    },

    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, '../dist/[name].manifest.json'),
            name: '[name]_[chunkhash:4]'
        }),
    ],
}
