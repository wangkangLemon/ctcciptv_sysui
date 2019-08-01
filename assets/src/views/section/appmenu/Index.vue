<!--首页导航-->
<style lang='scss' rel='stylesheet/scss'>
    @import "../../../utils/mixins/topSearch";
    @import "../../../utils/mixins/common";
    @import "../../../utils/mixins/mixins";

    .index-nav-container {
        @extend %content-container;
        background: #fff;
        border: 1px solid #ededed;
        .search {
            padding-top: 20px;
            padding-bottom: 6px;
            padding-left: 15px;
            @extend %top-search-container;
            border-bottom: 1px solid #ddd;
        }
        .add {
            @extend %right-top-btnContainer;
        }
        .form {
            .img-wrap {
                width: 140px;
                height: 140px;
                >img {
                    border-radius: 50%;
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .nav-list {
            padding: 10px;
            border-bottom: 1px solid #ededed;
            letter-spacing: -3px;
            font-size: 0;
            &:hover {
                background: #ededed;
            }
            >section {
                display: inline-block;
                vertical-align: top;
            }
            .nav-imgs {
                width: 86%;
                letter-spacing: -3px;
                font-size: 0;
                .nav-item {
                    margin-top: 10px;
                    width: 12.5%;
                    display: inline-block;
                    vertical-align: top;
                    text-align: center;
                    position: relative;
                    .operate-layer {
                        visibility: hidden;
                        font-size: 18px;
                        position: absolute;
                        top: 0;
                        @extend %horizontalCenter;
                        display: inline-block;
                        vertical-align: top;
                        width: 80px;
                        height: 80px;
                        background: rgba(0, 0, 0, 0.3);
                        border-radius: 50%;
                        text-align: left;
                        i {
                            margin-top: 10px;
                        }
                        .el-icon-circle-cross {
                            float: right;
                            margin-top: 13px;
                        }
                    }
                    img {
                        border-radius: 50%;
                        width: 80px;
                        height: 80px;
                    }
                    p {
                        letter-spacing: 0;
                        margin-top: 5px;
                        font-size: 14px;
                    }
                    &.active {
                        &:hover {
                            cursor: pointer;
                        }
                    }
                    &.additem {
                        cursor: pointer;
                    }
                }
            }
            .nav-operate {
                letter-spacing: 0;
                font-size: 14px;
                width: 13%;
                text-align: center;
                margin-top: 20px;
            }
            .platform {
                font-size: 14px;
                letter-spacing: 0;
                margin-top: 10px;
                * {
                    display: inline-block;
                    vertical-align: top;
                }
                >i {
                    width: 105px;
                    margin-top: 5px;
                }
                >div {
                    width: 80%;
                    >em {
                        margin: 5px;
                        padding: 2px 5px;
                        background: rgba(0, 0, 0, 0.1);
                    }
                }
                strong{
                    color:#20a0ff;
                }
            }
        }
        .apply-version {
            .el-dialog__body {
                /*padding: 0;*/
            }
            p {
                padding-bottom: 10px;
            }
            section {
                display: flex;
                margin-bottom: 10px;
                >i {
                    display: block;
                    width: 100px;
                    text-align: right;
                }
                .el-checkbox-group {
                    width: 80%;
                    .el-checkbox {
                        margin-left: 15px;
                        margin-bottom: 10px;
                    }
                }
            }
        }
        .block {
            text-align: right;
            padding: 10px 0;
        }
    }
</style>
<template>
    <article class="index-nav-container" v-loading="containerLoading">
        <!--添加/编辑组     方案====菜单组 -->
        <el-dialog :title="dialogGroupTitle" v-model="addForm">
            <el-form :model="fetchGroup" :rules="grouprules" ref="fetchGroup" :label-width="formLabelWidth">
                <el-form-item prop="version" label="分组名称">
                    <el-input v-model="fetchGroup.version" placeholder="分组名称如v1 v2" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="adapter" label="适配版本">
                    <el-input v-model="fetchGroup.adapter" placeholder="适配版本" auto-complete="off"></el-input>
                </el-form-item>
                <!--<el-form-item prop="used" label="是否使用中">
                    <el-radio-group v-model="fetchGroup.used">
                        <el-radio :label="0">未使用</el-radio>
                        <el-radio :label="1">使用</el-radio>
                    </el-radio-group>
                </el-form-item>-->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addForm = false">取 消</el-button>
                <el-button type="primary" @click="submitGroupData('fetchGroup')">确 定</el-button>
            </div>
        </el-dialog>
        <!--添加编辑/弹窗  appmenu添加-->
        <el-dialog class="form" :title="dialogTitle" v-model="changeIcon" @open="dialogOpen">
            <el-form :model="form" :rules="rules" ref="form" label-width="120px">
                <el-form-item label="推荐类别">
                    <el-select clearable v-model="form.model">
                        <el-option label="原生功能" value="native"></el-option>
                        <el-option label="混合应用" value="hybrid"></el-option>
                        <el-option label="添加链接" value="link"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="功能支持版本" v-if="form.type == 'app_module'">
                    <el-select clearable placeholder="全部" v-model="form.version">
                        <el-option v-for="(item,index) in modulesVersions" :label="item" :value="item" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <!--<el-form-item prop="type_id" label="选择功能" v-if="form.type == 'app_module'">
                    <el-select v-model="form.type_id" @change="getDefaultLogo">
                        <el-option v-for="(item,index) in items" :label="item.name" :value="item.id" :key="index"></el-option>
                    </el-select>
                </el-form-item>-->
                <el-form-item prop="category_id" label="课程栏目">
                    <el-select v-model="form.category_id" @change="getCourseCataName(category_id)" :placeholder="form.courseName">
                        <el-option v-for="(item,index) in CourseCatas" :label="item.name" :value="item.id" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="icon" v-loading="loading" label="应用logo">
                    <div class="img-wrap" v-if="form.icon">
                        <img :src="form.icon | fillImgPath" alt="" />
                    </div>
                    <p class="tip">建议上传图片尺寸为 140*140</p>
                    <el-button type="primary" @click="() => {$refs.imgcropper.chooseImg()}">上传</el-button>
                </el-form-item>
                <el-form-item prop="name" label="应用名称">
                    <el-input v-model="form.name" placeholder="控制在4个字以内，展示效果最佳"></el-input>
                </el-form-item>
                <el-form-item prop="title" label="标题">
                    <el-input v-model="form.title" placeholder="请输入标题"></el-input>
                </el-form-item>
                <el-form-item prop="sort" label="排序" v-if="form.id">
                    <el-input v-model="form.sort" placeholder="请输入序列号"></el-input>
                </el-form-item>
                <el-form-item prop="path" label="应用链接" >
                    <el-input v-model="form.path" placeholder="请以http://或者https://开头"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="changeIcon = false">取 消</el-button>
                <el-button type="primary" @click="submit('form')">确 定</el-button>
            </div>
        </el-dialog>
        <!--启用弹窗-->
        <el-dialog class="apply-version" title="选择方案应用平台和版本" :visible.sync="versionDialog">
            <article v-loading="versionLoading">
                <p>此方案可应用到以下平台版本：</p>
                <section>
                    <i>Android：</i>
                    <el-checkbox-group v-model="checkedAndroids" @change="(value)=>{checkedAndroids=[...value]}">
                        <el-checkbox v-for="(item,index) in platForm.android" :label="item" :key="index">{{item}}</el-checkbox>
                    </el-checkbox-group>
                </section>
                <section>
                    <i>iOS：</i>
                    <el-checkbox-group v-model="checkedIos" @change="(value)=>{checkedIos=[...value]}">
                        <el-checkbox v-for="(item,index) in platForm.ios" :label="item" :key="index">{{item}}</el-checkbox>
                    </el-checkbox-group>
                </section>
            </article>
            <div slot="footer" class="dialog-footer">
                <el-button @click="versionDialog = false">取 消</el-button>
                <el-button type="primary" @click="activeScheme">启 用</el-button>
            </div>
        </el-dialog>
        <div class="add">
            <el-button type="primary" icon="plus" class="recharge" @click="openScheme">新建方案</el-button>
        </div>
        <!--<section class="search">
            <section>
                <i>平台</i>
                <el-select clearable v-model="fetchParam.plat" @change="()=>{searchVersions();getData()}">
                    <el-option label="Android" value="android"></el-option>
                    <el-option label="iOS" value="ios"></el-option>
                </el-select>
            </section>
            <section>
                <i>版本</i>
                <el-select clearable v-model="fetchParam.version" @change="getData">
                    <el-option v-for="(item,index) in versions" :label="item" :value="item" :key="index"></el-option>
                </el-select>
            </section>
        </section>-->

        <article class="nav-list" v-for="(list,pindex) in resultData" :key="list.id">
            <div  class="platform "> <strong>{{list.id}}.分组名称 (version) : {{list.version}}</strong></div>
            <section class="nav-imgs">
                <section class="dragWrap" v-if="!list.used">
                    <!--没有 active激活（使用中）时有编辑和删除  -->
                    <div class="nav-item used" v-for="(item,index) in list.items" v-dragging="{item: item, list: list.items, group: 'item' + list.id}"
                        :key="item.name">
                        <div class="parent" @mouseenter="showLayer" @mouseleave="hideLayer">
                            <img :src="item.icon | fillImgPath" alt="" />
                            <p>{{item.name}}</p>
                            <div class="operate-layer">
                                <i class="iconfont icon-edit" @click="editModule(item, list.id, pindex, index)"></i>
                                <i class="el-icon-circle-cross" @click="delModule(list.id, item.id, pindex, index)"></i>
                            </div>
                        </div>
                    </div>
                    <div @click="addModule(list.id, pindex)" class="nav-item additem" v-if="!list.used">
                        <div>
                            <img src="../images/add.png" alt="">
                        </div>
                    </div>
                </section>
                <section class="dragWrap" v-if="list.used">
                    <div class="nav-item" v-for="(item,index) in list.items" :key="list.id + index">
                        <div>
                            <img :src="item.icon | fillImgPath" alt="" />
                            <p>{{item.name}}</p>
                        </div>
                    </div>
                    <div @click="addModule(list.id, pindex)" class="nav-item additem" v-if="!list.used">
                        <div>
                            <img src="../images/add.png" alt="">
                        </div>
                    </div>
                </section>
            </section>
            <section class="nav-operate">
                <span v-if="list.used">使用中</span>
                <!--<el-button type="text" v-if="(!list.used)&list.adapter" @click="getPlatVersions(list,list.id)">启用</el-button>-->
                <el-button type="text" v-if="!list.used" @click="getPlatVersions(list,list.id, pindex)">启用</el-button>
                <el-button type="text" @click="cloneScheme(list.id)">克隆</el-button>
                <el-button type="text" @click="editScheme(list,list.id, pindex)">编辑</el-button>
                <el-button type="text" @click="deleteScheme(list,list.id)" v-if="!list.used && !list.readonly">删除</el-button>
            </section>
            <div class="platform" v-if="list.used">
                <i>使用平台和版本:</i>
                <div>
                    <!--<em v-for="(version,index) in list.platform_tag" :key="index">{{version}}</em>-->
                    <em >ios &nbsp;{{list.adapter}}</em><em >android &nbsp;{{list.adapter}}</em>
                </div>
            </div>
        </article>
        <div class="block">
            <el-pagination :page-size="pagesize" :current-page="currentPage" @current-change="handleCurrentChange" layout="total, prev, pager, next"
                :total="total">
            </el-pagination>
        </div>
        <ImagEcropperInput :compress="1" :isShowBtn="false" ref="imgcropper" :confirmFn="cropperFn" :aspectRatio="1" :isRound="true"></ImagEcropperInput>
    </article>
</template>
<script>
    import ImagEcropperInput from '../../component/upload/ImagEcropperInputExperts.vue'
    import mobileService from '../../../services/section/mobileService.js'
    import courseService from '../../../services/course/courseService.js'
    import {
        getArrayIdIndex
    } from '../../../utils/common'
    import clone from 'clone'
    export default {
        name: 'navigatioin-index',
        data() {
            return {
                obj: {
                    bbb: void 0
                },
                aaa: 'aaa',
                category_id: '',
                containerLoading: false,
                dialogTitle: '', // 编辑功能标题
                dialogGroupTitle:'',// 编辑菜单组标题
                versions: [], // 搜索版本列表
                fetchParam: { // 搜索条件
                    plat: '',
                    version: ''
                },
                versionDialog: false, // 是否显示启用版本的dialog
                versionLoading: false, // 显示版本弹窗loading
                platForm: [], // 启动时获取的平台列表
                checkedAndroids: [], // 已选的Android列表
                checkedIos: [], // 已选的ios列表
                loading: false,
                currentData: {
                    group_id: '',
                    pindex: '', // 父层索引
                    index: '' // 子层索引
                },
                currentGroupData: {
                    group_id: '',
                    pindex: '', // 父层索引
                    index: '' // 子层索引
                },
                changeIcon: false,
                modulesVersions: [], // 获取所有功能的版本
                CourseCatas: [], //所有课程列表名称
                items: [], // 获取功能列表
                total: 0,
                currentPage: 1,
                pagesize: 10,
                resultData: [],
                form: clearFn(),

                fetchGroup: groupFn(),
                grouprules: {
                    adapter: {
                        required: true,
                        message: '必须填写',
                        trigger: 'blur'
                    },
                    // used: {
                    //     required: true,
                    //     message: '请选择使用状态',
                    //     trigger: 'change'
                    // },
                },
                rules: {
                    // category_id: {
                    //     required: true,
                    //     message: '必须填写',
                    // },
                    name: {
                        required: true,
                        message: '必须填写',
                        trigger: 'blur'
                    },
                    model: {
                        required: true,
                        message: '必须填写',
                        trigger: 'blur'
                    },
                    path: {
                        required: true,
                        message: '必须填写',
                        trigger: 'change'
                    },
                    icon: {
                        required: true,
                        message: '必须上传',
                        trigger: 'change'
                    },
                    sort: {
                        required: true,
                        message: '必须填写',
                    }
                },
                addForm: false, // 新建组弹窗是否显示
                formLabelWidth: '120px', // 表单label的宽度
            }
        },
        watch: {
            'form.version' (val) {
                // this.versionChange().then((ret) => {
                //     if (getArrayIdIndex(ret, this.form.type_id) == -1) {
                //         this.form.type_id = ''
                //     }
                // })
            },
            'fetchGroup.version'(val){
                if(this.fetchGroup.version=="undefined"&&this.fetchGroup.adapter=="undefined"){
                    this.fetchGroup.version=''
                    this.fetchGroup.adapter=''
                }
            }
        },
        created() {
            this.getData().then(() => {
                xmview.setContentLoading(false)
            })
        },
        mounted() {
            this.drag()
        },
        methods: {
            drag() {
                this.$dragging.$on('dragged', (value) => {
                    // 根据方案id获取方案的索引
                    let schemeIndex = getArrayIdIndex(this.resultData, value.draged.menu_scheme_id)
                    if (!this.resultData[schemeIndex] || this.resultData[schemeIndex] == undefined) return
                    let newArr = []
                    this.resultData[schemeIndex].items.forEach((item, index) => {
                        newArr.push({
                            id: item.id,
                            group: item.group,
                            sort: index + 1
                        })
                    })
                    mobileService.sortModule({
                        group_id: value.draged.menu_scheme_id,
                        items: JSON.stringify(newArr)
                    }).then(() => {
                        xmview.showTip('success', '排序成功')
                    })
                })
            },
            // getDefaultLogo() {
            //     // 根据功能获取到默认logo
            //     let curModule = getArrayIdIndex(this.items, this.form.type_id)
            //     if (curModule > -1) this.form.icon = this.items[curModule]['icon']
            // },
            getCourseCataName(category_id) {
                console.log(category_id)
            },
            dialogOpen() {
                // 当编辑弹窗显示的时候过去所有的功能版本
                // return mobileService.getModuleVersions().then((ret) => {
                //     this.modulesVersions = ret.data
                // })

                this.modulesVersions = ["1.1.0", "1.2.0", "1.3.1", "2.1.0", "2.1.2", "3.0.0", "3.1.0"]
                this.getCourseName()
            },
            getCourseName(id) {
                courseService.search_cate({
                    pid: 0
                }).then((ret, index) => {
                    this.CourseCatas = ret.data
                    ret.data.forEach(v => {
                        if (v.id == id) {
                            this.form.courseName = v.name;
                        }
                    })
                });

            },
            addModule(group_id, pindex) {
                console.log(group_id, pindex)
                this.dialogTitle = '添加'
                this.form = clearFn()
                this.form.group_id = group_id
                delete this.form.module_id
                this.currentData = {
                    pindex,
                    group_id
                }
                this.changeIcon = true
                this.$nextTick(() => {
                    this.$refs.form.resetFields()
                })
            },
            editModule(item, group_id, pindex, index) {
                this.getCourseName(item.id);
                // console.log(item, group_id, pindex, index)
                this.currentData = {
                    pindex,
                    index,
                    group_id
                }
                this.changeIcon = true
                // this.form.model = item.model
                this.dialogTitle = item.name
                item.version = ''
                this.$nextTick(() => {
                    console.log(item.id)
                    this.form = clone(item)
                    this.form.module_id= item.id
                    // console.log(this.form)
                })
            },
            submit(form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        let msg = ''
                        let req = ''
                        if (this.form.id||this.form.module_id) {
                            console.log(this.form)
                            msg = '修改成功'
                            req = mobileService.updateModule
                            // delete this.form.sort
                        } else {
                            console.log(this.resultData[this.currentData.pindex]['items'])
                            console.log(this.resultData[this.currentData.pindex])
                            this.form.sort = this.resultData[this.currentData.pindex]['items'].length + 1
                            msg = '添加成功'
                            req = mobileService.addModule
                        }
                        console.log(this.form)
                        req(this.form).then((ret) => {
                            // 添加
                            if (!(this.form.id||this.form.module_id)) {
                                this.form.module_id = ret.id
                                // 追加一项
                                this.resultData[this.currentData.pindex]['items'].push(this.form)
                            } else {
                                // 修改当前项
                                console.log(this.form)
                                this.resultData[this.currentData.pindex]['items'][this.currentData.index] =
                                    this.form
                            }
                            this.changeIcon = false
                            this.getData()
                            xmview.showTip('success', msg)

                        })
                    } else {
                        return false
                    }
                })
            },
            delModule(group_id, module_id, pindex, index) {
                // xmview.showDialog(`你将要删除 <span style="color:red">${row.name}</span>  此操作不可恢复确认吗?`, () => {
                    mobileService.deleteModule({
                        group_id,
                        module_id
                    }).then(() => {
                        xmview.showTip('success', '删除成功')
                        this.resultData[pindex].items.splice(index, 1)
                    })
                //  })
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.getData()
            },
            getData() {
                // 拖拽方法 // 获取方案组列表
                this.containerLoading = true
                return mobileService.searchScheme({
                    type: 'index',
                    platform: this.fetchParam.plat,
                    version: this.fetchParam.version,
                    page: this.currentPage,
                    pagesize: this.pagesize
                }).then((ret) => {
                    this.resultData = ret.data
                    // console.log(this.resultData)
                    this.total = ret._exts.total
                }).then(() => {
                    this.containerLoading = false
                })
            },


            // 表单版本发生变化的时候获取功能列表
            versionChange() {
                //                this.form.type_id = ''
                return mobileService.getModules({
                    version: this.form.version
                }).then((ret) => {
                    this.items = ret.data
                    return ret.data
                })
            },
            // typeChange() {
                //     if (this.form.type == 'link') {
                //         this.form.url = '' // 链接地址
                //         this.form.name = '' // 功能名称
                //         this.form.icon = '' // 功能图标
                //     } else {
                //         this.form.type_id = '' // 功能id
                //         this.form.version = '' // 版本
                //         this.form.name = '' // 功能名称
                //         this.form.icon = '' // 功能图标
                //     }
                // },
            showLayer(e) {
                e.target.querySelector('.operate-layer').style.visibility = 'visible'
            },
            hideLayer(e) {
                e.target.querySelector('.operate-layer').style.visibility = 'hidden'
            },
            cropperFn(data, ext) {
                this.loading = true
                // 执行上传
                mobileService.uploadModuleScheme({
                    image: data,
                    alias: Date.now() + ext,
                    group_id: this.currentData.group_id
                }).then((ret) => {
                    this.loading = false
                    this.form.icon = ret.url
                })
            },
            searchVersions() {
                mobileService.searchVersions({
                    type: 'index',
                    platform: this.fetchParam.plat
                }).then((ret) => {
                    this.versions = ret.data
                })
            },
            // 获取启用的版本
                // getPlatVersions(group_id) {
                //     this.checkedIos = []
                //     this.checkedAndroids = []
                //     this.versionDialog = true
                //     this.versionLoading = true
                //     mobileService.getPlatVersions({
                //         group_id
                //     }).then((ret) => {
                //         this.platForm = ret.data
                //         this.platForm.group_id = group_id
                //         this.versionLoading = false
                //     })
                // },
            getPlatVersions(group,group_id){
                mobileService.activeScheme({group_id,used:1}).then((ret) => {
                    this.getData()
                })
            },
            cloneScheme(group_id) {
                mobileService.cloneScheme({
                    group_id
                }).then(() => {
                    xmview.showTip('success', '克隆成功')
                    this.getData()
                })
            },
             // 新建方案
            openScheme() {
                this.fetchGroup = groupFn()
                this.addForm = true
                this.dialogGroupTitle = "添加方案组"
            },
            addGroup() {
                this.dialogGroupTitle = '添加'
                this.addForm = true
                // this.$refs['fetchGroup'].validate((valid) => {
                //     if (valid) {
                //         console.log(this.fetchGroup)
                //         mobileService.createScheme(this.fetchGroup).then((ret) => {
                //             this.addForm = false
                //             this.resultData.push(ret.data)
                //         })
                //     } else {
                //         return false
                //     }
                // })
            },
            editScheme(group,group_id, pindex) {
                this.dialogGroupTitle = "修改方案组"+group_id
                this.addForm = true
                this.fetchGroup = group
                 this.$nextTick(() => {
                    this.fetchGroup = clone(group)
                })
                this.currentGroupData = {
                    pindex,
                    group_id
                }
                console.log(this.currentGroupData)
                // mobileService.editScheme(this.fetchGroup).then((ret) => {
                //     this.fetchGroup.used=ret.used
                // })
            },
            submitGroupData(fetchGroup){
                this.$refs[fetchGroup].validate((valid) => {
                    if (valid) {
                        let msg = ''
                        let req = ''
                        if (this.fetchGroup.id) {
                            msg = '修改成功'
                            req = mobileService.editScheme
                        } else {
                            msg = '添加成功'
                            req = mobileService.createScheme
                        }
                        console.log(this.fetchGroup)
                        req(this.fetchGroup).then((ret) => {
                            //添加
                            if(!this.fetchGroup.id){
                                this.resultData.push(ret.data)
                            }else{ // 修改当前项
                                console.log(this.resultData[this.currentGroupData.pindex])
                                this.resultData[this.currentGroupData.pindex] = this.fetchGroup
                                console.log(this.resultData[this.currentGroupData.pindex])
                                // this.fetchGroup.used=ret.used
                            }
                            this.addForm = false
                            this.getData()
                            xmview.showTip('success', msg)
                        })
                    } else {
                        return false
                    }
                })
            },
            deleteScheme(row,group_id) {
                console.log(row)
                xmview.showDialog(`你将要删除菜单组 <span style="color:red">${row.version}</span>  此操作不可恢复确认吗?`, () => {
                    mobileService.deleteScheme({
                        group_id
                    }).then(() => {
                        xmview.showTip('success', '删除成功')
                        this.getData()
                    })
                })
            },

            // 启用版本号
            activeScheme() {
                if (this.checkedIos.length < 1 && this.checkedAndroids.length < 1) {
                    xmview.showTip('error', '至少选择一个版本')
                    return false
                }
                mobileService.activeScheme({
                    group_id: this.platForm.group_id,
                    ios: this.checkedIos.toString(),
                    android: this.checkedAndroids.toString()
                }).then(() => {
                    xmview.showTip('success', '启用成功')
                    this.versionDialog = false
                    this.getData()
                }).catch((ret) => {
                    xmview.showTip('success', ret.message || '启用失败')
                })
            },
            // getActiveVersion(type_id) {
            //     return this.versionChange().then((ret) => {
            //         let versionArr = ret.filter((item) => {
            //             if (item.id == type_id) {
            //                 return item
            //             }
            //         })
            //         return versionArr
            //     })
            // },

        },
        computed: {

        },
        components: {
            ImagEcropperInput
        }
    }

    function clearFn() {
        return {
            type: '', // 功能类型
            type_id: '', // 功能id
            name: '', // 功能名称
            icon: '', // 功能图标
            version: '', // 版本
            group_id: void 0, //菜单组id
            category_id: void 0, //课程栏目id
            id: void 0, //课程id，
            module_id: void 0,
            model: null,
            path: '',
            title: '',
            download: '',
            sort: void 0,
            courseName: '请选择',
        }
    }

    function groupFn() {
        return {
            version: '', // 分组名称，入v1 v2
            adapter: '', // 适配版本
            used: '', // 是否使用中，0：未使用 1：使用
        }
    }
</script>
