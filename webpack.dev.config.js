const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const commonConfig = require('./webpack.common.config.js');

const devConfig = {
    // 关联 `process.env.NODE_ENV`，默认值是 production
    mode: 'development',
    /* 入口 */
    entry: {
        app: [
            'babel-polyfill',
            // 热替换，与 --hot 区别：可以保存状态
            'react-hot-loader/patch',
            path.join(__dirname, 'src/index.js')
        ],
    },

    // 打包后的文件存在内存中，看不到
    output: {
        /*这里本来应该是[chunkhash]的，但是由于[chunkhash]和react-hot-loader不兼容。只能妥协*/
        filename: '[name].[hash].js',
    },

    module: {
        rules: [
            {
                // `css-loader`使你能够使用类似`@import` 和 `url(...)`的方法实现 `require()`的功能
                // `style-loader`将所有的计算后的样式加入页面中
                // 二者组合在一起使你能够把样式表嵌入`webpack`打包后的JS文件中
                test: /\.(css|less)$/,
                use: [
                    'style-loader', 
                    {
                        loader: 'css-loader',
                        options: {
                          modules: false,
                          localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        }
                    },
                    "less-loader",
                    // postcss-cssnext 允许你使用未来的css特性
                    "postcss-loader"
                ]
            }
        ]
    },

    devServer: {
        // * 监听的端口
        port: 8080,
        // URL的根目录。如果不设定的话，默认指向项目根目录。
        contentBase: path.join(__dirname, './dist'),
        // 任意的`404`响应都被替代为`index.html`
        historyApiFallback: true,
        // 服务器外部可以访问(通过 IP 访问)
        host: '0.0.0.0'
    },

    // 提示详细错误信息，并且在 source 中可以看到源码
    devtool: 'inline-source-map',

    plugins:[
        new webpack.DefinePlugin({
               MOCK: true   // 是否 mock 数据
        })
    ]

}

module.exports = merge({
    customizeArray(a, b, key) {
        /*entry.app不合并，全替换*/
        if (key === 'entry.app') {
            return b;
        }
        return undefined;
    }
})(commonConfig, devConfig);