<!--课程表单：添加/修改-->
<style lang="scss" rel="stylesheet/scss">
    @import "../../utils/mixins/common";
    #sys-form {
        @extend %content-container;
        .el-form {
            max-width: 700px;
        }
    
        .submit-form {
        width: 40%;
        padding: 20px;
            .subButton {
                text-align: center;
            }
    }
    }
</style>
<template>
    <main id="sys-form">
        <section class="upload-avatar">
            <div class="img-container">
                <img :src="imgUrl" />
            </div>
            <!--<ImagEcropperInput :isRound="true" :aspectRatio="1" :confirmFn="cropperFn" class="upload-btn"></ImagEcropperInput>-->
        </section>     
        <section class="submit-form">   
            <el-form label-width="120px" ref="form" :model="fetchParam" :rules="rules" >
                <el-form-item label="设置" prop="category">
                    <el-input v-model="fetchParam.category"></el-input>
                </el-form-item>
                <el-form-item label="字段名" prop="field">
                    <el-input v-model="fetchParam.field"></el-input>
                </el-form-item>
                <el-form-item label="功能说明" prop="usage">
                    <el-input v-model="fetchParam.usage"></el-input>
                </el-form-item>
                <el-form-item label="字段类型" prop="ftype">
                    <el-select v-model="fetchParam.ftype" placeholder="请选择">
                        <el-option label="数据类型" value="int"></el-option>
                        <el-option label="字符串类型" value="string"></el-option>
                    </el-select>
                </el-form-item>
                <!--<el-form-item label="模型标识">
                    <el-select v-model="selectData.model" placeholder="请选择">
                        <el-option label="混合开发" value="hybrid"></el-option>
                        <el-option label="原生开发" value="native"></el-option>
                        <el-option label="引用类型" value="link"></el-option>
                    </el-select>
                </el-form-item>-->
                <el-form-item label="字段值"  prop="val">
                    <el-input v-model="fetchParam.val"></el-input>
                </el-form-item>
                <el-form-item label="超长字段存储" prop="describe">
                    <el-input v-model="fetchParam.describe"></el-input>
                </el-form-item>
                <el-form-item label="" v-if="this.$route.params.sys_type">
                    <el-button @click="$router.push({ name:'setting-list'})">取消</el-button>
                    <el-button type="primary" @click="btnNextClick">确认</el-button>
                </el-form-item>
            </el-form>
        </section>
    </main>
</template>

<script>
    import setService from '../../services/setting/setService.js'
    import config from '../../utils/config'
    export default {
        name: 'sys-form',
        data() {
            return {
                imgUrl: '',
                loadingData: false,
                currentData: {
                    data: {},
                    pindex: -1,
                    index: -1
                },
                fetchParam: getOriginData(),
                resultData: [],
                role_list:[],
                rules: {
                    category: [
                        {required: true, message: '必须输入', trigger: 'blur'},
                    ],
                    field: [
                        {required: true, message: '必须输入', trigger: 'blur'}
                    ],
                    usage: [
                        {required: true, message: '必须输入', trigger: 'blur'}
                    ],
                    ftype: [
                        {required: true, message: '必须输入', trigger: 'blur'}
                    ],
                    // val: [
                    //     {required: true, message: '必须输入', trigger: 'blur'}
                    // ],
                }
            }
        },
        activated () {
              console.log(this.$route.params.sys_id)
            xmview.setContentLoading(false);
            console.log('this.$route.params.sys_id='+this.$route.params.sys_id )
                if (this.$route.params.sys_id != undefined) {    //路由id传递
                    if(!this.$route.params.sys_type){xmview.setContentTile('查看设置')}
                    setService.getAdminInfo(this.$route.params.sys_id).then((ret) => {
                        this.fetchParam = ret
                        console.log(ret)
                    })
                }else{
                    this.fetchParam=getOriginData()
                    // this.$refs['form'].resetFields();
                }    
            this.loadingData=false;
        },

        methods: {
            btnNextClick() {
                this.$refs['form'].validate((valid) => {
                    if (!valid) return
                    let req = setService.create
                    if (this.$route.params.sys_id) req = setService.edit
                    console.log(this.fetchParam)
                    console.log(this.$route.params.sys_id)
                    req(this.fetchParam).then((ret) => {
                        // 重置当前数据
                        xmview.showTip('success', '数据提交成功')
                        // this.fetchParam=getOriginData(),
                        this.$refs['form'].resetFields();
                        this.currentData = {
                            data: [],
                            pindex: -1,
                            index: -1
                        }
                        if (!this.fetchParam.id) this.fetchParam.id = ret.id;
                        this.$router.push({'name': 'setting-list'})
                    })
                })
            },
        }
    }

    function getOriginData() {
        return {
            category: '',
            field:'',
            usage: '',
            ftype: '',
            val:'',
            describe: '',
        }
    }

</script>