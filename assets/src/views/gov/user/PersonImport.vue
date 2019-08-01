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
            padding: 5% 10% 10%;
            .cate{
                .region-container{
                    float: left;
                }
                .delUser{
                    float: right;
                }
            }
            .temp-item {
                // width:44%;
                display: inline-block;
                border: 1px solid #ededed;
                border-radius: 10px;
                height: 50%;
                 &:first-of-type {
                            margin-left: 10%;
                            margin-top: 3%;
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
            <el-form class="cate" label-width="120px" :model="form"  ref="cate">
                <el-form-item label="部门"  prop="province_id">
                    <Region :province="form.province_id" v-model="form.province_id"
                            :city="form.city_id"
                            :area="form.area_id"
                            title=""
                            v-on:provinceChange="val => form.province_id = val"
                            v-on:cityChange="val => form.city_id = val"
                            v-on:areaChange="val => form.area_id = val"
                            >
                    </Region>
                    <el-button type="danger" icon="minus" class="delUser" @click="delUser">清空下属部门</el-button>
                </el-form-item> 
            </el-form>         
            <!-- <section class="temp-item" >
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
            </section> -->
              <section class="temp-item" >
                <div class="content">
                     <div >
                        <img src="../../../assets/images/up.png" alt="">
                    </div>
                    <div>
                        <el-button type="primary" icon="plus"  @click="openDailog">上传文件</el-button>
                    </div>
                </div>
                <br/>
            </section>
        </article>
         <LocalImportDialog
                :onSuccess="importQuestion"
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
    import userService from '../../../services/gov/userService.js'
    import examService from '../../../services/exam/examService'
    import LocalImportDialog from '../component/LocalImportDialog.vue'
    import authUtils from '../../../utils/authUtils'
    import config from '../../../utils/config'
    import Region from '../../component/select/RegionImport.vue'
    // import Region from '../../component/select/Region.vue'
    export default {
        components: {
           LocalImportDialog,Region
        },
        name:'user-import',
        data () {
            return {
                form:{
                    province_id : '', // 省
                    city_id: '',  // 市
                    area_id: '',  // 区
                    pid: void -1,
                },
                showUploading: true,
                isSuccess: true,
                uploadUrl: config.apiHost+'/user/import',
                uploadUrlParams:'',
                response: {
                    success: 0,
                    error: 0,
                    reasons: [],
                },
                params:{ 
                    category_id:this.$store.state.index.examCate,
                    chapter_id:void 0,
                    },
                name:'input'
            }
        },
        created () {
                xmview.setContentLoading(false)
        },
        watch:{
            'form.province_id'(){
                this.uploadUrlParams=`/${this.form.province_id}`
                this.uploadUrl=config.apiHost+'/user/import'+this.uploadUrlParams
            },
            'form.city_id'(){
                this.uploadUrlParams=`/${this.form.province_id}/${this.form.city_id}`
                this.uploadUrl=config.apiHost+'/user/import'+this.uploadUrlParams
            },
            'form.area_id'(){
                this.uploadUrlParams=`/${this.form.province_id}/${this.form.city_id}/${this.form.area_id}`
                this.uploadUrl=config.apiHost+'/user/import'+this.uploadUrlParams
            }
        },
        methods: {
            delUser(){
                 if(typeof(this.form.area_id)!=='number'){
                    xmview.showTip('error', "请先选择三级所属部门")
                    return
                }
                 xmview.showDialog(`你将要清空选择项的 <span style="color:red">下属部门</span> 确认吗?`, () => {
                let param=this.uploadUrl
                userService.delUser(this.uploadUrlParams)
               })

            },
            openDailog(){
                if(typeof(this.form.area_id)!=='number'){
                    xmview.showTip('error', "请先选择三级所属部门")
                    return
                }
                this.uploadUrlParams=`/${this.form.province_id}/${this.form.city_id}/${this.form.area_id}`
                this.$refs['localImportDialog'].open()
            },
            importQuestion (response) {
                    let reasons = []
                    if (response.errs) {
                        response.errs.forEach((message) => {
                            reasons.push({
                                message: message
                            })
                        })
                    }
            },
        }
    }
</script>
