let url ={
    hotLists:'/GET/index/hotLists',
    banner:"/GET/index/banner",
    topList:'/GET/catagory/topList',   //一级分类
    subList:"/GET//catagory/subList",  //二级分类
    rank:"/GET//category/rank"  ,       //综合分类
    search:"/GET//search/list"  ,//查询页面
    details:"/GET//goods/details",  //商品详情
    cart:"/GET//cart/add" ,//加入购物车
    dealList:"/GET//goods/dealList",
    cartList:"/GET//cart/list",
    cartAdd:"/POST//cart/cartAdd",
    cartReduce:"/GET//cart/cartReduce",             //减少商品数量
    cartRemove:"/GET//cart/cartRemove",      //普通删除
    cartMremove:"/GET//cart/cartMremove" , //删除多个
    addressLists:"/GET/address/list",
    addressAdd:"/GET/address/add",
    addressRemove:"/GET/address/remove",
    addressUpdate:"/GET/address/update",
    addressSetDefault:"/GET/address/setDefault"
} 

//开发环境和真实环境的切换
//由于开发环境使用自定义的api（自己mock的数据），但是真实的环境，用后端人员提供的api


let host = 'http://rap2api.taobao.org/app/mock/7419'

//拼接
for (let key in url) {
    if (url.hasOwnProperty(key)) {
        url[key] = host + url[key]
        
    }
}


export default url