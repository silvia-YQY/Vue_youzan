import  './cart_base.css'
import './cart_trade.css'
import './cart.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin.js'
import qs from 'qs'
import Volecity from 'velocity-animate'
import Cart from 'js/cartService.js'

new Vue({
    el:'.container',
    data:{
        list:null,
        total:0,
        editingShop:null,
        editingShopIndex:-1,
        removePopup:false,
        removeData:null,
        removeMsg :''
    },
    computed:{
        allSelected:{
            get(){  //若所有商品店铺都选中，则全选激活checked的class
                if(this.list && this.list.length){
                    return this.list.every( shop =>{ //遍历店铺，是否都选中了
                        return shop.checked
                    } )
                }
                return false
            },
            set(newVal){   
                this.list.forEach( shop => {
                    shop.checked = newVal
                    shop.goodsList.forEach( good => {
                        good.checked = newVal
                    })
                })
            }
        },
        allRemoveSelected:{
            get(){
                if(this.editingShop){ //判断店铺是否均被选中编辑
                    return this.editingShop.removeChecked
                }
                return false
            },
            set(newVal){
                if(this.editingShop){
                    this.editingShop.removeChecked = newVal
                    this.editingShop.goodsList.forEach(good =>{
                        good.removeChecked = newVal
                    } )
                }
            }
        },
        selectLists(){  //选中商品后，放入arr中，然后计算价格
            if(this.list && this.list.length){
                let arr = []
                let total = 0
                this.list.forEach( shop => {
                    shop.goodsList.forEach( good =>{
                        if(good.checked){
                            arr.push(good)
                            total += good.price * good.number
                        }
                    })
                })
                this.total = total
                return arr
            }   
            return []
        },
        removeLists(){
            if(this.editingShop){  //需要删除的商品列表存在的话，存放在数组中
                let arr = []
                this.editingShop.goodsList.forEach( good => {
                    if(good.removeChecked){
                       arr.push(good)
                    }
                })
                return arr
            }
            return []
        }     

    },
    created(){
        this.getCartList()
    },
    methods:{
        getCartList(){
            axios.post(url.cartList)
                .then(res =>{ //先处理好数据再赋值给data，否则不是响应式
                    let lists = res.data.cartList
                    lists.forEach(shop => {
                        shop.checked = true //是否选中
                        shop.removeChecked = false //是否选中删除
                        shop.editing = false  //是否编辑
                        shop.editingMsg = "编辑"
                        shop.goodsList.forEach( good => {
                            good.checked = true
                            good.removeChecked = false
                        })
                    });
                    this.list = lists
                })
        },
        selectGood(shop,good){  //商品选择，商品全选，该店铺全选
            //普通状态下，和编辑状态下
            let attr = this.editingShop? "removeChecked" : "checked"
            good[attr] = !good[attr]
            shop[attr] = shop.goodsList.every(good =>{
                return good[attr]
            })
        },
        selectShop(shop){  //店铺选择，全选
            let attr = this.editingShop? "removeChecked" : "checked"
            shop[attr] = !shop[attr]
            shop.goodsList.forEach( good => {
                good[attr] = shop[attr]
            })
        },
        selectAll(){
            let attr = this.editingShop? "allRemoveSelected" : "allSelected"
            this[attr] = !this[attr]
        },
        edit(shop,shopIndex) {
            shop.editing = !shop.editing
            shop.editingMsg = shop.editing? "完成" :"编辑" 
            this.list.forEach( (item,i) => {
                if(shopIndex !== i ){
                    item.editing = false
                    item.editingMsg = shop.editing ? "" :"编辑" 
                }
            })
            this.editingShop = shop.editing? shop:null
            this.editingShopIndex = shop.editing? shopIndex : -1
        },
        reduce(good){
            if(good.number ===1 ) return
            // axios.post(url.cartReduce,{
            //     id:good.id,
            //     number:good.number
            // }).then( res=> {
            //     good.number--
            // })

            Cart.reduce(good.id).then(res => {
                good.number--
            })
        },
        add(good){
            // axios.post(url.cartAdd,{
            //     id:good.id,
            //     number:good.number
            // }).then(res =>{
            //     good.number++
            // })

            Cart.add(good.id).then( res => {
                good.number++
            })
        },

        remove(shop,shopIndex,good,goodIndex){
            this.removePopup = true
            this.removeData = {shop,shopIndex,good,goodIndex}
            this.removeMsg = '确定要删除该商品吗？'
        },
        removeList(){
            this.removePopup = true
            this.removeMsg = `确定将所选${this.removeList.length} 个商品删除？ `
        },
        removeConfirm(){  //删除商品，先发送请求删除数据库数据，再在页面删除信息
            if(this.removeMsg === '确定要删除该商品吗？'){
                let {shop,shopIndex,good,goodIndex} = this.removeData
                axios.post(url.cartRemove,{
                    id:good.id,
                }).then(res => {
                    shop.goodsList.splice(goodIndex,1)
                    if(!shop.goodsList.length){ //当所同一店铺下，商品都删除了，就需要删除店铺
                        this.list.splice(shopIndex,1)
                        this.removeShop()  //删除店铺的编辑状态
                    }
                    this.removePopup = false
                })
            }else{
                let ids = []
                this.removeLists.forEach(good => {
                    ids.push(good.id)
                })
                axios.post(url.cartMremove,{ids})
                    .then( res =>{
                    let arr = [] //用来接收存留商品列表
                    this.editingShop.goodsList.forEach(good => {
                          //用index接收判断是否需要删除商品
                          let index = this.removeLists.findIndex(item => {
                              return item.id == good.id
                          })
                          if(index === -1){ //若index不存在，则判断为不需要删除
                              arr.push(good)    //存留商品保存在arr里
                          }
                        })  
                    if(arr.length){ //若arr还存在，
                        this.editingShop.goodsList = arr //则把存留商品再赋值给goodslist
                    }else{ //若不存在，则删除商店
                        this.list.splice(this.editingShopIndex,1)
                        this.removeShop()
                    }
                    this.removePopup = false
                    })
            }
        },
        removeShop(){  
            this.editingShop = null //删除列表中该店铺
            this.editingShopIndex = -1 
            this.list.forEach(shop => { //恢复其他店铺的编辑状态
                shop.editing = false
                shop.editingMsg = "编辑"
            })
        },
        cancelConfirm(){
            this.removePopup = false
        },
        //向左滑动出现删除框
        start(e,good){
            good.startX = e.changedTouches[0].clientX
        },
        end(e,shopIndex,good,goodIndex){
            let endX =  e.changedTouches[0].clientX
            let left = '0'
            if(good.startX - endX > 100){
                left = '-60px'
            }

            if(endX - good.startX > 100){
                left = '0px'
            }
            Volecity(this.$refs[`goods-${shopIndex}-${goodIndex}`],{left})
        }
    },
    mixins:[mixin]
})