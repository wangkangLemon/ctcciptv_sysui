<template>
    <el-form-item label="选项" v-model="item">
        <el-checkbox class="radio" :disabled="!item.editable" v-model="option.correct" :label="option.description" :true-label="1" :false-label="0">
            <i>{{option.description}}</i>
        </el-checkbox>
    </el-form-item>
</template>
<script>
export default {
    props: {
        options: Array,
        item: Object,
        selectAreas: String
    },
    data(){
        return{
            
        }
    },
    created () {
        
    },
    methods: {
        
    }
}
</script>
    