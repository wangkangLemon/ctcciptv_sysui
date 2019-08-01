<!--优惠券管理-->
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
        <el-dialog class="show-detail" title="查看优惠券" v-model="showDetail">
            <div class="info">
                <h2>{{clerkDetail.name}}</h2>
                <p><i class="title">商品名称</i><span class="value">{{clerkDetail.product_name }}</span></p>
                <p><i class="title">用户</i><span class="value">{{clerkDetail.mark }}</span></p>
                <!-- <p><i class="title">标记：</i> 
                    <el-tag type="warning" size="medium" v-if="clerkDetail.mark=='vip_discount'">vip打折</el-tag>
                    <el-tag type="primary" size="medium" v-if="clerkDetail.mark=='vip_original'">vip原价</el-tag>
                </p> -->
                <p><i class="title">价格(元)：</i> <span class="value">{{clerkDetail.price_yuan}}</span></p>
                <p><i class="title">优惠券简介：</i> <span class="value">{{clerkDetail.description}}</span></p>
                <p><i class="title">优惠券简介：</i> <span class="value">{{clerkDetail.description}}</span></p>
                <p><i class="title">苹果原价优惠券id：</i> <span class="value">{{clerkDetail.appleid_origin}}</span></p>
                <p><i class="title">苹果折扣价优惠券id：</i><span class="value">{{clerkDetail.appleid_discount}}</span></p>
            </div>
        </el-dialog>
        <section class="manage-container">
            <!--<el-button type="primary" icon="plus" @click="$router.push({ name:'person-add',params:{sys_type:'add'}})">-->
            <el-button type="primary" icon="plus" @click="addCoupon">
                <i>添加优惠券</i>
            </el-button>
        </section>

        <article class="search">
            <section>
                <i>商品名称</i>
                <Product v-model="fetchParam.product_id" :placeholder="fetchParam.product_name" ref="Product"
                        v-on:change="val=>fetchParam.product_id=val" :change="reqFun2" :list="changelistc">
                </Product>
            </section>
            <section>
                <i>使用状态</i>
                 <el-select v-model="fetchParam.used" placeholder="未选择" @change="fetchData">
                    <el-option label="全部" value="-1"></el-option>
                    <el-option label="未使用" value="0"></el-option>
                    <el-option label="已使用" value="1"></el-option>
                </el-select>
            </section>
        </article>
        <el-table class="data-table" v-loading="loadingData" :data="data" :fit="true" border>
            <el-table-column min-width="120" prop="product_name" label="商品名称" v-if="data">
            </el-table-column>
            <el-table-column min-width="100" prop="user_id" label="用户">
                <template scope="scope">
                    <p> {{ scope.row.user_id!==0?scope.row.user_name:"全部用户"}}</p>
                </template>
            </el-table-column>
            <el-table-column min-width="70" prop="type_term" label="期限类型">
                <template scope="scope">
                    <el-tag type="warning" size="medium" v-if="scope.row.type_term=='1'">长期</el-tag>
                    <el-tag type="primary" size="medium" v-if="scope.row.type_term=='2'">一次性</el-tag>
                </template>
            </el-table-column>
            <el-table-column min-width="70" prop="discount_type" label="优惠类型">
                <template scope="scope">
                    <el-tag type="warning" size="medium" v-if="scope.row.discount_type=='1'">打折{{scope.row.value}}%</el-tag>
                    <el-tag type="primary" size="medium" v-if="scope.row.discount_type=='2'">代金券{{Number(scope.row.value)/100}}元</el-tag>
                </template>
            </el-table-column>
            <el-table-column min-width="70" prop="used" label="使用状态">
                <template scope="scope">
                    <el-tag type="success" size="medium" v-if="scope.row.used=='0'">未使用</el-tag>
                    <el-tag  size="medium" v-if="scope.row.used=='1'">已使用</el-tag>
                </template>
            </el-table-column>
            <el-table-column min-width="150" prop="addate" label="创建时间">
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
                    <el-button type="text" size="small" @click="editCoupon(scope.$index, scope.row)">
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
import financeService from '../../../../services/finance/financeService'
import Product from '../../../component/select/CommonSelect.vue'

function getFetchParam() {
    return {
        page: 1,
        pagesize: 15,
        used:void 0,
        product_id:void 0,
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
         //商品搜索
            reqFun2(val, length){
                let param={
                    page: parseInt(length / 15) + 1||1,
                    pagesize: 15,
                    name:val,
                }
                let _this=this
                console.log(this.fetchParam.product_id);
                this.fetchData(this.fetchParam.product_id)
                return financeService.fetchProductList(param)
                .then((ret)=>{
                        _this.$emit('changelistc', ret.data)
                    return ret
                })
            },
        //添加
        addCoupon () {
            this.$router.push({
                name: 'finance-coupon-add',
            })
        },

     // 修改信息
        editCoupon(index, row) {
            console.log(row)
            this.$router.push({
                name: 'finance-coupon-edit',
                params: {
                    id: row.id
                }
            })
        },
       // 查看管理员详情
        checkClerkDetail (index, row) {
            this.showDetail = true
            financeService.getCoupon(row.id).then((ret) => {
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
            console.log(this.fetchParam.used);
            let obj = Object.assign({},this.fetchParam)
            if(obj.used === undefined){
                obj.used = -1
            }
            return financeService.fetchCouponList(obj).then((ret) => {
                this.data = ret.data
                this.total = ret._exts.total
                this.loadingData = false
                xmview.setContentLoading(false)     
            })
        },
        // 单条删除
        del(index, row) {
            xmview.showDialog(`你将要删除商品 <span style="color:red">${row.product_name}</span> 的优惠券此操作不可恢复，确认吗?`, () => {
                financeService.deleteCoupon(row.id).then(() => {
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
