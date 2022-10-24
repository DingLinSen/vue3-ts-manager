// store.ts
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface State {
  count: number
  collapse: boolean
  tagsView: any
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  state: {
    count: 0,
    collapse: false,
    tagsView: JSON.parse(localStorage.getItem('tagsView') as any) || [
      {
        title: '首页',
        path: '/dashboard',
      },
    ],
    // [
    //   {
    //     title: '首页',
    //     path: '/dashboard',
    //   },
    // ],
  },
  mutations: {
    setCount(state: State, count: number): void {
      state.count = count
    },
    setCollapse(state: State, status: boolean): void {
      state.collapse = status
    },
    setTagsView(state: State, tags: any[]): void {
      const index = state.tagsView.findIndex((item: any) => item.path === tags.path)
      if (index !== -1) return
      state.tagsView.push(tags)
      localStorage.setItem('tagsView', JSON.stringify(state.tagsView))
    },
    removeTagsView(state: State, index: number): void {
      state.tagsView.splice(index, 1)
    },
    removeTagsViewOther(state: State, index: number): void {
      state.tagsView.splice(index + 1) //删除后面
      state.tagsView.splice(1, index - 1) //删除前面,除了首页
    },
    removeTagsViewAll(state: State) {
      state.tagsView.splice(1)
    },
  },
  getters: {
    getCount(state: State): number {
      return state.count
    },
    getCollapse(state: State): boolean {
      return state.collapse
    },
    getTagsView(state: State): any {
      return state.tagsView
    },
  },
})

// 定义自己的 `useStore` 组合式函数
export function useStore() {
  return baseUseStore(key)
}
