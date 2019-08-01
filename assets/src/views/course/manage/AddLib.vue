<!--添加课程-->
<!--公开课管理-->
<style lang='scss' rel='stylesheet/scss'>
@import "../../../utils/mixins/common";

#course-manage-addcourse-container {
    @extend %content-container;
    .tab {
        max-width: 700px;
    }
    .el-tab-pane {
        max-width: 700px;
    }
     // 考试题目设置
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
            <el-tab-pane :disabled="!fetchParam.contentid" label="考试题目设置" name="second" class="testing-set">
                <el-form>
                    <el-form label-width="120px" v-for="(item,index) in fetchTesting" :key="index">
                        <el-form-item label="" v-if="!readonly">
                            <el-button icon="plus" @click='addTesting(0, index)'>判断题</el-button>
                            <el-button icon="plus" @click='addTesting(1, index)'>单选题</el-button>
                            <el-button icon="plus" @click='addTesting(2, index)'>多选题</el-button>
                            <el-button icon="delete" type="danger" @click='deleteTesting(index, item)'>删除</el-button>
                        </el-form-item>
                        <el-form-item :label="'第' + (index+1) + '题'">
                            <span v-if="item.subject_type == 0">判断题</span>
                            <span v-else-if="item.subject_type == 1">单选题</span>
                            <span v-else>多选题</span>
                        </el-form-item>
                        <el-form-item label="题目">
                            <el-input v-model="item.description" :disabled="!item.editable" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="配图">
                            <UploadImg :defaultImg="item.image" :url="uploadImgUrl" :disabled="!item.editable" :onSuccess="res => item.image = res.data.url" :data='uploadextraData'></UploadImg>
                        </el-form-item>

                        <!--判断题的正确错误选项-->
                        <el-form-item label="选项" v-if="item.subject_type == 0">
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
                                <el-checkbox v-model="option.correct" :true-label="1" :disabled="!item.editable" v-if="item.subject_type == 2"></el-checkbox>
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
                <el-form label-width="120px" v-if="!readonly">
                    <el-form-item label="">
                        <el-button icon="plus" @click='addTesting(0, fetchTesting.length)'>判断题</el-button>
                        <el-button icon="plus" @click='addTesting(1, fetchTesting.length)'>单选题</el-button>
                        <el-button icon="plus" @click='addTesting(2, fetchTesting.length)'>多选题</el-button>
                    </el-form-item>
                </el-form>

                <div class="bottom-btns" v-if="!readonly">
                    <el-button class="submit" type="primary" @click="handleSubmitTesting">发布</el-button>
                </div>
            </el-tab-pane>
        </el-tabs>
    </article>
</template>

<script>
import courseService from '../../../services/course/courseService.js'
import libService from '../../../services/course/libService.js'
import UploadImg from '../../component/upload/UploadImg.vue'
import testingFactory from '../utils/testingFactory'
import formUtils from '../../../utils/formUtils'
import {transformParam} from '../../../utils/common'

export default {
    name: 'course-manage-addcourse',
    data() {
        return {
            activeTab: 'second',
            fetchParam: getOrignData(),
            // 考试设置部分
            fetchTesting: [],
            readonly: false, // 只读模式
            uploadextraData:{
                biz:'lib',
                extpath:'subject'
            }
        }
    },
    created() {
        this.uploadImgUrl = courseService.commonUploadImage()
        //编辑页面
        if (this.$route.params.courseInfo) {
             //从主页传递信息
            for(let i in this.$route.params.courseInfo){
                 this.fetchParam[i]=this.$route.params.courseInfo[i]
            }
            console.log(this.$route.params.courseInfo, this.fetchParam)
            xmview.setContentTile(`查看考题-${this.fetchParam.category_name}`)
            this.readonly = this.$route.params.readonly
            this.getLibSubject()
        } else if (this.$route.query.contentid) {//查看页面
            courseService.getCourseInfo({ course_id: this.$route.query.contentid }).then((ret) => {
                this.fetchParam = ret.course                  // 没拿到信息 获取信息
                this.fetchParam.course_name= this.$route.params.courseInfo.course_name
                 xmview.setContentTile(`查看考题-${this.fetchParam.category_name}`)
                this.getLibSubject()
                 
            }).catch((ret) => {
                xmview.showTip('error', ret.message)
            })
        }else if(this.$route.params.addcourseInfo){ //添加页面
            console.log('this.$route.params.addcourseInfo',this.$route.params.addcourseInfo)
            this.fetchParam.category_name = this.$route.params.addcourseInfo.category_name
            this.fetchParam.category_id = this.$route.params.addcourseInfo.category_id
            xmview.setContentTile(`添加考题-${this.fetchParam.category_name}`)
        }
        this.$route.params.tab && (this.activeTab = this.$route.params.tab)
        
        
        xmview.setContentLoading(false)
    },

    methods: {
        getLibSubject(){
             if ( this.fetchParam.id) {
                xmview.setContentLoading(true)
                libService.getLibSubject(this.fetchParam.id ).then((ret) => {
                    console.log('ret',ret);
                    //返回数据少一层[]
                    var arr = []
                    arr.push(ret)
                    this.fetchTesting = arr
                    this.fetchTesting.forEach((item) => {
                        if (item.subject_type == 1) {
                            item.options.forEach((optionItem, index) => {
                                if (optionItem.correct == 1) item.correct = index
                            })
                        }
                    })
                    xmview.setContentLoading(false)
                })
            }
        },
        addTesting(type, index) {
            this.fetchTesting.splice(index, 0, testingFactory.getLibSet(type))
        },
        // 删除考试
        deleteTesting(index, item) { // 接口没调
            xmview.showDialog(`是否确定删除题目【 <i style="color:red">${item.description || ''}</i> 】?`, () => {
                if(!item.course_id){
                     this.fetchTesting.splice(index, 1)
                }else{
                     libService.delLib({course_id:item.course_id,id:item.id}).then((ret) => {
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
            if (!this.fetchTesting || this.fetchTesting.length < 1) {
                this.$router.back()
                return
            }
            let requestParam = JSON.parse(JSON.stringify(this.fetchTesting))
            for (let i = 0; i < requestParam.length, item = requestParam[i]; i++) {
                // 处理单选题的正确答案选中
                if (item.subject_type == 1 && typeof item.correct == 'number') {
                    if(item.options){
                        item.options.map((itemOptions) => {
                            delete itemOptions.correct
                        })
                        item.options[item.correct].correct = 1
                        delete item.correct
                    }
                }
                // 修复sort属性
                item.sort = i + 1
                if (item.options) {
                    item.options.map((itemOptions, index) => {
                        itemOptions.sort = index + 1
                    })
                }
            }
            xmview.setContentLoading(true)
            libService.addOrEditLib({
                category_id: this.fetchParam.category_id,
                subjects: encodeURI(formUtils.serializeArray(requestParam)).replace(/\+/g, '%2B')
            }).then((ret) => {
                xmview.showTip('success', '操作成功')
                this.$router.back()
            }, () => {
            }).then(() => {
                xmview.setContentLoading(false)
            })
        },
    },
    components: { UploadImg}
}

function getOrignData() {
    let orignData = { // 课程信息部分
        contentid: void 0,  //切换tab
        category_id: void 0,
        // category_type:void 0, //栏目分类	1.课程栏目; 2.应试培训栏目
        image: void 0,
        type: '', // 课程类别 private,public,industry,gov
        description: void 0,
        need_testing: 0,
        share:0,
        noaccess:0,
    }
    return orignData
}
</script>
