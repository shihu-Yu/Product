<template>
    <header class="header">
        <div class="l-content">
            <el-button 
                plain size="mini" 
                icon="el-icon-menu" 
                @click="handleMenu"
            >
            </el-button>
            <el-breadcrumb >
                <el-breadcrumb-item style="{color:#666}"  :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item 
                :to="{ path: current.path }"
                v-if=" current"
                >{{current.label}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown trigger="click" size="mini" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img :src="userImg" class="user">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>
                        <router-link to="/personal">
                            个人中心
                        </router-link>
                    </el-dropdown-item>
                    <el-dropdown-item command="signout">退出</el-dropdown-item>
                </el-dropdown-menu>
             </el-dropdown>
        </div>
    </header>
</template>

<script>
import {mapState} from 'vuex'
import {removeUsername,goLogin} from '../util/index'
export default {
    name: 'ComponentHeader',
    data() {
        return {
            userImg:require("../assets/user.jpg")
        };
    },
    methods:{
        // 按钮通过该方法 提交菜单开关申请
        handleMenu(){
            // 通过commit 提交到mutations 来改变state中iscollapse的值
            this.$store.commit("collapseMenu")
        },
        handleCommand(command){
            if(command == 'signout'){
                removeUsername()
                goLogin()
            }else{

            }
        }
    },
    computed:{
        ...mapState({
            current:state=>state.tag.currentMenu
        })
    }
};
</script>

<style lang="less">
    .header{
        display: flex;
        align-items: center;
        height: 100%;
        justify-content:space-between;
        .l-content{
        display: flex;
        height: 100%;
        align-items: center;
        .el-button{
            margin-right: 20px;
        }
        .el-breadcrumb__inner.is-link{
                color: #666666 ;
                font-weight: normal;
            }
        .el-breadcrumb__item:last-child .el-breadcrumb__inner.is-link{
            color: #ffffff !important;
            cursor: pointer !important;
        }
       
    }
    .r-content{
        display: flex;
        align-items: center;
        .user{
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
        
    }
}
.el-dropdown-menu--mini .el-dropdown-menu__item {
            a{
                text-decoration: none;
            }
        }
</style>

