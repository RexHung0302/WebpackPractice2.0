//- 引入 CSS
import '../scss/all.scss';

import Vue from 'vue'
import App from '../vue/App.vue';

new Vue({
  el: '#app',
  render: h => h(App),
})