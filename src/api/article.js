import request from '@/utils/request'

// 获取文章分类
export const artGetChannelsService = () => request.get('/my/cate/list')

// 增加文章分类
export const artAddChannelsService = (data) => request.post('/my/cate/add', data)

// 更新文章分类
export const artInfoChannelsService = (data) => request.put('/my/cate/info', data)

// 删除文章分类
export const artDelChannelsService = (id) => request.delete('/my/cate/del', { params: { id } })

// 获取文章列表
export const artGetArticleService = (params) => request.get('/my/article/list', { params })

// 发布文章
export const artAddArticleService = (data) => request.post('/my/article/add', data)

// 更新文章
export const artInfoArticleService = (data) => request.put('/my/article/info', data)

// 获取文章详情
export const artGetDetailService = (id) => request.get('/my/article/info', { params: { id } })

// 删除文章
export const artDelDetailService = (id) => request.delete('/my/article/info', { params: { id } })
