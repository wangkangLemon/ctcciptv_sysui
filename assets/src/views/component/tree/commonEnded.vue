<!--课程栏目-->

<template> 
    <!--这是父组件-->
    <el-tree v-loading="loading" :data="data" :show-checkbox="checkbox" :expand-on-click-node="false" @node-click="handleNodeClick"  ref="tree"
             @node-expand="handleNodeExpand" :highlight-current="selectable">
    </el-tree>
</template>

<script>
    import treeUtils from '../../../utils/treeUtils'

    export default{
        props: {
            onNodeClick: Function,
            value: Array,
            req:Function,
            mark:Object,   // 传{type：‘menu’,name:'name'}
            checkbox:false,
            param:Object
        },
        data () {
            return {
                data: this.value,
                loading: false,
                selectable: true, // 是否可选中
            }
        },
        created () {
           this.getdata()
        },
        methods: {
            getdata(){
                console.log(33,this.req(this.param));
                this.param.pid=0
                this.req(this.param).then(ret=>{ 
                console.log(2222222222222222,ret);
                // this.req(this.param).then(ret=>{ 
                ret.forEach(v => {
                        this.data.push({
                            data: v,
                            label: v.name,
                            value: v.id,
                            children: v.ended ? null : [{
                                label: '正在加载',
                                value: -1,
                            }]  //是否最终菜单？点箭头触发请求
                        })
                })
                console.log(2222222222222222,ret);
                this.loading = false
                xmview.setContentLoading(false)
                })

            },
            handleNodeExpand (data, node, nodeDom) { //点下拉箭头  
                // 如果是有children 并且只有一个[加载中...]的一项 则去服务器加载数据
                this.param.pid=node.data.value
                // this.req({id : 'tree', filter : true , pid :node.data.value , level:-1, pagesize:-1}).then(ret=>{
                this.req(this.param).then(ret=>{
                    let arr = []
                    ret.forEach(v => {
                        arr.push({
                            data: v,
                            label: v.name,
                            value: v.id,
                            children: v.ended ? null : [{ 
                                label: '正在加载',
                                value: -1,
                            }]  //是否最终菜单？
                        })
                })
                node.data.children = arr
                this.loading = false
                xmview.setContentLoading(false)
                })
            },
            handleNodeClick (data, node, store) { //点击
                if(!this.onNodeClick)return
                this.onNodeClick(1, data, node, store) 
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
                if (!parent.data.children) {
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