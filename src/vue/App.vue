<template lang="pug">
  article.article
    //- 引入方式1
    img(:src="exampleImg")
    //- 引入方式2
    img(:src="require('@/images/exampleImg.jpeg')")
    span 123123
    test
</template>

<script>

// 測試模板
import test from './test.vue';
// 測試圖片
import exampleImg from '../images/exampleImg.jpeg';


export default {
  data() {
    return {
      exampleImg: exampleImg
    }
  },
  mounted() {
    console.log('Hello World!');
  },
  components: {
    test: test
  }
}
</script>

<style>

</style>