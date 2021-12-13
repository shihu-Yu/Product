import { mapMutations } from "vuex"

export default {
    state:{
        //该属性是控制菜单 是否水平折叠收起菜单
        isCollapse:false,
        currentMenu:null,
        tabsList:[
            {
                path:'/',
                name:'home',
                label:'首页',
                icon:'home'
            },
        ]
    },
    mutations:{
        
    // 在这里改变state中isCollapse的值来控制菜单是否水平折叠收起菜单
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state,val){
            if(val.name === 'home'){
                state.currentMenu = null
            }else{
                state.currentMenu = val
                // 判断面包屑是否已经在tabsList存在 如果没有push 有就''
                let result = state.tabsList.findIndex(item=>item.name == val.name)
                result == '-1' ? state.tabsList.push(val) : ''
            }
        },
        // 关闭标签
        closeTag(state,val){
            // 找到选中的下标 
            let result = state.tabsList.findIndex(item=>item.name == val.name)
            // 删除tabsList中该下标的路由
            state.tabsList.splice(result,1)
        }
    }
}
