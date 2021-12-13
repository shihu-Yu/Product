<template>
    <div class="userpage">
        <el-dialog
        :title="operateType === 'add' ? '新增用户' : '更新用户'"
        :visible.sync="isShow"
        :showClose= false
        >
            <common-form
                :formLabel="operateFormLabel"
                :form="operateForm"
                ref="form"
                :inline="true"
            ></common-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="this.closeForm">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </div>
        </el-dialog>
        <div class="manage-header">
            <el-button type="primary" @click="addUser">+ 新增用户</el-button>
            <div class="userSearch">
                <common-form  :inline="true" :formLabel="formLabel" :form="searchFrom">
                    <el-button type="primary" @click="searchUser(formLabel)">搜索</el-button>
                </common-form>
            </div>
        </div>
        <div class="user-table">
            <el-table
                ref="multipleTable"
                :data="list"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange"
            >
                <el-table-column
                    prop="id"
                    label="用户ID"
                    width="200">
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="用户名"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="email"
                    label="邮箱"
                    width="220">
                </el-table-column>
                <el-table-column
                    prop="age"
                    label="年龄"
                    width="60">
                </el-table-column>
                <el-table-column
                    prop="sex"
                    label="性别"
                    width="60">
                </el-table-column>
                <el-table-column
                    prop="birth"
                    label="出生日期"
                    width="120">
                </el-table-column>
                <el-table-column
                    prop="addr"
                    label="地址"
                    width="200">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    width="200">
                    <template slot-scope="scope">
                        <el-button
                            @click.native.prevent="editUser(scope.row)"
                            type="primary"
                            to="/mall"
                            size="small">
                            编辑
                        </el-button>
                        <el-button
                            @click.native.prevent="delUser(scope.row)"
                            type="danger"
                            size="small">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                background
                @current-change="handleCurrentChange"
                :page-size= "5"
                :current-page="currentPage"
                layout="prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import axios from '../../api/axios';
import {mapState,mapMutations} from 'vuex';
import { getUser } from '../../api/data';
import CommonForm from '../../components/CommonForm.vue'
export default {
    name: 'ManagementUser',
    components:{
        CommonForm,
    },
    computed:{
        ...mapState({
            userList:state=>state.user.userList,
            operateFormLabel:state=>state.user.operateFormLabel,
            operateType:state=>state.user.operateType,
            isShow:state=>state.user.isShow,
            tableData:state=>state.user.tableData,
            config:state=>state.user.config,
            operateForm:state=>state.user.operateForm,
            searchFrom:state=>state.user.searchFrom,
            formLabel:state=>state.user.formLabel,
            userName:state=>state.user.userName,
            userID:state=>state.user.userID,
            dialogVisible:state=>state.user.dialogVisible,
            options:state=>state.user.options,
            value:state=>state.user.value,
            multipleSelection:state=>state.user.multipleSelection,
        }),
        currentPage:{
            get(){
                return this.$store.state.user.currentPage
            },
            set(){
                current_change(this.currentPage)
            }
        },
        list(){
            // 获取
            let result = this.userList.sort(this.sortby("id"))
            .slice((this.currentPage-1)*5,this.currentPage*5)
            // 循环遍历判断性别
            for(let item of result){
                if(item.sex == 0 || item.sex == "男"){
                    item.sex = "男"
                }else if(item.sex == 1){
                    item.sex = "女"
                }
            }
            return result
        },
        // 获取总页数
        total(){
            return this.userList.length
        },
    },

    methods: {
        ...mapMutations({
            closeForm:'closeForm',
            openForm:'openForm'
        }),
        getList(){
            getUser().then(res=>{
               this.$store.state.user.userList = res.data.userList
            })
        },
        // 使用sort排序 所需要的方法
        sortby(property){
            return function(a,b){
                var value1 = a[property]
                var value2 = b[property]
                if(value1 < value2){
                    return -1
                }else if(value1 > value2){
                    return 1
                }else{
                   return 0
                }
            }
        },
       
        // 点击页码切换list数据
        handleCurrentChange(val){
            this.$store.commit('chageCurrentPage',val)
        },
        toggleSelection(rows) {
            if (rows) {
            rows.forEach(row => {
                this.$refs.multipleTable.toggleRowSelection(row);
            });
            } else {
            this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        // 搜索用户
        searchUser(){
            axios.request({
                url:'/user/search',
                method:'get',
                data:this.searchFrom
            })
            .then(res=>{
                let searchUser = res
                this.list.unshift(searchUser)
            })
        },
        addUser() {
            this.openForm()
            this.$store.commit('setOperateForm',{})
            this.$store.commit('setOperateType',"add")
        },
        editUser(row) {
            this.openForm()
            this.$store.commit('setOperateType',"edit")
            this.$store.commit('setOperateForm',row)
        },
        confirm() {
        if(this.operateType === "edit"){
            this.$http.post("/api/user/edit", this.operateForm).then((res) => {
            console.log(res.data);
            this.closeForm()
            this.getList();
            });
        }else{
                this.$http.post("/api/user/add", this.operateForm).then((res) => {
                console.log(res.data);
                this.closeForm()
                this.getList();
                });
            }
        },
        delUser(row) {
        this.$confirm("此操作将永久删除该用户信息, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        })
            .then(() => {
            let id = row.id;
            this.$http
                .get("/api/user/del", {
                    params:{
                        id,
                    },
                })
                .then((res) => {
                console.log(res.data);
                this.$message({
                    type: "success",
                    message: "删除成功!",
                });
                this.getList();
                });
            })
            .catch(() => {
            this.$message({
                type: "info",
                message: "已取消删除",
                });
            });
        },
    },
    mounted(){
        this.getList()
    }
};
</script>
<style lang="less" scoped>
    .userpage{
        width: 100%;
        .userSearch{
            width: 100%;
            padding-top: 20px;
            margin-top: 20px;
            border-radius:5px ;
            background-color: #fff;
        }
        .el-pagination {
            text-align: center;
            margin-top: 10px;
        }
    }        
</style>