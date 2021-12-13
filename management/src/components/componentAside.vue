<template>
	<el-menu 
	class="el-menu-vertical-demo" 
	:collapse="isCollapse"
	background-color="#545c69"
	active-text-color="#ffd04b"
	text-color="#fff"
	>
	<h3 v-show="!isCollapse">通用后台管理系统</h3>
	<h3 v-show="isCollapse">后台</h3>
	<el-menu-item 
		:index="item.path" 
	 	v-for="item in noChildren" 
		:key="item.path"
		@click="clickMenu(item)"
	>
    	<i :class="'el-icon-'+ item.icon"></i>
    	<span slot="title">{{item.label}}</span>
  	</el-menu-item>
  	<el-submenu 
	  	:index="item.label" 
	 	v-for="item in hasChildren" 
		:key="item.path"
	>
		<template slot="title">
			<i :class="'el-icon-'+ item.icon"></i>
    		<span slot="title">{{item.label}}</span>
		</template>
    <el-menu-item-group>
      	<el-menu-item :index="subItem.path" 
	 		v-for="(subItem,subIndex) in item.children" 
			:key="subIndex"
			@click="clickMenu(subItem)"
		>
		<template slot="title">
			<i :class="'el-icon-'+ subItem.icon"></i>
    		<span slot="title">{{subItem.label}}</span>
		</template>
		</el-menu-item>
    </el-menu-item-group>
  	</el-submenu>
</el-menu>
    
</template>

<script>
export default {
  name: 'ComponentAside',
   data() {
      return {
       
		// menu样式
		menu:[
			{
				path:'/',
				name:'home',
				label:'首页',
				icon:'s-home',
				url:'Home/Home'
			},
			{
				path:'/mall',
				name:'mall',
				label:'商品管理',
				icon:'sell',
				url:'MalllMange/MalllMange'
			},
			{
				path:'/user',
				name:'user',
				label:'用户管理',
				icon:'user',
				url:'UserMange/UserMange'
			},
			{
				label:'其他',
				icon:'location',
				children:[
					{
						path:'/personal',
						name:'personal',
						label:'页面一',
						icon:'setting',
						url:'OtherPageOne'
					},
					{
						path:'page2',
						name:'page2',
						label:'页面二',
						icon:'setting',
						url:'OtherPageTwo'
					}
				]
			}
		]
      };
    },
    methods: {
    //   handleOpen(key, keyPath) {
    //     // console.log(key, keyPath);
    //   },
    //   handleClose(key, keyPath) {
    //     // console.log(key, keyPath);
	//   },
	  	clickMenu(item){
			  this.$router.push({name:item.name})
			  this.$store.commit('selectMenu',item);
	  	}
	},
	// 计算属性
	computed:{
		// 遍历menu数组 返回没有children属性的几个对象
		noChildren(){
			return this.menu.filter((item)=> !item.children)
		},
		// 遍历menu数组 返回有children属性的几个对象
		hasChildren(){
			return this.menu.filter((item)=> item.children)
		},
		 // 是否水平打开子菜单
		isCollapse(){
			// 从计算属性中拿到iscollapse的值来控制左侧菜单是否水平折叠收起菜单
			return this.$store.state.tag.isCollapse
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
	.el-menu{
		border: 0;
		height: 850px;
	}
	.el-menu-vertical-demo:not(.el-menu--collapse) {
   		width: 200px;
    	min-height: 850px;
	}
  	h3{
	  	text-align: center;
	  	line-height: 40px;
	  	color: #fff;
		margin: 0 10px;

  	}
</style>
