<template>
  <div>
    <template>
      <div>
        <!-- 头部标签 -->
        <van-nav-bar fixed>
          <template #left>
            <!-- <img class="logo" src="../../assets/toutiao_logo.png" alt="" /> -->
            <img class="logo" src="../../assets/toutiao.jpeg" />
          </template>
          <template #right>
            <van-icon name="search" size="0.48rem" color="#fff" @click="search" />
          </template>
        </van-nav-bar>
        <van-tabs v-model="channelId" animated sticky offset-top="1.226667rem">
          <van-tab
            v-for="obj in channelListt"
            :key="obj.id"
            :title="obj.name"
            :name="obj.id"
            >
            <article-list :channelId="channelId"></article-list>
          </van-tab>
        </van-tabs>
         <van-icon name="plus" @click="showPopup" size="0.37333334rem" class="moreChannels" />
      </div>
      <!-- 频道弹出层 -->
      <div>
        <van-popup v-model="show" get-container="body">
          <ChannelEdit

          :userList= "channelListt"
          :allList= "uncheckChannelList"
          @addChannelEV= "addChannel"
          @deleteChannelEV= "deleteChannel"
          @closeChennelEV= "closeChennel"
          v-model="channelId">
          </ChannelEdit></van-popup>
      </div>
    </template>
  </div>
</template>

<script>
import { getUserChannelApi, getallChannelList, deleteChannelApi } from '@/api'
import ArticleList from './compoment/ArticleList.vue'
import ChannelEdit from './ChannelEdit.vue'
export default {
  data () {
    return {
      channelId: 0,
      channelListt: [], // 用户选择频道列表
      // articleList: [],
      allChannelList: [], // 全部频道列表
      show: false
    }
  },
  async created () {
    const res = await getUserChannelApi()
    this.channelListt = res.data.data.channels
    console.log(res)

    const res1 = await getallChannelList()
    this.allChannelList = res1.data.data.channels
    console.log(res1)

    // this.changeChannelId()
  },
  methods: {
    // 点击显示频道管理
    async showPopup () {
      this.show = true
    },
    // 点击添加频道
    async addChannel (channelObj) {
      this.channelListt.push(channelObj)
    },
    // 删除频道
    async deleteChannel (channelObj) {
      const index = this.channelListt.findIndex(obj => obj.id === channelObj.id)
      this.channelListt.splice(index, 1)
      const res = await deleteChannelApi({
        channelId: channelObj.id
      })
      console.log(res)
    },
    // 点击关闭频道管理页面
    async closeChennel () {
      this.show = false
    },
    // 点击放大镜进入搜索界面
    async search () {
      this.$router.push('/search')
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  computed: {
    // 计算用户未选择的频道的数组
    uncheckChannelList () {
      const newArry = this.allChannelList.filter(bigobj => {
        const index = this.channelListt.findIndex(smallobj => { return smallobj.id === bigobj.id })
        if (index > -1) {
          return false
        } else {
          return true
        }
      })
      return newArry
    }
  }
}
</script>

<style scoped lang="less">
.van-nav-bar {
  background-color: rgba(0, 153, 255, 0.963);
}
.logo {
  width: 100px;
  height: 30px;
}
/deep/ .van-tabs__content {
  padding-top: 44px;
}
/deep/ .van-tabs__wrap {
  padding-right: 30px;
  background-color: #fff;
}

// 设置小图标的样式
.moreChannels {
  position: fixed;
  top: 59px;
  right: 8px;
  z-index: 999;
}
.van-popup{
  width: 100vw;
  height:100vh;

}
</style>
