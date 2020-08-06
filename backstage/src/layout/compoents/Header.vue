<template>
    <header>
        <div style="display: flex;align-items: center;width: 60%;">
            <i :class="[$store.getters.isCollapse?'el-icon-s-unfold':'el-icon-s-fold']" @click="change"></i>
            <Breadcrumb></Breadcrumb>
        </div>
        <div style="display: flex;align-items: center;">
            <screenful></screenful>
            <el-dropdown @command="handleCommand">
  <span class="el-dropdown-link">
     <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar><i
          class="el-icon-arrow-down el-icon--right"></i>
  </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="a">首页</el-dropdown-item>
                    <el-dropdown-item command="b">修改密码</el-dropdown-item>
                    <el-dropdown-item command="c">个人中心</el-dropdown-item>
                    <el-dropdown-item command="d">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
                <el-form :model="form" label-width="120px" :rules="rules" ref="form">
                    <el-form-item label="旧密码" prop="oldPassword">
                        <el-input v-model="form.oldPassword" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop="newPassword">
                        <el-input v-model="form.newPassword" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPassword">
                        <el-input v-model="form.checkPassword" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleUpdate('form')">确 定</el-button>
                </div>
            </el-dialog>
        </div>


    </header>
</template>

<script>
    import screenful from '../../components/screenful';
    import Breadcrumb from '../../components/Breadcrumb'
    import {changePassword} from '@/api/user'
    export default {
        components: {
            screenful,
            Breadcrumb
        },
        data() {
            return {
                dialogFormVisible:false,
                form:{
                    oldPassword:'',
                    newPassword:'',
                    checkPassword:'',
                    _id:this.$store.state._id
                },
                rules:{
                    oldPassword: [
                        { required: true, message: '请输入原密码', trigger: 'blur' },
                    ],
                    newPassword: [
                        { required: true, message: '请输入新密码', trigger: 'blur' },
                    ],
                    checkPassword: [
                        { required: true, message: '请再次输入新密码', trigger: 'blur' },
                    ]
                }
            }
        },
        created() {

        },
        methods: {
            change() {
                this.$store.commit('changeCollapse')
            },
            handleCommand(command) {
                switch (command) {
                    case 'a':
                        this.$router.push('/')
                        break;
                    case 'b':
                        this.dialogFormVisible=true
                        break;
                    case 'c':
                        break;
                    case 'd':
                        this.logout()
                        break;
                    default:
                        break;
                }
            },
            //修改密码
             handleUpdate(formName){
                this.$refs[formName].validate(async(valid) => {
                    if (valid) {
                        const {status,msg} =await changePassword(this.form)
                        if (status===200){
                            this.$message.success(msg)
                            this.$router.push('/login')
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            //退出登录
            logout() {
                this.$confirm('确认是否退出登录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('userLogout')
                        .then(res => {
                            this.$router.push('/login')
                            this.$message.success('退出成功')
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消退出'
                    });
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    header {
        display: flex;
        height: 50px;
        align-items: center;
        justify-content: space-between;

        i {
            margin-right: 20px;

        }
    }

    .fangda {
        margin-right: 20px;
    }
</style>