(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21e30b"],{d504:function(t,s,i){"use strict";i.r(s);var a=function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",[i("loading",{attrs:{active:t.isLoading},on:{"update:active":function(s){t.isLoading=s}}}),i("div",{staticClass:"jumbotron jumbotron-fluid d-flex align-items-center text-dark index-banner mb-0"},[i("div",{staticClass:"container"},[i("div",{staticClass:"bg-bright p-5"},[i("h2",{staticClass:"display-4"},[t._v("來場麵包饗宴吧！")]),i("p",{staticClass:"lead"},[t._v("早晨，就從美味又可口的麵包開始，保證讓你的一天活力滿滿。")]),i("button",{staticClass:"btn btn-primary",attrs:{type:"button"},on:{click:t.goProducts}},[t._v("立即選購")])])])]),t._m(0),i("div",{staticClass:"bg-light-gray p-5"},[i("div",{staticClass:"container"},[i("h3",{staticClass:"mb-4 pl-2 product-title"},[t._v("人氣商品")]),i("div",{staticClass:"mb-5"},[t.hotProducts.length?i("VueSlickCarousel",t._b({},"VueSlickCarousel",t.settings,!1),t._l(t.hotProducts,(function(s){return i("div",{key:s.id,staticClass:"p-3"},[i("div",{staticClass:"card text-center border-0 h-100 shadow-sm"},[i("router-link",{staticClass:"product",attrs:{to:"/product/"+s.id}},[i("img",{staticClass:"card-img-top py-3",attrs:{src:s.imageUrl[0],alt:"..."}}),i("div",{staticClass:"card-body"},[i("h5",{staticClass:"card-title font-weight-bold"},[t._v(t._s(s.title))]),i("p",{staticClass:"card-text font-weight-bold price"},[t._v("NT$ "+t._s(t._f("money")(s.price)))])])])],1)])})),0):t._e()],1),i("h3",{staticClass:"mb-4 pl-2 product-title"},[t._v("精選新品")]),i("div",{staticClass:"mb-4"},[t.newProducts.length?i("VueSlickCarousel",t._b({},"VueSlickCarousel",t.settings,!1),t._l(t.newProducts,(function(s){return i("div",{key:s.id,staticClass:"p-3"},[i("div",{staticClass:"card text-center border-0 h-100 shadow-sm"},[i("router-link",{staticClass:"product",attrs:{to:"/product/"+s.id}},[i("img",{staticClass:"card-img-top py-3",attrs:{src:s.imageUrl[0],alt:"..."}}),i("div",{staticClass:"card-body"},[i("h5",{staticClass:"card-title font-weight-bold"},[t._v(t._s(s.title))]),i("p",{staticClass:"card-text font-weight-bold price"},[t._v("NT$ "+t._s(t._f("money")(s.price)))])])])],1)])})),0):t._e()],1)])])],1)},e=[function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"container my-5"},[i("div",{staticClass:"row justify-content-center"},[i("div",{staticClass:"col-md-9"},[i("div",{staticClass:"card-group text-center"},[i("div",{staticClass:"card border-0 p-3 feature"},[i("div",{staticClass:"card-body feature-border"},[i("i",{staticClass:"fas fa-utensils fa-5x mb-3"}),i("h5",{staticClass:"card-title"},[t._v("嚴選的天然食材")]),i("p",{staticClass:"card-text"},[t._v("讓你吃得安心又健康")])])]),i("div",{staticClass:"card border-0 p-3 feature"},[i("div",{staticClass:"card-body feature-border"},[i("i",{staticClass:"fas fa-bread-slice fa-5x mb-3"}),i("h5",{staticClass:"card-title"},[t._v("多種的麵包選擇")]),i("p",{staticClass:"card-text"},[t._v("滿足顧客不同需求的味蕾")])])]),i("div",{staticClass:"card border-0 p-3 feature"},[i("div",{staticClass:"card-body feature-border"},[i("i",{staticClass:"fas fa-truck fa-5x mb-3"}),i("h5",{staticClass:"card-title"},[t._v("線上訂購新鮮送達")]),i("p",{staticClass:"card-text"},[t._v("每口都是幸福的滋味")])])])])])])])}],c=(i("99af"),i("4de4"),i("a7ab")),r=i.n(c),o=(i("7b8d"),i("6a2c"),{components:{VueSlickCarousel:r.a},data:function(){return{products:[],hotProducts:[],newProducts:[],quantity:0,settings:{dots:!1,infinite:!1,speed:500,slidesToShow:3,slidesToScroll:3,initialSlide:0,responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:3,infinite:!0}},{breakpoint:767,settings:{slidesToShow:2,slidesToScroll:2,initialSlide:2}},{breakpoint:623,settings:{slidesToShow:1,slidesToScroll:1}}]},isLoading:!1}},methods:{getProducts:function(){var t=this;this.isLoading=!0;var s="".concat("https://course-ec-api.hexschool.io/","api/").concat("4e04c0f4-4640-4a82-9572-23fa0dfcbfa2","/ec/products");this.$http.get(s).then((function(s){t.isLoading=!1,t.products=s.data.data,t.newProducts=JSON.parse(JSON.stringify(t.products)),t.newProducts=t.newProducts.filter((function(t,s){return s<6})),t.products=t.products.sort((function(t,s){return t.options.order-s.options.order})),t.hotProducts=t.products.filter((function(t){return t.options.isHot}))})).catch((function(){t.isLoading=!1}))},goProducts:function(){this.$router.push("/products")}},created:function(){this.getProducts()}}),d=o,l=i("2877"),n=Object(l["a"])(d,a,e,!1,null,null,null);s["default"]=n.exports}}]);
//# sourceMappingURL=chunk-2d21e30b.fc55cef1.js.map