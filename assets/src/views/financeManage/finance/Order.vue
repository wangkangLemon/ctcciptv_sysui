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
    .show-detail {
        width:100%;
        .info{
            h2{
               word-wrap: break-word; 
            }
            p{
                .value{
                    word-wrap: break-word;
                }
            }
        }
    }

    .search {
        @extend %top-search-container;
    } // 底部的管理按钮
    .bottom-manage {
        margin-top: 15px;
    }
}
</style>

<template>
    <article id="medical-index-container">
        <!--详情-->
        <el-dialog class="show-detail" title="订单详情" v-model="showDetail">
            <div class="info" v-if="detail != null">
                <p>
                    <i class="title">订单号：</i>
                    <span class="value">{{detail.order_no}}</span>
                </p>
                <p>
                    <i class="title">商品名称：</i>
                    <span class="value">{{detail.product_name}}</span>
                </p>
                <p>
                    <i class="title">价格：</i>
                    <span class="value">{{detail.price_yuan}} 元</span>
                </p>
                <p>
                    <i class="title">实付金额：</i>
                    <span class="value">{{detail.pay_price_yuan}}  元</span>
                </p>
                <p>
                    <i class="title">提交订单用户：</i>
                    <span class="value">{{detail.user_name}}</span>
                </p>
                <p><i class="title">手机号：</i> <span class="value">{{detail.user_mobile}}</span></p>
                <p>
                    <i class="title">下单时间：</i>
                    <span class="value">{{detail.addate}}</span>
                </p>
                <p>
                    <i class="title">支付时间：</i>
                    <span class="value">{{detail.paydate}}</span>
                </p>
                <p>
                    <i class="title">支付方式：</i>
                    <span class="value">{{payMethods[detail.pay_channel]}}</span>
                </p>
                <p>
                    <i class="title">支付状态：</i>
                    <span class="value">{{payStatus[detail.status]}}</span>
                </p>
                <p class="select remark">
                    <i class="title">备注：</i>
                    <span class="value">
                        <el-input type="textarea" :rows="3" v-model="detail.describe"></el-input>
                    </span>
                </p>
            </div>
        </el-dialog>

        <article class="search">
            <section>
                <i>订单标号</i>
                <el-input v-model="fetchParam.order_no" placeholder="请输入订单标号"   @keyup.enter.native="fetchData" ></el-input>
            </section>
            <DateRange title="支付时间" :start="fetchParam.stime" :end="fetchParam.etime" @changeStart="val=> fetchParam.stime=val "
                @changeEnd="val=> fetchParam.etime=val" :change="fetchData">
            </DateRange>
            <section>
                <i>状态</i>
                <el-select v-model="fetchParam.status" placeholder="未选择" @change="fetchData" :clearable="true">
                    <el-option label="全部" value="-1"></el-option>
                    <el-option label="未支付 " value="1"></el-option>
                    <el-option label="支付成功" value="2"></el-option>
                    <el-option label="支付失败" value="3"></el-option>
                    <el-option label="过期" value="4"></el-option>
                </el-select>
            </section>
        </article>

        <el-table class="data-table" v-loading="loadingData" :data="data" :fit="true" border>
            <el-table-column min-width="180" prop="order_no" label="订单标号" v-if="data">
            </el-table-column>
               <el-table-column min-width="100" prop="product_name" label="商品名称" v-if="data">
            </el-table-column>
            <el-table-column min-width="100" prop="price_yuan" label="价格(元)" v-if="data">
            </el-table-column>  
            <el-table-column min-width="120" prop="pay_price_yuan" label="实付金额(元)" v-if="data">
            </el-table-column> 
            <el-table-column min-width="100" prop="user_name" label="下单用户" v-if="data">
            </el-table-column>
            <el-table-column min-width="130" prop="user_mobile" label="手机号" v-if="data">
            </el-table-column>
            <el-table-column min-width="100" prop="pay_channel" label="支付方式">
                 <template scope="scope">
                    {{payMethods[scope.row.pay_channel]}}
                </template>
            </el-table-column>
             <el-table-column min-width="100" prop="status" label="订单状态">
                <template scope="scope">
                    {{payStatus[scope.row.status]}}
                </template>
            </el-table-column>
            <el-table-column min-width="180" prop="addate" label="下单时间">
            </el-table-column>
            <el-table-column min-width="180" prop="paydate" label="支付时间">
            </el-table-column>
           
            <el-table-column fixed="right" width="150" label="操作">
                <template scope="scope">
                    <el-button type="text" size="small" @click="checkClerkDetail(scope.$index, scope.row)">
                           查看订单
                    </el-button>
                    <!-- <el-button @click="del(scope.$index, scope.row)" type="text" size="small">删除</el-button> -->
                </template>
            </el-table-column>
        </el-table>

        <!--底部的page -->
        <el-pagination class="pagin" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="fetchParam.page" :page-size="fetchParam.pagesize" :page-sizes="[15, 30, 60, 100]" layout="sizes,total, prev, pager, next" :total="total">
        </el-pagination>
    </article>
</template>

<script>
import financeService from '../../../services/finance/financeService'
import DateRange from '../../component/form/DateRangePicker.vue'

function getFetchParam() {
    return {
        status: void 0, //  1-禁用 0-正常
        page: 1,
        pagesize: 15,
        id:void 0,
        order_no:'',
        user_mobile: void 0,
        user_id: void 0,
        product_id: void -1,
    }
}

export default {
    components: {
        DateRange
    },
    data() {
        return {
            payMethods: ['', '微信','支付宝', '苹果支付'] ,
            payStatus: ['','未支付', '支付成功', '支付失败','过期'],
            init:false,
            loadingData: false,
            data: [], // 表格数据
            dataCache:[],
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
            detail: {
                name: '',          // 姓名
                mobile: '',        // 手机
                pass: '',          // 密码
                address: '',       // 地址
                sex: 0,            // 性别
                birthday: '',          // 生日
                addate: ''
            },
            imagesList:[],
            category_list:[]
        }
    },
    activated () {
        this.fetchData()
    },
    methods: {
            //拿到部门组
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据返回建议列表的数据
                cb(results);
            },
       // 查看管理员详情
        checkClerkDetail (index, row) {
            this.showDetail = true
            if(row){
                this.detail = row
            }else{
                financeService.getOrder(row.id).then((ret) => {
                    this.detail = ret
                    this.imagesList=ret.images.split(',')
                })
            }
        },
        // 单条删除
        del(index, row) {
            xmview.showDialog(`你将要删除第 <span style="color:red">${row.id}</span> 条订单：${row.order_no},  此操作不可恢复确认吗?`, () => {
                financeService.deleteOrder(row.id).then(() => {
                    this.data.splice(index, 1) //删除选中项
                    row.deleted = 1
                    xmview.showTip('success', '操作成功')
                })
            })
        },
        userInfo () {
            return authUtils.getUserInfo()
        },
        initFetchParam() {
            this.fetchParam = getFetchParam()
        },
        handleCurrentChange(val) {
            // if(this.init){                 //init是true进来 限制fetchData初始化不请求
                this.fetchParam.page = val
                this.fetchData()
            // }else{
            //     this.init = true
            // }
        },
        handleSizeChange( val) {
            this.fetchParam.pagesize = val
            this.fetchData()
        },
        fetchData(val) {
            this.loadingData = true
            let obj = Object.assign({},this.fetchParam)
            if(obj.status === undefined||!obj.status){
                obj.status = -1
            }
            financeService.getOrderlists(obj).then((ret) => {
                this.data = ret.data
                this.loadingData = false
                this.total = ret._exts.total
                xmview.setContentLoading(false)     
            })
            setTimeout(() => {
                this.loadingData = false
            }, 1000);
        },
    
    },
}
</script>
