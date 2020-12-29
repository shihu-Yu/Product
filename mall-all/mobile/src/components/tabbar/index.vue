<template>
    <div>
        <van-tabbar v-model="active" >
            <van-tabbar-item  
                icon="home-o"
                to="/"
                route
            >
                首页
            </van-tabbar-item>
            <van-tabbar-item 
                icon="bars"
                to="/category"
            >
                分类
            </van-tabbar-item>
            <van-tabbar-item 
                icon="shopping-cart"
                to="/cart"
                badge="20"
            >
                购物车
            </van-tabbar-item>
            <van-tabbar-item 
                icon="manager"
                to="/user"
            >
                个人中心
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>


<script>
export default {
    data(){
        return{
            active:0
        }
    },
   
}
</script>

<style lang="less" scoped>

</style> 

