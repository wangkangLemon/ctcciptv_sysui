<!--药品管理-->
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
        <section class="manage-container">
            <!--<el-button type="primary" icon="plus" @click="$router.push({ name:'person-add',params:{sys_type:'add'}})">-->
            <el-button type="primary" icon="plus" @click="addDrug">
                <i>添加药品</i>
            </el-button>
        </section>

        <article class="search">
            <section>
                <i>药品名称</i>
                <el-input v-model="fetchParam.name" placeholder="请输入药品名称"   @keyup.enter.native="fetchData" ></el-input>
            </section>
        </article>

        <el-table class="data-table" v-loading="loadingData" :data="data" :fit="true" border>
            <el-table-column min-width="120" prop="name" label="药品名称" v-if="data">
            </el-table-column>
            <el-table-column min-width="100" label="价格(元)">
                 <template scope="scope">
                    {{Number(scope.row.price)/100}}
                    <span v-if="scope.row.unit">/ {{scope.row.unit}}</span>
                </template>
            </el-table-column>
            <el-table-column :show-overflow-tooltip="true" min-width="150" prop="summary" label="简介">
            </el-table-column>
            <el-table-column min-width="120" prop="addate" label="创建时间">
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
                    <el-button type="text" size="small" @click="editDrug(scope.$index, scope.row)">
                            修改
                    </el-button>
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
import industryService from '../../../../services/course/industryService.js'
import DateRange from '../../../component/form/DateRangePicker.vue'
import Region from '../../../component/select/Region.vue'

function getFetchParam() {
    return {
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
                formLabelWidth: '120px', // 表单label的宽度

        }
    },
    activated () {
        this.fetchData()
    },
    methods: {
       
        //添加
        addDrug () {
            this.$router.push({
                name: 'industry-product-add',
            })
        },

     // 修改信息
        editDrug(index, row) {
            console.log(row)
            this.$router.push({
                name: 'industry-product-edit',
                params: {
                    id: row.id
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
            return industryService.fetchDrugList(this.fetchParam).then((ret) => {
                this.data = ret.data
                this.total = ret._exts.total
                this.loadingData = false
                xmview.setContentLoading(false)     
            })
        },
        // 单条删除
        del(index, row) {
            xmview.showDialog(`你将要删除药品 <span style="color:red">${row.name}</span>  此操作不可恢复确认吗?`, () => {
                industryService.deleteDrug(row.id).then(() => {
                    this.data.splice(index, 1)//删除选中项
                    row.deleted = 1
                    xmview.showTip('success', '操作成功')
                })
            })
        },
    },
}
</script>
