<script setup>
import { ref } from 'vue'
import { artGetChannelsService } from '@/api/article.js'

defineProps({
  moidelValue: {
    type: [String, Number]
  },
  width: String
})

const emit = defineEmits(['update:moidelValue'])

const channelList = ref([])
const getChannelList = async () => {
  const res = await artGetChannelsService()
  channelList.value = res.data.data
}
getChannelList()
</script>
<template>
  <el-select :style="width || 'width: 240px'" :modelValue="modelValue" @update:modelValue="emit('update:moidelValue', $event)">
    <el-option v-for="channel in channelList" :label="channel.cate_name" :value="channel.id" :key="channel.id"></el-option>
  </el-select>
</template>
