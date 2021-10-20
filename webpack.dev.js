const webpack = require('webpack')
const { merge } = require('webpack-merge')

const commonWebpackConfig = require('./webpack.common.js')

const devWebpackConfig = {
    mode: 'development',
    devtool: 'eval-cheap-source-map',
    watch: true,
    watchOptions: {
        ignored: /node_modules/
    },
    
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                                localIdentName: '[path][name]__[local]',
                            }
                        }
                    }
                ],
                exclude: [/node_modules/]
            },
        ]
    }

}

module.exports = merge(commonWebpackConfig, devWebpackConfig)
