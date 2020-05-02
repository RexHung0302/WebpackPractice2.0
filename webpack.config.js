const path = require('path');
const webpack = require('webpack');
//- 載入轉存 CSS 檔案的套件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//- 壓縮 CSS
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
//- 產一個全新的 html
const HtmlWebpackPlugin = require('html-webpack-plugin');
//- 壓縮 JS
const TerserWebpackPlugin = require('terser-webpack-plugin');
//- 清除多餘的 JS 檔案
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//- Vue 必要套件
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  context: path.resolve(__dirname, 'src'),
  //- 進入點
  entry: {
    //- 入口 js
    main: './js/index.js'
  },
  // 出口
  output: {
    filename: 'js/[name].bundle.js',
    //- 有需要用到 cdn 才需要
    publicPath: './',
    path: path.resolve(__dirname, 'dist') // dirname = '/'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', // 這個會後執行
          'css-loader' // 這個會先執行
        ]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [{
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [
                  require('autoprefixer'),
                  require('cssnano')({ preset: ['default', { discardComments: { removeAll: true } }] })
                ];
              }
            }
          },
          'sass-loader'
        ]
      }, {
        test: /\.pug$/,
        oneOf: [
          // this applies to `<template lang="pug">` in Vue components
          {
            resourceQuery: /^\?vue/,
            use: ['pug-plain-loader']
          },
          // this applies to pug imports inside JavaScript
          {
            use: ['raw-loader', 'pug-plain-loader']
          }
        ]
      },
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(png|jpg|gif|jpe?g|svg)$/,
        use: [{
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name].[ext]',
              publicPath: 'images/',
              outputPath: './src/images', // 輸出位置
              esModule: false,
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true,
            }
          }
        ]
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: ['img:src', 'img:data-src', 'audio:src'],
            minimize: true
          }
        }
      },
    ]
  },
  //- 壓縮 CSS, JS
  optimization: {
    minimizer: [
      //- 壓縮 JS
      new TerserWebpackPlugin(),
      //- 壓縮 CSS
      new OptimizeCssAssetsWebpackPlugin()
    ]
  },
  plugins: [
    //- Hot Reload
    new webpack.HotModuleReplacementPlugin(),
    //- Vue 必要套件
    new VueLoaderPlugin(),
    //- 4.0後默認刪除 output 資料夾內檔案
    new CleanWebpackPlugin({
      //- 要刪除的根目錄
      // root: path.resolve(__dirname, '../../'),
      //- 顯示刪除訊息
      "verbose": true,
      //- 不希望刪除的檔案加在下面
      // "exclude": ['05ef02be5a02714eab77.vendor.js'],
    }),
    // new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // 指定輸出位置
      // [name] 為上方進入點設定的 "名稱"
      filename: "./css/all.min.css",
    }),
    // 有幾個 pug 檔就要用幾個
    new HtmlWebpackPlugin({
      title: 'CookBook',
      hash: true,
      template: './pug/index.pug',
      filename: './index.html'
    })
  ],
  resolve: { 
    alias: { 
        'vue': 'vue/dist/vue.js' 
    } 
  },
  //- Server, (hot reload 需要引入 webpack 並在 plugins 加上 new webpack.HotModuleReplacementPlugin())
  devServer: {
    index: 'index.html',
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    writeToDisk:true,
    port: 8085
  }
};