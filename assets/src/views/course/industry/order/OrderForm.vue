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
                 <el-form-item label="快递单号" prop="express_no">
                    <el-input type="number" v-model="fetchParam.express_no"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="contact">
                    <el-input v-model="fetchParam.contact"></el-input>
                </el-form-item>
                <el-form-item label="手机" prop="mobile">
                    <el-input type="number" v-model="fetchParam.mobile"></el-input>
                </el-form-item>
                 <el-form-item label="详细收货地址" prop="address">
                    <el-input v-model="fetchParam.address"></el-input>
                </el-form-item>

                <!-- <el-form-item label="优惠类型" prop="discount_type">
                    <el-radio-group v-model="fetchParam.discount_type">
                        <el-radio :label="1">打折</el-radio>
                        <el-radio :label="2">代金券</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="优惠折数（%）" prop="value" v-if="fetchParam.discount_type==1">
                     <el-input type="number" :min="0" v-model="fetchParam.value"></el-input>
                </el-form-item>
                <el-form-item label="优惠金额（分）" prop="value" v-else>
                     <el-input type="number" :min="0" v-model="fetchParam.value"></el-input>
                </el-form-item> -->
                <el-form-item label="咨询订单状态" prop="status" v-if="this.$route.params.id">
                    <el-radio-group v-model="fetchParam.status">
                        <el-radio :label="1">咨询中</el-radio>
                        <el-radio :label="2">已发货</el-radio>
                    </el-radio-group>
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
                    express_no: { required: true, type:'number',message: '请输入快递单号',trigger: 'blur'},
                    contact: { required: true,message: '请输入联系人',trigger: 'blur'},
                    mobile: { pattern: /^1[3456789]\d{9}$/,  type: 'string', message: '请输入正确的手机号', trigger: 'blur' },
                    address: { required: true,message: '请输入收货地址',trigger: 'blur'},
                    status: { required: true, type:'number', message: '请选择咨询订单状态',trigger: 'blur'},
                },
                changelistc:[],
            }
        },
        watch:{
            'fetchParam.value'(){
                this.fetchParam.value=Number(this.fetchParam.value)
                console.log('typeof(this.fetchParam.value)===='+typeof(this.fetchParam.value));
            },
             'fetchParam.express_no'(){
                if(this.fetchParam.express_no=='')return
                this.fetchParam.express_no=Number(this.fetchParam.express_no)
                console.log('typeof(this.fetchParam.express_no)===='+typeof(this.fetchParam.express_no),this.fetchParam.express_no);
            }
        },
        created() {
            xmview.setContentLoading(false)
              this.loadingData=false
            if (this.$route.params.id != undefined) {    //路由id传递
                // this.passValue = false
                industryService.getOrder(this.$route.params.id).then((ret) => {
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
                    let req = industryService.createOrder
                    if (this.fetchParam.id) req = industryService.editOrder
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
            express_no: void 0,
            contact: 2,
            mobile:2,
            address:void 0,
            status:0,
        }
    }

</script>