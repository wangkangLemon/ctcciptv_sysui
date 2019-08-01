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
        <el-dialog class="show-detail" title="查看推送跳转地址" v-model="showDetail">
            <div class="info">
                <p>{{clerkDetail.url?clerkDetail.url:'暂无'}}</p>
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
         <!--添加/编辑表单-->
        
        <el-dialog v-model="addForm">
            <el-form :model="form" :rules="rules" ref="form" :label-width="formLabelWidth">
                <el-form-item prop="title" label="推送标题">
                    <el-input v-model="form.title" placeholder="请填写推送标题" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="发布对象">
                    <el-select clearable v-model="form.type" @change="choosePushType" placeholder="请选择指定人员或部门">
                        <el-option label="全部" :value="3"></el-option>
                        <el-option label="部门任务" :value="1"></el-option>
                        <el-option label="个人任务" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    :label="pushTypeDialog.title"
                    v-if="form.type!=3 && form.type==pushTypeDialog.type">
                    <div class="collection" @click="openPushTypeDialog">
                        <el-tag
                            class="u-course-tag"
                            v-for="item in pushTypeDialog.selectedData[this.pushTypeDialog.type]"
                            :key="item.id">
                            {{item.name}}
                        </el-tag>
                    </div>
                </el-form-item>
                 <el-form-item label="下发部门" prop="gov_id">
                      <!--用v-if全部  v-else gov选择组件-->
                        <el-checkbox v-model="govparam.checked" v-if="!govparam.provinceSelect">全部</el-checkbox>
                         <Region :province="govparam.provinceSelect" 
                                :city="govparam.citySelect" 
                                :area="govparam.areaSelect" 
                                :town="govparam.townSelect"
                                :village="govparam.villageSelect" title="" 
                                v-on:provinceChange="val => {govparam.provinceSelect = val;finallyVal = val}"
                                v-on:cityChange="val => {govparam.citySelect = val;finallyVal = val}" 
                                v-on:areaChange="val => {govparam.areaSelect = val;finallyVal = val}"
                                v-on:townChange="val => {govparam.townSelect = val;finallyVal = val}" 
                                v-on:villageChange="val => {govparam.villageSelect = val;finallyVal = val}"
                                :change="changeR">
                        </Region>
                        <!-- <Course-category-select :placeholder="govparam.name" :autoClear="true" :mark = this.mark :showNotCat="false" v-model="govparam.id" :req="req">
                        </Course-category-select> -->
                </el-form-item>
                 <el-form-item prop="sendtime" label="发送时间" >
                    <el-date-picker v-model="form.sendtime" type="datetime" placeholder="发送日期"
                                    :picker-options="pickerOptionsed"/>
                </el-form-item>
                <el-form-item label="推送类型" prop="type">
                    <el-radio-group v-model="form.type">
                        <el-radio :label="'url'">网址</el-radio>
                        <el-radio :label="'course'">课程</el-radio>
                        <el-radio :label="'call'">通知</el-radio>
                        <!-- <el-radio :label="'task'">任务</el-radio> -->
                    </el-radio-group>
                </el-form-item>
                <el-form-item prop="url" label="推送地址" v-if="form.type=='url'||form.type=='course'">
                    <el-input v-model="form.url" placeholder="请填写推送地址" auto-complete="off"></el-input>
                </el-form-item>
                <!-- <el-form-item prop="content" label="推送内容">
                    <el-input v-model="form.content" type="textarea" :autosize="{ minRows: 3, maxRows: 7}" placeholder="请填写推送内容"></el-input>
                </el-form-item> -->
                <el-form-item prop="content" label="推送内容" id="editor" :label-width="formLabelWidth">
                    <vue-editor v-model="form.content" @ready="ueReady"></vue-editor>
                </el-form-item>
                
                <el-form-item prop="biz_id" label="推送课程" v-if="form.type=='course'">
                     <Course v-model="form.biz_id" :placeholder="form.course_name" ref="Course"
                            v-on:change="val=>form.biz_id=val" :change="reqFun2" :itemObj="['contentid','course_name']" :list="changelistc">
                    </Course>
                </el-form-item>
                <el-form-item prop="biz_id" label="推送任务" v-if="form.type=='task'">
                    <el-input v-model="form.url" placeholder="请填写推送任务" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addForm = false">取 消</el-button>
                <el-button type="primary" @click="submit('form')">确 定</el-button>
            </div>
        </el-dialog>

         <!-- 发布对象弹窗 -->
        <el-dialog
            :title="pushTypeDialog.title"
            :visible.sync="pushTypeDialog.showDialog"
            v-if="pushTypeDialog.showDialog">
            <template v-if="pushTypeDialog.isSearch">
                <section class="search">
                    <section>
                        <!-- <i>部门</i> -->
                        <!-- <DepSelect v-model="pushTypeDialog.fetchParam.gov_id" :change="getPushTypeData"></DepSelect> --> 
                        <i>手机号</i>
                        <el-input v-model="pushTypeDialog.fetchParam.mobile" placeholder="请输入手机号" @keyup.enter.native="getPushTypeData" ></el-input>
                        <i>姓名</i>
                        <el-input v-model="pushTypeDialog.fetchParam.name" placeholder="请输入手机号" @keyup.enter.native="getPushTypeData" ></el-input>
                    </section>
                </section>
            </template>
            <Transfer placeholder="搜索"
                      @searchFn="(val)=>{pushTypeDialog.page=1;pushTypeDialog.fetchParam.name=val;fetchPushTypeData();}"
                      @moreFn="()=>{pushTypeDialog.page++;fetchPushTypeData('no-clear');}"
                      :total="pushTypeDialog.total"
                      :data="pushTypeDialog.data"
                      :selectedValue='selectData'
                      v-model="pushTypeDialog.selectedData[pushTypeDialog.type]"></Transfer>
            <span slot="footer" class="dialog-footer" >
                <el-button @click="pushTypeDialog.showDialog = false">取 消</el-button>
                <el-button type="primary" @click="transferConfirmFn">确 定</el-button>
            </span>
        </el-dialog>
        <section class="manage-container">
            <!--<el-button type="primary" icon="plus" @click="$router.push({ name:'person-add',params:{sys_type:'add'}})">-->
            <el-button type="primary" icon="plus" @click="addAdmin">
                <i>推送</i>
            </el-button>
        </section>
        <article class="search">
            <section>
                <i>推送标题</i>
                <el-input v-model="fetchParam.title" placeholder="请输入推送标题" @keyup.enter.native="fetchData" ></el-input>
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
                    <el-option label="未发送" value="0"></el-option>
                    <el-option label="发送中  " value="1"></el-option>
                    <el-option label="已发送" value="2"></el-option>
                    <el-option label="发送失败" value="3"></el-option>
                </el-select>
            </section>
            <!-- <section>
                <i>推送类型</i>
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
            <el-table-column min-width="200" :show-overflow-tooltip="true" prop="title" label="标题	" v-if="data">
            </el-table-column>
            <el-table-column min-width="300" :show-overflow-tooltip="true" prop="content" label="内容">
            </el-table-column>
            <el-table-column min-width="200" :show-overflow-tooltip="true" prop="type" label="推送类型">
                 <template scope="scope">
                    <p v-if="scope.row.type == 'url'">
                        <el-tag type="primary">地址</el-tag>
                        <el-button v-if="scope.row.url" @click="urlDetail(scope.$index, scope.row)" type="text" size="small">详情</el-button>
                        <span class="nourl" v-else>暂无地址</span>
                    </p>
                    <p v-if="scope.row.type == 'course'">
                        <el-tag type="warning">课程</el-tag>
                        <span class="nourl" >{{scope.row.biz_name}}</span>
                    </p>
                    <p v-if="scope.row.type == 'task'">
                        <el-tag type="Danger">任务</el-tag>
                        <span class="nourl" >{{scope.row.biz_name}}</span>
                    </p>
                </template>
            </el-table-column>
            <el-table-column min-width="100" prop="gov_name" label="下发部门">
            </el-table-column>
            <el-table-column min-width="80" prop="admin_name" label="发布者">
            </el-table-column>
            <el-table-column width="100" label="状态">
                        <template scope="scope">
                            <el-tag v-if="scope.row.status == 2" type="success">已发送</el-tag>
                            <el-tag v-if="scope.row.status == 1" type="warning">发送中</el-tag>
                            <el-tag v-if="scope.row.status == 0" type="gray">未发送</el-tag>
                            <el-tag v-if="scope.row.status == 3" type="danger">发送失败 </el-tag>
                        </template>
                    </el-table-column>
            <el-table-column min-width="170" prop="senddate" label="发送时间">
            </el-table-column>
            <el-table-column fixed="right" width="80" label="操作">
                <template scope="scope">
                    <el-button  v-show="scope.row.status==0" @click="del(scope.$index, scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--底部的page -->
        <el-pagination class="pagin" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="fetchParam.page" :page-size="fetchParam.pagesize" :page-sizes="[15, 30, 60, 100]" layout="sizes,total, prev, pager, next" :total="total">
        </el-pagination>
    </article>
</template>

<script>
import sysService from '../../services/sys/sysService'
import courseService from "../../services/course/courseService.js"
import govService from "../../services/gov/govService.js"
import userService from '../../services/gov/userService.js'
import DateRange from '../component/form/DateRangePicker.vue'
import Course from '../component/select/CommonSelect.vue'
import CourseCategorySelect from '../component/select/MultCategory'
import Region from '../component/select/Region.vue'
import { time2String } from '../../utils/timeUtils.js'
import VueEditor from '../component/form/UEditor.vue'
import Transfer from '../component/dialog/Transfer.vue'
import DepSelect from '../component/select/DepartmentNoself.vue'

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
function clearForm() { //添加
    return {
        type: 'url',
        title: '',
        content: '',
        url:'',
        biz_id:'',
        gov_id:void 0,
        sendtime:'',
    }
}
function clearGovParam() { //添加
    return {
        checked:false,
        gov_id: void 0,
        pid: void -1,
        provinceSelect: '',
        citySelect: '',
        areaSelect: '',
        townSelect: '',
        villageSelect: '',
        name: '',
    }
}

export default {
    components: {
        DateRange,Course,CourseCategorySelect,Region,VueEditor, Transfer, DepSelect
    },
    data() {
        let validateGov = (rule, value, callback) => { 
            console.log('validateGov',value,this.govparam.provinceSelect,this.govparam.checked);
            console.log('provinceSelect',this.govparam.provinceSelect==undefined,this.govparam.checked==false);
                if ((!this.govparam.provinceSelect&&this.govparam.checked==false)){
                    callback(new Error('请输入部门'))
                }
                callback()
            }
        return {
            selectData:[],
            loadingData: false,
            data: [], // 表格数据
            total: 0,
            name:'',
            fetchParam: getFetchParam(),
            govparam:clearGovParam() ,
            form: clearForm(),
            rules: {
                title: [
                    {required: true, message: '必须填写', trigger: 'blur'},
                    {
                        min: 1,
                        max: 30,
                        message: '长度不得大于 30个字' 
                    },{
                        pattern:  /\S$/,
                        message: '请输入非空格或非特殊字符的标题'
                    }
                ],
                content: [
                    {required: true,  message: '必须填写', trigger: 'blur'},
                    {
                        min: 1,
                        max: 120,
                        message: '长度不得大于 120个字' 
                    },{
                        pattern:  /\S$/,
                        message: '请输入非空格或非特殊字符的内容'
                    }
                ],
                url:{required: true,  message: '必须填写', trigger: 'blur'},
                biz_id:{required: true, type:'number', message: '必须填写', trigger: 'change'},
                sendtime:{required: true, type:'object', message: '请输入发送时间', trigger: 'blur'},
                gov_id:{required: true, validator:validateGov, message: '请选择发送部门', trigger: 'blur'}
            },
            addForm: false, // 表单弹窗是否显示
            formLabelWidth: '120px', // 表单label的宽度
            showDetail: false,     // 是否显示详情url
            clerkDetail:{},
            pickerOptionsed: {
                disabledDate (time) {
                    return time.getTime() < Date.now() - 8.64e7
                }
            },
            changelistc:[],//课程列表
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
                    name:'',
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
        //打开发布对象弹出框
        openPushTypeDialog () {
            this.pushTypeDialog.showDialog = true
            this.pushTypeDialog.page = 1
            this.pushTypeDialog.fetchParam.gov_id = ''
            this.pushTypeDialog.fetchParam.gov_ids = ''
            this.pushTypeDialog.fetchParam.name = ''
            this.fetchPushTypeData()
        },
        transferConfirmFn () {
            this.pushTypeDialog.showDialog = false
        },
        //选择发布对象
        choosePushType(){
            let map = {
                1: {
                    type: '1',
                    label: '选择部门',
                    isSearch: false,
                },
                2: {
                    type: '2',
                    label: '选择人员',
                    isSearch: true,
                }
            }
            let param = map[this.form.type]
            if(param!=undefined){
                this.pushTypeDialog.title = param.label
                this.pushTypeDialog.isSearch = param.isSearch
                this.pushTypeDialog.type = param.type
            }

        },
        getPushTypeData () {
            this.pushTypeDialog.page = 1
            this.fetchPushTypeData()
        },
        fetchPushTypeData (type) {
            type !== 'no-clear' && (this.pushTypeDialog.data = [])
            let map = {
                1: govService.getSelectList,  //部门
                2: userService.fetchData,  //人员
            }
            let param = {
                name: this.pushTypeDialog.fetchParam.name,
                page: this.pushTypeDialog.page,
                pagesize: this.pushTypeDialog.pagesize,
                noself:1  
            }

            if (this.pushTypeDialog.isSearch) {
                param.mobile = this.pushTypeDialog.fetchParam.mobile
                param.name = this.pushTypeDialog.fetchParam.mobile
                param.gov_id = this.pushTypeDialog.fetchParam.gov_id
                param.role_id = -1
                param.noself = 1
            }
            map[this.pushTypeDialog.type](param).then(ret => {
                this.pushTypeDialog.total = ret._exts.total
                // if (this.pushTypeDialog.data.length > 0 && this.pushTypeDialog.data.length < ret._exts.total) {
                if (this.pushTypeDialog.data.length > 0 ) {
                    this.pushTypeDialog.data.splice(-1, 1)
                }
                this.pushTypeDialog.data.push(...ret.data, {id: -1}) //暂无id:-1 字段
            })
        },
        ueReady (ue) {
            this.editor = ue
        },
        changeR(type){
            let level_pid=this.govparam.villageSelect || this.govparam.townSelect || this.govparam.areaSelect || this.govparam.citySelect || this.govparam.provinceSelect
            let flag = false
            let index
            let arr = ['provinceSelect', 'citySelect', 'areaSelect', 'townSelect', 'villageSelect']
            arr.forEach((v,i) => {
                if (flag) {
                    this.govparam[v] = null
                }
                    console.log(this.govparam.provinceSelect,this.govparam.citySelect ,this.govparam.areaSelect,this.govparam.townSelect, this.govparam.villageSelect);
                if (this.govparam[v] == this.finallyVal) {
                    flag = true
                    index = i
                }
            })

        },
        //获取gov菜下拉列表
        req(param){
            return govService.getSelectList({
                pagesize:-1,pid:0,level:-1
            })
        },
        //推送课程搜索
            reqFun2(val, length){
                let param={
                    page: parseInt(length / 15) + 1||1,
                    pagesize: 15,
                    course_name:val,
                }
                let _this=this
                return courseService.getPublicCourselist(param)
                .then((ret)=>{
                    console.log('param=',typeof(param.page));
                    console.log('ret.data',ret.data);
                    // if(param.page==1){
                    //     ret.data=[{id:0,name:'免费直播'}].concat(ret.data)
                    //     console.log(ret.data);
                    //     _this.$emit('changelistc', ret.data)
                    // }else{
                        _this.$emit('changelistc', ret.data)
                    // }
                    return ret
                })
            },
        // 查看管理员详情
        urlDetail (index, row) {
            this.showDetail = true
            this.clerkDetail = row
        },
        //添加人员
        addAdmin () {
            this.form = clearForm()
            this.govparam = clearGovParam()

            this.addForm = true
            },
        //添加人员提交
        submit (form) {
            this.$refs[form].validate((valid) => {
                if (valid) {
                    
                    if(this.govparam.checked==true){
                        this.form.gov_id=0
                    }else{
                        this.form.gov_id = this.govparam.villageSelect || this.govparam.townSelect || this.govparam.areaSelect || this.govparam.citySelect || this.govparam.provinceSelect
                    }
                    this.form.sendtime = this.form.sendtime ? time2String(this.form.sendtime) : ''
                    console.log('this.form',this.form);
                    sysService.pushMsgCreate(this.form).then((ret) => {
                        xmview.showTip('success', '添加成功')
                    }).then(() => {
                        this.addForm = false
                        this.initFetchParam()
                        this.fetchData()
                        this.page = 1
                    }).catch((ret) => {
                        xmview.showTip('error', ret.message)
                    })
                } else {
                    return false
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
            return sysService.pushMsgList(this.fetchParam).then((ret) => {
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
                sysService.pushMsgDel(row.id).then(() => {
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
