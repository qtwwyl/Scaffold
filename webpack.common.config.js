const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const webpack = require('webpack');

commonConfig = {
    /* 入口 */
    entry: {
        app: [
            "babel-polyfill", // Babel默认只转换新的JavaScript句法，此插件可以转换新的 api
            path.join(__dirname, 'src/index.js')
        ],
        // 提取公共代码，把`react`等库生成打包到`vendor.hash.js`里面去
        vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
    },

    // 打包后的文件存在内存中，看不到
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js', // 按需加载 bundle 文件的命名
        publicPath: "/"
    },

    module: {
        // 当获取不到模块的时候抛出错，而不是警告
        strictExportPresence: true,
        rules: [{
            // src 文件夹下面的以 .js 结尾的文件，要使用 babel 解析
            // cacheDirectory 是用来缓存编译结果，下次编译加速
            test: /\.js$/,
            use: ['babel-loader?cacheDirectory=true'],
            include: path.join(__dirname, 'src')
        }, {
            // 编译图片
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192   // 小于等于8K的图片会被转成`base64`编码，直接插入HTML中，减少`HTTP`请求
                }
            }]
        }]
    },
    plugins: [
        // 自动把js插入到模板`index.html`里面去
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, 'src/index.html'),
            // chunks: ['manifest', 'app'], // 将 manifest 插入html中
        }),
        // new InlineManifestWebpackPlugin('manifest'),

        new webpack.HashedModuleIdsPlugin(),

    ],

    optimization: {
        // 提取公共代码
        runtimeChunk: {
            name: "manifest"
        },
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                }
            }
        }
    },

    // 路径别名
    resolve: {
        alias: {
            pages: path.join(__dirname, 'src/pages'),
            components: path.join(__dirname, 'src/components'),
            router: path.join(__dirname, 'src/router'),
            actions: path.join(__dirname, 'src/redux/actions'),
            reducers: path.join(__dirname, 'src/redux/reducers'),
            mock: path.join(__dirname, 'mock')
        }
    }
};

module.exports = commonConfig;