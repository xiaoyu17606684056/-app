import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/views/Layout'
import Home from '@/views/Home'
import User from '@/views/User'
import Search from '@/views/Search'
import searchResult from '@/views/Search/searchResults.vue'
import ArticleDetail from '@/views/ArticleDetail'
import UserEdit from '@/views/User/UserEdit.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/layout',
    component: Layout,
    redirect: '/layout/home',
    children: [
      {
        path: 'home',
        component: Home
      },
      {
        path: 'user',
        component: User
      }
    ]
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/search/:keywords',
    component: searchResult
  },
  {
    path: '/detail',
    component: ArticleDetail
  },
  {
    path: '/user_edit',
    component: UserEdit
  }
]

const router = new VueRouter({
  routes
})

export default router
