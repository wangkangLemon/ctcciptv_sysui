<!--区块数据-选取内容-课程栏目-->
<style lang="scss">
    .course-select-container {
        .el-icon-caret-bottom {
            text-align: center;
            text-align-last: center;
        }
    }
</style>
<template>
    <el-cascader class="course-select-container" ref="container" v-loading="loading" :options='options' :show-all-levels="false" 
        :placeholder="placeholder" @active-item-change="handleItemChange" :clearable="clearable" @change="setCurrVal">
    </el-cascader>
</template>

<script>
    import cateService from '../../../services/section/cateService'
    import examService from '../../../services/exam/examService'
    import treeUtils from '../../../utils/treeUtils'
    import formUtils from '../../../utils/formUtils'
    export default {
        props: {
            value: [String, Number, Array],
            autoClear: {
                type: Boolean,
                default: false
            },
            onchange: Function,
            placeholder: {
                type: String,
                default: '请选择'
            },
            showNotCat: { // 是否显示未分类的选项
                type: Boolean,
                default: true
            },
            type: {
                type: String,
                default: ''
            },
            reqFun:Function, //二级
            reqExamCateFun:Function,//一级
            clearable:{
                type: Boolean,
                default: true
            },
        },
        data() {
            return {
                loading: false,
                options: [],
                currVal: this.value,
                govid: void 0, // 企业id
                lastData: void 0,
                // clearable:this.clearable?this.clearable:true
            }
        },
        watch: {
            'value' (val) {  //点击之后选中的值
                this.setCurrVal(val)
                if(this.reqExamCateFun){
                    this.$store.dispatch('saveExamCategory',Object.assign({},this.$store.state.index.examCate,{category_id:val}))
                }
            },
            'currVal' (val, old) { //高亮选中值
                this.$emit('input', val.length > 0 ? parseInt(val[val.length - 1]) : val)
                this.onchange && this.onchange(val)
            },
            '$store.state.index.examCate'(){
              this.handleData()
            }    
        },
        mounted() {
            // console.log(this.clearable)
            this.handleData()
        },
        deactivated() {
            if (this.autoClear && this.options.length > 0) {
                this.lastData = this.options
                this.options = []
            }
        },
        methods: {
            handleData(){
                this.$refs.container.$el.addEventListener('click', () => {
                    if (this.reqExamCateFun && this.options.length) return    //在处理exam兼容复用组件 在一级组件请求this.reqExamCateFun后就不再重复请求
                    //if (this.loading || this.options.length > 0) {return}   // 在处理exam兼容复用组件 在请求了以及组件后 this.options.length>0 也往下走！ 去请求接口处理数据！
                    if (this.lastData) {
                        console.log(this.lastData)
                        this.options = this.lastData
                    } else {
                       this.handleDatafun()
                    }
                    
                })
            },
            handleDatafun(){
                 // this.loading = true //这是在请求数据前打开loading动画2-28打开
                        //获取数据的方法
                        let req =this.reqExamCateFun||this.reqFun||this.onchange
                        req().then((ret) => {
                            // console.log(ret)
                            this.options=[]
                            var obj = {}
                            ret.forEach(v => {
                                if (v.level == 0 || v.level === undefined) {
                                    let t = {
                                        data: v,
                                        label: v.name,
                                        value: v.id,
                                        // children: []
                                    }
                                    obj[v.id] = t;
                                    this.options.push(t);
                                }
                            })
                            ret.forEach((v,i) => {
                                // console.log(v.level+'-------'+ v.id+'-------'+ v.pid+'--------'+i)
                                if (v.level == 1) {
                                    // this.options.forEach(item=>{ //一级
                                        //      if (v.pid == item.id){
                                        //          obj[v.pid].children.push({
                                        //             data: v,
                                        //             label: v.name,
                                        //             value: v.id
                                        //          })
                                        //      }
                                        // })
                                        // console.log( this.options)
                                    
                                    obj[v.pid].children?   // id:51 缺失---2018-3-25
                                    obj[v.pid].children.push({
                                        data: v,
                                        label: v.name,
                                        value: v.id
                                    }):
                                    obj[v.pid].children = [{
                                        data: v,
                                        label: v.name,
                                        value: v.id
                                    }]
                                }
                            })
                            // console.log(ret)
                            
                            this.loading = false
                            xmview.setContentLoading(false);
                        })
            },
            setCurrVal(val) { //在请求子集时判断设置值
                if (!val) this.$refs.container.clearValue(new window.Event('click'))
                if (this.currVal == val || !val) return
                this.currVal = val
            },
            handleItemChange(val) {
            },
            clearData() {
                this.lastData = this.options
                this.options = []
            },
         

        },
        components: {}
    }
</script>