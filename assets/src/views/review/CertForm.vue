<!--医师资格申请列表：添加/修改-->
<style lang="scss" rel="stylesheet/scss">
    @import "../../utils/mixins/common";
    #medical-form {
        @extend %content-container;
        // display: flex;
         .upload-avatar{
            // width:35%;
            text-align: center;
            .img-container {
                margin: 20px auto;
                width: 355px;
                height: 170px;
                position: relative;
                    >img {
                        width: 100%;
                        height: 100%;
                    }
                    .el-button{
                        // position: absolute;
                        // bottom:-50px;
                        right:45%;
                    }
            }
        }
        .show-detail{
            // width:55%;
            .avatar{
                width:100%;
                height:100%;
                img{
                    width:100%;
                }
            }
            .info{
          
            }
        }
        .el-dialog--small {
            width: 55%;
        }
        
        .submit-form {
        // width: 55%;
        padding: 20px;
            .el-form{
                // width:100%;
                .subButton {
                    margin-left: 45%;
                }
                .el-input{
                    width: 60%;
                }
            }
        }
    }
</style>
<template>
    <main id="medical-form">
          <!--详情-->
        <el-dialog class="show-detail" title="图片详情" v-model="showDetail">
            <div class="avatar">
                <img :src="{url:fetchParam.image} | defaultAvatar" />
            </div>
        </el-dialog>
        <div class="upload-avatar">
            <div class="img-container">
                <img :src="fetchParam.image|fillImgPath" v-show="fetchParam.image"/>
                 <!--<img :src="{url:clerkDetail.avatar, sex: clerkDetail.sex} | defaultAvatar" />-->
            </div>
            <div><el-button type="primary" @click="bigger">查看</el-button></div>
        </div>   
        <div class="submit-form">   
            <el-form label-width="120px" ref="form" :rules="rules" :model="fetchParam" >
                <el-form-item label="资格证书类型" prop="type" :label-width="formLabelWidth">
                    <el-select v-model="fetchParam.type" placeholder="请选择">
                        <el-option label="执业医师" :value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户" prop="user_name" :label-width="formLabelWidth">
                    <el-input v-model.name="fetchParam.user_name"></el-input>
                </el-form-item>
                <!-- <el-form-item prop="mark" label="标记" :label-width="formLabelWidth">
                    <el-radio class="radio" v-model="fetchParam.mark" :label="'vip原价'" :value="'vip_original'">vip原价</el-radio>
                    <el-radio class="radio" v-model="fetchParam.mark" :label="'vip打折'" :value="'vip_discount'">vip打折</el-radio>
                </el-form-item> -->
                <el-form-item label="审核人" prop="admin_name" :label-width="formLabelWidth">
                    <el-input v-model="fetchParam.admin_name" >
                    </el-input>
                </el-form-item>
                <el-form-item label="" >
                    <!-- <el-button type="primary" class="subButton" @click="btnNextClick">确认</el-button> -->
                </el-form-item>
            </el-form>
        </div>
    </main>
</template>

<script>
    import reviewService from '../../services/reviewService'
    import commonService from '../../services/commonService.js'
    import govService from '../../services/gov/govService.js'
    import Hospitals from '../component/select/Hospitals.vue'
    import {fillImgPath} from '../../utils/filterUtils.js'

    function clearFn() {
        return {
            typeSelect: '',
            provinceSelect: '',
            citySelect: '',
            areaSelect: '',
            townSelect: '',
            villageSelect: '',
            name: ''
        }
    }
    export default {
        name: 'review-CertForm-edit',
        components: {
           Hospitals
        },
        data() {
            return {
                fillImgPath:'',
                loadingData: false,
                currentData: {
                    data: {},
                    pindex: -1,
                    index: -1
                },
                fetchParam: getOriginData(),
                // passValue: true,
                role_list:[
                    {
                        name: '管理员',
                        id: 1
                    },
                    {
                        name: '部门人员',
                        id: 0
                    },
                ],
                rules: {
                    gov_id:{ required: true },
                    name: { required: true, message: '请输入姓名'},
            },
                multi: {
                    data: [{
                        id: -1
                    }],
                },
                resultData: [],
                hospital_list:[],
                formLabelWidth: '120px', // 表单label的宽度
                changelist:{},
                showDetail: false,     // 是否显示详情对话框
                certType: ['', '执业医师'] ,
            }
        },
        created() {
            xmview.setContentLoading(false);
                if (this.$route.params.id != undefined) {    //路由id传递
                console.log(this.$route.params.certInfo)
                
                    this.fetchParam=this.$route.params.certInfo
                    // reviewService.getCert(this.$route.params.id).then((ret) => {
                    //     this.fetchParam = ret
                    //     this.fillImgPath = ret.image
                    //     console.log(ret.image)
                    //     // this.fetchParam.role_id = ret.course.role_id
                    // })
                } 
            //暂时不获取角色列表       
            this.loadingData=false
        },
        methods: {
            bigger(){
                this.showDetail = true
            },
            // 裁切后的回调
            cropperFn(data, ext) {
                commonService.uploadExpertsAvatar({
                    image: data,
                    alias: `${Date.now()}${ext}`,
                }).then((ret) => {
                    xmview.showTip('success', '上传成功')
                    this.fetchParam.image = data
                    this.fetchParam.image= ret.url
                }).catch((ret) => {
                    xmview.showTip('error', ret.message)
                })
            },
            
            btnNextClick() {
                this.$refs['form'].validate((valid) => {
                    if (!valid) return
                    console.log(this.fetchParam)
                    let req = reviewService.CertCreate
                    if (this.fetchParam.id) req = reviewService.CertEdit
                    req(this.fetchParam).then((ret) => {
                        // 重置当前数据
                        //this.$refs[fetchParam].resetFields();//自己加的方法
                        xmview.showTip('success', '数据提交成功')
                        // this.fetchParam=getOriginData(),
                        this.$refs['form'].resetFields();
                        this.currentData = {
                            data: [],
                            pindex: -1,
                            index: -1
                        }
                        if (!this.fetchParam.id) this.fetchParam.id = ret.id;
                        this.$router.go(-1)
                    })
                })
            },
            
      
        }
    }

    function getOriginData() {
        return {
            name: '',
            description: '',
            mark: void 0,
            price:'',
            admin_name:'暂无'
        }
    }

</script>