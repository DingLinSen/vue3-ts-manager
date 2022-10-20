import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: {
          title: '首页',
          icon: 'el-icon-s-home',
        },
      },
    ],
  },
  {
    path: '/system',
    name: 'system',
    component: Layout,
    redirect: '/system/department',
    meta:{
      title:'系统管理'
    },
    children: [
      {
        path: 'department',
        name: 'department',
        component: () => import('@/views/system/department/index.vue'),
        meta: {
          title: '机构管理',
          icon: 'el-icon-document',
        },
      },
      {
        path: 'userList',
        name: 'userList',
        component: () => import('@/views/system/user/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'el-icon-s-custom',
        },
      },
      {
        path: 'roleList',
        name: 'roleList',
        component: () => import('@/views/system/role/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'el-icon-s-tools',
        },
      },
      {
        path: 'menuList',
        name: 'menuList',
        component: () => import('@/views/system/Menu/index.vue'),
        meta: {
          title: '权限管理',
          icon: 'el-icon-document',
        },
      },
    ],
  },
  {
    path: '/goods',
    name: 'goods',
    component: Layout,
    children: [
      {
        path: '/goodCategory',
        name: 'goodCategory',
        component: () => import('@/views/goods/goodsCategory/index.vue'),
        meta: {
          title: '商品分类',
          icon: 'el-icon-document',
        },
      },
    ],
  },
  {
    path: '/systenConfig',
    name: 'systenConfig',
    component: Layout,
    children: [
      {
        path: '/document',
        name: 'document',
        component: () => import('@/views/system/config/systemDocument/index.vue'),
        meta: {
          title: '接口文档',
          icon: 'el-icon-document',
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
