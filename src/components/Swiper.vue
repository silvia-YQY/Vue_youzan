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
.swiper-pagination{
    text-align: center  !important;
}
.swiper-slide img{
    width:100%;
    height:100%;
}
.swiper-container {
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  z-index: 1
}

.swiper-wrapper {
  position: relative;
  width: 100%;
  -webkit-transition-property: -webkit-transform, left, top;
  -webkit-transition-duration: 0s;
  -webkit-transform: translateZ(0);
  -webkit-transition-timing-function: ease;
  -moz-transition-property: -moz-transform, left, top;
  -moz-transition-duration: 0s;
  -moz-transform: translateZ(0);
  -moz-transition-timing-function: ease;
  -o-transition-property: -o-transform, left, top;
  -o-transition-duration: 0s;
  -o-transform: translateZ(0);
  -o-transition-timing-function: ease;
  -o-transform: translate(0);
  -ms-transition-property: -ms-transform, left, top;
  -ms-transition-duration: 0s;
  -ms-transform: translateZ(0);
  -ms-transition-timing-function: ease;
  transition-property: left, top, -webkit-transform;
  transition-property: transform, left, top;
  transition-property: transform, left, top, -webkit-transform;
  transition-duration: 0s;
  transform: translateZ(0);
  transition-timing-function: ease
}

.swiper-free-mode>.swiper-wrapper {
  transition-timing-function: ease-out;
  margin: 0 auto
}

.swiper-slide {
  float: left
}

.swiper-wp8-horizontal {
  -ms-touch-action: pan-y
}

.swiper-wp8-vertical {
  -ms-touch-action: pan-x
}

.swiper-pagination {
  margin: 0;
  text-align: right;
  position: absolute;
  bottom: 5px;
  width: 100%;
  z-index: 1
}

.swp-thumbnail-list {
  margin-right: 6px
}

.swiper-pagination-switch {
  display: inline-block;
  margin: 7px 4px 0;
  width: 5px;
  height: 5px;
  background: url(/v2/image/pagination.png) no-repeat scroll -1px -1px;
  cursor: pointer
}

@media only screen and (-webkit-min-device-pixel-ratio:1.5),
only screen and (min--moz-device-pixel-ratio:1.5),
only screen and (min-device-pixel-ratio:1.5) {
  .swiper-pagination-switch {
    background-image: url(/v2/image/pagination@2x.png);
    background-position: 0 0;
    background-size: 5px 10px
  }
}

.swiper-active-switch {
  background-position: -1px -8px
}

@media only screen and (-webkit-min-device-pixel-ratio:1.5),
only screen and (min--moz-device-pixel-ratio:1.5),
only screen and (min-device-pixel-ratio:1.5) {
  .swiper-active-switch {
    background-image: url(/v2/image/pagination@2x.png);
    background-position: 0 -5px;
    background-size: 5px 10px
  }
}
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


