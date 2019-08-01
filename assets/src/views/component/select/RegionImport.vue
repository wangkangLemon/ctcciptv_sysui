<!--地区下拉选择-->

<!--使用示范:-->
<!--<Region v-on:provinceChange="val => provinceSelect = val"
        v-on:cityChange="val => citySelect = val"
        v-on:areaChange="val => areaChange = val"
        :change="fetchData"></Region>-->

<style lang='scss' rel='stylesheet/scss'>
    .region-container {
        .el-select {
            max-width: 130px !important;
        }
    }
</style>

<template>
    <section class="region-container" ref="container">
        <i>{{title}}</i>
        <el-select :disabled="disabled" placeholder="全部" clearable @change="setCurrVal(0, provinceSelect)" v-model="provinceSelect">
            <el-option v-for="(item, index) in provinces" :label="item.name" :value="item.id" :key="item.id">
            </el-option>
        </el-select>
        <el-select :disabled="disabled" placeholder="全部" clearable @change="setCurrVal(1, citySelect)" v-model="citySelect">
            <el-option v-for="(item, index) in citys" :label="item.name" :value="item.id" :key="item.id">
            </el-option>
        </el-select>
        <el-select :disabled="disabled" placeholder="全部" clearable @change="setCurrVal(2, areaSelect)" v-model="areaSelect">
            <el-option v-for="(item, index) in areas" :label="item.name" :value="item.id" :key="item.id">
            </el-option>
        </el-select>
        <!-- <el-select :disabled="disabled" placeholder="全部" clearable @change="setCurrVal(3, townSelect)" v-model="townSelect">
            <el-option v-for="(item, index) in towns" :label="item.name" :value="item.id" :key="item.id">
            </el-option>
        </el-select>
        <el-select :disabled="disabled" placeholder="全部" clearable @change="setCurrVal(4, villageSelect)" v-model="villageSelect">
            <el-option v-for="(item, index) in villages" :label="item.name" :value="item.id" :key="item.id">
            </el-option>
        </el-select> -->
    </section>
</template>

<script>
    // import cityData from '../../../assets/js/govCity.js'
    import treeUtils from '../../../utils/treeUtils'

    import govService from '../../../services/gov/govService.js'

    export default {
        props: ['change', 'title', 'province', 'city', 'area', 'town', 'village', 'disabled'],
        data() {
            return {
                provinces: [],
                citys: [],
                areas: [],
                towns: [],
                villages: [],
                // provinceSelect: this.$store.state.index.navMenu,
                provinceSelect: '',
                citySelect: '',
                areaSelect: '',
                townSelect: '',
                villageSelect: '',
                curItem: [],
                cityData: '',
                options: [],
                fetchParam: {
                    pagesize: -1,
                    pid: 0,
                    province_id: null,
                    city_id: null,
                    area_id: null,
                    town_id: null,
                    village_id: null,
                }
            }
        },
        watch: {
            province(val) {
                if (val) {
                    this.provinceSelect = val
                    console.log('this.provinceSelect='+this.provinceSelect)
                    this.currentVal(0, val)
                } else {
                    this.provinceSelect = ''
                }
            },
            city(val) {      
                if (this.province && val) {
                    this.citySelect = val
                    // console.log('this.citySelect='+this.citySelect)
                    this.currentVal(1, val)
                } else {
                    this.citySelect = ''
                }
            },
            area(val) {
                if (this.province && this.citySelect && val) {
                    this.areaSelect = val
                    this.currentVal(2, val)
                    // console.log('this.areaSelect='+this.areaSelect)
                } else {
                    this.areaSelect = ''
                }
            },
            town(val) {
                if (this.province && this.citySelect && this.areaSelect && val) {
                    this.townSelect = val
                    this.currentVal(3, val)
                    // console.log('this.townSelect='+this.townSelect)
                } else {
                    this.townSelect = ''
                }
            },
            village(val) {
                if (this.province && this.citySelect && this.areaSelect && this.townSelect && val) {
                    this.villageSelect = val
                    this.currentVal(4, val)
                    // console.log('this.villageSelect='+this.villageSelect)
                } else {
                    this.villageSelect = ''
                }
            },
            disabled(val) {
                if (val) {
                    this.provinceSelect = ''
                }
            }
        },
        created() {
                    console.log('this.provinceSelect='+this.provinces)


        },
        mounted() {
            // 获取数据  按需加载 按需处理数据？  三个独立的选择器
            // this.$refs.container.addEventListener('click', () => {
            // if(this.cityData ){
            //      this.options = this.lastData
            // }else{

            // }
            this.getData(this.fetchParam.pid, 'provinces')

            // this.cityData.forEach((item) => {
            //     this.provinces.push({
            //         name: item.name,
            //         id: item.id
            //     })
            // })
            // })

        },
        methods: {
            getData(pid, address) {
                // console.log(this.fetchParam.provinceSelect)
                if (this.fetchParam.provinceSelect !== undefined) {
                    this.fetchParam.pid = this.fetchParam.villageSelect || this.fetchParam.townSelect || this.fetchParam
                        .areaSelect || this.fetchParam.citySelect || this.fetchParam.provinceSelect
                }
                this.loading = true
                govService.getSelectList({
                    pagesize: -1,
                    pid: pid,
                    province_id: this.fetchParam.provinceSelect,
                    city_id: this.fetchParam.citySelect,
                    area_id: this.fetchParam.areaSelect,
                    town_id: this.fetchParam.townSelect,
                    village_id: this.fetchParam.villageSelect,

                }).then((ret) => {
                    this.cityData = ret.data
                    let arr = []
                    this.cityData.forEach(v => {
                        arr.push({
                            data: v,
                            // children: v.pid ? null : [], //是否最终菜单？
                            name: v.name,
                            id: v.id
                        })
                    })
                    // console.log(arr)
                    this[address] = arr

                }).then(() => {
                    this.loading = false
                })
            },
            currentVal(type, val) {
                let levelPath = []
                let emitArr = ['provinceChange', 'cityChange', 'areaChange', 'townChange', 'villageChange']
                let typeArr = ['provinceSelect', 'citySelect', 'areaSelect', 'townSelect', 'villageSelect']
                let t = ['provinces', 'citys', 'areas', 'towns', 'villages']

                if (!this[typeArr[type]]) return
                levelPath = [this[typeArr[type]]]
                if (type < typeArr.length - 1) { //最后一级之前
                    this.getData(val, t[type + 1]) //拿到下一级数据
                    //     for (let i = type + 1; i < typeArr.length; i++) { // 从当前项开始初始化（清空）
                    //         this[typeArr[i]] = null 
                    //         // console.log(this[typeArr[i]])    
                    //                                     //1 触发方法不能是三个 改成一个 这样来初始化 （清空）
                    //                                     // 2 现在省触发3 市2 县1 
                    //                                     // 3子组件调用父组件方法来回触发方法要解决的bug
                    //     }
                }
                // this.change && this.change(val, t[type + 1])
                //
            },

            //在添加的时候 部门级别选择的时候 先存进vuex 获取的默认是vuex的值 选择后在触发change事件

            setCurrVal(type, val) { //type  0 省 1 市 2 县
                let emitArr = ['provinceChange', 'cityChange', 'areaChange', 'townChange', 'villageChange']
                let typeArr = ['provinceSelect', 'citySelect', 'areaSelect', 'townSelect', 'villageSelect']
                // if (!val) {
                //     if(type<=0){return false}
                //     this.$emit(emitArr[type-1], this[typeArr[type-1]])
                //     this.$store.dispatch('saveGovRank', {'emitArr[type-1]':this[typeArr[type-1]]})
                // } else {
                //     this.$emit(emitArr[type], val)
                //     this.$store.dispatch('saveGovRank', {'emitArr[type]': val})
                // }

                this.$emit(emitArr[type], val)
                this.$store.dispatch('saveGovRank', {'emitArr[type]': val})
                if (!val) {
                    this.change && this.change(true)
                } else {
                    this.change && this.change()
                }
                
            }
        }
    }
</script>