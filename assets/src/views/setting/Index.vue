<!--设置管理-->
<style lang='scss' rel='stylesheet/scss'>
@import "../../utils/mixins/common";
@import "../../utils/mixins/topSearch";

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
        <section class="manage-container">
            <el-button type="primary" icon="plus" @click="$router.push({ name:'setting-add',params:{sys_type:'add'}})">
                <i>添加设置</i>
            </el-button>
        </section>

        <article class="search">
            <section>
                <i>设置名称</i>
                <el-input v-model="fetchParam.category" placeholder="请输入设置名称" @keyup.enter.native="fetchData"></el-input>
            </section>
            <section>
                <i>字段名</i>
                <el-input v-model="fetchParam.field" placeholder="请输入字段名称" @keyup.enter.native="fetchData"></el-input>
            </section>

        </article>

        <el-table class="data-table" v-loading="loadingData" :data="dataCache" :fit="true" @select="selectRow" @select-all="selectRow" border>
            
            <!--<el-table-column type="selection"></el-table-column>-->
            <el-table-column min-width="100" prop="id" label="记录id" v-if="data">
            </el-table-column>
            <el-table-column min-width="100" prop="category" label="设置">
            </el-table-column>
            <el-table-column min-width="100" prop="usage" label="功能说明">
            </el-table-column>
            <el-table-column min-width="100" prop="field" label="字段名">
            </el-table-column>
            <el-table-column min-width="180" prop="val" label="字段值">
            </el-table-column>
            <el-table-column min-width="400" prop="describe" label="超长字段存储">
            </el-table-column>
            <el-table-column min-width="200" prop="addate" label="添加时间">
            </el-table-column>
            <el-table-column min-width="200" prop="update" label="更新时间">
            </el-table-column>
            <el-table-column fixed="right" width="200" label="操作">
                <template scope="scope">
                    <el-button @click="$router.push({name: 'setting-edit', params: {roleInfo: scope.row, sys_id: scope.row.id}})" type="text" size="small">详情
                    </el-button>
                    <el-button @click="$router.push({name: 'setting-edit', params: {roleInfo: scope.row, sys_id: scope.row.id, sys_type:'edit'}})" type="text" size="small">编辑
                    </el-button>
                    <el-button @click="del(scope.$index, scope.row)" type="text" size="small">删除</el-button>
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
import setService from '../../services/setting/setService.js'

function getFetchParam() {
    return {
        status: void 0, //  1-禁用 0-正常
        page: 1,
        pagesize: 15,
        id:void 0, 
        category:'' ,
        field:''
    }
}

export default {
   
    data() {
        return {
            loadingData: false,
            data: [], // 表格数据
            dataCache:[],
            total: 0,
            keyWord:'',
            dialogVisible: false,
            selectedIds: [], // 被选中的数据id集合
            fetchParam: getFetchParam(),
            dialogTree: {
                isShow: false,
                selectedId: void 0,
            }
        }
    },
    activated () {
        this.fetchData()
    },
    methods: {
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
            return setService.fetchData(this.fetchParam).then((ret) => {
                // console.log(ret.data)
                this.dataCache = ret.data
                this.total = ret._exts.total
                this.loadingData = false
                xmview.setContentLoading(false)     
            })
        },
        search(val){
               return setService.search(this.fetchParam).then((ret) => {
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
        // 单条删除
        del(index, row) {
            xmview.showDialog(`你将要删除设置 <span style="color:red">${row.category}</span>  此操作不可恢复确认吗?`, () => {
                setService.delete(row.id).then(() => {
                    this.dataCache.splice(index, 1)//删除选中项
                    row.deleted = 1
                    xmview.showTip('success', '操作成功')
                })
            })
        },
        // 批量删除
        delMulti() {
            xmview.showDialog(`你将要删除选中的项目，操作不可恢复确认吗?`, () => {
                setService.deleteMulty(this.selectedIds.join(',')).then(() => {
                    xmview.showTip('success', '操作成功')
                    this.dialogTree.isShow = false
                    setTimeout(() => {
                        this.fetchData() // 重新刷新数据
                    }, 300)
                })
            })
        },
    },
    computed: {
        tableData(){
            var arr = this.dataCache.filter(v=>{
                return v.describe.indexOf(this.keyWord)>=0
            })
            return arr
        }
    }
}
</script>
