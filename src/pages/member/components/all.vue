<template>
  <div class="container " style="min-height: 597px;">
    <div  class="block-list address-list section section-first js-no-webview-block">
      <a class="block-item js-address-item address-item " 
        :key="list.id"
        @click="toEdit(list)" 
        v-for='list in lists'
        :class='{"address-item-default":list.isDefault}'
      >
        <div class="address-title">{{list.name}} {{list.tel}} </div>
        <p>{{list.ProviceName}} {{list.cityName}} {{list.districtName}} {{list.address}} </p>
      </a>

    </div>
    <div v-if='lists&&!lists.length'>
      没有地址，请添加
    </div>
    <div class="block stick-bottom-row center">
      <router-link class="btn btn-blue js-no-webview-block js-add-address-btn" 
          :to="{name:'form',query:{type:'add'}}">
            新增地址
        </router-link>
    </div>
  </div>
</template>


<script>
//import Address from 'js/addressService.js'
export default {
  // data(){
  //   return{
  //     lists:null,
  //   }
  // },
  computed:{ //利用计算属性获取store里面的state.lists
    lists(){
      return this.$store.state.lists
    }
  },
  created(){
    if(!this.lists){
      //通过dispatch执行store中actions里面的事件
      this.$store.dispatch("getLists")
    }

    // Address.list().then(res => {
    //   this.lists = res.data.lists
    // })
  },
  methods:{
      //使用脚本的方式转跳  编程式导航
      //也可以用router-link：to的方式进行导航
      toEdit(list){
          this.$router.push({
              // path:'/address/form' (exp 1)
              name:'form',   //(exp 2)
              query:{
                type:'edit',
                instance:list
              }
          })
      }
  }
}
</script>

