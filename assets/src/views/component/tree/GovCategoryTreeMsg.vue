<!--课程栏目 -->

<template> 
    <!--这是父组件-->
    <el-tree v-loading="loading" 
            :data="data" 
            show-checkbox 
            :expand-on-click-node="false" 
            @node-click="handleNodeClick"
            @node-expand="handleNodeExpand" 
            :highlight-current="selectable"
            :default-checked-keys="defaultCheckedkeys"
            node-key="id"
            :check-strictly="true"	
            :props="defaultProps"
            ref="tree" >
    </el-tree>
</template>

<script>
    import govService from "../../../services/gov/govService.js"
    import treeUtils from '../../../utils/treeUtils'

    export default{
        props: {
            onNodeClick: Function,
            value: Array,
            defaultCheckedkeys:Array,
        },
        data () {
            return {
                data: this.value,
                loading: false,
                selectable: true, // 是否可选中
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        created () {
            this.getData({id : 'tree', type :'course', filter : true , pid :0 , level:-1, pagesize:-1}).then(ret=>{ 
                this.data = ret.data.map(v => {
                    return {
                        id: v.id,
                        label: v.name,
                        data: v,
                        name: v.name,
                        children: v.level>1 ? null : [{ 
                            label: '正在加载',
                            value: -1,
                        }]  //是否最终菜单？
                    }
                })
               this.loading = false
               xmview.setContentLoading(false)
            })
        },
        methods: {
            // 给子元素获取数据的方法
            getData (params) {
                return govService.getSelectList(params)
            },
            handleNodeExpand (data, node, nodeDom) { //点下拉箭头  
                // 如果是有children 并且只有一个[加载中...]的一项 则去服务器加载数据
                console.log('expand========',this.defaultCheckedkeys);

                console.log(data, node, nodeDom );
                // node.data.children = [ {
                //                 id: 711558,
                //                 label: '演示区'}]

                this.getData({id : 'tree', type :'course', filter : true , pid :data.id , level:-1, pagesize:-1}).then(ret=>{
                    console.log(ret.data);
                    console.log('expand========',this.defaultCheckedkeys);
                    node.data.children =  ret.data.map(v => {
                        return {
                                id: v.id,
                                label: v.name,
                                data: v,
                                name: v.name,
                                children: v.level>1 ? null : [{ 
                                        label: '正在加载',
                                        value: -1,
                                    }]  //是否最终菜单？
                            }
                    })
                    this.loading = false
                    xmview.setContentLoading(false)
                })
            },
            handleNodeClick (data, node, store) { //点击
                console.log(node.data)
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