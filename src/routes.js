import Home from './components/Home'
import Menu from './components/Menu'
import Admin from './components/Admin'
import About from './components/about/About'
import Login from './components/Login'
import Register from './components/Register'

// 关于我们的二级路由
import Contact from './components/about/Contact'
import History from './components/about/History'
import OrderingGuide from './components/about/OrderingGuide'
import Delivery from './components/about/Delivery'

// 关于我们的三级路由
import Phone from './components/about/Contact/Phone'
import PersonName from './components/about/Contact/PersonName'

export const routes = [
  // 路由复用
  {path:'/', name:'homeLink', components: {
    default:Home,
    'orderingGuide':OrderingGuide,
    'delivery':Delivery,
    'history':History,
  }},
  {path:'/menu', name:'menuLink', component:Menu},
  {path:'/admin', name:'adminLink', component:Admin
    // beforeEnter: (to, from, next)=>{
    // 路由独享守卫
    // alert("非登录状态不能访问此页面");
    // next(false);
    // if(to.path === '/login' || to.path === '/register') {
    //   next();
    // } else {
    //   alert("还没有登录，请先登录");
    //   next('/login');
    // }
    // }
  },
  { path:'/about',
    name:'aboutLink',
    component:About,
    redirect:'/about/contact',
    children:[
      {
        path:'/about/contact',
        name:'contactLink',
        component:Contact,
        redirect:'/about/contact/personname',
        children:[
          {path:'/about/contact/phone', name:'phoneNumber', component:Phone},
          {path:'/about/contact/personname', name:'personName', component:PersonName},
        ]
      },
      {path:'/about/history', name:'historyLink', component:History},
      {path:'/about/livery', name:'deliveryLink', component:Delivery},
      {path:'/about/orderingGuide', name:'orderingGuideLink', component:OrderingGuide},
      {path:'*',redirect:'/about/contact'},
    ]
  },
  {path:'/login', name:'loginLink', component:Login},
  {path:'/register', name:'registerLink', component:Register},
  {path:'*',redirect:'/'},  //路由重定向
]
