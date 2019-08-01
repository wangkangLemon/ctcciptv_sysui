<!--课程栏目-->

<template> 
    <!--这是父组件-->
    <el-tree v-loading="loading" ref="tree" 
            :data="data" 
            :show-checkbox="checkbox" 
            :expand-on-click-node="false" 
            @node-click="handleNodeClick" 
            :highlight-current="selectable" 
            :props="defaultProps"
            @node-expand="handleNodeExpand">
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
            nodeExpand:Number
        },
        data () {
            return {
                data: this.value,
                loading: false,
                selectable: true, // 是否可选中
                type:this.type,
                 defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            }
        },
        created () {
            console.log('this.nodeExpand',this.nodeExpand);
            
             //第一步：处理数据
                function func(arr) {
                    arr.forEach(v=>{ //子级
                        if(v.pid != 0){
                            let t = find(arr,'id',v.pid);
                            t&&(t.children?t.children.push(v):t.children=[v])
                        }
                    });
                    return arr.filter(v=>{  //父级
                        return v.pid == 0;
                    })
                }
                function find(arr,key,value){  //处理children
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
            // this.req({id : 'tree', type :'menu', filter : true , pid :-1 , level:-1, pagesize:-1}).then(ret=>{ 
            //     // console.log(ret.data);
            //     let data=transfor(ret.data,this.mark.name)
            //     this.data=func(data)
            //     // xmview.setContentLoading(false)
            // })
            this.getData(0)
        },
        methods: {
            // 获取数据两种方法
            getData(pid){
                // console.log(ret.data);
                    if(this.nodeExpand){
                        this.req(pid).then(ret=>{ 
                            console.log('进入展开');
                            ret.data.forEach(v => {
                                console.log(this.data);
                                console.log(v);
                                this.data.push({
                                    data: v,
                                    label: v.name,
                                    value: v.id,
                                    children: v.level>2 ? null :[{
                                        label: '正在加载',
                                        value: -1,
                                    }]  //是否最终菜单？点箭头触发请求
                                    // children: v.ended ? null : [{
                                    //     label: '正在加载',
                                    //     value: -1,
                                    // }]  //是否最终菜单？点箭头触发请求
                                })
                            })
                        })

                    }
                    else{
                        this.req({id : 'tree', type :'menu', filter : true , pid :-1 , level:-1, pagesize:-1}).then(ret=>{
                            let data=transfor(ret.data,this.mark.name)
                            //拿到最终节点数据
                            this.data=func(data)
                        })
                    }
                  
                    // xmview.setContentLoading(false)
            },

            handleNodeExpand (data, node, nodeDom) { //点下拉箭头  
                // 如果是有children 并且只有一个[加载中...]的一项 则去服务器加载数据

                //这里的方法里面的参数必须是可以传递的
                console.log(data, node, nodeDom);
    
                this.getData(node.data.value).then(ret=>{
                    // debugger
                    let arr = []
                    
                    ret.data.forEach(v => {
                        arr.push({
                            data: v,
                            label: v.name,
                            value: v.id,
                            children: v.level>2? null : [{ 
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
                 this.$emit('onNodeClick', {data, node, store})// 强制触发父组件的方法存值
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