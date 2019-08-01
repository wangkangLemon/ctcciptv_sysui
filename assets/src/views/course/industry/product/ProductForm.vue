<!--课程表单：添加/修改-->
<style lang="scss" rel="stylesheet/scss">
    @import "../../../../utils/mixins/common";
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
    }
    }
</style>
<template>
    <main id="medical-form">
        <section class="submit-form">   
            <el-form label-width="120px" ref="form" :rules="rules" :model="fetchParam" >
                <el-form-item label="药品名称" prop="name">
                    <el-input v-model="fetchParam.name"></el-input>
                </el-form-item>
                <el-form-item prop="image" label="封面">
                    <div class="img-wrap" v-if="fetchParam.image">
                        <img :src="fetchParam.image | fillImgPath" width="200" height="112" alt=""/>
                    </div>
                    <ImagEcropperInput :isRound="false" :confirmFn="cropperFn"
                        class="upload-btn">
                    </ImagEcropperInput>
                </el-form-item>
                <el-form-item label="药品单价(分)" prop="price">
                    <el-input-number type="number" :min="0" v-model="fetchParam.price"></el-input-number>
                </el-form-item>
                <el-form-item label="建议零售价(分)" prop="retail_price">
                    <el-input-number :min="0" v-model="fetchParam.retail_price"></el-input-number>
                </el-form-item> 
                <el-form-item label="最低订购数量" prop="min_order">
                    <el-input-number :min="0" v-model="fetchParam.min_order"></el-input-number>
                </el-form-item> 
                <el-form-item label="药品单位" prop="unit">
                    <el-input v-model="fetchParam.unit"></el-input>
                </el-form-item>
                <el-form-item label="药品简介" prop="summary">
                    <el-input v-model="fetchParam.summary" type="textarea" :autosize="{ minRows: 2, maxRows: 7}" placeholder="请输入内容">
                    </el-input>
                </el-form-item>
                <el-form-item prop="explanation" label="详细说明" id="editor">
                    <vue-editor v-model="fetchParam.explanation" @ready="ueReady"></vue-editor>
                </el-form-item>
                <el-form-item label="" >
                    <el-button type="primary" @click="btnNextClick">确认</el-button>
                </el-form-item>
            </el-form>
        </section>
    </main>
</template>

<script>
    import industryService from '../../../../services/course/industryService.js'
    import ImagEcropperInput from '../../../component/upload/ImagEcropperInput.vue'
    import commonService from '../../../../services/commonService.js'
    import VueEditor from '../../../component/form/UEditor.vue'
    export default {
        name: 'industry-product-edit',
        components: {
            ImagEcropperInput,VueEditor
        },
        data() {
            return {
                loadingData: false,
                fetchParam: getOriginData(),
                rules: {
                    name:[
                        {required: true, message: '必须输入', trigger: 'blur'},
                        ,{
                            pattern:  /\S$/,
                            message: '请输入非空格或非特殊字符的内容'
                        }
                    ],
                    unit:[
                        {required: true, message: '必须输入', trigger: 'blur'},
                        ,{
                            pattern:  /\S$/,
                            message: '请输入非空格或非特殊字符的内容'
                        }
                    ],
                    image: { required: true, message: '请上传封面', trigger: 'change' },
                    price: [{ required: true, type:'number', message: '请输入药品金额',trigger: 'blur'}
                            ,{
                            pattern:  /^\d+$/,
                            message: '请输入整数'
                        }],
                    summary: { required: true, message: '请输入药品简介',trigger: 'blur'},
                    retail_price: [{required: true,type:'number', message: '请输入建议零售价', trigger: 'blur'},{
                            pattern:  /^\d+$/,
                            message: '请输入整数'
                        }],
                    min_order: [{required: true,type:'number', message: '请输入最低订购数量', trigger: 'blur'},{
                            pattern:  /^\d+$/,
                            message: '请输入整数'
                        }],
            },
                changelist:{}
            }
        },
        // watch:{
        //     'fetchParam.price'(){
        //         this.fetchParam.price=Number(this.fetchParam.price)
        //         console.log('typeof(this.fetchParam.price)===='+typeof(this.fetchParam.price));
        //     }
        // },
        created() {
            xmview.setContentLoading(false)
            if (this.$route.params.id != undefined) {    //路由id传递
                industryService.getDrug(this.$route.params.id).then((ret) => {
                    this.fetchParam = ret
                    // this.fillImgPath = ret.image
                    // this.fetchParam.role_id = ret.course.role_id
                })
            } 
            //暂时不获取角色列表       
            this.loadingData=false
        },
        methods: {
            ueReady (ue) {
                this.editor = ue
            },
            //裁剪图片
            cropperFn (data, ext) {
                commonService.commonUploadAvatar({
                    image: data,
                    alias: `${Date.now()}${ext}`,
                    biz: 'industry',
                    extpath: 'drug',
                }).then((ret) => {
                    this.fetchParam.image = ret.url 
                })
            },
            getExpertsList (val, length) {
                return industryService.fetchDrugList({
                    name: val,
                    pagesize: this.pageSize,
                    page: parseInt(length / this.pageSize) + 1
                }).then((ret) => {
                    this.$emit('changelist', ret)
                    this.changelist = ret;
                    return ret
                })
            },
            btnNextClick() {
                this.$refs['form'].validate((valid) => {
                    if (!valid) return
                    console.log(this.fetchParam)
                    let req = industryService.createDrug
                    if (this.fetchParam.id) req = industryService.editDrug
                    req(this.fetchParam,this.fetchParam.id).then((ret) => {
                        // 重置当前数据
                        //this.$refs[fetchParam].resetFields();//自己加的方法
                        xmview.showTip('success', '数据提交成功')
                        // this.fetchParam=getOriginData(),
                        this.$refs['form'].resetFields();
                        if (!this.fetchParam.id) this.fetchParam.id = ret.id;
                        this.$router.go(-1)
                    })
                })
            }
        }
    }

    function getOriginData() {
        return {
            name: '',
            image:'',
            summary: '',
            price:void 0,
            explanation:'',
            retail_price:void 0,
            min_order:void 0,

        }
    }

</script>