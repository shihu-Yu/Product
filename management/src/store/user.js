export default {
    state:{
        userList: [], 
        currentPage:1,
        multipleSelection: [],
        total:'',
        // 用户表单数据
        operateFormLabel: [
            {
            model: "name",
            label: "姓名",
            type: "input",
            },
            {
            model: "email",
            label: "邮箱",
            type: "input",
            },
            {
            model: "age",
            label: "年龄",
            type: "input",
            },
            {
            model: "sex",
            label: "性别",
            type: "select",
            opts: [
                {
                label: "男",
                value: 0,
                },
                {
                label: "女",
                value: 1,
                },
            ],
            },
            {
            model: "birth",
            label: "出生日期",
            type: "date",
            },
            {
            model: "addr",
            label: "地址",
            type: "input",
            },
        ],
        operateType: "add",
        isShow: false,
        tableData: [],
        config: {
            page: 1,
            total: 30,
            loading: false,
        },
        operateForm: {},
           
        searchFrom: {
            keyword: "",
        },
        formLabel: [
            {
                model: "keyword",
                label: "用户ID",
                type: "input",
            },
            {
                model: "username",
                label: "用户名",
                type: "input",
            },
            {
                model: "sex",
                label: "性别",
                type: "select",
                opts: [
                    {
                        label: "男",
                        value: 0,
                    },
                    {
                        label: "女",
                        value: 1,
                    },
                ],
            },
        ],
        userName: '',
        userID:'',
        dialogVisible: false,
        options: [
            {
                value: '选项1',
                label: '在职'
            }, 
            {
                value: '选项2',
                label: '离职'
            },
            {
                value: '选项3',
                label: '休息'
            },
        ],
        value: '',
        // 表格数据
        multipleSelection: []
    },
    actions:{
        
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
            state.operateForm = payload
        }
    }
}
