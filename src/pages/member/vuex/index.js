//使用vuex插件
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import Address from 'js/addressService.js'
import { inspect } from 'util';

//创建一个store实例（存放数据和管理数据）
const store = new Vuex.Store({
    //状态管理（类似于data）
    //里面的数据不允许直接修改，只能利用事件进行修改
    state:{
        lists:null,

    },
    //同步事件，管理数据
    mutations:{
        init(state,lists){
            state.lists = lists
        },
        add(state,instance){
            state.lists.push(instance)
        },
        remove(state,id){
            let lists = state.lists
            let index = lists.findIndex(item => {
                return item.id = id
            })
            lists.splice(index,1)
        },
        update(state,instance){
            let lists = JSON.parse(JSON.stringify(state.lists))
            let index = lists.findIndex(item => {
                return item.id = instance.id
            })
            lists[index] = instance
            state.lists = lists
        },
        setDefault(state,id){
            let lists = state.lists
            lists.forEach(item => {
                item.isDefault = item.id == id ?true : false
            })
        }
        
    },
    //异步事件
    actions:{
        getLists({commit} ){
            Address.list().then(res => {
                commit('init',res.data.lists)   //触发mutations中的init事件
            })
        },
        addAction({commit},instance){
            Address.add(instance).then( res => {
                //模拟添加id，理论上insatance应该后台返回id
                instance.id = parseInt(Math.random()*1000)
                commit('add',instance)
            })
        },
        removeAction({commit},id){
            Address.remove(id).then(res =>{
                commit('remove',id)
            })
        },
        updateAction({commit},instance){
            Address.update(instance).then(res=>{
                commit('update',instance)
            })
        },
        setDefaultAction({commit},id){
            Address.setDefault(id).then(res => {
                commit('setDefault',id)
            })
        }
    }
})

export default store