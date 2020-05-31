// 引入 CSS
import '../scss/all.scss';

// 環境變數引入方式
const NAME = process.env.VUE_APP_NAME;

console.log('現在的環境變數名稱', NAME);

import Vue from 'vue'
import App from '../vue/App.vue';

new Vue({
  el: '#app',
  render: h => h(App),
})