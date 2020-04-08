<template lang="pug">
    .message
      span {{ message }}
      span 123123
</template>
    
<script>
export default {
  data () {
    return {
      message: 'Helo, .vue file'
    }
  },
  components: {
  }
}
</script>
    
<style lang="scss">
    .message {
        color: blue;
    }
</style>