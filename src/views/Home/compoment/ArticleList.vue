<template>
  <div>
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <!-- 文章列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"

    >
      <article-item
        v-for="obj in list"
        :key="obj.art_id"
        :artObj="obj"
        @dislikeEv="dislikeFn"
        @report="reportFn"
        @click.native = "$router.push(`/detail?art_id=${obj.art_id}`)"
      ></article-item>
    </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from '../../../components/ArticleItem.vue'
import { getArticleListApi, dislikeArticleApi, reportArticleApi } from '@/api'
import { Notify } from 'vant'
export default {
  props: {
    channelId: Number
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      theTime: new Date().getTime(),
      isLoading: false
    }
  },
  components: {
    ArticleItem
  },
  // async created () {
  //   // 获取文章列表
  //   const res = await getArticleListApi({
  //     channel_id: this.channelId,
  //     timestamp: this.theTime
  //   })
  //   console.log(res)
  //   this.list = res.data.data.results
  //   this.theTime = res.data.data.pre_timestamp
  // },
  methods: {
    // 上滑显示更多内容
    async onLoad () {
      const res = await getArticleListApi({
        channel_id: this.channelId,
        timestamp: this.theTime
      })
      if (res.data.data.pre_timestamp === null) {
        this.finished = true
      } else {
        console.log(res)
        this.list = [...this.list, ...res.data.data.results]
        this.theTime = res.data.data.pre_timestamp
      }
      this.loading = false
    },
    // 下拉刷新事件
    async onRefresh () {
      this.list = []
      this.theTime = new Date().getTime()
      const res = await getArticleListApi({
        channel_id: this.channelId,
        timestamp: this.theTime
      })
      console.log(res)
      this.list = res.data.data.results
      this.theTime = res.data.data.pre_timestamp
      this.isLoading = false
    },
    // 反馈不感兴趣内容
    async dislikeFn (id) {
      const res1 = await dislikeArticleApi({
        artId: id
      })
      console.log(res1)
      Notify({ type: 'success', message: '反馈成功' })
    },
    // 反馈不良内容
    async reportFn (id, value) {
      const res2 = await reportArticleApi({
        artId: id,
        type: value
      })
      console.log(res2)
      Notify({ type: 'success', message: '反馈成功' })
    }

  }
}
</script>

<style lang="less" scoped>
</style>
