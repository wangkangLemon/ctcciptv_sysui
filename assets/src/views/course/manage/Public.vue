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
                margin-left: 15px;
            }
        }
        .left-content {
            display: inline-block;
            vertical-align: top;
            width: 25%;
            background: #fff;
            .classify-tree {
                padding: 1px;
                // .el-tree-node{
                //     overflow: hidden;
                // }
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
                        white-space:nowrap;
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
                <router-link tag="el-button" :to="{name: 'course-category-manage'}">管理分类</router-link>
            </div>
            <div class="classify-tree">
                <CourseCategoryTree v-model="treeData" ref="courseCategory" :onNodeClick="treeNodeClick.bind(this,1)"></CourseCategoryTree>
                 <!-- <MenuTree :data="SecMenu" v-if="SecMenu.length" ref="chapterCategory" :Mult='Mult'></MenuTree> -->
            </div>
        </section>
        <section class="right-content">
            <div class="content-title">
                <span v-if="category.title">{{category.title}}-</span>课程列表
                <!-- <el-button type="primary" icon="plus" @click="$router.push({ name:'course-manage-addCourse'})"><i>添加视频课程</i></el-button>
                <el-button type="warning" icon="plus" @click="addHerbal"><i>添加中草药课程</i> </el-button> -->
                <el-button type="primary" icon="plus" @click="addCourse"><i>添加课程</i></el-button>
            </div>
            <div class="content-list">
                <div class="search">
                    <section class="fi">
                     <i>标题</i><el-input id="input" v-model="section.course_name" placeholder="请输入标题" @keyup.enter.native="fetchCourseLists" auto-complete="off" ></el-input>
                    </section>  
                    <!-- <DateRange title="创建时间" :start="section.create_start" :end="section.create_end" @changeStart="val=> section.create_start =val "
                        @changeEnd="val=> section.create_end=val" :change="fetchCourseLists">
                    </DateRange> -->
                    <section>
                        <i>状态</i>
                        <el-select v-model="section.status" placeholder="未选择" @change="fetchCourseLists" :clearable="true">
                            <el-option label="全部" value="-1"></el-option>
                            <el-option label="正常" value="0"></el-option>
                            <el-option label="禁用 " value="1"></el-option>
                            <el-option label="转码中" value="2"></el-option>
                        </el-select>
                    </section>
                </div>     
                <el-table v-loading="section.loading" border :data="section.data">
                    <el-table-column prop="course_name" label="课程名称" min-width="230"></el-table-column>
                    <el-table-column prop="category_name" label="绑定栏目" width="190">
                        <!--<template scope="scope">
                            {{scope.row.category_name || '无'}}
                        </template> -->
                    </el-table-column>
                    <el-table-column prop="sort" label="排序" width="70"></el-table-column>
                    <el-table-column prop="tags" label="标签" width="100"></el-table-column>
                    <!-- <el-table-column class="tag" label="标签" :label-width="formLabelWidth">
                        <span @click="toggleTag(item.value)" :class="{'ac  tive': item.value == form.tags}" v-for="(item, index) in tags">{{item.name}}</span>
                    </el-table-column> -->
                    <el-table-column width="80" label="状态">
                        <template scope="scope">
                            <el-tag v-if="scope.row.status == 0" type="success">正常</el-tag>
                            <el-tag v-else type="danger">禁用 </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="addate" label="创建时间" width="180"></el-table-column>
                    <el-table-column prop="operate" label="操作" width="150" fixed="right">
                        <template scope="scope">
                            <el-button @click="edit(scope.row)"
                                type="text" size="small">编辑
                            </el-button>
                            <el-button @click="offline(scope.$index, scope.row)" type="text" size="small">
                                <i>{{ scope.row.status == 1 ? '正常 ' : '禁用 ' }}</i>
                            </el-button>
                            <el-button @click="del(scope.$index, scope.row)" type="text" size="small">删除</el-button>
                            <!-- <el-button v-if="scope.row.subject_num > 0" @click="$router.push({name:'course-manage-course-answer-analysis', params:{id:scope.row.id}})"
                                type="text" size="small">答案分析
                            </el-button> -->
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
    import courseService from '../../../services/course/courseService'
    import CourseCategoryTree from '../../component/tree/CourseCategory.vue'
    import SectionCategoryMenu from '../../component/select/SectionCategoryMenu.vue'
    import ImagEcropperInput from '../../component/upload/ImagEcropperInputSec.vue'
    import DateRange from '../../component/form/DateRangePicker.vue'

    export default {
        components: {
            CourseCategoryTree,SectionCategoryMenu,ImagEcropperInput,DateRange,
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
                    stime :'',
                    etime:'',
                    page: 1,
                    pagesize: 10,
                    total: 0,
                    gov_id: void 0, // 部门id
                    category_id: void 0, // 栏目id
                    course_name: '',
                    type: 'public',
                    level: void 0,
                    create_start: void 0,
                    create_end: void 0,
                    need_testing: void 0, //  不赋值则表示全部，0为不需要，1为需要
                    status:'', // 2- 视屏转码中 1-下线 0-正常
                },
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                SecMenu:[],
                Mult:'true',// 判断左边 课程多级栏目树状标识,
                treeData: [],
                ended:void 0,
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
            // this.fetchData()
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
                console.log(node.data)
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
            // 下线 或者上线课程 0为下线，1为上线
            offline(index, row) {
                console.log(row)
                let txt = row.status == 0 ? '禁用' : '启用'
                let finalStatus = row.status == 0 ? 1 : 0
                xmview.showDialog(`你将要${txt}课程 <span style="color:red">${row.course_name}</span> 确认吗?`, () => {
                    courseService.offlineCourse({
                        id: row.contentid,
                        status: finalStatus
                    }).then((ret) => {
                        row.status = finalStatus
                    })
                })
            },
            // fetchData() {//获取左边栏目数据 4-23左边直接在子组件里控制数据在父组件不用写方法
            //     let param={
            //             category_id: this.examCateid , // 3- 供应商
            //             page: 1,
            //             chapter_type:1,
            //             pagesize: -1,
            //         }
            //     courseService.fetchChapterCategory( param).then((ret) => {
            //             this.SecMenu=ret
            //             // console.log('this.SecMenu+++++++',param,this.SecMenu)
            //             xmview.setContentLoading(false)     
            //         })
            // },
            fetchCourseLists () { //右边表数据
                this.section.loading = true
                let obj = Object.assign({},this.section)
                if(obj.status === ''){
                    obj.status = -1
                }
                return courseService.getPublicCourselist(obj).then((ret) => {
                    xmview.setContentLoading(false)
                    this.section.data = ret.data
                    this.section.total = ret._exts.total
                    this.section.loading = false
                })
            },
              // 单条删除
            del(index, row) {
                xmview.showDialog(`你将要删除课程 <span style="color:red">${row.course_name}</span> 操作不可恢复确认吗?`, () => {
                    courseService.deleteCourse({
                        course_id: row.contentid
                    }).then((res) => {
                        if(res.code==0){
                           xmview.showTip('success', '操作成功')
                        }else{
                           xmview.showTip('error', res.message) 
                        }
                        this.fetchCourseLists()
                    })
                })
            },

            //添加课程按钮逻辑
            addCourse(){
                console.log(this.section.category_type)
            //  this.$router.push({ name:'course-manage-addCourse'}
                if(this.ended==1){
                    if( this.section.category_type==3|| this.section.category_type==4||this.section.category_type==5){
                        this.$router.push({ name:'course-manage-addCourse-herbal',params:{herbalInfo:this.section,handle:'add'}})
                        return 
                    }
                    else if(this.section.category_type==6){
                        this.$router.push({ name:'course-manage-addCourse-imgtxt',params:{imgtxtInfo:this.section,handle:'add'}})
                        return 
                    }
                    else{
                        this.$router.push({ name:'course-manage-addCourse',params:{addcourseInfo:this.section,handle:'add'},query:{
                        	category_name:this.section.category_name,
                        	category_id:this.section.category_id,
                        	handle:'add'}})
                        return
                    }
                }
                xmview.showTip('error','请先选择左侧最终级栏目，再进行添加')
                return
            },
            edit(row){
            	console.log(row.contentid)
                console.log(row,this.section)
                if(row.category_type==3||row.category_type==4||row.category_type==5){
                    this.$router.push({name: 'course-manage-addCourse-herbal', params: {herbalInfo: row,handle:'edit'}, query: {id: row.contentid,handle:'edit'}})
                }
                else if(row.category_type==6){
                    this.$router.push({ name:'course-manage-addCourse-imgtxt',params:{imgtxtInfo:row,handle:'edit'},query: {handle:'edit'}})
                    return 
                }
                else{
                    this.$router.push({name: 'course-manage-addCourse', params: {courseInfo: row,handle:'edit'}, query: {contentid: row.contentid,handle:'edit'}})
                }
            },
           //添加中草药
            addHerbal(){
                console.log(this.section.category_type)
                //  this.$router.push({ name:'course-manage-addCourse'}
                if(this.ended==1){
                    if( this.section.category_type==3|| this.section.category_type==4||this.section.category_type==5){
                        this.$router.push({ name:'course-manage-addCourse-herbal',params:{herbalInfo:this.section,handle:'add'}})
                        return 
                    }
                    else{
                        this.$router.push({ name:'course-manage-addCourse',params:{courseInfo:this.section,handle:'add'}})
                        return
                    }
                }
                xmview.showTip('error','请先选择中药栏目组最终级栏目添加')
                return
            },
            sectionPageChange (val) {
                this.section.page = val
                this.fetchCourseLists()
            }
        }
    }
</script>
