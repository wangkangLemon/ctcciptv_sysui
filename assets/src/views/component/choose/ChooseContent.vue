<style lang="scss">
    @import "../../../utils/mixins/topSearch";

    .search {
        @extend %top-search-container;
    }

    .choose-course {
        .block {
            text-align: center !important;
            width: 50%;
            margin: 0 auto;
            margin-top: 10px;
        }
    }
</style>
<template>
    <article>
        <!--选取组件-->
        <el-dialog class="choose-course main-container" title="选取内容" :visible.sync="curValue">
            <el-tabs  @tab-click="handleClick"  v-model="activeTab">
                <el-tab-pane label="视频课程" name="first">
                    <section class="search">
                        <section>
                            <i>课程名称</i>
                            <el-input @keyup.enter.native="fetchData" v-model="search.course_name"></el-input>
                        </section>

                        <section>
                            <i>栏目分类</i>
                            <Course-category-select :onchange="fetchData" v-model="search.category_id"></Course-category-select>
                        </section>

                    </section>
                    <el-table v-loading="loadingData" border :data="data" :highlight-current-row="true">
                        <el-table-column prop="course_name" label="课程名称"></el-table-column>
                        <el-table-column prop="category_name" label="所属栏目" width="100"></el-table-column>
                        <el-table-column prop="material_type" label="课程类别" width="150">
                            <template scope="scope">
                                {{material_type[scope.row.material_type]}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="operate" label="点击" width="100">
                            <template scope="scope">
                                <el-button type="text" @click="courseConfirm(scope.row)">选取</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="工业课程" name="second">
                    <section class="search">
                        <section>
                            <i>课程名称</i>
                            <el-input @keyup.enter.native="fetchData" v-model="search.course_name"></el-input>
                        </section>
                    </section>
                    <el-table v-loading="loadingData" border :data="data" :highlight-current-row="true">
                        <el-table-column prop="course_name" label="课程名称"></el-table-column>
                        <el-table-column prop="material_type" label="课程类别" width="150">
                            <template scope="scope">
                                {{material_type[scope.row.material_type]}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="operate" label="点击" width="100">
                            <template scope="scope">
                                <el-button type="text" @click="courseConfirm(scope.row)">选取</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            
            </el-tabs>
            
            <div class="block">
                <el-pagination
                        @size-change="courseSizeChange"
                        @current-change="coursePageChange"
                        :total="total"
                        :current-page="fetchParam.page"
                        :page-size="fetchParam.pagesize"
                        :page-sizes="[10, 20, 40, 100]"
                        layout="total, sizes, prev, pager, next">
                </el-pagination>
            </div>
        </el-dialog>
    </article>
</template>
<script>
    import courseService from '../../../services/course/courseService.js'
    import industryService from '../../../services/course/industryService.js'
    import speakingService from '../../../services/course/courseService.js'
    import ArticleService from '../../../services/course/courseService.js'
    import CourseCategorySelect from '../../component/select/SecCourseCategory.vue'
    function getFetchParam() {
        return {
            page:  1,
            pagesize: 10,
        }
    }
    export default {
        props: ['value'],
        components: {
            CourseCategorySelect
        },
        data () {
            return {
                activeTab: 'first',
                curValue: this.value,
                loadingData: false,
                search: {
                    course_name: '',
                    category_id: void 0, // 栏目id
                },
                category: 'course',
                data: [],
                page: 1,
                pagesize: 10,
                total: 0,
                category_id: void 0,
                fetchParam: getFetchParam(),
                category_name:'',
                gov_name:'',
                material_type: {
                    video: '视频',
                    doc: 'word文档',
                    ppt: '幻灯片',
                    pdf: 'PDF文件'
                }
            }
        },
        watch: {
            // category () {
            //     this.page = 1
            //     this.search.keyword = ''
            // },
            value (val) {
                this.curValue = val
            },
            curValue (val) {
                this.curValue = val
                this.$emit('input', val)
            },
            'activeTab'(val) {
                console.log(typeof(val),val);
                if (val === 'second' ){
                    console.log('111111this.activeTab',this.activeTab);
                }
                // this.fetchData()
            }
        },
        created () {
            this.fetchData()
            // this.activeTab= 'first'
        },
        methods: {
            handleClick(tab, event) {
                 console.log('this.activeTab',this.activeTab);
                 this.search.course_name=''
                 this.fetchData()
            },
            // 课程当前页
            coursePageChange (val) {
                this.fetchParam.page = val
                this.fetchData()
            },
            // 课程分页
            courseSizeChange (val) {
                this.fetchParam.pagesize = val
                this.fetchData()
            },
            // confirm (item) {
            //     this.$emit('result', {data: item, category: this.category})
            // },
            courseConfirm (item) {
                this.$emit('result', item)
            },
            fetchData () {
                let p,param
                if(this.activeTab=== 'first'){
                    p=courseService.getPublicCourselist
                    param={
                        course_name: this.search.course_name,
                        category_id: this.search.category_id,
                        page: this.fetchParam.page,
                        pagesize: this.fetchParam.pagesize,
                        material_type : 'video',
                        type:'public'
                        
                    }
                }else if(this.activeTab=== 'second'){
                    p=industryService.fetchCourseList
                    param={
                        course_name: this.search.course_name,
                        page: this.fetchParam.page,
                        pagesize: this.fetchParam.pagesize
                    }
                }
                console.log(p);
                
                this.loadingData = true
                // 获取课程数据
                return p(param).then((ret) => {
                    this.data = ret.data
                    this.total = ret._exts.total
                    this.loadingData = false
                }).catch((ret) => {
                    xmview.showTip('error', ret.message)
                })
            },
            getArticle () {
                this.loadingData = true
                return ArticleService.getArticleList({
                    title: this.search.keyword,
                    page: this.page,
                    pagesize: this.pagesize
                }).then((ret) => {
                    this.data = ret.data
                    this.total = ret._exts.total
                    this.loadingData = false
                }).catch((ret) => {
                    xmview.showTip('error', ret.message)
                })
            },
            getSpeaking () {
                this.loadingData = true
                // 获取课程数据
                console.log(this.search.course_name)
                return courseService.getPublicCourselist({
                    course_name: this.search.course_name,
                    page: this.page,
                    pagesize: this.pagesize
                }).then((ret) => {
                    this.data = ret.data
                    this.total = ret._exts.total
                    this.loadingData = false
                }).catch((ret) => {
                    xmview.showTip('error', ret.message)
                })
            },
            changeList () {
                let typeArr = {course: 'fetchData', article: 'getArticle', speaking: 'getSpeaking'}
                this[typeArr[this.category]]()
            }
        }
    }
</script>
