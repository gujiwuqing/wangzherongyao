<template>
    <el-menu
            class="el-menu-vertical-demo"
            router
            :default-active="$route.path"
            :collapse="$store.getters.isCollapse"
            background-color="#304156"
            text-color="#fff"
            active-text-color="#017fc8"
    >
        <template v-for="item in menuList">
            <el-submenu v-if="item.children" :index="item.path" :route="item.path" :key="item.id">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span slot="title">{{item.meta.title}}</span>
                </template>
                <template v-for="(i,index) in item.children" v-if="i.name!=='Home'">
                    <el-menu-item :index="i.path" :route="i.path" :key="index">
                        <template slot="title">
                            <span slot="title">{{i.meta.title}}</span>
                        </template>
                    </el-menu-item>
                </template>
            </el-submenu>
            <el-menu-item :index="item.path" v-else :route="item.path">
                <i :class="item.icon"></i>
                <span slot="title">{{item.meta.title}}</span>
            </el-menu-item>
        </template>
    </el-menu>
</template>

<script>
    import routes from "@/router/route";
    export default {
        name: "Sidebar",
        data(){
            return{
                menuList:[
                    // {
                    //     icon:'el-icon-menu',
                    //     path:'/dashboard',
                    //     title:'首页',
                    //     id:1
                    // },
                    // {
                    //     id:2,
                    //     path:'/category',
                    //     title:'分类管理',
                    //     icon:'el-icon-location-outline',
                    //     children:[
                    //         {
                    //             path: '/category/add',
                    //             title: '添加',
                    //         },
                    //         {
                    //             path: '/category/list',
                    //             title: '列表'
                    //         }
                    //     ]
                    // },
                    // {
                    //     id:3,
                    //     path:'/article',
                    //     title:'物品管理',
                    //     icon:'el-icon-goods',
                    //     children:[
                    //         {
                    //             path: '/article/add',
                    //             title: '添加',
                    //         },
                    //         {
                    //             path: '/article/list',
                    //             title: '列表'
                    //         }
                    //     ]
                    // }
                ]
            }
        },
        created() {
            console.log(routes);
            this.menuList = routes.filter(item=>item.isMenu)
            console.log(this.menuList);
        }
    }
</script>

<style lang="scss" scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        height: 100%;
    }
</style>