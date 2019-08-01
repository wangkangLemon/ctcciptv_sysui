<template>
    <div class="el-card edit-content">
        <el-card class="edit-content">
            <el-form label-position="right" label-width="90px" :rules="rules" :model="selectData" ref="form">
                <el-form-item label="章节名称" prop="name">
                    <el-input v-model="selectData.name" ></el-input>
                </el-form-item>
                <!-- <el-form-item label="章节类型" prop="chapter_type">
                    <el-select v-model="selectData.chapter_type" placeholder="请选择" disabled >
                        <el-option label="课程章节" :value="1"></el-option>
                        <el-option label="习题章节" :value="2"></el-option>
                        <el-option label="历年真题" :value="3"></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="栏目图片" prop="image">
                    <UploadImg ref="uploadImg" :defaultImg="selectData.image" :url="uploadImgUrl"  :onSuccess="handleImgUploaded" :data='uploadextraData'></UploadImg>
                </el-form-item>
                <el-form-item label="简介" prop="remark">
                    <el-input v-model="selectData.remark" ></el-input>
                </el-form-item>
                <el-form-item label="分类排序" prop="sort">
                    <el-input placeholder="最小的排在前面"  v-model="selectData.sort"></el-input>
                </el-form-item>
                <el-form-item label="是否最终菜单" prop="ended" v-if="checkended">
                    <el-radio-group v-model="selectData.ended" >
                        <el-radio :label="0">否</el-radio>
                        <el-radio :label="1">是</el-radio>
                    </el-radio-group>
                </el-form-item >
                <el-form-item>
                    <el-button type="info"  @click="save">保存</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script>
    import UploadImg from '../../component/upload/UploadImg.vue'
    import commonService from '../../../services/commonService'
    import authUtils from '../../../utils/authUtils.js'
    export default {
        components: {
            UploadImg
        },
        data() {
            return {
                SecMenu: [],
                selectData: setSelectData(),
                uploadImgUrl: '',
                rules: {
                    name: [
                        {required: true, message: '请输入章节名称', trigger: 'blur'},
                        {
                            min: 1,
                            max: 16,
                            message: '长度不得大于 16 个字符'
                        },{
                            pattern:  /\S$/,
                            message: '请输入非空格或非特殊字符的章节名称'
                        }
                    ],
                    chapter_type: [
                        {required: true,type:'number', message: '请输入	章节类型', trigger: 'blur'},
                    ],
                    image: [
                        {required: true, message: '请上传图片', trigger: 'blur'}
                    ]
                },
                uploadextraData:{
                    biz:'course',
                    extpath:'category'
                }
            }
        },
        //                                                是否最终极
        props: ['data', 'type','category','chaptertype','checkended'],

        watch: {
            'type' () {
                this.initData()
            },
            'data' () {
                //判断是否存在传过来的数据 有则使用无则初始化
                if (this.data) {
                    this.selectData = Object.assign({}, this.data)
                }
            }
            // '$store.state.index.secMenu'(){
            //     this.selectData = Object.assign({},this.$store.state.index.secMenu)
            // }
        },
        activated () {
            this.uploadImgUrl = commonService.commonUploadImage()
            this.selectData.category_id=this.category
            this.selectData.chapter_type=this.chaptertype
            xmview.setContentLoading(false)
            
        },
        methods: {
            initData() {
                this.selectData  = setSelectData()
            },
            save() {
                // xmview.showDialog(this.selectData, () => {
                this.$refs.form.validate((valid) => {
                    if (!valid) {
                        return false
                    }    
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
                    chapter_type: void 0,
                    name: '',
                    image: null,
                    remark :'',
                    sort:void 0,
                    ended:0,
                    pid: void 0, //父级id
                }
    }
</script>