<template>
    <div class="login">
        <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="80px"
                class="demo-ruleForm"
        >
            <h2>欢迎来到后台管理系统</h2>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password" clearable show-password></el-input>
            </el-form-item>
            <el-form-item>
                <el-button round type="primary" @click="submitForm('ruleForm')">{{loginText}}</el-button>
                <el-button round @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>

    export default {
        data() {
            return {
                ruleForm: {
                    username: "admin",
                    password: "123456",
                },
                loginText:'登录',
                rules: {
                    username: [
                        {required: true, message: "请输入账号", trigger: "blur"},
                        {min: 3, max: 11, message: "长度在 3 到 11 个字符", trigger: "blur"},
                    ],
                    password: [
                        {required: true, message: "请输入密码", trigger: "blur"},
                        {min: 3, max: 11, message: "长度在 3 到 11 个字符", trigger: "blur"},
                    ],
                },
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loginText='登录中...'
                        this.$store.dispatch('userLogin',this.ruleForm)
                        .then(res=>{
                            console.log(res);
                            if (res.token){
                               this.loginText='登录'
                               this.$message.success('登录成功')
                               this.$router.push('/')
                           }else {
                               this.loginText='登录'
                           }
                        })
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        },
    };
</script>

<style lang='scss' scoped>
    .login {
        background: url('../../assets/img/banner.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        @include wh(100%,100vh);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .demo-ruleForm{
        background-color: #fff;
        width: 500px;
        height: 300px;
        box-sizing: border-box;
        padding: 40px 20px;
        h2{
            text-align: center;
            height: 40px;
            line-height: 40px;
            margin-bottom: 20px;
        }
    }
    .el-form-item{
        margin-bottom: 20px;
    }
</style>