<template>
    <div class="container">
        <Sidebar></Sidebar>
        <div class="content">
            <Header></Header>
            <el-card class="box-card">
                <router-view></router-view>
            </el-card>
        </div>
    </div>
</template>


<script>
    import Sidebar from "./compoents/Sidebar";
    import Header from "./compoents/Header";

    export default {
        data() {
            return {

            };
        },
        components: {
            Sidebar,
            Header
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
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

    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
    }
</style>