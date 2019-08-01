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
        <el-dialog class="show-detail" title="查看医院" v-model="showDetail">
            <!-- <div class="avatar">
                <img :src="{url:clerkDetail.avatar, sex: clerkDetail.sex} | defaultAvatar" />
            </div> -->
            <div class="info">
                <h2>{{clerkDetail.name}}</h2>
                <p>
                    <i class="title">状态：</i>
                    <span class="value">
                        <el-tag type="success" v-if="!clerkDetail.disabled">正常</el-tag>
                        <el-tag type="danger" v-else="clerkDetail.disabled">异常</el-tag>
                    </span>
                </p>
                <!--<p><i class="title">性别：</i> <span class="value">{{clerkDetail.sex ? '男' : '女'}}</span></p>-->
                <p><i class="title">注册时间：</i><span class="value">{{clerkDetail.addate}}</span></p>
            </div>
        </el-dialog>
         <!--添加/编辑表单-->
        <el-dialog v-model="addForm">
            <el-form :model="form" :rules="rules" ref="form">
    
                <el-form-item prop="name" label="医院名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" placeholder="请填写医院名称" auto-complete="off"></el-input>
                </el-form-item>
              
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addForm = false">取 消</el-button>
                <el-button type="primary" @click="submit('form')">确 定</el-button>
            </div>
        </el-dialog>
        <section class="manage-container">
            <!--<el-button type="primary" icon="plus" @click="$router.push({ name:'person-add',params:{sys_type:'add'}})">-->
            <el-button type="primary" icon="plus" @click="addAdmin">
                <i>添加医院</i>
            </el-button>
        </section>

        <article class="search">
            <section>
                <i>医院名称</i>
                <el-input v-model="fetchParam.name" placeholder="请输入医院名称"   @keyup.enter.native="fetchData" ></el-input>
            </section>
        </article>

        <el-table class="data-table" v-loading="loadingData" :data="data" :fit="true" @select="selectRow" @select-all="selectRow" border>
            
            <!--<el-table-column type="selection"></el-table-column> 左侧选择按钮-->

            <el-table-column min-width="520" prop="name" label="医院名称" v-if="data">
            </el-table-column>
            <!--<el-table-column min-width="200" prop="gov_name" label="部门">
            </el-table-column>
            <el-table-column min-width="170" prop="mobile" label="手机">
            </el-table-column>-->
            <el-table-column min-width="170" :formatter="Time" label="创建时间">
            </el-table-column>
           
            <el-table-column fixed="right" width="207" label="操作">
                <template scope="scope">
                    <!--<el-button @click="showFn(scope.$index, scope.row)" type="text" size="small">详情
                    </el-button>-->
                    <el-button type="text" size="small" @click="checkClerkDetail(scope.$index, scope.row)">
                           详情
                    </el-button>
                    <el-button type="text" size="small" @click="editUser(scope.$index, scope.row)">
                            修改
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
import expertsService from '../../../services/course/expertsService.js'
import Region from '../../component/select/Region.vue'

function getFetchParam() {
    return {
        status: void 0, //  1-禁用 0-正常
        page: 1,
        pagesize: 15,
        name,
}
}

export default {
    components: {
        Region
    },
    data() {
        let validateMobile = (rule, value, callback) => {
                if (!(value || '').match(/^1[3456789]\d{9}$/)) {
                    callback(new Error('请填写正确的手机号'))
                }
                callback()
            }
        return {
            roleTypes: [ // 管理员类型
                    {
                        name: '医院',
                        role_id: 1
                    },
                    {
                        name: '部门人员',
                        role_id: 0
                    }
                ],
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
                name: '',          // 医院名称
                mobile: '',        // 手机
                pass: '',          // 密码
                address: '',       // 地址
                sex: 0,            // 性别
                birthday: '',          // 生日
                addate: ''
            },
            form: {                // 添加表单属性值
                    name: '',          // 医院名称
                },
                rules: {
                    name: [
                        {required: true, message: '必须填写', trigger: 'blur'}
                    ],
                },
                addForm: false, // 表单弹窗是否显示
                formLabelWidth: '120px', // 表单label的宽度

        }
    },
    activated () {
        this.fetchData()
    },
    methods: {
        //添加人员
        addAdmin () {
            this.addForm = true
            },
        //添加人员提交
        submit (form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    // this.form.birthday = timeUtils.date2Str(this.form.birthday)
                    expertsService.createHospital(this.form).then((ret) => {
                        xmview.showTip('success', '添加成功')
                    }).then(() => {
                        this.addForm = false
                        this.initFetchParam()
                        this.page = 1
                    }).catch((ret) => {
                        xmview.showTip('error', ret.message)
                    })
                } else {
                    return false
                }
            })
        },

     // 修改人员信息
        editUser(index, row) {
            console.log(row)
            this.$router.push({
                name: 'course-manage-experts-hospital-edit',
                params: {
                    id: row.id
                }
            })
        },
       // 查看管理员详情
        checkClerkDetail (index, row) {
            this.showDetail = true
            expertsService.getHospitalInfo(row.id).then((ret) => {
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
   
            return expertsService.fetchHospitalData(this.fetchParam).then((ret) => {
                this.data = ret.data
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
                    expertsService.offline(row).then((ret) => {
                    })
                })
            }else{
                 xmview.showDialog(`医院 <span style="color:red">${row.name}</span> 已删除，无法禁用！`)
            }
        },
        // 启用
        online(index, row) {
            if(row.deleted == 0){
                xmview.showDialog(`你将要启用管理员<span style="color:red">${row.name}</span> 确认吗?`, () => {
                    row.disabled = 0
                    expertsService.online(row).then((ret) => {
                    })
                })
            }else{
                 xmview.showDialog(`医院 <span style="color:red">${row.name}</span> 已删除，无法启用！`)
            }
            
        },
        // 单条删除
        del(index, row) {
            xmview.showDialog(`你将要删除医院 <span style="color:red">${row.name}</span>  此操作不可恢复确认吗?`, () => {
                expertsService.deleteHospital(row.id).then(() => {
                    this.data.splice(index, 1)//删除选中项
                    row.deleted = 1
                    xmview.showTip('success', '操作成功')
                })
            })
        },
        // 批量删除
        delMulti() {
            xmview.showDialog(`你将要删除选中的项目，操作不可恢复确认吗?`, () => {
                expertsService.deleteMulty(this.selectedIds.join(',')).then(() => {
                    xmview.showTip('success', '操作成功')
                    this.dialogTree.isShow = false
                    setTimeout(() => {
                        this.fetchData()  // 重新刷新数据
                    }, 300)
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
