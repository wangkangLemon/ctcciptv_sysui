<template>
	<div class="redpacket">
		<DateRange title="获取日期" :start="fetchParam.stime" :end="fetchParam.etime" @changeStart="val=> fetchParam.stime=val " @changeEnd="val=> fetchParam.etime=val" :change="fetchData">
		</DateRange>
		<el-dialog title="查看详情" :visible.sync="dialogFormVisible">
			<div class="details">
				<div class="details_item">
					<span class="details_item_title">用户姓名：</span>
					<span>{{clerkDetail_outher.name}}</span>
				</div>
				<div class="details_item">
					<span class="details_item_title">部门：</span>
					<span>{{clerkDetail_outher.gov_name}}</span>
				</div>
				<div class="details_item">
					<span class="details_item_title">红包金额：</span>
					<span>{{clerkDetail.bonus_yuan}}</span>
				</div>
				<div class="details_item">
					<span class="details_item_title">红包来源：</span>
					<span>{{clerkDetail.biz_name}}</span>
				</div>
				<div class="details_item">
					<span class="details_item_title">获得时间：</span>
					<span>{{clerkDetail.addate}}</span>
				</div>
			</div>
		</el-dialog>
		<div class="block_table">
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column fixed prop="user.name" label="用户姓名" width="170">
				</el-table-column>
				<el-table-column prop="user.gov_name" label="部门" width="200">
				</el-table-column>
				<el-table-column prop="bonus_yuan" label="红包金额" width="100">
				</el-table-column>
				<el-table-column prop="biz_name" label="红包来源" width="200">
				</el-table-column>
				<el-table-column prop="addate" label="获得时间">
				</el-table-column>
				<el-table-column fixed="right" width="180" label="操作">
					<template scope="scope">
						<el-button @click="check(scope.$index, scope.row)" type="text" size="small">查看详情</el-button>
						<el-button @click="del(scope.$index, scope.row)" type="text" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="paging">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[15, 30, 60, 100]" :page-size="fetchParam.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	import financeService from '../../../services/finance/financeService'
	import DateRange from '../../component/form/DateRangePicker.vue'
	import * as api from '@/services/api'
	import config from '@/utils/config'

	export default {
		name: 'finance-redPacket',
		components: {
			DateRange
		},
		data() {
			return {
				loading: false,
				value1: '',
				value2: '',
				currentPage4: 1 ,
				fetchParam: {
					page: 1,
					pagesize: 15,
					stime: '',
					etime: ''
				},
				total: 0,
				tableData: [],
				dialogFormVisible: false,
				formLabelWidth: '80px',
				readonly: true,
				clerkDetail: {
					bonus_yuan: '',
					biz_name: '',
					addate: ''

				},
				clerkDetail_outher:{
					name: '',
					gov_name: ''
				}

			}
		},
		activated() { //当页面进行缓存时调用此钩子函数
			this.fetchData()
		},
		methods: {
			handleSizeChange(val) {
				console.log(val)
				this.fetchParam.pagesize = val
				this.fetchData()
			},
			handleCurrentChange(val) {
				console.log(val)
				this.fetchParam.page = val
				this.fetchData()
			},
			fetchData() {
				var _this = this;
				var url = config.apiHost + '/user/bonus/lists'
				console.log(_this.fetchParam)
				api.get(url, _this.fetchParam).then(function(res) {
					if(res.code == 0) {
						xmview.setContentLoading(false)
						_this.tableData = res.data
						_this.total = res._exts.total
					}

				})
			},
			check(index, rows) {
				console.log(rows.id + '这里是查看')
				var _this = this
				_this.dialogFormVisible = true
				var url = config.apiHost + '/user/bonus/get/' + rows.id;
				api.get(url).then(function(res) {
					console.log(res);
					if(res.code == 0) {
						 console.log(res.data)
						 if(res.data.user==null){
							 _this.clerkDetail_outher=''
						}else{
							 _this.clerkDetail_outher=res.data.user
						}
						 _this.clerkDetail=res.data
						 console.log(_this.clerkDetail_outher)
						console.log(_this.clerkDetail)

					}
				})
			},
			del(index, rows) {
				var _this = this
             xmview.showDialog('此操作将永久删除，是否继续？', () => {
                var url = config.apiHost + '/user/bonus/delete/' + rows.id;
					console.log(url);
					api.post(url).then(function(res) {
						console.log(res);
						if(res.code == 0) {
							_this.$message({
								type: 'success',
								message: '删除成功!'
							});
							_this.fetchData();
						}
					})
            })
			}

		},
		mounted() {

			this.fetchData()
		}
	}
</script>

<style scoped>
	.redpacket {
		width: 100%;
		height: 100%;
		background: #FFFFFF;
		padding: 10px;
		overflow: hidden;
	}

	.block_date {
		position: relative;
		width: 100%;
		overflow: hidden;
	}

	.block_table {
		margin-top: 20px;
	}

	.paging {
		float: right;
	}

	.details {
		padding-left: 30px;
	}

	.details_item {
		margin-bottom: 20px;
	}

	.details_item_title {
		display: inline-block;
		width: 80px;
		text-align: right;
	}
</style>
