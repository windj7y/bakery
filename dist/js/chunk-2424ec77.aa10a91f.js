(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2424ec77"],{"3bb4":function(t,a,e){"use strict";var n=e("4c1a"),s=e.n(n);s.a},"4c1a":function(t,a,e){},e313:function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("nav",{staticClass:"navbar navbar-expand-lg navbar-dark bg-dark-gray mb-5"},[e("div",{staticClass:"container"},[e("router-link",{staticClass:"navbar-brand",attrs:{to:"/admin/products"}},[t._v("Bakery - 後台管理")]),t._m(0),e("div",{staticClass:"collapse navbar-collapse",attrs:{id:"navbarText"}},[e("ul",{staticClass:"navbar-nav ml-auto"},[e("li",{staticClass:"nav-item"},[e("router-link",{attrs:{to:"/admin/products"}},[t._v("產品列表")])],1),e("li",{staticClass:"nav-item"},[e("router-link",{attrs:{to:"/admin/coupons"}},[t._v("優惠券列表")])],1),e("li",{staticClass:"nav-item"},[e("router-link",{attrs:{to:"/admin/orders"}},[t._v("訂單列表")])],1),e("li",{staticClass:"nav-item"},[e("router-link",{attrs:{to:"/admin/storages"}},[t._v("圖片儲存列表")])],1),e("li",{staticClass:"nav-item"},[e("a",{attrs:{href:"#"},on:{click:function(a){return a.preventDefault(),t.logout(a)}}},[t._v("登出")])])])])],1)]),t.checkSuccess?e("router-view",{attrs:{token:t.token}}):t._e()],1)},s=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("button",{staticClass:"navbar-toggler",attrs:{type:"button","data-toggle":"collapse","data-target":"#navbarText","aria-controls":"navbarText","aria-expanded":"false","aria-label":"Toggle navigation"}},[e("span",{staticClass:"navbar-toggler-icon"})])}],o=(e("ac1f"),e("5319"),{data:function(){return{token:"",checkSuccess:!1}},methods:{checkLogin:function(){var t=this;this.token=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1"),this.$http.defaults.headers.common.Authorization="Bearer ".concat(this.token);var a="".concat("https://course-ec-api.hexschool.io/","api/auth/check");this.$http.post(a,{api_token:this.token}).then((function(a){t.checkSuccess=a.data.success})).catch((function(){t.$toastr.e("驗證失敗，請重新登入"),t.$router.push("/login")}))},logout:function(){document.cookie="hexToken=; expires=",this.$router.push("/login")}},created:function(){this.checkLogin()}}),c=o,r=(e("3bb4"),e("2877")),i=Object(r["a"])(c,n,s,!1,null,null,null);a["default"]=i.exports}}]);
//# sourceMappingURL=chunk-2424ec77.aa10a91f.js.map