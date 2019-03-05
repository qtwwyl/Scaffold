const merge = require('webpack-merge');

const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");

const commonConfig = require('./webpack.common.config.js');

const publicConfig = {
    mode: 'production',
    // 遇到错误抛出失败，停止打包
    bail: true,
    module: {
        rules: [
            {
                // `css-loader`使你能够使用类似`@import` 和 `url(...)`的方法实现 `require()`的功能
                // `style-loader`将所有的计算后的样式加入页面中
                // 二者组合在一起使你能够把样式表嵌入`webpack`打包后的JS文件中
                test: /\.css|less$/,
                use: [
                    {
                        // 单独生成 css 文件
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                          // you can specify a publicPath here
                          // by default it use publicPath in webpackOptions.output
                          publicPath: '../'
                        }
                      },
                    "css-loader", "less-loader","postcss-loader"]
            }
        ]
    },

    // 
    devtool: 'cheap-module-source-map',

    plugins: [
        // 压缩生成的文件
        // new UglifyJSPlugin(),
        // 为所有依赖定义 process.env.NODE_ENV 变量，许多库关联环境变量，不同的环境变量会引用不同的内容，可以进一步压缩生成的 verdor 文件
        // 任何位于 /src 的本地代码都可以关联到 process.env.NODE_ENV 环境变量,可做类似检查:
        // if (process.env.NODE_ENV !== 'production') {
        //    console.log('Looks like we are in development mode!');
        //  }
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
             }
         }),
        // 打包前自动清空 dist 文件夹
        new CleanWebpackPlugin(['dist/*.*']),
        // 单独生成 css 文件 
        // new ExtractTextPlugin({
        //     filename: '[name].[contenthash:5].css',
        //     allChunks: true
        // })
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].[contenthash:5].css",
            chunkFilename: "[id].[contenthash:5].css"
          })

    ],

    optimization: {
        minimizer: [
            // 压缩生成的文件
            new UglifyJSPlugin({
                exclude: /\.min\.js$/, // 过滤掉以".min.js"结尾的文件，我们认为这个后缀本身就是已经压缩好的代码
                extractComments: false, // 移除注释
                // Use multi-process parallel running to improve the build speed
                // Default number of concurrent runs: os.cpus().length - 1
                parallel: true,
                // Enable file caching
                cache: true,
            }),
            // 压缩css代码
            new OptimizeCSSAssetsPlugin({
                assetNameRegExp: /\.css$/g,
                cssProcessorOptions: {
                  safe: true,
                  autoprefixer: { disable: true }, // 避免移除浏览器前缀
                  mergeLonghand: false,
                  discardComments: {
                    removeAll: true // 移除注释
                  }
                },
                canPrint: true
              })
        ]
    },
     
}

module.exports = merge(commonConfig, publicConfig);