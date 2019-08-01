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
                 <el-form-item  label="关联商品" prop="product_id" >
                    <Product v-model="fetchParam.product_id" :placeholder="fetchParam.product_name" ref="Product"
                            v-on:change="val=>fetchParam.product_id=val" :change="reqFun2" :list="changelistc">
                    </Product>
                </el-form-item>
                <!-- <el-form-item label="发送用户" prop="user_id">
                    <el-radio-group v-model="fetchParam.user_id">
                        <el-radio :label="0">全部</el-radio>
                        <el-radio :label="1">部分</el-radio>
                    </el-radio-group>
                </el-form-item> -->
                <el-form-item label="期限类型" prop="type_term">
                    <el-radio-group v-model="fetchParam.type_term">
                        <el-radio :label="1">长期</el-radio>
                        <el-radio :label="2">一次性</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="优惠类型" prop="discount_type">
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
                </el-form-item>
                <el-form-item label="是否已使用" prop="used" v-if="this.$route.params.id">
                    <el-radio-group v-model="fetchParam.used">
                        <el-radio :label="0">未使用</el-radio>
                        <el-radio :label="1">已使用</el-radio>
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
    import financeService from '../../../../services/finance/financeService'
    import Product from '../../../component/select/CommonSelect.vue'
    export default {
        name: 'finance-coupon-edit',
        components: {Product},
        data() {
            return {
                loadingData: false,
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
                    // name:[
                    //     {required: true, message: '必须输入', trigger: 'blur'},
                    //     {
                    //         pattern:  /\S$/,
                    //         message: '请输入非空格或非特殊字符的内容'
                    //     }
                    // ],
                    product_id: { required: true, type:'number',message: '关联商品',trigger: 'change'},
                    value: [{ required: true,type:'number', message: '请输入优惠券金额',trigger: 'blur'},
                            {pattern:  /^\d+$/,
                            message: '请输入整数'
                        }
                    ],
                    description: { required: true, message: '请输入优惠券简介',trigger: 'blur'},
                },
                changelistc:[],
            }
        },
        watch:{
            'fetchParam.value'(){
                this.fetchParam.value=Number(this.fetchParam.value)
                console.log('typeof(this.fetchParam.value)===='+typeof(this.fetchParam.value));
            }
        },
        created() {
            xmview.setContentLoading(false)
              this.loadingData=false
            if (this.$route.params.id != undefined) {    //路由id传递
                // this.passValue = false
                financeService.getCoupon(this.$route.params.id).then((ret) => {
                    console.log(ret);
                    this.fetchParam = ret
                    // this.fillImgPath = ret.image
                    // this.fetchParam.role_id = ret.course.role_id
                })
            } 
            //暂时不获取角色列表       
            this.loadingData=false
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
                    console.log('param=',typeof(param.page));
                    console.log(ret.data);
                    // if(param.page==1){
                    //     ret.data=[{id:0,name:'免费直播'}].concat(ret.data)
                    //     console.log(ret.data);
                    //     _this.$emit('changelistc', ret.data)
                    // }else{
                        _this.$emit('changelistc', ret.data)
                    // }
                    return ret
                })
            },
            getExpertsList (val, length) {
                return financeService.fetchCouponList({
                    name: val,
                    // category: this.type,
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
                       console.log('typeof(this.fetchParam.mark)===='+typeof(this.fetchParam.mark));

                    let req = financeService.createCoupon
                    if (this.fetchParam.id) req = financeService.editCoupon
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
            product_id: void 0,
            user_id: 0,
            type_term: 2,
            discount_type:2,
            value:void 0,
            used:0,
        }
    }

</script>