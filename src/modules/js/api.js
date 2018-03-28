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
    cartReduce:"/GET//cart/cartReduce",
    cartRemove:"/GET//cart/cartRemove",
    cartMremove:"/GET//cart/cartMremove"
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