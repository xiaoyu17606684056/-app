import ajax from 'axios'
import router from '@/router'

// 新建一个新的axios实例
const axios = ajax.create({
  baseURL: 'http://toutiao.itheima.net' // 基地址
})
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, async function (error) {
  // 对响应错误做点什么
  // console.dir(error)
  if (error.response.status === 401) { // 身份过期
    // token续签方式1:  去登录页重新登录, token无用, 清掉-确保路由守卫if进不去
    // store.commit('setToken', '')
    router.replace({ path: '/login' })
    // store.commit('setToken', '')
    // console.log(router.currentRoute.fullPath)
    // router.push({ path: `/login?path=${router.currentRoute.fullPath}` })
  }
  // location.reload()

  return Promise.reject(error)
})
// 导出自定义函数, 参数对象解构赋值
export default ({ url, method = 'GET', params, data, headers }) => {
  return axios({
    url: url,
    method: method,
    params: params,
    data: data,
    headers: headers
  })
}
