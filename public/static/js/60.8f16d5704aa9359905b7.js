webpackJsonp([60],{169:function(e,t,a){a(706),a(707);var i=a(5)(a(476),a(848),"data-v-6c95ab09",null);e.exports=i.exports},199:function(e,t,a){"use strict";(function(e){function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var n=a(6),o=a(0),l=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),r=o.a.apiHost+"/gov",c=function(){function t(){i(this,t)}return l(t,[{key:"getSelectList",value:function(e){var t=e.id,a=void 0===t?"":t,i=e.name,o=void 0===i?"":i,l=e.category,c=void 0===l?"":l,s=e.pagesize,d=void 0===s?"":s,u=e.page,p=void 0===u?"":u,v=e.pid,m=void 0===v?"":v,f=e.province_id,h=void 0===f?"":f,g=e.city_id,A=void 0===g?"":g,_=e.area_id,b=void 0===_?"":_,x=e.town_id,y=void 0===x?"":x,C=e.village_id,w=void 0===C?"":C,k=e.deleted,B=void 0===k?"":k,D=r+"/lists";return n.b(D,{id:a,name:o,category:c,page:p,pagesize:d,pid:m,province_id:h,city_id:A,area_id:b,town_id:y,village_id:w,deleted:B},!1).then(function(e){return e})}},{key:"postSelectList",value:function(e){var t=e.id,a=void 0===t?"":t,i=e.name,o=void 0===i?"":i,l=e.category,c=void 0===l?"":l,s=e.pagesize,d=void 0===s?"":s,u=e.page,p=void 0===u?"":u,v=e.pid,m=void 0===v?"":v,f=e.province_id,h=void 0===f?"":f,g=e.city_id,A=void 0===g?"":g,_=e.area_id,b=void 0===_?"":_,x=e.town_id,y=void 0===x?"":x,C=e.village_id,w=void 0===C?"":C,k=e.deleted,B=void 0===k?"":k,D=r+"/lists";return n.a(D,{id:a,name:o,category:c,page:p,pagesize:d,pid:m,province_id:h,city_id:A,area_id:b,town_id:y,village_id:w,deleted:B},!1).then(function(e){return e.data})}},{key:"getGovInfo",value:function(e){var t=r+"/get/"+e;return n.b(t).then(function(e){if(0==e.code)return e.data})}},{key:"addGov",value:function(t){var a=t.category,i=t.pid,o=t.province_id,l=t.city_id,c=t.area_id,s=t.town_id,d=t.village_id,u=t.name,p=t.concact,v=t.mobile,m=t.email,f=t.mobile_title,h=t.tel,g=t.zip,A=t.fax,_=t.url,b=t.address,x=t.description,y=r+"/create";return n.a(y,{category:a,pid:i,province_id:o,city_id:l,area_id:c,town_id:s,village_id:d,name:u,concact:p,mobile:v,email:m,mobile_title:f,tel:h,zip:g,fax:A,url:_,address:b,description:x}).then(function(t){if(t.code)return e.reject(t)})}},{key:"editGov",value:function(e){var t=r+"/edit/"+e;return n.b(t).then(function(e){return e.data})}},{key:"updateGov",value:function(t){var a=t.gov_id,i=t.category,o=t.pid,l=t.province_id,c=t.city_id,s=t.area_id,d=t.town_id,u=t.village_id,p=t.name,v=t.concact,m=t.mobile,f=t.email,h=t.mobile_title,g=t.tel,A=t.zip,_=t.fax,b=t.url,x=t.address,y=t.description,C=r+"/edit/"+a;return n.a(C,{category:i,pid:o,province_id:l,city_id:c,area_id:s,town_id:d,village_id:u,name:p,concact:v,mobile:m,email:f,mobile_title:h,tel:g,zip:A,fax:_,url:b,address:x,description:y}).then(function(t){if(t.code)return e.reject(t)})}},{key:"govAdminList",value:function(e){var t=e.name,a=e.gov_id,i=e.page,l=e.pagesize,r=e.role_id,c=e.mobile,s=e.active,d=o.a.apiHost+"/user/lists";return n.b(d,{name:t,gov_id:a,page:i,pagesize:l,role_id:r,mobile:c,active:s}).then(function(e){return e})}},{key:"govAdmin",value:function(e){var t=e.name,a=e.gov_id,i=e.page,l=e.pagesize,r=o.a.apiHost+"/user/get/"+a;return n.b(r,{name:t,page:i,pagesize:l}).then(function(e){return e.data})}},{key:"addGovAdmin",value:function(t){var a=o.a.apiHost+"/user/create";return n.a(a,t).then(function(t){if(t.code)return e.reject(t)})}},{key:"delAdmin",value:function(e){var t=e.id,a=o.a.apiHost+"/user/delete/"+t;return n.a(a)}},{key:"a",value:function(t){var a=t.pagesize,i=t.page,o=r+"/lists";return n.b(o,{pagesize:a,page:i}).then(function(t){return 0==t.code?t:e.reject(t)})}},{key:"getAdminInfo",value:function(t){var a=r+"/view/"+t;return n.b(a,{},!1).then(function(t){return 0==t.code?t.data:e.reject(t)})}},{key:"create",value:function(t){var a=t.role_id,i=t.name,o=t.mobile,l=t.email,c=t.password,s=r+"/create";return n.a(s,{role_id:a,name:i,mobile:o,email:l,password:c}).then(function(t){return 0==t.code?t.data:(xmview.showTip("error",t.message),e.reject(t))})}},{key:"update",value:function(t){var a=t.id,i=t.role_id,o=t.name,l=t.mobile,c=t.email,s=t.password,d=t.sex,u=t.avatar,p=t.address,v=r+"/update/"+a;return n.a(v,{role_id:i,name:o,mobile:l,email:c,password:s,sex:d,avatar:u,address:p}).then(function(t){if(t.code)return e.reject(t)})}},{key:"deleteGov",value:function(t){var a=r+"/delete/"+t;return n.a(a,{}).then(function(t){return 0==t.code?(xmview.showTip("success",t.message),t.data):(xmview.showTip("error",t.message),e.reject(t))})}},{key:"delete",value:function(t){var a=r+"/delete/"+t;return n.a(a,{}).then(function(t){if(t.code)return e.reject(t)})}},{key:"deleteMulty",value:function(e){var t=r+"/batchdel";return n.c(t,{ids:e})}},{key:"moveToCategoryMulty",value:function(e){var t=e.ids,a=e.category_id,i=r+"/batchmove";return n.c(i,{ids:t,category_id:a})}},{key:"setLesson",value:function(t){var a=t.id,i=t.data,o=r+"/"+a+"/setlesson";return n.c(o,i).then(function(t){if(t.code)return e.reject(t)})}},{key:"offline",value:function(e){var t=e.id,a=e.role_id,i=e.name,o=e.mobile,l=e.email,c=e.password,s=e.sex,d=e.avatar,u=e.address,p=e.disabled,v=r+"/update/"+t;return n.a(v,{id:t,role_id:a,name:i,mobile:o,email:l,password:c,sex:s,avatar:d,address:u,disabled:p})}},{key:"online",value:function(e){var t=r+"/update/"+e;return n.a(t,{disabled:0})}},{key:"getUploadUrl",value:function(e){var t=e.image,a=e.alias,i=r+"/upload";return n.a(i,{image:t,alias:a}).then(function(e){return e.data})}},{key:"getCompanyManageStat",value:function(){var e=r+"/user/loginlog/lists";return n.b(e).then(function(e){return e.data})}},{key:"getUserLoginlog",value:function(e){var t=e.page,a=e.pagesize,i=e.name,l=void 0===i?"":i,r=e.user_name,c=void 0===r?"":r,s=e.gov_id,d=e.role_id,u=void 0===d?"":d,p=e.date_start,v=void 0===p?"":p,m=e.date_end,f=void 0===m?"":m,h=o.a.apiHost+"/user/loginlog/lists";return n.b(h,{page:t,pagesize:a,name:l,user_name:c,gov_id:s,role_id:u,date_start:v,date_end:f}).then(function(e){return e})}},{key:"getReportUserlogin",value:function(e){var t=e.page,a=e.pagesize,i=e.name,l=void 0===i?"":i,r=e.user_name,c=void 0===r?"":r,s=e.gov_id,d=e.role_id,u=void 0===d?"":d,p=e.date_start,v=void 0===p?"":p,m=e.date_end,f=void 0===m?"":m,h=e.level,g=o.a.apiHost+"/report/userlogin/lists";return n.b(g,{page:t,pagesize:a,name:l,user_name:c,gov_id:s,role_id:u,date_start:v,date_end:f,level:h}).then(function(e){return e})}},{key:"getCourseHistory",value:function(e){var t=e.page,a=e.pagesize,i=e.user_id,o=e.gov_id,l=e.category_id,c=e.course_id,s=e.date_start,d=e.date_end,u=r+"/course/history/lists";return n.b(u,{page:t,pagesize:a,user_id:i,gov_id:o,category_id:l,course_id:c,date_start:s,date_end:d}).then(function(e){return e})}},{key:"getCompanyStatChart",value:function(e){var t=e.gov_id,a=e.date_start,i=e.date_end,o=r+"/stat/chart";return n.b(o,{gov_id:t,date_start:a,date_end:i}).then(function(e){return e.data})}}]),t}();t.a=new c}).call(t,a(1))},219:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=(a(14),a(199));t.default={props:["change","title","province","city","area","town","village","disabled"],data:function(){return{provinces:[],citys:[],areas:[],towns:[],villages:[],provinceSelect:"",citySelect:"",areaSelect:"",townSelect:"",villageSelect:"",curItem:[],cityData:"",options:[],fetchParam:{pagesize:-1,pid:0,province_id:null,city_id:null,area_id:null,town_id:null,village_id:null}}},watch:{province:function(e){e?(this.provinceSelect=e,this.currentVal(0,e)):this.provinceSelect=""},city:function(e){this.province&&e?(this.citySelect=e,this.currentVal(1,e)):this.citySelect=""},area:function(e){this.province&&this.citySelect&&e?(this.areaSelect=e,this.currentVal(2,e)):this.areaSelect=""},town:function(e){this.province&&this.citySelect&&this.areaSelect&&e?(this.townSelect=e,this.currentVal(3,e)):this.townSelect=""},village:function(e){this.province&&this.citySelect&&this.areaSelect&&this.townSelect&&e?(this.villageSelect=e,this.currentVal(4,e)):this.villageSelect=""},disabled:function(e){e&&(this.provinceSelect="")}},created:function(){},mounted:function(){this.getData(this.fetchParam.pid,"provinces")},methods:{getData:function(e,t){var a=this;void 0!==this.fetchParam.provinceSelect&&(this.fetchParam.pid=this.fetchParam.villageSelect||this.fetchParam.townSelect||this.fetchParam.areaSelect||this.fetchParam.citySelect||this.fetchParam.provinceSelect),this.loading=!0,i.a.getSelectList({pagesize:-1,pid:e,province_id:this.fetchParam.provinceSelect,city_id:this.fetchParam.citySelect,area_id:this.fetchParam.areaSelect,town_id:this.fetchParam.townSelect,village_id:this.fetchParam.villageSelect}).then(function(e){a.cityData=e.data;var i=[];a.cityData.forEach(function(e){i.push({data:e,name:e.name,id:e.id})}),a[t]=i}).then(function(){a.loading=!1})},currentVal:function(e,t){var a=["provinceSelect","citySelect","areaSelect","townSelect","villageSelect"],i=["provinces","citys","areas","towns","villages"];this[a[e]]&&([this[a[e]]],e<a.length-1&&this.getData(t,i[e+1]))},setCurrVal:function(e,t){var a=["provinceChange","cityChange","areaChange","townChange","villageChange"];this.$emit(a[e],t),this.$store.dispatch("saveGovRank",{"emitArr[type]":t}),t?this.change&&this.change():this.change&&this.change(!0)}}}},220:function(e,t,a){t=e.exports=a(100)(!0),t.push([e.i,".region-container .el-select{max-width:130px!important}","",{version:3,sources:["/home/baichenhui/devspace/sys_ui/assets/src/views/component/select/Region.vue"],names:[],mappings:"AACA,6BAA6B,yBAA0B,CACtD",file:"Region.vue",sourcesContent:["\n.region-container .el-select{max-width:130px !important\n}\n"],sourceRoot:""}])},221:function(e,t,a){var i=a(220);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a(101)("b6222a90",i,!0)},222:function(e,t,a){a(221);var i=a(5)(a(219),a(223),null,null);e.exports=i.exports},223:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",{ref:"container",staticClass:"region-container"},[a("i",[e._v(e._s(e.title))]),e._v(" "),a("el-select",{attrs:{disabled:e.disabled,placeholder:"全部",clearable:""},on:{change:function(t){e.setCurrVal(0,e.provinceSelect)}},model:{value:e.provinceSelect,callback:function(t){e.provinceSelect=t},expression:"provinceSelect"}},e._l(e.provinces,function(e,t){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),e._v(" "),a("el-select",{attrs:{disabled:e.disabled,placeholder:"全部",clearable:""},on:{change:function(t){e.setCurrVal(1,e.citySelect)}},model:{value:e.citySelect,callback:function(t){e.citySelect=t},expression:"citySelect"}},e._l(e.citys,function(e,t){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),e._v(" "),a("el-select",{attrs:{disabled:e.disabled,placeholder:"全部",clearable:""},on:{change:function(t){e.setCurrVal(2,e.areaSelect)}},model:{value:e.areaSelect,callback:function(t){e.areaSelect=t},expression:"areaSelect"}},e._l(e.areas,function(e,t){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),e._v(" "),a("el-select",{attrs:{disabled:e.disabled,placeholder:"全部",clearable:""},on:{change:function(t){e.setCurrVal(3,e.townSelect)}},model:{value:e.townSelect,callback:function(t){e.townSelect=t},expression:"townSelect"}},e._l(e.towns,function(e,t){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),e._v(" "),a("el-select",{attrs:{disabled:e.disabled,placeholder:"全部",clearable:""},on:{change:function(t){e.setCurrVal(4,e.villageSelect)}},model:{value:e.villageSelect,callback:function(t){e.villageSelect=t},expression:"villageSelect"}},e._l(e.villages,function(e,t){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1)},staticRenderFns:[]}},263:function(e,t,a){"use strict";(function(e){function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var n=a(6),o=a(0),l=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),r=o.a.apiHost+"/user",c=function(){function t(){i(this,t)}return l(t,[{key:"fetchData",value:function(t){var a=t.pagesize,i=t.page,o=t.name,l=t.mobile,c=t.role_id,s=t.active,d=t.province_id,u=t.city_id,p=t.area_id,v=t.town_id,m=t.village_id,f=t.no_empty_gov_id,h=r+"/lists";return n.b(h,{pagesize:a,page:i,name:o,mobile:l,role_id:c,active:s,province_id:d,city_id:u,area_id:p,town_id:v,village_id:m,no_empty_gov_id:f}).then(function(t){return 0==t.code?t:e.reject(t)})}},{key:"getAdminInfo",value:function(t){var a=r+"/get/"+t;return n.b(a,{},!1).then(function(t){return 0==t.code?t.data:e.reject(t)})}},{key:"create",value:function(e){var t=e.role_id,a=e.gov_id,i=e.name,o=e.nickname,l=e.mobile,c=(e.email,e.passwd),s=e.province_id,d=e.city_id,u=e.area_id,p=e.town_id,v=e.village_id,m=r+"/create";return n.a(m,{role_id:t,gov_id:a,name:i,nickname:o,mobile:l,passwd:c,province_id:s,city_id:d,area_id:u,town_id:p,village_id:v}).then(function(e){return e})}},{key:"update",value:function(e){var t=e.id,a=e.role_id,i=e.avatar,o=e.passwd,l=e.gov_id,c=e.name,s=e.nickname,d=e.mobile,u=(e.email,e.sex),p=e.address,v=e.province_id,m=e.city_id,f=e.area_id,h=e.town_id,g=e.village_id,A=r+"/edit/"+t;return n.a(A,{role_id:a,avatar:i,passwd:o,gov_id:l,name:c,nickname:s,mobile:d,sex:u,address:p,province_id:v,city_id:m,area_id:f,town_id:h,village_id:g}).then(function(e){return e})}},{key:"delete",value:function(t){var a=r+"/delete/"+t;return n.a(a,{}).then(function(t){if(t.code)return e.reject(t)})}},{key:"deleteMulty",value:function(e){var t=r+"/batchdel";return n.c(t,{ids:e})}},{key:"moveToCategoryMulty",value:function(e){var t=e.ids,a=e.category_id,i=r+"/batchmove";return n.c(i,{ids:t,category_id:a})}},{key:"setLesson",value:function(t){var a=t.id,i=t.data,o=r+"/"+a+"/setlesson";return n.c(o,i).then(function(t){if(t.code)return e.reject(t)})}},{key:"offline",value:function(e){var t=e.id,a=e.disabled,i=r+"/edit/"+t;return n.a(i,{disabled:a})}},{key:"online",value:function(e){var t=e.id,a=e.disabled,i=r+"/edit/"+t;return n.a(i,{disabled:a})}},{key:"getUploadUrl",value:function(e){var t=e.image,a=e.alias,i=r+"/upload";return n.a(i,{image:t,alias:a}).then(function(e){return e.data})}},{key:"delUser",value:function(t){var a=o.a.apiHost+"/gov/clean"+t;return n.a(a,{}).then(function(t){return 0==t.code?(xmview.showTip("success",t.message),t.data):(xmview.showTip("error",t.message),e.reject(t))})}}]),t}();t.a=new c}).call(t,a(1))},343:function(e,t,a){"use strict";function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var n=a(6),o=a(0),l=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),r=o.a.apiHost+"/user",c=function(){function e(){i(this,e)}return l(e,[{key:"userDetail",value:function(e){var t=r+"/get/"+e;return n.b(t).then(function(e){return e.data})}},{key:"getUserList",value:function(e){var t=e.page,a=void 0===t?"":t,i=e.page_size,o=void 0===i?"":i,l=e.company_id,c=void 0===l?"":l,s=e.keyword,d=void 0===s?"":s,u=e.mobile,p=void 0===u?"":u,v=e.email,m=void 0===v?"":v,f=e.user_type,h=void 0===f?"":f,g=e.time_start,A=void 0===g?"":g,_=e.time_end,b=void 0===_?"":_,x=e.last_appstart,y=void 0===x?"":x,C=e.nologin_timestart,w=void 0===C?"":C,k=r+"/search";return n.b(k,{page:a,page_size:o,company_id:c,keyword:d,mobile:p,email:m,user_type:h,time_start:A,time_end:b,last_appstart:y,nologin_timestart:w}).then(function(e){return e.data})}},{key:"getCompanyState",value:function(e){var t=e.page,a=void 0===t?"":t,i=e.page_size,o=void 0===i?"":i,l=e.time_start,c=void 0===l?"":l,s=r+"/stat/search";return n.b(s,{page:a,page_size:o,time_start:c}).then(function(e){return e.data})}},{key:"getAreaState",value:function(e){var t=e.page,a=void 0===t?"":t,i=e.page_size,o=void 0===i?"":i,l=e.time_start,c=void 0===l?"":l,s=r+"/stat/area/search";return n.b(s,{page:a,page_size:o,time_start:c}).then(function(e){return e.data})}}]),e}();t.a=new c},476:function(e,t,a){"use strict";function i(){return{status:-1,page:1,pagesize:15,disabled:0,name:name,mobile:void 0,role_id:void 0,gov_id:void 0,provinceSelect:"",citySelect:"",areaSelect:"",townSelect:"",villageSelect:"",province_id:"",city_id:"",area_id:"",town_id:"",village_id:"",active:-1,no_empty_gov_id:1}}function n(){return{role_id:void 0,gov_id:void 0,name:"",mobile:"",passwd:"",nickname:"",gov_name:""}}Object.defineProperty(t,"__esModule",{value:!0});var o=a(263),l=(a(199),a(343)),r=a(222),c=a.n(r);t.default={components:{Region:c.a},data:function(){var e=function(e,t,a){(t||"").match(/^1[3456789]\d{9}$/)||a(new Error("请填写正确的手机号")),a()};return{roleTypes:[{name:"管理员",role_id:1},{name:"部门人员",role_id:0}],loadingData:!1,data:[],dataCache:[],total:0,name:"",dialogVisible:!1,selectedIds:[],fetchParam:i(),dialogTree:{isShow:!1,selectedId:void 0},showDetail:!1,clerkDetail:{name:"",mobile:"",pass:"",address:"",sex:0,birthday:"",addate:""},form:n(),rules:{department_id:[{type:"number",required:!0,message:"必须填写",trigger:"blur"}],name:[{required:!0,message:"必须填写",trigger:"blur"}],mobile:[{required:!0,message:"必须填写",trigger:"blur"},{validator:e,trigger:"blur"}],passwd:[{required:!0,message:"必须填写",trigger:"blur"}]},addForm:!1,formLabelWidth:"120px"}},activated:function(){this.fetchData()},methods:{addAdmin:function(){this.$router.push({name:"person-add"})},submit:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;o.a.create(t.form).then(function(e){xmview.showTip("success","添加成功")}).then(function(){t.addForm=!1,t.getData(),t.page=1})})},editUser:function(e,t){this.$router.push({name:"person-edit",params:{id:t.id,role_id:t.role_id,userinfo:t}})},checkClerkDetail:function(e,t){var a=this;this.showDetail=!0,l.a.userDetail(t.id).then(function(e){a.clerkDetail=e})},userInfo:function(){return authUtils.getUserInfo()},initFetchParam:function(){this.fetchParam=i()},handleCurrentChange:function(e){this.fetchParam.page=e,this.fetchData()},handleSizeChange:function(e){this.fetchParam.pagesize=e,this.fetchData()},fetchData:function(e){var t=this,a=!1,i=void 0,n=["provinceSelect","citySelect","areaSelect","townSelect","villageSelect"];return n.forEach(function(e,n){a&&(t.fetchParam[e]=null),t.fetchParam[e]==t.finallyVal&&(a=!0,i=n)}),this.fetchParam.gov_id=i>0?e?this.fetchParam[n[i-1]]:this.fetchParam[n[i]]:this.finallyVal,this.fetchParam.provinceSelect||this.fetchParam.citySelect||this.fetchParam.areaSelect||this.fetchParam.townSelect||this.fetchParam.villageSelect||(this.fetchParam.gov_id=-1),this.loadingData=!0,null==this.fetchParam.role_id&&(this.fetchParam.role_id=-1),this.fetchParam.province_id=this.fetchParam.provinceSelect,this.fetchParam.city_id=this.fetchParam.citySelect,this.fetchParam.area_id=this.fetchParam.areaSelect,this.fetchParam.town_id=this.fetchParam.townSelect,this.fetchParam.village_id=this.fetchParam.villageSelect,o.a.fetchData(this.fetchParam).then(function(e){t.dataCache=e.data,t.total=e._exts.total,t.loadingData=!1,xmview.setContentLoading(!1)})},search:function(e){return o.a.search(this.fetchParam).then(function(e){})},selectRow:function(e){var t=[];e.forEach(function(e){t.push(e.id)}),this.selectedIds=t},offline:function(e,t){0==t.deleted?xmview.showDialog('你将要禁用 <span style="color:red">'+t.name+"</span> 确认吗?",function(){t.disabled=1,o.a.offline(t).then(function(e){})}):xmview.showDialog(' <span style="color:red">'+t.name+"</span> 已删除，无法禁用！")},online:function(e,t){0==t.deleted?xmview.showDialog('你将要启用<span style="color:red">'+t.name+"</span> 确认吗?",function(){t.disabled=0,o.a.online(t).then(function(e){})}):xmview.showDialog(' <span style="color:red">'+t.name+"</span> 已删除，无法启用！")},del:function(e,t){var a=this;xmview.showDialog('你将要删除 <span style="color:red">'+t.name+"</span>  此操作不可恢复确认吗?",function(){o.a.delete(t.id).then(function(){a.dataCache.splice(e,1),t.deleted=1,xmview.showTip("success","操作成功")})})},delMulti:function(){var e=this;xmview.showDialog("你将要删除选中的项目，操作不可恢复确认吗?",function(){o.a.deleteMulty(e.selectedIds.join(",")).then(function(){xmview.showTip("success","操作成功"),e.dialogTree.isShow=!1,setTimeout(function(){e.fetchData()},300)})})},Time:function(e,t,a){return this.timeFilter(e.addate)},timeFilter:function(e){var t=void 0;return this.dataCache.forEach(function(a){t=e.split(" ")[0]},this),t}},computed:{tableData:function(){var e=this;return this.dataCache.filter(function(t){return t.name.indexOf(e.name)>=0})}}}},588:function(e,t,a){t=e.exports=a(100)(!0),t.push([e.i,'#medical-index-container{padding:15px;position:relative;border:1px solid #ededed;border-radius:5px;background:#fff}#medical-index-container:after{content:"";clear:both;display:block}#medical-index-container .pagin{float:right;margin-top:15px}#medical-index-container .manage-container{position:absolute;right:0;top:-50px}#medical-index-container .header-button.manage-container>.el-button i{margin-right:5px}#medical-index-container .header-button.manage-container>.el-button i:before{position:relative;top:-1px}.text-blue{color:#20a0ff}.text-light-blue{color:#58b7ff}.text-dark-blue{color:#1d8ce0}.text-success{color:#13ce66}.text-warning{color:#f7ba2a}.text-danger{color:#ff4949}#medical-index-container .search>section{margin-bottom:14px;display:inline-block;margin-right:10px}#medical-index-container .search>section>span,#medical-index-container .search>section i{margin-right:2px}#medical-index-container .search>section>*{vertical-align:middle;display:inline-block}#medical-index-container .search .el-input{width:auto}.keyword-container{width:90%;margin-left:5%;margin-bottom:5px}.show-detail .el-dialog__body{display:-ms-flexbox;display:flex;-webkit-display:flex;-moz-display:flex}.show-detail .avatar{-ms-flex-positive:0;flex-grow:0;-webkit-flex-grow:0;-moz-flex-grow:0;border:1px solid #ededed;width:150px;height:130px}.show-detail .avatar img{width:100%;height:100%}.show-detail .info{-ms-flex-positive:1;flex-grow:1;-webkit-flex-grow:1;-moz-flex-grow:1;text-align:left;padding:20px}.show-detail .info h2{margin-bottom:10px;padding-left:100px}.show-detail .info p{line-height:35px}.show-detail .info p>*{display:inline-block;vertical-align:top}.show-detail .info p i.title{width:25%;margin-right:10px;text-align:right}.show-detail .info p span.value{width:70%;text-align:left}.show-detail .info p span.value>i{margin-right:5px}.show-detail .info p span.value>img{width:150px;cursor:pointer}.show-detail .info>p.select{margin-top:10px}.show-detail .info>p.select .el-select,.show-detail .info>p.select .el-textarea{display:inline-block;width:58%;vertical-align:top}#medical-index-container .info .gov{font-size:15px;font-weight:900}#medical-index-container .manage-container>*{color:#fff;border-radius:5px}#medical-index-container .manage-container .add{background:#0cf}#medical-index-container .manage-container .catmange{background:#96c}#medical-index-container .manage-container h3{font-size:12px}#medical-index-container .bottom-manage{margin-top:15px}#medical-index-container .el-dialog__wrapper{padding-top:15px;background:rgba(0,0,0,.5);z-index:1000}',"",{version:3,sources:["/home/baichenhui/devspace/sys_ui/assets/src/views/gov/user/Index.vue"],names:[],mappings:"AACA,yBAAyB,aAAa,kBAAkB,yBAAyB,kBAAkB,eAAe,CACjH,AACD,+BAA+B,WAAW,WAAW,aAAa,CACjE,AACD,gCAAgC,YAAY,eAAe,CAC1D,AAGD,2CAA2C,kBAAkB,QAAQ,SAAS,CAC7E,AACD,sEAAsE,gBAAgB,CACrF,AACD,6EAA6E,kBAAkB,QAAQ,CACtG,AACD,WAAW,aAAa,CACvB,AACD,iBAAiB,aAAa,CAC7B,AACD,gBAAgB,aAAa,CAC5B,AACD,cAAc,aAAa,CAC1B,AACD,cAAc,aAAa,CAC1B,AACD,aAAa,aAAa,CACzB,AACD,yCAAyC,mBAAmB,qBAAqB,iBAAiB,CACjG,AACD,yFAAyF,gBAAgB,CACxG,AACD,2CAA2C,sBAAsB,oBAAoB,CACpF,AACD,2CAA2C,UAAU,CACpD,AACD,mBAAmB,UAAU,eAAe,iBAAiB,CAC5D,AACD,8BAA8B,oBAAoB,aAAa,qBAAqB,iBAAiB,CACpG,AACD,qBAAqB,oBAAoB,YAAY,oBAAoB,iBAAiB,yBAAyB,YAAY,YAAY,CAC1I,AACD,yBAAyB,WAAW,WAAW,CAC9C,AACD,mBAAmB,oBAAoB,YAAY,oBAAoB,iBAAiB,gBAAgB,YAAY,CACnH,AACD,sBAAsB,mBAAmB,kBAAkB,CAC1D,AACD,qBAAqB,gBAAgB,CACpC,AACD,uBAAuB,qBAAqB,kBAAkB,CAC7D,AACD,6BAA6B,UAAU,kBAAkB,gBAAgB,CACxE,AACD,gCAAgC,UAAU,eAAe,CACxD,AACD,kCAAkC,gBAAgB,CACjD,AACD,oCAAoC,YAAY,cAAc,CAC7D,AACD,4BAA4B,eAAe,CAC1C,AACD,gFAAgF,qBAAqB,UAAU,kBAAkB,CAChI,AACD,oCAAoC,eAAe,eAAe,CACjE,AACD,6CAA6C,WAAW,iBAAiB,CACxE,AACD,gDAAgD,eAAe,CAC9D,AACD,qDAAqD,eAAe,CACnE,AACD,8CAA8C,cAAc,CAC3D,AACD,wCAAwC,eAAe,CACtD,AACD,6CAA6C,iBAAiB,0BAA2B,YAAY,CACpG",file:"Index.vue",sourcesContent:["\n#medical-index-container{padding:15px;position:relative;border:1px solid #ededed;border-radius:5px;background:#fff\n}\n#medical-index-container:after{content:'';clear:both;display:block\n}\n#medical-index-container .pagin{float:right;margin-top:15px\n}\n#medical-index-container .bottom-manage{margin-top:15px\n}\n#medical-index-container .manage-container{position:absolute;right:0;top:-50px\n}\n#medical-index-container .header-button.manage-container>.el-button i{margin-right:5px\n}\n#medical-index-container .header-button.manage-container>.el-button i:before{position:relative;top:-1px\n}\n.text-blue{color:#20A0FF\n}\n.text-light-blue{color:#58B7FF\n}\n.text-dark-blue{color:#1D8CE0\n}\n.text-success{color:#13CE66\n}\n.text-warning{color:#F7BA2A\n}\n.text-danger{color:#FF4949\n}\n#medical-index-container .search>section{margin-bottom:14px;display:inline-block;margin-right:10px\n}\n#medical-index-container .search>section>span,#medical-index-container .search>section i{margin-right:2px\n}\n#medical-index-container .search>section>*{vertical-align:middle;display:inline-block\n}\n#medical-index-container .search .el-input{width:auto\n}\n.keyword-container{width:90%;margin-left:5%;margin-bottom:5px\n}\n.show-detail .el-dialog__body{display:-ms-flexbox;display:flex;-webkit-display:flex;-moz-display:flex\n}\n.show-detail .avatar{-ms-flex-positive:0;flex-grow:0;-webkit-flex-grow:0;-moz-flex-grow:0;border:1px solid #ededed;width:150px;height:130px\n}\n.show-detail .avatar img{width:100%;height:100%\n}\n.show-detail .info{-ms-flex-positive:1;flex-grow:1;-webkit-flex-grow:1;-moz-flex-grow:1;text-align:left;padding:20px\n}\n.show-detail .info h2{margin-bottom:10px;padding-left:100px\n}\n.show-detail .info p{line-height:35px\n}\n.show-detail .info p>*{display:inline-block;vertical-align:top\n}\n.show-detail .info p i.title{width:25%;margin-right:10px;text-align:right\n}\n.show-detail .info p span.value{width:70%;text-align:left\n}\n.show-detail .info p span.value>i{margin-right:5px\n}\n.show-detail .info p span.value>img{width:150px;cursor:pointer\n}\n.show-detail .info>p.select{margin-top:10px\n}\n.show-detail .info>p.select .el-select,.show-detail .info>p.select .el-textarea{display:inline-block;width:58%;vertical-align:top\n}\n#medical-index-container .info .gov{font-size:15px;font-weight:900\n}\n#medical-index-container .manage-container>*{color:#fff;border-radius:5px\n}\n#medical-index-container .manage-container .add{background:#0cf\n}\n#medical-index-container .manage-container .catmange{background:#96c\n}\n#medical-index-container .manage-container h3{font-size:12px\n}\n#medical-index-container .bottom-manage{margin-top:15px\n}\n#medical-index-container .el-dialog__wrapper{padding-top:15px;background:rgba(0,0,0,0.5);z-index:1000\n}\n"],sourceRoot:""}])},589:function(e,t,a){t=e.exports=a(100)(!0),t.push([e.i,".wei_icon[data-v-6c95ab09]{width:20px;height:20px;float:right;margin-top:3px;display:inline-block;background-image:url("+a(757)+");background-size:100% 100%}","",{version:3,sources:["/home/baichenhui/devspace/sys_ui/assets/src/views/gov/user/Index.vue"],names:[],mappings:"AACA,2BACC,WAAY,AACZ,YAAa,AACb,YAAa,AACb,eAAgB,AAChB,qBAAsB,AACtB,+CAAyD,AACzD,yBAA2B,CAC3B",file:"Index.vue",sourcesContent:["\n.wei_icon[data-v-6c95ab09]{\n\twidth: 20px;\n\theight: 20px;\n\tfloat: right;\n\tmargin-top: 3px;\n\tdisplay: inline-block;\n\tbackground-image: url(../../../assets/images/weixin.png);\n\tbackground-size: 100% 100%;\n}\n\n"],sourceRoot:""}])},706:function(e,t,a){var i=a(588);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a(101)("058b8948",i,!0)},707:function(e,t,a){var i=a(589);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a(101)("17c0738a",i,!0)},757:function(e,t,a){e.exports=a.p+"static/img/weixin.37bb25e.png"},848:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("article",{attrs:{id:"medical-index-container"}},[a("el-dialog",{staticClass:"show-detail",attrs:{title:"查看管理员"},model:{value:e.showDetail,callback:function(t){e.showDetail=t},expression:"showDetail"}},[a("div",{staticClass:"avatar"},[a("img",{attrs:{src:e._f("defaultAvatar")({url:e.clerkDetail.avatar,sex:e.clerkDetail.sex})}})]),e._v(" "),a("div",{staticClass:"info"},[a("h2",[e._v(e._s(e.clerkDetail.name))]),e._v(" "),a("p",{staticClass:"gov"},[a("i",{staticClass:"title"},[e._v("所属部门：")]),a("span",{staticClass:"value"},[e._v(e._s(e.clerkDetail.gov_name))])]),e._v(" "),e.clerkDetail.province_name?a("p",[a("i",{staticClass:"title"},[e._v("所属省份：")]),a("span",{staticClass:"value"},[e._v(e._s(e.clerkDetail.province_name))])]):e._e(),e._v(" "),e.clerkDetail.city_name?a("p",[a("i",{staticClass:"title"},[e._v("所属城市：")]),a("span",{staticClass:"value"},[e._v(e._s(e.clerkDetail.city_name))])]):e._e(),e._v(" "),e.clerkDetail.area_name?a("p",[a("i",{staticClass:"title"},[e._v("区（县）：")]),a("span",{staticClass:"value"},[e._v(e._s(e.clerkDetail.area_name))])]):e._e(),e._v(" "),e.clerkDetail.town_name?a("p",[a("i",{staticClass:"title"},[e._v("所属镇：")]),a("span",{staticClass:"value"},[e._v(e._s(e.clerkDetail.town_name))])]):e._e(),e._v(" "),e.clerkDetail.village_name?a("p",[a("i",{staticClass:"title"},[e._v("所属村：")]),a("span",{staticClass:"value"},[e._v(e._s(e.clerkDetail.village_name))])]):e._e(),e._v(" "),e.clerkDetail.mobile?a("p",[a("i",{staticClass:"title"},[e._v("手机号：")]),e._v(" "),a("span",{staticClass:"value"},[e._v(e._s(e.clerkDetail.mobile))])]):e._e(),e._v(" "),a("p",[a("i",{staticClass:"title"},[e._v("状态：")]),e._v(" "),a("span",{staticClass:"value"},[0==e.clerkDetail.disabled?a("el-tag",{attrs:{type:"success"}},[e._v("正常")]):1==e.clerkDetail.disabled?a("el-tag",{attrs:{type:"danger"}},[e._v("异常")]):1==e.clerkDetail.deleted?a("el-tag",[e._v("已删除")]):e._e()],1)]),e._v(" "),a("p",[a("i",{staticClass:"title"},[e._v("地址：")]),e._v(" "),a("span",{staticClass:"value"},[e._v(e._s(e.clerkDetail.address))])]),e._v(" "),a("p",[a("i",{staticClass:"title"},[e._v("注册时间：")]),a("span",{staticClass:"value"},[e._v(e._s(e.clerkDetail.addate))])])])]),e._v(" "),a("el-dialog",{model:{value:e.addForm,callback:function(t){e.addForm=t},expression:"addForm"}},[a("el-form",{ref:"form",attrs:{model:e.form,rules:e.rules}},[a("el-form-item",{attrs:{prop:"gov_name",label:"所属部门","label-width":e.formLabelWidth}},[a("h3",[e._v(e._s(e.form.gov_name))])]),e._v(" "),a("el-form-item",{attrs:{prop:"name",label:"姓名","label-width":e.formLabelWidth}},[a("el-input",{attrs:{placeholder:"部门人员姓名","auto-complete":"off"},model:{value:e.form.name,callback:function(t){e.form.name=t},expression:"form.name"}})],1),e._v(" "),a("el-form-item",{attrs:{prop:"role_id",label:"角色","label-width":e.formLabelWidth}},[a("el-select",{attrs:{clearable:"",placeholder:"未选择"},model:{value:e.form.role_id,callback:function(t){e.form.role_id=t},expression:"form.role_id"}},e._l(e.roleTypes,function(e,t){return a("el-option",{key:e.role_id,attrs:{label:e.name,value:e.role_id}})}))],1),e._v(" "),a("el-form-item",{attrs:{prop:"mobile",label:"手机号","label-width":e.formLabelWidth}},[a("el-input",{attrs:{type:"number",placeholder:"手机号","auto-complete":"off"},model:{value:e.form.mobile,callback:function(t){e.form.mobile=t},expression:"form.mobile"}})],1),e._v(" "),1==e.form.role_id?a("el-form-item",{attrs:{prop:"passwd",label:"密码","label-width":e.formLabelWidth}},[a("el-input",{attrs:{type:"password",placeholder:"密码","auto-complete":"off"},model:{value:e.form.passwd,callback:function(t){e.form.passwd=t},expression:"form.passwd"}})],1):e._e(),e._v(" "),a("el-form-item",{attrs:{label:"昵称","label-width":e.formLabelWidth}},[a("el-input",{attrs:{placeholder:"昵称","auto-complete":"off"},model:{value:e.form.nickname,callback:function(t){e.form.nickname=t},expression:"form.nickname"}})],1)],1),e._v(" "),a("div",{staticClass:"dialog-footer",slot:"footer"},[a("el-button",{on:{click:function(t){e.addForm=!1}}},[e._v("取 消")]),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.submit("form")}}},[e._v("确 定")])],1)],1),e._v(" "),a("section",{staticClass:"manage-container"},[a("el-button",{attrs:{type:"primary",icon:"plus"},on:{click:e.addAdmin}},[a("i",[e._v("添加人员")])]),e._v(" "),a("el-button",{attrs:{type:"danger",icon:"plus"},on:{click:function(t){e.$router.push({name:"user-import"})}}},[e._v("\n\t\t\t\t人员导入\n\t\t\t")])],1),e._v(" "),a("article",{staticClass:"search"},[a("Region",{attrs:{province:e.fetchParam.provinceSelect,city:e.fetchParam.citySelect,area:e.fetchParam.areaSelect,town:e.fetchParam.townSelect,village:e.fetchParam.villageSelect,title:"部门",change:e.fetchData},on:{provinceChange:function(t){e.fetchParam.provinceSelect=t,e.finallyVal=t},cityChange:function(t){e.fetchParam.citySelect=t,e.finallyVal=t},areaChange:function(t){e.fetchParam.areaSelect=t,e.finallyVal=t},townChange:function(t){e.fetchParam.townSelect=t,e.finallyVal=t},villageChange:function(t){e.fetchParam.villageSelect=t,e.finallyVal=t}}}),e._v(" "),a("section",[a("i",[e._v("姓名")]),e._v(" "),a("el-input",{attrs:{placeholder:"请输入姓名"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13))return null;e.fetchData(t)}},model:{value:e.fetchParam.name,callback:function(t){e.fetchParam.name=t},expression:"fetchParam.name"}})],1),e._v(" "),a("section",[a("i",[e._v("角色")]),e._v(" "),a("el-select",{on:{change:e.fetchData},model:{value:e.fetchParam.role_id,callback:function(t){e.fetchParam.role_id=t},expression:"fetchParam.role_id"}},[a("el-option",{attrs:{label:"全部",value:-1}}),e._v(" "),a("el-option",{attrs:{label:"管理员",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"部门人员",value:"0"}})],1)],1),e._v(" "),a("section",[a("i",[e._v("手机号")]),e._v(" "),a("el-input",{attrs:{placeholder:"请输入手机号"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13))return null;e.fetchData(t)}},model:{value:e.fetchParam.mobile,callback:function(t){e.fetchParam.mobile=t},expression:"fetchParam.mobile"}})],1),e._v(" "),a("section",[a("i",[e._v("是否激活")]),e._v(" "),a("el-select",{on:{change:e.fetchData},model:{value:e.fetchParam.active,callback:function(t){e.fetchParam.active=t},expression:"fetchParam.active"}},[a("el-option",{attrs:{label:"全部",value:-1}}),e._v(" "),a("el-option",{attrs:{label:"已激活",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"未激活",value:"0"}})],1)],1)],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loadingData,expression:"loadingData"}],staticClass:"data-table",attrs:{data:e.tableData,fit:!0,border:""},on:{select:e.selectRow,"select-all":e.selectRow}},[e.data?a("el-table-column",{attrs:{"min-width":"150",label:"姓名"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.name))]),e._v(" "),""!==t.row.wx_id?a("i",{staticClass:"wei_icon"}):e._e()]}}])}):e._e(),e._v(" "),a("el-table-column",{attrs:{"min-width":"200",prop:"gov_name",label:"部门"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"170",prop:"mobile",label:"手机"}}),e._v(" "),a("el-table-column",{attrs:{"min-width":"170",formatter:e.Time,label:"创建时间"}}),e._v(" "),a("el-table-column",{attrs:{width:"100",label:"状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.deleted?a("el-tag",[e._v("已删除")]):0==t.row.deleted&&0==t.row.disabled?a("el-tag",{attrs:{type:"success"}},[e._v("正常")]):a("el-tag",[e._v("禁用")])]}}])}),e._v(" "),a("el-table-column",{attrs:{fixed:"right",width:"207",label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){e.checkClerkDetail(t.$index,t.row)}}},[e._v("\n\t\t\t\t\t\t详情\n\t\t\t\t\t")]),e._v(" "),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){e.editUser(t.$index,t.row)}}},[e._v("\n\t\t\t\t\t\t修改\n\t\t\t\t\t")]),e._v(" "),0==t.row.disabled?a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){e.offline(t.$index,t.row)}}},[a("i",[e._v("禁用")])]):a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){e.online(t.$index,t.row)}}},[a("i",[e._v("启用")])]),e._v(" "),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){e.del(t.$index,t.row)}}},[e._v("删除")])]}}])})],1),e._v(" "),a("el-pagination",{staticClass:"pagin",attrs:{"current-page":e.fetchParam.page,"page-size":e.fetchParam.pagesize,"page-sizes":[15,30,60,100],layout:"sizes,total, prev, pager, next",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)},staticRenderFns:[]}}});
//# sourceMappingURL=60.8f16d5704aa9359905b7.js.map