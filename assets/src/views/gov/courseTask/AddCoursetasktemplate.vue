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
        }
        /*.search {
            @extend %top-search-container;
        }*/
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
            // display: inline-block;
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
        <el-form :model="form" :rules="rules" label-position="right" ref="form" label-width="120px" style="width: 60%">
            <el-form-item prop="task_type" label="任务类型">
                <el-select v-model="form.task_type">
                    <el-option label="课程任务" :value="1"></el-option>
                    <!-- <el-option label="试题栏目" :value="2"></el-option> -->
                    <el-option label="学习任务" :value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="form.task_type" label="分类" prop="category_id" :fetch-suggestions="querySearch">
                <el-select clearable class="select" v-model="form.category_id" placeholder="请选择分类">
                    <el-option  v-for="item in  category_list" :key="item.id" :label="item.name" :value="item.id"></el-option>
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
                <!--<ImagEcropperInput :isRound="false" :aspectRatio="2.15" :confirmFn="cropperFn"-->
                <ImagEcropperInput :isRound="false" :confirmFn="cropperFn"
                                   class="upload-btn"></ImagEcropperInput>
            </el-form-item>
            <el-form-item v-if="form.task_type" prop="course_ids" label="选择课程">
                <el-tag style="margin-right: 3px"
                        v-for="(c,index) in courseBox" :key="index"
                        :closable="true"
                        @close="delCourseTag(index)"
                        type="success">
                    {{c.course_name}}
                </el-tag>
                <el-button type="primary" @click="dialogCourseShow" size="small">添加课程</el-button>
                <h5 style="color:#20a0ff" v-if="courseBox.length>0">检测到可得课时 <i style="color:red">{{this.studyCheck.minute}} </i>分钟 </h5>
            </el-form-item>
            <el-form-item prop="sort" label="排序">
                <el-input-number v-model="form.sort" auto-complete="off"></el-input-number>
            </el-form-item>
            <el-form-item label="可得学分">
                <el-input style="width: auto;" v-model.number="form.score" type="number"  placeholder="请输入可获得学分值"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submit(0)">提交</el-button>
                    <!--<el-button type="warning" @click="submit(1)">存草稿</el-button>-->
            </el-form-item>
        </el-form>

        <!-- 选择课程弹窗 -->
        <dialogSelectData ref="dialogSelect" v-model="dialogCourse.isShow" :getData="fetchCourse" title="选择课程"
                          :selectedList="courseBox" @changeSelected="val=>courseBox=val"  item-key="contentid" get-item-key="course_id" :task-type="form.task_type">
            <div slot="search" class="course-search">
                <i>课程名称</i>
                <el-input @keyup.enter.native="$refs.dialogSelect.fetchCourse(true)" v-model="dialogCourse.course_name"
                          icon="search"
                          placeholder="请输入关键字搜索">
                </el-input>
            </div>
            <!-- <div slot="category" class="course-search">
                <i>栏目</i>
                <CourseCategorySelect v-model="dialogCourse.category_id" ></CourseCategorySelect>
            </div> -->
        </dialogSelectData>
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
    import DateRange from '../../component/form/DateRangePicker.vue'
    import DepSelect from '../../component/select/Department.vue'
    import CourseCategorySelect from '../../component/select/CourseCategory.vue'


    export default{
        name: 'coursetask-template-add',
        computed: {
            id () {
                return this.$route.query.id
            },
        },
        data () {
            return {
                TYPE:['','课程','考试','学习'],
                selectData:[],
                courseBox:[],
                form: {                // 表单属性值
                    title: void 0,          // 标题
                    category_id: void 0,       // 分类
                    image: void 0,        // 图片地址
                    description: void 0,  // 简介
                    sort: void 0,         // 排序
                    course_ids: [],     // 课程
                    // gov_ids: void 0,     // 部门
                    // user_ids: void 0,     // 用户
                    // status: void 0,       // 状态
                    score: 0,     // 可获得学分
                    // type:void 0,       // 任务类型
                    study_duration: '',
                    task_type:void 0
                },
                rules: {
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
                    sort: [{required: true, message: '必须填写'}],
                    course_ids: [{ required: true, message: '必须填写'}],
                    category_id: {type: 'number', required: true, message: '请选择栏目', trigger: 'change'},
                    task_type:{type: 'number', required: true, message: '请选择任务类型', trigger: 'change'},
                },
                dialogCourse: {
                    loading: false,
                    isShow: false,
                    course_name: void 0,
                    category_id:void 0,
                    type:'public'
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
                studyCheck:{},
                // passTasktype:void 0,
                flag:false
                // passFetchParam:{
                //     page: 1,
                //     pagesize: 15,
                //     need_testing:'',
                // }
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
            // 'courseBox'(){   //--------------注销新功能-----------
            //     this.getCourseIds()
            //     console.log(111111111);
            //     let param={course_ids:this.form.course_ids}
            //     courseTaskService.getCourseTaskTemplateStudyCheck(param).then((ret) => {
            //         console.log(ret);
            //         this.studyCheck=ret
            //         this.form.study_duration=ret.second
            //         console.log('this.form',this.form);
            //         })
            // },
            'dialogCourse.isShow'(){
                if(this.dialogCourse.isShow==false){
                    this.getCourseIds()
                    this.getStudyCheck()
                }
            },
            'dialogCourse.category_id'(){
                this.$refs.dialogSelect.fetchCourse(true)
            },
            'form.task_type'(){
                if(!this.flag){
                    this.flag=true
                }else{
                    this.initCourse()
                    this.form.category_id=''
                    
                }
                this.getCategory()
                this.$refs.dialogSelect.fetchCourse(true)
            }

        },
        created () {
            xmview.setContentLoading(false)
            if (this.$route.params.coursetaskInfo) {
                courseTaskService.getCourseTaskTemplateEditDetail(this.$route.query.id).then((ret) => {
                    this.form = Object.assign(this.form, ret.data)
                    console.log('form',this.form);
                    let txt=this.TYPE[this.form.task_type]
                    xmview.setContentTile(`编辑${txt}任务模板 `)
                    this.courseBox = ret.data.courses.map(v=>{
                        v.contentid = v.course_id
                        return v
                    }) 
                    this.getCourseIds()
                    this.getStudyCheck()
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
            dialogCourseShow() {
				this.dialogCourse.isShow = true
				if(this.dialogCourse.isShow) {
					this.dialogCourse.course_name = ''
					this.$refs.dialogSelect.fetchCourse(true)

				}
			},
            delCourseTag(index){
                this.courseBox.splice(index,1)
                this.getCourseIds()
                this.getStudyCheck()
            },
            //初始化课程数据
            initCourse(){
                this.courseBox=[]
                 this.getCourseIds()
                this.studyCheck={}
                this.form.study_duration=''
            },
            //把数组转化成接口提交的 最终字符串
            getCourseIds(){
                let courses=[] //放栏目范围的空容器
                this.courseBox.forEach((c) => {
                    courses.push(c.contentid||c.course_id) 
                })
                this.form.course_ids = courses.join(',')
            },
            //可得课时检测接口
            getStudyCheck(){
                let param={course_ids:this.form.course_ids}
                courseTaskService.getCourseTaskTemplateStudyCheck(param).then((ret) => {
                    this.studyCheck=ret
                    this.form.study_duration=ret.second
                })
            },
             //获取部门组下拉列表
            getCategory(val){
                courseTaskService.getCategoryTree({pagesize:-1,type:this.form.task_type}).then((ret)=>{
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
                if(this.form.task_type==1||this.form.task_type==2){
                    params.need_testing= 1
                    params.category_type=''
                    params.material_type=''
                }else{
                     params.need_testing= 0
                     params.category_type=1
                     params.material_type='video'
                }
                return courseService.getPublicCourselist(Object.assign({}, this.dialogCourse, params))
            },
            submit(s) {
                this.$refs.form.validate((valid) => {
                    if (!valid) {
                        return false
                    }
                    // 处理课程id
                    this.getCourseIds()
                    if(this.form.type==1){
                        // 处理govids
                        this.form.gov_ids = this.pushTypeDialog.type && this.pushTypeDialog.selectedData[this.pushTypeDialog.type].map(item => {
                        return item.id
                        }).join(',')
                    }else{
                        // 处理userids
                        this.form.user_ids = this.pushTypeDialog.type && this.pushTypeDialog.selectedData[this.pushTypeDialog.type].map(item => {
                        return item.id
                        }).join(',')
                    }
                    // this.fetchParam.end_time = this.timeFormatter(this.fetchParam.end_time, true)

                    if (s > 0) { //存草稿箱
                        this.form.status = s
                    }
                    let reqFn = courseTaskService.addCourseTaskTemplate
                    if (this.form.id) {
                        reqFn = courseTaskService.updateCourseTaskTemplate
                    }
                    console.log(222222222222,this.form);
                    reqFn(this.form).then((ret) => {
                        xmview.showTip('success', '保存成功')
                        this.$router.push({name: 'gov-coursetasktemplate'})
                    }).catch((ret) => {
                        xmview.showTip('error', ret.message)
                    })
                })
            }
        },
        components: {DateRange,ImagEcropperInput, dialogSelectData, Transfer, DepSelect, CourseCategorySelect }
    }
</script>
