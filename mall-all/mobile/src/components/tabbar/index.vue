<template>
    <div>
        <van-tabbar v-model="active" >
            <van-tabbar-item  icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item icon="bars">分类</van-tabbar-item>
            <van-tabbar-item icon="shopping-cart">购物车</van-tabbar-item>
            <van-tabbar-item icon="manager">个人中心</van-tabbar-item>
        </van-tabbar>
    </div>
</template>


<script>
export default {
    data(){
        return {
            active:0
        }
    }
}
</script>

<style lang="less" scoped>

</style> 

