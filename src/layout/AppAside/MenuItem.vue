<template>
  <template v-for="(item, index) in menuList" :key="index">
    <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.path">
      <template #title>
       <menu-icon :icon="item.meta.icon"></menu-icon>
        <span>{{ item.meta.title }}</span>
      </template>
      <menu-item :menuList="item.children"></menu-item>
    </el-sub-menu>

    <el-menu-item v-else :index="item.path">
      <menu-icon :icon="item.meta.icon"></menu-icon>
      <span>{{ item.meta.title }}</span>
    </el-menu-item>
  </template>
</template>
<script setup lang="ts">
import MenuIcon from './MenuIcon.vue'
defineProps(['menuList'])
</script>
<style scoped lang="scss">

</style>
