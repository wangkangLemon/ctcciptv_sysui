webpackJsonp([16],{199:function(e,t,i){"use strict";(function(e){function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=i(6),n=i(0),r=function(){function e(e,t){for(var i=0;i<t.length;i++){var a=t[i];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,i,a){return i&&e(t.prototype,i),a&&e(t,a),t}}(),l=n.a.apiHost+"/gov",c=function(){function t(){a(this,t)}return r(t,[{key:"getSelectList",value:function(e){var t=e.id,i=void 0===t?"":t,a=e.name,n=void 0===a?"":a,r=e.category,c=void 0===r?"":r,d=e.pagesize,s=void 0===d?"":d,u=e.page,v=void 0===u?"":u,f=e.pid,p=void 0===f?"":f,m=e.province_id,g=void 0===m?"":m,h=e.city_id,_=void 0===h?"":h,b=e.area_id,y=void 0===b?"":b,w=e.town_id,S=void 0===w?"":w,x=e.village_id,k=void 0===x?"":x,A=e.deleted,C=void 0===A?"":A,z=l+"/lists";return o.b(z,{id:i,name:n,category:c,page:v,pagesize:s,pid:p,province_id:g,city_id:_,area_id:y,town_id:S,village_id:k,deleted:C},!1).then(function(e){return e})}},{key:"postSelectList",value:function(e){var t=e.id,i=void 0===t?"":t,a=e.name,n=void 0===a?"":a,r=e.category,c=void 0===r?"":r,d=e.pagesize,s=void 0===d?"":d,u=e.page,v=void 0===u?"":u,f=e.pid,p=void 0===f?"":f,m=e.province_id,g=void 0===m?"":m,h=e.city_id,_=void 0===h?"":h,b=e.area_id,y=void 0===b?"":b,w=e.town_id,S=void 0===w?"":w,x=e.village_id,k=void 0===x?"":x,A=e.deleted,C=void 0===A?"":A,z=l+"/lists";return o.a(z,{id:i,name:n,category:c,page:v,pagesize:s,pid:p,province_id:g,city_id:_,area_id:y,town_id:S,village_id:k,deleted:C},!1).then(function(e){return e.data})}},{key:"getGovInfo",value:function(e){var t=l+"/get/"+e;return o.b(t).then(function(e){if(0==e.code)return e.data})}},{key:"addGov",value:function(t){var i=t.category,a=t.pid,n=t.province_id,r=t.city_id,c=t.area_id,d=t.town_id,s=t.village_id,u=t.name,v=t.concact,f=t.mobile,p=t.email,m=t.mobile_title,g=t.tel,h=t.zip,_=t.fax,b=t.url,y=t.address,w=t.description,S=l+"/create";return o.a(S,{category:i,pid:a,province_id:n,city_id:r,area_id:c,town_id:d,village_id:s,name:u,concact:v,mobile:f,email:p,mobile_title:m,tel:g,zip:h,fax:_,url:b,address:y,description:w}).then(function(t){if(t.code)return e.reject(t)})}},{key:"editGov",value:function(e){var t=l+"/edit/"+e;return o.b(t).then(function(e){return e.data})}},{key:"updateGov",value:function(t){var i=t.gov_id,a=t.category,n=t.pid,r=t.province_id,c=t.city_id,d=t.area_id,s=t.town_id,u=t.village_id,v=t.name,f=t.concact,p=t.mobile,m=t.email,g=t.mobile_title,h=t.tel,_=t.zip,b=t.fax,y=t.url,w=t.address,S=t.description,x=l+"/edit/"+i;return o.a(x,{category:a,pid:n,province_id:r,city_id:c,area_id:d,town_id:s,village_id:u,name:v,concact:f,mobile:p,email:m,mobile_title:g,tel:h,zip:_,fax:b,url:y,address:w,description:S}).then(function(t){if(t.code)return e.reject(t)})}},{key:"govAdminList",value:function(e){var t=e.name,i=e.gov_id,a=e.page,r=e.pagesize,l=e.role_id,c=e.mobile,d=e.active,s=n.a.apiHost+"/user/lists";return o.b(s,{name:t,gov_id:i,page:a,pagesize:r,role_id:l,mobile:c,active:d}).then(function(e){return e})}},{key:"govAdmin",value:function(e){var t=e.name,i=e.gov_id,a=e.page,r=e.pagesize,l=n.a.apiHost+"/user/get/"+i;return o.b(l,{name:t,page:a,pagesize:r}).then(function(e){return e.data})}},{key:"addGovAdmin",value:function(t){var i=n.a.apiHost+"/user/create";return o.a(i,t).then(function(t){if(t.code)return e.reject(t)})}},{key:"delAdmin",value:function(e){var t=e.id,i=n.a.apiHost+"/user/delete/"+t;return o.a(i)}},{key:"a",value:function(t){var i=t.pagesize,a=t.page,n=l+"/lists";return o.b(n,{pagesize:i,page:a}).then(function(t){return 0==t.code?t:e.reject(t)})}},{key:"getAdminInfo",value:function(t){var i=l+"/view/"+t;return o.b(i,{},!1).then(function(t){return 0==t.code?t.data:e.reject(t)})}},{key:"create",value:function(t){var i=t.role_id,a=t.name,n=t.mobile,r=t.email,c=t.password,d=l+"/create";return o.a(d,{role_id:i,name:a,mobile:n,email:r,password:c}).then(function(t){return 0==t.code?t.data:(xmview.showTip("error",t.message),e.reject(t))})}},{key:"update",value:function(t){var i=t.id,a=t.role_id,n=t.name,r=t.mobile,c=t.email,d=t.password,s=t.sex,u=t.avatar,v=t.address,f=l+"/update/"+i;return o.a(f,{role_id:a,name:n,mobile:r,email:c,password:d,sex:s,avatar:u,address:v}).then(function(t){if(t.code)return e.reject(t)})}},{key:"deleteGov",value:function(t){var i=l+"/delete/"+t;return o.a(i,{}).then(function(t){return 0==t.code?(xmview.showTip("success",t.message),t.data):(xmview.showTip("error",t.message),e.reject(t))})}},{key:"delete",value:function(t){var i=l+"/delete/"+t;return o.a(i,{}).then(function(t){if(t.code)return e.reject(t)})}},{key:"deleteMulty",value:function(e){var t=l+"/batchdel";return o.c(t,{ids:e})}},{key:"moveToCategoryMulty",value:function(e){var t=e.ids,i=e.category_id,a=l+"/batchmove";return o.c(a,{ids:t,category_id:i})}},{key:"setLesson",value:function(t){var i=t.id,a=t.data,n=l+"/"+i+"/setlesson";return o.c(n,a).then(function(t){if(t.code)return e.reject(t)})}},{key:"offline",value:function(e){var t=e.id,i=e.role_id,a=e.name,n=e.mobile,r=e.email,c=e.password,d=e.sex,s=e.avatar,u=e.address,v=e.disabled,f=l+"/update/"+t;return o.a(f,{id:t,role_id:i,name:a,mobile:n,email:r,password:c,sex:d,avatar:s,address:u,disabled:v})}},{key:"online",value:function(e){var t=l+"/update/"+e;return o.a(t,{disabled:0})}},{key:"getUploadUrl",value:function(e){var t=e.image,i=e.alias,a=l+"/upload";return o.a(a,{image:t,alias:i}).then(function(e){return e.data})}},{key:"getCompanyManageStat",value:function(){var e=l+"/user/loginlog/lists";return o.b(e).then(function(e){return e.data})}},{key:"getUserLoginlog",value:function(e){var t=e.page,i=e.pagesize,a=e.name,r=void 0===a?"":a,l=e.user_name,c=void 0===l?"":l,d=e.gov_id,s=e.role_id,u=void 0===s?"":s,v=e.date_start,f=void 0===v?"":v,p=e.date_end,m=void 0===p?"":p,g=n.a.apiHost+"/user/loginlog/lists";return o.b(g,{page:t,pagesize:i,name:r,user_name:c,gov_id:d,role_id:u,date_start:f,date_end:m}).then(function(e){return e})}},{key:"getReportUserlogin",value:function(e){var t=e.page,i=e.pagesize,a=e.name,r=void 0===a?"":a,l=e.user_name,c=void 0===l?"":l,d=e.gov_id,s=e.role_id,u=void 0===s?"":s,v=e.date_start,f=void 0===v?"":v,p=e.date_end,m=void 0===p?"":p,g=e.level,h=n.a.apiHost+"/report/userlogin/lists";return o.b(h,{page:t,pagesize:i,name:r,user_name:c,gov_id:d,role_id:u,date_start:f,date_end:m,level:g}).then(function(e){return e})}},{key:"getCourseHistory",value:function(e){var t=e.page,i=e.pagesize,a=e.user_id,n=e.gov_id,r=e.category_id,c=e.course_id,d=e.date_start,s=e.date_end,u=l+"/course/history/lists";return o.b(u,{page:t,pagesize:i,user_id:a,gov_id:n,category_id:r,course_id:c,date_start:d,date_end:s}).then(function(e){return e})}},{key:"getCompanyStatChart",value:function(e){var t=e.gov_id,i=e.date_start,a=e.date_end,n=l+"/stat/chart";return o.b(n,{gov_id:t,date_start:i,date_end:a}).then(function(e){return e.data})}}]),t}();t.a=new c}).call(t,i(1))},219:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=(i(14),i(199));t.default={props:["change","title","province","city","area","town","village","disabled"],data:function(){return{provinces:[],citys:[],areas:[],towns:[],villages:[],provinceSelect:"",citySelect:"",areaSelect:"",townSelect:"",villageSelect:"",curItem:[],cityData:"",options:[],fetchParam:{pagesize:-1,pid:0,province_id:null,city_id:null,area_id:null,town_id:null,village_id:null}}},watch:{province:function(e){e?(this.provinceSelect=e,this.currentVal(0,e)):this.provinceSelect=""},city:function(e){this.province&&e?(this.citySelect=e,this.currentVal(1,e)):this.citySelect=""},area:function(e){this.province&&this.citySelect&&e?(this.areaSelect=e,this.currentVal(2,e)):this.areaSelect=""},town:function(e){this.province&&this.citySelect&&this.areaSelect&&e?(this.townSelect=e,this.currentVal(3,e)):this.townSelect=""},village:function(e){this.province&&this.citySelect&&this.areaSelect&&this.townSelect&&e?(this.villageSelect=e,this.currentVal(4,e)):this.villageSelect=""},disabled:function(e){e&&(this.provinceSelect="")}},created:function(){},mounted:function(){this.getData(this.fetchParam.pid,"provinces")},methods:{getData:function(e,t){var i=this;void 0!==this.fetchParam.provinceSelect&&(this.fetchParam.pid=this.fetchParam.villageSelect||this.fetchParam.townSelect||this.fetchParam.areaSelect||this.fetchParam.citySelect||this.fetchParam.provinceSelect),this.loading=!0,a.a.getSelectList({pagesize:-1,pid:e,province_id:this.fetchParam.provinceSelect,city_id:this.fetchParam.citySelect,area_id:this.fetchParam.areaSelect,town_id:this.fetchParam.townSelect,village_id:this.fetchParam.villageSelect}).then(function(e){i.cityData=e.data;var a=[];i.cityData.forEach(function(e){a.push({data:e,name:e.name,id:e.id})}),i[t]=a}).then(function(){i.loading=!1})},currentVal:function(e,t){var i=["provinceSelect","citySelect","areaSelect","townSelect","villageSelect"],a=["provinces","citys","areas","towns","villages"];this[i[e]]&&([this[i[e]]],e<i.length-1&&this.getData(t,a[e+1]))},setCurrVal:function(e,t){var i=["provinceChange","cityChange","areaChange","townChange","villageChange"];this.$emit(i[e],t),this.$store.dispatch("saveGovRank",{"emitArr[type]":t}),t?this.change&&this.change():this.change&&this.change(!0)}}}},220:function(e,t,i){t=e.exports=i(100)(!0),t.push([e.i,".region-container .el-select{max-width:130px!important}","",{version:3,sources:["/home/baichenhui/devspace/sys_ui/assets/src/views/component/select/Region.vue"],names:[],mappings:"AACA,6BAA6B,yBAA0B,CACtD",file:"Region.vue",sourcesContent:["\n.region-container .el-select{max-width:130px !important\n}\n"],sourceRoot:""}])},221:function(e,t,i){var a=i(220);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);i(101)("b6222a90",a,!0)},222:function(e,t,i){i(221);var a=i(5)(i(219),i(223),null,null);e.exports=a.exports},223:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("section",{ref:"container",staticClass:"region-container"},[i("i",[e._v(e._s(e.title))]),e._v(" "),i("el-select",{attrs:{disabled:e.disabled,placeholder:"全部",clearable:""},on:{change:function(t){e.setCurrVal(0,e.provinceSelect)}},model:{value:e.provinceSelect,callback:function(t){e.provinceSelect=t},expression:"provinceSelect"}},e._l(e.provinces,function(e,t){return i("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),e._v(" "),i("el-select",{attrs:{disabled:e.disabled,placeholder:"全部",clearable:""},on:{change:function(t){e.setCurrVal(1,e.citySelect)}},model:{value:e.citySelect,callback:function(t){e.citySelect=t},expression:"citySelect"}},e._l(e.citys,function(e,t){return i("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),e._v(" "),i("el-select",{attrs:{disabled:e.disabled,placeholder:"全部",clearable:""},on:{change:function(t){e.setCurrVal(2,e.areaSelect)}},model:{value:e.areaSelect,callback:function(t){e.areaSelect=t},expression:"areaSelect"}},e._l(e.areas,function(e,t){return i("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),e._v(" "),i("el-select",{attrs:{disabled:e.disabled,placeholder:"全部",clearable:""},on:{change:function(t){e.setCurrVal(3,e.townSelect)}},model:{value:e.townSelect,callback:function(t){e.townSelect=t},expression:"townSelect"}},e._l(e.towns,function(e,t){return i("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),e._v(" "),i("el-select",{attrs:{disabled:e.disabled,placeholder:"全部",clearable:""},on:{change:function(t){e.setCurrVal(4,e.villageSelect)}},model:{value:e.villageSelect,callback:function(t){e.villageSelect=t},expression:"villageSelect"}},e._l(e.villages,function(e,t){return i("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1)},staticRenderFns:[]}},41:function(e,t,i){i(746);var a=i(5)(i(461),i(894),null,null);e.exports=a.exports},461:function(e,t,i){"use strict";function a(){return{gov_id:void 0,category:"",pid:"",province_id:"",city_id:"",area_id:"",town_id:"",village_id:"",name:"",concact:"",mobile:"",email:"",mobile_title:"",tel:"",zip:"",fax:"",url:"",address:"",description:""}}Object.defineProperty(t,"__esModule",{value:!0});var o=i(199),n=i(222),r=i.n(n),l=void 0;t.default={components:{Region:r.a},data:function(){return{govTypes:[{name:"政府",id:2}],formLabelWidth:"120px",form:a(),rules:{name:[{required:!0,message:"必填项",trigger:"blur"}],concact:[{message:"必填项",trigger:"blur"}],mobile:[{message:"必填项",trigger:"blur"}],email:[{message:"必填项",trigger:"blur"}],category:[{required:!0,message:"必填项"}]}}},computed:{govID:function(){return this.$route.params.id}},activated:function(){this.getGovInfo()},created:function(){this.getGovInfo()},methods:{submit:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;t.form=Object.assign(t.form,t.sign);var i=void 0,a=void 0;t.govID?(t.form.gov_id=t.govID,i=o.a.updateGov,a="修改成功"):(i=o.a.addGov,a="添加成功"),void 0!=t.$route.params.govinfo?t.form.pid=t.$route.params.govinfo.pid:t.form.pid=t.form.village_id||t.form.town_id||t.form.area_id||t.form.city_id||t.form.province_id,i(t.form).then(function(){xmview.showTip("success",a)}).then(function(){t.$router.push({name:"gov-index"})}).catch(function(e){xmview.showTip("error",e.message)})})},getData:function(){var e=this,t=!1;["province_id","city_id","area_id","town_id","village_id"].forEach(function(i,a){t&&(e.form[i]=null),e.form[i]==e.finallyVal&&(t=!0)})},getGovInfo:function(){var e=this;if(l=this,xmview.setContentLoading(!1),void 0==this.govID)return this.form=a(),!1;o.a.getGovInfo(this.govID).then(function(t){e.form=t,e.govID=e.govID})}}}},628:function(e,t,i){t=e.exports=i(100)(!0),t.push([e.i,".gov-operate-container{background:#fff;padding:20px 200px;overflow:auto}.gov-operate-container .addForm .tip{text-align:center;border-top:1px solid #ddd;color:red;line-height:50px}.gov-operate-container .dialog-footer{text-align:center}","",{version:3,sources:["/home/baichenhui/devspace/sys_ui/assets/src/views/gov/GovOperate.vue"],names:[],mappings:"AACA,uBAAuB,gBAAgB,mBAAmB,aAAa,CACtE,AACD,qCAAqC,kBAAkB,0BAA0B,UAAc,gBAAgB,CAC9G,AACD,sCAAsC,iBAAiB,CACtD",file:"GovOperate.vue",sourcesContent:["\n.gov-operate-container{background:#fff;padding:20px 200px;overflow:auto\n}\n.gov-operate-container .addForm .tip{text-align:center;border-top:1px solid #ddd;color:#ff0000;line-height:50px\n}\n.gov-operate-container .dialog-footer{text-align:center\n}\n"],sourceRoot:""}])},746:function(e,t,i){var a=i(628);"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);i(101)("3ec7de22",a,!0)},894:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("article",{staticClass:"gov-operate-container"},[i("section",[i("el-form",{ref:"form",staticClass:"addForm",attrs:{model:e.form,rules:e.rules,"label-width":e.formLabelWidth}},[i("el-form-item",{attrs:{prop:"category",label:"部门类型"}},[i("el-select",{model:{value:e.form.category,callback:function(t){e.form.category=t},expression:"form.category"}},e._l(e.govTypes,function(e,t){return i("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1),e._v(" "),i("el-form-item",{attrs:{label:"部门","label-width":e.formLabelWidth}},[i("Region",{attrs:{province:e.form.province_id,city:e.form.city_id,area:e.form.area_id,town:e.form.town_id,village:e.form.village_id,title:"",change:e.getData},on:{provinceChange:function(t){e.form.province_id=t,e.finallyVal=t},cityChange:function(t){e.form.city_id=t,e.finallyVal=t},areaChange:function(t){e.form.area_id=t,e.finallyVal=t},townChange:function(t){e.form.town_id=t,e.finallyVal=t},villageChange:function(t){e.form.village_id=t,e.finallyVal=t}}})],1),e._v(" "),i("el-form-item",{attrs:{prop:"name",label:"政府单位名称","label-width":e.formLabelWidth}},[i("el-input",{attrs:{"auto-complete":"off"},model:{value:e.form.name,callback:function(t){e.form.name=t},expression:"form.name"}})],1),e._v(" "),i("el-form-item",{attrs:{prop:"concact",label:"联系人","label-width":e.formLabelWidth}},[i("el-input",{attrs:{"auto-complete":"off"},model:{value:e.form.concact,callback:function(t){e.form.concact=t},expression:"form.concact"}})],1),e._v(" "),i("el-form-item",{attrs:{prop:"mobile",type:"number",label:"联系人手机","label-width":e.formLabelWidth}},[i("el-input",{attrs:{"auto-complete":"off"},model:{value:e.form.mobile,callback:function(t){e.form.mobile=t},expression:"form.mobile"}})],1),e._v(" "),i("el-form-item",{attrs:{prop:"email",label:"联系人邮箱","label-width":e.formLabelWidth}},[i("el-input",{attrs:{"auto-complete":"off"},model:{value:e.form.email,callback:function(t){e.form.email=t},expression:"form.email"}})],1),e._v(" "),i("el-form-item",{attrs:{prop:"tel",label:"电话","label-width":e.formLabelWidth}},[i("el-input",{attrs:{"auto-complete":"off"},model:{value:e.form.tel,callback:function(t){e.form.tel=t},expression:"form.tel"}})],1),e._v(" "),i("el-form-item",{attrs:{prop:"fax",label:"传真","label-width":e.formLabelWidth}},[i("el-input",{attrs:{"auto-complete":"off"},model:{value:e.form.fax,callback:function(t){e.form.fax=t},expression:"form.fax"}})],1),e._v(" "),i("el-form-item",{attrs:{prop:"address",label:"地址","label-width":e.formLabelWidth}},[i("el-input",{attrs:{"auto-complete":"off"},model:{value:e.form.address,callback:function(t){e.form.address=t},expression:"form.address"}})],1),e._v(" "),i("el-form-item",{attrs:{prop:"zip",label:"邮编","label-width":e.formLabelWidth}},[i("el-input",{attrs:{"auto-complete":"off"},model:{value:e.form.zip,callback:function(t){e.form.zip=t},expression:"form.zip"}})],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",slot:"footer"},[i("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submit("form")}}},[e._v("提交")])],1)],1)])},staticRenderFns:[]}}});
//# sourceMappingURL=16.02fd80053097ad7ec045.js.map