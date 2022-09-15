<template>
  <div>
    <van-nav-bar
     title="今日头跳-登录"
    />
  <van-form @submit="onSubmit">
  <van-field
    v-model="user.mobile"
    name="mobile"
    required
    label="手机号"
    placeholder="请输入11位手机号码"
    :rules="[{ required: true, message: '请填写正确的手机号码',pattern: /^1[3-9]\d{9}$/ }]"
  />
  <van-field
    v-model="user.code"
    type="password"
    required
    name="code"
    label="密码"
    placeholder="请输入6位密码"
    :rules="[{ required: true,  message: '请填写6位密码',pattern: /^\d{6}$/ }]"
  />
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">提交</van-button>
  </div>
  </van-form>
  </div>
</template>

<script>
import { loginApi } from '@/api'
import { setToken } from '@/utils/token'
export default {
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    async onSubmit () {
      console.log(this.user)
      const res = await loginApi(this.user)
      console.log(res)
      this.$router.replace('/layout')
      setToken(res.data.data.token)
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar{
  background-color: rgba(0, 153, 255, 0.963);

}
/deep/.van-nav-bar__title{
  color: #fff
}

</style>
