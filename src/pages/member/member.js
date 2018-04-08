import './member.css'
import Vue from 'vue'

import router from './router/index.js'  //引入路由
import store from './vuex/index.js'  //引入状态管理


//根组件注入
new Vue({
    el:"#app",
    router,
    store, //直接注入
})