import  './cart_base.css'
import './cart_trade.css'
import './cart.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin.js'
import qs from 'qs'

new Vue({
    el:'.container',
    data:{
        list:null,
    },
    computed:{
        
    },
    created(){
        this.getCartList()
    },
    methods:{
        getCartList(){
            axios.post(url.cartList)
                .then(res =>{
                    this.list = res.data.cartList
                })
        }

    },
    mixins:[mixin]
})