<!--课程栏目-->
<style lang="scss">
    .course-select-container {
        .el-icon-caret-bottom {
            text-align: center;
            text-align-last: center;
        }
    }
</style>
<template>
    <el-cascader class="course-select-container" ref="container" v-loading="loading" :options='options' :show-all-levels="false" :change-on-select="changeOnSelect"
        :placeholder="placeholder" @active-item-change="handleItemChange" :clearable="true" @change="setCurrVal">
    </el-cascader>
</template>

<script>
    import treeUtils from '../../../utils/treeUtils'
    import menuService from '../../../services/sys/menuService'
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
            req:Function,
            mark:Object   // 传{type：‘menu’,name:'name'}
        },
        data() {
            return {
                loading: false,
                options: [],
                currVal: this.value,
                govid: void 0, // 企业id
                lastData: void 0,
                changeOnSelect:this.mark.changeOnSelect?this.mark.changeOnSelect:false,
            }
        },
        watch: {
            'value' (val) {
                this.setCurrVal(val)
            },
            'currVal' (val, old) {
                this.$emit('input', val.length > 0 ? parseInt(val[val.length - 1]) : val)
                this.onchange && this.onchange(val)
            }
        },
        mounted() {
             //第一步：处理数据
                function func(arr) {
                    arr.forEach(v=>{
                        if(v.pid != 0){
                            let t = find(arr,'id',v.pid);
                            t&&(t.children?t.children.push(v):t.children=[v])
                        }
                    });
                    return arr.filter(v=>{
                        return v.pid == 0;
                    })
                }
                function find(arr,key,value){
                    for(let i =0;i<arr.length;i++){
                        if(arr[i][key]==value){
                        return arr[i]
                        }
                    }
                    return false;
                }
               
            // 第二步： 替换键值XX_name->label,id>value
            function transfor(arr,name){
                arr.forEach(v=>{
                    v['label']=v[name]
                    v['value']=v['id']
                })
            
               return arr
            }
            this.$refs.container.$el.addEventListener('click', () => {
                if (this.loading || this.options.length > 0) return
                if (this.lastData) {
                    this.options = this.lastData

                } else {

                    this.loading = true
                    //获取数据的方法
                    this.req({
                        pid: 0,
                        level: -1,
                        pagesize:-1
                    }).then((ret) => {
                        console.log(this.options)
                        let data=transfor(ret.data,this.mark.name)
                        this.options=func(data)
                        
                        // ret.data.forEach(v => {
                        //     this.options.push({
                        //         data: v,
                        //         label: v.menu_name,
                        //         value: v.id,
                        //         children: v.ended ? null : [] //是否最终菜单？
                        //     })
                        // })
                        this.loading = false
                        xmview.setContentLoading(false)
                    })

                }
            })
        },
        deactivated() {
            if (this.autoClear && this.options.length > 0) {
                this.lastData = this.options
                this.options = []
            }
        },
        activated() {},
        methods: {
            setCurrVal(val) { //在请求子集时判断设置值
                if (!val) this.$refs.container.clearValue(new window.Event('click'))
                if (this.currVal == val || !val) return
                this.currVal = val
            },
            handleItemChange(val) {
                if (val.length < 1) return
                // 递归找到该项
                // console.log(val)
                // let currItem = treeUtils.dataToTree(this.options, val, 'value') //拿到当前项 

                var arr = []
                this.req({
                    pid: val[val.length - 1],
                    level: -1,
                    pagesize:-1
                }).then((ret) => {
                    // this.options.forEach(v => {
                    //     if (v.value == val[val.length-1]) {
                    //         ret.forEach(retItem => {
                    //             console.log(retItem)
                    //             arr.push({
                    //                 data: retItem,
                    //                 label: retItem.name,
                    //                 value: retItem.id,
                    //                 children: retItem.ended ? null : []
                    //             })
                    //         })
                    //         v.children = arr
                    //     }
                    // })
                    var arr = ret.data.map(v => {
                        v.label = v.menu_name
                        v.value = v.id
                        v.children = v.ended ? null : [] //是否最终菜单？是为nulgl 否则为一个数组
                        return v
                    })
                    // console.log(currItem)
                    currItem.children = arr
                    this.loading = false
                    xmview.setContentLoading(false)
                })
                // courseService.getCategoryTree({type: this.type, govid: this.govid, id: val[val.length - 1]})//id: val[val.length - 1 ]
                // courseService.getCategoryTree({type: this.type, govid: this.govid, id: val[val.length - 1]})
                //     .then(ret => {
                //         // 重新组合数据
                //         ret.map((item) => {
                //             item.label = item.name
                //             item.value = item.id
                //             item.children = item.has_children ? [{label: '加载中...'}] : null
                //         })
                //         currItem.children = ret
                //     })
            },
            clearData() {
                this.lastData = this.options
                this.options = []
            }
        },
        components: {}
    }
</script>