export default {
    state:{
        mallList: [], 
        currentPage:1,
        multipleSelection: [],
        total:'',
        operateType: "add",
        isShow: false,
        // 商品表单数据
        operateForm: {},
        dialogVisible: false,
        // 表格数据
        multipleSelection: []
    },
    mutations:{
        chageCurrentPage(state,payload){
            state.currentPage = payload
        },
        setOperateType(state,payload){
            state.operateType = payload
        },
        openForm(state){
            state.isShow = true
        },
        closeForm(state){
            state.isShow = false
        },
        setOperateForm(state,payload){
            console.log(payload)
            state.operateForm = payload
        }
    }
}