import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import http from 'axios'
// 按需引入element-ui
import { Aside,Container, Header,Main,Menu,Submenu,MenuItem,MenuItemGroup,Button,
Dropdown,DropdownMenu,DropdownItem,Row,Col,Card,Table,TableColumn,Breadcrumb,BreadcrumbItem,
Tag,Select,Input,Option,Pagination,Dialog,Form,FormItem,Switch,DatePicker,MessageBox,Message } from 'element-ui'
Vue.config.productionTip = false

Vue.use(Aside);
Vue.use(Container);
Vue.use(Header);
Vue.use(Main);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Button);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Card);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Tag);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Pagination);
Vue.use(Form);
Vue.use(Dialog);
Vue.use(FormItem);
Vue.use(Switch);
Vue.use(DatePicker);
// 全局挂载
Vue.prototype.$http = http
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
if(process.env.NODE_ENV ==='development' ) require('@/api/mock')

router.beforeEach((to,from,next)=>{
  // 判断该路由是否需要登录权限
  if(to.matched.some(record=>record.meta.requireAuth)){
    // 判断是否处于登录状态
    if(sessionStorage.getItem('username')){
      next()
    }else{
      next({
        path:'/login',
        query:{redirect:'/'}
      })
    }
  }else{
    next()
  }
  
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
