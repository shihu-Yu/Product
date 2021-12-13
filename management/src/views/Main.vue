<template>
    <el-container style="height:100%">
		<el-aside width="auto" heigh="100%"><component-aside></component-aside></el-aside>
		<el-container>
			<el-header id="header"><component-header></component-header></el-header>
			<el-main>
				<component-tag></component-tag>
				<!-- 这里是路由的出口 -->
				<router-view></router-view>
			</el-main>
  		</el-container>
	</el-container>
</template>
<script>
// 引入组件
import ComponentAside from '../components/componentAside.vue'
import ComponentHeader from '../components/componentHeader.vue'
import ComponentTag from '../components/componentTag.vue'
export default {
  	name: 'Main',
	components:{ComponentAside,ComponentHeader,ComponentTag},
  	data() {
    	return {
      
    	};
  	},

};
</script>
<style lang="less" >
#header{
	background-color: #333;
	width: 100%;
}
.el-main{
	padding-top: 0;
	background-color: rgba(250, 245, 245, 0.973);
}
</style>
