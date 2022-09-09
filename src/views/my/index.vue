<template>
  <div class="my-container">
    <div class="header not-login">
      <div class="denglu" @click="$router.push('login')">
        <img src="@/assets/mobile.png" alt="" />
        <span>点击登录</span>
      </div>
    </div>
    <div class="header true-login">
      <div class="user-top">
        <div class="left">
          <van-image
            class="left-img"
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
            round
            fit="cover"
          />
          <span>555</span>
        </div>
        <div class="right">
          <van-button size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="user-buttom">
        <div class="data-item">
          <div class="data-single">
            <span class="count">10</span>
            <span class="text">文本</span>
          </div>
          <div class="data-single">
            <span class="count">10</span>
            <span class="text">关注</span>
          </div>
          <div class="data-single">
            <span class="count">10</span>
            <span class="text">粉丝</span>
          </div>
          <div class="data-single">
            <span class="count">10</span>
            <span class="text">获赞</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myIndex',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
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
}
</style>
