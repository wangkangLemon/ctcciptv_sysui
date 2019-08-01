<!--课程表单：添加/修改-->
<style lang="scss" rel="stylesheet/scss">
    @import "../../../utils/mixins/common";
    #medical-form {
        @extend %content-container;
        display: flex;
  
        .upload-avatar{
            width:30%;
            text-align: center;
            .img-container {
            margin: 20px auto;
            width: 170px;
            height: 170px;
            border: 1px solid #ccc;
            border-radius:50%;
                >img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    background: #ededed;
                }
            }
        }
        .submit-form {
        width: 45%;
        padding: 20px;
            .select{
                width: 100%;
            }
            .subButton {
                text-align: center;
            }
            div{
                width: 100%;
            }
    }
    }
</style>
<template>
    <main id="medical-form">
        <section class="upload-avatar">
            <div class="img-container">
                <img :src="fetchParam.image|fillImgPath" v-show="fetchParam.image"/>
                 <!--<img :src="{url:clerkDetail.avatar, sex: clerkDetail.sex} | defaultAvatar" />-->
            </div>
            <ImagEcropperInput :isRound="true" :aspectRatio="1" :confirmFn="cropperFn" class="upload-btn"></ImagEcropperInput>
        </section>     
        <section class="submit-form">   
            <el-form label-width="120px" ref="form" :rules="rules" :model="fetchParam" >
                
                <el-form-item label="专家名称" prop="name">
                    <el-input v-model.name="fetchParam.name"></el-input>
                </el-form-item>
                <el-form-item prop="sex" label="性别" :label-width="formLabelWidth">
                    <el-radio class="radio" v-model="fetchParam.sex" :label="1" :value="1">男</el-radio>
                    <el-radio class="radio" v-model="fetchParam.sex" :label="2" :value="2">女</el-radio>
                </el-form-item>
                <el-form-item label="职称" prop="professor">
                    <el-input v-model.professor="fetchParam.professor"></el-input>
                </el-form-item>

                <!--<el-form-item  label="所属医院" :label-width="formLabelWidth" :fetch-suggestions="querySearch">
                    <el-select clearable v-model="fetchParam.hospital_id" placeholder="未选择">
                        <el-option v-for="(item, index) in hospital_list" :label="item.name" :value="item.id" :key="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>-->


                <el-form-item  label="所属医院"  :fetch-suggestions="querySearch">
                        <Hospitals v-model="fetchParam.hospital_id" :placeholder="fetchParam.name"
                                            v-on:change="val=>fetchParam.hospital_id=val" :change="getHospitalList" :list="changelist">
                        </Hospitals>
                </el-form-item>

                <el-form-item label="科室" prop="department">
                    <el-input v-model.department="fetchParam.department"></el-input>
                </el-form-item>
                <el-form-item label="介绍" prop="introduce">
                    <el-input v-model.introduce="fetchParam.introduce" type="textarea" :autosize="{ minRows: 3, maxRows: 7}" placeholder="请输入内容">
                    </el-input>
                </el-form-item>
                <el-form-item label="擅长领域" prop="goodat">
                    <el-input v-model.goodat="fetchParam.goodat" type="textarea" :autosize="{ minRows: 3, maxRows: 7}" placeholder="请输入内容">
                    </el-input>
                </el-form-item>
                <el-form-item label="荣誉" prop="honor">
                    <el-input v-model.honor="fetchParam.honor" type="textarea" :autosize="{ minRows: 3, maxRows: 7}" placeholder="请输入内容">
                    </el-input>
                </el-form-item>
                <el-form-item label="" >
                    <!--<el-button @click="$router.push({ name:'medical-index'})">取消</el-button>-->
                    <div>
                    <el-button type="primary" @click="btnNextClick">确认</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </section>
    </main>
</template>

<script>
    import expertsService from '../../../services/course/expertsService.js'
    import commonService from '../../../services/commonService.js'
    import mineService from '../../../services/base/mineService'
    import govService from '../../../services/gov/govService.js'
    import ImagEcropperInput from '../../component/upload/ImagEcropperInputExperts.vue'
    import Hospitals from '../../component/select/Hospitals.vue'
    // import {fillImgPath} from '../../../utils/filterUtils.js'

    function clearFn() {
        return {
            typeSelect: '',
            provinceSelect: '',
            citySelect: '',
            areaSelect: '',
            townSelect: '',
            villageSelect: '',
            name: ''
        }
    }
    export default {
        name: 'course-manage-experts-edit',
        components: {
            ImagEcropperInput,Hospitals
        },
        data() {
            return {
                fillImgPath:'',
                loadingData: false,
                currentData: {
                    data: {},
                    pindex: -1,
                    index: -1
                },
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
                    gov_id:{ required: true },
                    name: { required: true, message: '请输入姓名'},
            },
                multi: {
                    data: [{
                        id: -1
                    }],
                },
                resultData: [],
                hospital_list:[],
                formLabelWidth: '120px', // 表单label的宽度
                changelist:{}
            }
        },
        created() {
            xmview.setContentLoading(false);
                if (this.$route.params.id != undefined) {    //路由id传递
                    // this.passValue = false
                    expertsService.getExpertsInfo(this.$route.params.id).then((ret) => {
                        this.fetchParam = ret
                        // this.fillImgPath = ret.image
                        console.log(ret.image)
                        // this.fetchParam.role_id = ret.course.role_id
                    })
                } 
            //暂时不获取角色列表       
             this.getHospitalList()
            this.loadingData=false
        },
        activated () {
            this.getHospitalList()
        },
        methods: {
            //拿到医院列表输入建议
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据返回建议列表的数据
                cb(results);
            },
            // passFn(){
            //     return this.$route.params.id != undefined?false:true
            // },
            // 裁切后的回调
            cropperFn(data, ext) {
                commonService.uploadExpertsAvatar({
                    image: data,
                    alias: `${Date.now()}${ext}`,
                }).then((ret) => {
                    xmview.showTip('success', '上传成功')
                    this.fetchParam.image = data
                    this.fetchParam.image= ret.url
                }).catch((ret) => {
                    xmview.showTip('error', ret.message)
                })
            },
            
            //获取医院下拉列表
            getHospitalList(val,length){
                expertsService.fetchHospitalData({
                    name: val,
                    // category: this.type,
                    pagesize: this.pageSize,
                    page: parseInt(length / this.pageSize) + 1
                }).then((ret)=>{
                    this.$emit('changelist', ret)
                    this.changelist=ret
                    return ret
                })
            },
            getExpertsList (val, length) {
                return expertsService.fetchExpertsData({
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
                    let req = expertsService.createExperts
                    if (this.fetchParam.id) req = expertsService.updateExperts
                    req(this.fetchParam).then((ret) => {
                        // 重置当前数据
                        //this.$refs[fetchParam].resetFields();//自己加的方法
                        xmview.showTip('success', '数据提交成功')
                        // this.fetchParam=getOriginData(),
                        this.$refs['form'].resetFields();
                        this.currentData = {
                            data: [],
                            pindex: -1,
                            index: -1
                        }
                        if (!this.fetchParam.id) this.fetchParam.id = ret.id;
                        this.$router.go(-1)
                    })
                })
            },
            
      
        }
    }

    function getOriginData() {
        return {
            name: '',
            image:'',
            professor:'',
            hospital_id: 0,
            department: '',
            introduce: '',
            sex: void 0,
            goodat:'',
            honor:'',

        }
    }

</script>