import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import { CellGroup, Tag, NavBar, Form, Field, Button, Tabbar, TabbarItem, Icon, Tab, Tabs, Cell, List, PullRefresh, ActionSheet, Notify, Popup, Col, Row, Badge, Search, Divider, Image, Dialog, DatetimePicker } from 'vant'
// 全局注册
Vue.use(DatetimePicker)
Vue.use(Dialog)
Vue.use(Image)
Vue.use(CellGroup)
Vue.use(Tag)
Vue.use(Divider)
Vue.use(Search)
Vue.use(Badge)
Vue.use(Col)
Vue.use(Row)
Vue.use(Popup)
Vue.use(Notify)
Vue.use(ActionSheet)
Vue.use(PullRefresh)
Vue.use(List)
Vue.use(Cell)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Icon)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Form)
Vue.use(Field)
Vue.use(NavBar)
Vue.use(Button)

Vue.config.productionTip = false
Vue.directive('fofo', {
  inserted (el) {
    // 指令在van-search组件身上, 获取的是组件根标签div, 而input在标签内
    el = el.querySelector('input')
    el.focus()
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
