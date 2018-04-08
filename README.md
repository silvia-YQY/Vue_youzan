# Vue2.0后的实例挂载点，不能是body和HTML

+ 单Vue组件里面，template是必须的,且只能有一个根节点。

+ 购物车
1. Volecity动画
2. API
 - findIndex
 -  e.changedTouches[0].clientX
3. qs库
    - 获取hash：利用hash数值记录转跳页面

+ 我[页面]
1. 路由（router）
  - vue-router配置
  - 子路由：children
2. 页面转跳
  - 编程式导航：使用点击绑定事件
  - 使用router-link to 

# 数据管理（父子间通讯）
 1. 引用类型数据
  *（不建议子组件直接修改父组件数据）*
  - 父组件拥有一个引用类型的数据，然后传递给子组件，子组件修改数据后，会同步修改父组件的数据
    - 因为引用类型是指向存储地址

  *例子*

  ```
  //父组件
  data:{
    obj:{
      age:20
    }
  }
  ```
  ```
  //子组件(<foot>)注入时传入obj
  <foot :obj="obj" ></foot>
  ```
  ```
    //子组件接收
    export default{
      props:['obj'],
      data(){
        ob:this.obj  
        //因在子组件内部不能直接修改父组件传递进来的数据，故另开一个参数接收
        ......
      },
      created(){ 
        //0.5秒后修改数据，父组件的age也会被修改
        setTimeout(()=>{
          this.ob.age = 18
        },500 )
      }
    }

  ```

2. 自定义事件
  - 通过子组件改变了数据后，手动的往外告诉父组件数据的更改情况

  ```
   //子组件(<foot>)注入时监听事件（change），并触发changeAge方法
    <foot :obj="obj" @change='changeAge()' ></foot>
  ```

  ```
  //父组件内部添加事件
      methods:{
        //change事件触发后启动
        changeAge(age){
          this.obj.age = age
        }
      }
  ```

  ```
    //子组件接收时，深复制数据
    export default{
      props:['obj'],
      data(){
        ob:JSON.parse(JSON.stringify(this.obj))  
        //使用深复制，能避免直接修改父组件数据
        ......
      },
      created(){ 
        //0.5秒后修改数据
        setTimeout(()=>{
          this.ob.age = 180

          //触发自定义事件（change），告诉父组件改变了数据，为18
          this.$emit('change',18)
        },500 )
      },
    }
  ```

3. 全局事件（bus）
  - 定义一个全局的VUE（bus）

  ```
    //新建一个bus.js

    import Vue from 'vue'

    const bus = new Vue()

    export defalut bus
  ```

  ```
  // 子组件引入bus

  import bus from 'bus.js'
  export default{
      props:['obj'],
      data(){
        ob:JSON.parse(JSON.stringify(this.obj)) 
        ......
      },
      created(){ 
        setTimeout(()=>{
          this.ob.age = 18

          //通过全局bus触发change事件
          bus.$emit('change',18)

        },500 )
      },
    }

  ```
  ```
  //子组件(<foot>)注入时只需传入obj
  <foot :obj="obj" ></foot>
  ```

  ```
  //父组件内部不需要添加事件
  // 父组件引入bus

  import bus from 'bus.js'
  //在父组件中，在生命周期开端利用bus监听change事件
  created(){
    bus.$on('change',(age)=>{
        this.obj.age = age
    } )
  }


  ```
  

# Vuex 状态管理

**Store**

### 使用步骤

1. 安装vuex
2. 创建实例
3. 注入到父组件

基本store架构

```
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
        }
    },
    //异步事件
    actions:{
        getLists({commit} ){
            Address.list().then(res => {
                commit('init',res.data.lists)   //触发mutations中的init事件
            })
        }
    }
})
```
**注意**
  1. 若需要修改数据，需要在actions里面进行事件操作执行mutations，进而修改state里面的数据
    > 我的理解就是，若mutations改变，则state的数据同步变化，且state仅能通过mutations改变。但是mutations只能通过actions来进行异步操作才能改变
  2. 子组件需要用dispatch触发actions的事件
      `this.$store.dispatch("getLists")`
  3. 子组件中获取state
  ```
    computed:{ //利用计算属性获取store里面的state.lists
    lists(){
      return this.$store.state.lists
    }
  },
  ```



  [具体看文档](https://vuex.vuejs.org/zh-cn/actions.html)


# vue-youzan

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
