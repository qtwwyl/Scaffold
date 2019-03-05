# 目录结构
    /dist                          执行 `npm run build` 后打包编译生成的文件
    /mock                          mock 数据
    /node_modules                  安装的依赖
    /src                           项目文件     
        /components                展示组件
            /App
                App.js
            /Nav
                Nav.js
        /pages                     各个页面的路由组件
            /Couner
            /Page1
                Page1.js
                Page1.less
                /images
        /redux                     redux 管理
            /actions               各个路由组件的 action
                counter.js
                userInfo.js
            /middleware            中间件
            /reducers              各个路由组件的 reducer
                counter.js
                userInfo.js
            reducers.js            根 reducer
            store.js               store
        /router
            Boundle.js             懒加载
            router.js              路由文件
        index.js                   入口文件
        index.html                 html 模板
    .babelrc
    .gitignore                     git忽略文件，忽略 mock 和 node_modules
    package-lock.json
    package.json                   treeshaking
    postcss.config.js              postcss-loader 配置 
    readme.md
    webpack.common.config.js       开发环境和生产环境的公共 webpack 配置
    webpack.config.js              生产环境的 webpack 配置
    webpack.dev.config.js          开发环境的 webpack 配置

# 脚本
* `npm start`启动本地开发服务
* `npm run build` 打包生产环境下的文件放到 dist 文件夹下