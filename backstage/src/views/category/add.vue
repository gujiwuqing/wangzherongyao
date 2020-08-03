<template>
  <div class="add">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      style="width: 500px;"
    >
      <el-form-item label="上级分类">
        <el-select v-model="ruleForm.parentName" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {optionCategoryList,categoryAdd} from '@/api/category'
export default {
  name: "add",
  data() {
    return {
      options: [],
      ruleForm: {
        
      },
      rules: {
        name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ]
      },
    };
  },
  created() {
    this.getOptions()
  },
  methods: {
    async getOptions(){
      const {list}  = await optionCategoryList()
      if (Array.isArray(list)){
        this.options = list.map(item=>({
          label:item.name,
          value:item._id
        }))
      }
      console.log(this.options);
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const {status,msg}  =await categoryAdd(this.ruleForm)
          console.log(status, msg);
          if (status==200){
            this.$message.success(msg)
            this.$router.push('/category/list')
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
</style>