import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { routes } from './routes'
import axios from 'axios'

import {store} from './store/store'


// 配置默认根路径
axios.defaults.baseURL = "https://wd2468178309upkmpi.wilddogio.com/";

//配置Vue原型(在任何组件中都可以正常使用axios)
Vue.prototype.http = axios;

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  // 第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。
  scrollBehavior(to, from, savePosition){
    // return {x:0,y:100};
    // return { selector:'.btn'}
    if (savePosition){
      return savePosition
    } else {
      return {x:0,y:0}
    }
  },
  mode:'history'   //不加这个地址栏会自动给加个#号
})

// 全局守卫
//   router.beforeEach((to, from, next)=>{
    // alert("还没有登录，请先登录");
    // next();
    // console.log(to);

    // 判断store.getter.isLogin === false;
    // if(to.path === '/login' || to.path === '/register') {
    //   next();
    // } else {
    //   alert("还没有登录，请先登录");
    //   next('/login');
    // }
  // })


// 后置钩子
//   router.afterEach((to, from)=>{
//     alert("after each");
//   });
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
