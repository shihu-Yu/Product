<template>
    <div>
        <van-tabbar v-model="active" >
            <van-tabbar-item  
                icon="home-o"
                to="/"
            
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
import {mapMutations, mapState} from 'vuex'
export default {
    methods:{
        ...mapMutations([CHANGE_TAB_BAR_ACTIVE]),
        onChange(index){
            console.log(index)
        }
    },
    computed:{
        active:{
            get(){
                let active = sessionStorage.getItem('tabBarActiveIndex') || this.$store.state.tabBar.active
                active = parseInt(active)
                return active
            },
            set(index){
                this[CHANGE_TAB_BAR_ACTIVE](index)
            }
        }
    }
}
</script>

<style lang="less" scoped>

</style> 

