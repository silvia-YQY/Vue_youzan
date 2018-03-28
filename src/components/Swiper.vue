<template>
  <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swp-page swiper-slide"  v-for="list in lists">
                <a class="js-no-follow" v-bind:href="list.clickUrl">
                    <img class="goods-main-photo fadeIn" :src="list.image">
                </a>
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>

<style>

</style>

<script>
import Swiper from "swiper"
import "swiper/dist/css/swiper.css"

    export default {
        name:"swiper",
        //props:["lists","name"]
        props:{
            lists:{
                // type: Array,
                required: true
            },
            name:{}
        },
        created(){
           // console.log('created:',document.querySelectorAll(".swiper-slide"))
        },
        mounted(){
           new Swiper('.swiper-container',{
                loop: true,
                pagination: {
                    el: '.swiper-pagination',
                },
                autoplay: {
                    delay: 5000,
                },
           })
        },
        // watch:{
        //     //表示下次数据更新完成，同时dom已确定，则运行
        //     lists(val,oldVal){
        //         console.log(val,oldVal)
        //         console.log("before next Tick",document.querySelectorAll(".swiper-slide"))
        //         this.$nextTick(() => {
        //             console.log("after",document.querySelectorAll(".swiper-slide"))
        //         }) 
        //     }
        // }
    }   
</script>


