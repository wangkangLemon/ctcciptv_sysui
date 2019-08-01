<!--优惠券管理-->
<style lang='scss' rel='stylesheet/scss'>
@import "../../../../utils/mixins/common";
@import "../../../../utils/mixins/topSearch";

#medical-index-container {
    @extend %content-container;
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
        <article class="search">
            <section>
                <i>订单编号</i>
                <el-input v-model="fetchParam.order_no" placeholder="请输入订单编号"   @keyup.enter.native="fetchData" ></el-input>
            </section>
            <section>
                <i>联系人</i>
                <el-input v-model="fetchParam.contact" placeholder="请输入联系人"   @keyup.enter.native="fetchData" ></el-input>
            </section>
            <section>
                <i>手机号</i>
                <el-input v-model="fetchParam.mobile" placeholder="请输入手机号"   @keyup.enter.native="fetchData" ></el-input>
            </section>
            <section>
                <i>订单状态</i>
                 <el-select v-model="fetchParam.status" placeholder="未选择" @change="fetchData">
                    <el-option label="全部" value="-1"></el-option>
                    <el-option label="咨询中" value="1"></el-option>
                    <el-option label="已发货" value="2"></el-option>
                </el-select>
            </section>
        </article>
        <el-table class="data-table" v-loading="loadingData" :data="data" :fit="true" border>
            <el-table-column min-width="230" prop="order_no" label="订单编号" v-if="data">
            </el-table-column>
            <el-table-column min-width="150" :show-overflow-tooltip="true" label="药品">
                <template scope="scope">
                    <p v-if="scope.row.industry_course" >{{ scope.row.industry_course&&scope.row.industry_course.industry_drug&&scope.row.industry_course.industry_drug.name||''}}</p>
                </template>
            </el-table-column>
            <el-table-column min-width="120" prop="contact" label="联系人" v-if="data">
            </el-table-column>
            <el-table-column min-width="140" prop="mobile" label="手机" v-if="data">
            </el-table-column>
            <el-table-column min-width="270" :show-overflow-tooltip="true" label="收货地址" v-if="data">
                <template scope="scope">
                    <p> {{  scope.row.province_name+scope.row.city_name+scope.row.area_name+scope.row.town_name+scope.row.address}}</p>
                </template>
            </el-table-column>
            <el-table-column min-width="110" prop="status" label="订单状态">
                <template scope="scope">
                    <el-tag type="warning" size="medium" v-if="scope.row.status=='1'">咨询中</el-tag>
                    <el-tag type="success"  size="medium" v-if="scope.row.status=='2'">已发货</el-tag>
                </template>
            </el-table-column>
            <el-table-column min-width="180" prop="addate" label="创建时间">
            </el-table-column>
            <el-table-column fixed="right" width="130" label="操作">
                <template scope="scope">
                    <el-button v-if="scope.row.status=='1'" type="text" size="small" @click="editCoupon(scope.$index, scope.row)">
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
        // 修改信息
        editCoupon(index, row) {
            console.log(row)
            this.$router.push({
                name: 'industry-order-edit',
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
            
            return industryService.fetchOrderList(obj).then((ret) => {
                this.data = ret.data
                this.total = ret._exts.total
                this.loadingData = false
                xmview.setContentLoading(false)     
            })
        },
        // 单条删除
        del(index, row) {
            xmview.showDialog(`你将要删除订单 <span style="color:red">${row.order_no}</span> 此操作不可恢复，确认吗?`, () => {
                industryService.deleteOrder(row.id).then(() => {
                    this.data.splice(index, 1)//删除选中项
                    row.status = 1
                    xmview.showTip('success', '操作成功')
                })
            })
        },
    },
}
</script>
