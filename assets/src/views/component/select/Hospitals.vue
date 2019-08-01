<!--工业连锁店-->

<!--使用示范:-->
<!--<IndustryCompanySelect v-model="fetchParam.enterprise_id"-->
<!--v-on:change="val=>fetchParam.enterprise_id=val"-->
<!--:change="getHospitalList">-->
<!--</IndustryCompanySelect>-->

<template>
    <SelectScroll :changeCb="handleChange" :requestCb="getHospitalList" :placeholder="placeholder" :list="list" v-model="currVal" :disabled="disabled">
    </SelectScroll>
</template>

<script>
    import SelectScroll from '../../component/form/SelectScroll.vue'
    import expertsService from '../../../services/course/expertsService.js'
    export default{
        props: {
            value: [String, Number],
            change: Function,
            placeholder: String,
            list: Object,
            disabled: {
                type: Boolean,
                default: false
            },
            // 0-企业 1-工业 2-连锁
            type: [String, Number]
        },
        data () {
            return {
                currVal: this.value,
                pageSize: 15
            }
        },
        watch: {
            'value'(val, oldValue) {
                this.currVal !== val && (this.currVal = val)
            }
        },
        methods: {
            getHospitalList (val, length) {
                return expertsService.fetchHospitalData({
                    name: val,
                    // category: this.type,
                    pagesize: this.pageSize,
                    page: parseInt(length / this.pageSize) + 1
                }).then((ret) => {
                    this.$emit('changelist', ret)
                    console.log(ret)
                    return ret
                })
            },
            handleChange(val) {
                this.currVal = val
                this.$emit('input', val)
                this.$emit('change', val)
                this.change && this.change()
            },
        },
        components: {
            SelectScroll
        }
    }
</script>
