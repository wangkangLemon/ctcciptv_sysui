<!--题库管理-->
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
                <!-- <MenuTree v-model="SecMenu" ref="qustionbankCategory" :Mult='Mult' 
                :onNodeClick="treeNodeClick.bind(this,1)" :req="req" :param="initparam"></MenuTree> -->
                <MenuTree v-model="SecMenu" ref="qustionbankCategory" :Mult='Mult' 
                :onNodeClick="treeNodeClick.bind(this,1)" :req="req" :param="initparam"></MenuTree>
            </section>
            <section class="right-container">
                <div>
                    <el-button :class="{'el-button--primary':type=='update'}" @click="changeType('update')">修改分类</el-button>
                    <el-button :class="{'el-button--primary':type=='P'}" @click="changeType('P')">新建分类</el-button>
                    <el-button :class="{'el-button--primary':type=='S'}" @click="changeType('S')">添加子分类</el-button>
                    <el-button :class="{'el-button--primary':type=='C'}" @click="changeType('C')">移动分类</el-button>
                    <el-button :class="{'el-button--primary':type=='Cd'}" @click="changeType('Cd')" disabled>移动分类下内容</el-button>
                    <el-button type="danger"  @click="del">删除分类</el-button>
                </div>
                <ExamChapterCard @handleSave="submit" :data="selectData" :type="type" :category='category' :chaptertype='chaptertype' :checkended="checkended"></ExamChapterCard>
            </section>

            <!--移动子分类的弹出框-->
            <div class="el-dialog__wrapper" v-show="dialogTree.isShow">
                <article class="el-dialog el-dialog--tiny">
                    <section class="el-dialog__header">
                        移动分类【
                        <span style="color:red">
                            {{nodeSelected && nodeSelected.label}}
                        </span> <i>】到</i>
                    </section>
                    <section class="el-dialog__body">
                        <!-- <ArticleCategoryTree v-model="treeData" node-key="id"
                                            :onNodeClick="treeNodeClick.bind(this,2)"></ArticleCategoryTree> -->
                        <MenuTree v-model="SecMenu" node-key="id" :Mult='Mult' 
                            :onNodeClick="treeNodeClick.bind(this,2)" :req="req" :param="initparam"></MenuTree>
                    </section>

                    <section class="el-dialog__footer">
                        <span class="dialog-footer">
                            <el-button @click="dialogTree.isShow = false">取 消</el-button>
                            <el-button type="primary" @click="dialogTree.confirmClick">确 定</el-button>
                        </span>
                    </section>
                </article>
            </div>
            <!--{{secMenu}}-->
    </article>
</template>

<script>
    //这是 主页面   区别 ：1有子分类 2. ExamChapterCard传递参数  chaptertype:1
    import libService from '../../../services/course/libService.js'
    import MenuTree from '../../component/tree/QustionsCategory.vue'
    import ExamChapterCard from '../../component/table/ExamChapterCard.vue'
    import {transformParam} from '../../../utils/common'
    function getFetchParam() {
        return {
            status: void - 1, // 2- 视屏转码中 1-下线 0-正常
            // category_id: void 0, // 3- 供应商
            // chapter_type:4,
            page: 1,
            pagesize: -1,
            stime: void 0,
            etime: void 0,
            pid:0,
            ended:-1
            // need_testing: void 0, //  不赋值则表示全部，0为不需要，1为需要
        }
    }
    function getSelectData() {
        return {
            // category_id: void 0, // 3- 供应商
            // chapter_type:4,
            name: '',
            image: null,
            remark :'',
            sort:void 0,
            ended:0,
            pid: void 0, //父级id
        }
    }

    export default {
        name:'exam-questionbank-category',
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
                initparam:{  //向数组件传参
                    // category_id:this.categoryVal, // 3- 供应商
                    // chapter_type:4,
                    pid:0,
                    pagesize:-1,
                    level:-1,
                    lastId:void 0,

                },//栏目树传参用的对象
                //移动栏目
                dialogTree: { //移动弹窗
                    isShow: false,
                    confirmClick: {}
                },
                nodeSelected: void 0, // 被选中的node节点
                nodeParentSelected: void 0, // 被选中node节点的父节点
                moveToNode: void 0, // 将要移动到最终的分类
                // categoryVal:'' //掉接口存储category_id
            }
        },
        watch: {
            'type'(){
                console.log(this.type,this.$store.state.index.secPid)
            },
        },
        created() {
            this.selectData={}
            this.loadingData=false
            xmview.setLoading(false)
            this.fetchCategoryVal()
        },
        methods: {
            //获取题库菜栏目列表
            req(param){
                    return libService.fetchLibCategory(this.fetchParam)
                },
            // 左边的节点被点击
            treeNodeClick (type, data, node, store) {
                if (type == 1) { 
                    this.type='update'
                    this.selectData = Object.assign({},node.data)  //解决左右数据
                    this.nodeParentSelected = node.data.pid // 记录父节点
                    this.nodeSelected = node // 记录当前节点
                    // this.initparam.lastId = this.nodeSelected.data.id 
                    //     console.log('this.initparam.lastId ',this.initparam.lastId );
                }
                else if (type == 2) {
                    this.moveToNode = node
                   
                    if(this.nodeSelected.data.id==this.moveToNode.data.id){
                       xmview.showTip('warning', '请选择不同的分类')
                       return
                    }
                    
                }
            },
            // 清空选中项
            clearSelected () {
                this.selectable = false
            },
            fetchCategoryVal(){
                 libService.fetchCategoryVal({category:'questions'}).then((ret) => {
                        this.categoryVal=ret[0].val
                    })
            },
            fetchData() {
                this.SecMenu=[]
                 libService.fetchLibCategory( this.fetchParam ).then((ret) => {
                        this.SecMenu=ret
                        xmview.setContentLoading(false)     
                    })
            },
            //处理保存的数据
            submit( message ) {
                transformParam(message)
                if( this.type == 'P'|| this.type == 'S' ){
                    if(this.type == 'P'){
                        message.pid=0
                    } else if( this.type == 'S'){
                        // message.pid=this.$store.state.index.secPid
                        if(!this.selectData.id){
                            xmview.showTip('warning', '请先选中一个父级分类')
                            return
                        }
                        message.pid=this.selectData.id
                    }
                    // message.category_id=this.categoryVal
                    delete message.category_id
                    delete message.chapter_type
                    libService.LibCategoryCreate( message ).then(( ret ) => {
                        this.selectData = getSelectData()  //通过初始化组件传值清空
                        setTimeout(() => {
                            // this.fetchData() // 重新刷新数据
                            this.$forceUpdate()
                            this.$refs.qustionbankCategory.getInitData();
                        }, 300)
                    }).then(()=>{
                        this.$forceUpdate()
                        }
                    )
                }else {
                    transformParam(message)
                    delete message.category_id
                    libService.LibCategoryEdit( message ,message.id).then(( ret ) => {
                        setTimeout(() => {
                            // this.fetchData() // 重新刷新数据 
                            this.$refs.qustionbankCategory.getInitData();
                        }, 300)
                    })
                }
            },
            changeType(type){
                this.type = type
                if(type!="update"){
                    this.$store.dispatch('setSecMenu', { //通过清空vuex清空
                    name: '',
                    image: null,
                    remark :'',
                    sort:void 0,
                    ended:0,
                    pid: void 0, //父级id
                });
                }
                if(type == 'p'){
                    this.$refs.chapterCategory.clearSelected()
                }
                else if( this.type == 'S'){
                        if(!this.selectData.id){
                            xmview.showTip('warning', '请先选中一个父级分类')
                            return
                        }
                    }
                else if(type == 'C'){   //移动栏目
                 this.$forceUpdate()
                     if (!this.nodeSelected) {
                        xmview.showTip('warning', '请先选中一个分类')
                        return
                    }
                    this.dialogTree.isShow = true
                    this.dialogTree.confirmClick = () => {
                        let id  =this.nodeSelected.data.id 
                        let to = this.moveToNode.data.id
                        if (id === to) {
                            xmview.showTip('warning', '请选择不同的分类')
                            return
                        }
                        let message = this.nodeSelected.data
                        message.pid = to
                        transformParam(message)
                        libService.LibCategoryEdit( message ,id).then(( ret ) => {
                            setTimeout(() => {
                                // this.fetchData() // 重新刷新数据 
                                this.dialogTree.isShow = false
                                this.$refs.qustionbankCategory.getInitData();
                            }, 300)
                        })
                        // articleService.moveCategory({id, to}).then((ret) => {
                        //     // 重新渲染树节点
                        //     if (ret.code === 0) {
                        //         xmview.showTip('success', '操作成功!')
                        //         this.$refs.articleCategory.initData()
                        //         this.dialogTree.isShow = false
                        //     } else if (ret.code === 1) {
                        //         xmview.showTip('error', ret.message)
                        //     }
                        // })
                    }
                }
            },
            // 单条删除
            del() {
                if( this.selectData.name != undefined ){
                     xmview.showDialog(`您将要删除<span style="color:red">${this.selectData.name}</span>分类,确认吗？`, () => {
                    libService.libCategorydelete(this.selectData.id).then(() => {
                        // store.commit('increment', 10)
                        xmview.showTip('success', '操作成功')
                        this.selectData = getSelectData()    //通过初始化组件传值清空
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