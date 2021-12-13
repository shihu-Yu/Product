import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 按需引入element ui
import { Container, Header,Footer,Main,Row,Col} from 'element-ui';
Vue.config.productionTip = false
Vue.use(Container)
Vue.use(Header)
Vue.use(Footer)
Vue.use(Main)
Vue.use(Row)
Vue.use(Col)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
