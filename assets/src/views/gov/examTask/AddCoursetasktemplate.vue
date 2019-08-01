<!--添加任务模板-->
<style lang='scss' rel='stylesheet/scss'>
    @import "../../../utils/mixins/common";
    @import "../../../utils/mixins/mixins";

    .create-course-task {
        @extend %content-container;
        background: #fff;
        padding: 20px;
        .el-form {
            width: 60%;
            img {
                width: 35%;
                // height: 50%
            }
            .shortInput{
                width:40%;
                vertical-align:middle;
            }
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
        .el-tabs__content {
            position: relative;
            .dialog-select-item {
                h5 {
                    line-height: 40px;
                    font-size: 14px;
                    padding-left: 20px;
                    background: #fbfdff;
                    border: 1px solid #d1dbe5;
                    border-bottom: none;
                }
                position: absolute;
                top: 54px;
                right: 120px;
                height: 500px;
                width: 42%;
                display: inline-block;
                vertical-align: top;
            }
        }
        .row-class {
            border: 1px solid #d1dbe5;
        }

        .course-search {
            margin-bottom: 12px;
            .el-input {
                width: 150px;
                ::-webkit-input-placeholder {
                    font-size: 13px
                }
            }
        }
    }
</style>

<template>
    <article class="create-course-task">
         <el-tabs type="border-card" v-model="activeTab">
            <el-tab-pane label="题库简介" name="first">
                <el-form :model="form" :rules="rules1" label-position="right" ref="form1" label-width="120px" style="width: 60%">
                    <el-form-item  label="分类" prop="category_id" :fetch-suggestions="querySearch">
                        <el-select clearable class="select" v-model="form.category_id" placeholder="请选择分类">
                            <el-option  v-for="item in category_list" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="title" label="标题">
                        <el-input v-model="form.title" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="description" label="描述">
                        <el-input v-model="form.description" auto-complete="off" :rows="6" type="textarea"></el-input>
                    </el-form-item>
                    <el-form-item prop="image" label="任务封面图">
                        <div class="img-wrap" v-if="form.image">
                            <img :src="form.image | fillImgPath" alt=""/>
                        </div>
                        <ImagEcropperInput :isRound="false" :confirmFn="cropperFn"
                                        class="upload-btn"></ImagEcropperInput>
                    </el-form-item>
                    <el-form-item>
                        <el-button style="float: right" type="primary" @click="btnNextClick">下一步</el-button>
                    </el-form-item>
                </el-form>
                
            </el-tab-pane>
            <el-tab-pane label="抽题设置" name="second">
                <el-form label-width="120px" ref="form2" :model="form" :rules="rules2">
                   
                     <el-form-item prop="categorys" label="选择范围">
                        <el-tag style="margin-right: 3px"
                                v-for="(c,index) in categorysBox" :key="index"
                                :closable="delRange"
                                @close="delTag(index)"
                                type="success">
                            {{c.name}}
                        </el-tag>
                        <!-- <el-button type="primary" @click="dialogTree.isShow=true" size="small"
                                    v-if="this.$route.params.add==1">选取范围
                        </el-button> -->
                        <el-button type="primary" @click="dialogTree.isShow=true" size="small"
                                    v-if="this.$route.params.add==1">选取范围
                        </el-button>
                    </el-form-item>
                    <el-form-item style="color:red">
                        <i>出题数目范围 ：</i>
                        <span>单选题 【{{s}}】 个 ，</span><span>多选题 【{{m}}】 个 ，</span><span>判断题 【{{j}}】 个</span>
                    </el-form-item> 
                    <el-form-item prop="single_score" label="单选题">
                        <el-input-number v-model="form.single_num" :min="0" :max="this.s" auto-complete="off" class="shortInput"></el-input-number> 个，
                        每题 <el-input-number class="shortInput" v-model="form.single_score" :min="0" auto-complete="off"></el-input-number> 分
                    </el-form-item>
                    <el-form-item prop="multi_score" label="多选题">
                        <el-input-number v-model="form.multi_num" :min="0" :max="this.m" auto-complete="off" class="shortInput"></el-input-number> 个，
                        每题 <el-input-number class="shortInput" v-model="form.multi_score" :min="0" auto-complete="off"></el-input-number> 分
                    </el-form-item>
                    <el-form-item prop="judgment_score" label="判断题">
                        <el-input-number v-model="form.judgment_num" :min="0" :max="this.j" auto-complete="off" class="shortInput"></el-input-number> 个，
                        每题 <el-input-number class="shortInput" v-model="form.judgment_score" :min="0" auto-complete="off"></el-input-number> 分
                    </el-form-item> 
                     <el-form-item label="试题总数" prop="total_subject" >
                        <p>{{form.single_num+form.multi_num+form.judgment_num}}个</p>
                        <!-- <el-input v-model="form.title" auto-complete="off"></el-input> -->
                    </el-form-item>
                    <el-form-item label="试卷总分" prop="total_score" >
                        <p>{{form.single_score*form.single_num+form.multi_score*form.multi_num+form.judgment_score*form.judgment_num}}分</p>
                    </el-form-item>
                    <el-form-item prop="pass_score" label="及格分数">
                        <el-input-number v-model="form.pass_score" :min="0" :max="form.single_score*form.single_num+form.multi_score*form.multi_num+form.judgment_score*form.judgment_num"
                                        auto-complete="off"></el-input-number>
                    </el-form-item>  
                    <el-form-item>
                            <el-button v-if="this.$route.params.add== 1" type="primary" @click="submit(0)" >提交</el-button>
                            <!--<el-button type="warning" @click="submit(1)">存草稿</el-button>-->
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>

        <!-- 选取范围弹窗-->
        <el-dialog  ref="dialogSelect" v-model="dialogTree.isShow" title="选取范围"
                           item-key="contentid">
            <!-- <div slot="search" class="course-search">
                <el-input @keyup.enter.native="$refs.dialogSelect.fetchCourse(true)" v-model="dialogCourse.course_name"
                          icon="search"
                          placeholder="请输入关键字搜索"></el-input>
            </div> -->
            <CourseTree v-model="treeData" :req="req" ref="courseCategory" :change="val=>categorysBox=val" :checkbox="true" :mark = this.mark ></CourseTree>
            <span slot="footer">
                <!-- <el-button type="warning" @click="resetChecked">清空</el-button> -->
                <el-button type="primary" @click="getCheckedNodes">确定</el-button>
            </span>
        </el-dialog >


        <!-- 发布对象弹窗 -->
        <el-dialog
            :title="pushTypeDialog.title"
            :visible.sync="pushTypeDialog.showDialog"
            v-if="pushTypeDialog.showDialog">
            <template v-if="pushTypeDialog.isSearch">
                <section class="search">
                    <section>
                        <i>部门</i>
                        <DepSelect v-model="pushTypeDialog.fetchParam.gov_id" :change="getPushTypeData"></DepSelect>
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
            <span slot="footer" class="dialog-footer">
                <el-button @click="pushTypeDialog.showDialog = false">取 消</el-button>
                <el-button type="primary" @click="transferConfirmFn">确 定</el-button>
            </span>
        </el-dialog>
    </article>
</template>

<script>
    import Transfer from '../../component/dialog/Transfer.vue'
    import ImagEcropperInput from '../../component/upload/ImagEcropperInput.vue'
    import courseTaskService from '../../../services/gov/courseTaskService.js'
    import courseService from '../../../services/course/courseService.js'
    import commonService from '../../../services/commonService.js'
    import govService from '../../../services/gov/govService.js'
    import userService from '../../../services/gov/userService.js'
    import dialogSelectData from '../../component/dialog/SelectData4table.vue'
    import CourseTree from '../../component/tree/MenuTree.vue'
    import DateRange from '../../component/form/DateRangePicker.vue'
    import DepSelect from '../../component/select/Department.vue'


    export default{
        name: 'coursetask-template-add',
        computed: {
            id () {
                return this.$route.query.id
            },
        },
        data () {
            var validatePass = (rule, value, callback) => {
                if (value > this.form.single_score*this.form.single_num+this.form.multi_score*this.form.multi_num+this.form.judgment_score*this.form.judgment_num) {
                    callback(new Error('及格分数不得大于总分'))
                }
                callback()
            }
            return {
                activeTab: 'first',
                selectData:[],
                categorysBox:[],
                form: {                // 表单属性值
                    title: void 0,          // 标题
                    category_id: void 0,       // 分类
                    image: void 0,        // 图片地址
                    description: void 0,  // 简介
                    category_ids: [],     // 栏目范围
                    pass_score:void 0,
                    total_score:void 0,
                    total_subject:void 0,
                    total_score:void 0,
                    pass_score:void 0,
                    single_num:void 0,
                    single_score:void 0,
                    multi_num:void 0,
                    multi_score:void 0,
                    judgment_num:void 0,
                    judgment_score:void 0,
                },
                rules1: {
                    title:  [
                        {required: true,  message: '请输入任务标题', trigger: 'blur'},
                        {
                            min: 1,
                            max: 40,
                            message: '长度不得大于 40 个字符'
                        },{
                            pattern:  /\S$/,
                            message: '请输入非空格或非特殊字符的标题'
                        }
                    ],
                    description: [{required: true, pattern:  /\S$/, min: 1,message: '请输入非空格或非特殊字符的描述', trigger: 'blur'}],
                    image: [{required: true, message: '必须填写', trigger: 'blur'}],
                    category_id: {type: 'number', required: true, message: '请选择栏目', trigger: 'change'},
                },
                  rules2: {
                    category_ids: [{ required: true, message: '*请选择出题范围'}],
                    pass_score: {required: true,validator: validatePass, trigger: 'blur'},
                    single_score: {type: 'number', required: true, message: '请输入', trigger: 'change'},
                    multi_score	: {type: 'number', required: true, message: '请输入', trigger: 'change'},
                    judgment_score: {type: 'number', required: true, message: '请输入', trigger: 'change'},
                },
                dialogCourse: {
                    loading: false,
                    isShow: false,
                    course_name: void 0,
                },
                dialogTree:{
                    loading: false,
                    isShow: false,
                    course_name: void 0,
                },
                pushTypeDialog: { //发布对象数据模型
                    fetchParam: {
                        gov_id: '',
                        gov_ids: '',
                        name: ''
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
                category_list:[],
                treeData: [],
                mark:{
                    type:'menu',
                    name:'name'
                },
                //获取到限制的题目数量
                s:void 0, //单选
                m:void 0, //多选
                j:void 0, //判断
                delRange:this.$route.params.add==1,
            }
        },
        watch:{
            'form.type'(){
                if(this.form.type==1){//政府
                    this.form.user_ids= ''
                }else{ //政府
                    this.form.gov_ids= ''
                }
            },
            'categorysBox'(){
                console.log(this.categorysBox) 
            },
            '$refs.courseCategory.$refs.tree'(){
                console.log(this.$refs.courseCategory.$refs.tree.getCheckedNodes());
            },
        },
        created () {
            xmview.setContentLoading(false)
            console.log(this.$route.params.taskInfo)
            if (this.$route.params.taskInfo) {
                courseTaskService.getCourseTaskTemplateEditDetail(this.$route.params.id).then((ret) => {
                    this.form = Object.assign(this.form, ret.data)
                    // this.form.stime =  ret.data.start_date.split(' ')[0]
                    // this.form.etime =  ret.data.end_date.split(' ')[0]
                    // this.form.type = ret.data.type
                    // this.pushTypeDialog.type = ret.data.type
                     xmview.setContentTile('查看考试任务模板 ')
                     let e=ret.data.exam
                    for(let i in e){  
                        this.form[i]=e[i]   
                    } 
                    this.categorysBox = e.categorys.map(v=>{
                        v.contentid = v.id
                        return v
                    }) 
                    courseTaskService.getCategoryCheck({categorys:this.form.category_ids}).then((ret) => {
                        this.s=ret.single_num
                        this.m=ret.multi_num
                        this.j=ret.trueorfalse_num
                    })
                    this.$refs.dialogSelect.setSelected()
                    this.choosePushType()
                    if(ret.data.govs.length!==0){
                        this.pushTypeDialog.selectedData[this.pushTypeDialog.type] = this.generatorList(ret.data.govs || [])
                    }
                    else if(ret.data.users.length!==0){
                        this.pushTypeDialog.selectedData[this.pushTypeDialog.type] = this.generatorList(ret.data.users || [])
                    }
                    xmview.setContentLoading(false)
                })
            }
            this.pushTypeDialog.selectedData[this.pushTypeDialog.type] = []
            this.getCategory()
        },
        methods: {
            delTag(index){
                this.categorysBox.splice(index,1)
                this.getCategoryids()
                this.getCategoryCheck()
            },
             btnNextClick() {
                this.$refs.form1.validate((valid) => {
                    if (!valid) {
                        return false
                    }
                    if(this.activeTab=='first'){
                        this.activeTab = 'second' 
                        return
                    }
                 })
            },
            req(param){
                return courseService.getCategoryTree({ //传递方法
                    pid: -1,
                    level: -1,
                    pagesize:-1,
                    category_type:1
                })
            },
            fetchCourseTree(){
                let param={
                        pid:-1, // 3- 供应商
                        page:1,
                        level: -1,
                        pagesize: -1,
                    }
                return courseService.getCategoryTree(params).then((ret) => {
                        this.SecMenu=ret.data
                        // console.log('this.SecMenu+++++++',param,this.SecMenu)
                        xmview.setContentLoading(false)     
                    })
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
                    this.getCategoryCheck()
            },
            //调栏目试题总数检测接口 返回值填充页面
            getCategoryCheck(){
                 courseTaskService.getCategoryCheck({categorys:this.form.category_ids}).then((ret) => {
                        console.log('ret=====',ret);
                        xmview.showTip('success', '获取试题数目成功')
                        this.s=this.form.single_num=ret.single_num
                        this.m=this.form.multi_num=ret.multi_num
                        this.j=this.form.judgment_num=ret.trueorfalse_num
                    })
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
            
            //拿到部门组
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据返回建议列表的数据
                cb(results);
            },
            transferConfirmFn () {
                this.pushTypeDialog.showDialog = false
            },
            //打开发布对象弹出框
            openPushTypeDialog () {
                this.pushTypeDialog.showDialog = true
                this.pushTypeDialog.page = 1
                this.pushTypeDialog.fetchParam.gov_id = ''
                this.pushTypeDialog.fetchParam.gov_ids = ''
                this.pushTypeDialog.fetchParam.name = ''
                this.fetchPushTypeData()
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
                // console.log(param)
                if(param!=undefined){
                    this.pushTypeDialog.title = param.label
                    this.pushTypeDialog.isSearch = param.isSearch
                    this.pushTypeDialog.type = param.type
                    // console.log(this.pushTypeDialog.type)
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
                    // user_group: userService.userGroupSearch
                }
                let param = {
                    name: this.pushTypeDialog.fetchParam.name,
                    page: this.pushTypeDialog.page,
                    pagesize: this.pushTypeDialog.pagesize
                }

                if (this.pushTypeDialog.isSearch) {
                    param.gov_id = this.pushTypeDialog.fetchParam.gov_id
                    param.role_id = -1
                }
                console.log(param)
                map[this.pushTypeDialog.type](param).then(ret => {
                    // this.pushTypeDialog.total = ret._exts.total
                    this.pushTypeDialog.total = ret._exts.total
                    // if (this.pushTypeDialog.data.length > 0 && this.pushTypeDialog.data.length < ret._exts.total) {
                    if (this.pushTypeDialog.data.length > 0 ) {
                        this.pushTypeDialog.data.splice(-1, 1)
                    }
                    this.pushTypeDialog.data.push(...ret.data, {id: -1}) //暂无id:-1 字段
                    // this.pushTypeDialog.data.push(...ret.data) //暂无id:-1 字段
                    //  this.pushTypeDialog.data.forEach(item => { item.type = 'exam' })
                })
            },
            generatorList (arr) {
                return arr.map(item => {
                    return {
                        id: item['gov_id'] || item['user_id'] || item['group_id'],
                        name: item['gov_name'] || item['user_name'] || item['group_name']
                    }
                })
            },
            cropperFn(data, ext) {
                commonService.commonUploadImageBaseSection({
                    image: data,
                    alias: `${Date.now()}${ext}`
                }).then((ret) => {
                    xmview.showTip('success', '上传成功')
                    this.form.image = ret.url // 显示图片
                })
            },
            fetchCourse (params) {
                // { course_name = '', status, category_id , time_start, time_end, page, pagesize}
                return courseService.getPublicCourselist(Object.assign({}, this.dialogCourse, params))
            },
            
            submit(s) {
                this.form.total_subject=this.form.single_num+this.form.multi_num+this.form.judgment_num
                this.form.total_score=this.form.single_score*this.form.single_num+this.form.multi_score*this.form.multi_num+this.form.judgment_score*this.form.judgment_num
                 this.$refs.form1.validate((valid) => {
                    if (!valid) {
                        return false
                    }
                this.$refs.form2.validate((valid) => {
                    if (!valid) {
                        return false
                    }
                    this.getCategoryids()
                    if (s > 0) { //存草稿箱
                        this.form.status = s
                    }
                    let reqFn = courseTaskService.addCourseTaskTemplate
                    if (this.form.id) {
                        reqFn = courseTaskService.updateCourseTaskTemplate
                    }
                    console.log(this.form)
                    reqFn(this.form).then((ret) => {
                        xmview.showTip('success', '保存成功')
                        this.$router.push({name: 'gov-examtasktemplate'})
                    }).catch((ret) => {
                        xmview.showTip('error', ret.message)
                    })
                })
                })
            }
        },
        components: {DateRange,ImagEcropperInput, dialogSelectData, Transfer, DepSelect,CourseTree }
    }
</script>
