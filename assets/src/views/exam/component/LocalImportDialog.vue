<!--
Attribute:
 - templateUrl: String 模板地址
 - onSuccess: Function (response, file, fileList) :{success, error, reason} 成功回调
 - title: String 标题
 - uploadUrl: String 上传地址

Slot:
 - footer: 底部备注
-->
<style lang='scss' rel='stylesheet/scss'>
    #dialog-local-import {
        .upload-file, .download-template, .upload-file-result {
            margin: 0 auto;
            width: 360px;
            text-align: center;
            margin-bottom: 15px;
        }
        .upload-file-result{
            height: 185px;
            .el-progress{
                line-height: 180px;
                width: 300px;
                margin: 0 auto;
            }
            .show-response{
                height: 38px;
                margin-top:75px;
                text-align: center;
            }
            .el-upload-dragger:hover{
                border: 1px dashed #d9d9d9;
            }
        }
        .error-reason {
            color: #FF4949;
            margin-bottom: 15px;
        }
        .ok-reason {
            color: #13CE66;
            margin-bottom: 15px;
        }
        .color-success {
            color: #13CE66;
        }
        .color-error {
            color: #FF4949;
        }
        .download-template{
            a{
                color: #20a0ff;
                text-decoration: none;
            }
            a:hover {
                color: #1D8CE0;
            }
        }
    }
</style>
<template>
    <el-dialog append-to-body id="dialog-local-import" :title="title" :visible.sync="isOpen" @click.native.stop @close="onClose">
        <el-upload
                class="upload-file"
                drag
                :action="uploadUrl"
                :multiple="multiple"
                :headers="headers"
                :show-file-list="false"
                v-show="showUploading"
                :on-progress="progress"
                :on-error="error"
                :before-upload="beforeUpload"
                :on-success="success"
                :data="extradata"
                :name="name"
                :auto-upload="true"
                >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
        <div class="upload-file-result" v-show="!showUploading">
            <div class="el-upload el-upload--text">
                <div class="el-upload-dragger">
                    <el-progress v-show="uploadStatus == 0" :text-inside="true" :stroke-width="18" :percentage="percent"></el-progress>
                    <div class="show-response" v-show="uploadStatus == 1">
                        <p v-show="response.success > 0"><i class="el-icon-circle-check color-success"></i>&nbsp;成功: {{ response.success }} 条</p>
                        <p v-show="response.error > 0"><i class="el-icon-circle-cross color-error"></i>&nbsp;失败: {{ response.error }}  条</p>
                    </div>
                    <div class="show-response" v-show="uploadStatus == 2">
                        <p style="line-height: 38px"><i class="el-icon-circle-cross color-error"></i>上传失败</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="download-template" v-if="templateUrl"><a v-bind:href="templateUrl" target="_blank">下载参考模板</a></div>
        <article class="ok-reason" v-show="response.result">
            <h5>上传结果：</h5>
            <h5>A1题型: {{  response.results.a1cnt }} 条</h5>
            <h5>A2题型: {{  response.results.a2cnt }} 条</h5>
            <h5>A3题型: {{  response.results.a3cnt }} 条</h5>
            <h5>A4题型: {{  response.results.a4cnt}} 条</h5>
        </article>
        <article class="error-reason" v-show="response.reasons.length > 0">
            <h5>错误原因：</h5>
            <h5 v-for="reason in response.reasons">{{ reason.message }}</h5>
        </article>
        <slot name="footer"></slot>
    </el-dialog>
</template>
<script>
    import authUtils from '../../../utils/authUtils'
    // import NestedDialog from 'components/dialog/NestedDialog.vue'

    export default {
        components: {},
        props: {
            templateUrl: {
                type: String,
                required: false
            },
            onSuccess: {
                type: Function,
                required: false
            },
            onSave:{
                type: Function,
                required: false,
                default() {  return ()=>{} }
            },
            onClose: {
                type: Function,
                required: false,
                default() {  return ()=>{} }
            },
            title: {
                type: String,
                required: true
            },
            uploadUrl: {
                type: String,
                required: true
            },
            name:{
                type: String,
            },
            extradata:{
                type: Object,
            },
            multiple:{
                type: Boolean,
            }
        },
        data () {
            return {
                isOpen: false,
                headers: {
                    'Authorization': 'Bearer ' + authUtils.getAuthToken(),
                    'TwoStep': `Bearer ` + authUtils.getTwiceToken() // 二次验证的token
                },
                showUploading: true,
                isSuccess: true,
                percent: 0,
                uploadStatus: 0, //0：上传前;1：返回值有对有错; 2:上传失败
                response: {
                    success: 0,
                    error: 0,
                    reasons: [],
                    result:null,
                    results:{
                        a1cnt:'',
                        a2cnt:'',
                        a3cnt:'',
                        a4cnt:'',
                    },
                },
            }
        },
        activated () {
            this.response={}
            console.log(this.extradata)
        },
        methods: {
            open () {
                this.uploadStatus = 0
                this.showUploading = true
                this.isOpen = true
                this.response.success = 0
                this.response.error = 0
                this.response.reasons = []
                this.response.result = null
            },
            close () {
                this.isOpen = false
            },
            success (response, file, fileList) {
                // this.$emit('success')
                this.isSuccess = true
                this.uploadStatus = 1

                if (response.code !== 0) { //上传失败
                    this.response.success = 0
                    this.response.error = 1
                    this.response.reasons = [{message: response.message}]
                    return
                }
                if(response.code == 0){
                    this.response.success = response.data.total
                    this.response.results=this.response.result = response.data
                    console.log(this.response.result.length,this.response.result)
                    // this.response.error = 0
                    // this.response.reasons = [{message: response.data}]
                }

                // this.response.success = response.data.success
                if (response.data.errs) {
                    this.response.error = response.data.failure || 1
                    response.data.errs.forEach((message) => {
                        this.response.reasons.push({
                            message: message
                        })
                    })
                }
                
                if (this.onSuccess) {
                    // let param=this.extradata
                    // var formData = new FormData()
                    // formData.append('input',file)
                    // formData.append('category_id',this.$store.state.index.examCate)
                    // formData.append('chapter_id',110)
                    // // {
                    //     category_id:this.$store.state.index.examCate,
                    //     chapter_id:110,
                    //     input:file
                    // }
                    // this.onSuccess(response.data, file, fileList).then(({success, error, reasons}) => {
                    this.onSuccess(response) //把子组件的返回值返给父组件
                }
            },

            progress (event) {
                this.percent = parseInt(event.percent)
            },
            error (err) {
                if(err.status === 403){
                    xmview.showTip('error', '您没有权限执行该操作')
                }

                this.uploadStatus = 2
                this.isSuccess = false
            },
            beforeUpload () {
                this.uploadStatus = 0
                this.showUploading = false
            },
        }
    }
</script>
