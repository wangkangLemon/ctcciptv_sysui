<!--部门人员管理-->
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
                <i>手机号</i>
                <el-input v-model="fetchParam.mobile" placeholder="请输入用户手机号码"   @keyup.enter.native="fetchData" ></el-input>
            </section>
            <DateRange title="到期时间" :start="fetchParam.stime" :end="fetchParam.etime" @changeStart="val=> fetchParam.stime=val"
                @changeEnd="val=> fetchParam.etime=val" :change="fetchData">
            </DateRange>
        </article>

        <el-table class="data-table" v-loading="loadingData" :data="data" :fit="true" border>
            <el-table-column min-width="100" prop="user_name" label="vip用户" v-if="data">
            </el-table-column>
            <el-table-column min-width="130" prop="mobile" label="手机号" v-if="data">
            </el-table-column>
            <el-table-column min-width="100" prop="province_name" label="省" v-if="data">
            </el-table-column>
            <el-table-column min-width="100" prop="city_name" label="市" v-if="data">
            </el-table-column>
            <el-table-column min-width="100" prop="area_name" label="区（县）" v-if="data">
            </el-table-column>
            <el-table-column min-width="100" prop="town_name" label="镇（乡）" v-if="data">
            </el-table-column>
            <el-table-column min-width="100" prop="village_name" label="村" v-if="data">
            </el-table-column>
            <el-table-column min-width="100" prop="attributes" label="会员属性" v-if="data">
                <template scope="scope">
                    {{attr[scope.row.attributes]}}
                </template>
            </el-table-column>
            <el-table-column min-width="180" prop="regdate" label="注册时间" v-if="data">
            </el-table-column>  
            <el-table-column min-width="180" prop="expired_date" label="到期时间" v-if="data">
            </el-table-column>  
            <!-- <el-table-column fixed="right" width="150" label="操作">
                <template scope="scope">
                    <el-button @click="del(scope.$index, scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column> -->
        </el-table>

        <el-pagination class="pagin" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="fetchParam.page" :page-size="fetchParam.pagesize" :page-sizes="[15, 30, 60, 100]" layout="sizes,total, prev, pager, next" :total="total">
        </el-pagination>
    </article>
</template>

<script>
import vipService from '../../services/vipService'
import DateRange from '../component/form/DateRangePicker.vue'

function getFetchParam() {
    return {
        status: void 0, //  1-禁用 0-正常
        page: 1,
        pagesize: 15,
        gov_name:void 0,
        attributes:'',
        stime:void 0,
        etime:void 0
    }
}

export default {
    components: {
        DateRange
    },
    data() {
        return {
            attr: ['','购买会员', '第一次试用会员', '第二次试用会员'],
            loadingData: false,
            data: [], // 表格数据
            total: 0,
            name:'',
            dialogVisible: false,
            selectedIds: [], // 被选中的数据id集合
            fetchParam: getFetchParam(),
        }
    },
    activated () {
        this.fetchData()
    },
    methods: {
        // 单条删除
        del(index, row) {
            xmview.showDialog(`你将要删除会员 <span style="color:red">${row.user_name}</span>,  此操作不可恢复确认吗?`, () => {
                vipService.deleteVip(row.id).then(() => {
                    this.data.splice(index, 1) //删除选中项
                    row.deleted = 1
                    xmview.showTip('success', '操作成功')
                })
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
            this.loadingData = true
            let obj = Object.assign({},this.fetchParam)
            console.log(obj.status);
            if(obj.status === undefined){
                obj.status = -1
            }
            vipService.getViplists(obj).then((ret) => {
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
