import Vue from 'vue'
import Router from 'vue-router'
import routes from 'vue-auto-routing'
import { createRouterLayout } from 'vue-router-layout'

import store from "./vuex/store";

import route from "@/middleware/config/route";

import PageNotFound from "@/pages/pagenotfound";
import AppError from './middleware/error/AppError';
import { accessDenied } from './middleware/error/code';

Vue.use(Router)

const RouterLayout = createRouterLayout(layout => {
  return import('@/layouts/' + layout + '.vue')
})

const router = new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      component: RouterLayout,
      children: routes
    },
    { path: "*", component: PageNotFound }
  ]
})

router.beforeEach((to, from, next)=>{
  console.log(to.name, 'name routerrrname')
  let userRoute = []
  
  setTimeout(()=>{
    const user = store.state.user
    if(!user){
      return
    }
    if(user.role  == 8){
      const attr = Object.keys(user.idiosyncrasy).filter(k => user.idiosyncrasy[k] == true)
      console.log(attr)
      for(let a of attr){
        userRoute.push(route[`${a}Route`])
      }

      const onboarding = JSON.parse(localStorage.getItem('onboarding'))
      if(userRoute.length == 0 && onboarding){
        
        userRoute = route.neophyteRoute
      }else{
        userRoute.push(route.officerRoute)
      }
      
      userRoute = Array.from(new Set(userRoute.flat()))
      console.log('userRoute', userRoute)
    }else if(user.role == 16){
      userRoute = route.supportRoute
    }else if(user.role == 32){
      userRoute = route.adminRoute
    }else if(user.role >= 64){
      userRoute = route.realmRoute
    }

    for(let r of route.whiteRoute){
      userRoute.push(r)
    }

    let address = ''
    if(to.path == '/'){
      address = 'index'
    }else{
      address = to.path.substr(1, to.path.length).replaceAll('/', '.').replaceAll('-', '.')
      console.log(address, 'address')
    }
  
    if(userRoute.indexOf(address) >=0){
      console.log('yes')
       next()
       return
    }else{
      console.log('no ry gain')
      next(new AppError(accessDenied))
    }
  })
  next()
  
  
})

router.onError((err)=>{
  if(err.code == 403) router.push({name: 'lostbutfound', params: {err}}).catch(()=>{})
})
export default router;
