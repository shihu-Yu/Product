<template>
    <div class="mall">
        <el-dialog
        :title="operateType === 'add' ? '新增商品' : '更新商品'"
        :visible.sync="isShow"
        :showClose= false
        >
            <el-form ref="form" :model="operateForm" label-width="80px">
            <el-form-item label="商品名称">
                <el-input v-model="operateForm.name" width="160px"></el-input>
            </el-form-item>
            <el-form-item label="商品描述">
                <el-input type="textarea" v-model="operateForm.desc"></el-input>
            </el-form-item>
            <el-form-item label="商品分类">
                <el-input type="input" v-model="operateForm.category"></el-input>
            </el-form-item> 
            <el-form-item label="店铺名称">
                <el-input type="input" v-model="operateForm.shop"></el-input>
            </el-form-item>
            <el-form-item label="店铺地址">
                <el-input type="textarea" v-model="operateForm.address"></el-input>
            </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="this.closeForm">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </div>
        </el-dialog>
        <div class="manage-header" >
            <el-button type="primary" @click="addMall">+ 新增商品</el-button>
        </div>
    <el-table
    :data="list"
    style="width: 100%">
        <el-table-column type="expand">
        <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属店铺">
                <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
                <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
                <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
                <span>{{ props.row.desc }}</span>
            </el-form-item>
            </el-form>
        </template>
        </el-table-column>
        <el-table-column
        label="商品 ID"
        prop="id">
        </el-table-column>
        <el-table-column
        label="商品名称"
        prop="name">
        </el-table-column>
        <el-table-column
        label="描述"
        prop="desc">
        </el-table-column>
        <el-table-column
        fixed="right"
        label="操作"
        width="200">
        <template slot-scope="scope">
            <el-button
                @click.native.prevent="editMall(scope.row)"
                type="primary"
                size="small">
                编辑
            </el-button>
            <el-button
                @click.native.prevent="delMall(scope.row)"
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
    
</template>
<script>
import axios from '../../api/axios';
import {mapState,mapMutations} from 'vuex';
import { getMall } from '../../api/data';
import CommonForm from '../../components/CommonForm.vue'
export default {
    name: 'ManagementUser',
    components:{
        CommonForm,
    },
    computed:{
        ...mapState({
            mallList:state=>state.mall.mallList,
            operateType:state=>state.mall.operateType,
            isShow:state=>state.mall.isShow,
            operateForm:state=>state.mall.operateForm,
            dialogVisible:state=>state.mall.dialogVisible,
            multipleSelection:state=>state.mall.multipleSelection,
        }),
        currentPage:{
            get(){
                return this.$store.state.mall.currentPage
            },
            set(){
                current_change(this.currentPage)
            }
        },
        list(){
            // 获取
            let result = this.mallList.sort(this.sortby("id"))
            .slice((this.currentPage-1)*5,this.currentPage*5)
            return result
        },
        // 获取总页数
        total(){
            return this.mallList.length
        },
    },

    methods: {
        ...mapMutations({
            closeForm:'closeForm',
            openForm:'openForm'
        }),
        getList(){
            getMall().then(res=>{
               this.$store.state.mall.mallList = res.data.mallList
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
        addMall() {
            this.openForm()
            this.$store.commit('setOperateForm',{})
            this.$store.commit('setOperateType',"add")
        },
        editMall(row) {
            this.openForm()
            this.$store.commit('setOperateType',"edit")
            this.$store.commit('setOperateForm',row)
        },
        confirm() {
        if(this.operateType === "edit"){
            this.$http.post("/api/mall/edit", this.operateForm).then((res) => {
            console.log(res.data);
            this.closeForm()
            this.getList();
            });
        }else{
                this.$http.post("/api/mall/add", this.operateForm).then((res) => {
                this.closeForm()
                this.getList();
                });
            }
        },
        delMall(row) {
        this.$confirm("此操作将永久删除该用户信息, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
        })
            .then(() => {
            let id = row.id;
            this.$http
                .get("/api/mall/del", {
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
}
</script>
<style lang="less" scoped>
    .mall{
        width: 100%;
        .manage-header{
            margin-bottom: 20px;
        }
        .demo-table-expand {
            font-size: 0;
            margin-left: 45px;
        }
        .demo-table-expand label {
            width: 90px;
            color: #99a9bf;
        }
        .demo-table-expand .el-form-item {
            margin-right: 0;
            margin-bottom: 0;
            width: 50%;
        }
        .el-pagination {
            text-align: center;
            margin-top: 10px;
        }
    }        
</style>