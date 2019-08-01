<!--部门人员管理-->
<style lang='scss' rel='stylesheet/scss'>
@import "../../utils/mixins/common";
@import "../../utils/mixins/topSearch";

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
        <section class="manage-container">
            <el-button type="primary" icon="plus" @click="$router.push({ name:'live-add'})">
                <i>添加直播</i>
            </el-button>
        </section>
        <article class="search">
            <section>
                <i>直播名称</i>
                <el-input v-model="fetchParam.title" placeholder="请输入直播名称"   @keyup.enter.native="fetchData" ></el-input>
            </section>
            <DateRange title="直播时间" :start="fetchParam.starttime" :end="fetchParam.endtime" @changeStart="val=> fetchParam.starttime=val "
                @changeEnd="val=> fetchParam.endtime=val" :change="fetchData">
            </DateRange>
        </article>
        <el-table class="data-table" v-loading="loadingData" :data="data" :fit="true" border>
             <el-table-column min-width="120" prop="title" label="直播标题" v-if="data">
            </el-table-column>
            <!-- <el-table-column min-width="120" prop="num" label="观看/评论" v-if="data">
            </el-table-column> -->
            <el-table-column min-width="120" label="关联商品" v-if="data">
                 <template scope="scope">
                     <!-- {{scope.row.product_id!==0}} -->
                    <p  v-if="scope.row.product||scope.row.product_id===0"> {{ scope.row.product_id!==0?scope.row.product.name:"免费直播"}}</p>
                </template>
            </el-table-column>
            <el-table-column min-width="120" label="专家" v-if="data">
                 <template scope="scope">
                    <p  v-if="scope.row.experts"> {{ scope.row.experts.name }}</p>
                </template>
            </el-table-column> 
             <el-table-column min-width="120" prop="startdate" label="直播开始时间" v-if="data">
            </el-table-column>   
             <el-table-column min-width="120" prop="enddate" label="直播结束时间" v-if="data">
            </el-table-column>   
            <el-table-column fixed="right" width="150" label="操作">
                <template scope="scope">
                    <el-button type="text" size="small" @click="$router.push({name: 'live-edit',params: {liveInfo: scope.row, id: scope.row.id}})">
                        编辑 
                    </el-button>
                    <el-button type="text" size="small" @click="$router.push({name: 'live-comment',params: {commtInfo: scope.row, id: scope.row.id}})">
                        评论
                    </el-button>
                    <el-button @click="del(scope.$index, scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination class="pagin" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="fetchParam.page" :page-size="fetchParam.pagesize" :page-sizes="[15, 30, 60, 100]" layout="sizes,total, prev, pager, next" :total="total">
        </el-pagination>
    </article>
</template>

<script>
import liveService from '../../services/liveService.js'
import DateRange from '../component/form/DateRangePicker.vue'

function getFetchParam() {
    return {
        page: 1,
        pagesize: 15,
    }
}

export default {
    components: {
        DateRange
    },
    data() {
        return {
            loadingData: false,
            data: [], // 表格数据
            total: 0,
            name:'',
            dialogVisible: false,
            fetchParam: getFetchParam(),
            // 查看管理员详情
            formLabelWidth: '120px', // 表单label的宽度
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
        // 单条删除
        del(index, row) {
            console.log(row);
            xmview.showDialog(`你将要删除直播 <span style="color:red">${row.title}</span>,  此操作不可恢复确认吗?`, () => {
                liveService.deleteLive(row.id).then(() => {
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
            // if(obj.status === undefined){
            //     obj.status = -1
            // }
            liveService.getLivelists(obj).then((ret) => {
                this.data = ret.data
                console.log(this.data);
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
