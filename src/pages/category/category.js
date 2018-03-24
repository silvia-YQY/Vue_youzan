import 'css/common.css'
import './category.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

// import Foot from 'components/Foot.vue'
import mixin from 'js/mixin.js'

new Vue({
    el:'#app',
    data:{
        topLists :null,
        topIndex:0,
        subData:null,
        rankData:null   //综合排行
    },
    created(){
        this.getTopList()
        this.getSubList(0,0)
    },
    methods:{
        getTopList(){
            axios.post(url.topList)
                .then(res =>{
                    this.topLists  = res.data.lists
                }).catch(res => {
                    throw(res)
                })
        },
        getSubList(id,index){
            this.topIndex = index
            if(this.topIndex === 0 ){
                this.getRank()
            }else{
                axios.post(url.subList,{id})
                    .then(res =>{
                        this.subData = res.data
                        //console.log(this.subData.brandList)
                    }).catch(res => {
                        throw(res)
                    })
            }
        },
        getRank(){
            axios.post(url.rank)
                .then(res =>{
                    this.rankData  = res.data                   
                }).catch(res => {
                    throw(res)
                })
        },
        toSearch(list){
            location.href = `search.html?keyword=${list.name}&id=${list.id}`
        }
    },
    mixins:[mixin]  
    // components:{
    //     Foot
    // },
    // filters:{
    //     number(price){
    //         let priceStr = ''+ price
    //         if(priceStr.indexOf('.') >- 1){
    //             let arr = priceStr.split('.')
    //             return arr[0] + '.' + ( arr[1] + '0' ).substr(0,2)
    //         }else{
    //             return price + '.00' 
    //         }
            
    //     }
    // }
})

