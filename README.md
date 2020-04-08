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

4. $ npm watch / build / build:dev / start / start:dev 擇一

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

```

---

# 重要提醒：

相關配置都可以參考 **webpack.config.js**，配置方面請確保在 **plugins** 裡加入 `new VueLoaderPlugin()`，建議配置一步一步來，防止炸開後找不到錯誤點。

之後會再補上 **webpack server** 及 **vue router**，專案時程壓力之下先到此為止就好。

---

# 相關介紹文章

[[Tool Notes] — 關於Webpack #1 - 第一次就上手](https://rexhung0302.github.io/2019/06/18/20190618/)

[[Tool Notes] — 關於Webpack #2 - Babel？](https://rexhung0302.github.io/2020/03/21/20200321/)

[webpack入坑之旅（一）不是开始的开始](https://blog.guowenfh.com/2016/03/24/vue-webpack-01-base/)
  -> 系列文章推一個

