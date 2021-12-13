<!--1.模版-->
<template>
    <div class="home">
        <Search/>
        <div class="carouse">
            <van-swipe class="my-swipe" :autoplay="3000" style="height:200px" indicator-color="white">
                <van-swipe-item 
                    v-for="(item, index) in CarouseImages" 
                    :key="index"
                >
                    <img :src="item.url"  />
                </van-swipe-item>
            </van-swipe>
        </div>
        <div class="nav">
            <ul class="nav_grad">
                <li 
                    v-for="item in navData"
                    :key="item.label"
                    @click="handleClick"
                >
                <router-link to="/category">
                    <div class="nav_grad_item">
                        <img :src="item.imgUrl">
                    </div>
                    <p class="nav_grad_txt">{{item.name}}</p>
                </router-link>
                </li>
            </ul>
        </div>
        <div class="floor">
            <div class="floor-wrap">
                <h3 class="floor_title">数码产品</h3>
                <div class="floor_content">
                    <ul class="floor_grad_box">
                        <li class="floor_grad_item">
                            <div class="floor_grad_item_box">
                                <div class="floor_grad_item_img">
                                    <img src="./images/nav01.jpg" alt="">
                                    <span class="product_name">格力冰箱dfsfdsfsdfsdfssdfssd</span>
                                </div>
                                <div class="floor_product">
                                    <span class="product_price">￥3566</span>
                                    <span class="product_number">9900人已购买</span>
                                </div>
                            </div>
                        </li>
                        <li class="floor_grad_item">
                            <div class="floor_grad_item_box">
                                <div class="floor_grad_item_img">
                                    <img src="./images/nav01.jpg" alt="">
                                    <span class="product_name">格力冰箱</span>
                                </div>
                                <div class="floor_product">
                                    <span class="product_price">￥3566</span>
                                    <span class="product_number">9900人已购买</span>
                                </div>
                            </div>
                        </li>   
                        <li class="floor_grad_item">
                            <div class="floor_grad_item_box">
                                <div class="floor_grad_item_img">
                                    <img src="./images/nav01.jpg" alt="">
                                    <span class="product_name">格力冰箱</span>
                                </div>
                                <div class="floor_product">
                                    <span class="product_price">￥3566</span>
                                    <span class="product_number">9900人已购买</span>
                                </div>
                            </div>
                        </li>   
                        <li class="floor_grad_item">
                            <div class="floor_grad_item_box">
                                <div class="floor_grad_item_img">
                                    <img src="./images/nav01.jpg" alt="">
                                    <span class="product_name">格力冰箱</span>
                                </div>
                                <div class="floor_product">
                                    <span class="product_price">￥3566</span>
                                    <span class="product_number">9900人已购买</span>
                                </div>
                            </div>
                        </li>   
                    </ul>
                </div>
            </div>
            <div class="floor-wrap">
                <h3 class="floor_title">数码产品</h3>
                <div class="floor_content">
                    <ul class="floor_grad_box">
                        <li class="floor_grad_item">
                            <div class="floor_grad_item_box">
                                <div class="floor_grad_item_img">
                                    <img src="./images/nav01.jpg" alt="">
                                    <span class="product_name">格力冰箱dfsfdsfsdfsdfssdfssd</span>
                                </div>
                                <div class="floor_product">
                                    <span class="product_price">￥3566</span>
                                    <span class="product_number">9900人已购买</span>
                                </div>
                            </div>
                        </li>
                        <li class="floor_grad_item">
                            <div class="floor_grad_item_box">
                                <div class="floor_grad_item_img">
                                    <img src="./images/nav01.jpg" alt="">
                                    <span class="product_name">格力冰箱</span>
                                </div>
                                <div class="floor_product">
                                    <span class="product_price">￥3566</span>
                                    <span class="product_number">9900人已购买</span>
                                </div>
                            </div>
                        </li>   
                        <li class="floor_grad_item">
                            <div class="floor_grad_item_box">
                                <div class="floor_grad_item_img">
                                    <img src="./images/nav01.jpg" alt="">
                                    <span class="product_name">格力冰箱</span>
                                </div>
                                <div class="floor_product">
                                    <span class="product_price">￥3566</span>
                                    <span class="product_number">9900人已购买</span>
                                </div>
                            </div>
                        </li>   
                        <li class="floor_grad_item">
                            <div class="floor_grad_item_box">
                                <div class="floor_grad_item_img">
                                    <img src="./images/nav01.jpg" alt="">
                                    <span class="product_name">格力冰箱</span>
                                </div>
                                <div class="floor_product">
                                    <span class="product_price">￥3566</span>
                                    <span class="product_number">9900人已购买</span>
                                </div>
                            </div>
                        </li>   
                    </ul>
                </div>
            </div>
            <div class="floor-wrap">
                <h3 class="floor_title">数码产品</h3>
                <div class="floor_content">
                    <ul class="floor_grad_box">
                        <li class="floor_grad_item">
                            <div class="floor_grad_item_box">
                                <div class="floor_grad_item_img">
                                    <img src="./images/nav01.jpg" alt="">
                                    <span class="product_name">格力冰箱dfsfdsfsdfsdfssdfssd</span>
                                </div>
                                <div class="floor_product">
                                    <span class="product_price">￥3566</span>
                                    <span class="product_number">9900人已购买</span>
                                </div>
                            </div>
                        </li>
                        <li class="floor_grad_item">
                            <div class="floor_grad_item_box">
                                <div class="floor_grad_item_img">
                                    <img src="./images/nav01.jpg" alt="">
                                    <span class="product_name">格力冰箱</span>
                                </div>
                                <div class="floor_product">
                                    <span class="product_price">￥3566</span>
                                    <span class="product_number">9900人已购买</span>
                                </div>
                            </div>
                        </li>   
                        <li class="floor_grad_item">
                            <div class="floor_grad_item_box">
                                <div class="floor_grad_item_img">
                                    <img src="./images/nav01.jpg" alt="">
                                    <span class="product_name">格力冰箱</span>
                                </div>
                                <div class="floor_product">
                                    <span class="product_price">￥3566</span>
                                    <span class="product_number">9900人已购买</span>
                                </div>
                            </div>
                        </li>   
                        <li class="floor_grad_item">
                            <div class="floor_grad_item_box">
                                <div class="floor_grad_item_img">
                                    <img src="./images/nav01.jpg" alt="">
                                    <span class="product_name">格力冰箱</span>
                                </div>
                                <div class="floor_product">
                                    <span class="product_price">￥3566</span>
                                    <span class="product_number">9900人已购买</span>
                                </div>
                            </div>
                        </li>   
                    </ul>
                </div>
            </div>
            <div class="floor-wrap">
                <h3 class="floor_title">数码产品</h3>
                <div class="floor_content">
                    <ul class="floor_grad_box">
                        <li class="floor_grad_item">
                            <div class="floor_grad_item_box">
                                <div class="floor_grad_item_img">
                                    <img src="./images/nav01.jpg" alt="">
                                    <span class="product_name">格力冰箱dfsfdsfsdfsdfssdfssd</span>
                                </div>
                                <div class="floor_product">
                                    <span class="product_price">￥3566</span>
                                    <span class="product_number">9900人已购买</span>
                                </div>
                            </div>
                        </li>
                        <li class="floor_grad_item">
                            <div class="floor_grad_item_box">
                                <div class="floor_grad_item_img">
                                    <img src="./images/nav01.jpg" alt="">
                                    <span class="product_name">格力冰箱</span>
                                </div>
                                <div class="floor_product">
                                    <span class="product_price">￥3566</span>
                                    <span class="product_number">9900人已购买</span>
                                </div>
                            </div>
                        </li>   
                        <li class="floor_grad_item">
                            <div class="floor_grad_item_box">
                                <div class="floor_grad_item_img">
                                    <img src="./images/nav01.jpg" alt="">
                                    <span class="product_name">格力冰箱</span>
                                </div>
                                <div class="floor_product">
                                    <span class="product_price">￥3566</span>
                                    <span class="product_number">9900人已购买</span>
                                </div>
                            </div>
                        </li>   
                        <li class="floor_grad_item">
                            <div class="floor_grad_item_box">
                                <div class="floor_grad_item_img">
                                    <img src="./images/nav01.jpg" alt="">
                                    <span class="product_name">格力冰箱</span>
                                </div>
                                <div class="floor_product">
                                    <span class="product_price">￥3566</span>
                                    <span class="product_number">9900人已购买</span>
                                </div>
                            </div>
                        </li>   
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<!--2.逻辑-->
<script>
import Search from 'components/search'

//导出当前组件的配置
import {mapState} from 'vuex'
export default {
    name:'Home',
    components:{
        Search
    },
    methods:{
        handleClick(){
            console.log('跳转成功')
        }
    },
    computed:{
        ...mapState({
            navData:(state)=>state.home.navData,
            CarouseImages:state=>state.home.CarouseImages
        }),
    },
}
</script>

<!--3.样式-->
<!--scoped选项会为当前的组件所有的标签动态生成一个属性,然后用该属性做为属性选择器来保证里面的样式只作用于当前页面-->
<style lang="less" scoped>
.home{
    background-color: #ebe1e1fa;
}
.carouse{
    margin-bottom: 10px;
    .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
    img{
        width: 100%;
        height: 100%;
    }
  }
}
.nav{
    margin-bottom: 10px;
    font-size: 15px;
    .nav_grad{
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        .nav_grad_txt{
                line-height: 10px;
                text-align: center;
            }
        .nav_grad_item{
            width: 85px;
            height: 85px;
            border-radius:50% ;
            background-color: #fff;
            margin-bottom: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                width: 80%;
                height: 80%;
                border-radius: 50%;
            }
        }
    }
}
.floor{
    .floor_wrap{
        height: 575px;
    }
    .floor_title{
        line-height: 50px;
        text-align: center;
        color: #857412;
        border-bottom:1px solid #857412 ;
        margin: 10px 0;
    }
    .floor_grad_box{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        .floor_grad_item{
            width: 40%;
            padding:10px 10px;
            background-color: #fff;
            margin-bottom: 10px;
            img{
                width: 100%;
            }
            .product_name{
                font-size: 15px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                display: block;
            }
            .floor_product{
                font-size: 10px;
                display: flex;
                margin-top: 5px;
                flex-wrap: wrap;
                justify-content: space-between;
                .product_price{
                    color: rgb(211, 21, 21);
                }
                .product_number{
                    color: #666;
                }
            }
        }
    }
}
   
</style>