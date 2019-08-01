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
        }
    }
    .search {
        @extend %top-search-container;
    } 
   
}
</style>

<template>
    <article id="sys-index-container">
        <article class="search">
            <section>
                <i>手机号搜索</i>
                <el-input v-model="fetchParam.mobile" placeholder="请输入" @keyup.enter.native="fetchData"></el-input>
            </section>
        </article>
        <el-table class="data-table" v-loading="loadingData" :data="dataCache" :fit="true" border>
           
            <el-table-column min-width="200" prop="mobile" label="手机号">
            </el-table-column>
            <el-table-column min-width="100" prop="code" label="验证码">
            </el-table-column>
            <el-table-column min-width="200" prop="send_ip_string" label="IP">
            </el-table-column>
            <el-table-column min-width="100" label="是否使用">
                 <template scope="scope">
                     <span class="value">
                        <el-tag type="success" v-if="scope.row.used==1">已使用</el-tag>
                        <el-tag type="danger"  v-else-if="scope.row.used==0">未使用</el-tag>
                    </span>
                </template>
            </el-table-column>
            <el-table-column min-width="300" prop="recv_id" label="回执">
            </el-table-column>
            <el-table-column prop="usage" label="用途">
            </el-table-column>
            <el-table-column min-width="200" prop="addate" label="时间">
            </el-table-column>
        </el-table>

        <el-pagination class="pagin" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="fetchParam.page" :page-size="fetchParam.pagesize" :page-sizes="[15, 30, 60, 100]" layout="sizes,total, prev, pager, next" :total="total">
        </el-pagination>
    </article>
</template>

<script>
import sysService from '../../../services/sys/sysService'
import RolerSelect from '../../component/select/RolerSelect.vue'

function getFetchParam() {
    return {
        page: 1,
        pagesize: 15,
        mobile:''
    }
}

export default {
    components: {
        RolerSelect
    },
    data() {
        return {
            loadingData: false,
            dataCache:[],
            total: 0,
            fetchParam: getFetchParam()
        }
    },
    activated () {
        this.fetchData()
    },
    methods: {
        handleCurrentChange(val) {
                this.fetchParam.page = val
                this.fetchData()
        },
        handleSizeChange(val) {
            this.fetchParam.pagesize = val
            this.fetchData()
        },
        fetchData(val) {
            return sysService.getShortMessageLog(this.fetchParam).then((ret) => {
                this.dataCache = ret.data
                this.total = ret._exts.total
                this.loadingData = false
                xmview.setContentLoading(false)     
            })
        }
    }
}
</script>
