<!--数据管理-->
<style lang='scss' rel='stylesheet/scss'>
    @import "../../utils/mixins/common";
    @import "../../utils/mixins/topSearch";

    #sys-index-container {
        @extend %content-container;
        /*上传图片的样式*/
        .avatar-uploader {
            .el-upload {
                border: 1px dashed #d9d9d9;
                border-radius: 6px;
                cursor: pointer;
                position: relative;
                overflow: hidden;

                &:hover {
                    border-color: #20a0ff;
                }
            }
        }
        .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 150px;
            height: 150px;
            line-height: 150px;
            text-align: center;
        }
        .avatar {
            width: 150px;
            height: 150px;
            display: block;
        } // 同步时候的遮罩层
        .keep {
            position: absolute;
            width: 100%;
            left: 0;
            height: 360px;
            z-index: 99;
            background: rgba(255, 255, 255, 0.7);
            top: 140px;
        }
        .synchronize {
            background: cornflowerblue;
            color: #fff;
            padding: 10px;
            line-height: 35px;
            margin-bottom: 20px;
            .el-button {
                float: right;
            }
        }
        .addForm {
            text-align: left;
            text-align-last: left;
            .img-wrap {
                display: flex;
                .image {
                    width: 200px;
                    height: 100px;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .button-wrap {
                    margin-left: 10px;
                }
            }
            .tag {
                span {
                    padding: 10px;
                    border: 1px solid #e2e7eb;
                    background: #fff;
                    border-right: none;
                    &:last-of-type {
                        border-right: 1px solid #e2e7eb;
                    }
                    &:hover {
                        background: #e2e7eb;
                    }
                    &.active {
                        background: #e2e7eb;
                    }
                }
            }
        }
        .dialog-footer {
            text-align: right;
            float: right;
            margin-bottom: 30px;
        }
        .manage-container {
            @extend %right-top-btnContainer;
            >* {
                color: #fff;
                border-radius: 5px;
            } // 添加课程
            .add {
                background: rgb(0, 204, 255);
            } // 管理栏目
            .catmange {
                background: rgb(153, 102, 204);
            }
        }

        .search {
            @extend %top-search-container;
        } // 底部的管理按钮
        .bottom-manage {
            margin-top: 15px;
        }

        .el-dialog__wrapper {
            padding-top: 15px;
            background: rgba(0, 0, 0, .5);
            z-index: 1000;
        }
    }
</style>

<template>
    <article id="sys-index-container">
        <section class="manage-container">
            <el-button type="primary" icon="plus" @click="content.isShow = true">选取内容</el-button>
            <!--<el-button type="primary" icon="plus" @click="$router.push({ name:'section-add', params:{sys_type:'add'}})">
                <i>添加数据</i>
            </el-button>-->
        </section>
        <!--选取内容-->
        <ChooseContent v-model="content.isShow" v-on:result="contentConfirm"></ChooseContent>

        <!--添加/编辑内容课程-->
        <el-dialog v-model="addForm" :title="formTitle">
            <section v-if="form.ref_id">
                <!--<div class="keep" v-if="form.ref_sync"></div>  同步遮罩-->
                <div class="synchronize">
                    {{catArr[category]}}：{{category == 'course' ? form.content.course_name : form.content.title}}
                    <!--<el-button @click="form.ref_sync = 0" v-if="form.ref_sync">关闭同步</el-button>
                    <el-button @click="keepSync" v-if="!form.ref_sync">开启同步</el-button>-->
                </div>
            </section>

            <!--1 这是区块选取的栏目 -->
            <el-form label-position="top" :rules="rules">
                <el-form-item  label="区块栏目">
                    <Section-category-menu :reqFun="reqFun" :placeholder="form.name" :autoClear="true" v-model="form.category_id"></Section-category-menu>
                </el-form-item>
            </el-form>
            
            <!--2 这是课程类表选取的数据 -->

            <el-form label-position="top" class="addForm" :model="form" :rules="rules" ref="form">

                <el-form-item prop="course_name" label="标题" :label-width="formLabelWidth">
                    <el-input v-model="form.course_name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item v-if="!form.ref_id" prop="url" label="链接" :label-width="formLabelWidth">
                    <el-input v-model="form.url" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item prop="image" label="图片" :label-width="formLabelWidth">
                    <!--图片上传-->
                    <div class="img-wrap">
                        <div v-if="form.image" class="image">
                            <img :src="form.image | fillImgPath" alt="" />
                        </div>
                        <div class="button-wrap">
                            <el-button type="primary" @click="() => {$refs.imgcropper.chooseImg()}">上传</el-button>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item prop="description" label="描述" :label-width="formLabelWidth">
                    <el-input type="textarea" :rows="3" v-model="form.description" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item class="tag" label="标签" :label-width="formLabelWidth">
                    <span @click="toggleTag(item.value)" :class="{'active': item.value == form.tags}" v-for="(item, index) in tags">{{item.name}}</span>
                </el-form-item>
                <el-form-item prop="addate" label="日期" :label-width="formLabelWidth">
                    <el-date-picker v-model="form.addate" type="date" />
                </el-form-item>
          
                <el-form-item prop="sort" label="排序" :label-width="formLabelWidth">
                    <el-input v-model="form.sort" auto-complete="off" placeholder="排序越大越靠前，留空则自动设为最靠前的排序"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addForm = false">取 消</el-button>
                <el-button type="primary" @click="submit('form')">确 定</el-button>
            </div>
        </el-dialog>


        <article class="search"> 
            <!--1 选择下拉没有层级-->
  
            <!--2 选择联动表--> <!--//需改进待后台返ended数据后做联动列表-->
            <section>
                    <i>区块栏目</i>
                    <Section-category-menu :reqFun="reqFun" v-model="fetchParam.category_id" ></Section-category-menu>
            </section>
            <section>
                <i>标题</i>
                <el-input v-model="fetchParam.title" placeholder="请输入标题" @keyup.enter.native="fetchData" auto-complete="off"></el-input>
            </section>

        </article>

        <el-table class="data-table" v-loading="loadingData" :data="dataCache" :fit="true" @select="selectRow" @select-all="selectRow" border
            v-if="SecCateName">
            <el-table-column min-width="100" prop="category_name" label="栏目名称">
            </el-table-column>
            <el-table-column min-width="100" prop="ref_sync" :formatter="format" label="是否引用">
            </el-table-column>
            <el-table-column min-width="300" prop="title" label="标题">
            </el-table-column>
            <el-table-column min-width="110" prop="addate" label="添加时间">
            </el-table-column>
            <el-table-column min-width="100" prop="tags" label="标签">
            </el-table-column>
            <el-table-column min-width="100" prop="category_rkey" label="栏目标识">
            </el-table-column>
            <el-table-column fixed="right" width="180" label="操作">
                <template scope="scope">
                    <el-button @click="$router.push({name: 'section-edit', params: {roleInfo: scope.row, sys_id: scope.row.id}})" type="text"
                        size="small">详情
                    </el-button>
                    <el-button @click="$router.push({name: 'section-edit', params: {roleInfo: scope.row, sys_id: scope.row.id, sys_type:'edit'}})"
                        type="text" size="small">编辑
                    </el-button>
                    <el-button @click="del(scope.$index, scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="pagin" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="fetchParam.page"
            :page-size="fetchParam.pagesize" :page-sizes="[15, 30, 60, 100]" layout="sizes,total, prev, pager, next" :total="total">
        </el-pagination>
        <ImagEcropperInput :compress="1" :isShowBtn="false" ref="imgcropper" :confirmFn="handleImgUploaded" :aspectRatio="ratio"></ImagEcropperInput>
        <!--底部的批量删除和移动两个按钮-->
        <!--<div class="bottom-manage">
            <el-button :disabled='selectedIds.length < 1' @click="dialogTree.isShow = true">移动到</el-button>
            <el-button :disabled='selectedIds.length < 1' @click="delMulti">批量删除</el-button>
        </div>-->
    </article>
</template>

<script>
    import dataService from '../../services/section/dataService.js'
    import cateService from '../../services/section/cateService.js'
    import ChooseContent from '../component/choose/ChooseContent'
    import courseService from '../../services/course/courseService.js'
    import SectionCategoryMenu from '../component/select/SectionCategoryMenu.vue'
    import {
        date2Str
    } from '../../utils/timeUtils.js'
    import ImagEcropperInput from '../component/upload/ImagEcropperInputSec.vue'

    function getFetchParam() {
        return {
            // status: void 0, //  1-禁用 0-正常
            category_id: void 0,
            title: '',
            name: '',
            page: 1,
            pagesize: 15,
        }
    }
    function clearForm() {
        return { // 表单属性值
                    id: 0,
                    title: '', // 标题
                    url: '', // 链接地址
                    ref_type: '', // 引用类型
                    ref_id: '', // 引用ID
                    ref_sync: 0, // 是否与引用同步
                    image: '', // 图片
                    description: '', // 描述
                    addate: '', // 日期
                    sort: '', // 排序
                    tags: '',
                    tags_color: '',
                    category_id: 0, //栏目id
                }
    }
    

    export default {
        components: {
            ChooseContent,
            ImagEcropperInput,
            SectionCategoryMenu
        },
        data() {
            return {
                ratio: 0, // 裁剪的比例
                dialog: {
                    category_id: null, //栏目id   
                },
                drop_list: [],
                loadingData: false,
                data: [], // 表格数据
                dataCache: [],
                total: 0,
                keyWord: '',
                dialogVisible: false,
                selectedIds: [], // 被选中的数据id集合
                fetchParam: getFetchParam(),
                dialogTree: {
                    isShow: false,
                    selectedId: void 0,
                },
                SecCateName: null,
                // 选取
                content: {
                    isShow: false
                },
                // 表单相关属性
                formTitle: '添加内容',
                addForm: false, // 表单弹窗是否显示
                formLabelWidth: '50px', // 表单label的宽度
                catArr: {
                    'course': '课程',
                    'article': '资讯',
                    'link': '链接'
                },
                category: 'course',
                form: clearForm(),
                tags: [{
                        name: '无',
                        value: ''
                    },
                    {
                        name: '热门',
                        value: '热门'
                    },
                    {
                        name: '最新',
                        value: '最新'
                    },
                    {
                        name: '推荐',
                        value: '推荐'
                    }
                ],
                rules: {
                    course_name: [{
                        required: true,
                        message: '标题不能为空',
                        trigger: 'blur'
                    }],
                    url: [{
                        required: true,
                        message: '链接不能为空',
                        trigger: 'blur'
                    }],
                    category_id: [{
                        required: true,
                    }]
                },
            }
        },
        activated() {
            this.fetchData() //获取课程栏目数据名称
            this.fetchCate() //获取区块列表数据
        },
        watch: {
            'fetchParam.category_id'(){ //栏目切换 下面表格数据切换
                this.fetchData() 
            }
        },
        created() {},
        methods: {
            reqFun(param){
                return cateService.fetchData({
                    pid: 0,
                    level: -1,
                    pagesize:-1,
                })
            },
            format(row, column, cellValue) {
                return row.ref_sync == 1 ? '是' : '否'
            },
            //拿到栏目菜单
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据返回建议列表的数据
                cb(results);
            },
            submit(form) { // 表单提交
                // this.form.section_id = this.section.currentID
                this.form.addate = this.form.addate ? date2Str(this.form.addate) : ''
                this.form.ref_type = this.form.ref_id ? this.category : 'link'
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        let reqFn = dataService.create
                        let msg = '添加成功'
                        if (this.form.id) {
                            reqFn = dataService.edit
                            msg = '修改成功'
                        }
                        // this.form.category_id = this.fetchParam.category_id
                        if (this.form.tags === '热门') this.form.tags_color = '#FFD220'
                        if (this.form.tags === '最新') this.form.tags_color = '#FF4B20'
                        if (this.form.tags === '推荐') this.form.tags_color = '#3953C3'
                        console.log('this.form',this.form)
                        let param={
                            id: this.form.id,
                            category_id: this.form.category_id,
                            ref_type: this.form.ref_type,
                            ref_id: this.form.ref_id,
                            //  ref_sync : this.form.ref_sync,  
                            ref_sync: 0,
                            title: this.form.course_name,
                            image: this.form.image,
                            url: this.form.url,
                            desc: this.form.description,
                            addate: this.form.addate,
                            tags: this.form.tags,
                            tags_color: this.form.tags_color,
                            sort: this.form.sort,
                            model:'native',
                            path:'courseview'

                        }
                        if(this.form.content.drug_id){
                            param.path='industry'
                        }
                        console.log('param',param)
                        reqFn(param).then((ret) => {
                            xmview.showTip('success', msg)
                            this.addForm = false
                            this.content.isShow = false
                            // this.getSectionData(this.section.currentID)
                        }).catch((ret) => {
                            xmview.showTip('error', ret.message)
                        })
                    } else {
                        return false
                    }
                })

            },
            toggleTag(value) {
                this.form.tags = value
            },
            // 保持同步
            keepSync() {
                this.form.ref_sync = 1
                this.form.course_name = this.form.content.course_name
                this.form.image = this.form.content.image
                this.form.description = this.form.content.description
                this.form.addate = this.form.content.addate
                this.form.sort = ''
            },
            // 图片上传完毕
            handleImgUploaded(data, ext) {
                courseService.commonUploadImageBaseSection({
                    // section_id: this.section.currentID,
                    alias: Date.now() + ext,
                    image: data
                }).then((ret) => {
                    this.form.image = ret.url
                })
            },

            // handleImgUploaded (response) {
            //     this.fetchParam.image = response.url
            // },
            addCourse(form) {
                if (this.section.loading || this.result.loading) {
                    return
                }
                this.form = clearForm()
                console.log(this.form)
                this.addForm = true
                this.formTitle = '添加内容'
            },
            //更新课程
            updateCourse(index, item) {
                this.formTitle = `编辑${this.catArr[item.ref_type]}`
                this.form = item
                if (item.ref_type != 'link') {
                    this.category = item.ref_type
                    if (item.ref_type == 'course') {
                        this.form.content = item.course
                        this.form.title = item.course.course_name
                        this.form.description = item.description
                    } else if (item.ref_type == 'speaking') {
                        this.form.content = item.speaking
                        this.form.description = item.content
                    } else if (item.ref_type == 'article') {
                        this.form.content = item.article
                    }
                }
                this.addForm = true
            },
            //弹窗内容
            contentConfirm(dataObj) {
                this.form = clearForm()
                console.log(this.form)
                this.form.content = dataObj
                // this.form.category_id = dataObj.category_id  
                // this.form.ref_id = dataObj.contentid
                this.form.ref_id = dataObj.contentid||dataObj.id
                this.form.ref_sync = 1
                this.form.tags = ''
                // this.category = dataObj.category
                if (this.form.id) delete this.form.id
                this.keepSync()
                this.addForm = true
                console.log(this.form)
            },

            //获取栏目名称   

            getCategory_name(id) {
                let i = null
                // console.log( this.SecCateName)
                this.SecCateName.forEach(v => {
                    if (v.id == id) {
                        i = v.name
                    }
                })
                return i
            },
            //获取栏目名称 判断是否有栏目 决定下面数据是否显示
            fetchCate() {
                cateService.fetchData().then((ret) => {
                    this.SecCateName = ret
                    xmview.setContentLoading(false)
                })
            },
            userInfo() {
                return authUtils.getUserInfo()
            },
            initFetchParam() {
                this.fetchParam = getFetchParam()
            },
            handleCurrentChange(val) {
                this.fetchParam.page = val
                this.fetchData()
        },
            handleSizeChange(val) {dataService.fetchData
                this.fetchParam.pagesize = val
                this.fetchData()
            },
            fetchData(val) {
                return dataService.fetchData(this.fetchParam).then((ret) => {
                    this.dataCache = ret.data
                    // console.log(this.dataCache)
                    this.total=ret._exts.total
                    this.loadingData = false
                    xmview.setContentLoading(false)
                })
            },
            search(val) {
                return dataService.search(this.fetchParam).then((ret) => {})
            },
            // 单行被选中
            selectRow(selection) {
                let ret = []
                selection.forEach((item) => {
                    ret.push(item.id)
                })
                this.selectedIds = ret
            },

        //     // 单条删除
            del(index, row) {
                xmview.showDialog(`你将要删除数据 <span style="color:red">${row.title}</span> ,  此操作不可恢复确认吗?`, () => {
                    dataService.delete(row.id).then(() => {
                        this.dataCache.splice(index, 1) //删除选中项
                        row.deleted = 1
                        xmview.showTip('success', '操作成功')
                    })
                })
            },
            // 批量删除
            delMulti() {
                xmview.showDialog(`你将要删除选中的项目，操作不可恢复确认吗?`, () => {
                    dataService.deleteMulty(this.selectedIds.join(',')).then(() => {
                        xmview.showTip('success', '操作成功')
                        this.dialogTree.isShow = false
                        setTimeout(() => {
                            this.fetchData() // 重新刷新数据
                        }, 300)
                    })
                })
            },
        },
        computed: {
            tableData() {
                var arr = this.dataCache.filter(v => {
                    return v.title.indexOf(this.keyWord) >= 0
                })
                return arr
            },
  
            dataCache01() {
                if (this.dataCache.length > 0 && this.SecCateName) {

                    this.dataCache.forEach(v => {
                        v.formdateName = this.getCategory_name(v.category_id)
                    })
                }
                return this.dataCache    // :data="dataCache01"
            }
        }
    }
</script>