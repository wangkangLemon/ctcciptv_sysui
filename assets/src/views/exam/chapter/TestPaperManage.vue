<!--试题管理-->
<style lang='scss' rel="stylesheet/scss">
    @import "../../../utils/mixins/mixins";
    @import "../../../utils/mixins/table";
    @import "../../../utils/mixins/common";
    @import "../../../utils/mixins/topSearch";

    .block-manage {
        @extend %justify;
            // .manage-container {
            //     @extend %right-top-btnContainer;
            //     >* {
            //         color: #fff;
            //         border-radius: 5px;
            //     } // 添加课程
            //     .add {
            //         background: rgb(0, 204, 255);
            //     } // 管理栏目
            //     .catmange {
            //         background: rgb(153, 102, 204);
            //     }
            // }
        .topright{
             @extend %right-top-btnContainer;
              >* {
                    color: #fff;
                    border-radius: 5px;
                } // 添加课程
        }
        .content-title {
            padding: 10px 20px;
            background: #f0f3f5;
            text-align: left;
            line-height: 35px;
            button {
                float: right;
                display: block;
                margin-right: 15px;
            }
        }
        .left-content {
            display: inline-block;
            vertical-align: top;
            width: 25%;
            background: #fff;

            .classify-tree {
                padding: 1px;
                .el-tree-node{
                    overflow: hidden;
                }
            }
        }
        .right-content {
            width: 74%;
            display: inline-block;
            vertical-align: top;
            background: #fff;
            padding-bottom: 20px;
            section{
                margin-left: 10px;
                margin-bottom: 14px;
                display: inline-block;
                margin-right: 10px;
                .el-select .el-input .el-input__icon{
                    transform: translateY(-50%) translateX(-50%)rotateZ(180deg);
                }
            }
            .content-title{
                position: relative;
                section{
                    opacity:0.1;
                    height:0;
                    width:107px;
                    position: absolute;
                    top:10px;
                    right:23px;
                }
            }
            .content-list {
                padding: 20px;
                .search{
                    width:100%;
                    margin-bottom:10px;
                    section{
                        #input{
                            width: 84%;
                            display: inline-block;
                            margin-left: 10px;
                        }
                    }
                    .fi{
                        width:35%;
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
            .el-pagination {
                float: right;
                margin-top: 10px;
            }
        }
    }
</style>
<template>
    <article class="block-manage">
        <!-- <section class="topright">
                <el-button type="danger" icon="plus"  @click="$router.push({ name:'exam-subject-import'})">试题导入</el-button>
                <el-button type="primary" icon="plus" >添加考题</el-button>
        </section> -->
        <section class="left-content">
            <div class="content-title">
                所有分类
                <router-link tag="el-button" :to="{name: 'exam-chapter-category'}">管理分类</router-link>
            </div>
            <div class="classify-tree">
                 <MenuTree :data="SecMenu" v-if="SecMenu.length" ref="chapterCategory"></MenuTree>
            </div>
        </section>
        <section class="right-content">
            <div class="content-title">
                <span v-if="category.title">{{category.title}}-</span>考题列表
                <el-button type="primary" icon="plus" >添加考题</el-button>
                <el-button type="danger" icon="plus"  @click="$router.push({ name:'exam-subject-import',params:{chapterInfo:category.currentData,qtype:qtype}})">试题导入</el-button>
                <section>
                      <el-select v-model="qtype" placeholder="未选择" @change="$router.push({ name:'exam-subject-add',params:{chapterInfo:category.currentData,qtype:qtype}})" >
                            <el-option label="A1" value="A1"></el-option>
                            <el-option label="A2" value="A2"></el-option>
                            <el-option label="A3" value="A3"></el-option>
                            <el-option label="A4" value="A4"></el-option>
                    </el-select>
                </section>   
                
            </div>
            <div class="content-list">
                <div class="search">
                    <!-- <section class="fi"> -->
                     <!-- <i>题目</i><el-input id="input" v-model="section.description" placeholder="请输入标题搜索" @keyup.enter.native="fetchCourseLists" auto-complete="off" ></el-input>
                    </section> -->
                    <section class="fi">
                     <i>题目</i><el-input id="input" v-model="section.title" placeholder="请输入题目关键字" @keyup.enter.native="fetchCourseLists" auto-complete="off" ></el-input>
                    </section>    
                    <section>
                        <i>题型</i>
                        <el-select v-model="section.qtype" placeholder="未选择" @change="fetchCourseLists" :clearable="true">
                            <el-option label="A1" value="A1"></el-option>
                            <el-option label="A2" value="A2"></el-option>
                            <el-option label="A3" value="A3"></el-option>
                            <el-option label="A4" value="A4"></el-option>
                        </el-select>
                    </section> 
                    <DateRange title="创建时间" :start="section.stime " :end="section.etime" @changeStart="val=> section.stime =val "
                        @changeEnd="val=> section.etime=val" :change="fetchCourseLists">
                    </DateRange>
                </div>     
                <el-table v-loading="section.loading" border :data="section.data">
                    <el-table-column prop="description" label="考题" width="180"></el-table-column>
                    <el-table-column prop="chapter_name" label="绑定栏目" >
                    </el-table-column>
                    <el-table-column prop="sort" label="排序" width="70"></el-table-column>
                    <el-table-column prop="addate" label="创建时间" width="200"></el-table-column>
                    <el-table-column prop="operate" label="操作" width="135" fixed="right">
                        <template scope="scope">
                            <el-button type="text" size="small" @click="update(scope.$index, scope.row)">
                                查看
                            </el-button>
                            <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination
                            @current-change="sectionPageChange"
                            :current-page="section.page"
                            :page-size="section.pagesize"
                            small
                            layout="total,prev, pager, next"
                            :total="section.total">
                    </el-pagination>
                </div>
            </div>
        </section>
    </article>
</template>
<script>
    import examService from '../../../services/exam/examService'
    import MenuTree from '../../component/tree/MenuTreeExam.vue'
    import ImagEcropperInput from '../../component/upload/ImagEcropperInputSec.vue'
    import DateRange from '../../component/form/DateRangePicker.vue'
    import formUtils from '../../../utils/formUtils'
    function initSection() {
        return {
            loading: false,
            data: [],
            description:'',
            stime :'',
            etime:'',
            page: 1,
            pagesize: 10,
            total: 0,
            status,
            title:'',
            qtype:'',
            deleted:-1,
        }
    }
    export default {
        name:'exam-subject-manage',
        components: {
            MenuTree,ImagEcropperInput
            ,DateRange
        },
        data () {
            return {
                ratio: 0, // 裁剪的比例
                category: {
                    currentData: {},
                    loading: false,
                    title: '',
                    data: [],
                },
                // 表单相关属性
                formLabelWidth: '50px', // 表单label的宽度
                editPlacehoder: '',
                rules: {
                    name: [
                        {
                            required: true,
                            message: '名称不能为空',
                            trigger: 'blur'
                        }
                    ]
                },
                section:initSection(),
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                SecMenu:[],
                category_id:void 0,
                Mult:'true',// 判断左边 课程多级栏目树状标识,
                qtype:''
            }
        },
        watch: {
            '$store.state.index.secMenu'(){
                this.category.currentData = Object.assign({},this.$store.state.index.secMenu) //复制一份vuex存储的值 
                
            },
            'category.currentData.id'(){
                this.fetchCourseLists () 
                // this.$refs.secCategory.handleNodeClick()
            },
            '$store.state.index.examCate'(){
               this.fetchCourseLists() 
               this.fetchData()
            }     
        },
        created () {
            this.category.currentData.id = ''
            this.category.currentData.chapter_type = 2
            this.category.loading = true
            this.qtype=''
            // this.section=initSection()
            this.fetchData()
            this.fetchCourseLists()
        },
         computed: {
            examCateid( ){
                return this.$store.state.index.examCate //在Vue 工具里检测examCate
            }
        },
        methods: {
            // 下线 或者上线课程 0为下线，1为上线
            offline(index, row) {
                let txt = row.status == 0 ? '禁用' : '启用'
                let finalStatus = row.status == 0 ? 1 : 0
                xmview.showDialog(`你将要${txt}课程 <span style="color:red">${row.course_name}</span> 确认吗?`, () => {
                    examService.offlineCourse({
                        id: row.id,
                        status: finalStatus
                    }).then((ret) => {
                        row.status = finalStatus
                    })
                })
            },
            fetchData() {//获取左边栏目数据
                let param={
                            category_id: this.$store.state.index.examCate  , // 3- 供应商
                            page: 1,
                            chapter_type:2,
                            pagesize: -1,
                        }
                examService.fetchChapterCategory( param).then((ret) => {
                        this.SecMenu=ret
                        xmview.setContentLoading(false)     
                    })
            },
            fetchCourseLists () {// 获取右边栏目数据
                this.section.loading = true
                this.section.chapter_id =this.category.currentData.id
                this.section.category_id =this.$store.state.index.examCate
                this.section.chapter_type = 2
                 delete this.section.data
                // delete this.section.loading
                // delete this.section.total
                return examService.fetchSubjectLists(this.section).then((ret) => {
                    this.section.data = ret.data
                    this.section.total = ret._exts.total
                    this.section.loading = false
                })
            },
            handleDelete (index, row) {
                xmview.showDialog(`确认要删除试题【<i style="color:red">${row.description}</i>】吗？`, () => {
                    examService.delSubject(row.id).then(() => {
                        xmview.showTip('success', '删除成功')
                        this.fetchCourseLists()
                    }).catch((ret) => {
                        xmview.showTip('error', ret.message)
                    })
                })
            },
           
            update (index, row) {
                this.$router.push({
                    name:'exam-subject-edit',
                    params:{
                        id:row.id,
                        //category_id:row.category_id,
                        chapter_id:row.chapter_id,
                        chapterInfo:{chapter_type:2},//判断栏目是否显示的条件
                        subjectInfo:row,
                        readonly:true,
                    }
                })
            },
            sectionPageChange (val) {
                this.section.page = val
                this.fetchCourseLists()
            }
        }
    }
</script>
