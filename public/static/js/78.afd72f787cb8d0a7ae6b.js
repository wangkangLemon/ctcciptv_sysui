webpackJsonp([78],{133:function(e,t,n){n(645);var i=n(5)(n(428),n(779),null,null);e.exports=i.exports},230:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:{value:Array,closable:{type:Boolean,default:!0}},data:function(){return{currVal:this.value||[],inputVisible:!1,inputValue:void 0}},created:function(){},activated:function(){},watch:{value:function(e){(e!=this.currVal||e&&e.length!=this.currVal.length)&&(this.currVal=e)},currVal:function(e){e.length==this.currVal&&e==this.currVal||this.$emit("input",e)}},methods:{handleClose:function(e){this.currVal.splice(this.currVal.indexOf(e),1)},showInput:function(){var e=this;this.inputVisible=!0,this.$nextTick(function(t){e.$refs.saveTagInput.$refs.input.focus()})},handleInputConfirm:function(){var e=this.inputValue;e&&this.currVal.push(e),this.inputVisible=!1,this.inputValue=""}},components:{}}},231:function(e,t,n){t=e.exports=n(100)(!0),t.push([e.i,"#component-form-tags{display:inline-block}#component-form-tags .el-tag{margin-right:5px}#component-form-tags .input-new-tag{display:inline-block;width:80px!important}","",{version:3,sources:["/home/baichenhui/devspace/sys_ui/assets/src/views/component/form/Tags.vue"],names:[],mappings:"AACA,qBAAqB,oBAAoB,CACxC,AACD,6BAA6B,gBAAgB,CAC5C,AACD,oCAAoC,qBAAqB,oBAAqB,CAC7E",file:"Tags.vue",sourcesContent:["\n#component-form-tags{display:inline-block\n}\n#component-form-tags .el-tag{margin-right:5px\n}\n#component-form-tags .input-new-tag{display:inline-block;width:80px !important\n}\n"],sourceRoot:""}])},232:function(e,t,n){var i=n(231);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);n(101)("0db94868",i,!0)},233:function(e,t,n){n(232);var i=n(5)(n(230),n(234),null,null);e.exports=i.exports},234:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("article",{attrs:{id:"component-form-tags"}},[e._l(e.currVal,function(t){return n("el-tag",{key:t,attrs:{closable:e.closable,"close-transition":!1},on:{close:function(n){e.handleClose(t)}}},[n("i",[e._v(e._s(t))])])}),e._v(" "),e.inputVisible?n("el-input",{ref:"saveTagInput",staticClass:"input-new-tag",attrs:{placeholder:"输入标签",size:"mini"},on:{blur:e.handleInputConfirm},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13))return null;e.handleInputConfirm(t)}},model:{value:e.inputValue,callback:function(t){e.inputValue=t},expression:"inputValue"}}):n("el-button",{attrs:{size:"small"},on:{click:e.showInput}},[e._v("添加标签")])],2)},staticRenderFns:[]}},256:function(e,t,n){"use strict";(function(e){function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var o=n(6),a=n(0),r=n(2),s=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),c=a.a.apiHost+"/video",l=function(){function t(){i(this,t)}return s(t,[{key:"search",value:function(e){var t=e.page,n=e.pagesize,i=e.status,a=e.file_name,r=e.time_start,s=e.time_end,l=c+"/lists";return null!=i&&""!==i||(i=-1),o.b(l,{page:t,pagesize:n,status:i,file_name:a,time_start:r,time_end:s}).then(function(e){return e})}},{key:"update",value:function(e){var t=e.id,n=e.name,i=e.tags,a=e.cover,r=e.duration,s=c+"/"+t+"/";return o.a(s,{name:n,tags:i,cover:a,duration:r})}},{key:"delete",value:function(e){var t=e.id,n=c+"/delete/"+t;return o.a(n)}},{key:"deleteMulty",value:function(e){var t=e.id,n=c+"/batchdel";return o.a(n,{id:t})}},{key:"getOssToken",value:function(){var e=c+"/video/upload";return o.b(e,{}).then(function(e){return e.data})}},{key:"refreshStatus",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.id,n=c+"/refresh/aliyun/status";return o.a(n,{id:t})}},{key:"getPreviewInfo",value:function(e){var t=c+"/"+e+"/preview";return o.b(t).then(function(e){return e.data})}},{key:"getVideo",value:function(e,t,n,i,a,r,s,l,u){var d=c+"/lists";return o.b(d,e,t,n,i,a,r,s,l,u).then(function(e){return e})}},{key:"create",value:function(e){var t=e.file_name,n=e.size,i=e.gov_id,a=e.tags,r=e.source_type,s=e.source_url,l=c+"/create";return o.a(l,{file_name:t,size:n,gov_id:i,tags:a,source_type:r,source_url:s})}},{key:"updateVideo",value:function(e){var t=e.file_name,n=e.gov_id,i=e.tags,a=e.cover,s=e.duration,l=e.material_id;n=n||r.a.getUserInfo().gov_id;var u=c+"/edit/"+l;return o.a(u,{file_name:t,gov_id:n,tags:i,cover:a,duration:s})}},{key:"getOssToken",value:function(){var e=a.a.apiHost+"/video/upload";return o.b(e).then(function(e){return e.data})}},{key:"refreshVideoStatus",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.companyid,n=e.id;t=t||r.a.getUserInfo().company_id;var i=c+"/refresh/"+n;return o.a(i,{id:n}).then(function(e){return e})}},{key:"getUploadCoverUrl",value:function(){return c+"/cover"}},{key:"deleteVideo",value:function(t){var n=t.id,i=c+"/delete/"+n;return o.a(i).then(function(t){return 0==t.code?(xmview.showTip("success","操作成功"),t):(xmview.showTip("error",t.message),e.reject(t))})}},{key:"getVideoPreviewUrl",value:function(e){var t=c+"/get/"+e;return o.b(t).then(function(e){return e.data})}},{key:"auditVideo",value:function(e){var t=c+"/video/"+e.id+"/audit";return o.a(t,e)}}]),t}();t.a=new l}).call(t,n(1))},428:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(233),o=n.n(i),a=n(519),r=n(256),s=n(2),c=new a.a;t.default={name:"course-video-add",components:{vTags:o.a},data:function(){return{listData:[],uploading:!1}},beforeCreate:function(){this.user=s.a.getUserInfo()},mounted:function(){xmview.setContentLoading(!1)},methods:{fileChange:function(e){for(var t,n=e.target,i=[],o=0;o<n.files.length;o++){var a=n.files[o];this.checkExist(a.name)?xmview.showTip("warning",a.name+" 已存在于列表中"):i.push({name:a.name,tags:[],file:a,process:0})}(t=this.listData).push.apply(t,i),n.value=null},deleteVideo:function(e){this.listData.splice(e,1)},fileClick:function(){this.$refs.file.click()},submit:function(){this.uploading=!0,this.listData.length>0&&this.uploadVideo()},uploadVideo:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,n=this.listData[t];r.a.getOssToken().then(function(i){c=new a.a(i);var o=new Date,s=["yxt",e.user.id,o.getFullYear(),o.getMonth()+1,o.getDate(),[o.getHours(),o.getMinutes(),o.getSeconds(),(Math.random()+1).toString(36).substring(7)].join("")].join("/")+e.extname(n.file);c.uploadFile(s,n.file,function(e){n.process=e},function(i){r.a.create({gov_id:e.user.id,size:"",file_name:n.name,tags:n.tags.join(","),source_type:"aliyun",source_url:i.res.requestUrls[0].split("?")[0]}).then(function(){t++,t<e.listData.length?e.uploadVideo(t):t>=e.listData.length&&(xmview.showTip("success","操作成功!"),setTimeout(function(){e.$router.back()},300)),c=new a.a(i)})},function(e){xmview.showTip("error","上传出现错误"+JSON.stringify(e))})})},checkExist:function(e){for(var t=0;t<this.listData.length;t++)if(this.listData[t].name===e)return!0;return!1},extname:function(e){var t=e.name||"",n=t.split(".");return n.shift(),n.length?"."+n.pop():""}}}},519:function(e,t,n){"use strict";(function(e){t.a=function(t,n){function i(e,t){var n=c.getFileKey(e);window.localStorage.setItem(n,JSON.stringify(t))}function o(e){var t=c.getFileKey(e);window.localStorage.removeItem(t)}function a(e){var t=c.getFileKey(e),n=window.localStorage.getItem(t);return n&&(n=JSON.parse(n)),n||(n={}),n.file=e,n}t&&(t.accessKeyId=t.AccessKeyId,t.accessKeySecret=t.AccessKeySecret,t.stsToken=t.SecurityToken,t.bucket=t.BucketName,t.region=t.Region,t.secure="https:"===location.protocol);var r=window.OSS&&new OSS.Wrapper(t),s={},c=this;window.OSS||new e(function(e,t){var n=document.createElement("script");n.src="//gosspublic.alicdn.com/aliyun-oss-sdk.min.js",document.head.appendChild(n),n.onload=function(){e(!0)}}).then(function(){r=new OSS.Wrapper(t)}),this.getFileKey=function(e){return"aliyun.oss.multipartUpload."+[e.name,e.type,e.size,e.lastModified||"",e.webkitRelativePath||""].join("|")},this.uploadFile=function(e,t,s,l,u){var d=a(t)||{};d.file=t,r.multipartUpload(e,t,{partSize:262144,checkpoint:d,progress:function(e,n){return function(o){s&&s(Math.floor(100*e)),i(t,n),o()}}}).then(function(e){o(t),l&&l(e)}).catch(function(i){["AccessDenied","InvalidAccessKeyId","SignatureDoesNotMatch"].indexOf(i.code)>-1&&n?n(function(n){r.options.accessKeyId=n.accessKeyId,r.options.accessKeySecret=n.accessKeySecret,r.options.stsToken=n.stsToken,c.uploadFile(e,t,s,l,u)}):(o(t),u&&u(i))}).catch(function(e){})},this.cancelUploadFile=function(e){var t=c.getFileKey(e),n=s[t];n&&r.abortMultipartUpload(n.name,n.uploadId)}}}).call(t,n(1))},527:function(e,t,n){t=e.exports=n(100)(!0),t.push([e.i,'#course-video-add-container{padding:15px;border:1px solid #ededed;border-radius:5px;background:#fff}#course-video-add-container:after{content:"";clear:both;display:block}#course-video-add-container .pagin{float:right;margin-top:15px}#course-video-add-container .bottom-manage{margin-top:15px}.text-blue{color:#20a0ff}.text-light-blue{color:#58b7ff}.text-dark-blue{color:#1d8ce0}.text-success{color:#13ce66}.text-warning{color:#f7ba2a}.text-danger{color:#ff4949}#course-video-add-container .first-select-box{left:50%;top:50%;transform:translateX(-50%) translateY(-50%)}.keyword-container{width:90%;margin-left:5%;margin-bottom:5px}#course-video-add-container{min-height:300px;position:relative}#course-video-add-container .first-select-box{position:absolute}#course-video-add-container .first-select-box section{margin-bottom:10px}#course-video-add-container .box-card{margin:0 auto;width:700px;margin-bottom:15px;transition:all .3s ease}#course-video-add-container .box-card .clearfix{display:-ms-flexbox;display:flex}#course-video-add-container .box-card .clearfix span{-ms-flex:1;flex:1;height:34px;line-height:34px}#course-video-add-container .box-card .clearfix .el-button{-ms-flex:0;flex:0}#course-video-add-container .box-card .el-card__header{padding:5px 10px;background:#f8f8f8}#course-video-add-container .bottom-btn{margin:0 auto;width:700px}#course-video-add-container .bottom-btn .el-button:last-of-type{float:right}',"",{version:3,sources:["/home/baichenhui/devspace/sys_ui/assets/src/views/course/video/Add.vue"],names:[],mappings:"AACA,4BAA4B,aAAa,AAAkB,yBAAyB,kBAAkB,eAAe,CACpH,AACD,kCAAkC,WAAW,WAAW,aAAa,CACpE,AACD,mCAAmC,YAAY,eAAe,CAC7D,AACD,2CAA2C,eAAe,CACzD,AACD,WAAW,aAAa,CACvB,AACD,iBAAiB,aAAa,CAC7B,AACD,gBAAgB,aAAa,CAC5B,AACD,cAAc,aAAa,CAC1B,AACD,cAAc,aAAa,CAC1B,AACD,aAAa,aAAa,CACzB,AACD,8CAA8C,SAAS,QAAQ,2CAA2C,CACzG,AACD,mBAAmB,UAAU,eAAe,iBAAiB,CAC5D,AACD,4BAA4B,iBAAiB,iBAAiB,CAC7D,AACD,8CAA8C,iBAAiB,CAC9D,AACD,sDAAsD,kBAAkB,CACvE,AACD,sCAAsC,cAAc,YAAY,mBAAmB,uBAAyB,CAC3G,AACD,gDAAgD,oBAAoB,YAAY,CAC/E,AACD,qDAAqD,WAAW,OAAO,YAAY,gBAAgB,CAClG,AACD,2DAA2D,WAAW,MAAM,CAC3E,AACD,uDAAuD,iBAAiB,kBAAkB,CACzF,AACD,wCAAwC,cAAc,WAAW,CAChE,AACD,gEAAgE,WAAW,CAC1E",file:"Add.vue",sourcesContent:["\n#course-video-add-container{padding:15px;position:relative;border:1px solid #ededed;border-radius:5px;background:#fff\n}\n#course-video-add-container:after{content:'';clear:both;display:block\n}\n#course-video-add-container .pagin{float:right;margin-top:15px\n}\n#course-video-add-container .bottom-manage{margin-top:15px\n}\n.text-blue{color:#20A0FF\n}\n.text-light-blue{color:#58B7FF\n}\n.text-dark-blue{color:#1D8CE0\n}\n.text-success{color:#13CE66\n}\n.text-warning{color:#F7BA2A\n}\n.text-danger{color:#FF4949\n}\n#course-video-add-container .first-select-box{left:50%;top:50%;transform:translateX(-50%) translateY(-50%)\n}\n.keyword-container{width:90%;margin-left:5%;margin-bottom:5px\n}\n#course-video-add-container{min-height:300px;position:relative\n}\n#course-video-add-container .first-select-box{position:absolute\n}\n#course-video-add-container .first-select-box section{margin-bottom:10px\n}\n#course-video-add-container .box-card{margin:0 auto;width:700px;margin-bottom:15px;transition:all 300ms ease\n}\n#course-video-add-container .box-card .clearfix{display:-ms-flexbox;display:flex\n}\n#course-video-add-container .box-card .clearfix span{-ms-flex:1;flex:1;height:34px;line-height:34px\n}\n#course-video-add-container .box-card .clearfix .el-button{-ms-flex:0;flex:0\n}\n#course-video-add-container .box-card .el-card__header{padding:5px 10px;background:#f8f8f8\n}\n#course-video-add-container .bottom-btn{margin:0 auto;width:700px\n}\n#course-video-add-container .bottom-btn .el-button:last-of-type{float:right\n}\n"],sourceRoot:""}])},645:function(e,t,n){var i=n(527);"string"==typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);n(101)("61c66f71",i,!0)},779:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("main",{attrs:{id:"course-video-add-container"}},[e.listData.length<1?n("section",{staticClass:"first-select-box"},[n("el-button",{attrs:{type:"primary"},on:{click:e.fileClick}},[n("i",{staticClass:"el-icon-upload el-icon--right"}),e._v(" "),n("i",[e._v(" 选择要上传的视频文件")])])],1):e._e(),e._v(" "),e._l(e.listData,function(t,i){return n("el-card",{key:i,staticClass:"box-card"},[n("div",{staticClass:"clearfix",slot:"header"},[n("span",[e._v(e._s(t.name))]),e._v(" "),n("el-button",{attrs:{type:"text",icon:"delete"},on:{click:function(t){e.deleteVideo(i)}}})],1),e._v(" "),n("el-form",{attrs:{"label-width":"120px"}},[n("el-form-item",{attrs:{label:"视频名称"}},[n("el-input",{model:{value:t.name,callback:function(e){t.name=e},expression:"item.name"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"视频标签"}},[n("vTags",{model:{value:t.tags,callback:function(e){t.tags=e},expression:"item.tags"}})],1),e._v(" "),n("el-form-item",{attrs:{label:""}},[n("el-progress",{attrs:{percentage:t.process,status:t.process>=100?"success":""}})],1)],1)],1)}),e._v(" "),e.listData.length>0?n("div",{staticClass:"bottom-btn"},[n("el-button",{attrs:{disabled:e.uploading},on:{click:e.fileClick}},[e._v("继续添加视频")]),e._v(" "),n("el-button",{attrs:{type:"primary",disabled:e.uploading},on:{click:e.submit}},[n("i",[e._v(e._s(e.uploading?"正在上传":"开始上传"))])])],1):e._e(),e._v(" "),n("input",{ref:"file",staticStyle:{display:"none"},attrs:{type:"file",multiple:"multiple",accept:"audio/mp4, video/mp4,video/mpeg,video/mpg"},on:{change:function(t){e.fileChange(t)}}})],2)},staticRenderFns:[]}}});
//# sourceMappingURL=78.afd72f787cb8d0a7ae6b.js.map