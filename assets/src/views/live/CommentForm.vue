<!--直播表单：添加/修改-->
<style lang="scss" rel="stylesheet/scss">
    @import "../../utils/mixins/common";
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
            <el-form label-width="120px" ref="form" :rules="rules" :model="form">
                <el-form-item label="评论" prop="content">
                    <el-input v-model="form.content" type="textarea" :autosize="{ minRows: 3, maxRows: 7}"></el-input>
                </el-form-item>
                <el-form-item label="" >
                    <el-button type="primary" @click="btnNextClick" :disabled="isDisable">确认</el-button>
                </el-form-item>
            </el-form>
        </section>
    </main>
</template>

<script>

    import liveService from '../../services/liveService.js'
    export default {
        name: 'live-form',
        components: {
        },
        data() {
            return {
                isDisable:false,
                loadingData: false,
                form: getOriginData(),
                rules: {
                    content:[
                        {required: true, message: '必须输入', trigger: 'blur'},
                        ,{
                            pattern:  /\S$/,
                            message: '请输入非空格或非特殊字符的内容'
                        }
                    ],
                },
                formLabelWidth: '120px', // 表单label的宽度
            }
        },
        created() {
            console.log(this.$route.params);
            
            xmview.setContentLoading(false)
            // this.reqFun2()
            if(this.$route.params.id){ //编辑
                liveService.getCommt(
                    this.$route.params.id
                    ).then((ret) => {
                        this.loadingData=false
                        this.form = ret
                    })
            }
            //暂时不获取角色列表       
            this.loadingData=false
        },
        methods: {
            btnNextClick() {
                this.$refs['form'].validate((valid) => {
                    if (!valid) return
                    this.isDisable = true
                    let req = liveService.createCommt
                    if (this.$route.params.id) req = liveService.editCommt
                    req({content:this.form.content,id:this.$route.params.id}).then((ret) => {
                        this.isDisable = false
                        // 重置当前数据
                        xmview.showTip('success', '数据提交成功')
                        this.$refs['form'].resetFields();
                        if (!this.form.id) this.form.id = ret.id;
                        this.$router.go(-1)
                    })
                })
            }
        }
    }

    function getOriginData() {
        return {
            content: '',
        }
    }

</script>