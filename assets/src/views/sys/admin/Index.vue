<!--公开课管理-->
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
            <el-button type="primary" icon="plus" @click="$router.push({ name:'sys-add',params:{sys_type:'add'}})">
                <i>添加管理员</i>
            </el-button>
        </section>

        <article class="search">
            <section>
                <i>管理员姓名</i>
                <el-input v-model="fetchParam.name" @keyup.enter.native="fetchData" placeholder="请输入姓名"></el-input>
            </section>

        </article>

        <el-table class="data-table" v-loading="loadingData" :data="data" :fit="true" @select="selectRow" @select-all="selectRow" border>
            
            <!--<el-table-column type="selection"></el-table-column>-->
            <el-table-column min-width="100" prop="name" label="姓名" v-if="data">
            </el-table-column>
            <el-table-column min-width="130" prop="role_name" label="角色">
            </el-table-column>
            <el-table-column min-width="130" prop="mobile" label="手机">
            </el-table-column>
            <el-table-column min-width="200" prop="email" label="邮箱">
            </el-table-column>
            <el-table-column width="100" label="状态">
                <template scope="scope">
                    <el-tag v-if="scope.row.deleted == 1">已删除</el-tag>
                    <el-tag v-else-if="scope.row.deleted == 0&&scope.row.disabled == 0" type="success">正常</el-tag>
                    <el-tag v-else>禁用</el-tag>
                </template>
            </el-table-column>
            <el-table-column min-width="200" prop="addate" label="添加时间">
            </el-table-column>
            <el-table-column min-width="200" prop="update" label="更新时间">
            </el-table-column>
            <el-table-column fixed="right" width="207" label="操作">
                <template scope="scope">
                    <!--<el-button @click="preview(scope.$index, scope.row)" type="text" size="small">预览</el-button>-->
                    <el-button @click="$router.push({name: 'sys-edit', params: {sysInfo: scope.row, sys_id: scope.row.id}})" type="text" size="small">详情
                        <!--a-->
                    </el-button>
                    <el-button @click="$router.push({name: 'sys-edit', params: {sysInfo: scope.row, sys_id: scope.row.id, sys_type:'edit'}})" type="text" size="small">编辑
                        <!--a-->
                    </el-button>
                    <el-button v-if="scope.row.disabled == 0" @click="offline(scope.$index, scope.row)" type="text" size="small">
                        <i>禁用</i>
                    </el-button>
                    <el-button v-else @click="online(scope.$index, scope.row)" type="text" size="small">
                        <i>启用</i>
                    </el-button>
                    <el-button @click="del(scope.$index, scope.row)" type="text" size="small">删除</el-button>

                </template>
            </el-table-column>
        </el-table>

        <!--底部的page -->
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
import sysService from '../../../services/sys/sysService.js'

function getFetchParam() {
    return {
        status: void 0, //  1-禁用 0-正常
        page: 1,
        pagesize: 15,
        disabled:0,
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
            console.log(`当前页= ${val}`);
                this.fetchParam.page = val
                this.fetchData()
        },
        handleSizeChange( val) {
            // console.log( this.fetchParam.pagesize )
            // console.log(`每页 ${val} 条`);
            this.fetchParam.pagesize = val
            this.fetchData()
        },
        fetchData(val) {
            
            return sysService.fetchData(this.fetchParam).then((ret) => {
                this.data = ret.data
                console.log(ret)
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
        // 禁用
        offline(index, row) {
            if(row.deleted == 0){
                xmview.showDialog(`你将要禁用管理员 <span style="color:red">${row.name}</span> 确认吗?`, () => {
                    row.disabled = 1
                    row.password=''
                    sysService.offline(row).then((ret) => {

                    })
                })
            }else{
                 xmview.showDialog(`管理员 <span style="color:red">${row.name}</span> 已删除，无法禁用！`)
            }
        },
        // 启用
        online(index, row) {
            if(row.deleted == 0){
                xmview.showDialog(`你将要启用管理员<span style="color:red">${row.name}</span> 确认吗?`, () => {
                    sysService.online(row.id).then((ret) => {
                        row.disabled = 0
                    })
                })
            }else{
                 xmview.showDialog(`管理员 <span style="color:red">${row.name}</span> 已删除，无法启用！`)
            }
            
        },
        // 单条删除
        del(index, row) {
            xmview.showDialog(`你将要删除管理员 <span style="color:red">${row.name}</span>  此操作不可恢复确认吗?`, () => {
                sysService.delete(row.id).then(() => {
                    this.dataCache.splice(index, 1)//删除选中项
                    row.deleted = 1
                    xmview.showTip('success', '操作成功')
                })
            })
        },
        // 批量删除
        delMulti() {
            xmview.showDialog(`你将要删除选中的项目，操作不可恢复确认吗?`, () => {
                sysService.deleteMulty(this.selectedIds.join(',')).then(() => {
                    xmview.showTip('success', '操作成功')
                    this.dialogTree.isShow = false
                    setTimeout(() => {
                        this.fetchData()  // 重新刷新数据
                    }, 300)
                })
            })
        },
        filterTag(value,row){
            console.log(value);
            console.log(row);
            return 
        }
    }
}
</script>
