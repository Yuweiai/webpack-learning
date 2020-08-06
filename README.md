# 环境

node.js v10+
windows 64bit


# 学习目标

1 使用 webpack 构建打包环境
2 使用 webpack 构建开发环境
3 四个核心概念：入口、出口、loaders、plugins
4 手动搭建 react+react-router+mobx+sass+antd 工程架构


# Webpack起步

创建react-stack项目目录
npm init -y 生成 package.json文件

cnpm install webpack -g
cnpm install webpack-cli -g

cnpm install webpack -D
cnpm install webpack-cli -D

创建webpack的配置文件,命名名 xxx.config.js,
建议命名为webpack.config.js, 这是webpack官方推荐的默认配置文件

如何编写配置文件呢?(参见react.config.js文件)
1 设置入口文件:entry选项
2 设置出口:output选项

打包命令: webpack --config xxx.config.js

# 使用plugins

1、html-webpack-plugin
    它的作用是自动生成一个index.html单页面，并且把打包后.js脚本文件插入进去。
    cnpm install html-webpack-plugin -D
    ```
    plugins: [
        new HtmlWebpackPlugin({
            template: 'html模板文件',
            title: '我们'
        })
    ]
    ```
2、clean-webpack-plugin
    它的作用是自动删除目录中的dist文件夹，无需手动操作了


# 搭建devServer

cnpm install webpack-dev-server -g
cnpm install webpack-dev-server -D

```
devServer: {
    port: '8090',
    open: true,
    contentBase: path.resolve(__dirname, 'public')
}
```
如何启动本地服务呢？
    webpack-dev-server --config xxx.config.js

# 开启HMR热更新功能

HMR的作用是：局部代码发生变化时，不用刷新整个页面（重新编译）即可自动更新，速度比较快。

1、在devServer中，添加  `hot:true`
2、引入 webpack 模块，添加两个plugin插件。

# 使用sass/css

cnpm install style-loader -D
cnpm install css-loader -D
cnpm install sass-loader -D
cnpm install node-sass -D
```
module: {
    rules: [
        {test:/\.(css|scss)$/,use:['style-loader','css-loader','style-loader']}
    ]
}
```
温馨提示：如果node-sass安装失败过，建议把node_modules整个目录删掉，重新cnpm install。最好保证node-sass一次性安装成功。

# 使用JS

Babel，JS编译器，把ES6(下一代ECMAScript)转化成浏览器能够兼容的ES5代码

cnpm install babel-loader -D
cnpm install @babel/core -D
```
rules: [
    {test:/\.js$/, use:['babel-loader'], exclude: /node_modules/}
]
```

# 使用ESLint

ESLint,用于规范JS代码，保持特定的风格，便于协同开发。

cnpm install eslint-loader -D
cnpm install eslint -D

```
{test:/\.js$/, use:['eslint-loader'], exclude: /node_modules/, enforce:'pre'}
```

手动新建的一个ESlint的配置文件：.eslintrc.json
```
{
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
        "semi": "error"
    }
}
```
在devServer中，添加 overlay: { errors:true } 可让报错信息覆盖在视图上面。

注：任何配置文件修改了，要想生效，必须重启项目。

# 区分开发环境与生产环境

cnpm install cross-env -D
在package.json中配置命令，如下：
```
"scripts": {
  "build": "cross-env NODE_ENV=production webpack --config react.config.js",
  "serve": "cross-env NODE_ENV=development webpack-dev-server --config react.config.js",
  "start": "npm run serve"
},
```
在xxx.config.js中，使用`process.env.NODE_ENV`来分别配置我们的webpack。

# react安装

cnpm install react -S
cnpm install react-dom -S

第一步：封装react根组件
```
import React from 'react'
export default class App extends React.Component {
  render() {
    return(
      <div>
        <h1>Hello React</h1>
      </div>
    )
  }
}
```
第二步：把组件渲染到真实的DOM节点
```
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
ReactDOM.render(<App />, document.getElementById('root'))
```
第三步：安装Babel插件

cnpm install @babel/preset-react -D  支持jsx语法的babel插件
cnpm install @babel/preset-env -D  支持ES6中较新的语法

第四步：创建一个babel的配置文件，命名为 .babelrc.json
```
{
  "presets": [
    ["@babel/preset-react"],
    ["@babel/preset-env",{"useBuiltIns": "entry"}]
  ]
}
```
注：配置文件修改，项目重启。
