// webpack是基于node.js环境
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

// console.log('环境变量-----', )
const env = process.env.NODE_ENV
// 这个以生产环境为标准进行配置
const config = {
  mode: 'production',
  // 入口:指定webpack打包或本地服务运行时的程序入口文件
  // entry: './src/main.js'
  entry: path.resolve(__dirname, './src/main.js'),
  // 出口:打包之后,打包的结果放在哪里 dist
  output: {
      filename: '[name].[hash].js',
      path: path.resolve(__dirname, 'dist')
  },
  // plugins:用于扩展功能
  plugins: [
      new HtmlWebpackPlugin({
          template: path.resolve(__dirname, './public/index.html'),
          title: '我们'
      }),
      new CleanWebpackPlugin()
  ],
  // loaders:用于对代码中各种文件进行编译转换,目标是转换浏览器能够识别的代码
  module: {
      rules: [
          {test:/\.(css|scss)$/, use:['style-loader','css-loader','sass-loader']},
          {test:/\.js$/, use:['babel-loader'], exclude: /node_modules/}
      ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    extensions: [".js", ".jsx", ".json"]
  }
}

if (env==='development') {
  config.mode = 'development'
  // 用于热更新的两个插件
  config.plugins.push(new webpack.NamedModulesPlugin())
  config.plugins.push(new webpack.HotModuleReplacementPlugin())
  // 用于JS代码检测
  config.module.rules.push(
    {
      test:/\.js$/,
      use:['eslint-loader'],
      exclude: /node_modules/,
      enforce:'pre'
    }
  )
  // 当代码报错时，可以帮我定位到源码位置
  config.devtool = 'inline-source-map'
  config.devServer = {
      port: '8090',
      // host: '10.36.135.68',
      open: true,
      contentBase: path.resolve(__dirname, 'public'),
      hot: true,  // 开启热更新功能
      // 当项目发生错误时，用一个透明层覆盖在视图上层
      overlay: {
        errors: true
      }
  }
}

module.exports = config
