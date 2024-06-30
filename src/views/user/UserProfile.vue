<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { userSetInfoService } from '@/api/user.js'

const formRef = ref(null)

const {
  user: { username, nickname, email, id },
  getUser
} = useUserStore()

const form = ref({
  username,
  nickname,
  email,
  id
})

const rules = {
  nickname: [
    { required: true, message: '昵称不能为空', trigger: 'blur' },
    { min: 2, max: 10, message: '昵称长度在 2 到 10 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '邮箱不能为空', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
  ]
}

const handleSubmit = async () => {
  const valid = await formRef.value.validate()
  if (valid) await userSetInfoService(form.value)
  getUser()
}
</script>

<template>
  <PageContainer title="基本资料">
    <el-form :model="form" :rules="rules" ref="formRef">
      <el-form-item label="登录名称">
        <el-input v-model="form.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="nickname">
        <el-input v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="用户邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交修改</el-button>
      </el-form-item>
    </el-form>
  </PageContainer>
</template>
