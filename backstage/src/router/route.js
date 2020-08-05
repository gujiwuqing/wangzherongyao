import Home from '../views/Home.vue'
import layout from '@/layout'
const routes = [
    {
      path: '/',
      name: 'layout',
      component: layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Home',
            component:Home,
            meta: { title: 'Home'}
        }]
    },
    {
        path: '/login',
        name: 'login',
        component: ()=>import('_v/login'),
    },
    {
        path:'/category',
        component:layout,
        redirect: '/category/list',
        meta:{
            title:'分类管理'
        },
        children:[
            {
                path:'/category/list',
                component:()=>import('_v/category/list'),
                meta:{
                    title:'分类列表'
                },
            },
            {
                path:'/category/add',
                component:()=>import('_v/category/add'),
                meta:{
                    title:'添加分类'
                },
            }
        ]
    },
    {
        path:'/article',
        component:layout,
        redirect: '/article/list',
        meta:{
            title:'物品管理'
        },
        children:[
            {
                path:'/article/list',
                component:()=>import('_v/article/list'),
                meta:{
                    title:'物品列表'
                },
            },
            {
                path:'/article/add',
                component:()=>import('_v/article/add'),
                meta:{
                    title:'添加物品'
                },
            }
        ]
    }
  ]
  export default routes