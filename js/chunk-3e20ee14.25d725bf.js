(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3e20ee14"],{"14e4":function(t,e,r){},3120:function(t,e,r){"use strict";r("14e4")},"55b8":function(t,e,r){},"706a":function(t,e,r){},ac30:function(t,e,r){"use strict";r("55b8")},ad68:function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container py-5"},[t.isLoading?r("Spinner"):[r("h1",[t._v("餐廳描述頁")]),r("RestaurantDetail",{key:t.restaurant.id,attrs:{"initial-restaurant":t.restaurant}}),r("hr"),r("RestaurantComments",{attrs:{"restaurant-comments":t.restaurantComments},on:{"after-delete-comment":t.afterDeleteComment}}),r("CreateComment",{attrs:{"restaurant-id":t.restaurant.id},on:{"after-create-comment":t.afterCreateComment}})]],2)},n=[],s=r("1da1"),i=r("5530"),o=(r("96cf"),r("b0c0"),r("a4d3"),r("e01a"),r("4de4"),r("d3b7"),r("d9e2"),function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"row"},[r("div",{staticClass:"col-md-12 mb-3"},[r("h1",[t._v(t._s(t.restaurant.name))]),r("p",{staticClass:"badge badge-secondary mt-1 mb-3"},[t._v(" "+t._s(t.restaurant.categoryName)+" ")])]),r("div",{staticClass:"col-lg-4"},[r("img",{staticClass:"img-responsive center-block",staticStyle:{width:"250px","margin-bottom":"25px"},attrs:{src:t.restaurant.image}}),r("div",{staticClass:"contact-info-wrap"},[r("ul",{staticClass:"list-unstyled"},[r("li",[r("strong",[t._v("Opening Hour:")]),t._v(" "+t._s(t.restaurant.openingHours)+" ")]),r("li",[r("strong",[t._v("Tel:")]),t._v(" "+t._s(t.restaurant.tel)+" ")]),r("li",[r("strong",[t._v("Address:")]),t._v(" "+t._s(t.restaurant.address)+" ")])])])]),r("div",{staticClass:"col-lg-8"},[r("p",[t._v(t._s(t.restaurant.description))]),r("router-link",{staticClass:"btn btn-primary btn-border mr-2",attrs:{to:{name:"restaurant-dashboard",params:{id:t.restaurant.id}}}},[t._v("Dashboard")]),t.restaurant.isFavorited?r("button",{staticClass:"btn btn-danger btn-border mr-2",attrs:{type:"button"},on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.deleteFavorite(t.restaurant.id)}}},[t._v(" 移除最愛 ")]):r("button",{staticClass:"btn btn-primary btn-border mr-2",attrs:{type:"button"},on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.addFavorite(t.restaurant.id)}}},[t._v(" 加到最愛 ")]),t.restaurant.isLiked?r("button",{staticClass:"btn btn-danger like mr-2",attrs:{type:"button"},on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.deleteLike(t.restaurant.id)}}},[t._v(" Unlike ")]):r("button",{staticClass:"btn btn-primary like mr-2",attrs:{type:"button"},on:{click:function(e){return e.stopPropagation(),e.preventDefault(),t.addLike(t.restaurant.id)}}},[t._v(" Like ")])],1)])}),c=[],u=r("4cce"),d=r("2fa3"),l={props:{initialRestaurant:{type:Object,required:!0}},data:function(){return{restaurant:this.initialRestaurant}},watch:{initialRestaurant:function(t){this.restaurant=Object(i["a"])(Object(i["a"])({},this.restaurant),t)}},methods:{addFavorite:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function r(){var a,n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,u["a"].addFavorite({restaurantId:t});case 3:if(a=r.sent,n=a.data,"success"===n.status){r.next=7;break}throw new Error(n.message);case 7:e.restaurant=Object(i["a"])(Object(i["a"])({},e.restaurant),{},{isFavorited:!0}),r.next=13;break;case 10:r.prev=10,r.t0=r["catch"](0),d["a"].fire({icon:"error",title:"無法將餐廳加入最愛，請稍候再試"});case 13:case"end":return r.stop()}}),r,null,[[0,10]])})))()},deleteFavorite:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function r(){var a,n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,u["a"].deleteFavorite({restaurantId:t});case 3:if(a=r.sent,n=a.data,"success"===n.status){r.next=7;break}throw new Error(n.message);case 7:e.restaurant=Object(i["a"])(Object(i["a"])({},e.restaurant),{},{isFavorited:!1}),r.next=13;break;case 10:r.prev=10,r.t0=r["catch"](0),d["a"].fire({icon:"error",title:"無法將餐廳移除最愛，請稍候再試"});case 13:case"end":return r.stop()}}),r,null,[[0,10]])})))()},addLike:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function r(){var a,n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,u["a"].addLike({restaurantId:t});case 3:if(a=r.sent,n=a.data,"success"===n.status){r.next=7;break}throw new Error(n.message);case 7:e.restaurant=Object(i["a"])(Object(i["a"])({},e.restaurant),{},{isLiked:!0}),r.next=13;break;case 10:r.prev=10,r.t0=r["catch"](0),d["a"].fire({icon:"error",title:"無法將餐廳加入Like，請稍候再試"});case 13:case"end":return r.stop()}}),r,null,[[0,10]])})))()},deleteLike:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function r(){var a,n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,u["a"].deleteLike({restaurantId:t});case 3:if(a=r.sent,n=a.data,"success"===n.status){r.next=7;break}throw new Error(n.message);case 7:e.restaurant=Object(i["a"])(Object(i["a"])({},e.restaurant),{},{isLiked:!1}),r.next=13;break;case 10:r.prev=10,r.t0=r["catch"](0),d["a"].fire({icon:"error",title:"無法將餐廳移除Like，請稍候再試"});case 13:case"end":return r.stop()}}),r,null,[[0,10]])})))()}}},m=l,p=(r("ac30"),r("2877")),b=Object(p["a"])(m,o,c,!1,null,"444d5924",null),f=b.exports,v=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("h2",{staticClass:"my-4"},[t._v("所有評論：")]),t._l(t.restaurantComments,(function(e){return r("div",{key:e.id},[r("blockquote",{staticClass:"blockquote mb-0"},[t.currentUser.isAdmin?r("button",{staticClass:"btn btn-danger float-right",attrs:{type:"button"},on:{click:function(r){return r.stopPropagation(),r.preventDefault(),t.handleDeleteButtonClick(e.id)}}},[t._v(" Delete ")]):t._e(),r("h3",[r("router-link",{attrs:{to:{name:"user",params:{id:e.User.id}}}},[t._v(" "+t._s(e.User.name)+" ")])],1),r("p",[t._v(t._s(e.text))]),r("footer",{staticClass:"blockquote-footer"},[t._v(" "+t._s(t._f("fromNow")(e.createdAt))+" ")])]),r("hr")])}))],2)},g=[],h=r("c4c3"),k=r("2708"),x=r("2f62"),w={mixins:[k["b"]],props:{restaurantComments:{type:Array,required:!0}},computed:Object(i["a"])({},Object(x["b"])(["currentUser"])),methods:{handleDeleteButtonClick:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function r(){var a,n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,h["a"].deleteComments({commentId:t});case 3:if(a=r.sent,n=a.data,"error"!==n.status){r.next=7;break}throw new Error(n.message);case 7:e.$emit("after-delete-comment",t),d["a"].fire({icon:"success",title:"移除評論成功"}),r.next=14;break;case 11:r.prev=11,r.t0=r["catch"](0),console.error(r.t0.message);case 14:case"end":return r.stop()}}),r,null,[[0,11]])})))()}}},C=w,_=(r("3120"),Object(p["a"])(C,v,g,!1,null,"4cc4c924",null)),y=_.exports,R=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("form",{on:{submit:function(e){return e.stopPropagation(),e.preventDefault(),t.handleSubmit.apply(null,arguments)}}},[r("div",{staticClass:"form-group mb-4"},[r("label",{attrs:{for:"text"}},[t._v("留下評論：")]),r("textarea",{directives:[{name:"model",rawName:"v-model",value:t.text,expression:"text"}],staticClass:"form-control",attrs:{rows:"3",name:"text"},domProps:{value:t.text},on:{input:function(e){e.target.composing||(t.text=e.target.value)}}})]),r("div",{staticClass:"d-flex align-items-center justify-content-between"},[r("button",{staticClass:"btn btn-link",attrs:{type:"button"},on:{click:function(e){return t.$router.back()}}},[t._v(" 回上一頁 ")]),r("button",{staticClass:"btn btn-primary mr-0",attrs:{type:"submit"}},[t._v("Submit")])])])},O=[],j=(r("a9e3"),{props:{restaurantId:{type:Number,required:!0}},data:function(){return{text:"",isProcessing:!1}},methods:{handleSubmit:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(e.prev=0,t.text){e.next=4;break}return d["a"].fire({icon:"warning",title:"您尚未填寫任何評論"}),e.abrupt("return");case 4:return t.isProcessing=!0,e.next=7,h["a"].createComments({restaurantId:t.restaurantId,text:t.text});case 7:if(r=e.sent,a=r.data,"error"!==a.status){e.next=11;break}throw new Error(a.message);case 11:t.$emit("after-create-comment",{commentId:a.commentId,restaurantId:t.restaurantId,text:t.text}),t.isProcessing=!1,t.text="",d["a"].fire({icon:"success",title:"新增評論成功"}),e.next=22;break;case 17:e.prev=17,e.t0=e["catch"](0),console.error(e.t0.message),t.isProcessing=!1,d["a"].fire({icon:"error",title:"無法新增評論，請稍後再試"});case 22:case"end":return e.stop()}}),e,null,[[0,17]])})))()}}}),L=j,I=(r("b605"),Object(p["a"])(L,R,O,!1,null,"3c94dc82",null)),D=I.exports,F=r("2375"),S={name:"Restaurant",components:{RestaurantDetail:f,RestaurantComments:y,CreateComment:D,Spinner:F["a"]},data:function(){return{restaurant:{id:-1,name:"",categoryName:"",image:"",openingHours:"",tel:"",address:"",description:"",isFavorited:!1,isLiked:!1},isLoading:!0,restaurantComments:[]}},computed:Object(i["a"])({},Object(x["b"])(["currentUser"])),beforeRouteUpdate:function(t,e,r){var a=t.params.id;this.fetchRestaurant(a),r()},created:function(){var t=this.$route.params.id;this.fetchRestaurant(t)},methods:{fetchRestaurant:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function r(){var a,n,s,i,o,c,u,l,m,p,b,f,v,g;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,e.isLoading=!0,r.next=4,h["a"].getRestaurant({restaurantId:t});case 4:a=r.sent,n=a.data,s=n.restaurant,i=n.isFavorited,o=n.isLiked,c=s.id,u=s.name,l=s.Category,m=s.image,p=s.opening_hours,b=s.tel,f=s.address,v=s.description,g=s.Comments,console.log("fetchrestaurant id",t),e.restaurant={id:c,name:u,categoryName:l?l.name:"未分類",image:m,openingHours:p,tel:b,address:f,description:v,isFavorited:i,isLiked:o},e.restaurantComments=g,e.isLoading=!1,r.next=17;break;case 13:r.prev=13,r.t0=r["catch"](0),e.isLoading=!1,d["a"].fire({icon:"error",title:"無法載入餐廳，請稍後再試"});case 17:case"end":return r.stop()}}),r,null,[[0,13]])})))()},afterDeleteComment:function(t){this.restaurantComments=this.restaurantComments.filter((function(e){return e.id!==t}))},afterCreateComment:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function r(){var a,n,s,i,o;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,h["a"].createComments();case 3:if(a=r.sent,n=a.data,"success"===n.status){r.next=7;break}throw new Error(n.message);case 7:s=t.commentId,i=t.restaurantId,o=t.text,e.restaurantComments.push({id:s,RestaurantId:i,User:{id:e.currentUser.id,name:e.currentUser.name},text:o,createdAt:new Date}),r.next=14;break;case 11:r.prev=11,r.t0=r["catch"](0),d["a"].fire({icon:"error",title:"無法新增餐廳評論，請稍後再試"});case 14:case"end":return r.stop()}}),r,null,[[0,11]])})))()}}},E=S,P=Object(p["a"])(E,a,n,!1,null,null,null);e["default"]=P.exports},b605:function(t,e,r){"use strict";r("706a")},e01a:function(t,e,r){"use strict";var a=r("23e7"),n=r("83ab"),s=r("da84"),i=r("e330"),o=r("1a2d"),c=r("1626"),u=r("3a9b"),d=r("577e"),l=r("9bf2").f,m=r("e893"),p=s.Symbol,b=p&&p.prototype;if(n&&c(p)&&(!("description"in b)||void 0!==p().description)){var f={},v=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:d(arguments[0]),e=u(b,this)?new p(t):void 0===t?p():p(t);return""===t&&(f[e]=!0),e};m(v,p),v.prototype=b,b.constructor=v;var g="Symbol(test)"==String(p("test")),h=i(b.toString),k=i(b.valueOf),x=/^Symbol\((.*)\)[^)]+$/,w=i("".replace),C=i("".slice);l(b,"description",{configurable:!0,get:function(){var t=k(this),e=h(t);if(o(f,t))return"";var r=g?C(e,7,-1):w(e,x,"$1");return""===r?void 0:r}}),a({global:!0,forced:!0},{Symbol:v})}}}]);
//# sourceMappingURL=chunk-3e20ee14.25d725bf.js.map