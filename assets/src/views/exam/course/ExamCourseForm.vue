<!--编辑/添加课程-->
<style lang="scss" rel="stylesheet/scss">
    .gov-operate-container {
        background: #fff;
        padding: 20px 300px 20px 100px;
        overflow: auto;
        .addForm {
            .tip {
                text-align: center;
                border-top: 1px solid #ddd;
                color: #ff0000;
                line-height: 50px;
            }
        }
        .dialog-footer {
            text-align: center;
        }
        .el-cascader{
            width:240px
        }
    }
</style>
<template>
    <article class="gov-operate-container">
        <section>
            <el-form class="addForm" :model="form" :rules="rules" ref="form" :label-width="formLabelWidth">
                <el-form-item  label="所属栏目" prop="chapter_id">
                    <Section-category-menu :placeholder="form.chapter_name" :autoClear="true" v-model="form.chapter_id" :reqFun="reqFun"></Section-category-menu>
                </el-form-item>
                <el-form-item prop="course_name" label="课程名称" :label-width="formLabelWidth">
                    <el-input v-model="form.course_name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="课程封面图" prop="image"  :label-width="formLabelWidth">
                        <img :src="form.image | fillImgPath" width="200" height="112" v-show="form.image">
                        <CropperImg ref="imgcropper" :confirmFn="cropperImgSucc" :aspectRatio="16/9"></CropperImg>
                    </el-form-item>
                <el-form-item label="课程标签">
                        <vTags v-model="courseTags"></vTags>
                    </el-form-item>
                <el-form-item prop="description" label="描述" :label-width="formLabelWidth">
                    <el-input type="textarea" :rows="3" v-model="form.description" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="课程文件" prop="material_id">
                    <!-- <UploadFile :onSuccess="handleUploadDoc" :url="uploadDocUrl"  :disabled="form.material_type == null" v-show="form.material_type !== 'video'"></UploadFile> -->
                    <el-button  @click="getVideoName">
                        <i>{{form.material_name}}</i>
                    </el-button>
                    <el-button  @click="preview(form.material_id)" type="text" size="big"
                            > 查看
                    </el-button>
                </el-form-item>

                <el-form-item  label="关联专家"  :fetch-suggestions="querySearch">
                        <Experts v-model="form.experts_id" :placeholder="form.experts_name"
                                            v-on:change="val=>form.experts_id=val" :change="getExpertsList" :list="changelist">
                        </Experts>
                    </el-form-item>
                <el-form-item prop="sort" label="排序" :label-width="formLabelWidth">
                    <el-input v-model="form.sort" auto-complete="off" placeholder="排序越大越靠前，留空则自动设为最靠前的排序"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submit('form')">提交</el-button>
            </div>
        </section>
        <DialogVideo :onSelect="handleVideoSelected" v-model="isShowVideoDialog"></DialogVideo>
        <VideoPreview :url="videoUrl" :onchange="fetchVideoData" ref="videoPreview"></VideoPreview>
        <!-- <ImagEcropperInput :compress="1" :isShowBtn="false" ref="imgcropper" :confirmFn="handleImgUploaded" :aspectRatio="ratio"></ImagEcropperInput> -->
    </article>
</template>
<script>
    import expertsService from '../../../services/course/expertsService.js'
    import courseService from '../../../services/course/courseService.js'
    import videoService from '../../../services/course/videoService.js'
    import examService from '../../../services/exam/examService'
    import Region from '../../component/select/Region.vue'
    import SectionCategoryMenu from '../../component/select/SectionCategoryMenu.vue'
    import CropperImg from '../../component/upload/ImagEcropperInputSec.vue'
    // import ImagEcropperInput from '../../component/upload/ImagEcropperInputSec.vue'
    import vTags from '../../component/form/Tags.vue'
    import UploadFile from '../../component/upload/UploadFiles.vue'
    import DialogVideo from '../../course/component/DialogVideo.vue'
    import Experts from '../../component/select/Experts'
    import VideoPreview from '../../component/dialog/VideoPreview.vue'
    import {transformParam} from '../../../utils/common'
    function clearFormFn() {
            return  {
                    category_id: 0, //要拿到课程类别
                    chapter_id: void 0,
                    course_name: '',
                    image: '',
                    tags:'',
                    description: '',
                    material_id:void 0,
                    status:void 0,
                    deleted:void 0,
                    experts_id:void 0,
                    sort:void 0,
                    audited:void 0,
                    material_name: '选择视频',
                    material_type:void 0,
                    experts_name:'',
                }
    }
    let _this
    export default {
        components: {
            Region,SectionCategoryMenu,vTags,CropperImg,UploadFile,DialogVideo,Experts,VideoPreview
        },
        name:'exam-course-form',
        data () {
            let validateEmail = (rule, value, callback) => {
                if (!(value || '').match(/^\w+([-+.]\w+)*@\w+([-+.]\w+)*.\w+([-+.]\w+)*$/)) {
                    callback(new Error('请输入一个有效的电子邮箱地址'))
                }
                callback()
            }
            let validateMobile = (rule, value, callback) => {
                if (!(value || '').match(/^1[3456789]\d{9}$/)) {
                    callback(new Error('请输入正确的手机号'))
                }
                callback()
            }
            return {
                ratio: 0, // 裁剪的比例
                govTypes: [ // 部门类型
                    {
                        name: '政府',
                        id: 2
                    },
                ],
                formLabelWidth: '120px',
                form: clearFormFn(),
                rules: {
                    chapter_id: [
                        {required: true, type:'number',message: '请选择课程栏目', trigger: 'change'}
                    ],
                    course_name: [
                        {required: true,  message: '请输入课程名称', trigger: 'blur'},
                        {
                            min: 1,
                            max: 40,
                            message: '长度不得大于 40 个字符'
                        },{
                            pattern:  /\S$/,
                            message: '请输入非空格或非特殊字符的标题'
                        }
                    ],
                    mobile: [
                        {message: '必填项', trigger: 'blur'},
                        // {validator: validateMobile, trigger: 'blur'}
                    ],
                    image: [
                        {required: true, message: '请选择图片', trigger: 'blur'},
                        // {validator: validateEmail, trigger: 'blur'}
                    ],
                    material_id: { required: true, type: 'number', message: '请上传课程文件', trigger: 'change' },
                },
                courseTags: [],
                uploadDocUrl: '', // 上传文档的url
                isShowVideoDialog: false, // 是否显示视频列表弹出框
                videoUrl: '', // 预览的视频url
                changelist:{},
                courseTags: [],
            }
        },
        computed: {
            courseId () {  //传过来的govid
                return this.$route.params.id
            },
        },
        created () {
            //  this.form = clearFormFn()
            //  console.log(this.form )
            console.log(typeof(this.form.chapter_id),this.form.chapter_id)
            _this = this
            xmview.setContentLoading(false)
            this.getExpertsList()
            this.uploadDocUrl = courseService.getCourseDocUploadUrl()
            this.uploadImgUrl = courseService.commonUploadImage()
            if (this.courseId == undefined) {
                this.form = clearFormFn()
                this.courseTags=[]
                return false
            }
            examService.getExamCourse(this.courseId).then((ret) => {
                this.form = ret
                this.courseTags = this.form.tags ? this.form.tags.split(',') : []
                this.courseId = this.courseId
                this.form.material_name= this.form.course_name
            })
        },
        methods: {
            reqFun(param){
                    return examService.fetchChapterCategory({
                        // pid: 0,
                        chapter_type:1,
                        pagesize:-1,
                        category_id:this.$store.state.index.examCate
                    })
                },
            // 图片裁切成功回调
            cropperImgSucc(imgData) {
                courseService.commonUploadImageBase({ image: imgData ,extpath:''}).then((ret) => {
                    this.form.image = ret.url
                })
            },
            getExpertsList (val, length) {
                return expertsService.fetchExpertsData({
                    name: val,
                    // category: this.type,
                    pagesize: this.pageSize,
                    page: parseInt(length / this.pageSize) + 1
                }).then((ret) => {
                    this.$emit('changelist', ret)
                    this.changelist = ret
                    return ret
                })
            },
            //拿到医院列表输入建议
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据返回建议列表的数据
                cb(results);
            },
            fetchVideoData () {
                this.loadingData = true
                return videoService.getVideo(this.form).then((ret) => {
                    this.data = ret.data
                    this.total = ret._exts.total
                    this.loadingData = false
                })
            },
            // 拿到视频名称
            getVideoName(){
                this.isShowVideoDialog=true
            },
            // 处理上传文档
            handleUploadMedia(response) {
                this.form.material_id = response.data.contentid
            },
            // 处理视频选取
            handleVideoSelected(row) {
                this.form.material_name = row.title
                this.form.material_id = row.material_id
            },
            handleUploadDoc(rep) { // 文档上传完毕
            this.form.material_id = rep.data.contentid
            },
            // 预览视频
            preview (index) {
                // 拿到播放地址
                videoService.getVideoPreviewUrl(index).then((ret) => {
                    this.videoUrl = ret.video
                    // this.row = row
                    this.$refs.videoPreview.show(this.form.material_name) //返回视频的数据后显示弹窗
                })
            },
            // 图片上传完毕
            handleImgUploaded(data, ext) {
                courseService.commonUploadImageBaseSection({
                    // section_id: this.section.currentID,
                    alias: Date.now() + ext,
                    image: data
                }).then((ret) => {
                    this.form.image = ret.url
                })
            },
            submit (form) { // 表单提交
            this.form.category_id = this.$store.state.index.examCate
            this.form.tags = this.courseTags ? this.courseTags.join(',') : ''
                this.$refs[form].validate((valid) => {
                    if (valid) {
                        this.form = Object.assign(this.form, this.sign)
                        let reqFn, msg 
                        if (this.courseId) {
                            this.form.gov_id = this.courseId
                            reqFn = examService.updateCourse
                            msg = '修改成功'
                        }else{
                            reqFn = examService.addCourse
                            msg= '添加成功'
                        }
                        transformParam(this.form)
                        console.log(this.form)
                        reqFn(this.form,this.courseId).then(() => {
                            xmview.showTip('success', msg)
                        }).then(() => {
                            this.$router.push({name: 'exam-course-manage'})
                        }).catch((ret) => {
                            xmview.showTip('error', ret.message)
                        })
                    } else {
                        return false
                    }
                })
            }
        },

    }
</script>
