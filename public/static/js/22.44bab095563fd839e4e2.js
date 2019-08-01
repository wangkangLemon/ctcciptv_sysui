webpackJsonp([22],{315:function(e,t,r){"use strict";(function(e){function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var n=r(6),o=r(0),i=function(){function e(e,t){for(var r=0;r<t.length;r++){var a=t[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,r,a){return r&&e(t.prototype,r),a&&e(t,a),t}}(),s=o.a.apiHost+"/gov/role",l=o.a.apiHost+"/role_menus",c=o.a.apiHost+"/role_nodes",u=function(){function t(){a(this,t)}return i(t,[{key:"fetchData",value:function(t,r){var a=s+"/lists";return n.b(a,t,r).then(function(t){return 0==t.code?t:e.reject(t)})}},{key:"getAdminInfo",value:function(t){var r=s+"/view/"+t;return n.b(r,{},!1).then(function(t){return 0==t.code?t.data:e.reject(t)})}},{key:"create",value:function(t){var r=t.role_name,a=t.role_node,o=s+"/create";return n.a(o,{role_name:r,role_node:a}).then(function(t){return 0==t.code?(xmview.showTip("success",t.message),t.data):(xmview.showTip("error",t.message),e.reject(t))})}},{key:"update",value:function(t){var r=t.role_name,a=t.role_node,o=t.id,i=s+"/update/"+o;return n.a(i,{role_name:r,role_node:a}).then(function(t){if(t.code)return xmview.showTip("error",t.message),e.reject(t);xmview.showTip("success",t.message)})}},{key:"delete",value:function(t){var r=s+"/delete/"+t;return n.a(r,{}).then(function(t){if(t.code)return e.reject(t)})}},{key:"deleteMulty",value:function(e){var t=s+"/batchdel";return n.c(t,{ids:e})}},{key:"moveToCategoryMulty",value:function(e){var t=e.ids,r=e.category_id,a=s+"/batchmove";return n.c(a,{ids:t,category_id:r})}},{key:"setLesson",value:function(t){var r=t.id,a=t.data,o=s+"/"+r+"/setlesson";return n.c(o,a).then(function(t){if(t.code)return e.reject(t)})}},{key:"offline",value:function(e,t,r){var a=s+"/update/"+t;return n.a(a,{role_name:e,disabled:r})}},{key:"online",value:function(e,t,r){var a=s+"/update/"+t;return n.a(a,{role_name:e,disabled:r})}},{key:"fetchDataM",value:function(t){var r=t.id,a=t.pagesize,i=o.a.apiHost+"/gov/role_menus/lists";return n.b(i,{role_id:r,pagesize:a}).then(function(t){return 0==t.code?t:e.reject(t)})}},{key:"createM",value:function(t,r){var a=o.a.apiHost+"/gov/role_menus/create_multi";return n.a(a,{role_id:t,menu_ids:r}).then(function(t){return 0==t.code?(xmview.showTip("success",t.message),t.data):(xmview.showTip("error",t.message),e.reject(t))})}},{key:"fetchDataN",value:function(t){var r=c+"/lists";return n.b(r,{role_id:t}).then(function(t){return 0==t.code?t:e.reject(t)})}},{key:"createN",value:function(t,r){var a=c+"/create_multi";return n.a(a,{role_id:t,menu_ids:r}).then(function(t){return 0==t.code?(xmview.showTip("success",t.message),t.data):(xmview.showTip("error",t.message),e.reject(t))})}},{key:"deleteImp",value:function(t){var r=l+"/delete/"+t;return n.a(r,{}).then(function(t){return 0==t.code?(xmview.showTip("success",t.message),t.data):(xmview.showTip("error",t.message),e.reject(t))})}}]),t}();t.a=new u}).call(t,r(1))},43:function(e,t,r){r(752);var a=r(5)(r(473),r(901),null,null);e.exports=a.exports},473:function(e,t,r){"use strict";function a(){return{role_name:"",role_node:""}}Object.defineProperty(t,"__esModule",{value:!0});var n=r(315);t.default={name:"sys-form",data:function(){return{loadingData:!1,currentData:{data:{},pindex:-1,index:-1},fetchParam:a(),rules:{role_name:[{required:!0,message:"必须输入",trigger:"blur"},,{pattern:/\S$/,message:"请输入非空格或非特殊字符的内容"}],role_node:[{required:!0,message:"请选择",trigger:"change"}]}}},created:function(){var e=this;xmview.setContentLoading(!1),void 0!=this.$route.params.warrant_id&&n.a.getAdminInfo(this.$route.params.warrant_id).then(function(t){e.fetchParam=t}),this.loadingData=!1},methods:{btnNextClick:function(){var e=this;this.$refs.form.validate(function(t){if(t){var r=n.a.create;e.$route.params.warrant_id&&(r=n.a.update),r(e.fetchParam).then(function(t){e.$refs.form.resetFields(),e.currentData={data:[],pindex:-1,index:-1},e.fetchParam.id||(e.fetchParam.id=t.id),e.$router.push({name:"gov-warrant"})})}})}}}},634:function(e,t,r){t=e.exports=r(100)(!0),t.push([e.i,'#sys-form{padding:15px;position:relative;border:1px solid #ededed;border-radius:5px;background:#fff}#sys-form:after{content:"";clear:both;display:block}#sys-form .pagin{float:right;margin-top:15px}#sys-form .bottom-manage{margin-top:15px}.text-blue{color:#20a0ff}.text-light-blue{color:#58b7ff}.text-dark-blue{color:#1d8ce0}.text-success{color:#13ce66}.text-warning{color:#f7ba2a}.text-danger{color:#ff4949}#sys-form .el-form{max-width:700px}',"",{version:3,sources:["/home/baichenhui/devspace/sys_ui/assets/src/views/gov/menuManage/RoleForm.vue"],names:[],mappings:"AACA,UAAU,aAAa,kBAAkB,yBAAyB,kBAAkB,eAAe,CAClG,AACD,gBAAgB,WAAW,WAAW,aAAa,CAClD,AACD,iBAAiB,YAAY,eAAe,CAC3C,AACD,yBAAyB,eAAe,CACvC,AACD,WAAW,aAAa,CACvB,AACD,iBAAiB,aAAa,CAC7B,AACD,gBAAgB,aAAa,CAC5B,AACD,cAAc,aAAa,CAC1B,AACD,cAAc,aAAa,CAC1B,AACD,aAAa,aAAa,CACzB,AACD,mBAAmB,eAAe,CACjC",file:"RoleForm.vue",sourcesContent:["\n#sys-form{padding:15px;position:relative;border:1px solid #ededed;border-radius:5px;background:#fff\n}\n#sys-form:after{content:'';clear:both;display:block\n}\n#sys-form .pagin{float:right;margin-top:15px\n}\n#sys-form .bottom-manage{margin-top:15px\n}\n.text-blue{color:#20A0FF\n}\n.text-light-blue{color:#58B7FF\n}\n.text-dark-blue{color:#1D8CE0\n}\n.text-success{color:#13CE66\n}\n.text-warning{color:#F7BA2A\n}\n.text-danger{color:#FF4949\n}\n#sys-form .el-form{max-width:700px\n}\n"],sourceRoot:""}])},752:function(e,t,r){var a=r(634);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);r(101)("3d262e4a",a,!0)},901:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("main",{attrs:{id:"sys-form"}},[r("el-form",{ref:"form",attrs:{"label-width":"120px",model:e.fetchParam,rules:e.rules}},[r("el-form-item",{attrs:{label:"角色名称",prop:"role_name"}},[r("el-input",{model:{value:e.fetchParam.role_name,callback:function(t){e.fetchParam.role_name=t},expression:"fetchParam.role_name"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"角色标识",prop:"role_node"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:e.fetchParam.role_node,callback:function(t){e.fetchParam.role_node=t},expression:"fetchParam.role_node"}},[r("el-option",{attrs:{label:"省级",value:"province"}}),e._v(" "),r("el-option",{attrs:{label:"市级",value:"city"}}),e._v(" "),r("el-option",{attrs:{label:"区(县)",value:"area"}}),e._v(" "),r("el-option",{attrs:{label:"乡镇",value:"town"}}),e._v(" "),r("el-option",{attrs:{label:"村级",value:"village"}})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:""}},[r("el-button",{on:{click:function(t){e.$router.push({name:"gov-warrant"})}}},[e._v("取消")]),e._v(" "),r("el-button",{attrs:{type:"primary"},on:{click:e.btnNextClick}},[e._v("确认")])],1)],1)],1)},staticRenderFns:[]}}});
//# sourceMappingURL=22.44bab095563fd839e4e2.js.map