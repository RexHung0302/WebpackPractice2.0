# Webpack Practice2.0 編譯範例
> *含 **Vue** 及 **Vue** 內使用 lang="pug" 及 lang="scss"*

這是包含以下幾個預處理器及套件的 **Webpack** 範例：

1. **pug**

2. **scss**

3. **babel**

4. **mini-css**

5. **Vue**

> **2020.04.08** 修正版，修改路徑及加入 `Vue`，`Vue` 可使用 `Pug` 及 `SCSS` 預處理器。

---

## 使用方法

```
1. $ git clone https://github.com/RexHung0302/WebpackPractice2.0.git

2. $ cd WebpackPractice2.0

3. $ npm install

4. $ npm build / build:dev / server(含熱更新) 擇一

5. Enjoy it!
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

// webpack-server 安裝方法可繼續往下看, 2020.05.03 有更新一次如何安裝

```

---

# 重要提醒：

相關配置都可以參考 **webpack.config.js**，配置方面請確保在 **plugins** 裡加入 `new VueLoaderPlugin()`，建議配置一步一步來，防止炸開後找不到錯誤點。

!! 圖片如果需要在 **HTML** 內引入後 **src** 出現 **[object Module]** 沒有正常引入圖片，請先在 **webpack.config.js** 的 **file-loader** 或 **url-loader** 後 **options** 加上 **esModule: false**，因為我們是使用 **CommonJS模塊語法**，而 **file-loader** 或 **url-loader** 跟 **CommonJS** 編譯方法不一樣，而低版本可以不用加是因為後來的版本預設把 **esModule** 改為 **false** 了，加入 **esModule: false** 的地方可參考下方，詳細文章可參考本文最後連結。 !!

```javascript
// ...上略
{
  test: /\.(png|jpg|gif|jpe?g|svg)$/,
  use: [{
      loader: 'url-loader',
      options: {
        limit: 1024,
        name: '[name].[ext]',
        publicPath: 'images/',
        outputPath: './src/images', // 輸出位置
        esModule: false,   // <------- 請加在此處
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
//...下略
```

之後會再補上 **webpack server** 及 **vue router**，專案時程壓力之下先到此為止就好。

---

### 2020.05.03 後更：

已補上 **webpack server**，加入方法如下：

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

5. 享受吧！(如果有不懂的地方歡迎到我的[部落格](https://rexhung0302.github.io/2020/03/21/20200321/)留言告訴我或是到 **webpack.config.js** 參考設定)。

---

# 相關介紹文章

[[Tool Notes] — 關於Webpack #1 - 第一次就上手](https://rexhung0302.github.io/2019/06/18/20190618/)

[[Tool Notes] — 關於Webpack #2 - Babel？](https://rexhung0302.github.io/2020/03/21/20200321/)

[webpack入坑之旅（一）不是开始的开始](https://blog.guowenfh.com/2016/03/24/vue-webpack-01-base/)

[Webpack file-loader outputs [object Module]](https://stackoverflow.com/questions/59070216/webpack-file-loader-outputs-object-module)

[使用webpack打包index.html中的图片](https://juejin.im/post/5d7752036fb9a06b2a20686f)
