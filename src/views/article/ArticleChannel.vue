<script setup>
import { ref } from 'vue'
import { artGetChannelsService, artDelChannelsService } from '@/api/article'
import { Edit, Delete } from '@element-plus/icons-vue'
import ChannelEdit from './components/ChannelEdit.vue'

const dialog = ref()
const loading = ref(false)
const channelList = ref([])
const getChannelsService = async () => {
  loading.value = true
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  loading.value = false
}
getChannelsService()

const onEditChannel = async (row) => {
  console.log(row)
}
const onDelChannel = async (row) => {
  await ElMessageBox.alert('你确认删除该分类么', '删除提示', {
    confirmButtonText: '确认',
    cancelButtonText: '删除',
    type: 'warning'
  })
  await artDelChannelsService(row.id)
  getChannelsService()
}
const onAddChannel = () => {
  dialog.value.open()
}

const onSuccess = () => {
  getChannelsService()
}
</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannel"> 添加分类 </el-button>
    </template>
    <el-table :data="channelList" style="width: 100%" v-loading="loading">
      <el-table-column label="序号" width="90" type="index" />
      <el-table-column prop="cate_name" label="文章分类" />
      <el-table-column prop="cate_alias" label="分类别名" />
      <el-table-column label="操作" width="120">
        <template #default="{ row }">
          <el-button type="primary" :icon="Edit" circle plain @click="onEditChannel(row)" />
          <el-button type="danger" :icon="Delete" circle plain @click="onDelChannel(row)" />
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="description" />
      </template>
    </el-table>
  </page-container>
  <ChannelEdit ref="dialog" @success="onSuccess"></ChannelEdit>
</template>
