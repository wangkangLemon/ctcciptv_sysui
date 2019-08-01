<!--区块管理-->
<style lang='scss' rel="stylesheet/scss">
    @import "../../../utils/mixins/mixins";
    @import "../../../utils/mixins/table";
    @import "../../../utils/mixins/common";
    @import "../../../utils/mixins/topSearch";

    .block-manage {
        @extend %justify;
        .content-title {
            padding: 10px 20px;
            background: #f0f3f5;
            text-align: left;
            line-height: 35px;
            button {
                float: right;
                display: block;
            }
        }
        .left-content {
            display: inline-block;
            vertical-align: top;
            width: 25%;
            background: #fff;

            .classify-tree {
                padding: 1px;
                .el-tree-node{
                    overflow: hidden;
                }
            }
        }
        .right-content {
            width: 74%;
            display: inline-block;
            vertical-align: top;
            background: #fff;
            padding-bottom: 20px;

            .content-list {
                padding: 20px;
                .search{
                    width:100%;
                    margin-bottom:10px;
                    section{
                        margin-left: 10px;
                        margin-bottom: 14px;
                        display: inline-block;
                        margin-right: 10px;
                        .el-select .el-input .el-input__icon{
                            transform: translateY(-50%) translateX(-50%)rotateZ(180deg);
                        }
                        #input{
                            width: 84%;
                            display: inline-block;
                            margin-left: 10px;
                        }
                    }
                    .fi{
                        width:55%;
                    }
                }
                .tag {
                    span {
                        padding: 10px;
                        border: 1px solid #e2e7eb;
                        background: #fff;
                        border-right: none;
                        &:last-of-type {
                            border-right: 1px solid #e2e7eb;
                        }
                        &:hover {
                            background: #e2e7eb;
                        }
                        &.active {
                            background: #e2e7eb;
                        }
                    }
                }
            }
            .el-pagination {
                float: right;
                margin-top: 10px;
            }
        }
    }
</style>
<template>
    <article class="block-manage">
        <section class="left-content">
            <div class="content-title">
                所有分类
                <!-- <router-link tag="el-button" :to="{name: ''}">管理分类</router-link> -->
            </div>
            <div class="classify-tree">
                 <MenuTree v-model="SecMenu" :req="req" ref="chapterCategory" :mark = this.mark :onNodeClick="treeNodeClick.bind(this,1)"></MenuTree>
            </div>
        </section>
        <section class="right-content">
            <div class="content-title">
                <span v-if="category.title">{{category.title}}-</span>菜单列表
                 <el-button type="primary" icon="plus" @click="$router.push({ name:'menu-add', params:{sys_type:'add'}})">添加菜单</el-button>
            </div>
            <div class="content-list">
                <div class="search">
                    <section class="fi">
                     <i>菜单名称</i><el-input id="input" v-model="section.menu_name" placeholder="请输入菜单名称" @keyup.enter.native="fetchCourseLists" auto-complete="off" ></el-input>
                    </section>  
                </div>     
                <el-table v-loading="section.loading" border :data="section.data">
                    <el-table-column prop="menu_name" label="菜单名称" min-width="230"></el-table-column>
                    <el-table-column prop="parent_name" label="绑定栏目" width="100">
                        <!-- <template scope="scope">
                            {{scope.row.category_name || '无'}}
                        </template> -->
                    </el-table-column>
                    <el-table-column prop="menu_node" label="菜单标识" width="200"></el-table-column>
                    <el-table-column prop="sort" label="排序" width="70"></el-table-column>
                    <!-- <el-table-column class="tag" label="标签" :label-width="formLabelWidth">
                        <span @click="toggleTag(item.value)" :class="{'active': item.value == form.tags}" v-for="(item, index) in tags">{{item.name}}</span>
                    </el-table-column> -->
                    <el-table-column prop="addate" label="创建时间" width="180"></el-table-column>
                    <el-table-column prop="operate" label="操作" width="150" fixed="right">
                        <template scope="scope">
                            <el-button @click="$router.push({name: 'menu-edit', params: {roleInfo: scope.row, sys_id: scope.row.id, sys_type:'edit'}})" type="text" size="small">编辑
                                <!--a-->
                            </el-button>
                            <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">
                                删除
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="block">
                    <el-pagination
                            @current-change="sectionPageChange"
                            :current-page="section.page"
                            :page-size="section.pagesize"
                            small
                            layout="total,prev, pager, next"
                            :total="section.total">
                    </el-pagination>
                </div>
            </div>
        </section>
    </article>
</template>
<script>
    import menuService from '../../../services/sys/menuService'
    import MenuTree from '../../component/tree/MenuTree.vue'
    import ImagEcropperInput from '../../component/upload/ImagEcropperInputSec.vue'
    function initSection() {
        return {
            status: void 0, //  1-禁用 0-正常
            page: 1,
            pagesize: 10, 
            menu_name:'', //以下几行代码不给disablied传参的话可不写
            menu_node:'',
            remark:'',
            sort: void 0,
            pid: -1,
            level: void 0,
            disabled: void 0,
            total: 0,
            data: [],
            loading: false,
        }
    }
    export default {
        components: {
            MenuTree,ImagEcropperInput
        },
        data () {
            return {
                ratio: 0, // 裁剪的比例
                category: {
                    currentData: {},
                    loading: false,
                    title: '',
                    data: [],
                },
                // 表单相关属性
                formLabelWidth: '50px', // 表单label的宽度
                catArr: {
                    'course': '菜单',
                    'article': '资讯',
                    'link': '链接'
                },
                editPlacehoder: '',
                rules: {
                    name: [
                        {
                            required: true,
                            message: '名称不能为空',
                            trigger: 'blur'
                        }
                    ]
                },
                section: initSection(),
                defaultProps: {
                    children: 'children',
                    label: 'menu_name'
                },
                SecMenu:[],
                Mult:'true',// 判断左边 菜单多级栏目树状标识,
                mark:{
                    type:'menu',
                    name:'menu_name'
                }
            }
        },
        watch: {
            '$store.state.index.secMenu'(){
                this.category.currentData = Object.assign({},this.$store.state.index.secMenu) //复制一份vuex存储的值 
            },
            'category.currentData.id'(){
                this.fetchCourseLists () 
                // this.$refs.secCategory.handleNodeClick()
            },
           '$store.state.index.examCate'(){
               this.fetchCourseLists () 
               this.fetchData()
               
            }        
        },
        activated () {
            this.category.currentData.id = ''
            this.category.loading = true
            this.fetchData()
            this.fetchCourseLists()
        },
        methods: {
            req(param){
                return menuService.fetchData({ //传递方法
                    pid: -1,
                    level: -1,
                    pagesize:-1,
                })
            },
            // 左边的节点被点击
            treeNodeClick (type, data, node, store) {
                // console.log('===========   node.data.data==========  ')
                console.log(type, data, node, store)
                this.section.pid=node.id
                this.fetchCourseLists()

                if (type == 1) { 
                    // if (this.nodeSelected && this.nodeSelected.value === data.value) return  
                    this.nodeParentSelected = node.parent// 记录父节点
                    this.nodeSelected = node // 记录当前节点
                    // this.$refs.uploadImg.clearFiles()
                    this.fetchParam = Object.assign({},node.data)  //解决左右数据
                    // this.activeTab = 'edit'
                } else if (type == 2) {
                    this.moveToNode = node
                }
            },
            fetchData() {//获取左边栏目数据
                let param={
                        pid:-1, // 3- 供应商
                        page:1,
                        level: -1,
                        pagesize: -1,
                    }
                menuService.fetchData( param).then((ret) => {
                        this.SecMenu=ret.data
                        // console.log('this.SecMenu+++++++',param,this.SecMenu)
                        xmview.setContentLoading(false)     
                    })
            },
            fetchCourseLists () {
                this.section.loading = true
                // let params={
                //     menu_name:this.section.menu_name,
                //     status:this.section.status,
                //     stime:this.section.stime ,
                //     etime:this.section.etime,
                //     page: this.section.page,
                //     pagesize: this.section.pagesize,
                // }
                return menuService.fetchData(this.section).then((ret) => {
                    this.section.data = ret.data
                    this.section.total = ret._exts.total
                    this.section.loading = false
                })
            },
            handleDelete (index, row) {
                xmview.showDialog(`确认要删除菜单【<i style="color:red">${row.menu_name}</i>】吗？`, () => {
                    menuService.delete(row.id).then(() => {
                        xmview.showTip('success', '删除成功')
                        this.section.data.splice(index, 1)//删除选中项
                        row.deleted = 1
                        // this.fetchCourseLists()
                    }).catch((ret) => {
                        xmview.showTip('error', ret.message)
                    })
                })
            },
            update (index, row) {
                this.$router.push({
                    name:'exam-course-edit',
                    params:{
                        id:row.id,
                        courseInfo:row,
                    }
                })
            },
            sectionPageChange (val) {
                this.section.page = val
                this.fetchCourseLists()
            }
        }
    }
</script>
