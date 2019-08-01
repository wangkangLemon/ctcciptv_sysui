<!--课程表单：添加/修改-->
<style lang="scss" rel="stylesheet/scss">
    @import "../../../utils/mixins/common";
    #medical-form {
        @extend %content-container;
        display: flex;
  
        /*.upload-avatar{
            width:30%;
            text-align: center;
            .img-container {
            margin: 20px auto;
            width: 170px;
            height: 170px;
            border: none;
            >img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: #ededed;
            }
        }
        }*/
        .submit-form {
        width: 65%;
        padding: 20px;
            .select{
                width: 100%;
            }
            .subButton {
                text-align: center;
            }
            span{
                width:200px;
            }
            div{
                // text-align: center
            }
        }
    }
</style>
<template>
    <main id="medical-form">
        <section class="upload-avatar">
            <div class="img-container">
                <img :src="imgUrl" />
            </div>
            <!-- <ImagEcropperInput :isRound="true" :aspectRatio="1" :confirmFn="cropperFn" class="upload-btn"></ImagEcropperInput> -->
        </section>     
        <section class="submit-form">   
            <el-form label-width="120px" ref="form" :rules="rules" :model="fetchParam">
                <el-form-item label="部门"  prop="province_id">
                    <Region :province="fetchParam.province_id" v-model="fetchParam.province_id"
                            :city="fetchParam.city_id"
                            :area="fetchParam.area_id"
                            :town="fetchParam.town_id"
                            :village="fetchParam.village_id"
                            title=""
                            v-on:provinceChange="val => {fetchParam.province_id = val;finallyVal = val}"
                            v-on:cityChange="val => {fetchParam.city_id = val;finallyVal = val}"
                            v-on:areaChange="val => {fetchParam.area_id = val;finallyVal = val}"
                            v-on:townChange="val => {fetchParam.town_id = val;finallyVal = val}"
                            v-on:villageChange="val => {fetchParam.village_id = val;finallyVal = val}"
                            :change="changeR"
                            >
                    </Region>
                </el-form-item>    
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="fetchParam.name"  auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="price">
                    <el-input v-model="fetchParam.nickname"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="fetchParam.mobile"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="role_id" :fetch-suggestions="querySearch">
                    <el-select class="select" v-model="fetchParam.role_id" placeholder="请输入角色">
                        <el-option  v-for="item in  role_list" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="密码" prop="passwd" v-if="fetchParam.role_id==1">
                    <el-input v-model="fetchParam.passwd" v-if="this.$route.params.id" auto-complete="off" type="password" key=""  placeholder="密码、不修改请留空"></el-input>
                    <el-input v-model="fetchParam.passwd" v-else auto-complete="off" type="password" key=""  ></el-input>
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
    import userService from '../../../services/gov/userService.js'
    import mineService from '../../../services/base/mineService'
    import govService from '../../../services/gov/govService.js'
    import ImagEcropperInput from '../../component/upload/ImagEcropperInput.vue'
    import clone from 'clone'
    import Region from '../../component/select/Region.vue'

    export default {
        name: 'sys-form',
        components: {
            ImagEcropperInput,Region
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
                imgUrl: '',
                loadingData: false,
                currentData: {
                    data: {},
                    pindex: -1,
                    index: -1
                },
                fetchParam: getOriginData(),
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
                    role_id: { required: true, type: 'number',message: '请输入角色',trigger: 'blur'},
                    province_id:{ validator: valigovPass, trigger: 'change'},
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur'},
                        {
                            min: 1,
                            max: 9,
                            message: '长度不得大于 9个字符'
                        },{
                            pattern:  /\S$/,
                            message: '请输入非空格或非特殊字符的姓名'
                        }],
                    sex: { required: true },
                    mobile: { pattern: /^1[3456789]\d{9}$/, required: true,  message: '请输入正确的手机号', trigger: 'blur' },
                    email: { pattern: /^\w+([-+.]\w+)*@\w+([-+.]\w+)*.\w+([-+.]\w+)*$/, required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    // passwd: {  pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/,required: true, message: '请输入6-12位包含数字与字母的密码', trigger: 'blur' },
                    passwd: { required: !this.$route.params.id , message:  !this.$route.params.id?'请输入密码':'密码、不修改请留空', trigger: 'blur' },
            },
                multi: {
                    data: [{
                        id: -1
                    }],
                },
                resultData: [],
                gov_list:[],
                noinit:false,
            }
        },
        created() {
            xmview.setContentLoading(false)
            console.log('this.$route.params='+this.$route.params)
            if (this.$route.params.id  == undefined) {
                this.fetchParam =  getOriginData()
                return false
            }  //路由id传递
            // this.passValue = false
            console.log('this.$route.params.id='+this.$route.params.id)
            userService.getAdminInfo(this.$route.params.id).then((ret) => {
                this.fetchParam = ret
                // this.noinit=true
                console.log(1111111111111111111111111)
                console.log(this.fetchParam)
                console.log(222222222222)
            })

            this.loadingData=false;
            setTimeout(() => {
                this.noinit=true
            }, 500);
                // this.noinit=true
            
        },
        // activated () {
        //     this.getrole()
        // },
        watch: {
            'fetchParam.passwd'(){
                if(this.fetchParam.passwd==undefined){
                    this.fetchParam.passwd=''
                }
            },
        },
        methods: {
            changeR(type){
                // debugger
                console.log(type)
                  console.log(1,this.fetchParam.province_id,this.fetchParam.city_id ,this.fetchParam.area_id,this.fetchParam.town_id, this.fetchParam.village_id);
                  let level_pid=this.fetchParam.village_pid || this.fetchParam.town_pid || this.fetchParam.area_pid || this.fetchParam.city_pid || this.fetchParam.province_pid
                let flag = false
                let index
                let arr = ['province_id', 'city_id', 'area_id', 'town_id', 'village_id']
                arr.forEach((v,i) => {
                    console.log('flag='+flag);
                    console.log('this.noinit='+this.noinit);
                    if (flag&&this.noinit) {//刚进来会走一遍这个导致数据清掉，初始化我给了false，阻止进来，可是不知道在哪改成true
                        this.fetchParam[v] = ''
                    }
                    if (this.fetchParam[v] == this.finallyVal) {
                        flag = true
                        index = i
                    }
                })
                // this.noinit=true
                 console.log(this.fetchParam.province_id,this.fetchParam.city_id ,this.fetchParam.area_id,this.fetchParam.town_id, this.fetchParam.village_id);
            },
            // 裁切后的回调
            cropperFn(data, ext) {
                mineService.uploadAvatar({
                    avatar: data,
                    alias: `${Date.now()}${ext}`
                }).then((ret) => {
                    xmview.showTip('success', '上传成功')
                    this.imgUrl = data
                    authUtils.setAvatar(ret.data.url)
                }).catch((ret) => {
                    xmview.showTip('error', ret.message)
                })
            },
            btnNextClick() {
                this.$refs['form'].validate((valid) => {
                    if (!valid) return
                    let req = userService.create
                    if (this.fetchParam.id) req = userService.update
                    console.log(this.fetchParam)
                    this.fetchParam.gov_id = this.fetchParam.village_id||this.fetchParam.town_id|| this.fetchParam.area_id||this.fetchParam.city_id ||this.fetchParam.province_id
                    req(this.fetchParam).then((ret) => {
                        console.log(ret)
                       if(ret.code==0){
                           // 重置当前数据
                        xmview.showTip('success', '数据提交成功')
                        this.$refs['form'].resetFields();
                        this.currentData = {
                            data: [],
                            pindex: -1,
                            index: -1
                        }
                        if (!this.fetchParam.id) this.fetchParam.id = ret.id;
                        this.$router.push({name: 'user-index'})
                       }else{
                            xmview.showTip('error',ret.message)
                       }
                        
                    })
                })
            },
            //拿到角色组
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据返回建议列表的数据
                cb(results);
            },
        }
    }

    function getOriginData() {
        return {
            role_id: '',
            role:'',
            role_name:'',
            category_name: '请选择栏目',
            name: '',
            mobile: '',
            email: '',
            passwd: '',
            address: '',
            id: 0,
            sex: 0,
            gov_id: void 0,
            nickname:'',
            province_id : '', // 省
            city_id: '',  // 市
            area_id: '',  // 区
            town_id: '',  //乡镇     
            village_id: '', // 街道 
            pid: void -1,

        }
    }

</script>