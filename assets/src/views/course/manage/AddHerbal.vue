<!--课程表单：添加/修改-->
<style lang="scss" rel="stylesheet/scss">
    @import "../../../utils/mixins/common";
    #sys-form {
        @extend %content-container;
       .el-form  {
            // margin: 10px 0;
            max-width: 700px;
        }
          .el-tab-pane {
                margin:20px 0;
                max-width: 700px;
                .el-form-item{
                    .m{
                        font-size: 12px;
                        color:red;
                    }
                }
                .el-form-item__content{
                    img{
                        width: 112px;
                        height: 112px;
                    }
                }
            }
        .el-tabs__header{
            max-width: 715px;
            margin: 0 ;
            
        }
        .bottom-btns {
            float: right;
        }
    }
</style>
<template>
    <main id="sys-form">
            <!-- <el-form label-width="120px" ref="form" :model="fetchParam"> -->
            <el-tabs type="border-card" @tab-click="handleClick" v-model="activeTab">
                <el-tab-pane label="课程简介" name="first">
                    <el-form label-width="120px" ref="formFirst" :model="fetchParam">
                        <el-form-item label="课程介绍">
                            <el-input v-model="fetchParam.description" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="课程封面图">
                            <UploadImg :defaultImg="fetchParam.image" :url="uploadImgUrl" :onSuccess="res => fetchParam.image = res.data.url" :data='uploadextraData'></UploadImg>
                        </el-form-item>
                        <el-form-item label="课程标签">
                            <vTags v-model="courseTags"></vTags>
                        </el-form-item>
                        <!-- <el-form-item label="课程类别" prop="type">
                            <el-select v-model="fetchParam.type" placeholder="请选择">
                                <el-option label="私有课程" value="private"></el-option>
                                <el-option label="公开课程" value="public"></el-option>
                                <el-option label="工业课程" value="industry"></el-option>
                                <el-option label="政府课程" value="gov"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="素材类型" prop="material_type">
                            <el-select v-model="fetchParam.material_type" @change="typeChange" placeholder="请选择" >
                                <el-option label="视频" value="video"></el-option>
                                <el-option label="WORD" value="doc"></el-option>
                                <el-option label="PPT" value="ppt"></el-option>
                                <el-option label="PDF" value="pdf"></el-option>
                                <el-option label="PDF" value="text"></el-option>
                            </el-select>
                        </el-form-item> -->
                    </el-form>
                     <el-button style="float: right" type="primary" @click="btnNextClick">
                            <i>下一步</i>
                    </el-button>
                </el-tab-pane>
                <el-tab-pane label="概述" name="second">
                    <el-form label-width="120px" v-for="(item,index) in fetchParam.summary" :key="index" :model="item"  ref="test">
                        <el-form-item :label="item.name" >
                            <el-input  v-model="item.value" placeholder="请填写内容" auto-complete="off"></el-input>
                            <i class="m">{{item.must?'(必须填写)':''}}</i>
                        </el-form-item>
                    </el-form>
                    <div class="bottom-btns">
                        <el-button @click="btnPreClick">上一步</el-button>
                        <el-button style="float: right" type="primary" @click="btnNextClick">下一步</el-button>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="属性" name="three">
                    <el-form label-width="120px" v-for="(item,index) in fetchParam.attribute" :key="index" :model="item"  ref="test">
                        <el-form-item :label="item.name" >
                            <el-input  v-model="item.value"  type="textarea" :autosize="{ minRows: 2, maxRows: 6}" placeholder="请填写内容" auto-complete="off"></el-input>
                            <i class="m">{{item.must?'(必须填写)':''}}</i>
                        </el-form-item>
                    </el-form>
                     <div class="bottom-btns">
                        <el-button @click="btnPreClick">上一步</el-button>
                        <el-button class="submit" type="primary" @click="handleSubmit" :disabled="isDisable">发布</el-button>
                    </div>
                </el-tab-pane>
            </el-tabs>
    </main>
</template>

<script>
    import govService from '../../../services/gov/govService'
    import courseService from '../../../services/course/courseService.js'
    import vTags from '../../component/form/Tags.vue'
    import UploadImg from '../../component/upload/UploadImg.vue'
    export default {
        name: 'gov-authority',
        components: {
           vTags,UploadImg
        },
        data() {
            return {
                loadingData: false,
                activeTab: 'first',
                fetchParam: getFetchParam(),
                courseTags: [],
                onValue:1,
                offValue:2,
                summary:[],
                attribute:[],
                zy:{},
                sx:{},
                fj:{},
                category_name:'',
                rules:{},
                isDisable:false,
                uploadextraData:{
                    biz:'course',
                    extpath:'cover'
                }
            }
        },
        watch:{
        },
        created() {


            xmview.setContentLoading(false);
            this.zy={
                summary:[ //概述
                    {
                        name: "中文名",
                        value: "",
                        must:1,
                    },
                    {
                        name: "拼音名",
                        value: "",
                        must:1,
                    },
                    {
                        name: "别名",
                        value: ""
                    },
                    {
                        name: "拉丁学名",
                        value: ""
                    },
                    {
                        name: "学名",
                        value: ""
                    },
                    {
                        name: "界",
                        value: ""
                    },
                    {
                        name: "门",
                        value: ""
                    },
                    {
                        name: "纲",
                        value: ""
                    },
                    {
                        name: "目",
                        value: ""
                    },
                    {
                        name: "科",
                        value: ""
                    },
                    {
                        name: "属",
                        value: ""
                    },
                    {
                        name: "种",
                        value: ""
                    },
                    {
                        name: "制法",
                        value: ""
                    },
                            {
                        name: "主要分子式",
                        value: ""
                    },
                    {
                        name: "药材性状",
                        value: ""
                    },
                    {
                        name: "鉴别",
                        value: ""
                    },
                    {
                        name: "分布区域",
                        value: ""
                    },
                    {
                        name: "产地",
                        value: ""
                    },
                    {
                        name: "采收时间",
                        value: ""
                    },
                    {
                        name: "入药部位",
                        value: ""
                    },
                    {
                        name: "三品",
                        value: ""
                    },
                    {
                        name: "用量",
                        value: ""
                    },
                    {
                        name: "毒性",
                        value: ""
                    },
                    {
                        name: "贮藏",
                        value: ""
                    },
                    {
                        name: "禁忌",
                        value: ""
                    },
                    {
                        name: "来源",
                        value: ""
                    },
                    {
                        name: "植物形态",
                        value: ""
                    },
                    {
                        name: "加工炮制",
                        value: ""
                    },
        
                    {
                        name: "性状鉴别",
                        value: ""
                    },
                    {
                        name: "化学成分",
                        value: ""
                    },
                    {
                        name: "药理作用",
                        value: ""
                    }
                ],
                attribute:[ //属性
                    {
                        name: "性味归经",
                        value: "",
                        must:1,

                    },
                    {
                        name: "功效",
                        value: "",
                        must:1,
                    },
                    {
                        name: "临床应用",
                        value: "",
                        must:1,
                    },
                    {
                        name: "主治",
                        value: ""
                    },
                    
                    {
                        name: "用法用量",
                        value: ""
                    },
                    {
                        name: "使用注意",
                        value: ""
                    },
                    {
                        name: "文献论述",
                        value: ""
                    },
                    {
                        name: "处方举例",
                        value: ""
                    },
                    {
                        name: "不良反应",
                        value: ""
                    }
                ]
            }
            this.sx={
                summary:[ //概述
                    {
                        name: "中文名",
                        value: "",
                        must:1,
                    },
                    {
                        name: "拼音名",
                        value: "",
                        must:1,
                    },
                    {
                        name: "别名",
                        value: ""
                    },
                    {
                        name: "国际编号",
                        value: ""
                    },
                    {
                        name: "出处",
                        value: ""
                    },
                    {
                        name: "穴名释疑",
                        value: ""
                    },
                    {
                        name: "隶属经络",
                        value: ""
                    },
                    {
                        name: "类型",
                        value: ""
                    },
                    {
                        name: "部位",
                        value: ""
                    },
                    {
                        name: "特异性",
                        value: ""
                    },
                   
                ],
                attribute:[ //属性
                    {
                        name: "定位",
                        value: "",
                        must:1,
                    },
                    {
                        name: "取穴",
                        value: "",
                        must:1,
                    },
                    {
                        name: "操作",
                        value: "",
                        must:1,
                    },
                    {
                        name: "局部解剖",
                        value: ""
                    },
                    {
                        name: "功效",
                        value: ""
                    },
                    {
                        name: "主治",
                        value: ""
                    },
                    {
                        name: "注意事项",
                        value: ""
                    },
                    {
                        name: "常用配伍",
                        value: ""
                    },
                    {
                        name: "文献摘要",
                        value: ""
                    },
                    {
                        name: "现代研究",
                        value: ""
                    }
                ]
            }
            this.fj={
                summary:[ //概述
                    {
                        name: "中文名",
                        value: "",
                        must:1,
                    },
                    {
                        name: "拼音名",
                        value: "",
                    },
                    {
                        name: "出处",
                        value: ""
                    },
                    {
                        name: "分类",
                        value: ""
                    }
                ],
                attribute:[ //属性
                    {
                        name: "组成",
                        value: "",
                        must:1,
                    },
                    {
                        name: "临床应用",
                        value: "",
                        must:1,
                    },
                    {
                        name: "功用",
                        value: ""
                    },
                    {
                        name: "主治",
                        value: ""
                    },
                    {
                        name: "方解",
                        value: ""
                    },
                    {
                        name: "配伍特点",
                        value: ""
                    },
                    {
                        name: "辨证要点",
                        value: ""
                    },
                    {
                        name: "加减变化",
                        value: ""
                    },
                    {
                        name: "使用注意",
                        value: ""
                    },
                    {
                        name: "附方",
                        value: ""
                    },
                    {
                        name: "文献摘要",
                        value: ""
                    },
                    {
                        name: "临床报道",
                        value: ""
                    },
                    {
                        name: "实验研究",
                        value: ""
                    },
                    {
                        name: "方歌",
                        value: ""
                    }
                ]
            }
            this.uploadImgUrl = courseService.commonUploadImage()

            if(!this.$route.params.herbalInfo){
                xmview.showTip('error', "请先选择中药栏目组最终级栏目添加")
                this.$router.push({'name':'course-manage-public'})
                return 
            }
            // console.log(this.$route.params)
                let t=this.$route.params.herbalInfo.category_type
                let f=this.fetchParam
                if(t==3){
                    this.category_name='中药'
                    f.summary=this.zy.summary
                    f.attribute=this.zy.attribute
                }
                else if(t==4){
                    this.category_name='方剂'
                    f.summary=this.fj.summary
                    f.attribute=this.fj.attribute
                }
                else{
                    this.category_name='腧穴'
                    f.summary=this.sx.summary
                    f.attribute=this.sx.attribute
                }
                console.log(this.$route.params.handle)
            if(this.$route.params.handle=='edit'){ //编辑
                courseService.getHerbal({
                        contentid:this.$route.params.herbalInfo.contentid
                        }).then((ret) => {
                            this.herbalInfo = JSON.parse(ret)
                            console.log( this.herbalInfo)
                            xmview.setContentTile(`编辑课程-中草药 ${ this.category_name}`)
                            this.loadingData=false
                            console.log(this.herbalInfo)
                            this.fetchParam.description= this.herbalInfo.description
                            this.fetchParam.image= this.herbalInfo.thumb
                            // this.fetchParam.image= this.herbalInfo.image
                            this.courseTags = this.herbalInfo.tags ? this.herbalInfo.tags.split(',') : []
                            console.log(this.fetchParam.summary)
                            this.handleArr(this.herbalInfo.summary,this.fetchParam.summary)
                            this.handleArr(this.herbalInfo.attribute,this.fetchParam.attribute)
                            // for(let i in this.herbalInfo.summary){
                            //     this.fetchParam.summary[i]=this.herbalInfo.summary[i]?this.fetchParam.summary[i]=this.herbalInfo.summary[i]:this.fetchParam.summary[i]=""
                            //     console.log(this.fetchParam.summary[i],this.herbalInfo.summary[i])
                            // }
                            // for(let i in this.herbalInfo.attribute){
                            //     this.fetchParam.attribute[i]=this.herbalInfo.attribute[i]?this.fetchParam.attribute[i]=this.herbalInfo.attribute[i]: this.fetchParam.attribute[i]=""
                            // }
                            return false
                        })
                // this.herbalInfo={"course_name":"虎口","category_type":5,"pinyin":"hukou","thumb":"http://upload.yxt.vodjk.demo/course/1525245654736265.jpg","image":"http://upload.yxt.vodjk.demo/course/1525245654736265.jpg","tags":"11,22,33","description":"腧穴--001","type":"public","material_type":"text","summary":[{"name":"中文名","value":"虎口","must":1},{"name":"拼音名","value":"hukou","must":1},{"name":"别名","value":"别名"},{"name":"国际编号","value":"国际编号"},{"name":"出处","value":"出处"},{"name":"穴名释疑","value":"穴名释疑"},{"name":"类型","value":"类型"},{"name":"部位","value":"部位"},{"name":"特异性","value":"特异性"}],"attribute":[{"name":"定位","value":"定位1","must":1},{"name":"取穴","value":"取穴1","must":1},{"name":"操作","value":"操作1","must":1},{"name":"局部解剖","value":"局部解剖"},{"name":"功效","value":"功效"},{"name":"主治","value":"主治"},{"name":"注意事项","value":"注意事项"},{"name":"常用配伍","value":"常用配伍"},{"name":"文献摘要","value":"文献摘要"}]}
            // this.herbalInfo=JSON.parse(this.herbalInfo)
            }
            else{//新建
                xmview.setContentTile(`添加课程-中草药 ${ this.category_name}`)
                this.loadingData=false
            }
        },
        methods: {
            handleArr(arr1,arr2){ //1  是2 的子集
                let obj = {}
                arr1.forEach(v=>{
                console.log(v)
                obj[v.name] = v.value
                })
                arr2.forEach(v=>{
                v.value = obj[v.name]
                })
          
                // for(var i=0;i<arr1.length;i++){
                //     var obj1= arr1[i]
                //     for(var j=0; j,arr2.length;j++){
                //         var obj2=arr2[j]
                //         if(obj1.name == obj2.name){
                //             obj2.value == obj1.value
                //         }
                //     }
                // }

                console.log(JSON.stringify(arr1))
                console.log(JSON.stringify(arr2))
                // console.log(arr2)
            },
             // 课程类型改变
            typeChange(val) {
                if (val === 'doc') {
                    this.accept = '.doc,.docx'
                } else if (val === 'ppt') {
                    this.accept = '.ppt,pptx'
                } else if (val === 'pdf') {
                    this.accept = '.pdf'
                }
            },
            // 图片裁切成功回调
            cropperImgSucc(imgData) {
                courseService.commonUploadImageBase({ image: imgData ,extpath:''}).then((ret) => {
                    this.fetchParam.image = ret.url
                })
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            btnPreClick() {
                if(this.activeTab=='three'){
                    this.activeTab = 'second' 
                    return
                }
                if(this.activeTab=='second'){
                    this.activeTab = 'first' 
                    return
                }
            },
            btnNextClick() {
                if(this.activeTab=='first'){
                    this.activeTab = 'second' 
                    return
                }
                if(this.activeTab=='second'){
                    this.activeTab = 'three' 
                    return
                }
            },
            handleSubmit(){
                let f=Object.assign({},this.fetchParam)
                f.summary.map(v=>{
                    console.log(v)
                    if(v.name=="中文名")  f.course_name=v.value
                    if(v.name=="拼音名")  f.pinyin=v.value
                    return
                })
          
                f.thumb=f.image
                f.tags = this.courseTags ? this.courseTags.join(',') : ''
       
                let fa=f.attribute
                if(this.category_name=='中药'){
                    fa.map(v=>{
                        if(v.name=="性味归经")  this.rules.xwgz=v.value
                        if(v.name=="功效")  this.rules.gx=v.value
                        if(v.name=="临床应用")  this.rules.lcyy=v.value
                        return true
                    })
                    console.log(this.rules)
                    if (f.course_name ==''||f.pinyin ==''||f.image=='') {
                        xmview.showTip('error', "请将必填项 ‘课程简介 - 课程封面图；概述 - 中文名、拼音名’全部填写")
                        return false
                    }
                    if((this.rules.xwgz==''||this.rules.gx==''||this.rules.lcyy=='')){
                        xmview.showTip('error', "请将必填项  ‘ 属性 - 性味归经、功效、临床应用 ‘ 全部填写")
                        return false
                    }
                }else if(this.category_name=='方剂'){
                    fa.map(v=>{
                        if(v.name=="组成")  this.rules.zc=v.value
                        if(v.name=="临床应用")  this.rules.lcyy=v.value
                        return true
                    })
                    console.log(this.rules)
                    if (f.course_name =='') {
                        xmview.showTip('error', "请先填写 ‘概述 - 中文名’")
                        return false
                    }
                    if((this.rules.zc==''||this.rules.lcyy=='')){
                        xmview.showTip('error', "请将必填项 ‘ 属性 - 组成、临床应用 ‘ 全部填写")
                        return false
                    }
                }else if(this.category_name=='腧穴'){
                    fa.map(v=>{
                        if(v.name=="定位")  this.rules.dw=v.value
                        if(v.name=="取穴")  this.rules.qx=v.value
                        if(v.name=="操作")  this.rules.cz=v.value
                        return true
                    })
                    console.log(this.rules)
                    if (f.course_name ==''||f.pinyin ==''||f.image=='') {
                        xmview.showTip('error', "请将必填项 ‘课程简介 - 课程封面图；概述 - 中文名、拼音名’ 全部填写")
                        return false
                    }
                    if((this.rules.dw==''||this.rules.qx==''||this.rules.cz==''||f.image=='')){
                        xmview.showTip('error', "请将必填项 ‘ 属性 - 定位、取穴、操作 ‘ 全部填写")
                        return false
                    }

                }
                let s =f.summary.filter(v=>{
                    if (v.name =='中文名' || v.name == '拼音名') {
                        return true
                    }
                    return v.value
                })
                console.log(JSON.stringify(s))
                f.summary=s

                let a =f.attribute.filter(v=>{
                    return v.value
                })
                console.log(JSON.stringify(a))
                f.attribute=a

                let p,data,cid
                data=JSON.stringify(f)
                console.log(this.$route.params)
                cid=this.$route.params.herbalInfo.category_id
                this.isDisable = true
                // if (this.fetchParam.contentid) {  // 如果是编辑
                if (this.$route.params.handle=='edit') {  // 如果是编辑
                    p = courseService.editHerbal({
                        category_id:cid,
                        id:this.$route.params.herbalInfo.contentid,
                        data:data,
                        noJson:0
                        }).then((ret) => {
                             this.isDisable = false
                        this.$router.push({'name':'course-manage-public'})
                    })
                } else {  //新建
                    p = courseService.addHerbal({
                        category_id:cid,
                        data:data,
                        noJson:0
                        }).then((ret) => {
                             this.isDisable = false
                        this.$router.push({'name':'course-manage-public'})
                        this.fetchParam.contentid = ret.contentid 
                    })
                }
            }
        }
    }

    function getFetchParam() {
        return {
                // pagesize:10,
                // page:1,
                course_name:'',
                pinyin:'',
                thumb:'',
                image:'',
                tags:'',
                description:'',
                type:'public',
                material_type:'text',
                summary:[],
                attribute:[]
        }
    }

</script>