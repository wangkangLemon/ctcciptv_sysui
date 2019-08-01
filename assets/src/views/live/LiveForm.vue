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
                <el-form-item label="直播名称" prop="title">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item  label="关联专家" prop="experts_id" :fetch-suggestions="querySearch">
                    <Experts v-model="form.experts_id" :placeholder="form.experts_name"
                            v-on:change="val=>form.experts_id=val" :change="getExpertsList" :list="changelist">
                    </Experts>
                </el-form-item>
                <el-form-item  label="关联商品" prop="product_id" >
                    <Product v-model="form.product_id" :placeholder="form.product_name" ref="Product"
                            v-on:change="val=>form.product_id=val" :change="reqFun2" :list="changelistc">
                    </Product>
                </el-form-item>
                <el-form-item prop="image" label="封面" :label-width="formLabelWidth">
                    <div class="img-wrap" v-if="form.image">
                        <img :src="form.image | fillImgPath" width="200" height="112" alt=""/>
                    </div>
                    <ImagEcropperInput :isRound="false" :confirmFn="cropperFn"
                        class="upload-btn">
                    </ImagEcropperInput>
                </el-form-item>
                <el-form-item label="简介" prop="description">
                    <el-input v-model="form.description" type="textarea" :autosize="{ minRows: 3, maxRows: 7}" placeholder="请输入内容">
                    </el-input>
                </el-form-item>
                <el-form-item label="直播时间" prop="endtime">
                <!-- <DateRange :start="form.starttime" :end="form.endtime" @changeStart="val=> form.starttime=val" :dataType="'datetime'"
                    @changeEnd="val=> form.endtime=val" :defaultStart="form.startdate" :defaultEnd="form.enddate">
                </DateRange> -->
                    <el-date-picker v-model="form.starttime" type="datetime" placeholder="开始日期"
                            :picker-options="pickerOptionsed1"/>
                    <el-date-picker v-model="form.endtime" type="datetime" placeholder="结束日期" 
                            :picker-options="pickerOptionsed2"/>
                </el-form-item>
                <el-form-item label="直播浮动人数" prop="base_user_cnt">
                    <el-input style="width: auto;" v-model="form.base_user_cnt" type="number" :min="0" placeholder="请输入直播浮动人数"></el-input>
                </el-form-item>
                <el-form-item label="直播未开始类型" prop="befer_type">
                    <el-radio-group  v-model="form.befer_type">
                        <el-radio :label="1">直播流</el-radio>
                        <el-radio :label="2">本地视频</el-radio>
                        <el-radio :label="3">图片</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="直播未开始地址" prop="befer_url">
                    <el-input v-model="form.befer_url"></el-input>
                </el-form-item>
                <el-form-item label="直播类型" prop="live_type">
                    <el-radio-group  v-model="form.live_type">
                        <el-radio :label="1">直播流</el-radio>
                        <el-radio :label="2">本地视频</el-radio>
                        <el-radio :label="3">图片</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="直播地址" prop="live_url">
                    <el-input v-model="form.live_url"></el-input>
                </el-form-item>
                <el-form-item label="直播结束类型" prop="after_type">
                    <el-radio-group  v-model="form.after_type">
                        <el-radio :label="1">直播流</el-radio>
                        <el-radio :label="2">本地视频</el-radio>
                        <el-radio :label="3">图片</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="直播结束地址" prop="after_url">
                    <el-input v-model="form.after_url"></el-input>
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
    import ImagEcropperInput from '../component/upload/ImagEcropperInput.vue'
    import commonService from '../../services/commonService.js'
    import Experts from '../component/select/Experts'
    import expertsService from '../../services/course/expertsService.js'
    import financeService from '../../services/finance/financeService.js'
    import Product from '../component/select/CommonSelect.vue'
    import DateRange from '../component/form/DatetimeRangePicker.vue'
    import { time2String } from '../../utils/timeUtils.js'

    export default {
        name: 'live-form',
        components: {
            ImagEcropperInput,Experts,Product,DateRange
        },
        data() {
            return {
                isDisable:false,
                loadingData: false,
                form: getOriginData(),
                rules: {
                    title:[
                        {required: true, message: '必须输入', trigger: 'blur'},
                        ,{
                            pattern:  /\S$/,
                            message: '请输入非空格或非特殊字符的内容'
                        }
                    ],
                    endtime: {required: true,message: '请选择时间'},
                    experts_id: {required: true,type:'number',message: '请选择专家', trigger: 'change'},
                    product_id: {required: true,type:'number',message: '请选择商品', trigger: 'change'},
                    image: { required: true, message: '请上传封面图',trigger: 'change'},
                    description: { required: true, message: '请输入直播简介',trigger: 'blur'},
                    base_user_cnt: { required: true,type:'number', message: '请输入直播浮动人数',trigger: 'blur'},
                    befer_url: { required: true, message: '请输入直播未开始地址',trigger: 'blur'},
                    live_url: { required: true, message: '请输入直播地址',trigger: 'blur'},
                    after_url: { required: true, message: '请输入直播结束地址',trigger: 'blur'},
                },
                formLabelWidth: '120px', // 表单label的宽度
                changelist:{},
                changelistc:[],
                pickerOptionsed1: {
                    disabledDate (time) {
                        return time.getTime() < Date.now() - 8.64e7
                    }
                },
                pickerOptionsed2: {
                    disabledDate :(time)=> {
                        let beginDate=this.form.starttime
                        return time.getTime() < beginDate - 8.64e7
                    }
                },
            }
        },
        watch:{
            'form.base_user_cnt'(){
                this.form.base_user_cnt=Number(this.form.base_user_cnt)
            },
        },
        created() {
            xmview.setContentLoading(false)
            this.getExpertsList()
            if(this.$route.params.id){ //编辑
                liveService.getLive(
                    this.$route.params.id
                    ).then((ret) => {
                        this.loadingData=false
                        this.form = ret
                        this.form.starttime = ret.startdate
                        this.form.endtime = ret.enddate
                        this.form.product_name = ret.product.name
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
                    if(param.page==1){
                        ret.data=[{id:0,name:'免费直播'}].concat(ret.data)
                        console.log(ret.data);
                        _this.$emit('changelistc', ret.data)
                    }else{
                        _this.$emit('changelistc', ret.data)
                    }
                    // _this.$refs.Product.fetchData()
                     //到父组件 这个就是 后面依次是子组件 孙组件
                     //问题?在父组件change 因为现在编辑页默认有了ID 就不加载全部列表 只显示默认的ID对应的值 列表只有一项
                    // _this.changelistc = ret.data //会改变数据 让列表显示当前
                    return ret
                })
            },
            //拿到专家列表输入建议
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据返回建议列表的数据
                cb(results);
            },
             
            getExpertsList (val, length) {
                return expertsService.fetchExpertsData({
                    name: val,
                    // category: this.type,
                    pagesize: this.pageSize,
                    page: parseInt(length / this.pageSize) + 1||1
                }).then((ret) => {
                    this.$emit('changelist', ret)
                    this.changelist = ret
                    
                    return ret
                })
            },
            cropperFn (data, ext) {
                commonService.commonUploadImageBaseSection({
                    image: data,
                    alias: `${Date.now()}${ext}`,
                    biz: 'live',
                    extpath: 'cover',
                }).then((ret) => {
                    this.form.image = ret.url 
                })
            },
            btnNextClick() {
                this.$refs['form'].validate((valid) => {
                    if (!valid) return
                    if(typeof(this.form.starttime)=='undefined'||typeof(this.form.endtime)=='undefined') {
                         xmview.showTip('error', "请先完善直播时间再提交数据")
                        return false
                    }
                    if(typeof(this.form.starttime)=='object') {
                        this.form.starttime = this.form.starttime ? time2String(this.form.starttime,0,0) : ''
                    }
                    if(typeof(this.form.endtime)=='object'){
                        this.form.endtime = this.form.endtime ? time2String(this.form.endtime,0,0 ) : ''
                    }

                    let f=Object.assign({},this.form)
                    let p,data,cid
                    data=JSON.stringify(f)
                    this.isDisable = true
                    let req = liveService.createLive
                    if (this.$route.params.id) req = liveService.editLive
                    req(this.form,this.form.id).then((ret) => {
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
            title: '',
            description:'',
            image:'',
            content:'',
            experts_name:'',
            experts_id:void 0,
            product_id:void 0,
            product_name:'',
            starttime:'',
            endtime:'',
            startdate:'',
            enddate:'',
            base_user_cnt:void 0,
            befer_type:1,
            befer_url:void 0,
            live_type:1,
            live_url:void 0,
            after_type:1,
            after_url:void 0,
        }
    }

</script>