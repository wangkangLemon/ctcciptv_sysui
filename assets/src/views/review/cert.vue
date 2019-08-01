<!--商品管理-->
<style lang='scss' rel='stylesheet/scss'>
@import "../../utils/mixins/common";
@import "../../utils/mixins/topSearch";
@import "../../utils/mixins/showDetail";

#medical-index-container {
    @extend %content-container;

    .manage-container {
        @extend %right-top-btnContainer;
        >* {
            color: #fff;
        } // 添加课程
        .add {
            background: rgb(0, 204, 255);
        } // 管理栏目
        .catmange {
            background: rgb(153, 102, 204);
        }
  
    }
    .show-detail{
        .avatar{
            img{
                
            }
        }
        .info{
            .el-tag{
                margin-top: 5px;
            }
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
        <el-dialog class="show-detail" title="查看商品" v-model="showDetail">
            <div class="avatar">
                <img :src="{url:clerkDetail.image, sex: clerkDetail.sex} | defaultAvatar" />
            </div>
            <div class="info">
                <h2>{{clerkDetail.name}}</h2>
                <p><i class="title">用户</i><span class="value">{{clerkDetail.user_name }}</span></p>
                <p><i class="title">资格证书类型</i> <span class="value">{{clerkDetail.type}}</span></p>
                <p><i class="title">审核状态</i> 
                    <el-tag type="warning" size="medium" v-if="clerkDetail.status==1">审核中 </el-tag>
                    <el-tag type="success" size="medium" v-if="clerkDetail.status==2">审核通过</el-tag>
                    <el-tag size="medium" v-if="clerkDetail.status==3">审核失败</el-tag>
                </p>
                <p><i class="title">审核人</i> <span class="value">{{thisAdmin}}</span></p>
            </div>
        </el-dialog>
  

        <article class="search">
            <section>
                <i>手机号</i>
                <el-input v-model="fetchParam.mobile" placeholder="请输入用户手机号码"   @keyup.enter.native="fetchData" ></el-input>
            </section>
        </article>

        <el-table class="data-table" v-loading="loadingData" :data="data" :fit="true" border>
            <el-table-column min-width="100" prop="user_name" label="用户" v-if="data">
            </el-table-column>
            <el-table-column min-width="100" prop="type" label="资格证书类型">
                <template scope="scope">
                    {{certType[scope.row.type]}}
                </template>
            </el-table-column>
            
            <el-table-column min-width="100" prop="mobile"  label="手机号">
            </el-table-column>
            <el-table-column min-width="120" prop="addate" label="创建时间">
            </el-table-column>
            <el-table-column min-width="100" prop="admin_name"  label="审核人">
            </el-table-column>
            <el-table-column width="100" label="状态">
                <template scope="scope">
                    <el-tag v-if="scope.row.status == 1" type="warning">审核中</el-tag>
                    <el-tag v-else-if="scope.row.status == 2" type="success">审核通过</el-tag>
                    <el-tag v-else>审核失败</el-tag>
                </template>
            </el-table-column>
            <el-table-column fixed="right" width="150" label="操作">
                <template scope="scope">
                    <!--<el-button @click="showFn(scope.$index, scope.row)" type="text" size="small">详情
                    </el-button>-->
                    <el-button type="text" size="small" @click="checkClerkDetail(scope.$index, scope.row)">
                           详情
                    </el-button>
                    <!-- <el-button v-if="scope.row.status == 1" @click="showDialog(scope.$index, scope.row)" type="text" size="small">
                        审核
                    </el-button> -->
                    <el-button v-if="scope.row.status == 1" @click="agree(scope.$index, scope.row,2)" type="text" size="small">
                        <i>通过</i>
                    </el-button>
                    <el-button v-if="scope.row.status == 1" @click="agree(scope.$index, scope.row,3)" type="text" size="small">
                        <i>驳回</i>
                    </el-button>
                    <!-- <el-button @click="del(scope.$index, scope.row)" type="text" size="small">删除</el-button> -->
                </template>
            </el-table-column>
        </el-table>

        <!--底部的page -->
        <el-pagination class="pagin" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="fetchParam.page" :page-size="fetchParam.pagesize" :page-sizes="[15, 30, 60, 100]" layout="sizes,total, prev, pager, next" :total="total">
        </el-pagination>

        <!--底部的批量删除和移动两个按钮-->
        <!--<div class="bottom-manage">
            <el-button :disabled='selectedIds.length < 1' @click="dialogTree.isShow = true">移动到</el-button>
            <el-button :disabled='selectedIds.length < 1' @click="delMulti">批量删除</el-button>
        </div>-->

    </article>
</template>

<script>
import reviewService from '../../services/reviewService'
import sysService from '../../services/sys/sysService'
import DateRange from '../component/form/DateRangePicker.vue'
import Region from '../component/select/Region.vue'


function getFetchParam() {
    return {
        page: 1,
        pagesize: 15,
        name,
        mobile:void 0,
        status:-1,
    }
}

export default {
    name: 'review-cert',
    components: {
        DateRange,
        Region,
    },
    data() {

        return {
            certType: ['', '执业医师'] ,
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
            adminList:[],
            thisAdmin:'暂无',
            addForm: false, // 审核弹窗是否显示
            auditedParam: {
                status: null,
                admin_name: ''
            },
            rules: {
                status: [{
                    required: true,
                    message: '必须填写'
                }],
            },
            changelist:[]//审核人搜索选项

        }
    },
    activated () {
        this.fetchParam = getFetchParam()
        this.fetchData()
    },
    methods: {
        reqFun(val, length){
            console.log('length='+length);
            console.log( parseInt(length / 15) + 1);
            let param={
                page: parseInt(length / 15) + 1||1,
                pagesize: 15,
                name:val,
            }
            return sysService.fetchData(param)
        },
        // 	已审核 或者未审核课程 全部：-1 1：未审核 2：已审核 3：审核不通过
        showDialog(index, row) {
            this.addForm = true
            this.fetchParam.contentid = row.contentid
            this.auditedRow = row
        },
        //提交审核
        submitAudit(form, row) {
            this.$refs[form].validate((valid) => {
                if (!valid) return
                courseService.auditCourse({
                    course_id: this.fetchParam.contentid,
                    status: this.auditedParam.status,
                    description: this.auditedParam.description,
                }).then((ret) => {
                    // 重置当前数据
                    this.addForm = false
                    this.$refs[form].resetFields();
                    console.log(this.auditedParam.status)
                    this.auditedRow.status = this.auditedParam.status;
                })
            })
        },

     // 修改信息
        editCert(index, row) {
            this.$router.push({
                name: 'finance-product-edit',
                params: {
                    id: row.id
                }
            })
        },
       // 查看管理员详情
        checkClerkDetail (index, row) {
            console.log(row);
            this.$router.push({
                name: 'review-CertForm-edit',
                params: {
                    id: row.id,
                    certInfo:row,
                }
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
            return reviewService.fetchCertList(this.fetchParam).then((ret) => {
                this.data = ret.data
                this.total = ret._exts.total
                this.loadingData = false
                xmview.setContentLoading(false)     
            })
        },
        // 通过/驳回
        agree(index, row,t) {
            console.log(row);
            console.log(t);
            let txt=t==2?'通过':'驳回'
            xmview.showDialog(`你将要${txt}审核 <span style="color:red">${row.user_name}</span> 的申请 确认吗?`, () => {
                t==2?this.fetchParam.status = 2:this.fetchParam.status = 3
                reviewService.agree({
                    id:row.id,
                    status:this.fetchParam.status
                }).then((ret) => {
                    t==2?row.status=2:row.status=3
                })
            })
        },
        // 单条删除
        del(index, row) {
            xmview.showDialog(`你将要删除申请 <span style="color:red">${row.user_name}</span>  此操作不可恢复确认吗?`, () => {
                reviewService.deleteCert(row.id).then(() => {
                    this.data.splice(index, 1)//删除选中项
                    row.deleted = 1
                    xmview.showTip('success', '操作成功')
                })
            })
        },
    }
}
</script>
