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
            <el-form-item label="菜单名称" prop="menu_name">
                <el-input v-model="fetchParam.menu_name"></el-input>
            </el-form-item>
            <el-form-item label="菜单标识" prop="menu_node">
                <el-input v-model="fetchParam.menu_node"></el-input>
            </el-form-item>
            <!-- <el-form-item label="父级名称" prop="pid" :fetch-suggestions="querySearch">
                <el-select v-model="fetchParam.pid" placeholder="请输入父级名称">
                    <el-option  v-for="item in drop_list" :key="item.id" :label="item.id + item.menu_name" :value="item.id"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="父级栏目" prop="pid">
                <MultCategory  :placeholder="fetchParam.parent_name" :autoClear="true" :mark = this.mark :showNotCat="false" v-model="fetchParam.pid" :req="req"></MultCategory>
            </el-form-item>
            <!--<el-form-item label="父级菜单" prop="pid">
                <MenuFatherCategory type="course" :placeholder="fetchParam.menu_name" :autoClear="true" :showNotCat="false" v-model="fetchParam.pid"></MenuFatherCategory>
            </el-form-item>-->
            <!--<el-form-item label="菜单层级" prop="level">
                <el-input v-model.password="fetchParam.level" type="number"></el-input>
            </el-form-item>-->
            <el-form-item label="排序字段" prop="sort">
                <el-input type='number' v-model.number="fetchParam.sort"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input v-model="fetchParam.remark"></el-input>
            </el-form-item> 
            <el-form-item label=""  v-if="this.$route.params.sys_type">
                <el-button @click="$router.push({ name:'gov-menu-manage'})">取消</el-button>
                <el-button type="primary" @click="btnNextClick">确认</el-button>
            </el-form-item>
            </el-form>
        </section>
    </main>
</template>

<script>
    import menuService from '../../../services/gov/menuService'
    import config from '../../../utils/config'
    import MultCategory from '../../component/select/MultCategory.vue'
    export default {
        name: 'gov-menu-form',
        components: { MultCategory },
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
                    menu_name: [
                        {required: true, message: '必须输入', trigger: 'blur'},
                        ,{
                            pattern:  /\S$/,
                            message: '请输入非空格或非特殊字符的内容'
                        }
                    ],
                    menu_node: [
                        {required: true, message: '必须输入', trigger: 'blur'},
                        ,{
                            pattern:  /\S$/,
                            message: '请输入非空格或非特殊字符的内容'
                        }
                    ],
                    sort: [
                        {required: true, type:'number',message: '必须输入', trigger: 'blur'}
                    ],
                    level: [
                        {required: true, message: '必须输入', trigger: 'blur'}
                    ],
                },
                mark:{
                    type:'menu',
                    name:'menu_name',
                    changeOnSelect:true
                }
            }
        },
        created() {
            xmview.setContentLoading(false);
                if (this.$route.params.sys_id != undefined) {    //路由id传递
                    menuService.getAdminInfo(this.$route.params.sys_id).then((ret) => {
                        Number(ret.data.sort)
                        this.fetchParam = ret.data
                    })
                }    
            this.loadingData=false;
            this.getDropval()
        },
        watch:{
            'fetchParam.sort'(){
                console.log(this.fetchParam.sort,typeof(this.fetchParam.sort))
            }
        },
        methods: {
            //获取父级菜下拉列表
            req(param){
                    return menuService.fetchData({
                        pagesize:-1,pid:-1,level:-1
                    })
                },
            getDropval(){
                menuService.fetchData({pagesize:-1}).then((ret)=>{
                 this.drop_list=ret.data;
                })
            },

            btnNextClick() {
                this.$refs['form'].validate((valid) => {
                    if (!valid) return
                    let req = menuService.create
                    console.log(this.$route.params.sys_id)
                    if (this.$route.params.sys_id) req = menuService.update
                    req(this.fetchParam).then((ret) => {
                        console.log(ret)
                        // 重置当前数据
                        xmview.showTip('success', '数据提交成功')
                        // this.fetchParam=getOriginData(),
                        //如果请求的是create创建成功 就push到角色组授权页面授权this.$router.push({name: 'section-edit')
                        this.$router.push({'name': 'gov-menu-manage'})
                        this.$refs['form'].resetFields();
                        this.currentData = {
                            data: [],
                            pindex: -1,
                            index: -1
                        }
                        if (!this.fetchParam.id) this.fetchParam.id = ret.id;
                        
                       
                    })
                })
            },
              //拿到父级菜单
            querySearch(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
                // 调用 callback 返回建议列表的数据返回建议列表的数据
                cb(results);
            },
        }
    }

    function getOriginData() {
        return {
            id:0,
            menu_name: '',
            menu_node:'',
            remark:'',
            sort: 0,
            pid: void 0,
            level: 0,
            parent_name:'',
        }
    }

</script>