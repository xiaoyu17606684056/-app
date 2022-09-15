 <template>
  <div>
    <!-- 搜索结果页-头部导航 -->
    <div class="search-result-container">
      <!-- 点击实现后退效果 -->
      <van-nav-bar
        title="搜索结果"
        left-arrow
        @click-left="$router.go(-1)"
        fixed
      />
    </div>
    <!-- 搜索结果 -->
      <div>
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
          :immediate-check="false"
          offset="50"
        >
          <article-item
            v-for="obj in articleList"
            :key="obj.art_id"
            :artObj="obj"
            @click.native = "$router.push(`/detail?art_id=${obj.art_id}`)"

          ></article-item>
        </van-list>
      </div>

  </div>
</template>

<script>
import ArticleItem from '../../components/ArticleItem.vue'
import { searchResultsApi } from '@/api'
export default {
  name: 'SearchResults',
  data () {
    return {
      articleList: [],
      loading: false, // 加载状态
      finished: false, // 全部加载完成状态
      page: 1
    }
  },
  async created () {
    const res = await searchResultsApi({
      q: this.$route.params.keywords, // 拿到关键词, keywords来源于router/index.js你定义的动态路由参数名
      page: this.page
    })
    this.articleList = res.data.data.results
    console.log(res)
  },
  methods: {
    async onLoad () {
      if (this.articleList.length > 0) {
        this.page++
        const res = await searchResultsApi({
          q: this.$route.params.keywords, // 拿到关键词, keywords来源于router/index.js你定义的动态路由参数名
          page: this.page
        })
        console.log(res)
        if (res.data.data.results.length === 0) {
          this.finished = true
          return
        } else {
          console.log(res)
          this.articleList = [...this.articleList, ...res.data.data.results]
        }

        this.loading = false
      }
    }
  },
  components: {
    ArticleItem
  }
}
</script>

<style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
}
</style>
