<!--视频管理-->
<style lang='scss' rel='stylesheet/scss'>
	@import "../../../utils/mixins/common";
	@import "../../../utils/mixins/topSearch";
	#documentation {
		@extend %content-container;
		.manage-container {
			position: absolute;
			right: 0;
			top: -50px;
			>* {
				color: #fff;
				border-radius: 5px;
			}
			.add {
				background: rgb(0, 204, 255);
			}
		}
		.search {
			@extend %top-search-container;
		} // 底部的管理按钮
		.bottom-manage {
			margin-top: 15px;
			display: inline-block;
		}
	}
</style>

<template>
	<main id="documentation">
		<article class="search">
			<!--<el-dialog :title="title" :visible.sync="dialogFormVisible">
			 <el-button @click="goUrl" type="text" size="small">进入文档地址</el-button>
		     </el-dialog>-->
			<section>
				<i>标题</i>
				<el-input v-model="fetchParam.file_name" @keyup.enter.native="fetchData"></el-input>
			</section>
			<section>
				<i>状态</i>
				<el-select v-model="fetchParam.status" placeholder="请选择" @change="fetchData">
					<!--<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
					</el-option>-->
					<el-option label="全部" value="-1"></el-option>
					<el-option label="转码中" value="1"></el-option>
					<el-option label="转码失败" value="2"></el-option>
					<el-option label="转码成功" value="3"></el-option>
				</el-select>
			</section>
			<DateRange title="创建时间" :start="fetchParam.create_start" :end="fetchParam.create_end" @changeStart="val=> fetchParam.create_start=val " @changeEnd="val=> fetchParam.create_end=val" :change="fetchData">
			</DateRange>
			<div class="block_table">
				<el-table :data="tableData" border style="width: 100%">
					<el-table-column prop="file_name" label="文件名称" width="500">
					</el-table-column>
					<el-table-column label="状态" width="100">
						<template scope="scope">
							<el-tag v-if="scope.row.status == 0" type="primary">待审核</el-tag>
							<el-tag v-else-if="scope.row.status == 1" type="primary">转码中</el-tag>
							<el-tag v-else-if="scope.row.status == 2" type="danger">转码失败</el-tag>
							<el-tag v-else-if="scope.row.status == 3" type="success">转码成功</el-tag>
							<el-tag v-else-if="scope.row.status == 4" type="primary">审核失败</el-tag>
							<el-tag v-else>正常</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="是否关联" width="100">
						<template scope="scope">
							<el-tag v-if="scope.row.used == 1" type="success">已关联</el-tag>
							<el-tag v-else-if="scope.row.used == 0" type="primary">未关联</el-tag>
						</template>
					</el-table-column>
					<el-table-column prop="file_type" label="文件类型" width="100">
					</el-table-column>
					<el-table-column prop="pages" label="文件页数" width="100">
					</el-table-column>
					<el-table-column prop="addate" label="添加时间">
					</el-table-column>
					<el-table-column fixed="right" width="180" label="操作">
						<template scope="scope">
							<a :href="scope.row.file_target_path" target="_blank" v-if="scope.row.status==3" class="adressUrl">预览</a>
							<!--<a href="javascript:void(0)" class="adressUrl" @click="preview(scope.$index, scope.row)" v-if="scope.row.status == 3">预览</a>-->
							<el-button @click="del(scope.$index, scope.row)" type="text" size="big" v-if="scope.row.status!==1">删除</el-button>
						</template>

					</el-table-column>
				</el-table>
			</div>
			<div class="paging">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[15, 30, 60, 100]" :page-size="fetchParam.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
				</el-pagination>
			</div>
		</article>
	</main>
</template>
<script>
	import DateRange from '../../component/form/DateRangePicker.vue'
	import * as api from '@/services/api'
	import config from '@/utils/config'
	export default {
		components: {
			DateRange
		},
		data() {
			return {
				url: '',
				total: 0,
				tableData: [],
				currentPage4: 1,
				fetchParam: {
					status: '-1',
					file_name: void 0,
					page: 1,
					pagesize: 15,
					create_start: '',
					create_end: ''
				},
				options: [{
					value: '-1',
					label: '全部'
				}, {
					value: '1',
					label: '转码中'
				}, {
					value: '2',
					label: '转码失败'
				}, {
					value: '3',
					label: '转码成功'
				}],
			}
		},
		activated() { //当页面进行缓存时调用此钩子函数
			this.fetchParam.status = '-1'
			this.fetchData()

		},
		methods: {
			fetchData() {
				var _this = this;
				var url = config.apiHost + '/file/lists'
				console.log(_this.fetchParam)
				api.get(url, _this.fetchParam).then(function(res) {
					console.log(res)
					if(res.code == 0) {
						xmview.setContentLoading(false)
						_this.tableData = res.data
						_this.total = res._exts.total

					}

				})
			},
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
			//			preview(index, rows) {
			//				var _this = this
			//				_this.dialogFormVisible = true
			//				var url = config.apiHost + '/file/get/' + rows.material_id;
			//				api.get(url).then(function(res) {
			//					console.log(res);
			//					if(res.code == 0) {
			//						_this.title = res.data.title
			//						_this.url = res.data.file_target_path
			//						
			//						window.open(_this.url)
			//					}
			//				})
			//			},
			del(index, rows) {
				var _this = this;
				xmview.showDialog('此操作将永久删除，是否继续？', () => {
					var url = config.apiHost + '/file/delete/' + rows.material_id
					console.log(url);
					api.post(url).then(function(res) {
						console.log(res);
						if(res.code == 0) {
							_this.$message({
								type: 'success',
								message: '删除成功!'
							});
							_this.fetchData();
						} else {
							_this.$message({
								type: 'error',
								message: res.message
							});
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
	.documentation {
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
	
	.adressUrl {
		text-decoration: none;
		color: #20a0ff;
	}
	
</style>