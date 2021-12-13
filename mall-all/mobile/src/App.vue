<template>
  <div id="app">
    <div id="page">
      <router-view></router-view>
    </div>
    <TabBar />
  </div>
</template>

<script>
import TabBar from 'components/tabbar'
export default {
    name:'app',
    components:{
        TabBar
    }
}
</script>

<style lang="less" scoped>
.app{
    background-color: #ebe1e1fa;
    font-size: 10px;
}
</style>
