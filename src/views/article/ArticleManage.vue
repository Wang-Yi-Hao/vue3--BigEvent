<script setup>
import { Delete, Edit } from '@element-plus/icons-vue'
import { ref } from 'vue'
import ChannelSelect from './components/ChannelSelect.vue'
import { artGetArticleService, artDelDetailService } from '@/api/article.js'
import { formatTime } from '@/utils/format'
import ArticleEdit from './components/ArticleEdit.vue'
import ArticleDetails from './components/ArticleDetails.vue'

const loding = ref(false)

const articleEditRef = ref()
const ArticleDetailsRef = ref()

const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})

const total = ref(0)
const articleList = ref([])
const getArticleList = async () => {
  loding.value = true
  const res = await artGetArticleService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loding.value = false
}
getArticleList()

const onAddArticle = () => {
  articleEditRef.value.open({})
}
const onEditArticle = (row) => {
  articleEditRef.value.open(row)
}

const onSizeChange = (size) => {
  params.value.pagesize = size
  params.value.pagenum = 1
  getArticleList()
}
const onCurrentChange = (page) => {
  params.value.pagenum = page
  getArticleList()
}

const onSearch = () => {
  params.value.pagenum = 1
  getArticleList()
}
const onReset = () => {
  params.value.pagenum = 1
  params.value.cate_id = ''
  params.value.state = ''
  getArticleList()
}

const onSuccess = (type) => {
  if (type === 'add') {
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    params.value.pagenum = lastPage
    console.log(lastPage)
  }
  getArticleList()
}

const onDeleteArticle = async (row) => {
  await ElMessageBox.confirm('你确定要删除该文章吗', '删除', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
  await artDelDetailService(row.id)
  getArticleList()
}

const onDetailsArticle = (row) => {
  ArticleDetailsRef.value.open(row)
}
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle"> 添加文章 </el-button>
    </template>
    <el-form inline>
      <el-form-item label="文章分类：">
        <channel-select v-model="params.cate_id"></channel-select>
      </el-form-item>
      <el-form-item label="发布状态：">
        <el-select style="width: 240px" v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="articleList" style="width: 100" v-loading="loding">
      <el-table-column label="文章标题">
        <template #default="{ row }">
          <el-link :underline="false" type="primary" @click="onDetailsArticle(row)">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
        <template #default="{ row }"> {{ formatTime(row.pub_date) }} </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作" #default="{ row }">
        <el-button type="primary" :icon="Edit" circle plain @click="onEditArticle(row)"></el-button>
        <el-button type="danger" :icon="Delete" circle plain @click="onDeleteArticle(row)"></el-button>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[1, 2, 3, 5, 10]"
      background
      layout="jumper, total, sizes, prev, pager, next"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 30px; justify-content: flex-end"
    />

    <ArticleEdit ref="articleEditRef" @success="onSuccess"></ArticleEdit>
    <ArticleDetails ref="ArticleDetailsRef"></ArticleDetails>
  </page-container>
</template>
