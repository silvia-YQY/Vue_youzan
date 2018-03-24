import 'css/common.css'
import './index.css'
import Vue from 'vue';
import axios from 'axios'
import url from 'js/api.js'

import { InfiniteScroll } from 'mint-ui';  //懒加载ui库
Vue.use(InfiniteScroll);

import Foot from 'components/Foot.vue'
import Swiper from "components/Swiper.vue"  //轮播

new Vue({
    el:'#app',
    data:{
        lists:null,
        pageNum:1,
        pageSize:6,
        loading:false,
        allLoaded:false,
        bannerLists:null
        
    },
    created(){
        this.getLists()
        this.getBanner()
    },
    methods:{
        getLists(){
            if(this.allLoaded) return  //所有数据加载完毕则不再运行
            if(this.pageNum > 5) return
            this.loading = true
            axios.post(url.hotLists,{
                pageNum:this.pageNum,
                pageSize:this.pageSize
            }).then(res => {
                let curLists = res.data.lists
                //判断所有数据是否已经加载完毕
                if(curLists.length < this.pageSize){
                    this.allLoaded = true
                }
                if (this.lists){
                    this.lists = this.lists.concat(curLists)
                }else{
                    this.lists = curLists //第一次请求数据
                }
                this.pageNum ++
                this.loading = false
            })
            
        },
        getBanner(){
            axios.get(url.banner)
                .then(res => {
                    this.bannerLists = res.data.lists
                    //console.log(this.bannerLists)
                })
        }
    },
    components:{ //注册组件
        Foot, //es6的简介写法
        Swiper  
    }
})
