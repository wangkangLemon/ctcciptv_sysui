<!--节点管理-->
<style lang='scss' rel='stylesheet/scss'>
@import "../../../utils/mixins/common";
@import "../../../utils/mixins/topSearch";

#sys-index-container {
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
            title{
               word-wrap: break-word; 
            }
            p{
                span.value{
                    word-wrap: break-word;
                }
            }
        }
        .info{
            width: 80%;
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
    <article id="sys-index-container">
        <!--详情-->
        <el-dialog class="show-detail" title="查看操作日志请求数据" v-model="showDetail">
            <div class="info">
                <p><i class="title">请求数据：</i><span class="value">{{clerkDetail.request}}</span></p>
                <!-- <p>
                    <i class="title">状态：</i>
                    <span class="value">
                        <el-tag type="success" v-if="!clerkDetail.disabled">正常</el-tag>
                        <el-tag type="danger" v-else="clerkDetail.disabled">异常</el-tag>
                    </span>
                </p> -->
                <!-- <p><i class="title">注册时间：</i><span class="value">{{clerkDetail.addate}}</span></p> -->
            </div>
        </el-dialog>
        <article class="search">
            <section>
                <i>操作链接地址</i>
                <el-input v-model="fetchParam.uri" placeholder="请输入" @keyup.enter.native="fetchData"></el-input>
            </section>
            <section>
                <i>姓名</i>
                <RolerSelect  :change="fetchData" v-model="fetchParam.role_id" :placeholder="fetchParam.name"
                                v-on:change="val=>fetchParam.role_id=val" :list="changelist">
                </RolerSelect>
            </section>
        </article>

        <el-table class="data-table" v-loading="loadingData" :data="dataCache" :fit="true" @select="selectRow" @select-all="selectRow" border>
            <!--<el-table-column type="selection"></el-table-column>-->
            <el-table-column min-width="100" prop="id" label="ID" v-if="data">
            </el-table-column>
            <el-table-column min-width="200" prop="role_name" label="姓名">
            </el-table-column>
            <el-table-column min-width="200" prop="uri" label="链接地址">
            </el-table-column>
            <el-table-column min-width="200" prop="update" label="更新时间">
            </el-table-column>
            <el-table-column fixed="right" width="100" label="操作">
                <template scope="scope">
                    <el-button type="text" size="small" @click="checkClerkDetail(scope.$index, scope.row)">
                           详情
                    </el-button>
                    <!-- <el-button @click="$router.push({name: 'node-edit', params: {roleInfo: scope.row, sys_id: scope.row.id, sys_type:'edit'}})" type="text" size="small">编辑
                    </el-button>
                    <el-button @click="del(scope.$index, scope.row)" type="text" size="small">删除</el-button> -->

                </template>
            </el-table-column>
        </el-table>

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
import sysService from '../../../services/sys/sysService'
import RolerSelect from '../../component/select/RolerSelect.vue'

function getFetchParam() {
    return {
        page: 1,
        pagesize: 15,
        role_id: void 0, //管理员id
        uri:'', //操作uri
        name:''
    }
}

export default {
    components: {
        RolerSelect
    },
    data() {
        return {
            loadingData: false,
            data: [], // 表格数据
            dataCache:[],
            total: 0,
            keyWord:'',
            selectedIds: [], // 被选中的数据id集合
            fetchParam: getFetchParam(),
            dialogTree: {
                isShow: false,
                selectedId: void 0,
            },
            showDetail: false,     // 是否显示详情对话框
            clerkDetail:{},
            changelist:{}
        }
    },
    activated () {
        this.fetchData()
        this.fetchRoler()
    },
    methods: {
        fetchRoler (val, length) {
                return sysService.fetchData({
                    role_id: val,
                    category: this.type,
                    pagesize: this.pageSize,
                    page: parseInt(length / this.pageSize) + 1
                }).then((ret) => {
                    this.changelist=ret
                    console.log(this.changelist)
                    return ret
                })
            },
        // 查看管理员详情
        checkClerkDetail (index, row) {
            this.showDetail = true
            this.clerkDetail = row
            // this.clerkDetail.request = row.split(',')
            // console.log(this.clerkDetail.request)
            
        },
        userInfo () {
            return authUtils.getUserInfo()
        },
        initFetchParam() {
            this.fetchParam = getFetchParam()
        },
        handleCurrentChange(val) {
                this.fetchParam.page = val
                this.fetchData()
        },
        handleSizeChange(val) {
            this.fetchParam.pagesize = val
            this.fetchData()
        },
        fetchData(val) {
            return sysService.getOperationLog(this.fetchParam).then((ret) => {
                this.dataCache = ret.data
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
    },
    computed: {
        tableData(){
            var arr = this.dataCache.filter(v=>{
                return v.node_name.indexOf(this.keyWord)>=0
            })
            return arr
        }
    }
}
</script>
