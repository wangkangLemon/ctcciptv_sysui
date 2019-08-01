<!--商品管理-->
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
        <el-dialog class="show-detail" title="查看商品" v-model="showDetail">
            <div class="info">
                <h2>{{clerkDetail.name}}</h2>
                <p><i class="title">商品名称：</i><span class="value">{{clerkDetail.name }}</span></p>
                <p><i class="title">标记：</i> 
                  <el-tag type="warning" size="medium" v-if="clerkDetail.mark=='fc'">虚拟币商品</el-tag>
                    <el-tag type="danger" size="medium" v-else-if="clerkDetail.mark=='vip'">会员商品</el-tag>
                    <el-tag type="primary" size="medium" v-else-if="clerkDetail.mark">{{clerkDetail.mark}}</el-tag>
                </p>
                <p><i class="title">价格(元)：</i> <span class="value">{{clerkDetail.price_yuan}}</span></p>
                <p><i class="title">商品简介：</i> <span class="value">{{clerkDetail.description}}</span></p>
                <p><i class="title">苹果原价商品id：</i> <span class="value">{{clerkDetail.appleid_origin}}</span></p>
                <p><i class="title">苹果折扣价商品id：</i><span class="value">{{clerkDetail.appleid_discount}}</span></p>
            </div>
        </el-dialog>
        <section class="manage-container">
            <!--<el-button type="primary" icon="plus" @click="$router.push({ name:'person-add',params:{sys_type:'add'}})">-->
            <el-button type="primary" icon="plus" @click="addProduct">
                <i>添加商品</i>
            </el-button>
        </section>

        <article class="search">
            <section>
                <i>商品名称</i>
                <el-input v-model="fetchParam.name" placeholder="请输入商品名称"   @keyup.enter.native="fetchData" ></el-input>
            </section>
        </article>

        <el-table class="data-table" v-loading="loadingData" :data="data" :fit="true" border>
            <el-table-column min-width="120" prop="name" label="商品名称" v-if="data">
            </el-table-column>
            <el-table-column min-width="100" prop="price_yuan" label="价格(元)">
            </el-table-column>
            <el-table-column min-width="70" prop="mark" label="标记">
                <template scope="scope">
                    <el-tag type="warning" size="medium" v-if="scope.row.mark=='fc'">虚拟币商品</el-tag>
                    <el-tag type="danger" size="medium" v-else-if="scope.row.mark=='vip'">会员商品</el-tag>
                    <el-tag type="primary" size="medium" v-else-if="scope.row.mark">{{scope.row.mark}}</el-tag>
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
                    <el-button type="text" size="small" @click="checkClerkDetail(scope.$index, scope.row)">
                           详情
                    </el-button>
                    <el-button type="text" size="small" @click="editProduct(scope.$index, scope.row)">
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

        }
    },
    activated () {//当页面进行缓存时调用此钩子函数
        this.fetchData()
    },
    methods: {
       
        //添加
        addProduct () {
            this.$router.push({
                name: 'finance-product-add',
            })
        },

     // 修改信息
        editProduct(index, row) {
            console.log(row)
            this.$router.push({
                name: 'finance-product-edit',
                params: {
                    id: row.id
                }
            })
        },
       // 查看管理员详情
        checkClerkDetail (index, row) {
            this.showDetail = true
            financeService.getProduct(row.id).then((ret) => {
            	console.log(ret)
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
            return financeService.fetchProductList(this.fetchParam).then((ret) => {
                this.data = ret.data
                this.total = ret._exts.total
                this.loadingData = false
                xmview.setContentLoading(false)     
            })
        },
        // 单条删除
        del(index, row) {
            xmview.showDialog(`你将要删除商品 <span style="color:red">${row.name}</span>  此操作不可恢复确认吗?`, () => {
                financeService.deleteProduct(row.id).then(() => {
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
