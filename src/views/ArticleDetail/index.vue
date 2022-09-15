 <template>
  <div>
    <!-- Header 区域 -->
    <van-nav-bar
      fixed
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 文章信息区域 -->
    <div class="article-container">
      <!-- 文章标题 -->
      <h1 class="art-title">{{artObj.title}}</h1>

      <!-- 用户信息 -->
      <van-cell center :title="artObj.aut_name" :label="artObj.pubdata">
        <template #icon>
          <img :src="artObj.aut_photo" alt="" class="avatar" />
        </template>
        <template #default>
          <div>
            <van-button type="info" size="mini" v-if="artObj.is_followed"  @click="followFn(true)">已关注</van-button>
            <van-button icon="plus" type="info" size="mini" plain v-else @click="followFn(false)"
              >关注</van-button>
          </div>
        </template>
      </van-cell>

      <!-- 分割线 -->
      <van-divider></van-divider>

      <!-- 文章内容 -->
      <div class="art-content" v-html="artObj.content"></div>

      <!-- 分割线 -->
      <van-divider>End</van-divider>

      <!-- 点赞 -->
      <div class="like-box">
        <van-button icon="good-job" type="danger" size="small" v-if="artObj.attitude === 1" @click="loveFn(true)"
          >已点赞</van-button
        >
        <van-button icon="good-job-o" type="danger" plain size="small" v-else @click="loveFn(false)"
          >点赞</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { getArticleApi, followedUserAPI, unFollowedUserAPI, articleLikeAPI, articleDisLikeAPI } from '@/api'

export default {
  name: 'ArticleDetail',
  data () {
    return {
      artObj: {} // 文章的对象
    }
  },
  async created () {
    const res = await getArticleApi({
      artId: this.$route.query.art_id
    })
    this.artObj = res.data.data
    console.log(res)
  },
  methods: {
    // 关注作者/取消关注
    async followFn (bool) {
      if (bool === true) {
        this.artObj.is_followed = false

        const res1 = await unFollowedUserAPI({
          uid: this.artObj.art_id
        })
        console.log(res1)
      } else {
        this.artObj.is_followed = true
        const res = await followedUserAPI({
          target: this.artObj.art_id
        })
        console.log(res)
      }
    },
    // 文章点赞/取消点赞
    async loveFn (bool) {
      if (bool === true) { // 用户点在了已点赞按钮上
        // 业务 => 点赞文章
        // 显示 => 点赞按钮
        this.artObj.attitude = -1
        const res2 = await articleDisLikeAPI({
          artId: this.artObj.art_id
        })

        console.log(res2)
      } else { // 用户点在了点赞按钮上
        // 业务 => 取消点赞文章
        // 显示 => 已点赞按钮
        this.artObj.attitude = 1
        const res3 = await articleLikeAPI({
          target: this.artObj.art_id
        })

        console.log(res3)
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  padding: 10px;
  margin-top: 46px;
}
.art-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}

.art-content {
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  overflow-x: scroll;
  word-break: break-all;
  /deep/ img {
    width: 100%;
  }
  /deep/ pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}

.van-cell {
  padding: 5px 0;
  &::after {
    display: none;
  }
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
  margin-right: 5px;
  border: none;
}

.like-box {
  display: flex;
  justify-content: center;
}
</style>
