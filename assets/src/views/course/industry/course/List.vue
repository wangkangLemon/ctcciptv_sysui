<!--添加课程管理-->
<style lang='scss' rel='stylesheet/scss'>
@import "../../../../utils/mixins/common";
@import "../../../../utils/mixins/topSearch";
@import "../../../../utils/mixins/showDetail";

#medical-index-container {
    @extend %content-container;

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
        .el-tag{
            margin-top: 5px;
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
    <article id="medical-index-container">
        <!--详情-->
        <el-dialog class="show-detail" title="查看添加课程" v-model="showDetail">
            <div class="info">
                <h2>{{clerkDetail.name}}</h2>
                <p><i class="title">课程名称</i><span class="value">{{clerkDetail.product_name }}</span></p>
                <p><i class="title">用户</i><span class="value">{{clerkDetail.mark }}</span></p>
                <!-- <p><i class="title">标记：</i> 
                    <el-tag type="warning" size="medium" v-if="clerkDetail.mark=='vip_discount'">vip打折</el-tag>
                    <el-tag type="primary" size="medium" v-if="clerkDetail.mark=='vip_original'">vip原价</el-tag>
                </p> -->
                <p><i class="title">价格(元)：</i> <span class="value">{{clerkDetail.price_yuan}}</span></p>
                <p><i class="title">添加课程简介：</i> <span class="value">{{clerkDetail.description}}</span></p>
                <p><i class="title">添加课程简介：</i> <span class="value">{{clerkDetail.description}}</span></p>
                <p><i class="title">苹果原价添加课程id：</i> <span class="value">{{clerkDetail.appleid_origin}}</span></p>
                <p><i class="title">苹果折扣价添加课程id：</i><span class="value">{{clerkDetail.appleid_discount}}</span></p>
            </div>
        </el-dialog>
        <section class="manage-container">
            <!--<el-button type="primary" icon="plus" @click="$router.push({ name:'person-add',params:{sys_type:'add'}})">-->
            <el-button type="primary" icon="plus" @click="addCourse">
                <i>添加课程</i>
            </el-button>
        </section>

        <article class="search">
            <section class="fi">
                     <i>标题</i><el-input id="input" v-model="fetchParam.course_name" placeholder="请输入标题" @keyup.enter.native="fetchData" auto-complete="off" ></el-input>
                    </section>  
                    <!-- <section>
                        <i>状态</i>
                        <el-select v-model="fetchParam.status" placeholder="未选择" @change="fetchData" :clearable="true">
                            <el-option label="全部" value="-1"></el-option>
                            <el-option label="正常" value="0"></el-option>
                            <el-option label="禁用 " value="1"></el-option>
                            <el-option label="视频转码中" value="2"></el-option>
                        </el-select>
                    </section> -->
        </article>

        <el-table class="data-table" v-loading="loadingData" :data="data" :fit="true" border>
            <el-table-column :show-overflow-tooltip="true" min-width="120" prop="course_name" label="课程名称" v-if="data">
            </el-table-column>
            <!-- <el-table-column min-width="100" prop="user_id" label="用户">
                <template scope="scope">
                    <p> {{ scope.row.user_id!==0?scope.row.user_name:"全部用户"}}</p>
                </template>
            </el-table-column> -->
            <el-table-column prop="tags" label="标签" min-width="100"></el-table-column>
            <el-table-column min-width="70" prop="material_type" label="题材类型">
                <template scope="scope">
                    <el-tag type="primary" size="medium" v-if="scope.row.material_type=='video'">视频</el-tag>
                    <el-tag type="warning" size="medium" v-if="scope.row.material_type=='doc'">文档</el-tag>
                    <el-tag type="danger" size="medium" v-if="scope.row.material_type=='ppt'">演示文稿</el-tag>
                    <el-tag type="success" size="medium" v-if="scope.row.material_type=='pdf'">图片</el-tag>
                </template>
            </el-table-column>
             <el-table-column min-width="80" label="状态">
                        <template scope="scope">
                            <el-tag v-if="scope.row.status == 0" type="success">正常</el-tag>
                            <el-tag v-else type="danger">禁用 </el-tag>
                        </template>
                    </el-table-column>
            <el-table-column min-width="100" prop="addate" label="创建时间">
            </el-table-column>
            
            <!--<el-table-column width="100" label="状态">
                <template scope="scope">
                    <el-tag v-if="scope.row.deleted == 1">已删除</el-tag>
                    <el-tag v-else-if="scope.row.deleted == 0&&scope.row.disabled == 0" type="success">正常</el-tag>
                    <el-tag v-else>禁用</el-tag>
                </template>
            </el-table-column>-->
            <el-table-column fixed="right" width="180" label="操作">
                <template scope="scope">
                    <!-- <el-button type="text" size="small" @click="checkClerkDetail(scope.$index, scope.row)">
                           详情
                    </el-button> -->
                    <el-button type="text" size="small" @click="editCourse(scope.$index, scope.row)">
                            修改
                    </el-button>
                    <!-- <el-button @click="offline(scope.$index, scope.row)" type="text" size="small">
                                <i>{{ scope.row.status == 1 ? '正常 ' : '禁用 ' }}</i>
                    </el-button> -->
                    <el-button @click="del(scope.$index, scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--底部的page -->
        <el-pagination class="pagin" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="fetchParam.page" :page-size="fetchParam.pagesize" :page-sizes="[15, 30, 60, 100]" layout="sizes,total, prev, pager, next" :total="total">
        </el-pagination>

    </article>
</template>

<script>
import industryService from '../../../../services/course/industryService'
import Product from '../../../component/select/CommonSelect.vue'

function getFetchParam() {
    return {
        page: 1,
        pagesize: 15,
        status:''
}
}

export default {
    components: {
        Product
    },
    data() {

        return {
            loadingData: false,
            data: [], // 表格数据
            total: 0,
            name:'',
            dialogVisible: false,
            selectedIds: [], // 被选中的数据id集合
            fetchParam: getFetchParam(),
            dialogTree: {
                isShow: false,
                selectedId: void 0,
            },
            showDetail: false,     // 是否显示详情对话框
            // 查看管理员详情
            clerkDetail: {
                name: '',          // 名称
                professor: '',        // 职称
                pass: '',          // 科室
                address: '',       // 地址
                sex: 0,            // 性别
                birthday: '',          // 生日
                addate: ''
            },
                formLabelWidth: '120px', // 表单label的宽度
                changelistc:[]

        }
    },
    activated () {
        this.fetchData()
    },
    methods: {
        //  //课程搜索
        //     reqFun2(val, length){
        //         let param={
        //             page: parseInt(length / 15) + 1||1,
        //             pagesize: 15,
        //             name:val,
        //         }
        //         let _this=this
        //         this.fetchData(this.fetchParam.product_id)
        //         return industryService.fetchProductList(param)
        //         .then((ret)=>{
        //                 _this.$emit('changelistc', ret.data)
        //             return ret
        //         })
        //     },
        // 下线 或者上线课程 0为下线，1为上线
        offline(index, row) {
            console.log(row)
            let txt = row.status == 0 ? '禁用' : '启用'
            let finalStatus = row.status == 0 ? 1 : 0
            xmview.showDialog(`你将要${txt}课程 <span style="color:red">${row.course_name}</span> 确认吗?`, () => {
                industryService.offlineCourse({
                    id: row.contentid,
                    status: finalStatus
                }).then((ret) => {
                    row.status = finalStatus
                })
            })
        },
        //添加
        addCourse () {
            this.$router.push({
                name: 'course-industry-addCourse',
            })
        },

     // 修改信息
        editCourse(index, row) {
            console.log(row)
            this.$router.push({
                name: 'course-industry-addCourse',
                params: {courseInfo: row,handle:'edit'}, query: {contentid: row.id}
            })
        },
       // 查看管理员详情
        checkClerkDetail (index, row) {
            this.showDetail = true
            industryService.getCourse(row.id).then((ret) => {
                this.clerkDetail = ret
            })
        },
        initFetchParam() {
            this.fetchParam = getFetchParam()
        },
        handleCurrentChange(val) {
                this.fetchParam.page = val
                this.fetchData()
        },
        handleSizeChange( val) {
            this.fetchParam.pagesize = val
            this.fetchData()
        },
        fetchData(val) {
            let obj = Object.assign({},this.fetchParam)
            return industryService.fetchCourseList(obj).then((ret) => {
                this.data = ret.data
                this.total = ret._exts.total
                this.loadingData = false
                xmview.setContentLoading(false)     
            })
        },
        // 单条删除
        del(index, row) {
            xmview.showDialog(`你将要删除课程 <span style="color:red">${row.course_name}</span> 此操作不可恢复，确认吗?`, () => {
                industryService.deleteCourse(row.id).then(() => {
                    this.data.splice(index, 1)//删除选中项
                    row.deleted = 1
                    xmview.showTip('success', '操作成功')
                })
            })
        },
        Time(row, column, cellValue){
              return  this.timeFilter(row.addate) 
        },
        timeFilter( addate){
            let time
            this.data.forEach(v=> {3
                    time = addate.split(" ")[0]
                }, this);
            return time
        },

    },
}
</script>
