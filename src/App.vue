<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive><router-view/></keep-alive>
  </div>
</template>

<script>
import MHeader from 'component/m-header/m-header'
import Tab from 'component/tab/tab'

export default {
  name: 'App',
  components:{
    MHeader,
    Tab
  }
}
</script>

<style>

</style>
