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
        <!--添加/编辑表单-->
        <el-dialog v-model="addForm">
            <el-form :model="form" :rules="rules" ref="form" :label-width="formLabelWidth">
               <el-form-item label="评论" prop="content">
                    <el-input v-model="form.content" type="textarea" :autosize="{ minRows: 3, maxRows: 7}"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addForm = false">取 消</el-button>
                <el-button type="primary" @click="submit('form')" :disabled="isDisable">确 定</el-button>
            </div>
        </el-dialog>
        <section class="manage-container">
            <el-button type="primary" icon="plus" @click="addAdmin">
                <i>添加评论</i>
            </el-button>
        </section>
        <article class="search">
            <!-- <section>
                <i>状态</i>
                <el-select v-model="fetchParam.status" placeholder="未选择" @change="fetchData" :clearable="true">
                    <el-option label="全部" value="-1"></el-option>
                    <el-option label="新发布" value="0"></el-option>
                    <el-option label="已审核 " value="1"></el-option>
                    <el-option label="审核失败 " value="2"></el-option>
                </el-select>
            </section>  -->
            <DateRange title="评论时间" :start="fetchParam.stime" :end="fetchParam.etime" @changeStart="val=> fetchParam.stime=val "
                @changeEnd="val=> fetchParam.etime=val" :change="fetchData">
            </DateRange>
        </article>
        <el-table class="data-table" v-loading="loadingData" :data="data" :fit="true" border>
             <el-table-column min-width="200" prop="content" label="评论" v-if="data">
            </el-table-column>
             <el-table-column min-width="80" prop="user_name" label="评论者" v-if="data">
            </el-table-column> 
            <el-table-column min-width="80" prop="mobile" label="手机号" v-if="data">
            </el-table-column>    
            <el-table-column min-width="100" prop="addate" label="评论时间" v-if="data">
            </el-table-column>  
            <el-table-column width="100" label="状态">
                <template scope="scope">
                    <el-tag v-if="scope.row.status == 0" type="warning">新发布</el-tag>
                    <el-tag v-else-if="scope.row.status == 1" type="success">已审核</el-tag>
                    <el-tag v-else>审核失败</el-tag>
                </template>
            </el-table-column>
            <el-table-column fixed="right" width="180" label="操作">
                <template scope="scope">
                    <el-button type="text" size="small" @click="$router.push({name: 'live-comment-edit',params: {commtInfo: scope.row, id: scope.row.id}})">
                        编辑 
                    </el-button>
                    <!-- <el-button @click="agree(scope.$index, scope.row,2)" type="text" size="small">
                        <i>通过</i>
                    </el-button> -->
                    <!-- 驳回暂时去掉 -->
                    <!-- <el-button  v-if="scope.row.status == 1"  @click="agree(scope.$index, scope.row,3)" type="text" size="small">
                        <i>驳回</i>
                    </el-button> -->
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
        id:void 0,
        status: void 0, //  1-禁用 0-正常
        page: 1,
        live_id:void 0,
        pagesize: 15,
        stime:void 0,
        etime:void 0
    }
}

export default {
    name: 'live-comment',
    components: {
        DateRange
    },
    data() {
        return {
            isDisable:false,
            loadingData: false,
            data: [], // 表格数据
            total: 0,
            name:'',
            dialogVisible: false,
            fetchParam: getFetchParam(),
            form: clearFormFn(),
            // 查看管理员详情
            formLabelWidth: '120px', // 表单label的宽度
            rules: {
                content: [ {required: true, message: '必须输入', trigger: 'blur'},
                        ,{
                            pattern:  /\S$/,
                            message: '请输入非空格或非特殊字符的内容'
                        }],
            }, 
            addForm: false, // 表单弹窗是否显示
            livename:''
        }
    },
    created () {
        if(this.$route.params.commtInfo){
            xmview.setContentTile(`评论查询-${this.$route.params.commtInfo.title}`)
        }
        this.fetchParam.live_id=this.$route.params.id
        this.fetchData()
         xmview.setContentLoading(false)  
    },
    methods: {
         // 通过/驳回
        agree(index, row,t) {
            console.log(row);
            console.log(t);
            let txt=t==2?'通过':'驳回'
            let obj=Object.assign({},this.fetchParam)
            xmview.showDialog(`你将要${txt}此条评论 确认吗?`, () => {
                t==2?obj.status = 2:obj.status = 3
                liveService.agreeCommt({
                    id:row.id,
                    status:obj.status
                }).then((ret) => {
                    t==2?row.status=2:row.status=3
                })
            })
        },
        addAdmin () {
            this.form = clearFormFn()
            this.addForm = true
            },
        // 单条删除
        del(index, row) {
            console.log(row)
            xmview.showDialog(`你将要删除评论 <span style="color:red">${row.content}</span>,  此操作不可恢复确认吗?`, () => {
                liveService.deleteCommt(row.id).then(() => {
                    this.data.splice(index, 1) //删除选中项
                    row.deleted = 1
                    xmview.showTip('success', '操作成功')
                })
            })
        },
        //添加人员提交
            submit (form) {
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        this.isDisable = true
                        liveService.createCommt(this.form,this.$route.params.id).then((ret) => {
                            xmview.showTip('success', '添加成功')
                        }).then(() => {
                            this.isDisable = false
                            this.addForm = false
                            this.fetchData()
                            this.page = 1
                        })
                    } else {
                        return false
                    }
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
            if(obj.status === undefined){
                obj.status = -1
            }
            liveService.getCommtlists(obj).then((ret) => {
                console.log(ret.data);
                this.data = ret.data
                this.livename=ret.data[0].live_name
                xmview.setContentTile(`评论查询-${this.livename}`)
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
 function clearFormFn() {
    return  {                // 表单属性值
            content: '',        //评论内容
        }
    }
</script>
