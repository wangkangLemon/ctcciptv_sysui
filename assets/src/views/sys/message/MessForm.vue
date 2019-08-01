<!--课程表单：添加/修改-->
<style lang="scss" rel="stylesheet/scss">
    @import "../../../utils/mixins/common";
    #medical-form {
        @extend %content-container;
        display: flex;
        .submit-form {
            width: 90%;
            padding: 20px;
                .select{
                    width: 100%;
                }
                .subButton {
                    text-align: center;
                }
                .collection {
                align-items: center;
                min-height: 36px;
                border-radius: 4px;
                padding: 3px 30px 3px 10px;
                border: 1px solid #bfcbd9;
            }
            .u-course-tag {
                margin-right: 10px;
                background-color: rgba(32,160,255,.1);
                display: inline-block;
                padding: 0 10px;
                height: 32px;
                line-height: 30px;
                font-size: 12px;
                color: #20a0ff;
                border-radius: 4px;
                box-sizing: border-box;
                border: 1px solid rgba(32,160,255,.2);
                white-space: nowrap;
                &:last-child {
                    margin-right: 0;
                }
            }

        }
        .search {
            section{
                margin-bottom:14px;
            }
           .el-input{
               width:auto
           }
           
        } 
    // 底部的管理按钮
        // section{
        //     display:inline-block
        // }
    }
</style>
<template>
    <main id="medical-form">

         <!-- 发布对象弹窗 -->
        <el-dialog
            :title="pushTypeDialog.title"
            :visible.sync="pushTypeDialog.showDialog"
            v-if="pushTypeDialog.showDialog">
            <template v-if="pushTypeDialog.isSearch">
                <section class="search">
                    <section>
                        <!-- <i>部门</i>
                        <DepSelect v-model="pushTypeDialog.fetchParam.receiver" :change="getPushTypeData"></DepSelect>  -->
                        <i>手机号</i>
                        <el-input v-model="pushTypeDialog.fetchParam.mobile" placeholder="请输入手机号" @keyup.enter.native="getPushTypeData" ></el-input>
                          <i>姓名</i>
                        <el-input v-model="pushTypeDialog.fetchParam.name" placeholder="请输入姓名" @keyup.enter.native="getPushTypeData" ></el-input>
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
        <!-- 选择部门树弹窗 -->
        <el-dialog  ref="dialogSelect" v-model="dialogTree.isShow" title="选取范围"
                           item-key="contentid">
            <CourseTree v-model="treeData" :req="req" ref="courseCategory"  :nodeExpand="1"
                        :change="val=>categorysBox=val" :checkbox="true" :onNodeClick="treeNodeClick.bind(this,1)">
            </CourseTree>
            <span slot="footer">
                <el-button type="primary" @click="getCheckedNodes">确定</el-button>
            </span>
        </el-dialog >
        <section class="submit-form">   
              <el-form :model="form" :rules="rules" ref="form" :label-width="formLabelWidth">
                <el-form-item prop="title" label="消息标题">
                    <el-input v-model="form.title" placeholder="请填写消息标题" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="范围类型" prop="receive_type" >
                    <el-select clearable v-model="form.receive_type" @change="choosePushType" placeholder="请选择发送范围类型">
                        <!-- <el-option label="全部" :value="3"></el-option> -->
                        <el-option label="政府任务" :value="1"></el-option>
                        <el-option label="个人任务" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    :label="pushTypeDialog.title"  prop="receiver"
                    v-if="form.receive_type==2 && form.receive_type==pushTypeDialog.type">
                    <div class="collection" @click="openPushTypeDialog">
                        <el-tag
                            class="u-course-tag"
                            v-for="item in pushTypeDialog.selectedData[this.pushTypeDialog.type]"
                            :key="item.id">
                            {{item.name}}
                        </el-tag>
                    </div>
                </el-form-item>
                 <el-form-item label="接收部门" v-if="form.receive_type==1">
                        <Region :province="govparam.province_id"  v-model="govparam.province_id" ref="govselect"
                                :city="govparam.city_id" 
                                :area="govparam.area_id" 
                                :town="govparam.town_id"
                                :village="govparam.village_id" 
                                :provinces="govparam.provinces " 
                                title="" 
                                v-on:provinceChange="val => {govparam.province_id = val;finallyVal = val}"
                                v-on:cityChange="val => {govparam.city_id = val;finallyVal = val}" 
                                v-on:areaChange="val => {govparam.area_id = val;finallyVal = val}"
                                v-on:townChange="val => {govparam.town_id = val;finallyVal = val}" 
                                v-on:villageChange="val => {govparam.village_id = val;finallyVal = val}"
                                :change="changeR">
                        </Region>
                </el-form-item>
                 <el-form-item prop="sendtime" label="发送时间" >
                    <el-date-picker v-model="form.sendtime" type="datetime" placeholder="发送日期"
                                    :picker-options="pickerOptionsed"/>
                </el-form-item>
                <el-form-item label="消息类型" prop="msg_type">
                    <el-radio-group v-model="form.msg_type">
                        <el-radio :label="1">通知</el-radio>
                        <el-radio :label="2">课程</el-radio>
                        <el-radio :label="3">直播</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item prop="biz_id" label="消息课程" v-if="form.msg_type==2">
                     <Course v-model="form.biz_id" :placeholder="form.biz_name" ref="Course"
                            v-on:change="val=>form.biz_id=val" :change="reqFun2" 
                            :itemObj="['contentid','course_name']" :list="changelistc">
                    </Course>
                </el-form-item>
                <el-form-item prop="biz_id" label="消息直播" v-if="form.msg_type==3">
                    <Biz v-model="form.biz_id" :placeholder="form.biz_name" ref="Live"
                            v-on:change="val=>form.biz_id=val" :change="reqFun1" :itemObj="['id','title']" :list="changelistc1">
                    </Biz>
                </el-form-item>
                <el-form-item prop="content" label="消息内容" id="editor" :label-width="formLabelWidth">
                    <vue-editor v-model="form.content" @ready="ueReady"></vue-editor>
                </el-form-item>
          
                 <el-form-item label="" >
                    <div>
                    <el-button type="primary" @click="btnNextClick" v-if="!this.$route.params.look">确认</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </section>
    </main>
</template>

<script>
    import sysService from '../../../services/sys/sysService.js'
    import ImagEcropperInput from '../../component/upload/ImagEcropperInput.vue'
    import commonService from '../../../services/commonService.js'
    import authUtils from '../../../utils/authUtils' 

    import courseService from "../../../services/course/courseService.js"
    import LiveService from "../../../services/liveService.js"
    import govService from "../../../services/gov/govService.js"
    import userService from '../../../services/gov/userService.js'
    import DateRange from '../../component/form/DateRangePicker.vue'
    import Course from '../../component/select/CommonSelect.vue'
    import Biz from '../../component/select/CommonSelect.vue'
    import CourseCategorySelect from '../../component/select/MultCategory'
    import Region from '../../component/select/RegionImport0830.vue'
    import { time2String } from '../../../utils/timeUtils.js'
    import VueEditor from '../../component/form/UEditor.vue'
    import Transfer from '../../component/dialog/Transfer.vue'
    import DepSelect from '../../component/select/DepartmentNoself.vue'
    import CourseTree from '../../component/tree/MenuTree.vue'

    function clearForm() { //添加
        return {
            receive_type:void 0,//发送范围类型:1.政府 2.个人
            msg_type: '', //消息类型	1.通知 2.课程 3.直播
            title: '',
            content: '',
            receiver:0,   //接收人id、部门id	英文逗号间隔
            // gov_id:void 0,
            biz_id:void 0,  //跳转id	课程id、直播id
            biz_name:'',
            sendtime:void 0,
            status:1
        }
    }
    function clearGovParam() { //添加
        return {
            // checked:false,
            receiver: void 0,
            pid: void -1,
            province_id: '',
            city_id: '',
            area_id: '',
            town_id: '',
            village_id: '',
            provinces:[],
            name: '',
        }
    }
    export default {
        name: 'message-edit',
        components: {
            ImagEcropperInput, DateRange,Course,Biz,CourseCategorySelect,
            Region,VueEditor, Transfer, DepSelect,CourseTree
        },
        data() {
            // let validateGov = (rule, value, callback) => { 
            // // console.log('validateGov',value,this.govparam.province_id,this.govparam.checked);
            // // console.log('province_id',this.govparam.province_id==undefined,this.govparam.checked==false);
            //     if ((!this.govparam.province_id&&this.govparam.checked==false)){
            //         callback(new Error('请输入部门'))
            //     }
            //     callback()
            // }
            let validate=(rule, value, callback) => { 
                if (this.form.sendtime==undefined){
                    callback(new Error('请输入发送时间'))
                }
                callback()
            }
            let validate1=(rule, value, callback) => { 
                console.log(typeof(this.form.receiver),this.form.receiver);
                if (this.form.receive_type==2&&this.pushTypeDialog.selectedData[this.pushTypeDialog.type].length==0){
                    callback(new Error('请选择接收人员'))
                }
                callback()
            }
            return {
                selectData:[],
                govparam:clearGovParam() ,
                loadingData: false,
                fetchParam: getOriginData(),
                form: clearForm(),
                pushTypeDialog: { //发布对象数据模型
                    fetchParam: {
                        receiver: '',
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
                rules: {
                    title:[
                        {required: true, message: '必须输入', trigger: 'blur'},
                        ,{
                            pattern:  /\S$/,
                            message: '请输入非空格或非特殊字符的内容'
                        }
                    ],
                    receive_type: { required: true,type: 'number', message: '请输入发送范围类型',trigger: 'change'},
                    msg_type: { required: true,type: 'number', message: '请输入消息类型',trigger: 'change'},
                    biz_id: { required: true,type: 'number', message: '请跳转路径',trigger: 'change'},
                    sendtime: { required: true, validator:validate, trigger: 'blur'},
                    content: { required: true, message: '请输入消息内容',trigger: 'blur'},
                    receiver: { required: true, validator:validate1,trigger: 'blur'},
                },
                pickerOptionsed: {
                    disabledDate (time) {
                        return time.getTime() < Date.now() - 8.64e7
                    }
                },
                formLabelWidth: '120px', // 表单label的宽度
                govid:'',
                changelistc:[],//课程列表
                changelistc1:[],
                default:{
                    live_name:'',
                    course_name:''
                },
                dialogTree:{
                    loading: false,
                    isShow: false,
                    course_name: void 0,
                },
                treeData: [],
                noinit:false,
                msgtypeSwich:0,
                originbiz:void 0,
            }
        },
        watch:{
            'form.msg_type'(){
                if(!this.msgtypeSwich){
                    this.msgtypeSwich=1
                    return
                }
                this.form.biz_id=null
                this.form.biz_name=''
                
                // console.log('typeof(this.fetchParam.price)===='+typeof(this.fetchParam.price));
            },
            'govparam.province_id'(val){
                this.changeR()
                console.log('typeof(this.govparam.province_id)===='+typeof(this.govparam.province_id));
            }
        },
        created() {
             xmview.setContentLoading(false)
             if(this.$route.params.look)xmview.setContentTile('消息查看')
            if (this.$route.params.id != undefined) {    //路由id传递
                sysService.getMsgInfo(this.$route.params.id).then((ret) => {
                    this.form = ret
                    this.form.sendtime=this.form.senddate 
                    this.originbiz=this.form.biz_id
                    this.form.biz_id=this.form.biz_name

                    this.pushTypeDialog.type = ret.receive_type
                    if(ret.receive_type==1){
                        this.govparam.province_id=Number(ret.gov.province_id)
                        
                        // this.govparam.provinces=
                        this.govparam.city_id=ret.gov.city_id
                        this.govparam.area_id=ret.gov.area_id
                        this.govparam.town_id=ret.gov.town_id
                        console.log('this.govparam.province_id',this.govparam.province_id);

                    }
                    if(ret.receive_type==2&&ret.users&&ret.users.length!==0){
                        this.pushTypeDialog.selectedData[this.pushTypeDialog.type] = this.generatorList(ret.users || [])
                    }
                })
                setTimeout(() => {
                    // this.changeR()
                    this.noinit=true
                }, 500);
            } 
            this.loadingData=false
        },
        methods: {
            generatorList (arr) {
                return arr.map(item => {
                    return {
                        id:  item['id'] || item['group_id'],
                        name:  item['name'] || item['group_name']
                    }
                })
            },
             // 左边的节点被点击
            treeNodeClick (type, data, node, store) {
                console.log(node.data)
                if (type == 1) { 
                    // this.section.category_id=node.data.id
                    // this.section.category_name=node.data.name
                    this.nodeParentSelected = node.parent// 记录父节点
                    this.nodeSelected = node // 记录当前节点
                } else if (type == 2) {
                    this.moveToNode = node
                }
            },
            resetChecked(){
                this.$refs.courseCategory.$refs.tree.setCheckedKeys([]);
            },
            //拿到栏目树里的所有节点 处理数据拿到ended：1
            getCheckedNodes(){
                this.dialogTree.isShow=false
                // console.log(this.$refs.courseCategory.$refs.tree.getCheckedNodes());
                let arr=this.$refs.courseCategory.$refs.tree.getCheckedNodes()
                    //数组筛选ended==1
                    function func(arr, lable, box) {
                        arr.forEach(v => {
                            if (v.ended == 0) {
                                if(!v.children)xmview.showTip('error', "数据结构异常")
                                func(v.children, lable, box)
                            } else {
                                box.push(v)
                            }
                        })
                    }
                    let t = []
                    func(arr, 'children', t)
                    //数组去重
                    function format(t){
                        let obj = {};
                        let result = [];
                        t.forEach(v => {
                            obj[v.id] = v
                        });
                        for(let k in obj){
                            result.push(obj[k])
                        };
                        return result
                    }
                    console.log(11111111111,format(t))
                    this.categorysBox=format(t)
                    this.getCategoryids()
                    // this.getCategoryCheck()
            },
            //把数组转化成接口提交的 最终字符串
            getCategoryids(){
                 let categorys=[] //放栏目范围的空容器
                    this.categorysBox.forEach((c) => {
                        categorys.push(c.contentid||c.id) //开始出错
                        // console.log(this.form.course_ids)
                    })
                    this.form.category_ids = categorys.join(',')
                    console.log(this.form)
            },
            //栏目树接口
            getCategory(val){
                courseTaskService.getCategoryTree({pagesize:-1,type:2}).then((ret)=>{
                    this.category_list = ret.data;
                })
            },
             ueReady (ue) {
                this.editor = ue
            },
             cropperFn (data, ext) {
                this.govid=authUtils.getUserInfo().gov_id 
                commonService.commonUploadImageBaseSection({
                    image: data,
                    alias: `${Date.now()}${ext}`,
                    biz: 'gov',
                    extpath: this.govid,
                }).then((ret) => {
                    this.fetchParam.image = ret.url 
                })
            },
            btnNextClick() {
                 if(typeof(this.form.biz_id)=='string') {
                            this.form.biz_id = this.originbiz
                        }
                 this.$refs.form.validate((valid) => {
                    if (valid) {
                        
                        if(this.form.receive_type==1){
                        // 处理政府govids
                            // if(this.govparam.checked==true){
                            //     this.form.receiver=0
                            // }else{
                                this.form.receiver = this.govparam.village_id || this.govparam.town_id || this.govparam.area_id || this.govparam.city_id || this.govparam.province_id
                                
                                if(this.form.receiver=='')this.form.receiver=0
                            // }
                        }else if(this.form.receive_type==2){
                            // 处理userids
                            this.form.receiver = this.pushTypeDialog.type && this.pushTypeDialog.selectedData[this.pushTypeDialog.type].map(item => {
                            return item.id
                            }).join(',')
                        }
                        if(typeof(this.form.sendtime)=='object') {
                            this.form.sendtime = this.form.sendtime ? time2String(this.form.sendtime,0,0) : ''
                        }
                        if(this.form.msg_type==1)this.form.biz_id=''
                        console.log('this.form',this.form);
                        let req,param
                        if(this.$route.params.id){
                            req=sysService.messageEdit

                        }else{
                            req=sysService.messageCreate
                        }
                        delete this.form.users
                        delete this.form.gov
                        req(this.form).then((ret) => {
                            this.$router.push({name: 'message'})
                        })
                    } else {
                        return false
                    }
                })
            },
            //打开发布对象弹出框
            openPushTypeDialog () {
                console.log('this.form.receive_type',this.form.receive_type);
                //单选部门
                // if(this.form.receive_type==2){
                    this.pushTypeDialog.showDialog = true
                // }else if(this.form.receive_type==1){
                //      this.dialogTree.isShow=true
                // }
                this.pushTypeDialog.page = 1
                this.pushTypeDialog.fetchParam.receiver = ''
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
                    //单选部门注销
                    // 1: {
                    //     type: 1,
                    //     label: '选择部门',
                    //     isSearch: false,
                    // },
                    2: {
                        type: 2,
                        label: '选择人员',
                        isSearch: true,
                    }
                }
                let param = map[this.form.receive_type]
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
                    param.name = this.pushTypeDialog.fetchParam.name
                    param.receiver = this.pushTypeDialog.fetchParam.receiver
                    param.no_empty_gov_id = 1
                    param.active = -1
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
                let level_pid=this.govparam.village_id || this.govparam.town_id || this.govparam.area_id || this.govparam.city_id || this.govparam.province_id
                let flag = false
                let index
                let arr = ['province_id', 'city_id', 'area_id', 'town_id', 'village_id']
                arr.forEach((v,i) => {
                    if (flag&&this.noinit) {
                        this.govparam[v] = ''
                    }
                        console.log(this.govparam.province_id,this.govparam.city_id ,this.govparam.area_id,this.govparam.town_id, this.govparam.village_id);
                    if (this.govparam[v] == this.finallyVal) {
                        flag = true
                        index = i
                    }
                })
            },
            //获取gov菜下拉列表
            req(param){
                return govService.getSelectList({
                    pagesize:-1,pid:param,level:-1
                })
            },
            //消息直播搜索
            reqFun1(val, length){
                let param={
                    page: parseInt(length / 15) + 1||1,
                    pagesize: 15,
                    title:val,
                }
                let _this=this
                return LiveService.getLivelists(param)
                .then((ret)=>{
                    console.log('param=',typeof(param.page));
                    console.log('ret.data',ret.data);
                    _this.$emit('changelistc', ret.data)
                    return ret
                })
            },
            //消息课程搜索
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
                    // _this.$emit('changelistc', ret.data)
                    return ret
                })
            },
        }
    }

    function getOriginData() {
        return {
            title: '',
            author: '',
            info:'',
            image:'',
            html:''
        }
    }

</script>