<template>
    <el-row class="home" :gutter="20">
        <el-col :span="8" style="margin-top:20px">
            <el-card shadow="hover">
                <div class="user">
                    <img :src="userImg" alt="">
                    <div class="userInfo">
                        <p class="name">Admin</p>
                        <p class="access">超级管理员</p>
                    </div>
                </div>
                <div class="login-info">
                    <p>上次登录时间：<span>2021-05-06</span></p>
                    <p>上次登录地点：<span>杭州</span></p>
                </div>
            </el-card>
            <el-card style="margin-top:20px">
                <el-table :data="tableData" style="height:420px">
                    <el-table-column
                        show-overflow-tooltip
                        v-for="(val,key) in tableLable"
                        :prop="key"
                        :label="val"
                        :key="key"
                    >
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col :span="16">
            <div class="num">
                <el-card 
                    shaw="hovue"
                    v-for="item in countData"
                    :key="item.name"
                    :body-style="{display:'flex',padding:0}"
                >
                <i  class="icon" 
                    :class="`el-icon-${item.icon}`"
                    :style="{background:item.color}"
                ></i>
                <div class="detail">
                    <p class="num">￥{{item.value}}</p>
                    <p class="txt">￥{{item.name}}</p>
                </div>
                </el-card>
            </div>
            <el-card shadow="hover" style="height:280px">
                <echart :echartData="echartData.order" style="height:280px"></echart>
            </el-card>
                <div class="graph">
                    <el-card shadow="hover" style="height:260px">
                        <echart :echartData="echartData.user" style="height:240px"></echart>
                    </el-card>
                    <el-card shadow="hover" style="height:260px">
                        <echart :echartData="echartData.video" 
                        :isAxisChart="false" 
                        style="height:240px"></echart>
                    </el-card>
                </div>
        </el-col>
    </el-row>
<!-- 使用layout 布局 对页面进行布局 -->
</template>

<script>
import {getHome} from '../../api/data'
import Echart from '@/components/echarts.vue'
import {mapState,mapMutations} from 'vuex'
export default {
    name: 'Home',
    components:{
        Echart,
    },
    computed:{
        ...mapState({
                userImg:state=>state.home.userImg,
                tableData:state=>state.home.tableData,
                tableLable:state=>state.home.tableLable,
                countData:state=>state.home.countData,
                echartData:state=>state.home.echartData,
            })
        
    },

    methods:{
        getTableDate(){
            getHome().then((res)=>{
                console.log(this.userImg)
                let data = res.data.tableData
                this.$store.commit('setTableData',data)
                // 折线图的展示
                const order = res.data.orderData
                this.echartData.order.xData = order.date
                let keyArray = Object.keys(order.data[0])
                keyArray.forEach(key=>{
                    this.echartData.order.series.push({
                        name:key,
                        data:order.data.map(item=>item[key]),
                        type:"line"
                    })
                })
                // 柱形图
                const user = res.data.userData
                this.echartData.user.xData = user.map(item=>item.date)
                this.echartData.user.series.push({
                    name:"新增用户",
                    data:user.map(item=>item.new),
                    type:"bar"
                })
                this.echartData.user.series.push({
                    name:"活跃用户",
                    data:user.map(item=>item.active),
                    type:"bar"
                })
                // 饼状图
                const video = res.data.videoData
                this.echartData.video.series.push({
                    data:video,
                    type:"pie"
                })
            })
        }
    },
    mounted(){
        this.getTableDate()
    }
};
</script>
<style lang="less" scoped>
@import "~@/assets/less/home.less";
</style>