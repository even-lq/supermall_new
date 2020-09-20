import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";

Vue.use(Vuex)
const state = {
  cartList: []
}
const store = new Vuex.Store({
  state,
  //mutations：更新state的状态，只做单一的更新操作
  mutations,
  //actions: 异步操作，判断操作：提交mutations
  actions,
  getters
})

export default store
