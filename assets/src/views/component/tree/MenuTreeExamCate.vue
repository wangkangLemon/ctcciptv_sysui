<style lang='scss' rel='stylesheet/scss'>
    @import "../../../utils/mixins/mixins";
    .left-menu-container {
        .fa {
            margin-right: 5px;
        }
    }
</style>

<template>
    <el-tree  :data="data1" :props="defaultProps" @node-click="handleNodeClick" :highlight-current="selectable">{{this.data}}</el-tree>
</template>
<script>
    //这是 组件   
    import MenuTree from './MenuTreeSec.vue'
    export default {
        name: 'MenuTree',
        data() {
            return {
                leafChildren: null, // 叶子节点
                hasChildCItems: [], // 有子节点的item
                data1: null,
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                selectable: true, // 是否可选中
            }
        },
          props: {
            onNodeClick: Function,
            data: [Array,Object],
            Mult: [String]
        },
        created() {
            var arr = []
            console.log(this.data)
            this.data.forEach(v => {
                // if (v.level == 0) {
                    arr.push({
                        id: v.id,
                        // pid: v.pid,
                        // category_id:v.category_id,
                        // chapter_type:v.chapter_type,
                        price:Number(v.price)/100,  // //应试考试价格从服务端拿数据除以100倍（分）
                        name: v.name,
                        image:v.image,
                        remark:v.remark,
                        sort:v.sort,
                        level:v.level,
                        product_id:v.product_id,
                        product_name:v.product_name,
                        children: []
                    })
                // }
            })
            if(this.Mult){
                this.data.forEach(v => {
                if (v.level == 1) {
                    arr.forEach(item => {
                        if (v.pid == item.id) {
                            item.children.push({
                                id: v.id,
                                pid: v.pid,
                                category_id:v.category_id,
                                chapter_type:v.chapter_type,
                                name: v.name,
                                image:v.image,
                                remark:v.remark,
                                sort:v.sort,
                                level:v.level,
                                product_id:v.product_id,
                                product_name:v.product_name,
                                children: []
                            })
                        }
                    })
                }
            })
            }
            this.data1 = arr
            let hasChildCItems = []
            let leafChildren = []
            if (this.data.children) {
                this.data.children.forEach((item) => {
                    if (item.children != null) {
                        hasChildCItems.push(item)
                    } else {
                        leafChildren.push(item)
                    }
                })
            }

            this.hasChildCItems = hasChildCItems
            this.leafChildren = leafChildren
        },
        components: {
            MenuTree
        },
        methods: {
            handleNodeClick(a,node, store){
                if(this.onNodeClick){ //栏目树结构调用改变type：‘update’
                    this.onNodeClick(1, a, node, store) 
                }
                if (!a)return
                if( a.level == 0 ){
                    this.$store.dispatch('savePid',a.id)
                    console.log(this.$store.state.index.secPid)
                }
                
                this.$store.dispatch('setSecMenu',a)   //vuex左边分类存储
                //  根节点无法被选中 
                // if ( a.level  == 0) return
                this.selectable = true
            },
            // 清空选中项
            clearSelected () {
                this.selectable = false
            },
        }
    }
</script>