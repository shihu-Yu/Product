import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/login/login.vue'
import Register from '../views/login/register.vue'
const originPush = VueRouter.prototype.push
// 解决重复点击路由会报错的问题
VueRouter.prototype.push = function push(location){
  return originPush.call(this,location).catch(err=>err)
}
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Main',
    component:Main,
    meta: {
      requireAuth: true, // 判断是否需要登录
     },
    children:[
      {
        path:'/',
        name:'home',
        meta: {
          requireAuth: true, // 判断是否需要登录
         },
        // 路由懒加载
        component:() => import ('@/views/Home/Home')
      },
      {
        path:'/mall',
        name:'mall',
        meta: {
          requireAuth: true, // 判断是否需要登录
         },
        component:() => import ('@/views/Mall/Mall')
      },
      {
        path:'/user',
        name:'user',
        meta: {
          requireAuth: true, // 判断是否需要登录
         },
        component:() => import ('@/views/User/User')
      },
      {
        path:'/personal',
        name:'personal',
        meta: {
          requireAuth: true, // 判断是否需要登录
         },
        component:() => import ('@/views/Other/Personal')
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component:Login,
  },
  {
    path: '/register',
    name: 'register',
    component:Register,
  },
]
const router = new VueRouter({
  mode:'history',//h5路由
  // base:process.env
  routes
})
export default router
