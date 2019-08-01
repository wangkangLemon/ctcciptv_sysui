<!--试题管理-->
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
                p{
                    padding: 10px;
                    font-size: 12px;
                    color:red;
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
        <section class="left-content">
            <div class="content-title">
                所有分类
                <router-link tag="el-button" :to="{name: 'exam-questionbank-category'}">管理分类</router-link>
            </div>
            <div class="classify-tree">
                <p>提示：请先选择左侧最终极栏目再添加考题</p>
                 <MenuTree :data="SecMenu" v-if="SecMenu.length" :onNodeClick="treeNodeClick.bind(this,1)" ref="qustionbankCategory"></MenuTree>
            </div>
        </section>
        <section class="right-content">
            <div class="content-title">
                <span v-if="category.title">{{category.title}}-</span>考题列表
                <el-button type="primary" icon="plus" @click="addQuestion" >添加考题</el-button>
                <!-- <el-button type="danger" icon="plus"  @click="importQuestion" >试题导入</el-button> -->
            </div>
            <div class="content-list">
                <div class="search">
                    <section class="fi">
                     <i>题目</i><el-input id="input" v-model="section.title" placeholder="请输入题目关键字" @keyup.enter.native="fetchCourseLists" auto-complete="off" ></el-input>
                    </section>    
                    <DateRange title="创建时间" :start="section.stime " :end="section.etime" @changeStart="val=> section.stime =val "
                        @changeEnd="val=> section.etime=val" :change="fetchCourseLists">
                    </DateRange>
                </div>     
                <el-table v-loading="section.loading" border :data="section.data">
                    <el-table-column prop="description" label="考题" width="180"></el-table-column>
                    <el-table-column prop="category_name" label="绑定栏目" >
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
    import libService from '../../../services/course/libService.js'
    import examService from '../../../services/exam/examService'    
    import courseService from '../../../services/course/courseService.js'
    import MenuTree from '../../component/tree/QustionsCategory.vue'
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
            pagesize: 15,
            total:0,
            // pid:0,
            status,
            title:'',
            deleted:0
        }
    }
    export default {
        name:'exam-questionbank-manage',
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
                selectData:{},
                ended:void 0,
                disabled:true,
            }
        },
        watch: {
            '$store.state.index.secMenu'(){
                this.category.currentData = Object.assign({},this.$store.state.index.secMenu) //复制一份vuex存储的值 
            },
        },
        created () {
            // this.$refs.qustionbankCategory.getInitData();
            xmview.setContentLoading(false)     
            this.category.currentData.id = ''
            this.category.loading = true
            this.section=initSection()
            setTimeout(() => {
                this.fetchData()
                this.fetchCourseLists() 
            }, 300);
            
        },
         computed: {
            examCateid( ){
                return this.$store.state.index.examCate //在Vue 工具里检测examCate
            }
        },
        methods: {
            
            // 左边的节点被点击
            treeNodeClick (type, data, node, store) {
                if (type == 1) { 
                    this.selectData = Object.assign({},node.data)  //解决左右数据
                    this.ended=node.data.ended
                    console.log('node.data.ended',node.data.ended);
                    if(this.selectData.id&&this.ended==1){
                        this.disabled=false
                    }else{
                        this.disabled=true
                    }
                    this.category.currentData.category_id=this.selectData.id
                    this.category.currentData.category_name=this.selectData.name
                    this.category.currentData.questionBank = 1
                    this.fetchCourseLists () 
                }
            },
            // 下线 或者上线课程 0为下线，1为上线
            offline(index, row) {
                let txt = row.status == 0 ? '禁用' : '启用'
                let finalStatus = row.status == 0 ? 1 : 0
                xmview.showDialog(`你将要${txt}课程 <span style="color:red">${row.course_name}</span> 确认吗?`, () => {
                    libService.offlineCourse({
                        id: row.id,
                        status: finalStatus
                    }).then((ret) => {
                        row.status = finalStatus
                    })
                })
            },
            fetchData() { //获取左边栏目数据
                let param={
                            page: 1,
                            pagesize: -1,
                            pid:0,
                        }
                libService.fetchLibCategory( param).then((ret) => {
                    this.SecMenu=ret
                    console.log(ret);
                    console.log('this.SecMenu',this.SecMenu);
                    xmview.setContentLoading(false)     
                })
            },
            fetchCourseLists () { // 获取右边栏目数据
                this.section.loading = true
                this.section.category_id = this.category.currentData.category_id
                let param=Object.assign({},this.section)
                delete param.total
                delete param.data
                return libService.fetchSubjectLists(param).then((ret) => {
                    this.section.data = ret.data
                    this.section.loading = false
                    this.section.total = ret._exts.total
                    let total= ret._exts.total
                })
            },
            handleDelete (index, row) {
                xmview.showDialog(`确认要删除试题【<i style="color:red">${row.description}</i>】吗？`, () => {
                    libService.delLib(row.id).then(() => {
                        xmview.showTip('success', '删除成功')
                        this.section.data.splice(index, 1) //删除选中项
                    }).catch((ret) => {
                        xmview.showTip('error', ret.message)
                    })
                })
            },
            importQuestion(){
                if(!this.selectData.id||!this.ended==1){
                    xmview.showTip('warning','请先选择左侧最终级栏目，再进行添加')
                    return
                }
                this.$router.push({ name:'exam-subject-import',params:{chapterInfo:this.category.currentData}})
                console.log('this.category.currentData',this.category.currentData);
                
            },
            addQuestion(){
                if(!this.selectData.id||!this.ended==1){
                     xmview.showTip('warning','请先选择左侧最终级栏目，再进行添加')
                     return
                }
                this.$router.push({ name:'course-manage-addLib',params:{addcourseInfo:this.category.currentData,handle:'add'}})
            },
            update (index, row) {
                console.log(row)
                this.$router.push({
                    name:'course-manage-addLib',
                    params: {courseInfo: row,handle:'edit', readonly:true},
                    query: {id: row.contentid},
                })
            },
            sectionPageChange (val) {
                this.section.page = val
                this.fetchCourseLists()
            }
        }
    }
</script>
