// mock模拟数据
import Mock from 'mockjs'
// 图表数据
let list = []
export default{
    getStatisticalData:()=>{
        for(let i=0;i<7;i++){
            list.push(
                Mock.mock({
                    苹果:Mock.Random.float(100,8000,0,0),
                    vivo:Mock.Random.float(100,8000,0,0),
                    魅族:Mock.Random.float(100,8000,0,0),
                    三星:Mock.Random.float(100,8000,0,0),
                    华为:Mock.Random.float(100,8000,0,0),
                    小米:Mock.Random.float(100,8000,0,0),
                })
            )
        }
        let data = Mock.mock({
            "videoData|6":[
                {
                    "name":"@cword(4)",
                    "value|2000-5000":1,
                },
            ],
            "userData":[
                {"date":'周一',"new|1-100":1,"active|20-1000":1},
                {"date":'周二',"new|1-100":1,"active|20-1000":1},
                {"date":'周三',"new|1-100":1,"active|20-1000":1},
                {"date":'周四',"new|1-100":1,"active|20-1000":1},
                {"date":'周五',"new|1-100":1,"active|20-1000":1},
                {"date":'周六',"new|1-100":1,"active|20-1000":1},
                {"date":'周日',"new|1-100":1,"active|20-1000":1},
            ],
            "orderData":{
                "date":['20191001','20191002','20191003','20191004',
                       '20191005','20191006','20191007',],
                "data":list
            },
            "tableData|5-8":[
                {   "name":"@cword(2)",
                    "totalBuy|0-500":1,
                    "monthBuy|0-1000":4,
                    "totalBuy|1000- 2000":1,
                },
            ]
        })
        return{
            code:20000,
            data
        }
    }
}