<template>
    <div class="tabBar">
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
import {CHANGE_TAB_BAR_ACTIVE} from './store/types'
import {mapMutations}  from 'vuex'
export default {
    name:"Tabbar",
    methods:{
        ...mapMutations([CHANGE_TAB_BAR_ACTIVE])
    },
    created(){
        this.$store.state.tabBar.activePath = parseInt(sessionStorage.getItem('tabbarActiveIndex')) 
    },
    computed:{
        active:{
            get(){
                if(this.$store.state.tabBar.activePath){
                    return this.$store.state.tabBar.activePath
                }else{
                    return this.$store.state.tabBar.active
                }
            },    
            set(index){
                this[CHANGE_TAB_BAR_ACTIVE](index)
            }
        }
    },
}
</script>

<style lang="less" scoped>
    .tabBar{
        margin-top: 10px;
    }
</style> 

