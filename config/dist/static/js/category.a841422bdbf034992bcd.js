webpackJsonp([6],{"+BJJ":function(t,a){},"035s":function(t,a){},Hwmd:function(t,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=n("035s"),r=(n.n(e),n("igmb")),s=(n.n(r),n("7+uW")),i=n("mtWM"),c=n.n(i),o=n("TFhR"),d=n("U/rD");new s.default({el:"#app",data:{topLists:null,topIndex:0,subData:null,rankData:null},created:function(){this.getTopList(),this.getSubList(0,0)},methods:{getTopList:function(){var t=this;c.a.post(o.a.topList).then(function(a){t.topLists=a.data.lists}).catch(function(t){throw t})},getSubList:function(t,a){var n=this;this.topIndex=a,0===this.topIndex?this.getRank():c.a.post(o.a.subList,{id:t}).then(function(t){n.subData=t.data}).catch(function(t){throw t})},getRank:function(){var t=this;c.a.post(o.a.rank).then(function(a){t.rankData=a.data}).catch(function(t){throw t})},toSearch:function(t){location.href="search.html?keyword="+t.name+"&id="+t.id}},mixins:[d.a]})},TFhR:function(t,a,n){"use strict";var e={hotLists:"/GET/index/hotLists",banner:"/GET/index/banner",topList:"/GET/catagory/topList",subList:"/GET//catagory/subList",rank:"/GET//category/rank",search:"/GET//search/list",details:"/GET//goods/details",cart:"/GET//cart/add",dealList:"/GET//goods/dealList",cartList:"/GET//cart/list",cartAdd:"/POST//cart/cartAdd",cartReduce:"/GET//cart/cartReduce",cartRemove:"/GET//cart/cartRemove",cartMremove:"/GET//cart/cartMremove",addressLists:"/GET/address/list",addressAdd:"/GET/address/add",addressRemove:"/GET/address/remove",addressUpdate:"/GET/address/update",addressSetDefault:"/GET/address/setDefault"};for(var r in e)e.hasOwnProperty(r)&&(e[r]="http://rap2api.taobao.org/app/mock/7419"+e[r]);a.a=e},"U/rD":function(t,a,n){"use strict";var e={filters:{currency:function(t){var a=""+t;if(a.indexOf(".")>-1){var n=a.split(".");return n[0]+"."+(n[1]+"0").substr(0,2)}return t+".00"}},components:{Foot:n("nq5D").a}};a.a=e},igmb:function(t,a){},nq5D:function(t,a,n){"use strict";var e=n("mw3O"),r=n.n(e).a.parse(location.search.substr(1)).index,s=[{name:"有赞",icon:"icon-home",href:"index.html"},{name:"分类",icon:"icon-category",href:"category.html"},{name:"购物车",icon:"icon-cart",href:"cart.html"},{name:"我",icon:"icon-user",href:"member.html"}],i={data:function(){return{navConfig:s,curIndex:parseInt(r)||0}},methods:{changeHref:function(t,a){location.href=t.href+"?index="+a}}},c={render:function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"bottom-nav"},[n("ul",t._l(t.navConfig,function(a,e){return n("li",{class:{active:e==t.curIndex},on:{click:function(n){t.changeHref(a,e)}}},[n("a",[n("i",{class:a.icon}),t._v(" "),n("div",[t._v(t._s(a.name)+" ")])])])}))])},staticRenderFns:[]};var o=n("VU/8")(i,c,!1,function(t){n("+BJJ")},null,null);a.a=o.exports}},["Hwmd"]);
//# sourceMappingURL=category.a841422bdbf034992bcd.js.map