<template>
  <el-breadcrumb separator="/">
    <template v-for="(item, index) in breadcrumbList" :key="index">
      <el-breadcrumb-item v-if="index <= 1" :to="{ path: item.path }">{{ item.meta.title }}</el-breadcrumb-item>
      <el-breadcrumb-item v-else
        ><a href="/">{{ item.meta.title }}</a></el-breadcrumb-item
      >
    </template>
  </el-breadcrumb>
</template>
<script lang="ts" setup>
import { ref, Ref, watch } from 'vue'
import { useRoute, RouteLocationMatched } from 'vue-router'
const route = useRoute()
// 存储路由的数据
let breadcrumbList: Ref<RouteLocationMatched[]> = ref([])
// 面包屑的方法
const getBreadcrumb = () => {
  // 把路由的数据赋给一个变量
  let matched = route.matched.filter((item) => item.meta && item.meta.title)
  // 把路由的第一条数据赋给一个变量
  const firstData = matched[0]
  // 如果路由的第一条数据的路径不是dashboard 就拼接一个dashboard
  if (firstData.path !== '/dashboard') {
    matched = [{ path: '/dashboard', meta: { title: '首页' } } as any].concat(matched)
  }
  breadcrumbList.value = matched
}
getBreadcrumb()
// 监听路由的变化
watch(
  () => route.path,
  () => getBreadcrumb()
)
</script>
