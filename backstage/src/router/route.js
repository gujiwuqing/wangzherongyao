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
            name: 'Dashboard',
            component:Home,
            meta: { title: 'Dashboard'}
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
    }
  ]
  export default routes