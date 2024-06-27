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
