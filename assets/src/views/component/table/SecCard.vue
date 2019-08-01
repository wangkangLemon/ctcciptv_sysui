<template>
    <div class="el-card edit-content">

        <el-card class="edit-content">
            <el-form label-position="right" label-width="90px" :rules="rules" :model="selectData" ref="form">
                <el-form-item label="分类名称" prop="name">
                    <el-input v-model="selectData.name" ></el-input>
                </el-form-item>
                <el-form-item label="栏目标识" prop="rkey">
                    <el-input v-model="selectData.rkey" ></el-input>
                </el-form-item>
                <el-form-item label="模型标识">
                    <el-select v-model="selectData.model" placeholder="请选择">
                        <el-option label="混合开发" value="hybrid"></el-option>
                        <el-option label="原生开发" value="native"></el-option>
                        <el-option label="引用类型" value="link"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="跳转路径" prop="path">
                    <el-input v-model="selectData.path" ></el-input>
                </el-form-item>
                <el-form-item label="栏目logo" prop="image">
                    <UploadImg ref="uploadImg" :defaultImg="selectData.image" :url="uploadImgUrl"  :onSuccess="handleImgUploaded"></UploadImg>
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
    import courseService from '../../../services/course/courseService.js'
    export default {
        components: {
            UploadImg
        },
        data() {
            return {
                SecMenu: [],
                selectData: {
                    name: '',
                    model: '',
                    path: '',
                    rkey :'',
                    sort: '',
                    image: null,
                },
                uploadImgUrl: '',
                rules: {
                    name: [
                        {required: true, message: '请输入栏目名称', trigger: 'blur'},
                    ],
                    // rkey: [
                    //     {required: true, message: '请输入	栏目标识', trigger: 'blur'},
                    // ],
                    image: [
                        {required: true, message: '请上传栏目logo', trigger: 'blur'}
                    ]
                }
            }
        },
        props: ['data', 'type'],

        watch: {
            'type' () {
                console.log(this.type)
                this.initData()
            },
            'data' () {
                //判断是否存在传过来的数据 有则使用无则初始化
                if (this.data) {
                    console.log(this.data)
                    this.selectData = Object.assign({}, this.data)
                }
            }
            // '$store.state.index.secMenu'(){
            //     this.selectData = Object.assign({},this.$store.state.index.secMenu)
            // }
        },
        activated () {
            console.log(this.type)
            xmview.setContentLoading(false)
            this.uploadImgUrl = courseService.getUploadCategoryImgUrl()
        },
        methods: {
            initData() {
                this.selectData  = {
                    name: '',
                    model: '',
                    path: '',
                    rkey :'',
                    sort: '',
                    image: null,
                }
            },
            save() {
                // xmview.showDialog(this.selectData, () => {
                    this.$emit('handleSave', this.selectData)
                // })
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
                    name: '',
                    model: '',
                    path: '',
                    rkey :'',
                    sort: '',
                    image: null,
                }
    }
</script>