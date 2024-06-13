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
</script>

<template>
  <header>app</header>
  <button @click="goHome">首页</button>
  <button @click="goList">list</button>
  <el-button type="primary">Primary</el-button>
  <el-button type="success">Success</el-button>
  <el-button type="info">Info</el-button>
</template>

<style scoped></style>
