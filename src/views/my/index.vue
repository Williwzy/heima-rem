<template>
  <div class="my-container">
    <div v-if="user" class="header true-login">
      <div class="user-top">
        <div class="left">
          <van-image class="left-img" :src="userinfo.photo" round fit="cover" />
          <span>{{ this.userinfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑</van-button>
        </div>
      </div>
      <div class="user-buttom">
        <div class="data-item">
          <div class="data-single">
            <span class="count">{{ userinfo.art_count }}</span>
            <span class="text">文本</span>
          </div>
          <div class="data-single">
            <span class="count">{{ userinfo.follow_count }}</span>
            <span class="text">关注</span>
          </div>
          <div class="data-single">
            <span class="count">{{ userinfo.fans_count }}</span>
            <span class="text">粉丝</span>
          </div>
          <div class="data-single">
            <span class="count">{{ userinfo.like_count }}</span>
            <span class="text">获赞</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="header not-login">
      <div class="denglu" @click="$router.push('login')">
        <img src="@/assets/mobile.png" alt="" />
        <span>点击登录</span>
      </div>
    </div>
    <van-grid :column-num="2" class="grid-btn" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"> </i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <van-cell class="btn-cell" title="消息通知" is-link />
    <van-cell title="小智同学" is-link />
    <van-button
      v-if="user"
      type="primary"
      class="content-cell"
      color="#fff"
      block
      @click="onLogout"
      ><span>退出登录</span></van-button
    >
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserinfo } from '@/api/user'
export default {
  name: 'myIndex',
  components: {},
  props: {},
  data () {
    return {
      userinfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    if (this.user) {
      this.loadUserinfo()
    }
  },
  mounted () {},
  methods: {
    onLogout () {
      this.$dialog
        .confirm({
          title: '确认要退出嘛宝子！'
        })
        .then(() => {
          this.$store.commit('getUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    async loadUserinfo () {
      try {
        const { data } = await getUserinfo()
        this.userinfo = data.data
      } catch (err) {
        this.$toast('获取数据失败')
      }
    }
  }
}
</script>

<style lang="less">
.my-container {
  .header {
    height: 361px;
    background: url("~@/assets/banner.png");
    background-size: cover;
  }
  .not-login {
    display: flex;
    align-items: center;
    justify-content: center;
    .denglu {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      img {
        width: 132px;
        height: 132px;
      }
      span {
        margin-top: 10px;
        font-size: 30px;
        color: #fff;
      }
    }
  }

  .true-login {
    .user-top {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .left-img {
          width: 132px;
          height: 132px;
          border: 5px solid #fff;
        }
        span {
          margin-left: 25px;
        }
      }
    }

    .user-buttom {
      .data-item {
        display: flex;
        .data-single {
          height: 130px;
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          color: #fff;
          .count {
            font-size: 36;
          }
          .text {
            font-size: 23px;
          }
        }
      }
    }
  }
  .grid-btn {
    .grid-item {
      height: 141px;
      i.toutiao {
        font-size: 45px;
      }
      span.text {
        font-size: 28px;
      }
      .toutiao-shoucang {
        color: red;
      }
      .toutiao-lishi {
        color: orange;
      }
    }
  }
  .btn-cell {
    margin-top: 7px;
  }
  .content-cell {
    margin-top: 7px;
    span {
      color: rgba(red, 0.7);
    }
  }
}
</style>
