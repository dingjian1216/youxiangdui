<template>
  <div id='text'>
    <div v-html="url"></div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      url: this.$route.query.url
    }
  },
  mounted(){
    
  }
}
</script>