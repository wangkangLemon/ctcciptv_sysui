<!--试题管理-->
<style lang='scss' rel='stylesheet/scss'>
@import "../../../utils/mixins/common";

#course-manage-addcourse-container {
    @extend %content-container;

    h2 {
        margin-bottom: 10px;
    }
    .el-tab-pane {
        max-width: 700px;
    }
    .el-upload-list__item {
        position: relative;
        .el-icon-close {
            position: absolute;
            right: 5px;
            top: 5px;
        }
    } // 考试题目设置
    .testing-set {
            max-width: 900px;
            height:auto!important; 
        .el-form {
            
            padding-top: 17px;
            // width: 80%;
            &:first-of-type {
                padding-top: 0;
            }
            hr {
                position: absolute;
                width: 100%;
                border-top: none;
                border-color: #bbb;
            }
            h5 {
                font-size: 14px;
                color: #666;
            }
            .el-input {
                display: inline-block;
                width: 60%;
                vertical-align: middle;
            }
                &:last-of-type {
                    margin-bottom: 0;
                }
            }
        }
        .cate{
            .el-cascader{
                width: 420px;
            }
            i{
                font-size: 14px;
            }
            width: 100%;
            // transform: translateY(15%) translateX(6%);
            .el-input {
                display: inline-block;
                width: 100%;
                vertical-align: middle;
            }
        }
        .multy-choose-item {
                margin: 5px 0;
                .el-input {
                // display: inline-block;
                width: 80%;
                vertical-align: middle;
            }
    }
    .addtype{
        margin-top:22px;
        .item{
             margin-top:22px;
        }
    }
    .submit {
        float: right;
    }
}
</style>

<template>
    <article id="course-manage-addcourse-container">
        <!-- <el-tabs v-model="activeTab" class="tab"> -->
            <!-- <el-tab-pane  label="考试题目设置" name="second" class="testing-set"> -->
                <el-form  class="testing-set" label-width="90px" >
                    <el-form class="cate" label-width="120px" :model="form" :rules="rules" ref="cate" >
                        <el-form-item  label="所属栏目" prop="chapter_id" v-if="$route.params.chapterInfo.chapter_type!==4 ">
                            <Section-category-menu :placeholder="form.chapter_name" :autoClear="true" v-model="form.chapter_id" :reqFun="reqFun"></Section-category-menu>
                        </el-form-item>
                        <!--A3题干部分-->
                        <el-form-item v-show="qtype=='A3'"  label="题干" prop="title" >
                            <el-input v-model="form.title" type="textarea" :autosize="{ minRows: 2, maxRows: 5}" placeholder="请输入内容">
                            </el-input>
                        </el-form-item>
                        <!--A4单选|多选的答案选项部分-->
                        <el-form-item label="答案选项组" v-show="qtype=='A4'" v-if="!readonly" >
                            <h5 v-if="!readonly" >请在正确答案前面打勾</h5>
                            <div class="multy-choose-item" v-for="(option,indexOption) in ansoption" :key="indexOption">
                                <!-- <el-checkbox v-model="option.correct" :true-label="1"  v-if="type == 2"></el-checkbox>
                                <el-radio class="radio" v-model="option.correct" :label="indexOption"  v-else>
                                    <i></i>
                                </el-radio> -->
                                <span>{{option.opid}}</span>
                                <el-input placeholder="填写描述" v-model="option.description" ></el-input>
                                <el-button  type="text" @click="ansoption.splice(indexOption, 1)">
                                    <i>删除</i>
                                </el-button>
                            </div>
                            <div class="multy-choose-item">
                                <el-button v-if="!readonly"  type="text" @click="addMoreTestingOption(ansoption)">添加更多选项</el-button>
                            </div>
                        </el-form-item>
                        <hr >
                    </el-form>
                    <el-form label-width="120px" v-for="(item,index) in fetchTesting" :key="index" :model="item"  ref="test">
                        <el-form-item label="" v-if="!readonly">
                            <!-- <el-button icon="plus" :class="{'el-button--primary':type==0}" @click='addTesting(0, index)'>判断题</el-button> -->
                            <el-button icon="plus" :class="{'el-button--primary':type==1}" @click='addTesting(1, index)' ref="single">单选题</el-button>
                            <el-button icon="plus" :class="{'el-button--primary':type==2}" @click='addTesting(2, index)' v-if="$route.params.chapterInfo.chapter_type==4">多选题</el-button>
                            <el-button icon="delete" type="danger" @click='deleteTesting(index, item)'>删除</el-button>
                        </el-form-item>
                        <el-form-item :label="'第' + (index+1) + '题' ">
                            <span v-if="qtype=='A1'">A1题型</span>
                            <span v-else-if="qtype == 'A2'">A2题型</span>
                            <span v-else-if="qtype == 'A3'">A3题型</span>
                            <span v-else-if="qtype == 'A4'" >A4题型</span>
                        </el-form-item>
                 
                      
                        <!-- <el-form-item label="题型" props="qtype" :rules=" { required: true, type: 'number', message: '请选择试题题型', trigger: 'change' }">
                            <el-select v-model="item.qtype" placeholder="请选择">
                                <el-option label="A1" value="A1"></el-option>
                                <el-option label="A2" value="A2"></el-option>
                                <el-option label="A3" value="A3"></el-option>
                                <el-option label="A4" value="A4"></el-option>
                            </el-select>
                        </el-form-item> -->
                
                        <el-form-item label="题目">
                            <el-input v-model="item.description" :disabled="!item.editable" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="配图">
                            <UploadImg :defaultImg="item.image" :url="uploadImgUrl" :disabled="!item.editable" :onSuccess="res => item.image = res.data.url"></UploadImg>
                        </el-form-item>

                        <!--判断题的正确错误选项-->
                        <el-form-item label="选项" v-if="item.type == 0">
                            <el-radio class="radio" :disabled="!item.editable" v-model="item.correct" :label="1">
                                <i>正确</i>
                            </el-radio>
                            <el-radio class="radio" :disabled="!item.editable" v-model="item.correct" :label="0">
                                <i>错误</i>
                            </el-radio>
                        </el-form-item>

                        
                        <!--A4单选的选项部分-->
                        <el-form-item label="选项" v-if="qtype=='A4'&& !readonly" >
                            <el-radio class="radio" v-for="(option,indexOption) in ansoption" :key="indexOption" :disabled="!item.editable" 
                                        v-model="item.options" :label="option.opid" :true-label="option.opid" :false-label="0">
                                <i>{{option.opid}}</i>
                            </el-radio>
                        </el-form-item>
                        <el-form-item label="答案"  v-if="qtype=='A4'&& readonly" >
                            <i>{{cbA4answer}}</i>
                        </el-form-item>
                         <!--A4单选|多选的选项部分-->
                        <!-- <optionItemA4 :options="ansoption" :item="item" >
                        </optionItemA4> -->

                        <!--单选|多选的答案部分-->
                        <el-form-item label="选项"  v-if="qtype!='A4'">
                            <h5>请在正确答案前面打勾</h5>
                            <div class="multy-choose-item" v-for="(option,indexOption) in item.options" :key="indexOption">
                                <el-checkbox v-model="option.correct" :true-label="1" :disabled="!item.editable" v-if="item.type == 2"></el-checkbox>
                                <el-radio class="radio" v-model="item.correct" :label="indexOption" :disabled="!item.editable" v-else>
                                    <i></i>
                                </el-radio>
                                <el-input placeholder="填写描述" v-model="option.description" :disabled="!item.editable"></el-input>
                                <el-button :disabled="!item.editable" type="text" @click="item.options.splice(indexOption, 1)">
                                    <i>删除</i>
                                </el-button>
                            </div>
                            <div class="multy-choose-item">
                                <el-button v-if="item.editable" type="text" @click="addMoreTestingOption(item.options)">添加更多选项</el-button>
                            </div>
                        </el-form-item>

                        <el-form-item label="答案详解">
                            <el-input v-model="item.explain" :disabled="!item.editable" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入内容">
                            </el-input>
                        </el-form-item>

                        <hr>
                    </el-form>

                <el-form label-width="120px" v-if="!readonly" class="addtype" >
                    <el-form-item label="" class="item">
                        <!-- <el-button icon="plus" @click='addTesting(0, fetchTesting.length)'>判断题</el-button> -->
                        <el-button icon="plus" @click='addTesting(1, fetchTesting.length)'>单选题</el-button>
                        <el-button icon="plus" @click='addTesting(2, fetchTesting.length)' v-if="$route.params.chapterInfo.chapter_type==4">多选题</el-button>
                    </el-form-item>
                </el-form>

                <div class="bottom-btns" v-if="!readonly">
                    <el-button class="submit" type="primary" @click="handleSubmitTesting">发布</el-button>
                </div>

                </el-form>

            <!-- </el-tab-pane> -->
        <!-- </el-tabs> -->
    </article>
</template>

<script>
import courseService from '../../../services/course/courseService.js'
import examService from '../../../services/exam/examService'
import testingFactory from '../../course/utils/testingFactory'
import formUtils from '../../../utils/formUtils'
import {transformParam} from '../../../utils/common'
import UploadImg from '../../component/upload/UploadImg.vue'
import SectionCategoryMenu from '../../component/select/SectionCategoryMenu.vue'
import optionItemA4 from '../../component/form/optionItemA4'

export default {
    name: 'exam-subject-form',
    data() {
        return {
            isShowVideoDialog: false, // 是否显示视频列表弹出框
            courseTags: [],
            rules: {
                    chapter_id: { required: true, type: 'number', message: '请选择试题栏目', trigger: 'change' },
                },
            testRules: {
                    qtype: { required: true, message: '请选择试题题型', trigger: 'blur' },
                },
            accept: '*.doc,*.docx', // 上传的文件格式
            // 考试设置部分
            fetchTesting: [],
            readonly: false, // 只读模式
            videoUrl: '', // 预览的视频url
            changelist:{},
            form:{
                chapter_id:'',
                chapter_name:'',
                category_id:'',
                category_name:'',
                title:'',
            },
            type: 1 ,//判断 单选
            qtype:'', //A1、A2
            options:[],
            ansoption:[],
            ansSelect:["A","B","C","D","E","F","G","H","I","J","K","L","M,","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
            cbA4answer:''
        }
    },
    created(){
        let _this=this
        if(this.$route.params.chapter_id){  //编辑
            examService.getExamSubject(this.$route.params.id).then((ret) => {
                xmview.setContentTile('试题查看')
                this.form.chapter_name=ret.chapter_name
                this.qtype=ret.qtype
                var arr = []
                arr.push(ret)
                this.fetchTesting = arr
                this.fetchTesting.forEach((item) => {
                    // if (item.category == 1) {
                        item.options.forEach((optionItem, index) => {
                            if (optionItem.correct == 1) item.correct = index //item是外层题的的数据 ，把内层index 拿出来给外层的item.correct 
                        })
                    // }
                })
                if(this.qtype=="A3") this.form.title = ret.ext.title
                // this.ansoption = ret.options
                if(this.qtype=="A4"){
                    ret.options.map(v=>{
                        if(v.correct==1){
                            _this.cbA4answer=v.description
                        }
                        return
                    })
                }
            }).catch((ret) => {
                xmview.showTip('error', ret.message)
            })
        }else{  // 新建
            if(!this.$route.params.chapterInfo){
                    xmview.showTip('warning', "请先选择试题所属分类")
                    this.$router.back()
                    return
            }
            this.form={
                chapter_id:this.$route.params.chapterInfo.id,
                chapter_name:this.$route.params.chapterInfo.name
            }
            if(this.$route.params.chapterInfo.chapter_type==4){
                    this.form.chapter_id=this.$route.params.chapterInfo.chapter_id
                }
            this.qtype=this.$route.params.qtype
            xmview.setContentTile(`试题添加-${this.qtype}题型`)
            if(this.qtype==undefined&&this.$route.params.chapterInfo.chapter_type!==4){
                xmview.showTip('error', "请点击添加考题按钮 => 选择题型")
                this.$router.back()
                return
            }
        }
        this.fetchTesting=[]
        this.uploadImgUrl = courseService.commonUploadImage()
        //编辑页面
        // if (this.$route.params.courseInfo) {
        //     // this.fetchParam = this.$route.params.courseInfo   //从主页传递信息
        //     for(let i in this.$route.params.courseInfo){
        //          this.fetchTesting[i]=this.$route.params.courseInfo[i]
        //     }
        //     xmview.setContentTile('编辑课程-培训')
        // } else 
        this.readonly = this.$route.params.readonly
        xmview.setContentLoading(false)
        if(this.qtype=="A4"){
            this.ansoption=[{
                    opid:"A",
                    description: '',
                },{
                    opid:"B",
                    description: '',
                },{
                    opid:"C",
                    description: '',
                },{
                    opid:"D",
                    description: '',
                },{
                    opid:"E",
                    description: '',
                }]
        }
    },
    methods: {
        reqFun(param){
            return examService.fetchChapterCategory({
                pid: 0,
                pagesize:-1,
                chapter_type:2,
                category_id:this.$store.state.index.examCate
            })
        },
        addTesting(type, index) {
            this.type=type
            this.fetchTesting.splice(index, 0, testingFactory.getExamSet(type))
        },
        // 删除考试
        deleteTesting(index, item) {
            xmview.showDialog(`是否确定删除题目【 <i style="color:red">${item.description || ''}</i> 】?`, () => {
                this.fetchTesting.splice(index, 1)
            })
        },
        // 添加多选 单选的选项
        addMoreTestingOption(options) {
            if(this.qtype=="A4"){
                options.push({
                    opid:this.ansSelect[options.length],
                    description: '',
                })
            }else{
                options.push({
                    description: '',
                    correct:0
                })
            }
            
        },
        // 考试题目信息提交
        handleSubmitTesting() {
            // 处理当前的数据
            let item = null
            if (!this.fetchTesting || this.fetchTesting.length < 1) {
                this.$router.back()
                return
            }
            this.$refs.cate.validate((valid) => {
                if (!valid) {
                        return false
                    }
                let requestParam = JSON.parse(JSON.stringify(this.fetchTesting))
                if(this.qtype!=="A4"){
                    if((this.qtype =="A3")&&(this.form.title ==undefined)){
                        xmview.showTip('error', "请先添加题干")
                        return false
                    }
                    for (let i = 0; i < requestParam.length, item = requestParam[i]; i++) {
                    // 处理单选题的正确答案选中
                        if (item.type == 1 && typeof item.correct == 'number') {
                            if(item.options){
                                item.options.map((itemOptions) => {
                                    delete itemOptions.correct
                                })
                                item.options[item.correct].correct = 1
                                delete item.correct
                            }
                        }
                        // 修复sort属性
                        item.sort = i + 1
                        if (item.options) {
                            item.options.map((itemOptions, index) => {
                                itemOptions.sort = index + 1
                            })
                        }
                        // console.log(item.options)
                    }
                }else{
                     if(this.ansoption[0].description==''){
                        xmview.showTip('error', "请先添加答案选项组")
                        return false
                    }
                }
                xmview.setContentLoading(true)

                //传参
                let params ,data
                if(this.qtype=="A1"||this.qtype=="A2"){ 
                    data ={
                        "qtype":this.qtype,
                        "subjects":requestParam
                    }
                    // params={ 
                    //     category_id:this.$store.state.index.examCate,
                    //     chapter_id:this.form.chapter_id,
                    //     subjects:encodeURI(formUtils.serializeArray(requestParam)).replace(/\+/g, '%2B'),
                    // }
                    // examService.addSubjectA1(params).then((ret) => {
                    //     xmview.showTip('success', '操作成功')
                    //     this.$router.back()
                    // }, () => {
                    // }).then(() => {
                    //     xmview.setContentLoading(false)
                    // })
                }else if(this.qtype=="A3"||this.qtype=="A4"){
                    if(this.qtype=="A3"){
                        data ={
                            "qtype":this.qtype,
                            "title":this.form.title,
                            "subjects":requestParam
                        }
                    }else{
                          data ={
                            "qtype":this.qtype,
                            "title":this.form.title,
                            "answeroption":this.ansoption,
                            "subjects":requestParam,
                        }
                    }
                }
                params={ 
                        category_id:this.$store.state.index.examCate,
                        chapter_id:this.form.chapter_id,
                        subjects:JSON.stringify(data),
                        style:this.qtype.toLowerCase(),
                        noJson:0  
                    }
                if(this.$route.params.chapterInfo.chapter_type==4){
                    params.category_id=this.$route.params.chapterInfo.category_id
                }
                // console.log('params',params);
                examService.addSubject(params).then((ret) => {
                    xmview.showTip('success', '操作成功')
                    this.$router.back()
                }, () => {
                }).then(() => {
                    xmview.setContentLoading(false)
                })
        
            })
        }
    },
    components: { UploadImg,SectionCategoryMenu,optionItemA4}
}
</script>
