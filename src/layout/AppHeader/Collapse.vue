<template>
  <div>
    <el-icon class="icon" @click="handleChangeStatus" :size="22">
      <icon :icon="iconStatus ? 'Fold' : 'Expand'"></icon>
    </el-icon>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { useStore } from '@/store'

// 初始化store
const store = useStore()

// 初始化一个变量
const iconStatus = ref(true)

// 点击展开收起的方法
const handleChangeStatus = () => {
  iconStatus.value = !iconStatus.value
  store.commit('setCollapse', !iconStatus.value)
}
</script>
<style lang="scss" scoped>
.icon {
  display: flex;
  align-items: center;
  font-size: 22px;
  color: #303133;
  cursor: pointer;
  margin-right: 10px;
}
</style>
