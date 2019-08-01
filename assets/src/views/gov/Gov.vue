<!--企业列表-->
<style lang="scss" rel='stylesheet/scss'>
    @import "../../utils/mixins/common";
    @import "../../utils/mixins/topSearch";
    @import "../../utils/mixins/showDetail";

    .gov-index {
        @extend %content-container;
        .add {
            @extend %right-top-btnContainer;
        }
        .search {
            @extend %top-search-container;
        }
        .block {
            text-align: right;
            margin-top: 15px;
        }
        .addForm {
            .tip {
                text-align: center;
                border-top: 1px solid #ddd;
                color: #ff0000;
                line-height: 50px;
            }
        }
    }
</style>
<template>
    <article class="gov-index">
        <!--详情-->
        <el-dialog size="small" v-if="details != null" class="show-detail" v-model="showDetail" title="部门信息">
            <div class="info">
                <h2>
                    {{details.name}}
                    <el-tag type="success">{{govType[details.category]}}</el-tag>
                </h2>
                <p><i class="title">联系人：</i><span class="value">{{details.concact || '无'}}</span></p>
                <p><i class="title">联系人手机：</i><span class="value">{{details.mobile || '无'}}</span></p>
                <p><i class="title">联系人邮箱：</i><span class="value">{{details.email || '无'}}</span></p>
                <p><i class="title">上级部门：</i><span class="value">{{details.parent_name || '无'}}</span></p>
                <p><i class="title">地址：</i><span class="value">{{details.address || '无'}}</span></p>
                <p><i class="title">邮编：</i><span class="value">{{details.zip || '无'}}</span></p>
            </div>
            <!--<div slot="footer" class="dialog-footer">-->
            <!--<el-button type="primary" @click="showDetail = false">关 闭</el-button>-->
            <!--</div>-->
        </el-dialog>
        <div class="add">
            <el-button type="primary" icon="plus" class="recharge" @click="add">添加</el-button>
        </div>
        <section class="search">
            <!--<section>
                <i>部门类型</i>
                <el-select @change="getData" clearable v-model="fetchParam.typeSelect" placeholder="未选择">
                    <el-option v-for="(item, index) in types" :label="item.name" :value="item.id" :key="item.id">
                    </el-option>
                </el-select>
            </section>-->
            <Region :province="fetchParam.provinceSelect" 
                    :city="fetchParam.citySelect" 
                    :area="fetchParam.areaSelect" 
                    :town="fetchParam.townSelect"
                    :village="fetchParam.villageSelect" title="部门" 
                    v-on:provinceChange="val => {fetchParam.provinceSelect = val;finallyVal = val}"
                    v-on:cityChange="val => {fetchParam.citySelect = val;finallyVal = val}" 
                    v-on:areaChange="val => {fetchParam.areaSelect = val;finallyVal = val}"
                    v-on:townChange="val => {fetchParam.townSelect = val;finallyVal = val}" 
                    v-on:villageChange="val => {fetchParam.villageSelect = val;finallyVal = val}"
                    :change="getData">
            </Region>
            <section>
                <i>名称：</i>
                <el-input @keyup.enter.native="getData()" v-model="fetchParam.name" auto-complete="off"></el-input>
            </section>
        </section>
        <el-table v-loading="loading" border :data="govData" stripe style="width: 100%">
            <el-table-column prop="name" label="名称" min-width="200">
                <template scope="scope">
                    <el-tag type="gray">{{govType[scope.row.category]}}</el-tag>
                    {{scope.row.name}}
                </template>
            </el-table-column>
            <el-table-column prop="parent_name" label="上级部门" width="180">
            </el-table-column>
            <el-table-column width="100" prop="concact" label="联系人">
            </el-table-column>
            <el-table-column width="150" prop="mobile" label="手机">
            </el-table-column>
            <el-table-column width="170" prop="addate" label="创建时间">
            </el-table-column>
            <el-table-column prop="operate" label="操作" width="200">
                <template scope="scope">
                    <!--<router-link :to="{path: '/medical/user/'+ scope.row.id }">
                        <el-button type="text" size="small" @click="adminPage(scope.$index, scope.row)">
                            管理员 &nbsp;&nbsp;
                        </el-button>
                    </router-link>-->
                    <el-button type="text" size="small" @click="adminPage(scope.$index, scope.row)">
                        部门人员
                    </el-button>
                    <el-button type="text" size="small" @click="showFn(scope.$index, scope.row)">
                        详情
                    </el-button>
                    <el-button type="text" size="small" @click="editGov(scope.$index, scope.row)">
                        修改
                    </el-button>
                    <el-button type="text" size="small" @click="deleteGov(scope.$index, scope.row)">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[15, 30, 60, 100]"
                :page-size="pageSize" layout="total, sizes, prev, pager, next" :total="total">
            </el-pagination>
        </div>
    </article>
</template>
<script>
    import govService from '../../services/gov/govService.js'
    import Region from '../component/select/Region.vue'

    function clearFn() {
        return {
            typeSelect: '',
            provinceSelect: '',
            citySelect: '',
            areaSelect: '',
            townSelect: '',
            villageSelect: '',
            name: '',
//          finallyVal: ''
        }
    }
    
    export default {
        components: {
            Region
        },
        data() {
            return {
                // isInit: false,
                govType: ['', '系统', '政府'],
                types: [ // 部门类型
                    {
                        name: '政府',
                        id: 2
                    },
                    {
                        name: '系统',
                        id: 1
                    }
                ],
                editloading: false,
                details: null,
                showDetail: false, // 显示详情弹窗
                loading: false,
                currentPage: 1,
                pageSize: 15,
                govData: [],
                fetchParam: {
                    typeSelect: '',
                    provinceSelect: '',
                    citySelect: '',
                    areaSelect: '',
                    townSelect: '',
                    villageSelect: '',
                    name: '',
                    pid: void -1,
                },
                total: 0
            }
        },
        activated() {
            this.getData().then(() => {
                xmview.setContentLoading(false)
            })
        },
        watch: {
            'fetchParam.name': function () {
                if (this.fetchParam.pid == undefined) {
                    this.fetchParam.pid = -1
                }
            }
        },
        methods: {
            changeName() {

            },
            initFetchParam() {
                this.currentPage = 1
                this.fetchParam = clearFn()
            },
            // 修改企业信息
            editGov(index, row) {
                this.$router.push({
                    name: 'gov-edit',
                    params: {
                        govinfo: row,
                        id: row.id
                    }
                })
            },
            // 显示详情
            showFn(index, row) {
                govService.getGovInfo(row.id).then((ret) => {
                    this.details = ret
                    this.showDetail = true
                })
            },
            // 删除 GOV部门
            deleteGov(index, row) {
                xmview.showDialog(`你将要删除部门 <span style="color:red">${row.name}</span>  此操作不可恢复确认吗?`, () => {
                    govService.deleteGov(row.id).then(() => {
                        this.govData.splice(index, 1) //删除选中项
                        row.deleted = 1
                    })
                })
            },
            adminPage(index, item) {
                console.log(item);
                
                this.$router.push({
                    name: 'gov-admin',
                    params: {
                        gov_id: item.id || 1,
                        govInfo:item,
                    },
                    query: {
                        // category: item.category

                    }
                })
            },
            // 添加
            add() {
                this.$router.push({
                    name: 'gov-add'
                })
            },
            handleSizeChange(val) {
                this.pageSize = val
                this.getData()
            },
            handleCurrentChange(val) {
                // if (!this.isInit) {
                //     this.isInit = true
                //     return
                // }
                this.currentPage = val
                this.getData()
            },
            getData(type) {
            	console.log(this.finallyVal)
                console.log(type)
                // if (this.fetchParam.provinceSelect!=='') {
                //     this.fetchParam.pid = this.fetchParam.villageSelect || this.fetchParam.townSelect || this.fetchParam.areaSelect || this.fetchParam.citySelect || this.fetchParam.provinceSelect
                // }
                let level_pid=this.fetchParam.villageSelect || this.fetchParam.townSelect || this.fetchParam.areaSelect || this.fetchParam.citySelect || this.fetchParam.provinceSelect
                // }
                let flag = false
                let index
                let arr = ['provinceSelect', 'citySelect', 'areaSelect', 'townSelect', 'villageSelect']
                arr.forEach((v,i) => {
                    if (flag) {
                        this.fetchParam[v] = null
                    }
                     console.log(this.fetchParam.provinceSelect,this.fetchParam.citySelect ,this.fetchParam.areaSelect,this.fetchParam.townSelect, this.fetchParam.villageSelect);
                    
                    if (this.fetchParam[v] == this.finallyVal) {
                    	console.log(this.finallyVal)
                        flag = true
                        index = i
                    }
                })
                
                if(index>0){
                    if(type){ //从后向前获取
                        // alert('index-1')
                        this.fetchParam.pid = this.fetchParam[arr[index-1]];
                        if(this.fetchParam.name!=''||this.fetchParam.typeSelect!=''){
                            this.fetchParam.pid = level_pid
                        }
                    }else{  //从前向后获取
                        // alert('index')
                        this.fetchParam.pid = this.finallyVal
                    }
                    
                }else{
                    this.fetchParam.pid = this.finallyVal
                }
                this.loading = true
                return govService.getSelectList({
                    pagesize: this.pageSize,
                    page: this.currentPage,
                    pid: this.fetchParam.pid,
                    category: this.fetchParam.typeSelect,
                    name: this.fetchParam.name,
                    province_id: this.fetchParam.provinceSelect,
                    city_id: this.fetchParam.citySelect,
                    area_id: this.fetchParam.areaSelect,
                    town_id: this.fetchParam.townSelect,
                    village_id: this.fetchParam.villageSelect,
                }).then((ret) => {
                    this.govData = ret.data
                    this.total = ret._exts.total
                }).then(() => {
                    this.loading = false
                })
            }
        }
    }
</script>