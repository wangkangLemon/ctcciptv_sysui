<!--课程表单：添加/修改-->
<style lang="scss" rel="stylesheet/scss">
    @import "../../../utils/mixins/common";
    #sys-form {
        @extend %content-container;
        .el-form {
            max-width: 700px;
        }
    }
</style>
<template>
    <main id="sys-form">
            <el-form label-width="120px" ref="form" :model="fetchParam" :rules="rules">
            <el-form-item label="角色名称" prop="role_name">
                <el-input v-model="fetchParam.role_name"></el-input>
            </el-form-item>
            <el-form-item label="角色标识" prop="role_node">
                <!-- <el-input v-model="fetchParam.role_node"></el-input> -->
                <el-select v-model="fetchParam.role_node" placeholder="请选择">
                    <el-option label="省级" value="province"></el-option>
                    <el-option label="市级" value="city"></el-option>
                    <el-option label="区(县)" value="area"></el-option>
                    <el-option label="乡镇" value="town"></el-option>
                    <el-option label="村级" value="village"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="">
                <el-button @click="$router.push({ name:'gov-warrant'})">取消</el-button>
                <el-button type="primary" @click="btnNextClick">确认</el-button>
            </el-form-item>
            </el-form>
    </main>
</template>

<script>
    import roleService from '../../../services/gov/roleService'
    export default {
        name: 'sys-form',
        data() {
            return {
                loadingData: false,
                currentData: {
                    data: {},
                    pindex: -1,
                    index: -1
                },
                fetchParam: getOriginData(),
                rules: {
                    role_name: [
                        {required: true, message: '必须输入', trigger: 'blur'},
                        ,{
                            pattern:  /\S$/,
                            message: '请输入非空格或非特殊字符的内容'
                        }
                    ],
                    role_node: [
                        {required: true, message: '请选择', trigger: 'change'},
                    ]
                },
            }
        },
        created() {
            xmview.setContentLoading(false);
                if (this.$route.params.warrant_id!=undefined) {    //路由id传递
                    roleService.getAdminInfo(this.$route.params.warrant_id).then((ret) => {
                        this.fetchParam = ret
                    })
                }    
            this.loadingData=false;
        },
        methods: {
            btnNextClick() {
                this.$refs['form'].validate((valid) => {
                    if (!valid) return
                    let req = roleService.create
                    if (this.$route.params.warrant_id) req = roleService.update
                    req(this.fetchParam).then((ret) => {
                        this.$refs['form'].resetFields();
                        this.currentData = {
                            data: [],
                            pindex: -1,
                            index: -1
                        }
                        if (!this.fetchParam.id) this.fetchParam.id = ret.id;
                        this.$router.push({'name': 'gov-warrant'})
                    })
                })
            }
        }
    }

    function getOriginData() {
        return {
            role_name:'',
            role_node:'',
        }
    }

</script>