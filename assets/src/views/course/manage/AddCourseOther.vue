<!--添加课程-->
<!--公开课管理-->
<style lang='scss' rel='stylesheet/scss'>
	@import "../../../utils/mixins/common";
	#course-manage-addcourse-container {
		@extend %content-container;
		h2 {
			margin-bottom: 10px;
		}
		.tab {
			max-width: 700px;
		}
		.collection {
			align-items: center;
			min-height: 36px;
			border-radius: 4px;
			padding: 3px 30px 3px 10px;
			border: 1px solid #bfcbd9;
		}
		.region {
			color: rgb(131, 145, 165)
		}
		.u-course-tag {
			margin-right: 10px;
			background-color: rgba(32, 160, 255, .1);
			display: inline-block;
			padding: 0 10px;
			height: 32px;
			line-height: 30px;
			font-size: 12px;
			color: #20a0ff;
			border-radius: 4px;
			box-sizing: border-box;
			border: 1px solid rgba(32, 160, 255, .2);
			white-space: nowrap;
			&:last-child {
				margin-right: 0;
			}
		}
		.el-tab-pane {
			max-width: 700px;
		}
		.el-upload-list__item {
			position: relative;
			.el-icon-close {
				position: absolute;
				right: 5px;
				top: 5px;
			}
		} // 考试题目设置
		.testing-set {
			.el-form {
				padding-top: 17px;
				&:first-of-type {
					padding-top: 0;
				}
				hr {
					position: absolute;
					width: 100%;
					border-top: none;
					border-color: #bbb;
				}
				h5 {
					font-size: 14px;
					color: #666;
				}
				.el-input {
					display: inline-block;
					width: 60%;
					vertical-align: middle;
				}
				.multy-choose-item {
					margin: 5px 0;
					&:last-of-type {
						margin-bottom: 0;
					}
				}
			}
			.bottom-btns {
				.submit {
					float: right;
				}
			}
		}
	}
</style>

<template>
	<article id="course-manage-addcourse-container">
		<el-tabs v-model="activeTab" class="tab">
			<el-tab-pane label="课程信息" name="first">
				<el-form label-width="120px" ref="formFirst" :rules="rulesFirst" :model="fetchParam">
					<!-- <el-form-item label="所属栏目" prop="category_id">
                        <CourseCategorySelect type="course" :placeholder="fetchParam.category_name" :autoClear="true" :showNotCat="false" v-model="fetchParam.category_id"></CourseCategorySelect>
                    </el-form-item> -->
					<el-form-item label="课程名称" prop="course_name">
						<el-input v-model="fetchParam.course_name"></el-input>
					</el-form-item>
					<!--<el-form-item label="课程类别" prop="type">
						<el-select v-model="fetchParam.type" placeholder="请选择" disabled>
							<el-option label="私有课程" value="private"></el-option>
							<el-option label="公开课程" value="public"></el-option>
							<el-option label="工业课程" value="industry"></el-option>
							<el-option label="政府课程" value="gov"></el-option>
						</el-select>
					</el-form-item>-->
					<!--<el-form-item label="关联专家" :fetch-suggestions="querySearch">
						<Experts v-model="fetchParam.experts_id" :placeholder="fetchParam.experts_name" v-on:change="val=>fetchParam.experts_id=val" :change="getExpertsList" :list="changelist">
						</Experts>
					</el-form-item>-->
					<el-form-item label="课程封面图" prop="image">
						<img :src="fetchParam.image | fillImgPath" width="200" height="112" v-show="fetchParam.image">
						<CropperImg ref="imgcropper" :confirmFn="cropperImgSucc" :aspectRatio="16/9"></CropperImg>
					</el-form-item>
					<el-form-item label="课程类型" prop="material_type">
						<el-select v-model="fetchParam.material_type" @change="typeChange" placeholder="请选择" disabled>
							<el-option label="视频" value="video"></el-option>
							<el-option label="WORD" value="doc"></el-option>
							<el-option label="PPT" value="ppt"></el-option>
							<el-option label="PDF" value="pdf"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="课程文件" prop="material_id">
						<UploadFile :onSuccess="handleUploadDoc" :url="uploadDocUrl" :accept="accept" :disabled="fetchParam.material_type == ''" :btnType='btnType' :btnTitle='filename' v-show="fetchParam.material_type !== 'video'"></UploadFile>
						<el-button v-show="fetchParam.material_type === 'video'" @click="getVideoName">
							<i>{{fetchParam.material_name}}</i>
						</el-button>
						<el-button v-show="fetchParam.material_type === 'video'" @click="preview(fetchParam.material_id)" type="text" size="big"> 查看
						</el-button>
					</el-form-item>
					<!--<el-form-item label="所属专辑">
                        <CourseAlbumSelect :placeholder="fetchParam.album_name" v-model="fetchParam.albumid"></CourseAlbumSelect>
                    </el-form-item>-->
					<el-form-item label="课程介绍" prop="description">
						<el-input v-model="fetchParam.description" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入内容">
						</el-input>
					</el-form-item>
					<el-form-item label="课程标签">
						<vTags v-model="courseTags"></vTags>
					</el-form-item>
					<el-form-item label="排序" prop="sort">
						<el-input v-model="fetchParam.sort" type="number" placeholder="请输入序列号"></el-input>
					</el-form-item>
					<el-form-item label="是否允许分享" prop="share">
						<el-radio class="radio" v-model="fetchParam.share" :label="1">是</el-radio>
						<el-radio class="radio" v-model="fetchParam.share" :label="0">否</el-radio>
					</el-form-item>
					<el-form-item label="屏蔽组是否可见" prop="noaccess">
						<el-radio class="radio" v-model="fetchParam.noaccess" :label="1">隐藏</el-radio>
						<el-radio class="radio" v-model="fetchParam.noaccess" :label="0">可见</el-radio>
					</el-form-item>
					<!-- 新需求可见省份 待完成 -->
					<el-form-item label="可见省份" prop="region">
						<div class="collection" @click="openPushTypeDialog">
							<span class="region" v-if="categorysBox.length==0">默认全部可见</span>
							<el-tag class="u-course-tag" v-for="item in categorysBox" :key="item.id">
								{{item.name}}
							</el-tag>
						</div>
					</el-form-item>
					<h2>课后考试设置</h2>
					<el-form-item label="课后考试" prop="need_testing">
						<el-radio class="radio" v-model="fetchParam.need_testing" :label="1">需要</el-radio>
						<el-radio class="radio" v-model="fetchParam.need_testing" :label="0">不需要</el-radio>
					</el-form-item>
					<el-form-item label="考试时间" prop="limit_time">
						<el-input-number :min="0" size="small" :disabled="fetchParam.need_testing == 0" placeholder="以分钟为单位" v-model="fetchParam.limit_time"></el-input-number>
					</el-form-item>
					<el-form-item label="考试次数限制">
						<el-input :disabled="fetchParam.need_testing == 0" placeholder="留空或0位不限制" v-model="fetchParam.limit_repeat"></el-input>
					</el-form-item>
					<!-- <el-form-item label="及格分数" prop="score_pass">
                        <el-input :disabled="fetchParam.need_testing == 0" v-model="fetchParam.score_pass"></el-input>
                    </el-form-item> -->
					<!--<el-form-item label="" v-if="!readonly">
						<el-button style="float: right" type="primary" @click="btnNextClick">
							<i>{{ fetchParam.need_testing == 0 ? '保存' : '保存并下一步' }}</i>
						</el-button>
					</el-form-item>-->
				</el-form>
			</el-tab-pane>
			<el-tab-pane :disabled="!fetchParam.contentid" label="考试题目设置" name="second" class="testing-set">
				<el-form>
					<el-form label-width="120px" v-for="(item,index) in fetchTesting" :key="index">
						<!--<el-form-item label="" v-if="!readonly">
							<el-button icon="plus" @click='addTesting(0, index)'>判断题</el-button>
							<el-button icon="plus" @click='addTesting(1, index)'>单选题</el-button>
							<el-button icon="plus" @click='addTesting(2, index)'>多选题</el-button>
							<el-button icon="delete" type="danger" @click='deleteTesting(index, item)'>删除</el-button>
						</el-form-item>-->
						<el-form-item :label="'第' + (index+1) + '题'">
							<span v-if="item.category == 0">判断题</span>
							<span v-else-if="item.category == 1">单选题</span>
							<span v-else>多选题</span>
						</el-form-item>
						<el-form-item label="题目">
							<el-input v-model="item.description" :disabled="!item.editable" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容">
							</el-input>
						</el-form-item>
						<!-- <el-form-item label="分数">
                            <el-input placeholder="为该题设置分数" :disabled="!item.editable" v-model="item.score"></el-input>
                        </el-form-item> -->
						<el-form-item label="配图">
							<UploadImg :defaultImg="item.image" :url="uploadImgUrl" :disabled="!item.editable" :onSuccess="res => item.image = res.data.url" :data='uploadextraData'></UploadImg>
						</el-form-item>

						<!--判断题的正确错误选项-->
						<el-form-item label="选项" v-if="item.category == 0">
							<el-radio class="radio" :disabled="!item.editable" v-model="item.correct" :label="1">
								<i>正确</i>
							</el-radio>
							<el-radio class="radio" :disabled="!item.editable" v-model="item.correct" :label="0">
								<i>错误</i>
							</el-radio>
						</el-form-item>

						<!--单选|多选的答案部分-->
						<el-form-item label="选项" v-else>
							<h5>请在正确答案前面打勾</h5>
							<div class="multy-choose-item" v-for="(option,indexOption) in item.options" :key="indexOption">
								<el-checkbox v-model="option.correct" :true-label="1" :disabled="!item.editable" v-if="item.category == 2"></el-checkbox>
								<el-radio class="radio" v-model="item.correct" :label="indexOption" :disabled="!item.editable" v-else>
									<i></i>
								</el-radio>
								<el-input placeholder="填写描述" v-model="option.description" :disabled="!item.editable"></el-input>
								<el-button :disabled="!item.editable" type="text" @click="item.options.splice(indexOption, 1)">
									<i>删除</i>
								</el-button>
							</div>
							<div class="multy-choose-item">
								<el-button v-if="item.editable" type="text" @click="addMoreTestingOption(item.options)">添加更多选项</el-button>
							</div>
						</el-form-item>

						<el-form-item label="答案详解">
							<el-input v-model="item.explain" :disabled="!item.editable" type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入内容">
							</el-input>
						</el-form-item>

						<hr>
					</el-form>
				</el-form>

				<!--<el-form label-width="120px" v-if="!readonly">
					<el-form-item label="">
						<el-button icon="plus" @click='addTesting(0, fetchTesting.length)'>判断题</el-button>
						<el-button icon="plus" @click='addTesting(1, fetchTesting.length)'>单选题</el-button>
						<el-button icon="plus" @click='addTesting(2, fetchTesting.length)'>多选题</el-button>
					</el-form-item>
				</el-form>-->

				<!--<div class="bottom-btns" v-if="!readonly">
					<el-button @click="btnPreClick">上一步</el-button>
					<el-button class="submit" type="primary" @click="handleSubmitTesting">发布</el-button>
				</div>-->
			</el-tab-pane>
		</el-tabs>

		<!-- 选择部门树弹窗 -->
		<el-dialog ref="dialogSelect" v-model="dialogTree.isShow" title="选取范围" item-key="contentid">
			<GovTree v-model="treeData" :req="req" ref="courseCategory" :nodeExpand="1" :defaultCheckedkeys="defaultCheckedkeys" :change="val=>categorysBox=val" :checkbox="true" :onNodeClick="treeNodeClick.bind(this,1)">
			</GovTree>
			<span slot="footer">
                <el-button type="primary" @click="getCheckedNodes">确定</el-button>
            </span>
		</el-dialog>
		<DialogVideo :onSelect="handleVideoSelected" v-model="isShowVideoDialog"></DialogVideo>

		<VideoPreview :url="videoUrl" :onchange="fetchVideoData" ref="videoPreview"></VideoPreview>
	</article>
</template>

<script>
	import courseService from '../../../services/course/courseService.js'
	import videoService from '../../../services/course/videoService.js'
	import expertsService from '../../../services/course/expertsService.js'
	import UploadImg from '../../component/upload/UploadImg.vue'
	import CropperImg from '../../component/upload/ImagEcropperInput.vue'
	import DialogVideo from '../component/DialogVideo.vue'
	import UploadFile from '../../component/upload/UploadFiles.vue'
	// import CourseCategorySelect from '../../component/select/CourseCategory.vue'
	import CourseAlbumSelect from '../../component/select/CourseAlbum'
	import testingFactory from '../utils/testingFactory'
	import formUtils from '../../../utils/formUtils'
	import { transformParam } from '../../../utils/common'
	import vTags from '../../component/form/Tags.vue'
	import VideoPreview from '../../component/dialog/VideoPreview.vue'
	import Experts from '../../component/select/Experts'
	import GovTree from '../../component/tree/GovCategoryTree'
	import govService from "../../../services/gov/govService.js"
    import * as api from '@/services/api'
	import config from '@/utils/config'
	export default {
		name: 'course-manage-addcourse',
		data() {
			return {
				btnType:'',
				filename: '',
				activeTab: 'first',
				uploadDocUrl: '', // 上传文档的url
				isShowVideoDialog: false, // 是否显示视频列表弹出框
				fetchParam: getOrignData(),
				courseTags: [],
				rulesFirst: { // 课程信息的校验规则
					course_name: {
						required: true,
						message: '请输入课程名称',
						trigger: 'change'
					},
					category_id: {
						required: true,
						type: 'number',
						message: '请选择课程栏目',
						trigger: 'change'
					},
					// image: { required: true, message: '请上传课程封面', trigger: 'change' },
					description: {
						required: true,
						message: '请输入课程介绍',
						trigger: 'change'
					},
					material_id: {
						required: true,
						type: 'number',
						message: '请上传课程文件',
						trigger: 'change'
					},
					need_testing: {
						required: true,
						type: 'number',
						message: '请选择是否需要课后考试',
						trigger: 'change'
					},
					type: {
						required: true,
						message: '请选择课程类别',
						trigger: 'change'
					},
					material_type: {
						required: true,
						message: '请选择题材类型',
						trigger: 'change'
					},
				},
				accept: '*.doc,*.docx', // 上传的文件格式
				// 考试设置部分
				fetchTesting: [],
				readonly: false, // 只读模式
				videoUrl: '', // 预览的视频url
				// experts_list:[],
				changelist: {},
				uploadextraData: {
					biz: 'course',
					extpath: 'subject'
				},
				dialogTree: {
					loading: false,
					isShow: false,
					course_name: void 0,
				},
				pushTypeDialog: { //发布对象数据模型
					fetchParam: {
						receiver: '',
						gov_ids: '',
						name: '',
						noself: 1,
						mobile: '',
					},
					title: '',
					isSearch: '',
					type: '',
					showDialog: false,
					selectedData: {
						2: [],
						1: []
					},
					data: [],
					page: 1,
					pagesize: 15,
					total: 0,
				},
				treeData: [],
				categorysBox: [],
				defaultCheckedkeys: [],
				fileUrl: ''
			}
		},
		created() {
		  
			this.uploadDocUrl = courseService.getCourseDocUploadUrl()
			this.uploadImgUrl = courseService.commonUploadImage()

			//编辑页面
			// if (this.$route.params.courseInfo) {
			//     this.$route.params.courseInfo
			//     this.activeTab= 'first'
			//      //从主页传递信息
			//     for(let i in this.$route.params.courseInfo){
			//          this.fetchParam[i]=this.$route.params.courseInfo[i]
			//     }
			//     this.fetchParam.material_name= this.$route.params.courseInfo.course_name
			//     this.courseTags = this.fetchParam.tags ? this.fetchParam.tags.split(',') : []
			//     //可见省份id
			//     // this.categorysBox = this.fetchParam.categorys.map(v=>{
			//     //     v.contentid = v.id
			//     //     return v
			//     // }) 
			//     xmview.setContentTile(`编辑课程-${this.fetchParam.category_name}`)
			// } else

			if(this.$route.query.contentid) { //编辑页面
				console.log('这里是编辑')
				this.activeTab = 'first'
				courseService.getCourseInfo(this.$route.query.contentid).then((ret) => {
					console.log(ret)
					this.fetchParam = ret // 没拿到信息 获取信息
					this.fetchParam.source_url=''
					this.fetchParam.file_name=''
					this.filename=ret.material.file_name
					this.fetchParam.course_name = this.$route.params.courseInfo.course_name
					this.fetchParam.material_name = this.$route.params.courseInfo.course_name
					this.courseTags = this.fetchParam.tags ? this.fetchParam.tags.split(',') : []
					//可见省份id
					xmview.setContentTile(`查看课程-${this.fetchParam.category_name}`)
					this.categorysBox = this.fetchParam.region_info.map(v => {
						v.contentid = v.id
						v.label = v.name
						this.defaultCheckedkeys.push(v.id)
						return v
					})
					console.log('this.defaultCheckedkeys', this.defaultCheckedkeys);


				})
			} else if(this.$route.query.category_name) { //添加页面
				console.log('这里是添加')
				console.log(this.fetchParam.material_type)
				this.fetchParam.category_name = this.$route.query.category_name
				this.fetchParam.category_id = this.$route.query.category_id
				xmview.setContentTile(`添加课程-${this.fetchParam.category_name}`)
			}

			this.$route.params.tab && (this.activeTab = this.$route.params.tab)
			this.readonly = this.$route.params.readonly
			xmview.setContentLoading(false)
			this.getExpertsList()

		},

		watch: {
			'fetchParam.need_testing' (val) {
				if(val == 1) { // 需要考试
					this.rulesFirst.limit_time = {
						required: true,
						message: '请输入考试时间',
						trigger: 'change'
					}
					this.rulesFirst.score_pass = {
						required: true,
						message: '请输入及格分数',
						trigger: 'change'
					}
				} else { // 不需要考试
					this.$delete(this.rulesFirst, 'limit_time')
					this.$delete(this.rulesFirst, 'score_pass')
				}
			},
			'activeTab' (val) {
				// if (val === 'second' && this.fetchTesting.length < 1 && this.fetchParam.contentid) {
				if(val === 'second' && this.fetchParam.contentid) {
					xmview.setContentLoading(true)
					courseService.getTestingInfo({
						course_id: this.fetchParam.contentid
					}).then((data) => {
						this.fetchTesting = data
						this.fetchTesting.forEach((item) => {
							if(item.category == 1) {
								item.options.forEach((optionItem, index) => {
									if(optionItem.correct == 1) item.correct = index
								})
							}
						})
						xmview.setContentLoading(false)
					})
				}
			},
			'fetchParam.albumid' (val) {
				// 如果专辑id被清空  则干掉专辑名字
				if(!val) {
					this.fetchParam.album_name = void 0
					this.fetchParam.albumid = void 0
				}
			}
		},
		methods: {
			//拿到栏目树里的所有节点 处理数据拿到ended：1
			getCheckedNodes() {
				this.dialogTree.isShow = false
				console.log(this.$refs.courseCategory.$refs.tree.getCheckedNodes());
				let arr = this.$refs.courseCategory.$refs.tree.getCheckedNodes()
				//数组筛选ended==1
				// function func(arr, lable, box) {
				//     arr.forEach(v => {
				//         if (v.ended == 0) {
				//             if(!v.children)xmview.showTip('error', "数据结构异常")
				//             func(v.children, lable, box)
				//         } else {
				//             box.push(v)
				//         }
				//     })
				// }
				// let t = []
				// func(arr, 'children', t)
				// //数组去重
				// function format(t){
				//     let obj = {};
				//     let result = [];
				//     t.forEach(v => {
				//         obj[v.id] = v
				//     });
				//     for(let k in obj){
				//         result.push(obj[k])
				//     };
				//     return result
				// }
				// console.log(11111111111,format(t))
				// this.categorysBox=format(t)

				//在没有ended 判断的时候用什么代替 怎么代替 方法
				console.log(arr);

				this.categorysBox = arr

				this.getCategoryids()
				// this.getCategoryCheck()
			},
			//把数组转化成接口提交的 最终字符串
			getCategoryids() {
				// console.log( this.categorysBox);

				let categorys = [] //放栏目范围的空容器
				this.categorysBox.forEach((c) => {
					categorys.push(c.contentid || c.id || c.value) //开始出错
					// console.log(this.form.course_ids)
				})
				this.fetchParam.region = categorys.join(',')
				console.log(this.fetchParam.region)
			},
			//打开发布对象弹出框
			openPushTypeDialog() {
				//单选部门

				// this.categorysBox=[]
				this.dialogTree.isShow = true
				console.log('this.defaultCheckedkeys', this.defaultCheckedkeys);
				// setTimeout(() => {
				// console.log( this.$refs.courseCategory.$refs.tree);
				// console.log('this.categorysBox',this.categorysBox);

				// console.log('box',box);
				// this.$nextTick(() => {
				//     this.$refs.courseCategory.$refs.tree.setCheckedNodes(box)
				//     console.log(this.$refs.courseCategory.$refs.tree.getCheckedNodes());
				// })

				// }, 1000);

			},
			//获取gov菜下拉列表
			req(param) {
				return govService.getSelectList({
					pagesize: -1,
					pid: param,
					level: -1
				})
			},
			// 左边的节点被点击
			treeNodeClick(type, data, node, store) {
				console.log(node.data)
				if(type == 1) {
					// this.section.category_id=node.data.id
					// this.section.category_name=node.data.name
					this.nodeParentSelected = node.parent // 记录父节点
					this.nodeSelected = node // 记录当前节点
				} else if(type == 2) {
					this.moveToNode = node
				}
			},
			getExpertsList(val, length) {
				return expertsService.fetchExpertsData({
					name: val,
					// category: this.type,
					pagesize: this.pageSize,
					page: parseInt(length / this.pageSize) + 1
				}).then((ret) => {
					this.$emit('changelist', ret)
					this.changelist = ret;
					return ret
				})
			},
			//拿到医院列表输入建议
			querySearch(queryString, cb) {
				var restaurants = this.restaurants;
				var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
				// 调用 callback 返回建议列表的数据返回建议列表的数据
				cb(results);
			},
			fetchVideoData() {
				this.loadingData = true
				return videoService.getVideo(this.fetchParam).then((ret) => {
					this.data = ret.data
					this.total = ret._exts.total
					this.loadingData = false
				})
			},
			// 预览视频
			preview(index) {
				// 拿到播放地址
				videoService.getVideoPreviewUrl(index).then((ret) => {
					this.videoUrl = ret.video
					// this.row = row
					this.$refs.videoPreview.show(this.fetchParam.material_name) //返回视频的数据后显示弹窗
				})
			},

			// 拿到视频名称
			getVideoName() {
				this.isShowVideoDialog = true
			},
			// 下一步按钮点击保存课程内容
			btnNextClick() {
                console.log(this.fetchParam)
				this.fetchParam.limit_time && (this.fetchParam.limit_time += '')
				this.fetchParam.score_pass && (this.fetchParam.score_pass += '')
				this.fetchParam.tags = this.courseTags ? this.courseTags.join(',') : ''
				this.$refs.formFirst.validate((isValidate) => {
					console.log(isValidate)
					if(!isValidate) return
					transformParam(this.fetchParam)
					// for(let i in this.fetchParam){
					//     this.fetchParam[i] = this.fetchParam[i]== undefined ?'': this.fetchParam[i]

					// }
					let p
					// 如果是编辑
					if(this.fetchParam.contentid) {
						p = courseService.editCourse(this.fetchParam).then((ret) => {
							this.activeTab = 'second'
						})
					} else {
						p = courseService.addCourse(this.fetchParam).then((ret) => {
							this.fetchParam.contentid = ret.contentid
							this.activeTab = 'second'
						})
					}

					p.then(() => {
						// 如果只是保存不需要考试  跳回去
						if(this.fetchParam.need_testing === 0) {
							this.$router.back()
						}
					})
				})
			},
			btnPreClick() {
				this.activeTab = 'first'
			},
			// 处理上传文档
			handleUploadMedia(response) {
				this.fetchParam.material_id = response.data.contentid
			},
			// 图片裁切成功回调
			cropperImgSucc(imgData) {
				courseService.commonUploadImageBase({
					image: imgData,
					extpath: ''
				}).then((ret) => {
					this.fetchParam.image = ret.url
				})
			},
			// 处理视频选取
			handleVideoSelected(row) {
				this.fetchParam.material_name = row.title
				this.fetchParam.material_id = row.material_id
			},
			addTesting(type, index) {
				this.fetchTesting.splice(index, 0, testingFactory.getTestingSet(type))
			},
			// 删除考试
			deleteTesting(index, item) {
				xmview.showDialog(`是否确定删除题目【 <i style="color:red">${item.description || ''}</i> 】?`, () => {
					if(!item.course_id) {
						this.fetchTesting.splice(index, 1)
					} else {
						courseService.delCourse({
							course_id: item.course_id,
							id: item.id
						}).then((ret) => {
							this.fetchTesting.splice(index, 1)
						})
					}

				})
			},
			// 添加多选 单选的选项
			addMoreTestingOption(options) {
				options.push({
					description: '',
					correct: ''
				})
			},
			// 考试题目信息提交
			handleSubmitTesting() {
				// 处理当前的数据
				let item = null

				if(!this.fetchTesting || this.fetchTesting.length < 1) {
					this.$router.back()
					return
				}
				let requestParam = JSON.parse(JSON.stringify(this.fetchTesting))
				for(let i = 0; i < requestParam.length, item = requestParam[i]; i++) {
					// 处理单选题的正确答案选中
					if(item.category == 1 && typeof item.correct == 'number') {
						if(item.options) {
							item.options.map((itemOptions) => {
								delete itemOptions.correct
							})
							item.options[item.correct].correct = 1
							delete item.correct
						}
					}

					// 修复sort属性
					item.sort = i + 1
					if(item.options) {
						item.options.map((itemOptions, index) => {
							itemOptions.sort = index + 1
						})
					}
				}
				xmview.setContentLoading(true)
				courseService.addOrEditTesting({
					course_id: this.fetchParam.contentid,
					subjects: encodeURI(formUtils.serializeArray(requestParam)).replace(/\+/g, '%2B')
				}).then((ret) => {
					xmview.showTip('success', '操作成功')
					this.$router.back()
				}, () => {}).then(() => {
					xmview.setContentLoading(false)
				})
			},
			handleUploadDoc(rep, file) { // 文档上传完毕
				console.log(rep)
				console.log(file)
				this.fetchParam.file_name = file.name
				if(rep.data.contentid==undefined) {
					console.log(1111)
					this.rulesFirst.material_id.required=false;
//                   this.fetchParam.material_id=0
				} else {
					this.fetchParam.material_id = rep.data.contentid
				}

				this.fetchParam.source_url = rep.data.url
				console.log(this.fetchParam.file_name)

			},
			// 课程类型改变
			typeChange(val) {
				if(val === 'doc') {
					this.accept = '.doc,.docx'
				} else if(val === 'ppt') {
					this.accept = '.ppt,.pptx'
				console.log(this.accept)
				} else if(val === 'pdf') {
					this.accept = '.pdf'
				}
			}
		},
		components: {
			CropperImg,
			UploadFile,
			CourseAlbumSelect,
			DialogVideo,
			UploadImg,
			vTags,
			VideoPreview,
			Experts,
			GovTree
		},
		mounted(){
			console.log(this.fetchParam)
			if(this.$route.query.handle=='add'){
				this.btnType='add'
			}else{
				this.btnType='edit'
			}
				
		}
	}

	function getOrignData() {
		let orignData = { // 课程信息部分
			contentid: void 0, //切换tab
			category_id: void 0,
			category_type: void 0, //栏目分类	1.课程栏目; 2.应试培训栏目
			course_name: void 0,
			name: void 0, //栏目名称
			image: void 0,
			tags: void 0,
			gov: void 0,
			type: '', // 课程类别 private,public,industry,gov
			material_type: '', //教材类型	video,doc,ppt,pdf
			material_id: void 0,
			material_name: '选择视频',
			albumid: void 0,
			album_name: void 0,
			description: void 0,
			need_testing: 0,
			limit_time: void 0,
			limit_repeat: void 0,
			score_pass: void 0,
			price_enabled: void 0,
			price: void 0,
			price_floa: void 0,
			experts_id: void 0,
			experts_name: '',
			sort: void 0,
			share: 0,
			noaccess: 0,
			region: '',
			source_url:'',
			file_name:''
		}
        console.log(orignData)
		return orignData
	}
</script>