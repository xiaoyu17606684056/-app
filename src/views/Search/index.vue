<template>
  <div>
    <!-- 搜索页面头部 -->
    <div class="search-header">
      <!-- 后退按钮 -->
      <van-icon
        name="arrow-left"
        color="white"
        size="0.48rem"
        class="goback"
        @click="$router.back()"
      />
      <!-- 搜索组件 -->
      <van-search
        v-model="kw"
        @input="inputFn"
        @search="enterFn"
        v-fofo
        placeholder="请输入搜索关键词"
        background="#007BFF"
        shape="round"
      />
    </div>
      <!-- 搜索出来的集合 -->
    <div class="sugg-history" v-if="kw.length !== 0">
      <div class="sugg-list">
        <div
          class="sugg-item"
          v-for="(str, index) in suggestionList"
          :key="index"
          v-html="lightFn(str, kw)"
          @click="clickListFn(str)"
        ></div>
      </div>
    </div>
    <!-- 搜索历史 -->
    <div class="search-history" v-else>
      <!-- 标题 -->
      <van-cell title="搜索历史">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="delete" class="search-icon" @click="clearFn" />
        </template>
      </van-cell>

      <!-- 历史列表 -->
      <div class="history-list">
        <span
          class="history-item"
          v-for="(str, index) in history"
          :key="index"
          @click="clickFn(str)"
          >{{ str }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { searchSuggestionApi } from '@/api'
export default {
  data () {
    return {
      kw: '', // 搜索关键字
      // timer: null, // 防抖定时器
      suggestionList: [],
      history: JSON.parse(localStorage.getItem('his')) || [] // 联想建议对象集合
    }
  },
  methods: {
    inputFn () {
      // 清除定时器
      clearTimeout(this.timer)
      //   防抖
      if (this.kw.length === 0) {
        this.suggestionList = []
      } else {
        this.timer = setTimeout(async () => {
          const res = await searchSuggestionApi({
            keywords: this.kw
          })
          this.suggestionList = res.data.data.options
          console.log(res)
        }, 500)
      }
    },
    // 忽略搜索列表的大小写以及标红关键字
    lightFn (originStr, target) {
      // 忽略大小写
      const reg = new RegExp(target, 'ig')
      return originStr.replace(reg, (match) => {
        return `<span style="color:red;"> ${match} </span>`
      })
    },
    // 点击回车进入搜索结果页面
    enterFn () {
      if (this.kw.length !== 0) {
        this.history.push(this.kw)
        this.history = Array.from(new Set(this.history))
        setTimeout(() => {
          this.$router.push({
            path: `/search/${this.kw}`
          })
        })
      }
    },
    // 点击搜索历史进入搜索结果页面
    clickFn (str) {
      this.$router.push({
        path: `/search/${str}`
      })
    },
    // 点击搜索出来的集合进入搜索结果页面
    clickListFn (str) {
      this.history.push(str)
      this.history = Array.from(new Set(this.history))
      setTimeout(() => {
        this.$router.push({
          path: `/search/${str}`
        })
      })
    },
    // 点击删除小图标触发导致删除搜索历史
    clearFn () {
      this.history = []
    }
  },
  watch: {
    history () {
      localStorage.setItem('his', JSON.stringify(this.history))
    }
  }
}
</script>

<style scoped lang="less">
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;
  /*后退按钮*/
  .goback {
    padding-left: 14px;
  }
  /*搜索组件*/
  .van-search {
    flex: 1;
  }
}
.sugg-list {
  .sugg-item {
    padding: 0 15px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    line-height: 50px;
    // 实现省略号的三行代码
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
/**搜索历史 */
.search-icon {
  font-size: 16px;
  line-height: inherit;
}

.history-list {
  padding: 0 10px;
  .history-item {
    display: inline-block;
    font-size: 12px;
    padding: 8px 14px;
    background-color: #efefef;
    margin: 10px 8px 0px 8px;
    border-radius: 10px;
  }
}
</style>
