<template>
    <div>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    prop="username"
                    label="用户名">
            </el-table-column>
            <el-table-column
                    prop="sex"
                    label="性别">
                <template slot-scope="scope">
                    <span>{{scope.row.sex?'男':'女'}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="age"
                    label="年龄">
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="邮箱">
            </el-table-column>
            <el-table-column
                    prop="avatar"
                    label="头像">
                <template slot-scope="scope">
                    <img :src="scope.row.avatar" alt="">
                </template>
            </el-table-column>
            <el-table-column
                    label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.row._id)">编辑
                    </el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row._id)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination
                :total="count"
                :pageSize="params.pageSize"
                :currentPage="params.pageNo"
                @change-no="onchange"
                @change-size="changeSize"
        />
        <el-dialog title="修改个人信息" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-form">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-switch v-model="form.status"></el-switch>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-radio-group v-model="form.sex">
                        <el-radio :label="true">男</el-radio>
                        <el-radio :label="false">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model="form.age"></el-input>
                </el-form-item>
                <el-form-item label="头像" prop="avatar">
                    <upload @upload-img="uploadImg" :imageUrl="form.avatar"></upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleUpdate">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {UserList,UserInfo,UserUpdate,UserDelete} from '@/api/user'
    import upload from '_c/upload'
    import pagination from "@/components/pagination";
    export default {
        name: "list",
        components:{
            pagination,
            upload
        },
        data(){
            return{
                params:{
                    pageSize:2,
                    pageNo:1
                },
                dataInfo:{},
                tableData:[],
                count: 0,
                dialogFormVisible:false,
                form:{

                },
                rules:{
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ],
                    email: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                    ],
                    age: [
                        { required: true, message: '请输入年龄', trigger: 'blur' },
                    ],
                    avatar: [
                        { required: true, message: '请先上传头像', trigger: 'blur' },
                    ],
                    sex: [
                        { required: true, message: '请选择性别', trigger: 'change' },
                    ],
                    status: [
                        { required: true, message: '请选择状态', trigger: 'change' },
                    ],
                }
            }
        },
        mounted() {
            this.getList()
        },
        methods:{
            async getList(){
                const {list,count} =  await UserList(this.params)
                this.tableData =list
                this.count = count
            },
            onchange(val) {
                this.params.pageNo = val
                this.getList()
            },
            changeSize(val) {
                this.params.pageSize = val
                this.getList()
            },
            handleEdit(id){
                this.dialogFormVisible=true
                this.getInfo(id)
            },
            async getInfo(id){
                const {user} =  await UserInfo({id:id})
                this.form = user
            },
            uploadImg(path){
                this.form.avatar = path
            },
            async handleUpdate(){
              const {status,msg,user} = await UserUpdate(this.form)
                if (status===200){
                    this.$message.success(msg)
                    this.dialogFormVisible=false
                    this.getList()
                }
            },
            async handleDelete(_id){
             const {status,msg} = await UserDelete({_id})
                if (status===200){
                    this.$message.success(msg)
                    this.getList()
                }
            }
        }
    }
</script>

<style scoped>

</style>