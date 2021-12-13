import Vue from 'vue'
import Vuex from 'vuex'
import tag from './tag.js'
import user from './user'
import home from './home'
import mall from './mall'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tag,
    user,
    home,
    mall
  }
})
