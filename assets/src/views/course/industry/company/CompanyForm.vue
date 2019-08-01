<!--课程表单：添加/修改-->
<style lang="scss" rel="stylesheet/scss">
    @import "../../../../utils/mixins/common";
    #medical-form {
        @extend %content-container;
        display: flex;
        .submit-form {
        width: 45%;
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
                 <el-form-item label="红包限额(分)" prop="bonus_limit">
                    <el-input-number :min="0" v-model="fetchParam.bonus_limit"></el-input-number>
                </el-form-item>
                <el-form-item label="公司名称" prop="name">
                    <el-input v-model="fetchParam.name"></el-input>
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
    import Product from '../../../component/select/CommonSelect.vue'
    export default {
        name: 'industry-order-edit',
        components: {Product},
        data() {
            return {
                loadingData: false,
                fetchParam: getOriginData(),
                rules: {
                    bonus_limit: [{ required: true, type:'number',message: '请输入红包限额',trigger: 'blur'},
                            ,{
                                pattern:  /^\d+$/,
                                message: '请输入整数'
                            }
                        ],
                    name: [{ required: true,message: '请输入公司名称',trigger: 'blur'},
                            ,{
                            pattern:  /\S$/,
                            message: '请输入非空格或非特殊字符的内容'
                        }],
                },
                changelistc:[],
            }
        },
        watch:{
             'fetchParam.bonus_limit'(){
                if(this.fetchParam.bonus_limit=='')return
                this.fetchParam.bonus_limit=Number(this.fetchParam.bonus_limit)
                console.log('typeof(this.fetchParam.bonus_limit)===='+typeof(this.fetchParam.bonus_limit),this.fetchParam.bonus_limit);
            }
        },
        created() {
            xmview.setContentLoading(false)
              this.loadingData=false
            if (this.$route.params.id != undefined) {    //路由id传递
                // this.passValue = false
                xmview.setContentTile(`工业公司编辑`)
                industryService.getCompany(this.$route.params.id).then((ret) => {
                    console.log(ret);
                    this.fetchParam = ret
                })
            } 
            //暂时不获取角色列表       
            this.loadingData=false
        },
        methods: {
            btnNextClick() {
                this.$refs['form'].validate((valid) => {
                    if (!valid) return
                    console.log(this.fetchParam)
                    console.log('typeof(this.fetchParam.mark)===='+typeof(this.fetchParam.mark));
                    let req = industryService.createCompany
                    if (this.fetchParam.id) req = industryService.editCompany
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
            bonus_limit: void 0,
            name: '',
        }
    }

</script>