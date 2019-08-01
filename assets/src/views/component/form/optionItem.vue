<template>
    <el-form-item label="选项"  v-if="qtype!='A4'">
        <h5>请在正确答案前面打勾</h5>
        <div class="multy-choose-item" v-for="(option,indexOption) in item.options" :key="indexOption">
            <el-checkbox v-model="option.correct" :true-label="1" :disabled="!item.editable" v-if="item.type == 2"></el-checkbox>
            <el-radio class="radio" v-model="item.correct" :label="indexOption" :disabled="!item.editable" v-else>
                <i></i>
            </el-radio>
            <el-input placeholder="填写描述" v-model="option.description" :disabled="!item.editable"></el-input>
            <el-button :disabled="!item.editable" type="text" @click="item.options.splice(indexOption, 1)">
                <i>删除</i>
            </el-button>
        </div>
    </el-form-item>
</template>
<script>
export default {
    props: {
        options: Array,
        value: String,
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
    