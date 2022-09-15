 <template>
  <div class="user-edit-container">
    <!-- Header 区域 -->
    <van-nav-bar
      title="编辑资料"
      left-arrow
      @click-left="$router.back()"
      fixed
    />

    <!-- 用户资料 -->
    <van-cell-group class="action-card">
      <van-cell title="头像" is-link center>
        <template #default>
          <van-image
            round
            class="avatar"
            :src="profile.photo"
            @click="$refs.iptFile.click()"
          />
          <!-- file 选择框 -->
          <input
            type="file"
            ref="iptFile"
            v-show="false"
            accept="image/*"
            @change="onFileChange"
          />
        </template>
      </van-cell>
      <van-cell
        title="名称"
        :value="profile.name"
        is-link
        @click="showNameDialogFn"
      />
      <van-dialog
        v-model="isShowNameDialog"
        title="修改名称"
        show-cancel-button
        :before-close="onNameDialogBeforeClose"
      >
        <!-- 输入框 -->
        <van-field
          v-model.trim="userName"
          input-align="center"
          maxlength="7"
          placeholder="请输入名称"
        />
      </van-dialog>
      <van-cell
        title="生日"
        :value="profile.birthday"
        @click="showPopup"
        is-link
      />
      <van-popup v-model="show" position="bottom" style="height: 50%" round>
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="请选择出生日期"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel="show = false"
          @confirm="confirmFn"
        />
      </van-popup>
    </van-cell-group>
  </div>
</template>

<script>
import { userProfileAPI, updatePhotoAPI, updateUserProfileApi } from '@/api'
import { Notify } from 'vant'
import moment from 'moment'
export default {
  name: 'UserEdit',
  data () {
    return {
      profile: {}, // 用户基本资料
      userName: '',
      // Birthday,
      isShowNameDialog: false, // 姓名编辑框的弹出与否
      show: false, // 生日弹出框
      minDate: new Date(1919, 0, 1),
      maxDate: new Date(),
      currentDate: new Date()
    }
  },
  async created () {
    const res = await userProfileAPI()
    console.log(res)
    this.profile = res.data.data
  },
  methods: {
    // 点击编辑图片
    // 文件选择方法
    async onFileChange (ev) {
      //   console.log(ev.target.files[0])
      if (ev.target.files.length === 0) return // 防止用户未选择图片
      const fd = new FormData()
      fd.append('photo', ev.target.files[0]) // photo在表单里参数名携带
      const res = await updatePhotoAPI(fd)
      console.log(res)
      this.profile.photo = res.data.data.photo // 更新最新头像
    },
    // 编辑姓名
    showNameDialogFn () {
      this.isShowNameDialog = true
      this.userName = this.profile.name
    },
    // 姓名关闭之前的回调函数
    async onNameDialogBeforeClose (action, done) {
      if (action === 'confirm') {
        const reg = /^[a-zA-Z0-9\u4e00-\u9fa5]{1,7}$/
        if (reg.test(this.userName) === true) {
          await updateUserProfileApi({
            name: this.userName
          })
          this.profile.name = this.userName
          done()
        } else {
          Notify({ type: 'warning', message: '请输入1-7位中英数字的组合' })
          done(false)
        }
      } else {
        done() // 点击取消关闭弹窗
      }
    },
    showPopup () {
      this.show = true
      this.currentDate = this.profile.birthday
    },
    async confirmFn () {
      const dateStr = moment(this.currentDate).format('YYYY-MM-DD')
      await updateUserProfileApi({
        birthday: dateStr

      })
      this.profile.birthday = dateStr
      this.show = false
    }
  }
  // Openinput () {
  //   this.$refs.iptFile.click()
  // }
}
</script>

<style lang="less" scoped>
.user-edit-container {
  padding-top: 46px;
  .avatar {
    width: 50px;
    height: 50px;
  }
}
</style>
