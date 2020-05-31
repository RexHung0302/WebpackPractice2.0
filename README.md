# Webpack Practice2.0 編譯範例
> *含 **Vue** 及 **Vue** 內使用 lang="pug" 及 lang="scss"*

這是包含以下幾個預處理器及套件的 **Webpack** 範例：

1. **pug**

2. **scss**

3. **babel**

4. **mini-css**

5. **Vue**

6. **dotenv-webpack**

---

## 使用方法

```
1. $ git clone https://github.com/RexHung0302/WebpackPractice2.0.git

2. $ cd WebpackPractice2.0

3. $ npm install

4. $ cp .env.example.development .env.development / .env.example.production .env.production // 擇一(一個為測試時的環境變數一個為正式環境)

5. $ npm build / build:dev / server(含熱更新) // 擇一

6. Enjoy it!
```

---

Webpack 小筆記：

```
$ npm init & npm init -y // 前者可以詳細配置 後者快速建置

$ npm i -D vue webpack webpack-cli // 安裝 Webpack

$ touch webpack.config.js // 建立 webpack.config.js

$ npm i -D node-sass sass-loader css-loader mini-css-extract-plugin // 安裝 css 套件

$ npm i -D install --save-dev optimize-css-assets-webpack-plugin // 安裝壓縮檔案工具

$ npm i -D pug pug-loader pug-plain-loader html-webpack-plugin // 安裝 pug 套件 及 自動產生 HTML 套件(pug-plain-loader 為 .vue 檔使用)

$ npm i -D install babel-loader @babel/core @babel/preset-env // 安裝JS編譯套件

$ npm i -D install clean-webpack-plugin --save-dev // 安裝清除沒用到檔案的套件

$ npm i -D install vue-loader vue-template-compiler // 安裝 Vue(如果沒有要使用 Vue 可以不用使用)

$ npm i -D dotenv-webpack // 安裝環境變數讀取套件

// webpack-server 安裝方法可繼續往下看, 2020.05.03 有更新一次如何安裝

```

> *小知識： npm i -D 為縮寫， i 為 install 的縮寫， -D 則為 --save-dev 的縮寫。*

---

# 重要提醒：

相關配置都可以參考 **webpack.config.js**，配置方面請確保在 **plugins** 裡加入 `new VueLoaderPlugin()`，建議配置一步一步來，防止炸開後找不到錯誤點。

!! 圖片如果需要在 **HTML** 內引入後 **src** 出現 **[object Module]** 沒有正常引入圖片，請先在 **webpack.config.js** 的 **file-loader** 或 **url-loader** 後 **options** 加上 **esModule: false**，因為我們是使用 **CommonJS模塊語法**，而 **file-loader** 或 **url-loader** 跟 **CommonJS** 編譯方法不一樣，而低版本可以不用加是因為後來的版本預設把 **esModule** 改為 **false** 了，加入 **esModule: false** 的地方可參考下方，詳細文章可參考本文最後連結。 !!

> **2020.05.31更新後有示範引入圖片方法，詳情可見 `WebpackPractice2.0/src/vue/App.vue` 這隻檔案的引入範例，更多更新細節可見下方更新紀錄。**

```javascript
// ...上略
{
  test: /\.(png|jpg|gif|jpe?g|svg)$/,
  use: [
    //- url-loader 包含 file-loader 可不必使用 file-loader
    {
      loader: 'url-loader',
      options: {
        limit: 1024, // (1024)bytes
        name: '[name]-[hash:7].[ext]',
        publicPath: './images/',
        outputPath: './images/', // 輸出位置
        esModule: false,   // <------- 請加在此處
      }
    },
    {
      loader: 'image-webpack-loader',
      options: {
        // bypassOnDebug: true,
        disable: true
      }
    }
  ]
},
//...下略
```

之後會再補上 ~~**webpack server** 及~~ **vue router**，專案時程壓力之下先到此為止就好。

> *上方更新筆記已紀錄加入 **webpack server** 了。*

---

## 更新紀錄

**2020.04.08** 修正：

* 修改路徑及加入 `Vue`，`Vue` 可使用 `Pug` 及 `SCSS` 預處理器。

**2020.05.03** 修正：

* 已補上 **webpack server**，加入方法如下：

1. 打開終端機到專案目錄底下，然後輸入下方指令。

```
$ npm i -D install webpack-dev-server // 安裝 Webpack Server
```

2. 在 **webpack.config.js** 裡最上方引入 **const webpack = require('webpack');**。

3. 可視自己是否需要熱更新，需要就在 **plugins** 內加上 **new webpack.HotModuleReplacementPlugin()**，如下方。

```javascript
plugins: [
    //- Hot Reload
    new webpack.HotModuleReplacementPlugin(),
    //...下略
```

4. 在 **plugins** 之後補上下面這段，並且可視情況修改自己的 **port**。

```javascript
devServer: {
  index: 'index.html', // 預設開啟首頁
  contentBase: path.join(__dirname, 'dist'),
  compress: true,
  hot: true,  // 是否開啟熱更新
  writeToDisk:true,
  port: 8085  // 可更換 port
}
```

5. 享受吧！(如果有不懂的地方歡迎到我的[部落格](https://rexhung0302.github.io/2020/03/21/20200321/)留言告訴我或是到 **webpack.config.js** 參考設定)，另外關於 **Server** 的設定可參考 [neighborhood999.github](https://neighborhood999.github.io/webpack-tutorial-gitbook/Part1/WebpackDevServer.html)。


 **2020.05.31** 修正：

* 加入環境變數載入套件，請先個別複製 `/WebpackPractice2.0/.env.example.development` 及 `/WebpackPractice2.0/.env.example.production` 至根目錄，之後引入方式可見 `/WebpackPractice2.0/src/js/index.js`，會引入哪隻檔案可至 `/WebpackPractice2.0/package.json` 修改，引入的決定為目前的模式是 `--mode development` 或 `--mode production`，相關引入設定可至 `webpack.config.js` 的 `plugins` 底下的 `new Dotenv` 配置修改。

* `Vue` 加上路徑變數，可至 `webpack.config.js` 的 **resolve alias** 李新增刪除或修改，圖片載入有兩種方式，在 `WebpackPractice2.0/src/vue/App.vue` 裡有載入範例。

* 每一支新的 **pug** 都該有自己獨立的 JS 及 CSS 所以目前在 `webpack.config.js` 的 `new HtmlWebpackPlugin` 加上 `chunks` 來達到分別引入，後方帶入的名稱為上方 `entry` 後方的 `key`，如果想要一隻 pug 引入多個 `JS` 就在後方陣列加入即可。

* 加入圖片引入，引入方式可至 `WebpackPractice2.0/src/vue/App.vue` 查看。

---

# 相關介紹文章

[[Tool Notes] — 關於Webpack #1 - 第一次就上手](https://rexhung0302.github.io/2019/06/18/20190618/)

[[Tool Notes] — 關於Webpack #2 - Babel？](https://rexhung0302.github.io/2020/03/21/20200321/)

[webpack入坑之旅（一）不是开始的开始](https://blog.guowenfh.com/2016/03/24/vue-webpack-01-base/)

[Webpack file-loader outputs [object Module]](https://stackoverflow.com/questions/59070216/webpack-file-loader-outputs-object-module)

[使用webpack打包index.html中的图片](https://juejin.im/post/5d7752036fb9a06b2a20686f)
