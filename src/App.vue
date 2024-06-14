<script setup>
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()

const goHome = () => {
  router.push('Home')
  console.log(route, router)
}
const goList = () => {
  router.push('List')
}

import { useUserStore } from './stores'
const userStore = useUserStore()
</script>

<template>
  <router-view></router-view>
  <hr />
  <header>app</header>
  <button @click="goHome">首页</button>
  <button @click="goList">list</button>
  <el-button type="primary">Primary</el-button>
  <el-button type="success">Success</el-button>
  <el-button type="info">Info</el-button>

  <p>{{ userStore.token }}</p>

  <el-button type="primary" @click="userStore.setToken('1561564654')">登录</el-button>
  <el-button type="success" @click="userStore.setToken()">退出</el-button>
</template>

<style scoped></style>
