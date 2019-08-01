<!--工业连锁店-->

<!--使用示范:-->
<!--<IndustryCompanySelect v-model="fetchParam.enterprise_id"-->
<!--v-on:change="val=>fetchParam.enterprise_id=val"-->
<!--:change="fetchData">-->
<!--</IndustryCompanySelect>-->

<template>
    <SelectScroll :changeCb="handleChange" :requestCb="fetchRoler" :placeholder="placeholder" :list="list" v-model="currVal" :disabled="disabled">
    </SelectScroll>
</template>

<script>
    import SelectScroll from '../../component/form/SelectScroll.vue'
    import sysService from '../../../services/sys/sysService'
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
            fetchRoler (val, length) { 
                return sysService.fetchData({
                    name:val,
                    pagesize: this.pageSize,
                    page: parseInt(length / this.pageSize) + 1
                }).then((ret) => {
                    this.$emit('changelist', ret)
                    return ret
                })
            },
            handleChange(val) {
                this.currVal = val
                this.$emit('input', val)
                this.$emit('change', val)
                this.change && this.change(val)  
            },
        },
        components: {
            SelectScroll
        }
    }
</script>
