webpackJsonp([95],{192:function(e,n,t){t(677);var a=t(5)(t(509),t(816),null,null);e.exports=a.exports},260:function(e,n,t){"use strict";(function(e){function a(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}var r=t(6),o=t(0),i=function(){function e(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(n,t,a){return t&&e(n.prototype,t),a&&e(n,a),n}}(),c=o.a.apiHost+"/menu",u=function(){function n(){a(this,n)}return i(n,[{key:"fetchData",value:function(n,t,a,o,i){var u=c+"/lists";return r.b(u,n,t,a,o,i).then(function(n){return 0==n.code?n:e.reject(n)})}},{key:"getAdminInfo",value:function(n){var t=c+"/view/"+n;return r.b(t,{},!1).then(function(n){return 0==n.code?n:e.reject(n)})}},{key:"create",value:function(n){var t=n.menu_name,a=n.menu_node,o=n.remark,i=n.sort,u=n.pid,s=n.level,l=c+"/create";return r.a(l,{menu_name:t,menu_node:a,remark:o,sort:i,pid:u,level:s}).then(function(n){if(0!=n.code)return xmview.showTip("error",n.message),e.reject(n);xmview.showTip("success",n.message)})}},{key:"update",value:function(n){var t=n.id,a=n.menu_name,o=n.menu_node,i=n.remark,u=n.sort,s=n.pid,l=n.level,d=n.disabled,f=c+"/update/"+t;return r.a(f,{menu_name:a,menu_node:o,remark:i,sort:u,pid:s,level:l,disabled:d}).then(function(n){return 0==n.code?n.data:(xmview.showTip("error",n.message),e.reject(n))})}},{key:"delete",value:function(n){var t=c+"/delete/"+n;return r.a(t,{}).then(function(n){if(n.code)return e.reject(n)})}},{key:"deleteMulty",value:function(e){var n=c+"/batchdel";return r.c(n,{ids:e})}},{key:"moveToCategoryMulty",value:function(e){var n=e.ids,t=e.category_id,a=c+"/batchmove";return r.c(a,{ids:n,category_id:t})}},{key:"setLesson",value:function(n){var t=n.id,a=n.data,o=c+"/"+t+"/setlesson";return r.c(o,a).then(function(n){if(n.code)return e.reject(n)})}},{key:"offline",value:function(e,n,t,a,o,i,u,s){var l=c+"/update/"+e;return r.a(l,{menu_name:n,menu_node:t,remark:a,sort:o,pid:i,level:u,disabled:s})}},{key:"online",value:function(e,n,t,a,o,i,u,s){var l=c+"/update/"+e;return r.a(l,{menu_name:n,menu_node:t,remark:a,sort:o,pid:i,level:u,disabled:s})}},{key:"getUploadUrl",value:function(e){var n=e.image,t=e.alias,a=c+"/upload";return r.a(a,{image:n,alias:t}).then(function(e){return e.data})}}]),n}();n.a=new u}).call(n,t(1))},288:function(e,n,t){"use strict";(function(e){function a(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}var r=t(6),o=t(0),i=function(){function e(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(n,t,a){return t&&e(n.prototype,t),a&&e(n,a),n}}(),c=o.a.apiHost+"/role",u=o.a.apiHost+"/role_menus",s=o.a.apiHost+"/role_nodes",l=function(){function n(){a(this,n)}return i(n,[{key:"fetchData",value:function(n){var t=c+"/lists";return r.b(t,n).then(function(n){return 0==n.code?n:e.reject(n)})}},{key:"getAdminInfo",value:function(n){var t=c+"/view/"+n;return r.b(t,{},!1).then(function(n){return 0==n.code?n.data:e.reject(n)})}},{key:"create",value:function(n){var t=n.role_name,a=c+"/create";return r.a(a,{role_name:t}).then(function(n){return 0==n.code?(xmview.showTip("success",n.message),n.data):(xmview.showTip("error",n.message),e.reject(n))})}},{key:"update",value:function(n){var t=n.role_name,a=n.id,o=c+"/update/"+a;return r.a(o,{role_name:t}).then(function(n){if(n.code)return xmview.showTip("error",n.message),e.reject(n);xmview.showTip("success",n.message)})}},{key:"delete",value:function(n){var t=c+"/delete/"+n;return r.a(t,{}).then(function(n){if(n.code)return e.reject(n)})}},{key:"deleteMulty",value:function(e){var n=c+"/batchdel";return r.c(n,{ids:e})}},{key:"moveToCategoryMulty",value:function(e){var n=e.ids,t=e.category_id,a=c+"/batchmove";return r.c(a,{ids:n,category_id:t})}},{key:"setLesson",value:function(n){var t=n.id,a=n.data,o=c+"/"+t+"/setlesson";return r.c(o,a).then(function(n){if(n.code)return e.reject(n)})}},{key:"offline",value:function(e,n,t){var a=c+"/update/"+n;return r.a(a,{role_name:e,disabled:t})}},{key:"online",value:function(e,n,t){var a=c+"/update/"+n;return r.a(a,{role_name:e,disabled:t})}},{key:"fetchDataM",value:function(n){var t=n.id,a=n.pagesize,o=u+"/lists";return r.b(o,{role_id:t,pagesize:a}).then(function(n){return 0==n.code?n:e.reject(n)})}},{key:"createM",value:function(n,t){var a=u+"/create_multi";return r.a(a,{role_id:n,menu_ids:t}).then(function(n){return 0==n.code?(xmview.showTip("success",n.message),n.data):(xmview.showTip("error",n.message),e.reject(n))})}},{key:"fetchDataN",value:function(n){var t=s+"/lists";return r.b(t,{role_id:n}).then(function(n){return 0==n.code?n:e.reject(n)})}},{key:"createN",value:function(n,t){var a=s+"/create_multi";return r.a(a,{role_id:n,menu_ids:t}).then(function(n){return 0==n.code?(xmview.showTip("success",n.message),n.data):(xmview.showTip("error",n.message),e.reject(n))})}},{key:"deleteImp",value:function(n){var t=u+"/delete/"+n;return r.a(t,{}).then(function(n){return 0==n.code?(xmview.showTip("success",n.message),n.data):(xmview.showTip("error",n.message),e.reject(n))})}}]),n}();n.a=new l}).call(n,t(1))},509:function(e,n,t){"use strict";function a(){return{status:void 0,pagesize:-1,level:-1,pid:-1}}Object.defineProperty(n,"__esModule",{value:!0});var r=t(260),o=t(288);n.default={data:function(){return{init:!1,loadingData:!1,dataCache:[],dataImp:[],selectedIds:[],checkAll:!1,checkedMenus:[],fetchParam:a()}},activated:function(){xmview.setContentTile("授权菜单-"+this.$route.params.role_name),this.fetchData(),this.fetchDataM()},methods:{handleCheckAllChange:function(e){var n=this.dataCache.map(function(e){return e.id});this.checkedMenus=e.target.checked?n:[]},handleCheckedMenusChange:function(e){var n=e.length;this.checkAll=n===this.dataCache.length},fetchData:function(e){var n=this;return r.a.fetchData(this.fetchParam).then(function(e){n.dataCache=e.data,n.loadingData=!1,n.checkAll=n.checkedMenus.length===n.dataCache.length,xmview.setContentLoading(!1)})},fetchDataM:function(){var e=this;return o.a.fetchDataM({id:this.$route.params.role_id,pagesize:-1}).then(function(n){e.dataImp=n.data;var t=[];n.data.forEach(function(e){t.push(e.menu_id)}),e.checkedMenus=t,e.checkAll=e.checkedMenus.length===e.dataCache.length,e.loadingData=!1,xmview.setContentLoading(!1)})},createM:function(){var e=this,n=this.checkedMenus.join(",");o.a.createM(this.$route.params.role_id,n).then(function(n){e.fetchParamImp=n,e.$router.push({name:"role-index"})}),this.loadingData=!1}}}},559:function(e,n,t){n=e.exports=t(100)(!0),n.push([e.i,'#sys-index-container{padding:15px;position:relative;border:1px solid #ededed;border-radius:5px;background:#fff}#sys-index-container:after{content:"";clear:both;display:block}#sys-index-container .pagin{float:right;margin-top:15px}#sys-index-container .bottom-manage{margin-top:15px}.text-blue{color:#20a0ff}.text-light-blue{color:#58b7ff}.text-dark-blue{color:#1d8ce0}.text-success{color:#13ce66}.text-warning{color:#f7ba2a}.text-danger{color:#ff4949}.keyword-container{width:90%;margin-left:5%;margin-bottom:5px}',"",{version:3,sources:["/home/baichenhui/devspace/sys_ui/assets/src/views/sys/role/roleMenus.vue"],names:[],mappings:"AACA,qBAAqB,aAAa,kBAAkB,yBAAyB,kBAAkB,eAAe,CAC7G,AACD,2BAA2B,WAAW,WAAW,aAAa,CAC7D,AACD,4BAA4B,YAAY,eAAe,CACtD,AACD,oCAAoC,eAAe,CAClD,AACD,WAAW,aAAa,CACvB,AACD,iBAAiB,aAAa,CAC7B,AACD,gBAAgB,aAAa,CAC5B,AACD,cAAc,aAAa,CAC1B,AACD,cAAc,aAAa,CAC1B,AACD,aAAa,aAAa,CACzB,AACD,mBAAmB,UAAU,eAAe,iBAAiB,CAC5D",file:"roleMenus.vue",sourcesContent:["\n#sys-index-container{padding:15px;position:relative;border:1px solid #ededed;border-radius:5px;background:#fff\n}\n#sys-index-container:after{content:'';clear:both;display:block\n}\n#sys-index-container .pagin{float:right;margin-top:15px\n}\n#sys-index-container .bottom-manage{margin-top:15px\n}\n.text-blue{color:#20A0FF\n}\n.text-light-blue{color:#58B7FF\n}\n.text-dark-blue{color:#1D8CE0\n}\n.text-success{color:#13CE66\n}\n.text-warning{color:#F7BA2A\n}\n.text-danger{color:#FF4949\n}\n.keyword-container{width:90%;margin-left:5%;margin-bottom:5px\n}\n"],sourceRoot:""}])},677:function(e,n,t){var a=t(559);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);t(101)("4d87f6ec",a,!0)},816:function(e,n){e.exports={render:function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("article",{attrs:{id:"sys-index-container"}},[t("el-checkbox",{on:{change:e.handleCheckAllChange},model:{value:e.checkAll,callback:function(n){e.checkAll=n},expression:"checkAll"}},[e._v("全选")]),e._v(" "),t("div",{staticStyle:{margin:"15px 0"}}),e._v(" "),t("el-checkbox-group",{on:{change:e.handleCheckedMenusChange},model:{value:e.checkedMenus,callback:function(n){e.checkedMenus=n},expression:"checkedMenus"}},e._l(e.dataCache,function(n){return t("el-checkbox",{key:n.id,attrs:{label:n.id,value:n.id}},[e._v(e._s(n.menu_name))])})),e._v(" "),t("div",{staticClass:"bottom-manage"},[t("el-button",{on:{click:e.createM}},[e._v("提交")])],1)],1)},staticRenderFns:[]}}});
//# sourceMappingURL=95.8bae4fffd3cb061290f7.js.map