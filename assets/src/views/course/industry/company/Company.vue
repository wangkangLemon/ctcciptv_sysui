<!--优惠券管理-->
<style lang='scss' rel='stylesheet/scss'>
@import "../../../../utils/mixins/common";
@import "../../../../utils/mixins/topSearch";

#medical-index-container {
    @extend %content-container;
    .search {
        @extend %top-search-container;
    } 
    .manage-container {
        @extend %right-top-btnContainer;
    }
    // 底部的管理按钮
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
        <article class="search">
            <section>
                <i>公司名称</i>
                <el-input v-model="fetchParam.name" placeholder="请输入公司名称"   @keyup.enter.native="fetchData" ></el-input>
            </section>
            
        </article>
        <section class="manage-container">
            <!--<el-button type="primary" icon="plus" @click="$router.push({ name:'person-add',params:{sys_type:'add'}})">-->
            <el-button type="primary" icon="plus" @click="addCompany">
                <i>添加工业公司</i>
            </el-button>
        </section>
        <el-table class="data-table" v-loading="loadingData" :data="data" :fit="true" border>
            <el-table-column min-width="230" prop="name" label="公司名称" v-if="data">
            </el-table-column>
            <el-table-column min-width="230" prop="bonus_limit_yuan" label="红包限额(元)" v-if="data">
            </el-table-column>
            <el-table-column min-width="180" prop="addate" label="创建时间">
            </el-table-column>
            <el-table-column fixed="right" width="130" label="操作">
                <template scope="scope">
                    <el-button type="text" size="small" @click="editCoupon(scope.$index, scope.row)">修改
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

function getFetchParam() {
    return {
        page: 1,
        pagesize: 15,
        address:'',
        status:'',
    }
}

export default {
    data() {
        return {
            loadingData: false,
            data: [], // 表格数据
            total: 0,
            name:'',
            fetchParam: getFetchParam(),
        }
    },
    activated () {
        this.fetchData()
    },
    methods: {
        //添加
        addCompany () {
            this.$router.push({
                name: 'industry-company-add',
            })
        },

        // 修改信息
        editCoupon(index, row) {
            console.log(row)
            this.$router.push({
                name: 'industry-company-add',
                params: {
                    id: row.id
                }
            })
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
            console.log('this.fetchParam.status',this.fetchParam.status);
            let obj = Object.assign({},this.fetchParam)
            console.log('obj',obj);
            
            if(obj.status === ''||!obj.status){
                console.log(111111111);
                
                obj.status = -1
            }
            console.log(obj);
            
            return industryService.fetchCompanyList(obj).then((ret) => {
                this.data = ret.data
                this.total = ret._exts.total
                this.loadingData = false
                xmview.setContentLoading(false)     
            })
        },
        // 单条删除
        del(index, row) {
            xmview.showDialog(`你将要删除工业公司 <span style="color:red">${row.name}</span> 此操作不可恢复，确认吗?`, () => {
                industryService.deleteCompany(row.id).then(() => {
                    this.data.splice(index, 1)//删除选中项
                    row.status = 1
                    xmview.showTip('success', '操作成功')
                })
            })
        },
    },
}
</script>
