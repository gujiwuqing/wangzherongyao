<template>
    <div class="add">
        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="活动名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="物品图片">
                <upload @upload-img="uploadImg"></upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import upload from "../../components/upload";
    import {articleAdd} from '@/api/article'
    export default {
        name: "add",
        components:{
            upload
        },
        data() {
            return {
                form: {},
                rules: {
                    name: [
                        {required: true, message: '请输入活动名称', trigger: 'blur'},
                    ],
                },
            }
        },
        methods: {
            uploadImg(path){
                this.form.icon = path
                console.log(this.form.icon);
            },
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    if (valid) {
                   const {status,msg}  =   await articleAdd(this.form)
                  if(status=='200'){
                       this.$message.success(msg)
                       this.$router.push('/article/list')
                  }

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style  scoped>

</style>