<script setup>
import { Delete, Edit } from '@element-plus/icons-vue'
import { ref } from 'vue'

const articleList = ref([
  {
    id: 5961,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:53:52.604',
    state: '已发布',
    cate_name: '体育'
  },
  {
    id: 5962,
    title: '新的文章啊',
    pub_date: '2022-07-10 14:54:30.904',
    state: null,
    cate_name: '体育'
  }
])

const onEditArticle = (row) => {
  console.log(row)
}
const onDeleteArticle = (row) => {
  console.log(row)
}
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary"> 添加文章 </el-button>
    </template>
    <el-form inline>
      <el-form-item label="文章分类：">
        <el-select>
          <el-option label="item.label" value="item.value"></el-option>
          <el-option label="item.label1" value="item.value1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发布状态：">
        <el-select>
          <el-option label="item.label" value="item.value"></el-option>
          <el-option label="item.label1" value="item.value1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="articleList" style="width: 100">
      <el-table-column label="文章标题">
        <template #default="{ row }">
          <el-link :underline="false" type="primary">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date"></el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作" #default="{ row }">
        <el-button type="primary" :icon="Edit" circle plain @click="onEditArticle(row)"></el-button>
        <el-button :icon="Delete" circle plain @click="onDeleteArticle(row)"></el-button>
      </el-table-column>
    </el-table>
  </page-container>
</template>
