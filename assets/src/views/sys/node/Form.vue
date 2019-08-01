<!--课程表单：添加/修改-->
<style lang="scss" rel="stylesheet/scss">
    @import "../../../utils/mixins/common";
    #sys-form {
        @extend %content-container;
        .el-form {
            max-width: 700px;
        }
    
        .submit-form {
        width: 40%;
        padding: 20px;
            .subButton {
                text-align: center;
            }
    }
    }
</style>
<template>
    <main id="sys-form">
        <section class="upload-avatar">
            <div class="img-container">
                <img :src="imgUrl" />
            </div>
            <!--<ImagEcropperInput :isRound="true" :aspectRatio="1" :confirmFn="cropperFn" class="upload-btn"></ImagEcropperInput>-->
        </section>     
        <section class="submit-form">   
            <el-form label-width="120px" ref="form" :model="fetchParam" :rules="rules">
                <el-form-item label="权限节点名称" prop="node_name">
                    <el-input v-model="fetchParam.node_name"></el-input>
                </el-form-item>
                <el-form-item label="节点标识" prop="node">
                    <el-input v-model="fetchParam.node"></el-input>
                </el-form-item>
                <!--<el-form-item label="父级菜单id"  prop="pid">
                    <el-input v-model.email="fetchParam.pid" type="number" ></el-input>
                </el-form-item>-->
                <el-form-item label="父级菜单" prop="pid" :fetch-suggestions="querySearch">
                    <el-select v-model="fetchParam.pid" placeholder="请输入父级菜单">
                        <el-option  v-for="item in drop_list" :key="item.id" :label="item.node_name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="菜单层级" prop="level">
                    <el-input-number :min="0" v-model="fetchParam.level" type="number"></el-input-number>
                </el-form-item>
                <el-form-item label="排序字段" prop="sort">
                    <el-input-number  :min="0" v-model="fetchParam.sort"></el-input-number>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="fetchParam.remark"></el-input>
                </el-form-item>
                <el-form-item label="" v-if="this.$route.params.sys_type">
                    <el-button @click="$router.push({ name:'sys-index'})">取消</el-button>
                    <el-button type="primary" @click="btnNextClick">确认</el-button>
                </el-form-item>
            </el-form>
        </section>
    </main>
</template>

<script>
    import nodeService from '../../../services/sys/nodeService'
    import config from '../../../utils/config'
    export default {
        name: 'sys-form',
        data() {
            return {
                imgUrl: '',
                loadingData: false,
                currentData: {
                    data: {},
                    pindex: -1,
                    index: -1
                },
                fetchParam: getOriginData(),
                resultData: [],
                drop_list:[],
                rules: {
                    node_name: [
                        {required: true, message: '必须输入', trigger: 'blur'},
                    ],
                    node: [
                        {required: true, message: '必须输入', trigger: 'blur'}
                    ],
                    remark: [
                        {required: true, message: '必须输入', trigger: 'blur'}
                    ],
                    sort: [
                        {required: true,type:'number',message: '必须输入', trigger: 'blur'}
                    ],
                    // pid: [
                    //     {required: true, type:'number',message: '必须输入', trigger: 'blur'}
                    // ],
                    level: [
                        {required: true,type:'number', message: '必须输入', trigger: 'blur'}
                    ],
                }
            }
        },
        watch:{
            'fetchParam.level'(){
                console.log(typeof(this.fetchParam.level),this.fetchParam.level);
                
            }
        },
        created() {
            xmview.setContentLoading(false);
            console.log('this.$route.params.sys_id='+this.$route.params.sys_id )
                if (this.$route.params.sys_id != undefined) {    //路由id传递
                    if(!this.$route.params.sys_type){xmview.setContentTile('查看节点')}
                    nodeService.getAdminInfo(this.$route.params.sys_id).then((ret) => {
                        // console.log('菜单层级',typeof(ret.level),ret.level)
                        // console.log('排序字段',typeof(ret.sort),ret.sort)
                        this.fetchParam = ret
                        console.log(ret)
                        // this.fetchParam.role_id = ret.course.role_id
                    })
                }    
            this.loadingData=false;
            this.getDropval()
        },
        methods: {
            //获取父级菜下拉列表
            getDropval(){
                let param={
                    page: '',
                    pagesize: -1,
                    node_name:'', //以下几行代码不给disablied传参的话可不写
                    node:'',
                    pid: void 0,
                    level: '',
                    disabled: 0
                }
                nodeService.fetchData(param).then((ret)=>{
                console.log(ret)
                 this.drop_list=ret.data;
                })
            },
              //拿到父级菜单
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据返回建议列表的数据
                cb(results);
            },
            btnNextClick() {
                this.$refs['form'].validate((valid) => {
                    if (!valid) return
                    let req = nodeService.create
                    if (this.$route.params.sys_id) req = nodeService.update
                    console.log(req)
                    // console.log(this.$route.params.sys_id)
                    req(this.fetchParam).then((ret) => {
                        console.log(ret)
                        // 重置当前数据
                        xmview.showTip('success', '数据提交成功')
                        // this.fetchParam=getOriginData(),
                        this.$refs['form'].resetFields();
                        this.currentData = {
                            data: [],
                            pindex: -1,
                            index: -1
                        }
                        if (!this.fetchParam.id) this.fetchParam.id = ret.id;
                        this.$router.push({'name': 'node-index'})
                    })
                })
            },
        }
    }

    function getOriginData() {
        return {
            menu_name: '',
            menu_node:'',
            remark:'',
            sort: 0,
            pid: null,
            level: 0,
        }
    }

</script>