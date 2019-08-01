<!--公告-->
<style lang="scss" rel="stylesheet/scss">
    @import "../../utils/mixins/mixins";
    @import "../../utils/mixins/topSearch";
    .analysis-company-manage {
        .search {
            @extend %top-search-container;
        }
        .box-card {
            margin-top: 20px;
            .el-card__header {
                padding: 10px 15px;
                background: #f0f3f5;
            }
            .block {
                text-align: right;
                margin-top: 15px;
            }
        }
        .course-analytics {
            @extend %justify;
            margin: 15px 0;
            height: 120px;
            border: 1px solid #ddd;
            background: #fff;
            border-radius: 5px;
            padding: 25px 40px;
            > div {
                display: inline-block;
                vertical-align: top;
                height: 100%;
                border-right: 1px solid #ddd;
                &:last-of-type {
                    border-right: none;
                }
                width: 18%;
                > * {
                    display: inline-block;
                    vertical-align: top;
                }
                .sign {
                    width: 55px;
                    height: 55px;
                    text-align: center;
                    text-align-last: center;
                    border-radius: 50%;
                    margin:10px 20px;
                    line-height: 76px;
                }
                > div {
                    margin-top: 10px;
                    > i {
                        font-size: 12px;
                        color: #666;
                    }
                    > p {
                        font-size: 25px;
                        color: #333;
                    }
                }
                .red {
                    color:red;
                }
                .green {
                    color:green;
                }
            }
        }
    }
</style>
<template>
    <article class="analysis-company-manage">
        <el-card class="box-card">
            <!--<section class="course-analytics" v-if="statData != null">
                <div>
                    <div>
                        <i>今日登陆</i>
                        <p>{{statData.today_num}}</p>
                        </div>
                </div>
                <div>
                    <div>
                        <i>昨日登录</i>
                        <p>{{statData.yesterday_num}}</p>
                        <span v-if="statData.today_status == 0">无变化</span>
                        <span class="el-icon-caret-top red" v-if="statData.today_status == 1">{{statData.today_ratio}}%</span>
                        <span class="el-icon-caret-bottom green" v-if="statData.today_status == 2">{{statData.today_ratio}}%</span>
                        同比上周
                    </div>
                </div>
                <div>
                    <div>
                        <i>本周登录</i>
                        <p>{{statData.week_num}}</p>
                    </div>
                </div>
                <div>
                    <div>
                        <i>上周登录</i>
                        <p>{{statData.lastweek_num}}</p>
                        <span v-if="statData.week_status == 0">无变化</span>
                        <span class="el-icon-caret-top red" v-if="statData.week_status == 1">{{statData.week_ratio}}%</span>
                        <span class="el-icon-caret-bottom green" v-if="statData.week_status == 2">{{statData.week_ratio}}%</span>
                        同比上周
                    </div>
                </div>
                <div>
                    <div>
                        <i>本月登录</i>
                        <p>{{statData.month_num}}</p>
                    </div>
                </div>
            </section>-->
            <section class="search">
                <!--<section>
                    <label>姓名</label>
                    <el-input class="name" @change="getData" v-model="search.name"></el-input>
                </section>-->
                <!--<section>
                    <label>账号</label>
                    <el-input class="name" @change="getData" v-model="search.name"></el-input>
                </section>-->
                <!--<section>
                    <i>部门</i>
                    <CompanySelect  :change="getData" v-model="search.gov_id"
                                    v-on:change="val=>search.gov_id=val">
                    </CompanySelect>
                </section>-->

                <Region :province="fetchParam.provinceSelect" :city="fetchParam.citySelect" :area="fetchParam.areaSelect" 
                    :town="fetchParam.townSelect" :village="fetchParam.villageSelect" 
                    title="部门" 
                    v-on:provinceChange="val => fetchParam.provinceSelect = val"
                    v-on:cityChange="val => fetchParam.citySelect = val" 
                    v-on:areaChange="val => fetchParam.areaSelect = val" 
                    v-on:townChange="val => fetchParam.townSelect = val" 
                    v-on:villageChange="val => fetchParam.villageSelect = val" 
                    :change="getData" >
                </Region>

                <!--<section>
                    <i>角色</i>
                    <el-select clearable v-model="search.role_id" @change="getData">
                        <el-option label="管理员" value="1"></el-option>
                        <el-option label="部门人员" value="0"></el-option>
                    </el-select>
                </section>-->
                <DateRange title="登录时间" :start="search.createTime" :end="search.endTime"
                           v-on:changeStart="val=> search.createTime=val"
                           v-on:changeEnd="val=> search.endTime=val"
                           :change="getData">
                </DateRange>
            </section>
            <el-table
                    v-loading="loading"
                    border
                    :data="manageData"
                    stripe
                    style="width: 100%">
      
                <!--<el-table-column
                        prop="account"
                        label="账号"
                        min-width="200">
                </el-table-column>-->
                <el-table-column
                        prop="gov_name"
                        min-width="180"
                        label="所属部门">
                </el-table-column>
                <el-table-column
                        prop="name"
                        min-width="100"
                        label="姓名">
                </el-table-column>
                <el-table-column
                        prop="role_name"
                        min-width="120"
                        label="角色">
                </el-table-column>
                <el-table-column
                        prop="update"
                        min-width="180"
                        label="登录时间">
                </el-table-column>
                <el-table-column
                        prop="ip"
                        min-width="180"
                        label="登录IP">
                </el-table-column>
                <el-table-column
                        prop="device"
                        min-width="180"
                        label="登陆设备">
                </el-table-column>
            </el-table>
            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[15, 30, 60, 100]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next"
                        :total="total">
                </el-pagination>
            </div>
        </el-card>
    </article>
</template>
<script>
    import DateRange from '../component/form/DateRangePicker.vue'
    import CompanySelect from '../component/select/IndustryCompany.vue'
    import DepSelect from '../component/select/Department.vue'
    import govService from '../../services/gov/govService.js'
    import Region from '../component/select/Region.vue'
    function clearFn() {
        return {
            name: '',
            user_name: '',
            gov_id: 27,
            role_id: '',
            createTime: '',
            endTime: '',

            typeSelect: '',
            provinceSelect: '',
            citySelect: '',
            areaSelect: '',
            townSelect: '',
            villageSelect: '',
        }
    }

    export default {
        components: {
            DepSelect,
            CompanySelect,
            DateRange,
            Region
        },
        data () {
            return {
                loading: false,
                manageData: [],
                statData: null,
                currentPage: 1,
                pageSize: 15,
                total: 0,
                search: clearFn(),
                fetchParam: {
                    addate: this.$route.query.yesterday == undefined ? '' : this.$route.query.yesterday,
                    update: this.$route.query.yesterday == undefined ? '' : this.$route.query.yesterday,
                    typeSelect: '',
                    provinceSelect: '',
                    citySelect: '',
                    areaSelect: '',
                    townSelect: '',
                    villageSelect: '',
                    name: '',
                    pid: null,
                    // level:void 0,
                },
            }
        },
        mounted () {
            // govService.getCompanyManageStat().then((ret) => {
            //     this.statData = ret.data
            // }).then(() => {
            //     xmview.setContentLoading(false)
            // })
        },
        activated () {
            xmview.setContentLoading(false)               //关闭遮罩
            this.getData().then(() => {
                xmview.setContentLoading(false)
            })
        },
        methods: {
            initFetchParam() {
                this.currentPage = 1
                this.search = clearFn()
            },
            handleSizeChange (val) {
                this.pageSize = val
                this.getData()
            },
            handleCurrentChange (val) {
                this.currentPage = val
                this.getData()
            },
            getData () {
                console.log(this.fetchParam)
                //先拿到省市区id 再请求这个id的详细信息
                 if (this.fetchParam.provinceSelect!=='') {
                    // this.fetchParam.level= 0
                    // if (this.fetchParam.citySelect!==''){
                    //     this.fetchParam.level= 1
                    //     if (this.fetchParam.areaSelect!==''){
                    //         this.fetchParam.level= 2
                    //         if (this.fetchParam.townSelect!==''){
                    //             this.fetchParam.level= 3
                    //             if (this.fetchParam.villageSelect!==''){
                    //                 this.fetchParam.level= 4
                    //             }
                    //         }
                    //     }
                    // }
                    this.fetchParam.pid = this.fetchParam.gov_id=this.fetchParam.villageSelect || this.fetchParam.townSelect || this.fetchParam.areaSelect || this.fetchParam.citySelect || this.fetchParam.provinceSelect

                }
                if(!this.fetchParam.provinceSelect && !this.fetchParam.citySelect && !this.fetchParam.areaSelect && !this.fetchParam.townSelect && !this.fetchParam.villageSelect){
                    // this.fetchParam.pid= -1
                }

                this.loading = true
                return govService.getUserLoginlog({
                    page: this.currentPage,
                    pagesize: this.pageSize,
                    name: this.search.name,
                    user_name: this.search.user_name,
                    // gov_id: this.fetchParam.pid,
                    role_id: this.search.role_id,
                    date_start: this.search.createTime,
                    date_end: this.search.endTime,
                    // level:this.fetchParam.level,
                }).then((ret) => {
                    this.total = ret._exts.total
                    this.manageData = ret.data
                }).then(() => {
                    this.loading = false
                })
            }
        }
    }
</script>
