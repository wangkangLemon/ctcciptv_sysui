webpackJsonp([23],{257:function(e,t,r){"use strict";(function(e){function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var n=r(6),i=r(0),o=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),c=i.a.apiHost+"/user",s=function(){function t(){a(this,t)}return o(t,[{key:"getOrderlists",value:function(t){var r=c+"/order/lists";return n.b(r,t).then(function(t){return 0==t.code?t:e.reject(t)})}},{key:"getOrder",value:function(e){var t=c+"/"+e+"/";return n.b(t).then(function(e){return e.data})}},{key:"deleteOrder",value:function(t){var r=c+"/order/delete/"+t;return n.a(r,{}).then(function(t){return 0==t.code?(xmview.showTip("success",t.message),t.data):(xmview.showTip("error",t.message),e.reject(t))})}},{key:"getProduct",value:function(e){var t=c+"/product/get/"+e;return n.b(t).then(function(e){return e.data})}},{key:"fetchProductList",value:function(t){var r=c+"/product/lists";return n.b(r,t).then(function(t){return 0==t.code?t:e.reject(t)})}},{key:"getRedPacketList",value:function(t){var r=c+"/bonus/lists";return n.b(r,t).then(function(t){return 0==t.code?t:e.reject(t)})}},{key:"createProduct",value:function(t){var r=c+"/product/create";return n.a(r,t).then(function(t){return 0==t.code?(xmview.showTip("success",t.message),t.data):(xmview.showTip("error",t.message),e.reject(t))})}},{key:"editProduct",value:function(t,r){var a=c+"/product/edit/"+r;return n.a(a,t).then(function(t){return 0==t.code?(xmview.showTip("success",t.message),t.data):(xmview.showTip("error",t.message),e.reject(t))})}},{key:"deleteProduct",value:function(t){var r=c+"/product/delete/"+t;return n.a(r,{}).then(function(t){return 0==t.code?(xmview.showTip("success",t.message),t.data):(xmview.showTip("error",t.message),e.reject(t))})}},{key:"getCoupon",value:function(e){var t=c+"/discount/get/"+e;return n.b(t).then(function(e){return e.data})}},{key:"fetchCouponList",value:function(t){var r=c+"/discount/lists";return n.b(r,t).then(function(t){return 0==t.code?t:e.reject(t)})}},{key:"createCoupon",value:function(t){var r=c+"/discount/create";return n.a(r,t).then(function(t){return 0==t.code?(xmview.showTip("success",t.message),t.data):(xmview.showTip("error",t.message),e.reject(t))})}},{key:"editCoupon",value:function(t,r){var a=c+"/discount/edit/"+r;return n.a(a,t).then(function(t){return 0==t.code?(xmview.showTip("success",t.message),t.data):(xmview.showTip("error",t.message),e.reject(t))})}},{key:"deleteCoupon",value:function(t){var r=c+"/discount/delete/"+t;return n.a(r,{}).then(function(t){return 0==t.code?(xmview.showTip("success",t.message),t.data):(xmview.showTip("error",t.message),e.reject(t))})}},{key:"getRedPacketdata",value:function(t){var r=c+"/bonus/get/"+t;return n.b(r,{}).then(function(t){return 0==t.code?t:e.reject(t)})}}]),t}();t.a=new s}).call(t,r(1))},40:function(e,t,r){r(654);var a=r(5)(r(457),r(789),null,null);e.exports=a.exports},457:function(e,t,r){"use strict";function a(){return{name:"",description:"",mark:"",price:void 0,appleid_origin:"",appleid_discount:"",price1:void 0,num:void 0}}Object.defineProperty(t,"__esModule",{value:!0});var n=r(257);"function"==typeof Symbol&&Symbol.iterator;t.default={name:"finance-product-edit",components:{},data:function(){return{loadingData:!1,fetchParam:a(),rules:{name:[{required:!0,message:"必须输入",trigger:"blur"},,{pattern:/\S$/,message:"请输入非空格或非特殊字符的内容"}],price:[{required:!0,type:"number",message:"请输入商品金额",trigger:"blur"},{pattern:/^\d+$/,message:"请输入整数"}],description:{required:!0,message:"请输入商品简介",trigger:"blur"},price1:{required:!0,type:"number",message:"请输入商品简介",trigger:"blur"},num:{required:!0,type:"number",message:"请输入商品简介",trigger:"blur"}},changelist:{}}},watch:{"fetchParam.price":function(){this.fetchParam.price=Number(this.fetchParam.price)}},created:function(){var e=this;xmview.setContentLoading(!1),void 0!=this.$route.params.id&&n.a.getProduct(this.$route.params.id).then(function(t){e.fetchParam=t}),this.loadingData=!1},methods:{getExpertsList:function(e,t){var r=this;return n.a.fetchProductList({name:e,pagesize:this.pageSize,page:parseInt(t/this.pageSize)+1}).then(function(e){return r.$emit("changelist",e),r.changelist=e,e})},btnNextClick:function(){var e=this;this.$refs.form.validate(function(t){if(t){var r=n.a.createProduct;e.fetchParam.id&&(r=n.a.editProduct),r(e.fetchParam,e.fetchParam.id).then(function(t){xmview.showTip("success","数据提交成功"),e.$refs.form.resetFields(),e.fetchParam.id||(e.fetchParam.id=t.id),e.$router.go(-1)})}})}}}},536:function(e,t,r){t=e.exports=r(100)(!0),t.push([e.i,'#medical-form{padding:15px;position:relative;border:1px solid #ededed;border-radius:5px;background:#fff}#medical-form:after{content:"";clear:both;display:block}#medical-form .pagin{float:right;margin-top:15px}#medical-form .bottom-manage{margin-top:15px}.text-blue{color:#20a0ff}.text-light-blue{color:#58b7ff}.text-dark-blue{color:#1d8ce0}.text-success{color:#13ce66}.text-warning{color:#f7ba2a}.text-danger{color:#ff4949}#medical-form{display:-ms-flexbox;display:flex}#medical-form .submit-form{width:45%;padding:20px}#medical-form .submit-form .select{width:100%}#medical-form .submit-form .subButton{text-align:center}',"",{version:3,sources:["/home/baichenhui/devspace/sys_ui/assets/src/views/financeManage/finance/product/ProductForm.vue"],names:[],mappings:"AACA,cAAc,aAAa,kBAAkB,yBAAyB,kBAAkB,eAAe,CACtG,AACD,oBAAoB,WAAW,WAAW,aAAa,CACtD,AACD,qBAAqB,YAAY,eAAe,CAC/C,AACD,6BAA6B,eAAe,CAC3C,AACD,WAAW,aAAa,CACvB,AACD,iBAAiB,aAAa,CAC7B,AACD,gBAAgB,aAAa,CAC5B,AACD,cAAc,aAAa,CAC1B,AACD,cAAc,aAAa,CAC1B,AACD,aAAa,aAAa,CACzB,AACD,cAAc,oBAAoB,YAAY,CAC7C,AACD,2BAA2B,UAAU,YAAY,CAChD,AACD,mCAAmC,UAAU,CAC5C,AACD,sCAAsC,iBAAiB,CACtD",file:"ProductForm.vue",sourcesContent:["\n#medical-form{padding:15px;position:relative;border:1px solid #ededed;border-radius:5px;background:#fff\n}\n#medical-form:after{content:'';clear:both;display:block\n}\n#medical-form .pagin{float:right;margin-top:15px\n}\n#medical-form .bottom-manage{margin-top:15px\n}\n.text-blue{color:#20A0FF\n}\n.text-light-blue{color:#58B7FF\n}\n.text-dark-blue{color:#1D8CE0\n}\n.text-success{color:#13CE66\n}\n.text-warning{color:#F7BA2A\n}\n.text-danger{color:#FF4949\n}\n#medical-form{display:-ms-flexbox;display:flex\n}\n#medical-form .submit-form{width:45%;padding:20px\n}\n#medical-form .submit-form .select{width:100%\n}\n#medical-form .submit-form .subButton{text-align:center\n}\n"],sourceRoot:""}])},654:function(e,t,r){var a=r(536);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);r(101)("2d03d23e",a,!0)},789:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("main",{attrs:{id:"medical-form"}},[r("section",{staticClass:"submit-form"},[r("el-form",{ref:"form",attrs:{"label-width":"120px",rules:e.rules,model:e.fetchParam}},[r("el-form-item",{attrs:{label:"商品名称",prop:"name"}},[r("el-input",{model:{value:e.fetchParam.name,callback:function(t){e.fetchParam.name=t},expression:"fetchParam.name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"标记",prop:"mark"}},[r("el-input",{model:{value:e.fetchParam.mark,callback:function(t){e.fetchParam.mark=t},expression:"fetchParam.mark"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"商品金额(分)",prop:"price"}},[r("el-input",{attrs:{type:"number",min:0},model:{value:e.fetchParam.price,callback:function(t){e.fetchParam.price=t},expression:"fetchParam.price"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"商品简介",prop:"description"}},[r("el-input",{attrs:{type:"textarea",autosize:{minRows:3,maxRows:7},placeholder:"请输入内容"},model:{value:e.fetchParam.description,callback:function(t){e.fetchParam.description=t},expression:"fetchParam.description"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"苹果原价商品id",prop:"appleid_origin"}},[r("el-input",{attrs:{placeholder:"请输入内容"},model:{value:e.fetchParam.appleid_origin,callback:function(t){e.fetchParam.appleid_origin=t},expression:"fetchParam.appleid_origin"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"苹果折扣价商品id",prop:"appleid_discount"}},[r("el-input",{attrs:{placeholder:"请输入内容"},model:{value:e.fetchParam.appleid_discount,callback:function(t){e.fetchParam.appleid_discount=t},expression:"fetchParam.appleid_discount"}})],1),e._v(" "),r("el-form-item",{attrs:{label:""}},[r("el-button",{attrs:{type:"primary"},on:{click:e.btnNextClick}},[e._v("确认")])],1)],1)],1)])},staticRenderFns:[]}}});
//# sourceMappingURL=23.171f58522f3acc74141f.js.map