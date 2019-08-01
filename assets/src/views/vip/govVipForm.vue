<!--课程表单：添加/修改-->
<style lang="scss" rel="stylesheet/scss">
    @import "../../utils/mixins/common";
    #medical-form {
        @extend %content-container;
        display: flex;
        .submit-form {
        width: 65%;
        padding: 20px;
        }
    }
</style>
<template>
    <main id="medical-form">
        <section class="submit-form">   
            <el-form label-width="120px" ref="form" :rules="rules" :model="fetchParam">
                <el-form-item label="部门"  prop="province_id">
                    <Region :province="fetchParam.province_id" v-model="fetchParam.province_id"
                            :city="fetchParam.city_id"
                            :area="fetchParam.area_id"
                            :town="fetchParam.town_id"
                            :village="fetchParam.village_id"
                            title=""
                            v-on:provinceChange="val => fetchParam.province_id = val"
                            v-on:cityChange="val => fetchParam.city_id = val"
                            v-on:areaChange="val => fetchParam.area_id = val"
                            v-on:townChange="val => fetchParam.town_id = val"
                            v-on:villageChange="val => fetchParam.village_id = val"
                            >
                    </Region>
                </el-form-item>    
                <el-form-item label="" >
                    <el-button type="primary" @click="btnNextClick">确认</el-button>
                </el-form-item>
            </el-form>
        </section>
    </main>
</template>

<script>
    import vipService from '../../services/vipService'
    import Region from '../component/select/Region.vue'

    function clearFn() {
        return {
            provinceSelect: '',
            citySelect: '',
            areaSelect: '',
            townSelect: '',
            villageSelect: '',
        }
    }
    export default {
        name: 'vip-pay',
        components: {
            Region
        },
        data() {
            var valigovPass = (rule, value, callback) => {
                if (!value) {
                    callback(new Error('请输入部门'));
                } else {
                    callback();
                }
            };
            return {
                loadingData: false,
                fetchParam: getOriginData(),
                rules: {
                    province_id:{ validator: valigovPass, trigger: 'change'},
            },
                multi: {
                    data: [{
                        id: -1
                    }],
                },
                resultData: [],
                gov_list:[],
            }
        },
        created() {
            xmview.setContentLoading(false)
            this.loadingData=false;
        },
        methods: {
            btnNextClick() {
                this.$refs['form'].validate((valid) => {
                    if (!valid) return
                    let req = vipService.payGovVip
                    console.log(this.fetchParam)
                    this.fetchParam.gov_id = this.fetchParam.village_id||this.fetchParam.town_id|| this.fetchParam.area_id||this.fetchParam.city_id ||this.fetchParam.province_id
                    req(this.fetchParam.gov_id ).then((ret) => {
                        // 重置当前数据
                        // this.fetchParam=getOriginData(),
                        this.$refs['form'].resetFields();
                        this.$router.push({name: 'gov-vip'})
                    })
                })
            }
        }
    }

    function getOriginData() {
        return {
            gov_id: void 0,
            province_id : '', // 省
            city_id: '',  // 市
            area_id: '',  // 区
            town_id: '',  //乡镇     
            village_id: '', // 街道 
        }
    }

</script>