<template>
  <div class="container">
    <Sidebar :isCollapse="isCollapse"></Sidebar>
    <div class="content">
      <header>
        <i class="el-icon-menu" @click="change"></i>
        <Breadcrumb></Breadcrumb>
      </header>
      <router-view></router-view>
    </div>
  </div>
</template>


<script>
  import Sidebar from "./compoents/Sidebar";
  import Breadcrumb from "../components/Breadcrumb";
  export default {
    data() {
      return {
        isCollapse:false
      };
    },
    components:{
      Sidebar,
      Breadcrumb
    },
    methods: {
      change(){
        this.isCollapse=!this.isCollapse
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style lang='scss' scoped>
  .container{
    width: 100%;
    height: 100%;
    display: flex;
  }
  .content{
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  header{
    display: flex;
    height: 40px;
    align-items: center;
  }
</style>