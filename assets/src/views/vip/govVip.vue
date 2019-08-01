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
        <!--详情-->
        <el-dialog class="show-detail" title="订单详情" v-model="showDetail">
            <el-form :model="detail" :rules="rules" ref="form">
                <el-form-item prop="vip_cnt" label="会员人数" :label-width="formLabelWidth">
                    <el-input type="number" v-model="detail.vip_cnt" :min="0" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
             <div slot="footer" class="dialog-footer">
                <el-button @click="showDetail = false">取 消</el-button>
                <el-button type="primary" @click="submitVipCnt('form')">确 定</el-button>
            </div>
        </el-dialog>
                <section class="manage-container">
            <!--<el-button type="primary" icon="plus" @click="$router.push({ name:'person-add',params:{sys_type:'add'}})">-->
            <el-button type="primary" icon="plus" @click="$router.push({ name:'vip-pay'})">
                <i>充值</i>
            </el-button>
        </section>
        <article class="search">
            <Region :province="fetchParam.provinceSelect" :city="fetchParam.citySelect" :area="fetchParam.areaSelect" :town="fetchParam.townSelect"
                :village="fetchParam.villageSelect" title="部门" v-on:provinceChange="val => {fetchParam.provinceSelect = val;finallyVal = val}"
                v-on:cityChange="val => {fetchParam.citySelect = val;finallyVal = val}" v-on:areaChange="val => {fetchParam.areaSelect = val;finallyVal = val}"
                v-on:townChange="val => {fetchParam.townSelect = val;finallyVal = val}" v-on:villageChange="val => {fetchParam.villageSelect = val;finallyVal = val}"
                :change="fetchData">
            </Region>
            <DateRange title="到期时间" :start="fetchParam.stime" :end="fetchParam.etime" @changeStart="val=> fetchParam.stime=val "
                @changeEnd="val=> fetchParam.etime=val" :change="fetchData">
            </DateRange>
        </article>

        <el-table class="data-table" v-loading="loadingData" :data="data" :fit="true" border>
        	 <el-table-column min-width="120" prop="parent_gov_name" label="上级部门" v-if="data">
            </el-table-column>
             <el-table-column min-width="120" prop="gov_name" label="部门名称" v-if="data">
            </el-table-column>
            <el-table-column min-width="120" prop="vip_cnt" label="会员人数" v-if="data">
            </el-table-column>
            <el-table-column min-width="120" prop="expired_date" label="到期时间" v-if="data">
            </el-table-column> 
             <el-table-column min-width="120" prop="admin_name" label="充值管理员" v-if="data">
            </el-table-column>   
            <el-table-column fixed="right" width="150" label="操作">
                <template scope="scope">
                    <el-button type="text" size="small" @click="editkDetail(scope.$index, scope.row)">
                        编辑 
                    </el-button>
                    <el-button type="text" size="small" @click="pay(scope.$index, scope.row)">
                        充值
                    </el-button>
                    <!-- <el-button @click="del(scope.$index, scope.row)" type="text" size="small">删除</el-button> -->
                </template>
            </el-table-column>
        </el-table>

        <el-pagination class="pagin" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="fetchParam.page" :page-size="fetchParam.pagesize" :page-sizes="[15, 30, 60, 100]" layout="sizes,total, prev, pager, next" :total="total">
        </el-pagination>
    </article>
</template>

<script>
import vipService from '../../services/vipService'
import DateRange from '../component/form/DateRangePicker.vue'
import Region from '../component/select/Region.vue'

function getFetchParam() {
    return {
        status: void 0, //  1-禁用 0-正常
        page: 1,
        pagesize: 15,
        mobile:void 0,
        gov_id:void 0,
        stime:void 0,
        etime:void 0
    }
}

export default {
    components: {
        DateRange,Region
    },
    data() {
        return {
            loadingData: false,
            data: [], // 表格数据
            total: 0,
            name:'',
            dialogVisible: false,
            fetchParam: getFetchParam(),
            showDetail: false,     // 是否显示详情对话框
            // 查看管理员详情
            formLabelWidth: '120px', // 表单label的宽度
            detail: {
                vip_cnt: void 0,          // 姓名
            },
            rules: {
                vip_cnt: [{
                    required: true,
                    message: '必须填写'
                }],
            }, 
        }
    },
    activated () {
        this.fetchData()
    },
    methods: {
       // 查看管理员详情
        editkDetail (index, row) {
            row.vip_cnt=null
            this.showDetail = true
            this.detail = row
        },
        // 单条删除
        del(index, row) {
            xmview.showDialog(`你将要删除会员 <span style="color:red">${row.user_name}</span>,  此操作不可恢复确认吗?`, () => {
                vipService.deleteGovVip(row.id).then(() => {
                    this.data.splice(index, 1) //删除选中项
                    row.deleted = 1
                    xmview.showTip('success', '操作成功')
                })
            })
        },
        submitVipCnt(form){
            this.$refs[form].validate((valid) => {
                if (!valid) return
                vipService.editGovVip({
                    id:this.detail.id,
                    vip_cnt:this.detail.vip_cnt,
                }).then((ret) => {
                    console.log(ret,11111111)
                    this.showDetail = false
                    this.$refs[form].resetFields()
                })
            })
        },
         pay(index, row){
            console.log(row)
            xmview.showDialog(`你将要充值<span style="color:red">${row.gov_name}</span> 部门会员 ,  此操作不可恢复确认吗?`, () => {
                vipService.payGovVip(row.gov_id).then(() => {
                    xmview.showTip('success', '操作成功')
                    this.fetchData()
                    
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
             let flag = false
                let index
                let arr = ['provinceSelect', 'citySelect', 'areaSelect', 'townSelect', 'villageSelect']
                arr.forEach((v,i) => {
                    if (flag) {
                        this.fetchParam[v] = null
                    }
                    if (this.fetchParam[v] == this.finallyVal) {
                        flag = true
                        index = i
                    }
                })
                
                if(index>0){
                    if(val){
                        // this.fetchParam.gov_id = this.fetchParam[arr[index-1]]
                        this.fetchParam.gov_id = this.fetchParam[arr[index-1]];
                    }else{
                        this.fetchParam.gov_id = this.fetchParam[arr[index]];
                    }
                    
                }else{
                    this.fetchParam.gov_id = this.finallyVal
                }
                if (!this.fetchParam.provinceSelect && !this.fetchParam.citySelect && !this.fetchParam.areaSelect && !
                    this.fetchParam.townSelect && !this.fetchParam.villageSelect) {
                    this.fetchParam.gov_id = -1
                } 
            let obj = Object.assign({},this.fetchParam)
            console.log(obj.status);
            if(obj.status === undefined){
                obj.status = -1
            }
            vipService.getGovViplists(obj).then((ret) => {
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
