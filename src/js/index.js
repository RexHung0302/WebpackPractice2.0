//- 引入 CSS
import '../scss/all.scss';

import Vue from 'vue'
import App from '../vue/App.vue';

new Vue({
  render: h => h(App),  //表現框架的喧染使用layout.vue的樣板
}).$mount('#app')       //將vue呈現在index.pug的#app這個框架中