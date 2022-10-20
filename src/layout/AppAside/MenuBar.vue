<template>
  <el-menu
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    active-text-color="#ffd04b"
    background-color="#304156"
    unique-opened
    :default-active="$route.path"
    router
    text-color="#fff"
  >
    <menu-item :menuList="menuList"></menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { useStore } from '@/store'
import { reactive, computed } from 'vue'
import MenuItem from './MenuItem.vue'

const store = useStore()

const isCollapse = computed(() => {
  return store.getters.getCollapse
})

const menuList = reactive([
  {
    path: '/dashboard',
    component: 'Layout',
    meta: { title: '首页', icon: 'HomeFilled', roles: ['sys:manage'] },
    children: [],
  },
  {
    path: '/system',
    component: 'Layout',
    alwaysShow: true,
    name: 'system',
    meta: { title: '系统管理', icon: 'Menu', roles: ['sys:manage'], parentId: 0 },
    children: [
      {
        path: '/system/department',
        component: '/system/department/department',
        alwaysShow: false,
        name: 'department',
        meta: { title: '机构管理', icon: 'Operation', roles: ['sys:dept'], parentId: 17 },
      },
      {
        path: '/system/userList',
        component: '/system/User/UserList',
        alwaysShow: false,
        name: 'userList',
        meta: { title: '用户管理', icon: 'Grid', roles: ['sys:user'], parentId: 17 },
      },
      {
        path: '/system/roleList',
        component: '/system/Role/RoleList',
        alwaysShow: false,
        name: 'roleList',
        meta: { title: '角色管理', icon: 'UserFilled', roles: ['sys:role'], parentId: 17 },
      },
      {
        path: '/system/menuList',
        component: '/system/Menu/MenuList',
        alwaysShow: false,
        name: 'menuList',
        meta: { title: '权限管理', icon: 'FolderOpened', roles: ['sys:menu'], parentId: 17 },
      },
    ],
  },
  {
    path: '/goods',
    component: 'Layout',
    alwaysShow: true,
    name: 'goods',
    meta: { title: '商品管理', icon: 'Box', roles: ['sys:goods'], parentId: 0 },
    children: [
      {
        path: '/goodCategory',
        component: '/goods/goodsCategory/goodsCategoryList',
        alwaysShow: false,
        name: 'goodCategory',
        meta: { title: '商品分类', icon: 'Handbag', roles: ['sys:goodsCategory'], parentId: 34 },
      },
    ],
  },
  {
    path: '/systenConfig',
    component: 'Layout',
    alwaysShow: true,
    name: 'systenConfig',
    meta: { title: '系统工具', icon: 'Setting', roles: ['sys:systenConfig'], parentId: 0 },
    children: [
      {
        path: '/document',
        component: '/system/config/systemDocument',
        alwaysShow: false,
        name: 'http://42.193.158.170:8089/swagger-ui/index.html',
        meta: { title: '接口文档', icon: 'Reading', roles: ['sys:document'], parentId: 42 },
      },
    ],
  },
])
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 230px;
  min-height: 400px;
}
.el-menu {
  border-right: none;
}
:deep(.el-sub-menu .el-sub-menu__title) {
  color: #f4f4f5 !important;
}

:deep(.el-menu-item.is-active) {
  color: #409eff !important;
}

:deep(.is-opened .el-menu-item) {
  background-color: #1f2d3d !important;
}

:deep(.el-menu-item:hover) {
  background-color: #001528 !important;
}
</style>
