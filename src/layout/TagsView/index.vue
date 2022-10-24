<template>
  <div class="tags">
    <div
      class="tags-item"
      @contextmenu.stop="handleContextmenu($event, index)"
      :class="[$route.path === item.path ? 'active' : '']"
      @click.stop="handleTagsItem(item, index)"
      v-for="(item, index) in tagsList"
      :key="index"
    >
      <span>{{ item.title }}</span>
      <el-icon :size="8" @click.stop="handleRemoveTags(index)">
        <Close></Close>
      </el-icon>
    </div>

    <ul v-show="contextMenuStatus" class="menu" :style="{ left: x + 'px', top: y + 'px' }">
      <li @click.stop="handleRefresh">刷新</li>
      <li @click.stop="handleClose">关闭</li>
      <li @click.stop="handleCloseOthers">关闭其他</li>
      <li @click.stop="handleCloseAll">关闭所有</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
// 引入关闭图标
import { Close } from '@element-plus/icons-vue'

// 引入vue中的计算属性
import { computed, ref, watch } from 'vue'

// 引入router实例
import { useRouter, useRoute } from 'vue-router'

// 引入store
import { useStore } from '@/store'

// 初始化store
const store = useStore()

// 初始化router
const router = useRouter()
const route = useRoute()

// 监听路由的变化
watch(
  () => route.path,
  () => {
    const tagsItem = {
      title: route.meta.title,
      path: route.path,
    }
    store.commit('setTagsView', tagsItem)
  },
  {
    deep: true,
    immediate: true,
  }
)

// 定义右键点击的坐标
let x = ref(0)
let y = ref(0)

// 定义右键tagsView的下标
let tagsIndex = ref(0)

let activeIndex = ref(0)

// 获取本地的下标
const i = localStorage.getItem('activeIndex')
activeIndex.value = Number(i)

// 获取vuex中tagsView的数据
const tagsList = computed(() => {
  return store.getters.getTagsView
})

// 点击tagsView进行跳转
const handleTagsItem = (item: any, index: number) => {
  activeIndex.value = index
  localStorage.setItem('activeIndex', index.toString())
  router.push({ path: item.path })
  contextMenuStatus.value = false
}

// 点击tagsView的关闭按钮触发的事件
const handleRemoveTags = (index: number) => {
  // 如果点击的是第一条tagsView 不执行
  if (index === 0) return
  store.commit('removeTagsView', index)
  // 如果点击的是最后一条 跳转到上一条
  if (index === tagsList.value.length) {
    const path = tagsList.value[index - 1].path
    if (path) {
      router.push({ path: path })
    }
  } else {
    // 如果点击的不是最后一条,跳转最后一条
    const path = tagsList.value[tagsList.value.length - 1].path
    if (path) {
      router.push({ path: path })
    }
  }
}

// 点击右键的方法
const handleContextmenu = (e: any, index: number) => {
  e.preventDefault()
  tagsIndex.value = index
  const { clientX, clientY } = e
  x.value = clientX - 230
  y.value = clientY - 50
  contextMenuStatus.value = true
}

// 点击浏览器隐藏tagsView弹框
document.addEventListener('click', () => {
  contextMenuStatus.value = false
})

// 点击刷新的方法
const handleRefresh = () => {
  router.go(0)
}

// 点击关闭的方法
const handleClose = () => {
  handleRemoveTags(tagsIndex.value)
  contextMenuStatus.value = false
}

// 点击关闭其他的方法
const handleCloseOthers = () => {
  store.commit('removeTagsViewOther', activeIndex.value)
  contextMenuStatus.value = false
}

// 点击关闭所有的方法
const handleCloseAll = () => {
  store.commit('removeTagsViewAll')
  contextMenuStatus.value = false
  handleTagsItem({ path: '/dashboard' }, 0)
}

// 右键的显示与隐藏
const contextMenuStatus = ref(false)
</script>

<style scoped lang="scss">
.tags {
  position: relative;
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 0 3px 0 rgb(0 0 0 / 4%);
  display: flex;
  .tags-item:first-of-type {
    margin-left: 15px;
  }
  .tags-item.active {
    background-color: #42b983;
    color: #fff;
    border-color: #42b983;

    &:before {
      content: '';
      width: 8px;
      height: 8px;
      background-color: #fff;
      border-radius: 50%;
      margin-right: 5px;
    }
  }
  .tags-item {
    font-size: 12px;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    padding: 0 6px 0 10px;
    margin-top: 4px;
    margin-left: 5px;
    color: #495060;
    background: #fff;
    display: flex;
    align-items: center;

    .el-icon {
      margin-left: 5px;
      padding: 3px;
      border-radius: 50%;
    }
    .el-icon:hover {
      background-color: #ccc;
    }
  }
}

.menu {
  padding: 5px 0;
  position: absolute;
  list-style: none;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  background: #fff;
  box-shadow: 2px 2px 3px 0 rgb(0 0 0 / 30%);

  li {
    padding: 6px 20px;
    cursor: pointer;
    &:hover {
      background-color: #eee;
    }
  }
}
</style>
