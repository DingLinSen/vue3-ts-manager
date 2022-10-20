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
console.log(route)

let breadcrumbList: Ref<RouteLocationMatched[]> = ref([])

const getBreadcrumb = () => {
  let matched = route.matched.filter((item) => item.meta && item.meta.title)
  const firstData = matched[0]
  if (firstData.path !== '/dashboard') {
    matched = [{ path: '/dashboard', meta: { title: '首页' } } as any].concat(matched)
  }
  breadcrumbList.value = matched
}
getBreadcrumb()
watch(
  () => route.path,
  () => getBreadcrumb()
)
</script>
