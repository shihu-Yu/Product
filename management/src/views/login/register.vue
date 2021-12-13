<template>
    <div class="register">
        <div class="register_box">
            <el-form :model="ruleForm" name="registerForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username" >
                    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
                    <router-link to="/login">
                        <el-button class="regbtn">去登陆</el-button>
                    </router-link>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import axios from '../../api/axios';
import {goLogin} from '../../util/index'
export default {
    data() {
        var checkUsername = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('用户名不能为空'));
            } else if(/^[a-zA-Z]\w{3,6}$/.test(value) == false){
                callback(new Error('用户名只能是以下划线、字母、数字开头且长度为3至6字符'));
            }else{
                callback();
            }
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
            callback(new Error('密码不能为空'));
            }else if(/^[a-zA-Z]\w{3,6}$/.test(value) == false){
                callback(new Error('密码只能是以下划线、字母、数字开头且长度为6字符'));
            }else{
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
        return {
            ruleForm: {
                username:'',
                password: '',
                checkPass: '',
            },
            rules: {
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                username:[
                    { validator: checkUsername, trigger: 'blur' }
                ],
                 checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
            }
        };
    },
    methods: {
        submitForm(ruleForm) {
            this.$refs[ruleForm].validate(async (valid) => {
                if(valid){
                await axios.request({
                url:'/register',
                methods:'post',
                data:{
                    username:ruleForm.username,
                    password:ruleForm.password
                }
            })
            .then(res=>{
                let status = res.code
                let msg = res.msg
                if(status == 200){
                    this.$message({
                        type: "success",
                        message: msg,
                    });
                    goLogin()
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
                }
            })
        },
    },
    mounted() {
        
    },
};
</script>
<style lang="less">
    .register {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(190, 181, 181, 0.678);
        .register_box{
                width: 400px;
                height: 350px;
                line-height: 300px;
                background-color: #fff;
                position: relative;
                top: 50%;
                margin-top: -175px;
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
                .el-form-item{
                        margin-bottom:30px ;
                    }
            }
        }
    }
</style>