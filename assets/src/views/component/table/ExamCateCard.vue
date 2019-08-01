<template>
    <div class="el-card edit-content">

        <el-card class="edit-content">
            <el-form label-position="right" label-width="90px" :rules="rules" :model="selectData" ref="form">
                <el-form-item label="栏目名称" prop="name">
                    <el-input v-model="selectData.name" ></el-input>
                </el-form-item>
                <el-form-item label="课程价格" prop="price">
                    <el-input placeholder="单位（元）"  v-model="selectData.price"></el-input>
                </el-form-item>
                <el-form-item label="栏目图片" prop="image">
                    <UploadImg ref="uploadImg" :defaultImg="selectData.image" :url="uploadImgUrl"  :onSuccess="handleImgUploaded" :data='uploadextraData'></UploadImg>
                </el-form-item>
                <el-form-item label="简介" prop="remark">
                    <el-input v-model="selectData.remark" ></el-input>
                </el-form-item>
                <el-form-item  label="关联商品" prop="product_id" >
                    <Product v-model="selectData.product_id" :placeholder="selectData.product_name" ref="Product" :disabled="this.type=='update'"
                            v-on:change="val=>selectData.product_id=val" :change="reqFun2" :list="changelistc">
                    </Product>
                </el-form-item>
                <el-form-item label="分类排序" prop="sort">
                    <el-input placeholder="最小的排在前面"  v-model="selectData.sort"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="info"  @click="save">保存
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>

    </div>
</template>
<script>
    import UploadImg from '../../component/upload/UploadImg.vue'
    import commonService from '../../../services/commonService'
    import authUtils from '../../../utils/authUtils.js'
    import Product from '../../component/select/CommonSelect.vue'
    import financeService from '../../../services/finance/financeService.js'
    export default {
        name:'exam-cate-card',
        components: {
            UploadImg,Product
        },
        data() {
              var validatePass = (rule, value, callback) => {
                if (value==undefined ) {
                    callback(new Error('请选择关联商品'))
                }
                callback()
            }
            return {
                SecMenu: [],
                selectData: setSelectData(),
                uploadImgUrl: '',
                rules: {
                    name: [
                        {required: true, message: '请输入栏目名称', trigger: 'blur'},
                        {
                            min: 1,
                            max: 16,
                            message: '长度不得大于 16 个字符'
                        },{
                            pattern:  /\S$/,
                            message: '请输入非空格或非特殊字符的栏目名称'
                        }
                    ],
                    chapter_type: [
                        {required: true, type:'number',message: '请输入	章节类型', trigger: 'blur'},
                    ],
                    image: [
                        {required: true, message: '请上传图片', trigger: 'blur'}
                    ],
                    product_id: {required: true,validator: validatePass, trigger: 'change'},

                },
                uploadextraData:{
                    biz:'course',
                    extpath:'category'
                },
                changelistc:[],//关联商品列表
                originProductId:void 0,
            }
        },
        props: ['data', 'type','category','chaptertype'],
        watch: {
            'type' () {
                this.initData()
            },
            'data' () {
                //判断是否存在传过来的数据 有则使用无则初始化
                if (this.data) {
                    this.selectData = Object.assign({}, this.data)
                    this.originProductId=this.selectData.product_id
                    this.selectData.product_id= this.selectData.product_name
                }
            },
        },
        activated () {
            this.originProductId=void 0,
            this.selectData.category_id=this.category
            this.selectData.chapter_type=this.chaptertype
            xmview.setContentLoading(false)
            this.uploadImgUrl = commonService.commonUploadImage()
        },
        methods: {
             //商品搜索
            reqFun2(val, length){
                let param={
                    page: parseInt(length / 15) + 1||1,
                    pagesize: 15,
                    name:val,
                }
                let _this=this
                return financeService.fetchProductList(param)
                .then((ret)=>{
                    if(param.page==1){
                        ret.data=[{id:0,name:'免费直播'}].concat(ret.data)
                        _this.$emit('changelistc', ret.data)
                    }else{
                        _this.$emit('changelistc', ret.data)
                    }
                    // _this.changelistc = ret.data //会改变数据 让列表显示当前
                    return ret
                })
            },
            initData() {
                this.selectData  = setSelectData()
            },
            save() {
                this.$refs.form.validate((valid) => {
                    if (!valid) {
                        return false
                    }    
                    this.selectData.product_name=''
                    if(typeof(this.selectData.product_id)=='string'){
                        this.selectData.product_id=this.originProductId
                    }
                    console.log(' this.selectData',this.selectData);
                    this.$emit('handleSave', this.selectData)
                })
            },
            // 图片上传完毕
            handleImgUploaded (response) {
                this.selectData.image = response.data.url
            },
            // 重置表单
            resetForm () {
                this.$refs.form.resetFields()
            },
        }
    }

    function setSelectData(){
        return {
                    category_id:void 0,
                    price: void 0,
                    name: '',
                    image: null,
                    remark :'',
                    sort:void 0,
                    product_id:void 0,
                    product_name:'',
                }
    }
</script>