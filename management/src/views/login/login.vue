<template>
    <div class="login">
        <div class="login_box">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                    <router-link to="/register">
                        <el-button class="regbtn">注册</el-button>
                    </router-link>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import axios from '../../api/axios';
import {goHome} from '../../util'
export default {
    components:{},
    data() {
        var checkUsername = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入用户名'));
            } else {
            callback();
            }
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('请输入密码'));
            } else {
            callback();
            }
        };
        return {
            ruleForm: {
                username:'',
                password: '',
            },
            rules: {
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                username:[
                    { validator: checkUsername, trigger: 'blur' }
                ]
            }
        };
    },
    computed:{
       
    },
    methods: {
         submitForm(ruleForm) {
            this.$refs[ruleForm].validate(async (valid) => {
                console.log(this.ruleForm)
            if (valid) {
                await axios.request({
                url:'/login',
                methods:'post',
                data:this.ruleForm
            })
            .then(res=>{
                let status = res.code
                let msg = res.msg
                console.log(msg)
                if(status == 200){
                    sessionStorage.setItem('username',this.ruleForm.username)
                    this.$message({
                        type: "success",
                        message: msg,
                    });
                    goHome()
                }else{
                    this.$message({
                        type: "warning",
                        message: msg,
                    });
                }
            })
            .catch(err=>{
                console.log(err)
            })
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        
    },
    mounted() {
        
    },
};
</script>
<style lang="less" scoped>
    .login {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(190, 181, 181, 0.678);
        .login_box{
                width: 400px;
                height: 300px;
                line-height: 300px;
                background-color: #fff;
                position: relative;
                top: 50%;
                margin-top: -150px;
                left: 50%;
                margin-left: -200px;
                .el-form{
                    width: 80%;
                    height: 80%;
                    position: relative;
                    top: 20%;
                    .regbtn{
                        margin-left: 20px;
                    }
                }
        }
    }
</style>