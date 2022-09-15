 <template>
  <div>
    <!-- 一条文章单元格 -->
    <van-cell>
      <!-- 标题区域的插槽 -->
      <template #title>
        <div class="title-box">
          <!-- 标题 -->
          <span>{{ artObj.title }}</span>
          <img
            class="thumb"
            v-if="artObj.cover.type === 1"
            :src="artObj.cover.images"
          />
        </div>
        <div class="thumb-box" v-if="artObj.cover.type > 1">
          <img
            class="thumb"
            v-for="(imgUrl, index) in artObj.cover.images"
            :key="index"
            :src="imgUrl"
          />
        </div>
      </template>
      <!-- label 区域的插槽 -->
      <template #label>
        <div class="label-box">
          <div>
            <span>{{ artObj.aut_name }}</span>
            <span>{{ artObj.comm_count }}</span>
            <span>{{ artObj.pubdate }}</span>
          </div>
          <!-- 反馈按钮 -->
          <van-icon name="cross" @click.stop="show = true"  />
          <van-action-sheet v-model="show" :actions="actions" :cancel-text="bottomText" @select="onSelect" @cancel="cancelFn" @close="closeFn" get-container="body"/>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { firstActions, secondActions } from '@/api/request'
export default {
  props: {
    artObj: Object

  },
  data () {
    return {
      show: false,
      actions: firstActions,
      bottomText: '取消'
    }
  },
  methods: {
    onSelect (action, item) {
      // this.show = false
      if (action.name === '反馈垃圾内容') {
        this.actions = secondActions
        this.bottomText = '返回'
      } else if (action.name === '不感兴趣') {
        this.$emit('dislikeEv', this.artObj.art_id)
        this.show = false
      } else {
        this.$emit('report', this.artObj.art_id, this.actions.value)
        this.show = false
      }
    },
    // 二级内容返回一级内容
    cancelFn () {
      if (this.bottomText === '返回') {
        this.show = true
        this.actions = firstActions
        this.bottomText = '取消'
      }
    },
    // 点击面板时返回一级内容
    closeFn () {
      this.actions = firstActions
      this.bottomText = '取消'
    }
  }
}
</script>

   <style scoped lang="less">
/* 标题样式 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span {
  margin: 0 3px;
  &:first-child {
    margin-left: 0;
  }
}
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

/* 三图, 图片容器 */
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>
