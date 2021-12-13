<template>
<!-- 公共echart组件的封装 -->
    <div ref="echart"></div>
</template>
<script>
import * as echarts from 'echarts';
export default {
    // 接受传递来的数据
    props:{
        echartData:{
            type:Object,
            default(){
                return {
                    xData:[],
                    series
                }
            }
        },
        isAxisChart:{
            type:Boolean,
            default:true
        }
    },
    watch:{
        // 监听
        echartData:{
            handler:function(){
            // 调用函数初始化表格
            this.initChart()
            },
            deep:true
        }
    },
    methods:{
        // 初始化表格的函数
        initChart(){
            // 调用初始化数据的函数 初始化数据
            this.initChartData()
            // 设置表格
            if(this.echart){
                this.echart.setOption(this.options)
           }else{
                this.echart = echarts.init(this.$refs.echart)
                this.echart.setOption(this.options)
           }
        },
        // 初始化数据
        initChartData(){
            if(this.isAxisChart){
                this.axisOptions.xAxis.data = this.echartData.data
                this.axisOptions.series = this.echartData.series
            }else{
                this.normalOptions.series = this.echartData.series
            }
        }
    },
    computed:{
        options(){
            return this.isAxisChart ? this.axisOptions : this.normalOptions
        }
    },
    data() {
        return {
            // 有x轴的配置
            axisOptions:{
                legend:{
                        // 图例文字颜色
                    textStyle:{
                        color:'#333'
                    }
                },
                grid:{
                    left:"20%"
                },
                 // 提示框
                tooltip:{
                    trigger:"axis"
                },
                xAxis:{
                    type:"category",//类目轴
                    data:[],
                    axisLine:{
                        lineStyle:{
                            color:"#17b3a3"
                        },
                    },
                    axisLable:{
                        interval:0,
                        color:"#333"
                    }
                },
                yAxis:[
                    {
                        type:"value",
                        axisLine:{
                            lineStyle:{
                                color:"#17b3a3"
                            },
                        },
                    }
                ],
                color:["#2ec7c9","#b6a2de","#5ablef","#d87a80",
                "#8d98b3"],
                series:[]
            },
            normalOptions:{
                tooltip:{
                    trigger:"item"
                },
                color:["#0f78f4","#dd536b","#9462e5","#a6a6a6",
                "#e1bb22","#39c362","#3ed1cf"],
                series:[]
            },
            echart:null
        };
    },
    
};
</script>