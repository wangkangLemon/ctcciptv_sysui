<!--部门人员管理-->
<style lang='scss' rel='stylesheet/scss'>
@import "../../../utils/mixins/common";
@import "../../../utils/mixins/topSearch";
@import "../../../utils/mixins/showDetail";

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
        <el-dialog class="show-detail" title="查看专家" v-model="showDetail">
            <div class="avatar">
                <img :src="{url:clerkDetail.image, sex: clerkDetail.sex} | defaultAvatar" />
            </div>
            <div class="info">
                <h2>{{clerkDetail.name}}</h2>
                <p><i class="title">所属医院：</i><span class="value">{{clerkDetail.hospital_name }}</span></p>
                <p><i class="title">职称：</i> <span class="value">{{clerkDetail.professor}}</span></p>
                <p>
                    <i class="title">状态：</i>
                    <span class="value">
                        <el-tag type="success" v-if="!clerkDetail.disabled">正常</el-tag>
                        <el-tag type="danger" v-else="clerkDetail.disabled">异常</el-tag>
                    </span>
                </p>
                <p><i class="title">性别：</i> <span class="value">{{clerkDetail.sex==1 ? '男' : '女'}}</span></p>
                <p><i class="title">科室：</i> <span class="value">{{clerkDetail.department}}</span></p>
                <p><i class="title">介绍：</i> <span class="value">{{clerkDetail.introduce}}</span></p>
                <p><i class="title">擅长领域：</i> <span class="value">{{clerkDetail.goodat}}</span></p>
                <p><i class="title">荣誉：</i> <span class="value">{{clerkDetail.honor}}</span></p>
                <p><i class="title">注册时间：</i><span class="value">{{clerkDetail.addate}}</span></p>
            </div>
        </el-dialog>
        <section class="manage-container">
            <!--<el-button type="primary" icon="plus" @click="$router.push({ name:'person-add',params:{sys_type:'add'}})">-->
            <el-button type="primary" icon="plus" @click="addAdmin">
                <i>添加专家</i>
            </el-button>
        </section>

        <article class="search">
            <section>
                <i>专家姓名</i>
                <el-input v-model="fetchParam.name" placeholder="请输入专家姓名"   @keyup.enter.native="fetchData" ></el-input>
            </section>
            <!--<section>
                <i>所属医院</i>
                <el-input v-model="fetchParam.hospital_id" placeholder="请输入所属医院"   @keyup.enter.native="fetchData" ></el-input>
            </section>-->
            <!--<section>
                <i>医院</i>
                <el-select clearable v-model="fetchParam.hospital_id" @change="fetchData">
                    <el-option label="全部" :value="-1"></el-option>
                    <el-option label="专家" value="1"></el-option>
                    <el-option label="部门人员" value="0"></el-option>
                </el-select>
            </section>-->
        </article>

        <el-table class="data-table" v-loading="loadingData" :data="data" :fit="true" @select="selectRow" @select-all="selectRow" border>
            
            <!--<el-table-column type="selection"></el-table-column> 左侧选择按钮-->

            <el-table-column min-width="120" prop="name" label="姓名" v-if="data">
            </el-table-column>
            <el-table-column min-width="200" prop="hospital_name" label="所属医院">
            </el-table-column>
            <el-table-column min-width="100" prop="professor" label="职称">
            </el-table-column>
            <el-table-column min-width="100" prop="department" label="科室">
            </el-table-column>
            <el-table-column min-width="170" :formatter="Time" label="创建时间">
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
                    <!--<el-button @click="showFn(scope.$index, scope.row)" type="text" size="small">详情
                    </el-button>-->
                    <el-button type="text" size="small" @click="checkClerkDetail(scope.$index, scope.row)">
                           详情
                    </el-button>
                    <el-button type="text" size="small" @click="editUser(scope.$index, scope.row)">
                            修改
                    </el-button>
                    <!--<el-button v-if="scope.row.disabled == 0" @click="offline(scope.$index, scope.row)" type="text" size="small">
                        <i>禁用</i>
                    </el-button>
                    <el-button v-else @click="online(scope.$index, scope.row)" type="text" size="small">
                        <i>启用</i>
                    </el-button>-->
                    <el-button @click="del(scope.$index, scope.row)" type="text" size="small">删除</el-button>
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
import expertsService from '../../../services/course/expertsService.js'
import DateRange from '../../component/form/DateRangePicker.vue'
import Region from '../../component/select/Region.vue'

function getFetchParam() {
    return {
        status: void 0, //  1-禁用 0-正常
        page: 1,
        pagesize: 15,
        name,
}
}

export default {
    components: {
        DateRange,
        Region
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
                name: '',          // 姓名
                professor: '',        // 职称
                pass: '',          // 科室
                address: '',       // 地址
                sex: 0,            // 性别
                birthday: '',          // 生日
                addate: ''
            },
                formLabelWidth: '120px', // 表单label的宽度

        }
    },
    activated () {
        this.fetchData()
    },
    methods: {
       
        //添加人员
        addAdmin () {
                    this.$router.push({
                        name: 'course-manage-experts-add',
                    })
            },
      

     // 修改人员信息
        editUser(index, row) {
            this.$router.push({
                name: 'course-manage-experts-edit',
                params: {
                    id: row.id
                }
            })
        },
       // 查看管理员详情
        checkClerkDetail (index, row) {
            this.showDetail = true
            expertsService.getExpertsInfo(row.id).then((ret) => {
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
            return expertsService.fetchExpertsData(this.fetchParam).then((ret) => {
                this.data = ret.data
                this.total = ret._exts.total
                this.loadingData = false
                xmview.setContentLoading(false)     
            })
        },
      
        // 单行被选中
        selectRow(selection) {
            let ret = []
            selection.forEach((item) => {
                ret.push(item.id)
            })
            this.selectedIds = ret
        },
        // 禁用
        offline(index, row) {
            if(row.deleted == 0){
                xmview.showDialog(`你将要禁用管理员 <span style="color:red">${row.name}</span> 确认吗?`, () => {
                    row.disabled = 1
                    expertsService.offline(row).then((ret) => {
                    })
                })
            }else{
                 xmview.showDialog(`专家 <span style="color:red">${row.name}</span> 已删除，无法禁用！`)
            }
        },
        // 启用
        online(index, row) {
            if(row.deleted == 0){
                xmview.showDialog(`你将要启用管理员<span style="color:red">${row.name}</span> 确认吗?`, () => {
                    row.disabled = 0
                    expertsService.online(row).then((ret) => {
                    })
                })
            }else{
                 xmview.showDialog(`专家 <span style="color:red">${row.name}</span> 已删除，无法启用！`)
            }
            
        },
        // 单条删除
        del(index, row) {
            xmview.showDialog(`你将要删除专家 <span style="color:red">${row.name}</span>  此操作不可恢复确认吗?`, () => {
                expertsService.deleteExperts(row.id).then(() => {
                    this.data.splice(index, 1)//删除选中项
                    row.deleted = 1
                    xmview.showTip('success', '操作成功')
                })
            })
        },
        // 批量删除
        delMulti() {
            xmview.showDialog(`你将要删除选中的项目，操作不可恢复确认吗?`, () => {
                expertsService.deleteMulty(this.selectedIds.join(',')).then(() => {
                    xmview.showTip('success', '操作成功')
                    this.dialogTree.isShow = false
                    setTimeout(() => {
                        this.fetchData()  // 重新刷新数据
                    }, 300)
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
    computed: {
        // timeFilter(row, column, cellValue){
        //      let arr = this.data.map(e=>{
        //          console.log(e)
        //        e.addate = e.addate.split(" ")[0]
        //     //    return v
        //     })
        //    return arr
        // },
        // tableData(){
        //     let arr = this.data.filter(v=>{
        //         return v.name.indexOf(this.name)>=0
        //     })
        //     return arr
        // }
    }
}
</script>
