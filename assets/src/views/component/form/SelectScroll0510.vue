<!--滚动刷新的select-->
<!--使用方式-->
<!--<SelectScroll :changeCb="handleChange" :requestCb="fetchData" v-model="value">-->
<!--</SelectScroll>-->
<style lang='scss' rel='stylesheet/scss'>
    .component-form-selectscroll-more {
        color: #50bfff;
        cursor: pointer;
    }
</style>

<template>
    <el-select  v-model="selectVal" :placeholder="currPlaceholder" ref="container" @visible-change="handleVisibleChange"
               @change="handleChange" :clearable="true" no-data-text="暂无数据" :disabled="disabled"
               no-match-text="没有数据">
        <el-option :disabled="true" value="xmystinputval" style="height: 50px">
            <el-input @change="filter" placeholder="搜索内容"></el-input>
        </el-option>
        <el-option v-for="item in data"
                   :label="item[itemObj[1]]"
                   :key="item[itemObj[0]]"
                   :value="item[itemObj[0]]">
        </el-option>

        <el-option v-loading="loading" value="xmyst2" :disabled="true" v-show="!this.data || this.data.length < 1">
            <span>暂无数据</span>
        </el-option>
        <el-option value="xmyst1" :disabled="true" v-show="isShowGetMore && this.data && this.data.length > 0"
                   v-loading="loading">
            <span ref="domLoading" class="component-form-selectscroll-more" v-show="!loading">点击加载更多</span>
            <span v-show="loading">加载中...</span>
        </el-option>
    </el-select>
</template>

<script>
    export default{
        props: {
            // 请求数据的回调  参数:(val, length)  val-筛选关键词   length 当前的数据长度  注:只会出现其中一个
            // 返回一个Pormise对象 结果 { data: [{ name:'xm', id:1 }], total: 20 }
            requestCb: Function,
            changeCb: Function, // 选项改变回调
            value: [String, Number],
            placeholder: {
                // type: String,
                default: '请选择'
            },
            disabled: {
                type: Boolean,
                default: false
            },
            list: Array, // 已有的数据集合
            isend:Boolean,
            itemObj: { //父组件默认的键值
                type:Array,
                // default:()=>  ['id','name']
            },
        },
        data () {
            return {
                keyword: void 0, // 搜索关键字
                selectVal: this.value,
                data: this.list == null ? [] : this.list,
                loading: false,
                currPlaceholder: this.placeholder,
                input: null,
                isSearching: false,
                isShowGetMore: true, // 是否显示加载更多按钮
            }
        },
        watch: {
            'data'(val) {
                console.log('data',val);
                if (val.length < 1) this.currPlaceholder = this.placeholder
                  if(this.isend==true){
                            this.isShowGetMore= false
                            return false
                        }
                // this.initGetMore() //解决第二页concat两遍 在第三页时 concat三遍
                this.loading = false
            },
            'placeholder' (val) {
                this.currPlaceholder = val
            },
            'value' (val) {
                this.selectVal != val && (this.selectVal = val)
                if (this.value != null && this.currPlaceholder && this.data.length < 1) {
                    this.data.push({[this.itemObj[0]]: this.value, [this.itemObj[1]]: this.placeholder})
                }
            },
            'list' (val) {//处理数据只渲染默认一项
                // this.data=this.list == null ? [] : val
            
                // this.data = this.list.slice(0,15)
                this.data = this.list
                if (this.value && this.currPlaceholder && this.data.length < 1) {
                    this.data.push({
                        [this.itemObj[0]]: this.value,
                        [this.itemObj[1]]: this.placeholder
                    })
                }
            }
        },
        created () {
            // if (this.value && this.currPlaceholder && this.data.length < 1) {
            //     this.data.push({id: this.value, name: this.placeholder})
            // }
        },
        mounted () {
            this.input = this.$refs.container.$el.querySelector('input')
        },
        methods: {
            // 筛选数据
            filter (val) {
                this.loading = true
                this.keyword = val
                this.requestCb(val, 0).then(ret => {
                    this.isShowGetMore = true
                    this.processRequestRet(ret, 1)
                })
            },
            initGetMore () { // 初始化更多按钮  //2
                let _this = this
                this.$nextTick(() => {
                    
                    let option = this.$refs.domLoading.parentNode
                    if (option.loaded) return
                    option.loaded = true
                    option.addEventListener('click', function (e) {
                
                        
                        _this.input.focus()
                        _this.loading = true
                        e = e || window.event
                        e.preventDefault()
                        e.stopPropagation()
                        _this.requestCb(_this.keyword, _this.data.length).then(ret => {
                            
                            _this.processRequestRet(ret)
                        })
                        option.loaded = false
                    }, true)
                })
            },
            handleChange (val) {
                this.changeCb && this.changeCb(val)
                this.$emit('input', val)
            },
            // 处理select显示的操作
            handleVisibleChange (state) {  //1
                if (state == false) {
                    this.currPlaceholder = this.placeholder
                    return
                }
                this.initGetMore()
                // 判断是否有数据 没有数据进行加载
                if (!this.data || this.data.length < 1) {
                    this.loading = true
                    this.requestCb(this.keyword, 0).then((ret) => {
                        this.processRequestRet(ret)
                    })
                }
            },
            // 处理请求后的结果 type- 0:追加 1-重新赋值
            processRequestRet (ret, type = 0) {
                // return 
                if (type === 0) {
                    // 把结果过滤掉当前选中的
                    let t = ret.filter((item) => {
                        return item[this.itemObj[0]] != this.value
                    })
                    this.data = this.data.concat(t)
                } else{
                    this.data = ret
                }
                // this.isShowGetMore = this.data.length < ret.total
                // this.isShowGetMore = this.data.length < ret._exts.total
            }
        }
    }
</script>
