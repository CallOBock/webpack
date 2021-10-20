const webpack = require('webpack')
const { merge } = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const commonWebpackConfig = require('./webpack.common.js')

const prodWebpackConfig = {
    mode: 'production',
    cache: {
        type: 'filesystem',
    },
    performance: { hints: false },
    optimization: {
        moduleIds: 'deterministic',
        concatenateModules: true,
        minimize: true,
        minimizer: [new TerserPlugin({
            exclude: /node_modules/,
            cache: true,
            parallel: true,
            sourceMap: true,
            extractComments: false,
            terserOptions: {
                output: {
                    comments: false,
                },
            }
        })]
    },
    devtool: false,
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[name].min.js.map',
            exclude: ['vendor'],
        }),
        // new BundleAnalyzerPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ],
                exclude: [/node_modules/]
            },
        ]
    }
}

module.exports = merge(commonWebpackConfig, prodWebpackConfig)