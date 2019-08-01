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
    .nourl{
        font-size: 12px;
    }
    .show-detail {
        width:100%;
        .info{
            title{
               word-wrap: break-word; 
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
    .collection {
        align-items: center;
        min-height: 36px;
        border-radius: 4px;
        padding: 3px 30px 3px 10px;
        border: 1px solid #bfcbd9;
    }
}
</style>

<template>
    <article id="medical-index-container">
        <!--详情-->
        <el-dialog class="show-detail" title="查看消息跳转地址" v-model="showDetail">
            <div class="info">
                <p>{{clerkDetail.url?clerkDetail.url:'暂无'}}</p>
            </div>
        </el-dialog>
         <!--添加/编辑表单-->

        <section class="manage-container">
            <!--<el-button type="primary" icon="plus" @click="$router.push({ name:'person-add',params:{sys_type:'add'}})">-->
            <el-button type="primary" icon="plus" @click="addAdmin">
                <i>添加消息</i>
            </el-button>
        </section>
        <article class="search">
            <section>
                <i>标题</i>
                <el-input v-model="fetchParam.title" placeholder="请输入消息标题" @keyup.enter.native="fetchData" ></el-input>
            </section>
            <section>
                <DateRange title="发送时间" :start="fetchParam.stime " :end="fetchParam.etime" @changeStart="val=> fetchParam.stime =val"
                    @changeEnd="val=> fetchParam.etime=val" :change="fetchData">
                </DateRange>
            </section>
            <section>
                <i>状态</i>
                <el-select v-model="fetchParam.status" placeholder="未选择" @change="fetchData">
                    <el-option label="全部" :value="-1"></el-option>
                    <el-option label="待发送" value="1"></el-option>
                    <el-option label="已发送" value="2"></el-option>
                    <el-option label="发送中" value="3"></el-option>
                    <el-option label="发送失败" value="4"></el-option>
                </el-select>
            </section>
            <!-- <section>
                <i>消息类型</i>
                <el-select v-model="fetchParam.type" placeholder="未选择" @change="fetchData">
                    <el-option label="全部" :value="'-1'"></el-option>
                    <el-option label="地址" :value="'url'"></el-option>
                    <el-option label="课程" :value="'course'"></el-option>
                    <el-option label="任务" :value="'task'"></el-option>
                </el-select>
            </section> -->
        </article>

        <el-table class="data-table" v-loading="loadingData" :data="data" :fit="true"  border>
            <!--<el-table-column type="selection"></el-table-column> 左侧选择按钮-->
            <el-table-column min-width="250" :show-overflow-tooltip="true" prop="title" label="标题	" v-if="data">
            </el-table-column>
            <el-table-column min-width="100" :show-overflow-tooltip="true" prop="receive_type" label="类型">
                 <template scope="scope">
                    <p>
                        <el-tag type="primary"  v-if="scope.row.receive_type">{{receiveType[scope.row.receive_type]}}</el-tag>
                        <el-tag type="warning"  v-if="scope.row.msg_type">{{msgType[scope.row.msg_type]}}</el-tag>
                    </p>
                </template>
            </el-table-column>
            <el-table-column width="100" label="状态">
                <template scope="scope">
                    <el-tag v-if="scope.row.status == 1" type="warning">待发送</el-tag>
                    <el-tag v-if="scope.row.status == 2" type="success">已发送</el-tag>
                    <el-tag v-if="scope.row.status == 3" type="danger">发送中 </el-tag>
                    <el-tag v-if="scope.row.status == 4" type="gray">发送失败</el-tag>
                </template>
            </el-table-column>
            <el-table-column min-width="80" prop="admin_name" label="发布者">
            </el-table-column>
            <el-table-column min-width="170" prop="senddate" label="发送时间">
            </el-table-column>
            <el-table-column fixed="right" width="160" label="操作">
                <template scope="scope">
                    <el-button  @click="look(scope.$index, scope.row)" type="text" size="small"> 详情</el-button>
                    <el-button  v-if="scope.row.status==1" @click="edit(scope.$index, scope.row)" type="text" size="small"> 修改</el-button>
                    <el-button  v-if="scope.row.status==1" @click="del(scope.$index, scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--底部的page -->
        <el-pagination class="pagin" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="fetchParam.page" :page-size="fetchParam.pagesize" :page-sizes="[15, 30, 60, 100]" layout="sizes,total, prev, pager, next" :total="total">
        </el-pagination>
    </article>
</template>

<script>
import sysService from '../../../services/sys/sysService'
import DateRange from '../../component/form/DateRangePicker.vue'



function getFetchParam() { //列表数据
    return {
        status: -1, //  1-禁用 0-正常
        page: 1,
        pagesize: 15,
        title:'',
        stime:'',
        etime:'',
        // type:'-1',
    }
}

export default {
    components: {
        DateRange
    },
    data() {

        return {
            // selectData:[],
            receiveType:['','政府','个人'],
            msgType:['','通知','课程','直播'],
            loadingData: false,
            data: [], // 表格数据
            total: 0,
            name:'',
            fetchParam: getFetchParam(),
            // govparam:clearGovParam() ,
            // form: clearForm(),
            addForm: false, // 表单弹窗是否显示
            formLabelWidth: '120px', // 表单label的宽度
            showDetail: false,     // 是否显示详情url
            clerkDetail:{},
            mark:{
                type:'gov',
                name:'name',
                changeOnSelect:true
            },
            pushTypeDialog: { //发布对象数据模型
                fetchParam: {
                    gov_id: '',
                    gov_ids: '',
                    name: '',
                    noself: 1,
                    mobile:'',
                },
                title: '',
                isSearch: '',
                type: '',
                showDialog: false,
                selectedData: {
                    2: [],
                    1: []
                },
                data: [],
                page: 1,
                pagesize: 15,
                total: 0,
            },
        }
    },
    watch:{
        'form.biz_id'(){
            console.log('this.form.biz_id',typeof(this.form.biz_id),this.form.biz_id);
        }
        
    },
    activated () {
        this.fetchData()
    },
    methods: {
 
        // 查看管理员详情
        urlDetail (index, row) {
            this.showDetail = true
            this.clerkDetail = row
        },
        //添加人员
        addAdmin () {
            this.$router.push({
                name: 'message-add',
            })

            },
                  // 查看信息
        look(index, row) {
            this.$router.push({
                name: 'message-edit',
                params: {
                    id: row.id,
                    look:1
                }
            })
        },
        // 修改信息
        edit(index, row) {
            this.$router.push({
                name: 'message-edit',
                params: {
                    id: row.id,
                }
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
            return sysService.messageList(this.fetchParam).then((ret) => {
                this.data = ret.data
                this.total = ret._exts.total
                this.loadingData = false
                xmview.setContentLoading(false)     
            })
        },
        // 禁用
        offline(index, row) {
            if(row.deleted == 0){
                xmview.showDialog(`你将要禁用管理员 <span style="color:red">${row.name}</span> 确认吗?`, () => {
                    row.disabled = 1
                    sysService.offline(row).then((ret) => {
                    })
                })
            }else{
                 xmview.showDialog(`消息 <span style="color:red">${row.name}</span> 已删除，无法禁用！`)
            }
        },
        // 启用
        online(index, row) {
            if(row.deleted == 0){
                xmview.showDialog(`你将要启用消息<span style="color:red">${row.name}</span> 确认吗?`, () => {
                    row.disabled = 0
                    expertsService.online(row).then((ret) => {
                    })
                })
            }else{
                 xmview.showDialog(`消息 <span style="color:red">${row.name}</span> 已删除，无法启用！`)
            }
            
        },
        // 单条删除
        del(index, row) {
            xmview.showDialog(`你将要删除消息 <span style="color:red">${row.title}</span>  此操作不可恢复确认吗?`, () => {
                sysService.messageDel(row.id).then(() => {
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
}
</script>
