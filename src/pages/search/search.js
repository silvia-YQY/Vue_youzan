import 'css/common.css'
import './search.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import qs from 'qs'

import mixin from 'js/mixin.js'
import { InfiniteScroll } from 'mint-ui';  //懒加载ui库
Vue.use(InfiniteScroll);

let {keyword,id} = qs.parse(location.search.substr(1))

new Vue({
    el:'.container',
    data:{
        searchList:null,
        keyword,
        isShow:false,
        allLoaded:false,
        loading:false,
        loadingPage:0
    },  

    created(){
        this.getSearchList()
    },
    methods:{
        getSearchList(){
            if(this.allLoaded) return  //所有数据加载完毕则不再运行
            if(this.loadingPage > 5) {
                this.allLoaded = true
                return
            }
            this.loading = true
            axios.get(url.search,{keyword,id})
                .then(res =>{
                    let curSearchList = res.data.lists
                    if (this.searchList){
                        this.searchList = this.searchList.concat(curSearchList)
                    }else{
                        this.searchList = curSearchList //第一次请求数据
                    }
                    //console.log(this.searchList)
                    
                    this.loadingPage ++
                    this.loading = false
                    console.log(this.loadingPage)
                })
        },
        move(){
            if(document.body.scrollTop > 100){
                console.log(document.body.scrollTop)
                this.isShow = true
            }else{
                this.isShow = false
            }  
        },
        toTop(){
            document.querySelector('.container')
				.animate({ 
					scrollTop: 0
				}, 1000);
        }
    },
    mixins:[mixin]  
})