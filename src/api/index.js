import request from '@/utils/request.js'
import { getToken } from '@/utils/token.js'

export const loginApi = ({ mobile, code }) => request({
  url: '/v1_0/authorizations',
  method: 'POST',
  data: {
    mobile,
    code
  }
})

// 获取用户选择频道列表
export const getUserChannelApi = () => request({
  url: '/v1_0/user/channels',
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})

// 获取文章列表
export const getArticleListApi = ({ channel_id, timestamp }) => request({
  url: '/v1_0/articles',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  params: {
    channel_id,
    timestamp
  }
})

// 对文章不感兴趣
export const dislikeArticleApi = ({ artId }) => request({
  url: '/v1_0/article/dislikes',
  method: 'POST',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  data: {
    target: artId
  }
})
// 反馈内容
export const reportArticleApi = ({ artId, type }) => request({
  url: '/v1_0/article/reports',
  method: 'POST',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  data: {
    target: artId,
    type: type,
    remark: ''

  }
})
// 全部频道列表
export const getallChannelList = () => request({
  url: '/v1_0/channels',
  method: 'GET'
})
// 删除频道
export const deleteChannelApi = ({ channelId }) => request({
  url: `/v1_0/user/channels/:${channelId}`,
  method: 'DELETE'
})
// 搜索联想建议
export const searchSuggestionApi = ({ keywords }) => request({
  url: '/v1_0/suggestion',
  method: 'GET',
  params: {
    q: keywords
  }
})
// 获取搜索结果
export const searchResultsApi = ({ page = 1, per_page = 10, q }) => request({
  url: '/v1_0/search',
  method: 'GET',
  params: {
    page: page,
    per_page: 10,
    q: q
  }
})
// 获取文章详情
export const getArticleApi = ({ artId }) => request({
  url: `/v1_0/articles/${artId}`,
  method: 'GET'
})
// 关注作者
export const followedUserAPI = ({ target }) => request({
  url: '/v1_0/user/followings',
  method: 'POST',
  data: {
    target: target
  },
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})

// 文章 - 取消关注作者
export const unFollowedUserAPI = ({ uid }) => request({
  // 这uid只是个变量名, 把值拼接在url发给后台(无需指定参数名)
  url: `/v1_0/user/followings/${uid}`,
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})

// 文章 - 点赞
export const articleLikeAPI = ({ target }) => request({
  url: '/v1_0/article/likings',
  method: 'POST',
  data: {
    target: target
  },
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})

// 文章 - 取消点赞
export const articleDisLikeAPI = ({ artId }) => request({
  url: `/v1_0/article/likings/${artId}`,
  method: 'DELETE',
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})

// 用户个人信息
export const userMessageApi = () => request({
  url: '/v1_0/user',
  method: 'Get',
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})
// 用户- 个人资料(就为了获取生日)
export const userProfileAPI = () => {
  return request({
    url: '/v1_0/user/profile',
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  })
}
// 用户- 更新头像
// 注意: formObj的值必须是一个表单对象
// '{"a": 10, "b": 20}' // 对象格式的JSON字符串
// new FormData() // 表单对象
export const updatePhotoAPI = (formObj) => request({
  url: '/v1_0/user/photo',
  method: 'PATCH',
  data: formObj,
  // 如果你的请求体内容是表单对象, 浏览器会自动携带请求头Content-Type为multipart/form-data
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
})
// 编辑用户资料
export const updateUserProfileApi = ({ name, birthday }) => request({
  url: '/v1_0/user/profile',
  method: 'PATCH',
  headers: {
    Authorization: `Bearer ${getToken()}`
  },
  data: {
    name: name,
    birthday: birthday
  }
})
