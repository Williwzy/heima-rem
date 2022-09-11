<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录">
      <i slot="left" name="cross" @click="$router.back()"
        ><van-icon name="cross"
      /></i>
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userLogin.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userLogin.code"
        maxlength="6"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down
            :time="time"
            format="ss s"
            v-if="logindaojishi"
            @finish="logindaojishi = false"
          />
          <van-button
            v-else
            class="send-sms-btn"
            round
            size="small"
            type="default"
            native-type="button"
            @click="loginCode"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { login, getCode } from '@/api/user'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      time: 1000 * 60,
      logindaojishi: false,
      user: {
        mobile: '13911111111', // 手机号
        code: '246810' // 验证码
      },
      userLogin: {
        mobile: [
          { required: true, message: '请填写用户名' },
          {
            pattern: /^1[3|5|6|7|8|9]\d{9}$/,
            message: '手机格式出错'
          }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          {
            pattern: /^\d{6}$/,
            message: '请输入6位的验证码'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 发送验证码
    async onSubmit () {
      // 1. 获取表单数据
      const user = this.user
      // // 2.表单验证

      this.$toast.loading({
        message: '登录中..',
        forbidClick: true, // 禁用背景点击
        duration: 2000 // 持续时间，默认2000，若为0则持续展示
      })

      // 3. 提交表单请求登录
      try {
        const { data } = await login(user)
        this.$store.commit('getUser', data.data)
        this.$toast.success('登录成功')
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          console.log('手机号或验证码错误')
          this.$toast.fail('手机号或验证码错误')
        } else {
          console.log('登录失败，请稍后重试', err)
          this.$toast.fail('登录失败，请稍后重试')
        }
      }

      // 4.根据请求响应结果处理后续操作
    },
    async loginCode () {
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('手机验证失败', err)
      }
      this.logindaojishi = true
      try {
        await getCode(this.user.mobile)
        this.$toast('发送验证码成功')
      } catch (err) {
        if (err.response.status === 429) {
          this.$toast('请求过于频繁，请稍后重试')
          this.logindaojishi = false
        } else {
          this.$toast('请求失败，稍后重试')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 40px;
  }

  .send-sms-btn {
    width: 160px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 11px;
    color: #666;
  }

  .login-btn-wrap {
    padding: 20px 20px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
