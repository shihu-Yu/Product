<!--1.模版-->
<template>
    <div class="category">
        <Search/>
        <van-tree-select
        class="category_menu"
        height="150vw" 
        :items="items" 
        :main-active-index.sync="active">
            <template #content>
                <ul class="product">
                    <li>
                        <img src="../home/images/nav01.jpg" alt="">
                        <span>手机</span>
                    </li>
                </ul>
            </template>
        </van-tree-select>
    </div>
</template>

<!--2.逻辑-->
<script>
//导出当前组件的配置
import Search from '../../components/search'
import {CHANGE_CATEGORY_ACTIVE} from './store/types'
import {mapState,mapMutations} from 'vuex'
export default {
    name:'Category',
    components:{
        Search
    },
    methods:{
        ...mapMutations(
            [CHANGE_CATEGORY_ACTIVE]
        )
    },
    computed:{
        ...mapState({
            items:state=>state.category.items,
        }),
        active:{
            get(){
                return this.$store.state.category.active
            },
            set(index){
                this[CHANGE_CATEGORY_ACTIVE](index)
            }   
        }
    }
}
</script>

<!--3.样式-->
<!--scoped选项会为当前的组件所有的标签动态生成一个属性,然后用该属性做为属性选择器来保证里面的样式只作用于当前页面-->
<style lang="less" scoped>
   .category_menu{
        display: flex;
        flex-wrap: column;
        justify-content: space-around;
        .van-sidebar-item {
            line-height: 40px;
        }
   }
   
</style>