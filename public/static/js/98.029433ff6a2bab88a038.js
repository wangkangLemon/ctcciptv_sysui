webpackJsonp([98],{107:function(e,t,i){i(667);var n=i(5)(i(387),i(806),null,null);e.exports=n.exports},347:function(e,t,i){"use strict";(function(e){var n=(i(0),void 0),a={initLogin:function(t){return new e(function(e,t){if(window.WxLogin)return void e(!0);var i=document.createElement("script");i.src="//res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js",document.head.appendChild(i),i.onload=function(){e(!0)}}).then(function(){return t=Object.assign({},t,{style:"white",href:""}),t.redirect_uri=encodeURIComponent(t.redirect_uri),new window.WxLogin(t)}).catch(function(e){})},buildUrl:function(e){var t=e.appid,i=e.scope,n=e.redirect_uri;return"https://open.weixin.qq.com/connect/qrconnect?state="+e.state+"&appid="+t+"&scope="+i+"&redirect_uri="+encodeURIComponent(n)+"&login_type=jssdk&style=white"},openWechatLogin:function(e,t){var i=e.appid,o=e.scope,c=e.redirect_uri,r=e.state,l=e.verify;n&&window.removeEventListener("message",n),l&&(c=c.replace("verify=","verify="+l));var s=window.open(a.buildUrl({appid:i,scope:o,redirect_uri:c,state:r}));n=function(e){t(e.data),s.close(),window.removeEventListener("message",n),s=null,n=null},window.addEventListener("message",n,!1)}};t.a=a}).call(t,i(1))},387:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=i(347),a=i(516),o=i(2);t.default={data:function(){return{loadingdata:!1,wechat:void 0,email:void 0,sms:void 0,wechatConfig:void 0,user:{},codeWaitSecond:0,smsCode:void 0,emailCode:void 0,tabSelected:"first",logining:!1}},created:function(){var e=this.$route.query.callback?JSON.parse(this.$route.query.callback):void 0;e&&0==e.code?(o.a.setTwiceToken(e.data.adminTwoStepAuthToken),this.$router.replace({name:"main"})):e&&(xmview.showTip("error",e.message),this.$router.replace({name:"login-twice"})),this.user=o.a.getUserInfo(),this.loadingdata=!0},mounted:function(){var e=this;a.a.getSafeSetInfo().then(function(t){t&&(t.sms||t.email||t.wechat)?(e.sms=t.sms,e.email=t.email,e.wechat=t.wechat,e.wechatConfig=t.wechatConfig):e.$router.replace({name:"mine-safeset"}),e.loadingdata=!1,e.wechat?e.tabSelected="wechat":e.sms?e.tabSelected="sms":e.tabSelected="email"}).then(function(){e.wechatConfig&&(e.wechatConfig.redirect_uri=e.wechatConfig.redirect_uri+"&redirect_url="+window.location.href,e.wechatConfig.id="login-twice-wechatlogin",e.$nextTick(function(){n.a.initLogin(e.wechatConfig)}))}).catch(function(t){e.loadingdata=!1})},beforeDestroy:function(){xmview.closeAllTip()},methods:{sendValidCode:function(e){var t=this;this.codeWaitSecond=-1;var i=void 0;0==e?i=a.a.sendSmsValidcode():1==e&&(i=a.a.sendEmailValidcode()),i.then(function(){xmview.showTip("success","验证码发送成功,请注意查收"),t.codeWaitSecond=60;var e=setInterval(function(){--t.codeWaitSecond<=0&&clearInterval(e)},1e3)}).catch(function(){t.codeWaitSecond=0})},login:function(e){var t=this;this.logining=!0;var i=0==e?this.smsCode:this.emailCode;(0==e?a.a.twiceSmsValid({code:i}):a.a.twiceEmailValid({code:i})).then(function(e){o.a.setTwiceToken(e);for(var i=o.a.getNavMenu()[0];i.children&&i.children.length>0;)i=i.children[0];t.$router.push({path:i.item.menu_url}),xmview.showTip("success","验证成功, 跳转中...",1e9)}).catch(function(){setTimeout(function(){t.logining=!1},300)})}},components:{}}},516:function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var a=i(6),o=i(0),c=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),r=o.a.apiHost+"/two-step",l=function(){function e(){n(this,e)}return c(e,[{key:"getSafeSetInfo",value:function(){var e=r+"/";return a.b(e).then(function(e){return e.data})}},{key:"sendEmailValidcode",value:function(){var e=r+"/email/send";return a.a(e)}},{key:"sendSmsValidcode",value:function(){var e=r+"/sms/send";return a.a(e)}},{key:"twiceSmsValid",value:function(e){var t=e.code,i=r+"/sms/verify";return a.a(i,{code:t}).then(function(e){return e.data.userTwoStepAuthToken})}},{key:"twiceEmailValid",value:function(e){var t=e.code,i=r+"/email/verify";return a.a(i,{code:t}).then(function(e){return e.data.userTwoStepAuthToken})}}]),e}();t.a=new l},549:function(e,t,i){t=e.exports=i(100)(!0),t.push([e.i,"#login-twice{position:absolute;min-height:100%;width:100%;background:#d9e0e7}#login-twice>*{width:500px;margin:0 auto}#login-twice .tip{color:#666;margin-bottom:15px;display:block}#login-twice h5{margin-top:35px;text-align:right}#login-twice .el-card__header{padding:10px;background:#f8f8f8}#login-twice .el-input{width:50%;display:inline-block;vertical-align:top}#login-twice .center-slit{margin:9px 0}#login-twice #login-twice-wechatlogin{text-align:center}","",{version:3,sources:["/home/baichenhui/devspace/sys_ui/assets/src/views/base/login/TwiceValid.vue"],names:[],mappings:"AACA,aAAa,kBAAkB,gBAAgB,WAAW,kBAAkB,CAC3E,AACD,eAAe,YAAY,aAAa,CACvC,AACD,kBAAkB,WAAW,mBAAmB,aAAa,CAC5D,AACD,gBAAgB,gBAAgB,gBAAgB,CAC/C,AACD,8BAA8B,aAAa,kBAAkB,CAC5D,AACD,uBAAuB,UAAU,qBAAqB,kBAAkB,CACvE,AACD,0BAA0B,YAAY,CACrC,AACD,sCAAsC,iBAAiB,CACtD",file:"TwiceValid.vue",sourcesContent:["\n#login-twice{position:absolute;min-height:100%;width:100%;background:#d9e0e7\n}\n#login-twice>*{width:500px;margin:0 auto\n}\n#login-twice .tip{color:#666;margin-bottom:15px;display:block\n}\n#login-twice h5{margin-top:35px;text-align:right\n}\n#login-twice .el-card__header{padding:10px;background:#f8f8f8\n}\n#login-twice .el-input{width:50%;display:inline-block;vertical-align:top\n}\n#login-twice .center-slit{margin:9px 0\n}\n#login-twice #login-twice-wechatlogin{text-align:center\n}\n"],sourceRoot:""}])},667:function(e,t,i){var n=i(549);"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);i(101)("36755416",n,!0)},806:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("article",{directives:[{name:"loading",rawName:"v-loading",value:e.loadingdata,expression:"loadingdata"}],attrs:{id:"login-twice"}},[i("h5",[i("i",[e._v(e._s(e.user.name)+"，")]),e._v(" "),i("el-button",{attrs:{type:"text"},on:{click:function(t){e.$router.replace({name:"login"})}}},[e._v("切换账号")])],1),e._v(" "),i("el-card",{staticClass:"box-card"},[i("div",{staticClass:"head",slot:"header"},[i("i",[e._v("二次验证")])]),e._v(" "),i("div",{staticClass:"container"},[i("i",{staticClass:"tip"},[i("i",{staticClass:"el-icon-warning"}),e._v(" 为进一步确保您的账号信息和其他内容的安全，请选择任一种方式进行账号校验")]),e._v(" "),i("el-tabs",{attrs:{type:"card",value:e.tabSelected}},[e.wechat?i("el-tab-pane",{attrs:{label:"微信扫码登录",name:"wechat"}},[i("div",[e._v("您设置的验证微信账号是："+e._s(e.wechat.data)+", 请扫码登录")]),e._v(" "),i("div",{attrs:{id:"login-twice-wechatlogin"}})]):e._e(),e._v(" "),e.sms?i("el-tab-pane",{attrs:{label:"手机号码验证",name:"sms"}},[i("i",[e._v("您设置的手机号码是 ("+e._s(e.sms.data)+")")]),e._v(" "),i("div",{staticClass:"center-slit"},[i("el-input",{attrs:{placeholder:"填写手机验证码"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13))return null;e.login(0)}},model:{value:e.smsCode,callback:function(t){e.smsCode=t},expression:"smsCode"}}),e._v(" "),i("el-button",{attrs:{disabled:0!==e.codeWaitSecond},on:{click:function(t){e.sendValidCode(0)}}},[e.codeWaitSecond<=0?i("i",[e._v("发送验证码")]):i("i",[e._v(e._s(e.codeWaitSecond)+" 秒后重发")])])],1),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:function(t){e.login(0)}}},[e._v("登录")])],1):e._e(),e._v(" "),e.email?i("el-tab-pane",{attrs:{label:"邮箱验证",name:"email"}},[i("i",[e._v("您设置的邮箱码是 ("+e._s(e.email.data)+")")]),e._v(" "),i("div",{staticClass:"center-slit"},[i("el-input",{attrs:{placeholder:"填写邮箱验证码"},nativeOn:{keyup:function(t){if(!("button"in t)&&e._k(t.keyCode,"enter",13))return null;e.login(1)}},model:{value:e.emailCode,callback:function(t){e.emailCode=t},expression:"emailCode"}}),e._v(" "),i("el-button",{attrs:{disabled:0!==e.codeWaitSecond},on:{click:function(t){e.sendValidCode(1)}}},[e.codeWaitSecond<=0?i("i",[e._v("发送验证码")]):i("i",[e._v(e._s(e.codeWaitSecond)+" 秒后重发")])])],1),e._v(" "),i("el-button",{attrs:{type:"primary",disabled:e.logining},on:{click:function(t){e.login(1)}}},[e.logining?i("i",[e._v("登录中...")]):i("i",[e._v("登录")])])],1):e._e()],1)],1)])],1)},staticRenderFns:[]}}});
//# sourceMappingURL=98.029433ff6a2bab88a038.js.map