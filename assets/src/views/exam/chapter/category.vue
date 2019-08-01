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
            <section class="left-container">
                <MenuTree :data="SecMenu" v-if="SecMenu.length" ref="chapterCategory" :onNodeClick="treeNodeClick.bind(this,1)"></MenuTree>
            </section>
            <section class="right-container">
                <div>
                    <el-button :class="{'el-button--primary':activeTab=='update'}" @click="activeTab = 'update'">修改分类</el-button>
                    <el-button :class="{'el-button--primary':activeTab=='P'}" @click="activeTab = 'P'">新建分类</el-button>
                    <el-button :class="{'el-button--primary':activeTab=='C'}" @click="activeTab = 'C'" disabled>移动分类</el-button>
                    <el-button :class="{'el-button--primary':activeTab=='Cd'}" @click="activeTab = 'Cd'" disabled>移动分类下内容</el-button>
                    <el-button type="danger"  @click="del">删除分类</el-button>
                </div>
                <ExamChapterCard @handleSave="submit" :data="selectData" :category='category'  :chaptertype='chaptertype'></ExamChapterCard>
            </section>
            <!--{{secMenu}}-->
    </article>
</template>

<script>
    //这是 主页面   区别 ：1无子分类 2. ExamChapterCard传递参数  chaptertype:2
    import examService from '../../../services/exam/examService'
    import MenuTree from '../../component/tree/MenuTreeExam.vue'
    import ExamChapterCard from '../../component/table/ExamChapterCard.vue'
    import {transformParam} from '../../../utils/common'
    function getFetchParam() {
        return {
            status: void - 1, // 2- 视屏转码中 1-下线 0-正常
            category_id: void 0, // 3- 供应商
            chapter_type:2,
            page: 1,
            pagesize: -1,
            stime: void 0,
            etime: void 0,
            // need_testing: void 0, //  不赋值则表示全部，0为不需要，1为需要
        }
    }
     function getSelectData() {
        return {
            category_id: void 0, // 3- 供应商
            chapter_type:2,
            name: '',
            image: null,
            remark :'',
            sort:void 0,
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
                activeTab : 'update',
                category:1,
                chaptertype:2

            }
        },
        watch: {
            '$store.state.index.secMenu'(){
                this.selectData = Object.assign({},this.$store.state.index.secMenu) //复制一份右边card 里面vuex存储的值 
                // this.selectData.sort=''
                this.selectData.category_id	= this.$store.state.index.examCate
                // console.log(this.$store.state.index.secMenu)
            },
            '$store.state.index.examCate'(){
               this.fetchData()
            }  ,
             'activeTab'(val) {
                  console.log(this.type,this.$store.state.index.secPid)
                if(this.activeTab!="update"){
                    this.$store.dispatch('setSecMenu', { //通过清空vuex清空
                    category_id:this.$store.state.index.examCate,
                    chapter_type: 2,
                    name: '',
                    image: null,
                    remark :'',
                    sort:void 0,
                });
                }
                if(this.activeTab == 'p'){
                    console.log(this.$refs.chapterCategory)
                    this.$refs.chapterCategory.clearSelected()
                }
            }, 
        },
        activated() {
            this.selectData={}
            this.loadingData=false
            xmview.setLoading(false)
            this.fetchData() // 避免初始化多次加载
        },
        methods: {
             // 左边的节点被点击
            treeNodeClick (type, data, node, store) {
                // console.log('===========   node.data.data==========  ')
                console.log(this)
                this.activeTab='update'
                if (type == 1) { 
                //     // if (this.nodeSelected && this.nodeSelected.value === data.value) return  
                //     this.nodeParentSelected = node.parent// 记录父节点
                //     this.nodeSelected = node // 记录当前节点
                //     this.$refs.uploadImg.clearFiles()
                //     this.fetchParam = Object.assign({},node.data)  //解决左右数据
                //     this.type = 'P'
                // } else if (type == 2) {
                //     this.moveToNode = node
                }
            },
            // 清空选中项
            clearSelected () {
                this.selectable = false
            },
            fetchData() {
                 this.fetchParam.category_id = this.$store.state.index.examCate
                 this.fetchParam.chapter_type = 2
                examService.fetchChapterCategory( this.fetchParam).then((ret) => {
                        // this.$store.state.index.secMenu.commit('INDEX_SET__SETSECMENU', ret.data) 
                        this.SecMenu=ret
                        console.log(ret)
                        xmview.setContentLoading(false)     
                    })
            },
            //处理保存的数据
            submit( message ) {
                // if(){
                //     xmview.showDialog('请先添加要保存的数据')
                // }else{}
                transformParam(message)
                if( this.activeTab == 'P'|| this.activeTab == 'S' ){
                    if(this.activeTab == 'P'){
                        message.pid=0
                    } else if( this.activeTab == 'S'){
                        message.pid=this.$store.state.index.secPid

                    }
                    // console.log(message)
                    examService.ChapterCategoryCreate( message ).then(( ret ) => {
                        this.selectData = getSelectData()  //通过初始化组件传值清空
                        this.selectData.category_id	= this.$store.state.index.examCate
                        setTimeout(() => {
                            this.fetchData() // 重新刷新数据
                            this.$forceUpdate()
                        }, 300)
                    }).then(()=>{
                        this.$forceUpdate()
                        }
                    )
                }else {
                    transformParam(message)
                    //    console.log(message)
                    examService.ChapterCategoryEdit( message ,message.id).then(( ret ) => {
                        setTimeout(() => {
                            this.fetchData() // 重新刷新数据 
                        }, 300)
                    })
                }
            },
            // //编辑
            // ChapterCategoryEdit( e ) {
            //     examService.ChapterCategoryEdit(e).then((ret) => {
            //             setTimeout(() => {
            //                 this.fetchData()   // 重新刷新数据
            //                 this.$forceUpdate()
            //             }, 300)
            //         })
            // },
            // changeType(type){
            //     this.type = type
            // },
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