
<!-- 包含选择树的弹出框子组件 待完善 2018-06-26 zhaoyicheng -->


<!--弹出表格选则数据-->
<!--使用demo-->

<!--<dialogSelectData v-model="dialogCourse.isShow" :fetchData="fetchCourse" title="选择课程"-->
<!--:selectedList="form.courses" @changeSelected="val=>form.courses=val">-->
<!--<div style="margin-bottom: 15px" slot="search">-->
<!--<el-input @keyup.enter.native="fetchCourse(true)" v-model="dialogCourse.keyword" icon="search"-->
<!--placeholder="请输入关键字搜索"></el-input>-->
<!--</div>-->
<!--</dialogSelectData>-->

<style lang='scss' rel='stylesheet/scss'>
    .comp-dialog-select4table {
        main {
            > section {
                >aside{
                    margin-bottom: 5px;
                }
                display: inline-block;
                width: 43%;

                &:first-of-type {
                    margin-right: 5%;
                }
            }
        }
    }
</style>

<template>
    <el-dialog :title="title" v-model="currVal" class="comp-dialog-select4table">

        <main>
            <CourseCategoryTree v-model="treeData" ref="courseCategory" :onNodeClick="treeNodeClick.bind(this,1)"></CourseCategoryTree>
            <div class="buttons">
                <!-- <el-button @click="getCheckedNodes">通过 node 获取</el-button>
                <el-button @click="getCheckedKeys">通过 key 获取</el-button>
                <el-button @click="setCheckedNodes">通过 node 设置</el-button>
                <el-button @click="setCheckedKeys">通过 key 设置</el-button>
                <el-button @click="resetChecked">清空</el-button> -->
            </div>
        </main>
        <span slot="footer">
                <el-button type="primary" @click="currVal=false">确定</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import CourseCategoryTree from '../../component/tree/CourseCategoryTree.vue'
    export default{
        props: {
            title: String, // dialog的标题
            value: { // 是否显示
                type: Boolean,
                default: false
            },
            // 获取数据的方法 返回一个Promise,  数据格式: { total: 9, data:[{ name:'xxx', id:1 }] }
            getData: Function,
            // 被选中的列表集合
            selectedList: Array,
            itemKey: {
                type:String,
                default: 'id'
            },
            treeData: [],

        },
        data () {
            return {
                currVal: this.value,
                currSelectedList: this.selectedList,
                fetchParam: {
                    page: 1,
                    pagesize: 15,
                    need_testing: 1,
                },
                total: 0,
                data: [],
                loading: false,
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        watch: {
            currVal (val) {
                this.$emit('input', val)
            },
            value (val) {
                val !== this.currVal && (this.currVal = val)

                if (val && this.data.length < 1) this.fetchCourse()

                val && this.setSelected()
            
            },
            selectedList (val) {
                if (val !== this.currSelectedList && val.length !== this.currSelectedList.length)
                    this.currSelectedList = val
            }
        },
        created () {
        },
        activated () {
        },
        methods: {
            // 左边的节点被点击
            treeNodeClick (type, data, node, store) {
                // console.log('===========   node.data.data==========  ')
                // console.log(node)
                console.log(this)
                if (type == 1) { 
                    // if (this.nodeSelected && this.nodeSelected.value === data.value) return  
                    this.nodeParentSelected = node.parent// 记录父节点
                    this.nodeSelected = node // 记录当前节点
                    this.$refs.uploadImg.clearFiles()
                    this.fetchParam = Object.assign({},node.data)  //解决左右数据
                    this.activeTab = 'edit'
                } else if (type == 2) {
                    this.moveToNode = node
                }
            },
            fetchCourse (isFirst) {
                this.loading = true
                if (isFirst) this.fetchParam.page = 1
                this.getData(this.fetchParam).then((ret) => {
                    // this.total = ret._exts.total
                    this.total = ret._exts.total
                    // 是否首次加载
                    if (this.fetchParam.page === 1) {
                        this.fetchParam.page = 1
                        this.data = []
                        if (ret.data.length < 1) return
                    }
                    this.data.splice(-1, 1)
                    this.data.push(...[...ret.data, {id: -1}])
                    console.log('dataGot: ', this.data)
                    // 设置选中
                    this.setSelected()

                    this.fetchParam.page++
                }, () => {
                }).then(() => {
                    this.loading = false
                })
            },
            rowSelected (selection, row) {
                // 排除已选课程
                // console.log(selection, row)  
                if (selection.indexOf(row) > -1)
                    this.currSelectedList.push(row)
                else
                    this.currSelectedList.splice(this.currSelectedList.indexOf(row), 1)

                this.$emit('changeSelected', this.currSelectedList)
                // console.log(this.currSelectedList)
            },
            delItem (row) {
                this.currSelectedList.splice(this.currSelectedList.findIndex(item => {
                    return item.id === row.id
                }), 1)
                // 重新设置选中
                this.setSelected()
                this.$emit('changeSelected', this.currSelectedList)
            },
            // 设置选中
            setSelected () {
                // console.log('setSelected')
                this.$nextTick(() => {
                    if (!this.$refs.courseTable) return
                    this.$refs.courseTable.clearSelection()
                    this.currSelectedList.forEach((row) => {
                        console.log(this.data)//左边数据
                        let currRow = this.data.find((item) => {
                            return item[this.itemKey] == row[this.itemKey]
                        })
                        console.log(currRow)//左边选中数据
                        this.$refs.courseTable.toggleRowSelection(currRow, true)
                        console.log('setSelected finished')
                    })
                })
            }
        },
        components: {CourseCategoryTree}
    }
</script>
