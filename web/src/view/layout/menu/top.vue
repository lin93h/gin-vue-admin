<script setup>
import { ref, onBeforeMount, watch } from 'vue';
import { useRoute } from 'vue-router'
import { useRouterStore } from '@/pinia/modules/router'

const route = useRoute()
const activeIndex = ref('')
const menuList = ref([])

const routerStore = useRouterStore()
const asyncRouters = routerStore.asyncRouters[0].children
menuList.value = asyncRouters.filter(item => item.children && item.children.length)

const handleInit = () => {
  // 判断当前路由是否包含父级路径
  const pathArr = route.path.split('/').filter(item => item)
  for (let i = 0; i < menuList.value.length; i++) {
    if (pathArr[0] === menuList.value[i].path) {
      activeIndex.value = menuList.value[i].path
      break
    }
  }
}

onBeforeMount(() => {
  handleInit()
})

watch(route, (to, now) => {
  handleInit()
})
</script>

<template>
  <div class="menu-top-wrapper">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item v-for="item in menuList" :index="item.path">{{ item.meta.title }}</el-menu-item>
    </el-menu>
  </div>

</template>

<style lang='scss'>
</style>