import Home from '../views/Home.vue'
import layout from '@/layout'

const routes = [
    {
        path: '/',
        name: 'layout',
        isMenu: true,
        icon: 'el-icon-eleme',
        component: layout,
        ischildren:false,
        redirect: '/dashboard',
        meta: {title: 'Home'},
        children: [{
            path: 'dashboard',
            name: 'Home',
            component: Home
        }]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('_v/login'),
    },
    {
        path: '/category',
        component: layout,
        isMenu: true,
        ischildren:true,
        icon: 'el-icon-menu',
        redirect: '/category/list',
        meta: {
            title: '分类管理'
        },
        children: [
            {
                path: '/category/list',
                component: () => import('_v/category/list'),
                meta: {
                    title: '分类列表'
                },
            },
            {
                path: '/category/add',
                component: () => import('_v/category/add'),
                meta: {
                    title: '添加分类'
                },
            }
        ]
    },
    {
        path: '/article',
        component: layout,
        isMenu: true,
        icon: 'el-icon-goods',
        ischildren:true,
        redirect: '/article/list',
        meta: {
            title: '物品管理'
        },
        children: [
            {
                path: '/article/list',
                component: () => import('_v/article/list'),
                meta: {
                    title: '物品列表'
                },
            },
            {
                path: '/article/add',
                component: () => import('_v/article/add'),
                meta: {
                    title: '添加物品'
                },
            }
        ]
    },
    {
        path: '/user',
        component: layout,
        isMenu: true,
        ischildren:true,
        icon: 'el-icon-user',
        redirect: '/user/list',
        meta: {
            title: '人员管理'
        },
        children: [
            {
                path: '/user/list',
                component: () => import('_v/user/list'),
                meta: {
                    title: '人员列表'
                },
            },
            {
                path: '/role/add',
                component: () => import('_v/user/add'),
                meta: {
                    title: '添加人员'
                },
            }
        ]
    }
]
export default routes