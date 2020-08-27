<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="ruleForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="ruleForm.password"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="ruleForm.email"></el-input>
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-switch v-model="ruleForm.status"></el-switch>
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-radio-group v-model="ruleForm.sex">
        <el-radio :label="true">男</el-radio>
        <el-radio :label="false">女</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="年龄" prop="age">
      <el-input v-model="ruleForm.age"></el-input>
    </el-form-item>
    <el-form-item label="权限" prop="role">
      <el-select v-model="ruleForm.role" placeholder="请选择">
        <el-option v-for="item in roleLists" :key="item._id" :label="item.name" :value="item._id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="头像" prop="avatar">
      <upload @upload-img="uploadImg"></upload>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import upload from "_c/upload";
import { register } from "@/api/user";
import { roleList } from "@/api/role";
export default {
  name: "add",
  components: {
    upload,
  },
  data() {
    return {
      ruleForm: {
        username: "",
        password: "",
        email: "",
        avatar: "",
        age: "",
        sex: "",
        status: false,
      },
      roleLists:[],
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        age: [{ required: true, message: "请输入年龄", trigger: "blur" }],
        avatar: [{ required: true, message: "请先上传头像", trigger: "blur" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
        role: [{ required: true, message: "请选择角色", trigger: "change" }]
      },
    };
  },
  mounted() {
      this.getRole()
  },
  methods: {
    async getRole() {
      const { list } = await roleList();
      this.roleLists = list;
    },
    uploadImg(path) {
      this.ruleForm.avatar = path;
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const { status, msg } = await register(this.ruleForm);
          if (status === 200) {
            this.$message.success(msg);
            this.$router.push("/user/list");
          }
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

<style lang="scss" scoped>
.demo-ruleForm {
  width: 500px;
}
</style>