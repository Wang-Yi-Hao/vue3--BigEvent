<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref } from 'vue'
import { Plus, Upload } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import { userSetavatarService } from '@/api/user.js'

const uploadRef = ref()
const userStore = useUserStore()

const imgUrl = ref(userStore.user.user_pic)

const onUploadFile = (file) => {
  const reader = new FileReader()
  reader.readAsDataURL(file.raw)
  reader.onload = () => {
    imgUrl.value = reader.result
  }
}
const onUpdateAvatar = async () => {
  await userSetavatarService(imgUrl.value)
  await userStore.getUser()
}
</script>

<template>
  <PageContainer
    ><el-row>
      <el-col :span="12">
        <el-upload ref="uploadRef" class="avatar-uploader" :auto-upload="false" :show-file-list="false" :on-change="onUploadFile">
          <img v-if="imgUrl" :src="imgUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
        <br />
        <el-button type="primary" :icon="Plus" size="large" @click="uploadRef.$el.querySelector('input').click()"> 选择图片 </el-button>
        <el-button type="success" :icon="Upload" size="large" @click="onUpdateAvatar"> 上传头像 </el-button>
      </el-col>
    </el-row>
  </PageContainer>
</template>

<style lang="scss" scoped>
.avatar-uploader {
  :deep() {
    .avatar {
      width: 278px;
      height: 278px;
      display: block;
    }
    .el-upload {
      border: 1px dashed var(--el-border-color);
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
    }
    .el-upload:hover {
      border-color: var(--el-color-primary);
    }
    .el-icon.avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 278px;
      height: 278px;
      text-align: center;
    }
  }
}
</style>
