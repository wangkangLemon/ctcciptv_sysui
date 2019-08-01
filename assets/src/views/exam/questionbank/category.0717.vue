<!--公开课管理-->
<style lang='scss' rel='stylesheet/scss'>
    @import "../../../utils/mixins/common";
    @import "../../../utils/mixins/topSearch";

    #course-index-container {
        @extend %content-container;
        min-width:1077px;

        .manage-container {
            @extend %right-top-btnContainer;
            >* {
                color: #fff;
                border-radius: 5px;
            }
        }
        >section{
            display: inline-block;
             vertical-align: top;
        }
        .left-container{
            min-width: 300px;
            border-right: 1px solid #ededed;
        }
        .right-container{
            width: 60%;
            margin-left: 15px;
            >div{
                margin-bottom: 20px       
            }
        }
        .el-dialog__wrapper {
            padding-top: 15px;
            background: rgba(0, 0, 0, .5);
            z-index: 1000;
        }
    }
</style>

<template>
    <article id="course-index-container">
            <!--<section class="manage-container"><button type="button" icon="plus" class="el-button el-button--primary"  @click="ChapterCategoryCreate"><span>新建分类</span></button></section>-->
            <section class="left-container">
                <MenuTree v-model="SecMenu" ref="qustionbankCategory" :Mult='Mult' 
                :onNodeClick="treeNodeClick.bind(this,1)" :req="req" :param="initparam"></MenuTree>
            </section>
            <section class="right-container">
                <div>
                    <el-button :class="{'el-button--primary':type=='update'}" @click="changeType('update')">修改分类</el-button>
                    <el-button :class="{'el-button--primary':type=='P'}" @click="changeType('P')">新建分类</el-button>
                    <el-button :class="{'el-button--primary':type=='S'}" @click="changeType('S')">添加子分类</el-button>
                    <el-button :class="{'el-button--primary':type=='C'}" @click="changeType('C')" disabled>移动分类</el-button>
                    <el-button :class="{'el-button--primary':type=='Cd'}" @click="changeType('Cd')" disabled>移动分类下内容</el-button>
                    <el-button type="danger"  @click="del">删除分类</el-button>
                </div>
                <ExamChapterCard @handleSave="submit" :data="selectData" :type="type" :category='category' :chaptertype='chaptertype' :checkended="checkended"></ExamChapterCard>
            </section>
            <!--{{secMenu}}-->
    </article>
</template>

<script>
    //这是 主页面   区别 ：1有子分类 2. ExamChapterCard传递参数  chaptertype:1
    import examService from '../../../services/exam/examService'
    import MenuTree from '../../component/tree/commonEnded.vue'
    import ExamChapterCard from '../../component/table/ExamChapterCard.vue'
    import {transformParam} from '../../../utils/common'
    function getFetchParam() {
        return {
            status: void - 1, // 2- 视屏转码中 1-下线 0-正常
            category_id: void 0, // 3- 供应商
            chapter_type:4,
            page: 1,
            pagesize: -1,
            stime: void 0,
            etime: void 0,
            pid:0,
            // need_testing: void 0, //  不赋值则表示全部，0为不需要，1为需要
        }
    }
    function getSelectData() {
        return {
            category_id: void 0, // 3- 供应商
            chapter_type:4,
            name: '',
            image: null,
            remark :'',
            sort:void 0,
            ended:0,
            pid: void 0, //父级id
        }
    }

    export default {
        components: {
            MenuTree,
            ExamChapterCard
        },
     
        data() {
            return {
                loadingData: false,
                SecMenu:[],
                total: 0,
                fetchParam: getFetchParam(),
                selectData:getSelectData() ,
                type: 'update',
                Mult:'true',
                category:'',
                chaptertype:1,
                checkended:1,
                initparam:{},//栏目树传参用的对象
            }
        },
        watch: {
            // '$store.state.index.secMenu'(){
            //     this.selectData = Object.assign({},this.$store.state.index.secMenu) //复制一份右边card 里面vuex存储的值 
            //     this.selectData.category_id	= this.$store.state.index.examCate
            // },
            'type'(){
                console.log(this.type,this.$store.state.index.secPid)
            },
            '$store.state.index.examCate'(){ //大量请求
            // if(this.fetchParam.category_id!==1){
                this.fetchParam.category_id = this.$store.state.index.examCate
                this.initparam=this.fetchParam
                console.log('this.fetchParam.category_id ',this.fetchParam.category_id );
                console.log(1111,this.$refs.qustionbankCategory.getdata());
                // this.fetchData()
            // }
            } ,
        },
        activated() {
            this.selectData={}
            this.loadingData=false
            xmview.setLoading(false)
            // this.fetchData() // 避免初始化多次请求
        },
        methods: {
            //获取题库菜栏目列表
            req(param){
                this.fetchParam.category_id = this.$store.state.index.examCate
                    return examService.fetchChapterCategory(this.fetchParam)
                },
            // 左边的节点被点击
            treeNodeClick (type, data, node, store) {
                // console.log('===========   node.data.data==========  ')
                this.type='update'
                if (type == 1) { 
                    this.selectData = Object.assign({},node.data)  //解决左右数据
                }
            },
            // 清空选中项
            clearSelected () {
                this.selectable = false
            },
            fetchData() {
                this.SecMenu=[]
                examService.fetchChapterCategory( this.fetchParam).then((ret) => {
                        this.SecMenu=ret
                        console.log(ret);
                        console.log('this.SecMenu',this.SecMenu);
                        xmview.setContentLoading(false)     
                    })
            },
            // ChapterCategoryCreate( ) {
                //     examService.ChapterCategoryCreate().then(() => {
                //             console.log(ret)
                //             this.selectData=null
                //             setTimeout(() => {
                //                 // this.fetchData() // 重新刷新数据
                //             }, 300)
                //         })
                // },
            //处理保存的数据
            submit( message ) {
                transformParam(message)
                if( this.type == 'P'|| this.type == 'S' ){
                    if(this.type == 'P'){
                        message.pid=0
                    } else if( this.type == 'S'){
                        message.pid=this.$store.state.index.secPid
                    }
                    examService.ChapterCategoryCreate( message ).then(( ret ) => {
                        this.selectData = getSelectData()  //通过初始化组件传值清空
                        this.selectData.category_id	= this.$store.state.index.examCate
                        console.log(this)
                        console.log(this.selectData)
                        setTimeout(() => {
                            // this.fetchData() // 重新刷新数据
                            this.$forceUpdate()
                        }, 300)
                    }).then(()=>{
                        this.$forceUpdate()
                        }
                    )
                }else {
                    transformParam(message)
                    examService.ChapterCategoryEdit( message ,message.id).then(( ret ) => {
                        setTimeout(() => {
                            this.fetchData() // 重新刷新数据 
                        }, 300)
                    })
                }
            },
            changeType(type){
                this.type = type
                if(type!="update"){
                    this.$store.dispatch('setSecMenu', { //通过清空vuex清空
                    category_id:this.$store.state.index.examCate,
                    chapter_type:4,
                    name: '',
                    image: null,
                    remark :'',
                    sort:void 0,
                    ended:0,
                    pid: void 0, //父级id
                });
                }
                if(type == 'p'){
                    console.log(this.$refs.chapterCategory)
                    this.$refs.chapterCategory.clearSelected()
                }
            },
            // 单条删除
            del() {
                if( this.selectData.name != undefined ){
                     xmview.showDialog(`您将要删除<span style="color:red">${this.selectData.name}</span>分类,确认吗？`, () => {
                    examService.ChapterCategorydelete(this.selectData.id).then(() => {
                        // store.commit('increment', 10)
                        xmview.showTip('success', '操作成功')
                        this.selectData = {}  //通过初始化组件传值清空
                        this.$forceUpdate()
                    }).then(()=>{
                        this.$forceUpdate()
                        }
                    )
                })
                }else{
                     xmview.showTip('error','请您先选择应试考试分类，再执行删除操作。')
                }
            },
        
        },
    }
</script>