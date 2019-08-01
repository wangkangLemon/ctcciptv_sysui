<!--课程任务模板-->
<style lang='scss' rel="stylesheet/scss">
    @import "../../../utils/mixins/mixins";
    @import "../../../utils/mixins/topSearch";
    @import "../../../utils/mixins/common";

    .course-task-template-index {
        @extend %content-container;
        .search {
            @extend %top-search-container;
        }

        .manage-container {
            @extend %right-top-btnContainer;
        }

        .block {
            text-align: right;
            margin-top: 10px;
        }

        .edui-editor {
            width: 100% !important;
        }

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
            width: 178px;
            height: 178px;
            line-height: 178px;
            text-align: center;
        }

        .avatar {
            width: 178px;
            height: 178px;
            display: block;
        }

        .img-wrap {
            margin-bottom: 10px;
            width: 150px !important;
            height: 150px !important;
            img {
                width: 100%;
                height: 100%;
            }
        }

        .add {
            background: #ededed;
            padding: px2rem(10) px2rem(20);
            border-bottom: 1px solid #ededed;
        }

        .desc {
            width: 100%;
            height: 100px;
        }
    }
</style>
<template>
    <article class="course-task-template-index">
        <!--添加/编辑表单-->
        <!--点击添加 form数据取邮箱/手机号 密码-->
        <article class="manage-container">
            <el-button icon="plus" type="primary" @click="()=> $router.push({name:'coursetask-template-add'}) ">添加
            <!--添加-->
            </el-button>
        </article>
        <section class="search">
            <section>
                <i>课程名称</i>
                <el-input @keyup.enter.native="getData" class="name" v-model="fetchParam.title"/>
            </section>
            <section>
                <i>栏目类型</i>
                <el-select clearable v-model="fetchParam.task_type" placeholder="未选择" @change="getData">
                    <el-option label="课程任务" value="1"></el-option>
                    <el-option label="试题任务" value="2"></el-option>
                    <el-option label="学习任务" value="3"></el-option>
                </el-select>
            </section>
            <section>
                <i>类别</i>
                <!--<CourseTaskTemplateCategorySelect :onchange="getData"
                                                  v-model="fetchParam.category_id"></CourseTaskTemplateCategorySelect>-->
                <el-form  prop="category_id" :fetch-suggestions="querySearch" >
                    <el-select clearable class="select" v-model="fetchParam.category_id" placeholder="请选择类别"  @change="getData">
                        <el-option  v-for="item in  category_list" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form>
            </section>
        </section>
        <el-table border :data="coursetasktemplateData" v-loading="loading">
            <el-table-column
                    prop="title"
                    label="课程任务">
                    <template scope="scope">
                        <el-tag type="primary" v-if="scope.row.task_type=='1'">课程</el-tag>
                        <el-tag type="danger" v-else-if="scope.row.task_type=='2'">考试</el-tag>
                        <el-tag type="success" v-else-if="scope.row.task_type=='3'">学习</el-tag>
                        {{scope.row.title}}
                    </template>
            </el-table-column>
            <el-table-column
                    prop="study_duration"
                    label="课时(分)"
                    width="100">
                     <template scope="scope">
                        {{Math.floor(scope.row.study_duration/60)}}
                    </template>
            </el-table-column>
            <el-table-column
                    prop="addate"
                    label="创建时间"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="status_name"
                    label="状态"
                    width="100">
                <template scope="scope">
                    <el-tag type="success" v-if="scope.row.status == 2">正常</el-tag>
                    <!--<el-tag type="gray" v-if="scope.row.status == 1">草稿</el-tag>
                    <el-tag type="gray" v-if="scope.row.status == 2">下线</el-tag>-->
                </template>
            </el-table-column>
            <el-table-column prop="operate" label="操作" width="160">
                <template scope="scope">
                    <el-button type="text" size="small" @click="editItm(scope.row)">
                        修改
                        <!--点击详情 form数据变成当前管理员的信息-->
                    </el-button>
                    <!--<el-button v-if="scope.row.status == 2 || scope.row.status == 1 " type="text" size="small"
                               @click="publishCourseTaskTemplate(scope.row)">
                        上线
                    </el-button>
                    <el-button v-if="scope.row.status == 0 " type="text" size="small"
                               @click="revokeCourseTaskTemplate(scope.row)">
                        <i>下线</i>
                    </el-button>-->
                    <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">
                        <i>删除</i>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <section class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pagesize"
                    :page-sizes="[15, 30, 60, 100]"
                    layout="total, sizes, ->, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </section>
    </article>
</template>
<script>
    import DateRange from '../../component/form/DateRangePicker.vue'
    import courseTaskService from '../../../services/gov/courseTaskService.js'
    // import CourseTaskTemplateCategorySelect from '../../component/select/CourseTaskTemplateCategory.vue'
    import {fillImgPath} from '../../../utils/filterUtils'

    export default {
        filters: {
            fillImgPath
        },
        components: {
            DateRange,
            // CourseTaskTemplateCategorySelect,
        },
        data () {
            return {
                TYPE:['','课程','考试','学习'],
                currCategoryName: '',
                loading: false,
                fetchParam: {
                    title: '',
                    category_id: '',
                    status: -1,
                    deleted: -1,
                    task_type:''
                },
                itemName: '',           // 要删除项名称
                coursetasktemplateData: [],
                total: 0,
                currentPage: 1, // 分页当前显示的页数
                pagesize: 15,
                category_list:[]
            }
        },
        activated () {
            this.getData().then(() => {
                xmview.setContentLoading(false)
            })
            this.getCategory()
        },
        watch:{
             'fetchParam.task_type'(){
                this.getCategory()
            }
        },
        methods: {
            //获取部门组下拉列表
            getCategory(val){
                courseTaskService.getCategoryTree({pagesize:-1,type:this.fetchParam.task_type}).then((ret)=>{
                 this.category_list = ret.data;
                })
            },
            //拿到部门组
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据返回建议列表的数据
                cb(results);
            },
            handleDelete (index, row) {
                let txt=this.TYPE[row.task_type]
                xmview.showDialog(`你将要删除${txt}任务【<i style="color:red">${row.title || ''}</i>】操作不可恢复确认吗？`, ()=>{
                    courseTaskService.deleteCourseTaskTemplate(row.id).then((ret) => {
                        this.coursetasktemplateData.splice(index, 1)
                        xmview.showTip('success', '删除成功')
                    })
                })
            },
            editItm (row) {
                row.course = row.course || []
                this.$router.push({name: 'coursetask-template-add',params: {coursetaskInfo:row}, query: {id: row.id}})
            },
            publishCourseTaskTemplate (row) {
                xmview.showDialog(`你将要上线课程任务【<i style="color:red">${row.title || ''}</i>】吗？`, this.publishItem(row.id))
            },
            publishItem (id) {
                // 以下执行接口删除动作
                return () => {
                    courseTaskService.publishCourseTaskTemplate(id).then((ret) => {
                        xmview.showTip('success', '上线成功')
                        this.getData()
                    }).catch((ret) => {
                        xmview.showTip('error', ret.message)
                    })
                }
            },
            revokeCourseTaskTemplate (row) {
                xmview.showDialog(`你将要下线课程任务【<i style="color:red">${row.title || ''}</i>】吗？`, this.revokeItem(row.id))
            },
            revokeItem (id) {
                // 以下执行接口删除动作
                return () => {
                    courseTaskService.revokeCourseTaskTemplate(id).then((ret) => {
                        xmview.showTip('success', '下线成功')
                        this.getData()
                    }).catch((ret) => {
                        xmview.showTip('error', ret.message)
                    })
                }
            },
            handleSizeChange (val) {
                this.pagesize = val
                this.getData()
            },
            handleCurrentChange (val) {
                this.currentPage = val
                this.getData()
            },
            getData () {
                this.loading = true
                return courseTaskService.getCourseTaskTemplateList({
                    category_id: this.fetchParam.category_id,
                    title: this.fetchParam.title,
                    deleted: this.fetchParam.deleted,
                    status: this.fetchParam.status,
                    page: this.currentPage,
                    pagesize: this.pagesize,
                    task_type:this.fetchParam.task_type,
                }).then((ret) => {
                    this.coursetasktemplateData = ret.data
                    this.total = ret._exts.total
                }).then(() => {
                    this.loading = false
                })
            },
            handleImgUploaded(response) {
                this.form.cover = response.data.url
            },
            ueReady (ue) {
                this.editor = ue
            }
        }
    }
</script>
