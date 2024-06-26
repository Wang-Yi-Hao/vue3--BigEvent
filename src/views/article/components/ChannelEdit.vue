<script setup>
import { ref, defineEmits } from 'vue'
import { artAddChannelsService, artInfoChannelsService } from '@/api/article'

const emit = defineEmits(['success'])
const formRef = ref()
const dialogVisible = ref(false)
const formModel = ref({
  cate_name: '',
  cate_alias: ''
})
const rules = {
  cate_name: [
    { required: true, message: '请输入分类名', trigger: 'blur' },
    { pattern: /^\S{1,10}$/, message: '分类名必须是1-10位的非空字符', trigger: 'blur' }
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{1,15}$/, message: '分类别名必须是1-15位的字母或数字', trigger: 'blur' }
  ]
}

const onSubmit = async () => {
  await formRef.value.validate()
  formModel.value.id ? await artInfoChannelsService(formModel.value) : await artAddChannelsService(formModel.value)
  dialogVisible.value = false
  emit('success')
}

const open = (row) => {
  dialogVisible.value = true
  formModel.value = { ...row }
}
defineExpose({ open })
</script>

<template>
  <el-dialog v-model="dialogVisible" :title="formModel.id ? '编辑分类' : '添加分类'" width="500" :before-close="handleClose">
    <el-form :model="formModel" :rules="rules" label-width="90px" style="padding-right: 30px" ref="formRef">
      <el-form-item prop="cate_name" label="分类名称">
        <el-input placeholder="请输入分类名" v-model="formModel.cate_name"></el-input>
      </el-form-item>
      <el-form-item prop="cate_alias" label="分类别名">
        <el-input placeholder="请输入分类别名" v-model="formModel.cate_alias"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
