<!--课程栏目-->
<template> 
    <!--这是父组件-->
    <!--<el-tree v-loading="loading" :data="data" :expand-on-click-node="false" @node-click="handleNodeClick"
             @node-expand="handleNodeExpand" :highlight-current="selectable">
    </el-tree>-->
    <el-tree v-loading="loading" :data="data" :expand-on-click-node="false" @node-click="handleNodeClick"
             :highlight-current="selectable">
    </el-tree>
</template>
<script>
    import courseTaskService from '../../../services/gov/courseTaskService.js'
    // import examTaskService from '../../../services/gov/examTaskService.js'
    import treeUtils from '../../../utils/treeUtils'

    export default{
        props: {
            onNodeClick: Function,
            value: Array,
            treeType: [String, Number],
        },
        data () {
            return {
                data: this.value,
                loading: false,
                selectable: true, // 是否可选中
            }
        },
        created () {
            if(this.treeType==undefined){
                return false
            }
            console.log('this.treeType=',this.treeType);
            this.getData(this.treeType)
            xmview.setContentLoading(false)
            // this.getData({id : 'tree', type :'course', filter : true , pid :0 , level:-1, pagesize:-1}).then(ret=>{ 
            // this.getData({ id:'', name, pagesize:-1 }).then(ret=>{ 
            //      this.data = ret.data.map(v=>{
            //             v.data=v
            //             v.label = v.name
            //             v.value=v.id
            //             return v
            //         }) 
            //    this.loading = false
            //    xmview.setContentLoading(false)
            // })
        },
        watch: {
            treeType(){
                console.log('this.treeType',this.treeType)
                this.getData(this.treeType)
            }
        },
        methods: {
            // 给子元素获取数据的方法
            getData (type) {  
                let param
                console.log('type',type);
                
                if(type=='1')param={ id:'', name, pagesize:-1,type:1 }
                else if(type=='3')param={ id:'', name, pagesize:-1,type:3 }
                else if(type=='exam')param={ id:'', name, pagesize:-1,type:2 }
                if(!param)return
                courseTaskService.getCategoryTree(param).then(ret=>{ 
                 this.data = ret.data.map(v=>{
                        v.data=v
                        v.label = v.name
                        v.value=v.id
                        return v
                    }) 
               this.loading = false
               xmview.setContentLoading(false)
            })
            },  
            handleNodeClick (data, node, store) { //点击
                 this.$emit('onNodeClick', {data, node, store})
                 if(this.onNodeClick) this.onNodeClick(1, data, node, store) 
                //  根节点无法被选中 
                if (data.value == 0) return
                this.selectable = true
            },
            // 清空选中项
            clearSelected () {
                this.selectable = false
            },
            removeItem (item, parent) {
                // 父节点没有children 说明当前是根节点
                if (!parent.data.children) { //根节点
                    this.data = this.data.filter((curr) => {
                        return curr.value != item.value
                    })
                } else {
                    parent.data.children = parent.data.children.filter((curr) => {
                        return curr.value != item.value
                    })
                    if (parent.data.children.length < 1) parent.data.children = null
                }
                // 重新给父容器赋值  不然数据不同步
                this.$emit('input', this.data)
            },
            setCurrVal (val) { //给输入框设置值
                if (val === this.data) return
                this.data = val
                this.$emit('input', val)
            },
        },
    }
      function findItem(arr,key,value){
        arr.forEach(item=>{
            if(item[key] == value ){
                return item
            }
        })
    }
</script>