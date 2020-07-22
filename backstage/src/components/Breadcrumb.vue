<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="o in breadList" :key="o.path" :to="o.path">{{o.meta.title}}
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
    export default {
        name: "Breadcrumb",
        data(){
            return{
                breadList:[]
            }
        },
        watch: {
            $route() {
                this.getBreadcrumb();
            }
        },
        created() {
            this.getBreadcrumb();
        },
        methods:{
            isHome(route) {
                return route.name === "Dashboard";
            },
            getBreadcrumb() {
                let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
                console.log(matched);
                //如果不是首页
                if (!this.isHome(matched[0])) {
                    matched = [{ path: "/dashboard", meta: { title: "Dashboard" } }].concat(matched);
                }
                this.breadList = matched;
                console.log(this.breadList);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .el-breadcrumb{
        @include wh(60%,40px);
        line-height: 40px;
        margin-bottom: 10px;
    }
    /deep/.el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
        color: #97a8be;
    }
</style>