<template>
    <div class="container">
        <Sidebar :isCollapse="isCollapse"></Sidebar>
        <div class="content">
            <header>
                <div style="display: flex;align-items: center;width: 60%;">
                    <i class="el-icon-menu" @click="change"></i>
                    <Breadcrumb></Breadcrumb>
                </div>
                <el-dropdown @command="handleCommand">
  <span class="el-dropdown-link">
     <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar><i class="el-icon-arrow-down el-icon--right"></i>
  </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="a">首页</el-dropdown-item>
                        <el-dropdown-item command="b">个人中心</el-dropdown-item>
                        <el-dropdown-item command="c">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>

            </header>
            <el-card class="box-card">
                <router-view></router-view>
            </el-card>
        </div>
    </div>
</template>


<script>
    import Sidebar from "./compoents/Sidebar";
    import Breadcrumb from "../components/Breadcrumb";

    export default {
        data() {
            return {
                isCollapse:this.$store.state.isCollapse
            };
        },
        components: {
            Sidebar,
            Breadcrumb
        },
        methods: {
            change() {
                this.isCollapse = !this.isCollapse
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            handleCommand(command) {
                if (command=='a'){
                    this.$router.push('/')
                }else if (command=='c'){
                    this.logout()
                }
            },
            logout(){
                this.$confirm('确认是否退出登录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$store.dispatch('userLogout')
                        .then(res=>{
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

<style lang='scss' scoped>
    .container {
        width: 100%;
        height: 100%;
        display: flex;
    }

    .content {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin: 0 20px;
    }

    header {
        display: flex;
        height: 50px;
        align-items: center;
        justify-content: space-between;

        i {
            margin-right: 20px;
        }
    }
</style>