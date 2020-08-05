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
     <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar><i class="el-icon-arrow-down el-icon--right"></i>
  </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="a">首页</el-dropdown-item>
                    <el-dropdown-item command="b">个人中心</el-dropdown-item>
                    <el-dropdown-item command="c">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>


    </header>
</template>

<script>
    import screenful from '../../components/screenful';
    import Breadcrumb from '../../components/Breadcrumb'

    export default {
        components:{
            screenful,
            Breadcrumb
        },
        data(){
            return{

            }
        },
        created() {

        },
        methods:{
            change() {
               this.$store.commit('changeCollapse')
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
    .fangda{
        margin-right: 20px;
    }
</style>