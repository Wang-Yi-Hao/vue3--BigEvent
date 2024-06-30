<script setup>
import { ref } from 'vue'
import { artGetDetailService } from '@/api/article'
import { baseURL } from '@/utils/request.js'
import { formatTime } from '@/utils/format'

const visibleDrawer = ref(false)
const visible = ref({})
const imgUrl = ref('')
const open = async (row) => {
  visibleDrawer.value = true
  const res = await artGetDetailService(row.id)
  visible.value = res.data.data
  imgUrl.value = baseURL + visible.value.cover_img
  console.log(visible.value)
}

defineExpose({
  open
})
</script>

<template>
  <!-- 抽屉 -->
  <el-drawer v-model="visibleDrawer" title="文章详情" direction="rtl" size="50%">
    <h3>{{ visible.title }}</h3>
    <p>作者：{{ visible.nickname }}</p>
    <p>发布时间：{{ formatTime(visible.pub_date) }}</p>
    <p>文章分类：{{ visible.cate_name }}</p>
    <hr />
    <img :src="imgUrl" />
    <span v-html="visible.content"></span>
  </el-drawer>
</template>
