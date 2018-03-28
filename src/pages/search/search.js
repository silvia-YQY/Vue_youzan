import 'css/common.css'
import './search.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import qs from 'qs'   //url参数解析

import mixin from 'js/mixin.js'
import Velocity from 'velocity-animate'

import { InfiniteScroll } from 'mint-ui';  //懒加载ui库
Vue.use(InfiniteScroll);

let {keyword,id} = qs.parse(location.search.substr(1))

new Vue({
    el:'#app-search',
    data:{
        searchList:[],
        isShow:false,
        keyword,
        allLoaded:false,
        loading:false,
        loadingPage:0
    },  

    created(){
       this.getSearchList()
    },
    methods:{
        getSearchList(){            
            axios.post(url.search,{keyword,id})
                .then(res =>{
                    let curSearchList = res.data.lists
                    this.searchList = this.searchList.concat(curSearchList)
                })
                .catch(error =>{
                    console.log(error)
                })
                
        },
        getMoreSearchList(){
            if(this.allLoaded) return  //所有数据加载完毕则不再运行
            if(this.loadingPage > 3) {
                this.allLoaded = true
                this.loading = true
                console.log('this.allLoaded',this.allLoaded)
                return
            }
            this.loading = true
            
            axios.post(url.search,{keyword,id})
                .then(res =>{
                    let curSearchList = res.data.lists
                    this.searchList = this.searchList.concat(curSearchList)
                    this.loadingPage ++
                    console.log('this.loadingPage' ,this.loadingPage)
                    this.loading = false
                    console.log('this.loading',this.loading)
                })
                .catch(error =>{
                    console.log(error)
                })
                this.loading = false
        },
        move(){
            if(document.documentElement.scrollTop > 100){
                this.isShow = true
            }else{
                this.isShow = false
            }  
        },
        toTop(){
            //document.documentElement.scrollTop = 0
            Velocity(document.body, "scroll", { duration: 1000 })
        }
    },
    mixins:[mixin]  
})