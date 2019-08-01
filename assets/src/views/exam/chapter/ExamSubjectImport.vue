<!--课程任务模板-->
<style lang='scss' rel="stylesheet/scss">
    @import "../../../utils/mixins/mixins";
    @import "../../../utils/mixins/topSearch";
    @import "../../../utils/mixins/common";

    .exam-subject-import {
        @extend %content-container;
        
        .search {
            @extend %top-search-container;
        }

        .manage-container {
            @extend %right-top-btnContainer;
        }

        .temp-container{
            width:100%;
            height:100%;
            padding: 10% 10%;
            .temp-item {
                width:44%;
                display: inline-block;
                border: 1px solid #ededed;
                border-radius: 10px;
                height: 50%;
                 &:first-of-type {
                            margin-right: 10%;
                        }
                .content {
                    padding: 20px 40px 0;
                    div{
                        position: relative;
                        display: inline-block;
                        padding:10% 0;
                        width:49%;
                        height:100%;
                        line-height: 49%;
                        text-align: center;
                        img{
                            width: 100%;
                            vertical-align: middle
                        }
                        a{
                            color:#fff;
                            text-decoration : none;
                        }
                        .upload-demo{
                            position: absolute;
                            display: inline-block;
                            width: 100%;
                            height: 100%;
                            left:0;
                            opacity: 0;
                        }
                    }
                }
            }
        }
    }
</style>
<template>
    <article class="exam-subject-import">
         <article class="temp-container" >
            <el-form class="cate" label-width="120px" :model="form"  :rules="rules" ref="cate">
                <el-form-item  label="所属栏目" v-if="$route.params.chapterInfo.chapter_type!==4 " prop="chapter_id">
                    <Section-category-menu  :placeholder="form.chapter_name" :autoClear="true" v-model="form.chapter_id" :reqFun="reqFun"></Section-category-menu>
                </el-form-item>
            </el-form>         
            <section class="temp-item" >
                <div class="content">
                    <div >
                        <img src="../../../assets/images/down.png" alt="">
                    </div>
                    <div>
                        <a href="http://upload.yxt.vodjk.com/import_tpl/exam_import_tpl.xlsx" target="_blank">
                            <el-button type="primary" icon="plus" >下载模板 </el-button>
                        </a>
                    </div>
                        
                </div>
                <br/>
            </section>
              <section class="temp-item" >
                <div class="content">
                     <div >
                        <img src="../../../assets/images/up.png" alt="">
                    </div>
                    <div>
                        <el-button type="primary" icon="plus"  @click="openDailog">上传文件</el-button>
                        <!-- <input type="file" class="upload-demo" name="upload" /> <br /> -->
                        <!-- <el-upload
                            class="upload-demo"
                            drag
                            :multiple="false"
                            :headers="headers"
                            :show-file-list="false"
                            :on-success="success">
                        </el-upload> -->
                    </div>
                </div>
                <br/>
            </section>
        </article>
         <LocalImportDialog
                :onSuccess="importQuestion"
                :onSave="save"
                :multiple="false"
                ref="localImportDialog"
                title="导入试题"
                :uploadUrl="uploadUrl"
                :extradata="params"
                :name='name'
              >
            <article slot="footer">
                <hr style="margin-bottom: 15px;">
                <h5>注意事项：</h5>
                <h5>1.模板中字段请对照填写，不能为空</h5>
                <h5>2.如果有某些内容为空，导入时将跳过</h5>
            </article>
        </LocalImportDialog>
    </article>
</template>
<script>
    import SectionCategoryMenu from '../../component/select/SectionCategoryMenu.vue'
    import examService from '../../../services/exam/examService'
    import LocalImportDialog from '../component/LocalImportDialog.vue'
    import authUtils from '../../../utils/authUtils'
    import config from '../../../utils/config'
    export default {
        components: {
            SectionCategoryMenu,LocalImportDialog
        },
        name:'exam-subject-import',
        data () {
            return {
                form:{
                    chapter_id:void 0,
                    chapter_name:'',
                    chapter_type:'',
                    category_id:'',
                },
                rules: {
                    chapter_id: { required: true, type: 'number', message: '请选择试题栏目', trigger: 'change' },
                },
                showUploading: true,
                isSuccess: true,
                percent: 0,
                uploadStatus: 0,
                uploadUrl: config.apiHost+'/exam/subject/parse',
                response: {
                    success: 0,
                    error: 0,
                    reasons: [],
                },
                params:{ 
                    category_id:void 0,
                    chapter_id:void 0,
                    },
                name:'input'
            }
        },
        created () {
            console.log('this',this);
            // console.log(typeof(this.$route.params.chapterInfo.id),this.$route.params.chapterInfo)
            if(this.$route.params.chapterInfo){
                for(let i in this.$route.params.chapterInfo){
                    this.form[i]=this.$route.params.chapterInfo[i]
                }
                xmview.setContentTile(`试题导入- ${this.form.chapter_name}`)
                if(this.form.chapter_type==4){ //导入传参
                    this.params={
                        category_id:this.form.category_id,
                        chapter_id:this.form.chapter_id,
                    }
                }
            }else{
                xmview.showTip('warning', "请先选择试题所属分类")
                this.$router.back()
                return
            }
                xmview.setContentLoading(false)
        },
        watch:{
            '$store.state.index.examCate'(){
                if(this.form.chapter_type==4) return
                this.params={
                    category_id:this.$store.state.index.examCate,
                    chapter_id:this.form.chapter_id,
                    }
            },
            'form.chapter_id'(){
                if(this.form.chapter_type==4) return
                this.params={
                    category_id:this.$store.state.index.examCate,
                    chapter_id:this.form.chapter_id,
                    }
            }
        },
        methods: {
            openDailog(){
                // console.log(typeof(this.form.chapter_id),'this.form.chapter_id=============='+this.form.chapter_id)
                if(typeof(this.form.chapter_id)!=='number'&&this.$route.params.chapterInfo.chapter_type!==4){
                    xmview.showTip('error', "请先选择试题所属栏目")
                    return
                }
                this.$refs['localImportDialog'].open()

                
            },
            save(response){
                let param = {save_sign:response}
                return examService.subjectSave(param).then((ret) => {
                })
            },
            importQuestion (response) {
                // return false
                // console.log('importQuestion')
                // console.log(file)
                //    var formData = new FormData()
                //     formData.append('input',file)
                //     formData.append('category_id',this.$store.state.index.examCate)
                //     formData.append('chapter_id',110)
                //     examService.upload(formData).then((ret) => {
                    let reasons = []
                    if (response.errs) {
                        response.errs.forEach((message) => {
                            reasons.push({
                                message: message
                            })
                        })
                    }
                    // return {
                    //     success: response.data,
                    //     error: response.failure,
                    //     reasons: reasons,
                    // }
                
                // }).then((ret)=>{
                    examService.subjectSave({save_sign:response.data.save_sign}).then((ret) => {
                        xmview.showTip('success', '保存成功')
                    })
                // })
                 
            },
            // upload(file){
            //     let params={
            //         category_id:this.$store.state.index.examCate,
            //         chapter_id:this.form.chapter_id,
            //         input:file
            //     }

            //     examService.upload(params)
                
            // },
            reqFun(param){
                return examService.fetchChapterCategory({
                    pid: 0,
                    pagesize:-1,
                    chapter_type:this.$route.params.chapterInfo.chapter_type,
                    category_id:this.$store.state.index.examCate
                })
        },
      
        }
    }
</script>
