webpackJsonp([11],{200:function(e,t,a){"use strict";(function(e){function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=a(6),n=a(2),r=a(0),s=function(){function e(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,a,o){return a&&e(t.prototype,a),o&&e(t,o),t}}(),c=r.a.apiHost+"/course",l=function(){function t(){o(this,t)}return s(t,[{key:"getCategoryTree",value:function(e){var t=e.id,a=void 0===t?"tree":t,o=e.type,n=e.filter,r=void 0===n||n,s=e.pid,l=void 0===s?-1:s,u=e.level,d=void 0===u?-1:u,p=e.pagesize,m=void 0===p?-1:p,g=e.category_type,A=c+"/category/lists";return i.b(A,{id:a,filter:r,type:o,pid:l,level:d,pagesize:m,category_type:g}).then(function(e){return e})}},{key:"search_cate",value:function(t){var a=t.id,o=t.name,n=t.category_type,r=t.pid,s=t.level,l=t.ended,u=t.disabled,d=t.page,p=t.pagesize,m=c+"/category/lists";return i.b(m,{id:a,name:o,category_type:n,pid:r,level:s,ended:l,disabled:u,page:d,pagesize:p},!1).then(function(t){return 0==t.code?t:e.reject(t)})}},{key:"create_cate",value:function(t){var a=t.name,o=t.sort,n=t.sort_type,r=t.category_type,s=t.pid,l=t.ended,u=t.image,d=t.category_subject_num,p=t.course_sort,m={name:a,sort:o,sort_type:n,category_type:r,pid:s,ended:l,image:u,category_subject_num:d,course_sort:p};0===s&&delete m.pid;var g=c+"/category/create";return i.a(g,m).then(function(t){return 0==t.code?(xmview.showTip("success",t.message),t.data):(xmview.showTip("error",t.message),e.reject(t))})}},{key:"update_cate",value:function(t){var a=t.id,o=t.name,n=t.image,r=t.category_type,s=t.sort,l=t.sort_type,u=t.ended,d=t.disabled,p=t.pid,m=t.category_subject_num,g=t.course_sort,A=c+"/category/edit/"+a;return i.a(A,{name:o,image:n,category_type:r,sort:s,sort_type:l,ended:u,disabled:d,pid:p,category_subject_num:m,course_sort:g}).then(function(t){return 0==t.code?t:e.reject(t)})}},{key:"updateCategory",value:function(e){var t=e.govid,a=e.type,o=e.name,s=e.image,c=e.sort,l=e.id;t=t||n.a.getUserInfo().company_id;var u=r.a.apiHost+"/com/"+t+"/course/category/"+l;return i.a(u,{type:a,name:o,image:s,sort:c})}},{key:"moveCategory",value:function(e){var t=e.id,a=e.to,o=r.a.apiHost+"/course/category/"+t+"/move";return i.a(o,{to:a})}},{key:"moveCategoryContent",value:function(e){var t=e.id,a=e.to,o=r.a.apiHost+"/course/category/"+t+"/move/content";return i.a(o,{to:a})}},{key:"getUploadCategoryImgUrl",value:function(){return r.a.apiHost+"/common/upload/file"}},{key:"delete_cate",value:function(t){var a=c+"/category/delete/"+t;return i.a(a,{}).then(function(t){return 0==t.code?(xmview.showTip("success",t.message),t.data):(xmview.showTip("error",t.message),e.reject(t))})}},{key:"courseList",value:function(e,t,a){var o=c+"/search/name";return i.b(o,{keyword:e,page:t,pagesize:a}).then(function(e){return e.data})}},{key:"getPublicCourselist",value:function(t){var a=t.course_name,o=void 0===a?"":a,n=t.status,r=t.category_id,s=t.need_testing,l=t.create_start,u=t.create_end,d=t.page,p=t.pagesize,m=t.category_type,g=t.material_type,A=t.type,f=c+"/lists";return i.b(f,{course_name:o,status:n,category_id:r,need_testing:s,create_start:l,create_end:u,page:d,pagesize:p,category_type:m,material_type:g,type:A},!1).then(function(t){return 0==t.code?t:e.reject(t)})}},{key:"addCourse",value:function(t){var a=t.category_id,o=t.experts_id,n=t.course_name,r=t.image,s=t.description,l=t.tags,u=t.type,d=t.material_type,p=t.material_id,m=t.need_testing,g=(t.status,t.sort),A=t.share,f=t.noaccess,h=t.region,v=t.source_url,y=t.file_name,b=t.limit_time,_=t.limit_repeat,C=c+"/create";return i.a(C,{category_id:a,experts_id:o,course_name:n,image:r,description:s,tags:l,type:u,material_type:d,material_id:p,need_testing:m,sort:g,share:A,noaccess:f,region:h,source_url:v,file_name:y,limit_time:b,limit_repeat:_}).then(function(t){return 0==t.code?t.data:e.reject(t)})}},{key:"getCourseInfo",value:function(e){var t=r.a.apiHost+"/course/get/"+e;return i.b(t).then(function(e){return e.data})}},{key:"editCourse",value:function(e){var t=e.govid,a=e.contentid,o=e.category_id,s=e.experts_id,c=e.course_name,l=e.image,u=e.tags,d=e.type,p=e.material_type,m=e.material_id,g=e.description,A=e.need_testing,f=e.status,h=e.limit_time,v=e.limit_repeat,y=e.score_pass,b=e.sort,_=e.share,C=e.noaccess,x=e.region,w=e.source_url,k=e.file_name;t=t||n.a.getUserInfo().company_id;var B=r.a.apiHost+"/course/edit/"+a;return i.a(B,{category_id:o,experts_id:s,course_name:c,image:l,tags:u,type:d,material_type:p,material_id:m,description:g,need_testing:A,limit_time:h,status:f,limit_repeat:v,score_pass:y,sort:b,share:_,noaccess:C,region:x,source_url:w,file_name:k}).then(function(e){return e.data})}},{key:"offlineCourse",value:function(e){var t=e.id,a=e.status,o=r.a.apiHost+"/course/edit/"+t;return i.a(o,{status:a})}},{key:"commonUploadImage",value:function(){return r.a.apiHost+"/common/upload/file"}},{key:"commonUploadImageBase",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"section",a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"category",o=r.a.apiHost+"/common/upload/file";return i.a(o,e,t,a).then(function(e){return xmview.showTip("success",e.message),e.data})}},{key:"commonUploadImageBase",value:function(e){var t=e.image,a=e.alias,o=void 0===a?Date.now()+".jpg":a,n=e.biz,s=void 0===n?"course":n,c=e.extpath,l=r.a.apiHost+"/common/upload/base64";return i.a(l,{image:t,alias:o,biz:s,extpath:c}).then(function(e){return xmview.showTip("success",e.message),e.data})}},{key:"commonUploadImageBaseSection",value:function(e){var t=e.image,a=e.alias,o=void 0===a?Date.now()+".jpg":a,n=e.biz,s=void 0===n?"section":n,c=e.extpath,l=r.a.apiHost+"/common/upload/base64";return i.a(l,{image:t,alias:o,biz:s,extpath:c}).then(function(e){return xmview.showTip("success",e.message),e.data})}},{key:"uploadCover4addCourse",value:function(e){var t=e.image,a=e.alias,o=void 0===a?Date.now()+".jpg":a,n=r.a.apiHost+"/course/subject/image";return i.a(n,{image:t,alias:o}).then(function(e){return e.data})}},{key:"deleteCourse",value:function(e){var t=e.govid,a=e.course_id;t=t||n.a.getUserInfo().company_id;var o=r.a.apiHost+"/course/delete/"+a;return i.a(o,{})}},{key:"deleteCourseMulty",value:function(e){var t=e.govid,a=e.id;t=t||n.a.getUserInfo().company_id;var o=r.a.apiHost+"/com/"+t+"/course/batchdel";return i.a(o,{id:a})}},{key:"deleteVideoMulty",value:function(e){var t=e.id,a=c+"/video/batchdel";return i.a(a,{id:t})}},{key:"moveCourseToCategoryMulty",value:function(e){var t=e.govid,a=e.id,o=e.catid;t=t||n.a.getUserInfo().company_id;var s=r.a.apiHost+"/com/"+t+"/course/batchmove";return i.a(s,{id:a,catid:o})}},{key:"getCourseDocUploadUrl",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.govid;return t=t||n.a.getUserInfo().company_id,r.a.apiHost+"/common/upload/file"}},{key:"getTestingInfo",value:function(e){var t=e.course_id,a=r.a.apiHost+"/course/subject/listoptions";return i.b(a,{course_id:t}).then(function(e){return e.data})}},{key:"addOrEditTesting",value:function(t){var a=t.govid,o=t.course_id,s=t.subjects;a=a||n.a.getUserInfo().company_id;var c=r.a.apiHost+"/course/subject/updates/"+o;return i.a(c,s).then(function(t){return 0==t.code?(xmview.showTip("success",t.message),t.data):(xmview.showTip("error",t.message),e.reject(t))})}},{key:"delCourse",value:function(e){var t=e.course_id,a=e.id,o=r.a.apiHost+"/course/subject/delete/"+t+"/"+a;return i.a(o,{}).then(function(e){return e.data})}},{key:"getAlbumList",value:function(e){var t=e.govid,a=e.page,o=e.pagesize,s=e.keyword,c=e.create_start,l=e.create_end;t=t||n.a.getUserInfo().company_id;var u=r.a.apiHost+"/com/"+t+"/course/album/search";return i.b(u,{page:a,pagesize:o,keyword:s,create_start:c,create_end:l}).then(function(e){return e.data})}},{key:"deleteAlbum",value:function(e){var t=e.govid,a=e.id;t=t||n.a.getUserInfo().company_id;var o=r.a.apiHost+"/com/"+t+"/course/album/"+a;return i.a(o,{})}},{key:"deleteAlbumMulty",value:function(e){var t=e.govid,a=e.ids;t=t||n.a.getUserInfo().company_id;var o=r.a.apiHost+"/com/"+t+"/course/album/batchdel";return i.a(o,{id:a.join(",")})}},{key:"addAlbum",value:function(e){var t=e.govid,a=e.course_id,o=e.name;t=t||n.a.getUserInfo().company_id;var s=r.a.apiHost+"/com/"+t+"/course/album/add";return i.a(s,{course_id:a.join(","),name:o})}},{key:"editAlbum",value:function(e){var t=e.govid,a=e.course_id,o=e.name;t=t||n.a.getUserInfo().company_id;var s=r.a.apiHost+"/com/"+t+"/course/album/edit";return i.a(s,{course_id:a.join(","),name:o})}},{key:"getCourseSubject",value:function(e){var t=e.contentid,a=c+"/"+t+"/subject/stat";return i.b(a).then(function(e){return e.data})}},{key:"getSubjectAnswer",value:function(e){var t=e.c_id,a=e.s_id,o=c+"/"+t+"/subject/"+a+"/stat";return i.b(o).then(function(e){return e.data.stat})}},{key:"addHerbal",value:function(t){var a=t.category_id,o=t.data,n=t.noJson,s=r.a.apiHost+"/course/herbal/create/"+a;return i.a(s,o,n).then(function(t){return 0==t.code?(xmview.showTip("success",t.message),t.data):(xmview.showTip("error",t.message),e.reject(t))})}},{key:"getHerbal",value:function(e){var t=e.contentid,a=r.a.apiHost+"/course/herbal/get/"+t;return i.b(a).then(function(e){return e.data})}},{key:"editHerbal",value:function(t){var a=t.category_id,o=t.id,n=t.data,s=t.noJson,c=r.a.apiHost+"/course/herbal/edit/"+a+"/"+o;return i.a(c,n,s).then(function(t){return 0==t.code?(xmview.showTip("success",t.message),t.data):(xmview.showTip("error",t.message),e.reject(t))})}},{key:"getImgTxt",value:function(e){var t=e.contentid,a=r.a.apiHost+"/course/article/get/"+t;return i.b(a).then(function(e){return e.data})}},{key:"createImgTxt",value:function(t){var a=t.category_id,o=t.data,n=t.noJson,s=r.a.apiHost+"/course/article/create/"+a;return i.a(s,o,n).then(function(t){return 0==t.code?(xmview.showTip("success",t.message),t.data):(xmview.showTip("error",t.message),e.reject(t))})}},{key:"editImgTxt",value:function(t){var a=t.category_id,o=t.id,n=t.data,s=t.noJson,c=r.a.apiHost+"/course/article/edit/"+a+"/"+o;return i.a(c,n,s).then(function(t){return 0==t.code?(xmview.showTip("success",t.message),t.data):(xmview.showTip("error",t.message),e.reject(t))})}}]),t}();t.a=new l}).call(t,a(1))},209:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a(2),i=a(0);t.default={props:{url:{type:String,default:""},name:{type:String,default:"image"},onSuccess:Function,defaultImg:String,disabled:{type:Boolean,default:!1},data:{type:Object,default:function(){return{biz:"",extpath:""}}}},data:function(){return{uploadBtn:null,dialogVisible:!1,headers:void 0,forceShowUpload:!1,host:i.a.apiHost,currImg:[]}},watch:{currImg:function(e){e.length>0&&e[0].url?this.uploadBtn&&(this.uploadBtn.style.display="none"):this.uploadBtn.style.display="block"},defaultImg:function(e){this.currImg=e?[{name:e,url:e}]:[]},disabled:function(e){this.isShowDelAndPreview(!e),this.setDisabled(e)}},created:function(){this.currImg=this.defaultImg?[{name:this.defaultImg,url:this.defaultImg}]:[],this.headers={Authorization:"Bearer "+o.a.getAuthToken(),TwoStep:"Bearer "+o.a.getTwiceToken()}},activated:function(){this.uploadBtn&&(this.uploadBtn=this.$refs.container.querySelector(".el-upload--picture-card")),this.isShowDelAndPreview(!this.disabled),this.setDisabled(this.disabled)},mounted:function(){this.setDisabled(this.disabled),this.uploadBtn=this.$refs.container.querySelector(".el-upload--picture-card")},methods:{beforeUpload:function(){this.uploadBtn.style.display="none"},handleRemove:function(){var e=this;setTimeout(function(){e.clearFiles()},500)},removeImg:function(e,t){},handlePictureCardPreview:function(e){this.dialogVisible=!0},handleSuccess:function(e,t,a){0==e.code?this.onSuccess&&this.onSuccess(e):(xmview.showTip("error",e.message),this.handleRemove()),this.$refs.container.querySelector(".el-upload__input").value=null},clearFiles:function(){this.uploadBtn.style.display="block",this.isShowDefault=!0,this.currImg=[]},isShowDelAndPreview:function(e){var t=this.$refs.container.querySelector(".el-upload-list__item-actions");t&&(t.style.display=e?"block":"none")},setDisabled:function(e){e?this.$refs.container.querySelector("input").setAttribute("disabled","disabled"):this.$refs.container.querySelector("input").removeAttribute("disabled")}}}},210:function(e,t,a){t=e.exports=a(100)(!0),t.push([e.i,".component-upload-uploadimg .el-upload--picture-card i{left:50%;top:50%;transform:translateX(-50%) translateY(-50%)}.component-upload-uploadimg{width:100px;height:100px;display:inline-block}.component-upload-uploadimg.uploaddisabled *{color:#ededed;border-color:#ededed!important;cursor:auto}.component-upload-uploadimg.uploaddisabled .el-upload-list__item-delete{display:none!important}.component-upload-uploadimg .el-progress,.component-upload-uploadimg .el-progress--circle,.component-upload-uploadimg .el-progress--circle .el-progress-circle,.component-upload-uploadimg .el-progress--circle>*,.component-upload-uploadimg .el-progress .el-progress-circle,.component-upload-uploadimg .el-progress>*,.component-upload-uploadimg .el-upload--picture-card,.component-upload-uploadimg .el-upload-list__item,.component-upload-uploadimg .el-upload-list__item-actions{width:100%!important;height:100%!important}.component-upload-uploadimg>*{height:100%}.component-upload-uploadimg .defaultImg{position:relative;border-radius:5px}.component-upload-uploadimg .defaultImg:hover span{opacity:1}.component-upload-uploadimg .defaultImg img{width:100%;height:100%}.component-upload-uploadimg .defaultImg span{border-radius:5px;opacity:0;position:absolute;width:100%;height:100%;top:0;left:0;background:rgba(0,0,0,.4);text-align:center;transition:all .3s ease}.component-upload-uploadimg .defaultImg span i{font-size:30px;color:#fff;display:block;transform:translateY(-50%);top:50%;position:absolute;width:100%;cursor:pointer}.component-upload-uploadimg .el-upload--picture-card{position:relative}.component-upload-uploadimg .el-upload--picture-card i{position:absolute}","",{version:3,sources:["/home/baichenhui/devspace/sys_ui/assets/src/views/component/upload/UploadImg.vue"],names:[],mappings:"AACA,uDAAuD,SAAS,QAAQ,2CAA2C,CAClH,AACD,4BAA4B,YAAY,aAAa,oBAAoB,CACxE,AACD,6CAA6C,cAAc,+BAAgC,WAAW,CACrG,AACD,wEAAwE,sBAAuB,CAC9F,AACD,2dAA2d,qBAAsB,qBAAsB,CACtgB,AACD,8BAA8B,WAAW,CACxC,AACD,wCAAwC,kBAAkB,iBAAiB,CAC1E,AACD,mDAAmD,SAAS,CAC3D,AACD,4CAA4C,WAAW,WAAW,CACjE,AACD,6CAA6C,kBAAkB,UAAU,kBAAkB,WAAW,YAAY,MAAM,OAAO,0BAA2B,kBAAkB,uBAAyB,CACpM,AACD,+CAA+C,eAAe,WAAW,cAAc,2BAA2B,QAAQ,kBAAkB,WAAW,cAAc,CACpK,AACD,qDAAqD,iBAAiB,CACrE,AACD,uDAAuD,iBAAiB,CACvE",file:"UploadImg.vue",sourcesContent:["\n.component-upload-uploadimg .el-upload--picture-card i{left:50%;top:50%;transform:translateX(-50%) translateY(-50%)\n}\n.component-upload-uploadimg{width:100px;height:100px;display:inline-block\n}\n.component-upload-uploadimg.uploaddisabled *{color:#ededed;border-color:#ededed !important;cursor:auto\n}\n.component-upload-uploadimg.uploaddisabled .el-upload-list__item-delete{display:none !important\n}\n.component-upload-uploadimg .el-upload--picture-card,.component-upload-uploadimg .el-upload-list__item-actions,.component-upload-uploadimg .el-upload-list__item,.component-upload-uploadimg .el-progress,.component-upload-uploadimg .el-progress--circle,.component-upload-uploadimg .el-progress .el-progress-circle,.component-upload-uploadimg .el-progress--circle .el-progress-circle,.component-upload-uploadimg .el-progress>*,.component-upload-uploadimg .el-progress--circle>*{width:100% !important;height:100% !important\n}\n.component-upload-uploadimg>*{height:100%\n}\n.component-upload-uploadimg .defaultImg{position:relative;border-radius:5px\n}\n.component-upload-uploadimg .defaultImg:hover span{opacity:1\n}\n.component-upload-uploadimg .defaultImg img{width:100%;height:100%\n}\n.component-upload-uploadimg .defaultImg span{border-radius:5px;opacity:0;position:absolute;width:100%;height:100%;top:0;left:0;background:rgba(0,0,0,0.4);text-align:center;transition:all 300ms ease\n}\n.component-upload-uploadimg .defaultImg span i{font-size:30px;color:#fff;display:block;transform:translateY(-50%);top:50%;position:absolute;width:100%;cursor:pointer\n}\n.component-upload-uploadimg .el-upload--picture-card{position:relative\n}\n.component-upload-uploadimg .el-upload--picture-card i{position:absolute\n}\n"],sourceRoot:""}])},212:function(e,t,a){var o=a(210);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);a(101)("1c1de83c",o,!0)},214:function(e,t,a){a(212);var o=a(5)(a(209),a(215),null,null);e.exports=o.exports},215:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{ref:"container",staticClass:"component-upload-uploadimg",class:{uploaddisabled:e.disabled}},[a("el-upload",{attrs:{headers:e.headers,disabled:e.disabled,action:e.url,name:e.name,data:e.data,"list-type":"picture-card",multiple:!1,"before-upload":e.beforeUpload,"on-success":e.handleSuccess,"on-error":e.handleRemove,"on-preview":e.handlePictureCardPreview,"on-remove":e.handleRemove,"before-remove":e.removeImg,accept:"image/jpg,image/jpeg,image/png,image/gif","file-list":e.currImg}},[a("i",{staticClass:"el-icon-plus"})]),e._v(" "),a("el-dialog",{attrs:{size:"tiny"},model:{value:e.dialogVisible,callback:function(t){e.dialogVisible=t},expression:"dialogVisible"}},[a("img",{attrs:{width:"100%",src:e.currImg.length>0&&e.currImg[0].url,alt:""}})])],1)},staticRenderFns:[]}},218:function(e,t,a){"use strict";function o(e,t){return e.findIndex(function(e,a,o){return e.id==t})}function i(e){for(var t in e)e[t]=void 0==e[t]?"":e[t]}t.b=o,t.a=i},268:function(e,t,a){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var a=0;a<t.length;a++){var o=t[a];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,a,o){return a&&e(t.prototype,a),o&&e(t,o),t}}(),n=function(){function e(){o(this,e)}return i(e,[{key:"getOrignData",value:function(){return{description:void 0,score:void 0,image:void 0,explain:void 0,correct:void 0,editable:!0,options:[{sort:1,description:"",correct:void 0}]}}},{key:"getExamOrignData",value:function(){return{description:void 0,image:void 0,explain:void 0,correct:void 0,editable:!0,type:1,options:[{sort:1,description:"",correct:void 0}]}}},{key:"getTestingSet",value:function(e){var t=this.getOrignData();return t.category=e,0==e?(delete t.options,t.correct=void 0,t):1==e||2==e?t:void 0}},{key:"getExamSet",value:function(e){var t=this.getExamOrignData();return t.type=e,0==e?(delete t.options,t.correct=void 0,t):1==e||2==e?t:void 0}},{key:"getLibSet",value:function(e){var t=this.getOrignData();return t.subject_type=e,0==e?(delete t.options,t.correct=1,t):1==e||2==e?t:void 0}}]),e}();t.a=new n},334:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:{options:Array,item:Object,selectAreas:String},data:function(){return{}},created:function(){},methods:{}}},359:function(e,t,a){var o=a(5)(a(334),a(368),null,null);e.exports=o.exports},36:function(e,t,a){a(648);var o=a(5)(a(438),a(782),null,null);e.exports=o.exports},368:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("el-form-item",{attrs:{label:"选项"},model:{value:e.item,callback:function(t){e.item=t},expression:"item"}},[a("el-checkbox",{staticClass:"radio",attrs:{disabled:!e.item.editable,label:e.option.description,"true-label":1,"false-label":0},model:{value:e.option.correct,callback:function(t){e.option.correct=t},expression:"option.correct"}},[a("i",[e._v(e._s(e.option.description))])])],1)},staticRenderFns:[]}},438:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=a(200),i=a(15),n=a(268),r=(a(26),a(218),a(214)),s=a.n(r),c=a(28),l=a.n(c),u=a(359),d=a.n(u);t.default={name:"exam-subject-form",data:function(){return{isShowVideoDialog:!1,courseTags:[],rules:{chapter_id:{required:!0,type:"number",message:"请选择试题栏目",trigger:"change"}},testRules:{qtype:{required:!0,message:"请选择试题题型",trigger:"blur"}},accept:"*.doc,*.docx",fetchTesting:[],readonly:!1,videoUrl:"",changelist:{},form:{chapter_id:"",chapter_name:"",category_id:"",category_name:"",title:""},type:1,qtype:"",options:[],ansoption:[],ansSelect:["A","B","C","D","E","F","G","H","I","J","K","L","M,","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],cbA4answer:""}},created:function(){var e=this,t=this;if(this.$route.params.chapter_id)i.a.getExamSubject(this.$route.params.id).then(function(a){xmview.setContentTile("试题查看"),e.form.chapter_name=a.chapter_name,e.qtype=a.qtype;var o=[];o.push(a),e.fetchTesting=o,e.fetchTesting.forEach(function(e){e.options.forEach(function(t,a){1==t.correct&&(e.correct=a)})}),"A3"==e.qtype&&(e.form.title=a.ext.title),"A4"==e.qtype&&a.options.map(function(e){1==e.correct&&(t.cbA4answer=e.description)})}).catch(function(e){xmview.showTip("error",e.message)});else{if(!this.$route.params.chapterInfo)return xmview.showTip("warning","请先选择试题所属分类"),void this.$router.back();if(this.form={chapter_id:this.$route.params.chapterInfo.id,chapter_name:this.$route.params.chapterInfo.name},4==this.$route.params.chapterInfo.chapter_type&&(this.form.chapter_id=this.$route.params.chapterInfo.chapter_id),this.qtype=this.$route.params.qtype,xmview.setContentTile("试题添加-"+this.qtype+"题型"),void 0==this.qtype&&4!==this.$route.params.chapterInfo.chapter_type)return xmview.showTip("error","请点击添加考题按钮 => 选择题型"),void this.$router.back()}this.fetchTesting=[],this.uploadImgUrl=o.a.commonUploadImage(),this.readonly=this.$route.params.readonly,xmview.setContentLoading(!1),"A4"==this.qtype&&(this.ansoption=[{opid:"A",description:""},{opid:"B",description:""},{opid:"C",description:""},{opid:"D",description:""},{opid:"E",description:""}])},methods:{reqFun:function(e){return i.a.fetchChapterCategory({pid:0,pagesize:-1,chapter_type:2,category_id:this.$store.state.index.examCate})},addTesting:function(e,t){this.type=e,this.fetchTesting.splice(t,0,n.a.getExamSet(e))},deleteTesting:function(e,t){var a=this;xmview.showDialog('是否确定删除题目【 <i style="color:red">'+(t.description||"")+"</i> 】?",function(){a.fetchTesting.splice(e,1)})},addMoreTestingOption:function(e){"A4"==this.qtype?e.push({opid:this.ansSelect[e.length],description:""}):e.push({description:"",correct:0})},handleSubmitTesting:function(){var e=this,t=null;if(!this.fetchTesting||this.fetchTesting.length<1)return void this.$router.back();this.$refs.cate.validate(function(a){if(!a)return!1;var o=JSON.parse(JSON.stringify(e.fetchTesting));if("A4"!==e.qtype){if("A3"==e.qtype&&void 0==e.form.title)return xmview.showTip("error","请先添加题干"),!1;for(var n=0;o.length,t=o[n];n++)1==t.type&&"number"==typeof t.correct&&t.options&&(t.options.map(function(e){delete e.correct}),t.options[t.correct].correct=1,delete t.correct),t.sort=n+1,t.options&&t.options.map(function(e,t){e.sort=t+1})}else if(""==e.ansoption[0].description)return xmview.showTip("error","请先添加答案选项组"),!1;xmview.setContentLoading(!0);var r=void 0,s=void 0;"A1"==e.qtype||"A2"==e.qtype?s={qtype:e.qtype,subjects:o}:"A3"!=e.qtype&&"A4"!=e.qtype||(s="A3"==e.qtype?{qtype:e.qtype,title:e.form.title,subjects:o}:{qtype:e.qtype,title:e.form.title,answeroption:e.ansoption,subjects:o}),r={category_id:e.$store.state.index.examCate,chapter_id:e.form.chapter_id,subjects:JSON.stringify(s),style:e.qtype.toLowerCase(),noJson:0},4==e.$route.params.chapterInfo.chapter_type&&(r.category_id=e.$route.params.chapterInfo.category_id),i.a.addSubject(r).then(function(t){xmview.showTip("success","操作成功"),e.$router.back()},function(){}).then(function(){xmview.setContentLoading(!1)})})}},components:{UploadImg:s.a,SectionCategoryMenu:l.a,optionItemA4:d.a}}},530:function(e,t,a){t=e.exports=a(100)(!0),t.push([e.i,'#course-manage-addcourse-container{padding:15px;position:relative;border:1px solid #ededed;border-radius:5px;background:#fff}#course-manage-addcourse-container:after{content:"";clear:both;display:block}#course-manage-addcourse-container .pagin{float:right;margin-top:15px}#course-manage-addcourse-container .bottom-manage{margin-top:15px}.text-blue{color:#20a0ff}.text-light-blue{color:#58b7ff}.text-dark-blue{color:#1d8ce0}.text-success{color:#13ce66}.text-warning{color:#f7ba2a}.text-danger{color:#ff4949}#course-manage-addcourse-container h2{margin-bottom:10px}#course-manage-addcourse-container .el-tab-pane{max-width:700px}#course-manage-addcourse-container .el-upload-list__item{position:relative}#course-manage-addcourse-container .el-upload-list__item .el-icon-close{position:absolute;right:5px;top:5px}#course-manage-addcourse-container .testing-set{max-width:900px;height:auto!important}#course-manage-addcourse-container .testing-set .el-form{padding-top:17px}#course-manage-addcourse-container .testing-set .el-form:first-of-type{padding-top:0}#course-manage-addcourse-container .testing-set .el-form hr{position:absolute;width:100%;border-top:none;border-color:#bbb}#course-manage-addcourse-container .testing-set .el-form h5{font-size:14px;color:#666}#course-manage-addcourse-container .testing-set .el-form .el-input{display:inline-block;width:60%;vertical-align:middle}#course-manage-addcourse-container .testing-set .el-form:last-of-type{margin-bottom:0}#course-manage-addcourse-container .cate{width:100%}#course-manage-addcourse-container .cate .el-cascader{width:420px}#course-manage-addcourse-container .cate i{font-size:14px}#course-manage-addcourse-container .cate .el-input{display:inline-block;width:100%;vertical-align:middle}#course-manage-addcourse-container .multy-choose-item{margin:5px 0}#course-manage-addcourse-container .multy-choose-item .el-input{width:80%;vertical-align:middle}#course-manage-addcourse-container .addtype,#course-manage-addcourse-container .addtype .item{margin-top:22px}#course-manage-addcourse-container .submit{float:right}',"",{version:3,sources:["/home/baichenhui/devspace/sys_ui/assets/src/views/exam/chapter/ExamSubjectForm.vue"],names:[],mappings:"AACA,mCAAmC,aAAa,kBAAkB,yBAAyB,kBAAkB,eAAe,CAC3H,AACD,yCAAyC,WAAW,WAAW,aAAa,CAC3E,AACD,0CAA0C,YAAY,eAAe,CACpE,AACD,kDAAkD,eAAe,CAChE,AACD,WAAW,aAAa,CACvB,AACD,iBAAiB,aAAa,CAC7B,AACD,gBAAgB,aAAa,CAC5B,AACD,cAAc,aAAa,CAC1B,AACD,cAAc,aAAa,CAC1B,AACD,aAAa,aAAa,CACzB,AACD,sCAAsC,kBAAkB,CACvD,AACD,gDAAgD,eAAe,CAC9D,AACD,yDAAyD,iBAAiB,CACzE,AACD,wEAAwE,kBAAkB,UAAU,OAAO,CAC1G,AACD,gDAAgD,gBAAgB,qBAAsB,CACrF,AACD,yDAAyD,gBAAgB,CACxE,AACD,uEAAuE,aAAa,CACnF,AACD,4DAA4D,kBAAkB,WAAW,gBAAgB,iBAAiB,CACzH,AACD,4DAA4D,eAAe,UAAU,CACpF,AACD,mEAAmE,qBAAqB,UAAU,qBAAqB,CACtH,AACD,sEAAsE,eAAe,CACpF,AACD,yCAAyC,UAAU,CAClD,AACD,sDAAsD,WAAW,CAChE,AACD,2CAA2C,cAAc,CACxD,AACD,mDAAmD,qBAAqB,WAAW,qBAAqB,CACvG,AACD,sDAAsD,YAAY,CACjE,AACD,gEAAgE,UAAU,qBAAqB,CAC9F,AAGD,8FAAkD,eAAe,CAChE,AACD,2CAA2C,WAAW,CACrD",file:"ExamSubjectForm.vue",sourcesContent:["\n#course-manage-addcourse-container{padding:15px;position:relative;border:1px solid #ededed;border-radius:5px;background:#fff\n}\n#course-manage-addcourse-container:after{content:'';clear:both;display:block\n}\n#course-manage-addcourse-container .pagin{float:right;margin-top:15px\n}\n#course-manage-addcourse-container .bottom-manage{margin-top:15px\n}\n.text-blue{color:#20A0FF\n}\n.text-light-blue{color:#58B7FF\n}\n.text-dark-blue{color:#1D8CE0\n}\n.text-success{color:#13CE66\n}\n.text-warning{color:#F7BA2A\n}\n.text-danger{color:#FF4949\n}\n#course-manage-addcourse-container h2{margin-bottom:10px\n}\n#course-manage-addcourse-container .el-tab-pane{max-width:700px\n}\n#course-manage-addcourse-container .el-upload-list__item{position:relative\n}\n#course-manage-addcourse-container .el-upload-list__item .el-icon-close{position:absolute;right:5px;top:5px\n}\n#course-manage-addcourse-container .testing-set{max-width:900px;height:auto !important\n}\n#course-manage-addcourse-container .testing-set .el-form{padding-top:17px\n}\n#course-manage-addcourse-container .testing-set .el-form:first-of-type{padding-top:0\n}\n#course-manage-addcourse-container .testing-set .el-form hr{position:absolute;width:100%;border-top:none;border-color:#bbb\n}\n#course-manage-addcourse-container .testing-set .el-form h5{font-size:14px;color:#666\n}\n#course-manage-addcourse-container .testing-set .el-form .el-input{display:inline-block;width:60%;vertical-align:middle\n}\n#course-manage-addcourse-container .testing-set .el-form:last-of-type{margin-bottom:0\n}\n#course-manage-addcourse-container .cate{width:100%\n}\n#course-manage-addcourse-container .cate .el-cascader{width:420px\n}\n#course-manage-addcourse-container .cate i{font-size:14px\n}\n#course-manage-addcourse-container .cate .el-input{display:inline-block;width:100%;vertical-align:middle\n}\n#course-manage-addcourse-container .multy-choose-item{margin:5px 0\n}\n#course-manage-addcourse-container .multy-choose-item .el-input{width:80%;vertical-align:middle\n}\n#course-manage-addcourse-container .addtype{margin-top:22px\n}\n#course-manage-addcourse-container .addtype .item{margin-top:22px\n}\n#course-manage-addcourse-container .submit{float:right\n}\n"],sourceRoot:""}])},648:function(e,t,a){var o=a(530);"string"==typeof o&&(o=[[e.i,o,""]]),o.locals&&(e.exports=o.locals);a(101)("bbf879fe",o,!0)},782:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("article",{attrs:{id:"course-manage-addcourse-container"}},[a("el-form",{staticClass:"testing-set",attrs:{"label-width":"90px"}},[a("el-form",{ref:"cate",staticClass:"cate",attrs:{"label-width":"120px",model:e.form,rules:e.rules}},[4!==e.$route.params.chapterInfo.chapter_type?a("el-form-item",{attrs:{label:"所属栏目",prop:"chapter_id"}},[a("Section-category-menu",{attrs:{placeholder:e.form.chapter_name,autoClear:!0,reqFun:e.reqFun},model:{value:e.form.chapter_id,callback:function(t){e.form.chapter_id=t},expression:"form.chapter_id"}})],1):e._e(),e._v(" "),a("el-form-item",{directives:[{name:"show",rawName:"v-show",value:"A3"==e.qtype,expression:"qtype=='A3'"}],attrs:{label:"题干",prop:"title"}},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:5},placeholder:"请输入内容"},model:{value:e.form.title,callback:function(t){e.form.title=t},expression:"form.title"}})],1),e._v(" "),e.readonly?e._e():a("el-form-item",{directives:[{name:"show",rawName:"v-show",value:"A4"==e.qtype,expression:"qtype=='A4'"}],attrs:{label:"答案选项组"}},[e.readonly?e._e():a("h5",[e._v("请在正确答案前面打勾")]),e._v(" "),e._l(e.ansoption,function(t,o){return a("div",{key:o,staticClass:"multy-choose-item"},[a("span",[e._v(e._s(t.opid))]),e._v(" "),a("el-input",{attrs:{placeholder:"填写描述"},model:{value:t.description,callback:function(e){t.description=e},expression:"option.description"}}),e._v(" "),a("el-button",{attrs:{type:"text"},on:{click:function(t){e.ansoption.splice(o,1)}}},[a("i",[e._v("删除")])])],1)}),e._v(" "),a("div",{staticClass:"multy-choose-item"},[e.readonly?e._e():a("el-button",{attrs:{type:"text"},on:{click:function(t){e.addMoreTestingOption(e.ansoption)}}},[e._v("添加更多选项")])],1)],2),e._v(" "),a("hr")],1),e._v(" "),e._l(e.fetchTesting,function(t,o){return a("el-form",{key:o,ref:"test",refInFor:!0,attrs:{"label-width":"120px",model:t}},[e.readonly?e._e():a("el-form-item",{attrs:{label:""}},[a("el-button",{ref:"single",refInFor:!0,class:{"el-button--primary":1==e.type},attrs:{icon:"plus"},on:{click:function(t){e.addTesting(1,o)}}},[e._v("单选题")]),e._v(" "),4==e.$route.params.chapterInfo.chapter_type?a("el-button",{class:{"el-button--primary":2==e.type},attrs:{icon:"plus"},on:{click:function(t){e.addTesting(2,o)}}},[e._v("多选题")]):e._e(),e._v(" "),a("el-button",{attrs:{icon:"delete",type:"danger"},on:{click:function(a){e.deleteTesting(o,t)}}},[e._v("删除")])],1),e._v(" "),a("el-form-item",{attrs:{label:"第"+(o+1)+"题"}},["A1"==e.qtype?a("span",[e._v("A1题型")]):"A2"==e.qtype?a("span",[e._v("A2题型")]):"A3"==e.qtype?a("span",[e._v("A3题型")]):"A4"==e.qtype?a("span",[e._v("A4题型")]):e._e()]),e._v(" "),a("el-form-item",{attrs:{label:"题目"}},[a("el-input",{attrs:{disabled:!t.editable,type:"textarea",autosize:{minRows:2,maxRows:4},placeholder:"请输入内容"},model:{value:t.description,callback:function(e){t.description=e},expression:"item.description"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"配图"}},[a("UploadImg",{attrs:{defaultImg:t.image,url:e.uploadImgUrl,disabled:!t.editable,onSuccess:function(e){return t.image=e.data.url}}})],1),e._v(" "),0==t.type?a("el-form-item",{attrs:{label:"选项"}},[a("el-radio",{staticClass:"radio",attrs:{disabled:!t.editable,label:1},model:{value:t.correct,callback:function(e){t.correct=e},expression:"item.correct"}},[a("i",[e._v("正确")])]),e._v(" "),a("el-radio",{staticClass:"radio",attrs:{disabled:!t.editable,label:0},model:{value:t.correct,callback:function(e){t.correct=e},expression:"item.correct"}},[a("i",[e._v("错误")])])],1):e._e(),e._v(" "),"A4"!=e.qtype||e.readonly?e._e():a("el-form-item",{attrs:{label:"选项"}},e._l(e.ansoption,function(o,i){return a("el-radio",{key:i,staticClass:"radio",attrs:{disabled:!t.editable,label:o.opid,"true-label":o.opid,"false-label":0},model:{value:t.options,callback:function(e){t.options=e},expression:"item.options"}},[a("i",[e._v(e._s(o.opid))])])})),e._v(" "),"A4"==e.qtype&&e.readonly?a("el-form-item",{attrs:{label:"答案"}},[a("i",[e._v(e._s(e.cbA4answer))])]):e._e(),e._v(" "),"A4"!=e.qtype?a("el-form-item",{attrs:{label:"选项"}},[a("h5",[e._v("请在正确答案前面打勾")]),e._v(" "),e._l(t.options,function(o,i){return a("div",{key:i,staticClass:"multy-choose-item"},[2==t.type?a("el-checkbox",{attrs:{"true-label":1,disabled:!t.editable},model:{value:o.correct,callback:function(e){o.correct=e},expression:"option.correct"}}):a("el-radio",{staticClass:"radio",attrs:{label:i,disabled:!t.editable},model:{value:t.correct,callback:function(e){t.correct=e},expression:"item.correct"}},[a("i")]),e._v(" "),a("el-input",{attrs:{placeholder:"填写描述",disabled:!t.editable},model:{value:o.description,callback:function(e){o.description=e},expression:"option.description"}}),e._v(" "),a("el-button",{attrs:{disabled:!t.editable,type:"text"},on:{click:function(e){t.options.splice(i,1)}}},[a("i",[e._v("删除")])])],1)}),e._v(" "),a("div",{staticClass:"multy-choose-item"},[t.editable?a("el-button",{attrs:{type:"text"},on:{click:function(a){e.addMoreTestingOption(t.options)}}},[e._v("添加更多选项")]):e._e()],1)],2):e._e(),e._v(" "),a("el-form-item",{attrs:{label:"答案详解"}},[a("el-input",{attrs:{disabled:!t.editable,type:"textarea",autosize:{minRows:4,maxRows:6},placeholder:"请输入内容"},model:{value:t.explain,callback:function(e){t.explain=e},expression:"item.explain"}})],1),e._v(" "),a("hr")],1)}),e._v(" "),e.readonly?e._e():a("el-form",{staticClass:"addtype",attrs:{"label-width":"120px"}},[a("el-form-item",{staticClass:"item",attrs:{label:""}},[a("el-button",{attrs:{icon:"plus"},on:{click:function(t){e.addTesting(1,e.fetchTesting.length)}}},[e._v("单选题")]),e._v(" "),4==e.$route.params.chapterInfo.chapter_type?a("el-button",{attrs:{icon:"plus"},on:{click:function(t){e.addTesting(2,e.fetchTesting.length)}}},[e._v("多选题")]):e._e()],1)],1),e._v(" "),e.readonly?e._e():a("div",{staticClass:"bottom-btns"},[a("el-button",{staticClass:"submit",attrs:{type:"primary"},on:{click:e.handleSubmitTesting}},[e._v("发布")])],1)],2)],1)},staticRenderFns:[]}}});
//# sourceMappingURL=11.87376f005ce022f5af79.js.map