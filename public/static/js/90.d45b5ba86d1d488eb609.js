webpackJsonp([90],{161:function(e,t,a){a(664);var i=a(5)(a(466),a(802),null,null);e.exports=i.exports},201:function(e,t,a){"use strict";function i(e){return e?n.b(new Date(e)):e}Object.defineProperty(t,"__esModule",{value:!0});var n=a(25),r=void 0;t.default={props:{title:String,start:{},end:{},change:Function},data:function(){return{timespan:[this.start,this.end],pickerOptionsStart:{disabledDate:function(e){return r.timespan[1]?e.getTime()-144e5>=new Date(r.timespan[1]).getTime()&&0!==n.c(e,new Date(r.timespan[0])):null}},pickerOptionsEnd:{disabledDate:function(e){return r.timespan[0]?e.getTime()<=new Date(r.timespan[0]).getTime()&&0!==n.c(e,new Date(r.timespan[0])):null}}}},watch:{start:function(e){i(this.timespan[0])!=e&&(this.timespan[0]=e,e||(this.$refs.start.$el.querySelector("input").value=""))},end:function(e){i(this.timespan[1])!=e&&(this.timespan[1]=e,e||(this.$refs.end.$el.querySelector("input").value=""))}},beforeCreate:function(){r=this},methods:{setCurrVal:function(e){var t=["changeStart","changeEnd"],a=i(this.timespan[e]);this.$emit(t[e],i(a)),this.change&&this.change()}}}},202:function(e,t,a){var i=a(5)(a(201),a(203),null,null);e.exports=i.exports},203:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("section",[a("i",[e._v(e._s(e.title))]),e._v(" "),a("el-date-picker",{ref:"start",attrs:{editable:!1,clearable:"",align:"right",type:"date","picker-options":e.pickerOptionsStart,placeholder:"开始日期"},on:{change:function(t){e.setCurrVal(0)}},model:{value:e.timespan[0],callback:function(t){var a=e.timespan;Array.isArray(a)?a.splice(0,1,t):e.timespan[0]=t},expression:"timespan[0]"}}),e._v(" "),a("el-date-picker",{ref:"end",attrs:{clearable:"",editable:!1,align:"right",type:"date","picker-options":e.pickerOptionsEnd,placeholder:"结束日期"},on:{change:function(t){e.setCurrVal(1)}},model:{value:e.timespan[1],callback:function(t){var a=e.timespan;Array.isArray(a)?a.splice(1,1,t):e.timespan[1]=t},expression:"timespan[1]"}})],1)},staticRenderFns:[]}},259:function(e,t,a){"use strict";(function(e){function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var n=a(6),r=a(0),o=function(){function e(e,t){for(var a=0;a<t.length;a++){var i=t[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,a,i){return a&&e(t.prototype,a),i&&e(t,i),t}}(),s=r.a.apiHost+"/course/task",l=function(){function t(){i(this,t)}return o(t,[{key:"getCourseTaskList",value:function(e){var t=e.page,a=e.pagesize,i=e.title,r=e.stime,o=e.etime,l=e.type,c=e.status,u=e.deleted,d=s+"/lists";return n.b(d,{page:t,pagesize:a,title:i,stime:r,etime:o,type:l,status:c,deleted:u}).then(function(e){return e})}},{key:"submitTask",value:function(e){var t=e.title,a=void 0===t?void 0:t,i=e.image,r=void 0===i?void 0:i,o=e.description,l=void 0===o?void 0:o,c=e.sort,u=void 0===c?void 0:c,d=e.course_ids,p=void 0===d?void 0:d,m=e.gov_ids,A=void 0===m?void 0:m,g=e.user_ids,h=void 0===g?void 0:g,v=e.score,f=void 0===v?0:v,k=e.type,C=void 0===k?void 0:k,y=e.stime,x=void 0===y?"":y,b=e.etime,_=void 0===b?"":b,w=s+"/create";return n.a(w,{title:a,image:r,description:l,sort:u,course_ids:p,gov_ids:A,user_ids:h,score:f,type:C,stime:x,etime:_},!1).then(function(e){return e})}},{key:"editTask",value:function(e){var t=e.id,a=e.title,i=void 0===a?void 0:a,r=e.image,o=void 0===r?void 0:r,l=e.description,c=void 0===l?void 0:l,u=e.sort,d=void 0===u?void 0:u,p=e.course_ids,m=void 0===p?void 0:p,A=e.gov_ids,g=void 0===A?void 0:A,h=e.user_ids,v=void 0===h?void 0:h,f=e.score,k=void 0===f?0:f,C=e.type,y=void 0===C?void 0:C,x=e.stime,b=void 0===x?"":x,_=e.etime,w=void 0===_?"":_,B=s+"/edit/"+t;return n.a(B,{title:i,image:o,description:c,sort:d,course_ids:m,gov_ids:g,user_ids:v,score:k,type:y,stime:b,etime:w},!1).then(function(e){return e})}},{key:"getTask",value:function(e){var t=s+"/get/"+e;return n.b(t).then(function(e){return e})}},{key:"deleteCourseTask",value:function(e){var t=s+"/delete/"+e;return n.a(t,{})}},{key:"getCourseTaskTemplateEditDetail",value:function(e){var t=s+"/template/get/"+e;return n.b(t,{}).then(function(e){return e})}},{key:"getCourseTaskTemplateStudyCheck",value:function(e){var t=s+"/template/study/check";return n.b(t,e).then(function(e){return e.data})}},{key:"getCourseTaskTemplateList",value:function(e){var t=e.category_id,a=e.category_type,i=e.title,r=e.deleted,o=void 0===r?"-1":r,l=e.status,c=void 0===l?"-1":l,u=e.page,d=e.task_type,p=e.pagesize,m=s+"/template/lists";return n.b(m,{category_id:t,category_type:a,title:i,deleted:o,status:c,page:u,task_type:d,pagesize:p}).then(function(e){return e})}},{key:"CourseTaskTemplateUploadUrl",value:function(e){var t=e.avatar,a=e.alias,i=s+"/template/cover";return n.a(i,{avatar:t,alias:a})}},{key:"getCategoryCheck",value:function(e){var t=s+"/template/category/check";return n.b(t,e).then(function(e){return e.data})}},{key:"addCourseTaskTemplate",value:function(t){var a=s+"/template/create";return n.a(a,t).then(function(t){if(t.code)return e.reject(t)})}},{key:"updateCourseTaskTemplate",value:function(t){var a=t.id,i=t.task_type,r=t.category_id,o=t.title,l=t.description,c=t.image,u=t.course_ids,d=t.sort,p=t.score,m=t.study_duration,A=s+"/template/edit/"+a;return n.a(A,{task_type:i,category_id:r,title:o,description:l,image:c,course_ids:u,sort:d,score:p,study_duration:m}).then(function(t){if(t.code)return e.reject(t)})}},{key:"deleteCourseTaskTemplate",value:function(e){var t=s+"/template/delete/"+e;return n.a(t,{})}},{key:"publishCourseTaskTemplate",value:function(e){var t=s+"/template/"+e+"/publish";return n.a(t,{})}},{key:"revokeCourseTaskTemplate",value:function(e){var t=s+"/template/"+e+"/revoke";return n.a(t,{})}},{key:"getCategoryTree",value:function(e){var t=e.id,a=void 0===t?"tree":t,i=e.type,r=(e.filter,e.pid,e.level,e.pagesize),o=void 0===r?-1:r,l=s+"/template/category/lists";return n.b(l,{id:a,name:name,pagesize:o,type:i}).then(function(e){return e})}},{key:"create_cate",value:function(e){var t=(e.parent_id,e.name),a=(e.image,e.sort),i=e.type,r=s+"/template/category/create",o={name:t,sort:a,type:i};return n.a(r,o)}},{key:"update_cate",value:function(e){var t=e.name,a=(e.image,e.sort),i=e.id,r=s+"/template/category/edit/"+i;return n.a(r,{name:t,sort:a})}},{key:"delCategory",value:function(t){var a=t.id,i=s+"/template/category/delete/"+a;return n.a(i).then(function(t){return 0==t.code?(xmview.showTip("success",t.message),t.data):(xmview.showTip("error",t.message),e.reject(t))})}},{key:"getCategoryImageUrl",value:function(){return s+"/template/category/image"}},{key:"moveCategory",value:function(e){var t=e.id,a=e.to,i=s+"/template/category/"+t+"/move";return n.a(i,{to:a})}},{key:"moveCategoryContent",value:function(e){var t=e.id,a=e.to,i=s+"/template/category/"+t+"/move/content";return n.a(i,{to:a})}},{key:"offline",value:function(e){var t=e.id,a=e.disabled,i=s+"/edit/"+t;return n.a(i,{disabled:a})}},{key:"online",value:function(e){var t=e.id,a=e.disabled,i=s+"/edit/"+t;return n.a(i,{disabled:a})}},{key:"getUploadUrl",value:function(e){var t=e.image,a=e.alias,i=s+"/upload";return n.a(i,{image:t,alias:a}).then(function(e){return e.data})}}]),t}();t.a=new l}).call(t,a(1))},466:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=a(202),n=a.n(i),r=a(259),o=a(29);t.default={filters:{fillImgPath:o.fillImgPath},components:{DateRange:n.a},data:function(){return{TYPE:["","课程","考试","学习"],currCategoryName:"",loading:!1,fetchParam:{title:"",category_id:"",status:-1,deleted:-1,task_type:""},itemName:"",coursetasktemplateData:[],total:0,currentPage:1,pagesize:15,category_list:[]}},activated:function(){this.getData().then(function(){xmview.setContentLoading(!1)}),this.getCategory()},watch:{"fetchParam.task_type":function(){this.getCategory()}},methods:{getCategory:function(e){var t=this;r.a.getCategoryTree({pagesize:-1,type:this.fetchParam.task_type}).then(function(e){t.category_list=e.data})},querySearch:function(e,t){var a=this.restaurants;t(e?a.filter(this.createFilter(e)):a)},handleDelete:function(e,t){var a=this,i=this.TYPE[t.task_type];xmview.showDialog("你将要删除"+i+'任务【<i style="color:red">'+(t.title||"")+"</i>】操作不可恢复确认吗？",function(){r.a.deleteCourseTaskTemplate(t.id).then(function(t){a.coursetasktemplateData.splice(e,1),xmview.showTip("success","删除成功")})})},editItm:function(e){e.course=e.course||[],this.$router.push({name:"coursetask-template-add",params:{coursetaskInfo:e},query:{id:e.id}})},publishCourseTaskTemplate:function(e){xmview.showDialog('你将要上线课程任务【<i style="color:red">'+(e.title||"")+"</i>】吗？",this.publishItem(e.id))},publishItem:function(e){var t=this;return function(){r.a.publishCourseTaskTemplate(e).then(function(e){xmview.showTip("success","上线成功"),t.getData()}).catch(function(e){xmview.showTip("error",e.message)})}},revokeCourseTaskTemplate:function(e){xmview.showDialog('你将要下线课程任务【<i style="color:red">'+(e.title||"")+"</i>】吗？",this.revokeItem(e.id))},revokeItem:function(e){var t=this;return function(){r.a.revokeCourseTaskTemplate(e).then(function(e){xmview.showTip("success","下线成功"),t.getData()}).catch(function(e){xmview.showTip("error",e.message)})}},handleSizeChange:function(e){this.pagesize=e,this.getData()},handleCurrentChange:function(e){this.currentPage=e,this.getData()},getData:function(){var e=this;return this.loading=!0,r.a.getCourseTaskTemplateList({category_id:this.fetchParam.category_id,title:this.fetchParam.title,deleted:this.fetchParam.deleted,status:this.fetchParam.status,page:this.currentPage,pagesize:this.pagesize,task_type:this.fetchParam.task_type}).then(function(t){e.coursetasktemplateData=t.data,e.total=t._exts.total}).then(function(){e.loading=!1})},handleImgUploaded:function(e){this.form.cover=e.data.url},ueReady:function(e){this.editor=e}}}},546:function(e,t,a){t=e.exports=a(100)(!0),t.push([e.i,'.course-task-template-index .search>section{margin-bottom:14px;display:inline-block;margin-right:10px}.course-task-template-index .search>section>span,.course-task-template-index .search>section i{margin-right:2px}.course-task-template-index .search>section>*{vertical-align:middle;display:inline-block}.course-task-template-index .search .el-input{width:auto}.keyword-container{width:90%;margin-left:5%;margin-bottom:5px}.course-task-template-index{padding:15px;position:relative;border:1px solid #ededed;border-radius:5px;background:#fff}.course-task-template-index:after{content:"";clear:both;display:block}.course-task-template-index .pagin{float:right;margin-top:15px}.course-task-template-index .bottom-manage{margin-top:15px}.course-task-template-index .manage-container{position:absolute;right:0;top:-50px}.course-task-template-index .header-button.manage-container>.el-button i{margin-right:5px}.course-task-template-index .header-button.manage-container>.el-button i:before{position:relative;top:-1px}.text-blue{color:#20a0ff}.text-light-blue{color:#58b7ff}.text-dark-blue{color:#1d8ce0}.text-success{color:#13ce66}.text-warning{color:#f7ba2a}.text-danger{color:#ff4949}.course-task-template-index .block{text-align:right;margin-top:10px}.course-task-template-index .edui-editor{width:100%!important}.course-task-template-index .avatar-uploader .el-upload{border:1px dashed #d9d9d9;border-radius:6px;cursor:pointer;position:relative;overflow:hidden}.course-task-template-index .avatar-uploader .el-upload:hover{border-color:#20a0ff}.course-task-template-index .avatar-uploader-icon{font-size:28px;color:#8c939d;width:178px;height:178px;line-height:178px;text-align:center}.course-task-template-index .avatar{width:178px;height:178px;display:block}.course-task-template-index .img-wrap{margin-bottom:10px;width:150px!important;height:150px!important}.course-task-template-index .img-wrap img{width:100%;height:100%}.course-task-template-index .add{background:#ededed;padding:.2rem .4rem;border-bottom:1px solid #ededed}.course-task-template-index .desc{width:100%;height:100px}',"",{version:3,sources:["/home/baichenhui/devspace/sys_ui/assets/src/views/gov/courseTask/Coursetasktemplate.vue"],names:[],mappings:"AACA,4CAA4C,mBAAmB,qBAAqB,iBAAiB,CACpG,AACD,+FAA+F,gBAAgB,CAC9G,AACD,8CAA8C,sBAAsB,oBAAoB,CACvF,AACD,8CAA8C,UAAU,CACvD,AACD,mBAAmB,UAAU,eAAe,iBAAiB,CAC5D,AACD,4BAA4B,aAAa,kBAAkB,yBAAyB,kBAAkB,eAAe,CACpH,AACD,kCAAkC,WAAW,WAAW,aAAa,CACpE,AACD,mCAAmC,YAAY,eAAe,CAC7D,AACD,2CAA2C,eAAe,CACzD,AACD,8CAA8C,kBAAkB,QAAQ,SAAS,CAChF,AACD,yEAAyE,gBAAgB,CACxF,AACD,gFAAgF,kBAAkB,QAAQ,CACzG,AACD,WAAW,aAAa,CACvB,AACD,iBAAiB,aAAa,CAC7B,AACD,gBAAgB,aAAa,CAC5B,AACD,cAAc,aAAa,CAC1B,AACD,cAAc,aAAa,CAC1B,AACD,aAAa,aAAa,CACzB,AACD,mCAAmC,iBAAiB,eAAe,CAClE,AACD,yCAAyC,oBAAqB,CAC7D,AACD,wDAAwD,0BAA0B,kBAAkB,eAAe,kBAAkB,eAAe,CACnJ,AACD,8DAA8D,oBAAoB,CACjF,AACD,kDAAkD,eAAe,cAAc,YAAY,aAAa,kBAAkB,iBAAiB,CAC1I,AACD,oCAAoC,YAAY,aAAa,aAAa,CACzE,AACD,sCAAsC,mBAAmB,sBAAuB,sBAAuB,CACtG,AACD,0CAA0C,WAAW,WAAW,CAC/D,AACD,iCAAiC,mBAAmB,oBAAoB,+BAA+B,CACtG,AACD,kCAAkC,WAAW,YAAY,CACxD",file:"Coursetasktemplate.vue",sourcesContent:["\n.course-task-template-index .search>section{margin-bottom:14px;display:inline-block;margin-right:10px\n}\n.course-task-template-index .search>section>span,.course-task-template-index .search>section i{margin-right:2px\n}\n.course-task-template-index .search>section>*{vertical-align:middle;display:inline-block\n}\n.course-task-template-index .search .el-input{width:auto\n}\n.keyword-container{width:90%;margin-left:5%;margin-bottom:5px\n}\n.course-task-template-index{padding:15px;position:relative;border:1px solid #ededed;border-radius:5px;background:#fff\n}\n.course-task-template-index:after{content:'';clear:both;display:block\n}\n.course-task-template-index .pagin{float:right;margin-top:15px\n}\n.course-task-template-index .bottom-manage{margin-top:15px\n}\n.course-task-template-index .manage-container{position:absolute;right:0;top:-50px\n}\n.course-task-template-index .header-button.manage-container>.el-button i{margin-right:5px\n}\n.course-task-template-index .header-button.manage-container>.el-button i:before{position:relative;top:-1px\n}\n.text-blue{color:#20A0FF\n}\n.text-light-blue{color:#58B7FF\n}\n.text-dark-blue{color:#1D8CE0\n}\n.text-success{color:#13CE66\n}\n.text-warning{color:#F7BA2A\n}\n.text-danger{color:#FF4949\n}\n.course-task-template-index .block{text-align:right;margin-top:10px\n}\n.course-task-template-index .edui-editor{width:100% !important\n}\n.course-task-template-index .avatar-uploader .el-upload{border:1px dashed #d9d9d9;border-radius:6px;cursor:pointer;position:relative;overflow:hidden\n}\n.course-task-template-index .avatar-uploader .el-upload:hover{border-color:#20a0ff\n}\n.course-task-template-index .avatar-uploader-icon{font-size:28px;color:#8c939d;width:178px;height:178px;line-height:178px;text-align:center\n}\n.course-task-template-index .avatar{width:178px;height:178px;display:block\n}\n.course-task-template-index .img-wrap{margin-bottom:10px;width:150px !important;height:150px !important\n}\n.course-task-template-index .img-wrap img{width:100%;height:100%\n}\n.course-task-template-index .add{background:#ededed;padding:.2rem .4rem;border-bottom:1px solid #ededed\n}\n.course-task-template-index .desc{width:100%;height:100px\n}\n"],sourceRoot:""}])},664:function(e,t,a){var i=a(546);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);a(101)("b15b5b08",i,!0)},802:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("article",{staticClass:"course-task-template-index"},[a("article",{staticClass:"manage-container"},[a("el-button",{attrs:{icon:"plus",type:"primary"},on:{click:function(){return e.$router.push({name:"coursetask-template-add"})}}},[e._v("添加\n        ")])],1),e._v(" "),a("section",{staticClass:"search"},[a("section",[a("i",[e._v("课程名称")]),e._v(" "),a("el-input",{staticClass:"name",nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13))return null;e.getData(t)}},model:{value:e.fetchParam.title,callback:function(t){e.fetchParam.title=t},expression:"fetchParam.title"}})],1),e._v(" "),a("section",[a("i",[e._v("栏目类型")]),e._v(" "),a("el-select",{attrs:{clearable:"",placeholder:"未选择"},on:{change:e.getData},model:{value:e.fetchParam.task_type,callback:function(t){e.fetchParam.task_type=t},expression:"fetchParam.task_type"}},[a("el-option",{attrs:{label:"课程任务",value:"1"}}),e._v(" "),a("el-option",{attrs:{label:"试题任务",value:"2"}}),e._v(" "),a("el-option",{attrs:{label:"学习任务",value:"3"}})],1)],1),e._v(" "),a("section",[a("i",[e._v("类别")]),e._v(" "),a("el-form",{attrs:{prop:"category_id","fetch-suggestions":e.querySearch}},[a("el-select",{staticClass:"select",attrs:{clearable:"",placeholder:"请选择类别"},on:{change:e.getData},model:{value:e.fetchParam.category_id,callback:function(t){e.fetchParam.category_id=t},expression:"fetchParam.category_id"}},e._l(e.category_list,function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}))],1)],1)]),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{border:"",data:e.coursetasktemplateData}},[a("el-table-column",{attrs:{prop:"title",label:"课程任务"},scopedSlots:e._u([{key:"default",fn:function(t){return["1"==t.row.task_type?a("el-tag",{attrs:{type:"primary"}},[e._v("课程")]):"2"==t.row.task_type?a("el-tag",{attrs:{type:"danger"}},[e._v("考试")]):"3"==t.row.task_type?a("el-tag",{attrs:{type:"success"}},[e._v("学习")]):e._e(),e._v("\n                    "+e._s(t.row.title)+"\n                ")]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"study_duration",label:"课时(分)",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n                    "+e._s(Math.floor(t.row.study_duration/60))+"\n                ")]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"addate",label:"创建时间",width:"200"}}),e._v(" "),a("el-table-column",{attrs:{prop:"status_name",label:"状态",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[2==t.row.status?a("el-tag",{attrs:{type:"success"}},[e._v("正常")]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{prop:"operate",label:"操作",width:"160"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){e.editItm(t.row)}}},[e._v("\n                    修改\n                    ")]),e._v(" "),a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){e.handleDelete(t.$index,t.row)}}},[a("i",[e._v("删除")])])]}}])})],1),e._v(" "),a("section",{staticClass:"block"},[a("el-pagination",{attrs:{"current-page":e.currentPage,"page-size":e.pagesize,"page-sizes":[15,30,60,100],layout:"total, sizes, ->, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},staticRenderFns:[]}}});
//# sourceMappingURL=90.d45b5ba86d1d488eb609.js.map