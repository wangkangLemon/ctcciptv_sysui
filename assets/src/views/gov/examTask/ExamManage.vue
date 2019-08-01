<!--区块管理-->
<style lang='scss' rel="stylesheet/scss">
    @import "../../../utils/mixins/mixins";
    @import "../../../utils/mixins/table";
    @import "../../../utils/mixins/common";
    @import "../../../utils/mixins/topSearch";

    .block-manage {
        @extend %justify;
        .content-title {
            padding: 10px 20px;
            background: #f0f3f5;
            text-align: left;
            line-height: 35px;
            button {
                float: right;
                display: block;
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

            .content-list {
                padding: 20px;
                .search{
                    width:100%;
                    margin-bottom:10px;
                    section{
                        margin-left: 10px;
                        margin-bottom: 14px;
                        display: inline-block;
                        margin-right: 10px;
                        .el-select .el-input .el-input__icon{
                            transform: translateY(-50%) translateX(-50%)rotateZ(180deg);
                        }
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
        <section class="left-content">
            <div class="content-title">
                所有分类
                <router-link tag="el-button" :to="{name: 'examtask-examtasktemplate-category'}">管理分类</router-link>
            </div>
            <div class="classify-tree">
                 <MenuTree :data="SecMenu" :treeType="'exam'" v-if="SecMenu.length" ref="chapterCategory" :onNodeClick="treeNodeClick.bind(this,1)" :Mult='Mult'></MenuTree>
            </div>
        </section>
        <section class="right-content">
            <div class="content-title">
                <span v-if="category.title">{{category.title}}-</span>课程列表
                 <el-button type="primary" icon="plus"  @click="$router.push({ name:'examtask-template-add',params:{herbalInfo:this.section,handle:'add',add:1}})">抽取试题</el-button>
            </div>
            <div class="content-list">
                <div class="search">
                    <section class="fi">
                     <i>标题</i><el-input id="input" v-model="section.title" placeholder="请输入标题" @keyup.enter.native="fetchCourseLists" auto-complete="off" ></el-input>
                    </section>  
                </div>     
                <el-table v-loading="section.loading" border :data="section.data">
                    <el-table-column prop="title" label="任务标题" min-width="230"></el-table-column>
                    <!-- <el-table-column class="tag" label="标签" :label-width="formLabelWidth">
                        <span @click="toggleTag(item.value)" :class="{'active': item.value == form.tags}" v-for="(item, index) in tags">{{item.name}}</span>
                    </el-table-column> -->
                    <el-table-column width="80" label="状态">
                        <template scope="scope">
                            <el-tag v-if="scope.row.status == 2" type="success">正常</el-tag>
                            <el-tag v-else type="danger">禁用 </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="addate" label="创建时间" width="180"></el-table-column>
                    <el-table-column prop="operate" label="操作" width="150" fixed="right">
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
    import courseTaskService from '../../../services/gov/courseTaskService.js'
    import MenuTree from '../../component/tree/CourseTaskTemplateCategory.vue'
    import ImagEcropperInput from '../../component/upload/ImagEcropperInputSec.vue'

    export default {
        components: {
            MenuTree,ImagEcropperInput
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
                section: {
                    loading: false,
                    data: [],
                    course_name:'',
                    stime :'',
                    etime:'',
                    page: 1,
                    pagesize: 10,
                    total: 0,
                    status:-1
                },
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                SecMenu:[],
                Mult:'true',// 判断左边 课程多级栏目树状标识,
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
        //    '$store.state.index.examCate'(){
        //        this.fetchCourseLists () 
        //        this.fetchData()
        //     }        
        },
        activated () {
            this.category.currentData.id = ''
            this.category.loading = true
            this.fetchData()
            this.fetchCourseLists()
        },
        // computed: {
        //     examCateid( ){
        //         return this.$store.state.index.examCate //在Vue 工具里检测examCate
        //     }
        // },
        methods: {
              // 左边的节点被点击
            treeNodeClick (type, data, node, store) {
                console.log("category_type=============",node)
                console.log(node)
                if (type == 1) { 
                    this.section.category_id=node.data.id
                    this.section.category_type=node.data.category_type
                    this.section.category_name=node.data.name
                    this.ended=node.data.ended
                    this.fetchCourseLists()
                    this.nodeParentSelected = node.parent// 记录父节点
                    this.nodeSelected = node // 记录当前节点
                    this.fetchParam = Object.assign({},node.data)  //解决左右数据
                } else if (type == 2) {
                    this.moveToNode = node
                }
            },

            fetchData() {//获取左边栏目数据
                let param={ id:'', name, pagesize:-1,type:2 }
                courseTaskService.getCategoryTree( param).then((ret) => {
                        this.SecMenu=ret.data
                        xmview.setContentLoading(false)     
                    })
            },
            fetchCourseLists () {
                this.section.loading = true
                let params={
                    title:this.section.title,
                    status:this.section.status,
                    stime:this.section.stime ,
                    etime:this.section.etime,
                    page: this.section.page,
                    pagesize: this.section.pagesize,
                    chapter_id: this.category.currentData.id,
                    category_type: this.section.category_type,
                    task_type:2,
                    category_id: this.section.category_id
                }
                return courseTaskService.getCourseTaskTemplateList(params).then((ret) => {
                    this.section.data = ret.data
                    this.section.total = ret._exts.total
                    this.section.loading = false
                })
            },
            handleDelete (index, row) {
                xmview.showDialog(`你将要删除考试任务【<i style="color:red">${row.title || ''}</i>】操作不可恢复确认吗？`, this.deleteItem(row.id))
            },
            deleteItem (id) {
                // 以下执行接口删除动作
                return () => {
                    courseTaskService.deleteCourseTaskTemplate(id).then((ret) => {
                        xmview.showTip('success', '删除成功')
                        this.section.data.splice(index, 1)
                    })
                }
            },
            update (index, row) {
                console.log(row);
                this.$router.push({
                    name:'examtask-template-add',
                    params:{
                        id:row.id,
                        taskInfo:row,
                        add:0
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
