import Vue from 'vue'
import Vuex from 'vuex'
// import state from './state'
// import * as mutations from './mutations'
// import * as getters from './getters'
// import * as actions from './actions'
import menu from './module/menu'
import status from './module/status'
import users from './module/users'

Vue.use(Vuex);

export const store = new Vuex.Store({
  // state:{
  //   //设置属性
  //   menuItems:{}
  // },
  // state,
  // getters:{
  //   //获取属性的状态
  // },
  // getters,
  // mutations:{
  //   //修改属性的状态
  //   setMenuItems(state,data){
  //     state.menuItems = data;
  //   }
  // },
  // mutations,
  // actions:{
  //   //应用mutations
  // }
  // actions,

  // 使用modules
  modules: {
    menu,
    status,
    users,
  }
});
