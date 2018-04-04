

//1.使用Vue-router
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

let routes = [{
    path:'/',
    component:require('./components/member.vue').default
},
{
    path:'/address',
    component:require('./components/address.vue').default,
    //嵌套路由
    children:[{
        path:'',
        redirect:'all'  //重定向

    },{
        path:'all',
        component:require("./components/all.vue").default

    },{
        path:'form',
        component:require("./components/form.vue").default
    }]
}]

//2.创建router实例
let router = new Router({
    routes
})

//根组件注入
new Vue({
    el:"#app",
    router
})