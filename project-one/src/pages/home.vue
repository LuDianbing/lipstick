<template>
  <div class="home">
    <!-- 首页轮播图 -->
    <div id="running-img" class="carousel slide" data-ride="carousel">
      <!-- 轮播图小圆点 -->
      <ol class="carousel-indicators">
        <li data-target="#running-img" data-slide-to="0" class="active"></li>
        <li data-target="#running-img" data-slide-to="1"></li>
        <li data-target="#running-img" data-slide-to="2"></li>
        <li data-target="#running-img" data-slide-to="3"></li>
      </ol>

      <!-- 轮播图 -->
      <div class="carousel-inner">
        <div class="item active">
          <img src="http://127.0.0.1:8081/images/runningImg_1.png" alt="轮播图1" />
        </div>
        <div class="item">
          <img src="http://127.0.0.1:8081/images/runningImg_2.png" alt="轮播图2" />
        </div>
        <div class="item">
          <img src="http://127.0.0.1:8081/images/runningImg_3.png" alt="轮播图3" />
        </div>
        <div class="item">
          <img src="http://127.0.0.1:8081/images/runningImg_4.png" alt="轮播图4" />
        </div>
      </div>

      <!-- 轮播图左右按钮 -->
      <a class="left carousel-control" href="#running-img" role="button" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      </a>
      <a class="right carousel-control" href="#running-img" role="button" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      </a>
    </div>
    <div class="container">
      <!-- 商品列表1 -->
      <div class="row goods-list1 goods-list">
        <div class="row titlebox">
          <div class="title">
            <p>炫目唇膏</p>
            <span>Dazzling lipstick</span>
          </div>
        </div>
        <div class="row goods-message">
          <goodsCard :cardData="lipstickData" :lastData="`查看详情`"></goodsCard>
        </div>
      </div>
      <!-- 秒杀部分 -->
      <div class="row second-kill">
        <div class="top">
          <router-link to="/activity">限时秒杀</router-link>
        </div>
        <div class="bottom">
          <div class="second-message">
            <p>{{activityDate}}</p>
            <img src="../assets/seconds.png" alt="图片加载中" />
            <p>离结束还有</p>
            <div class="time-run">
              <div class="hours">{{hours}}</div>
              <span>:</span>
              <div class="minutes">{{minutes}}</div>
              <span>:</span>
              <div class="seconds">{{seconds}}</div>
            </div>
          </div>
          <div v-if="isNoActivity" class="noActivity">暂无活动</div>
          <div v-else class="killmessage">
            <goodsCard
              :cardData="killGoodsData"
              :isShow="false"
              :isNewPrice="true"
              @click="toActivity"
            ></goodsCard>
            <div class="more" @click="toActivity()">查看更多</div>
          </div>
        </div>
      </div>
    </div>
    <!-- banner -->
    <div class="banner">
      <a href="javascript:;">
        <img src="http://127.0.0.1:8081/images/banner.png" alt="图片加载中" />
      </a>
    </div>
    <div class="container">
      <!-- 商品列表2 -->
      <div class="row goods-list2 goods-list">
        <div class="titlebox">
          <div class="title">
            <p>唯美唇釉</p>
            <span>Dazzling lipstick</span>
            <p>真正的色彩是明亮的，如同夜空里你的唇</p>
          </div>
        </div>
        <div class="goods-message">
          <goodsCard :cardData="lipGlazeData" :lastData="`查看详情`"></goodsCard>
        </div>
      </div>
      <!-- 商品日志 -->
      <div class="log goods-list">
        <div class="titlebox">
          <div class="title">
            <p>嫣知日志</p>
            <span>NEW THINGS</span>
            <p>时光总会带走我们一些东西，而我们无法记忆</p>
          </div>
        </div>
        <div class="log-message">
          <div class="logItem">
            <img src="../assets/log_01-faa262.png" alt="图片加载中" />
            <div class="message">
              <p>2019-12-26</p>
              <p>会员专享 容颜倾城</p>
              <hr />
              <p>2020.圣诞跨年狂欢夜,等你来玩哦,最好的往往与众不同却又引人注目</p>
              <p>点击阅读全文&nbsp;>></p>
            </div>
          </div>
          <div class="logItem">
            <img src="../assets/log_02-535bae.png" alt="图片加载中" />
            <div class="message">
              <p>2019-12-28</p>
              <p>天空之城</p>
              <hr />
              <p>每段故事的夜晚于他特别美，也许他并不知道，但是存在着</p>
              <p>点击阅读全文&nbsp;>></p>
            </div>
          </div>
          <div class="logItem">
            <img src="../assets/log_03-8bf786.png" alt="图片加载中" />
            <div class="message">
              <p>2019-12-30</p>
              <p>关于嫣然一笑</p>
              <hr />
              <p>如同他拥有灵魂涂上它，我感觉自己活了一样</p>
              <p>点击阅读全文&nbsp;>></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import goodsCard from "../../components/goodsCard";
export default {
  name: "Home",
  data() {
    return {
      lipstickData: [],
      lipGlazeData: [],
      killGoodsData: [],
      isNoActivity: true,
      activityDate: "6月7号",
      hours: "",
      minutes: "",
      seconds: ""
    };
  },
  components: {
    goodsCard
  },
  created() {
    this.activityTime();
    this.$axios.get("/goods").then(res => {
      let goodsData = res.data.data;
      goodsData.forEach(e => {
        if (e.type == "lipstick") {
          this.lipstickData = this.lipstickData.concat(e);
        } else if (e.type == "lipglaze") {
          this.lipGlazeData = this.lipGlazeData.concat(e);
        } else if (e.newPrice != 0) {
          this.isNoActivity = false;
          this.killGoodsData = this.killGoodsData.concat(e).slice(0, 3);
        }
      });
    });
  },
  methods: {
    toActivity() {
      this.$router.push({ path: "/activity" });
    },
    activityTime() {
      let t = setInterval(() => {
        //获取当前时间
        var date = new Date();
        var now = date.getTime();
        // 定义结束时间
        var endDate = new Date("2020/6/7 24:00:00");
        var end = endDate.getTime();
        // 结束时间与当前时间的差
        var ms = end - now;
        // let day = Math.floor(ms / 1000 / 60 / 60 / 24);
        let hours = Math.floor(ms / 1000 / 60 / 60);
        let minutes = Math.floor((ms / 1000 / 60) % 60);
        let seconds = Math.floor((ms / 1000) % 60);
        this.hours = hours < 10 ? `0${hours}` : hours;
        this.minutes = minutes < 10 ? `0${minutes}` : minutes;
        this.seconds = seconds < 10 ? `0${seconds}` : seconds;
        if (ms <= 0) {
          clearInterval(t);
          this.hours = "00";
          this.minutes = "00";
          this.seconds = "00";
        }
      }, 1000);
    }
  }
};
</script>

<style lang="less">
.container {
  // 商品列表
  .goods-list {
    margin: 60px auto;
    cursor: pointer;

    .titlebox {
      width: 217px;
      height: 54px;
      margin: 5px auto;
      text-align: center;
      border: 1px solid red;

      .title {
        width: 105px;
        margin-left: 53px;
        background: rgba(247, 244, 244, 1);

        p {
          margin-top: 35px;
          font-size: 26px;
        }

        span {
          font-size: 12px;
          font-family: Arial;
          font-weight: bold;
          border-bottom: 1px solid;
          color: rgba(153, 153, 153, 1);
        }
      }
    }

    .goods-message {
      margin-top: 80px;
    }
  }
  // 秒杀部分
  .second-kill {
    margin-top: 50px;

    .top {
      line-height: 100px;
      text-align: center;
      background: rgba(184, 12, 24, 1);

      p,
      i,
      a {
        font-size: 48px;
        color: rgba(255, 255, 255, 1);
      }
    }

    .bottom {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;

      .second-message {
        width: 295px;
        height: 383px;
        text-align: center;
        background: rgba(238, 238, 238, 1);

        p {
          &:nth-child(1) {
            margin-top: 50px;
            font-size: 24px;
          }

          &:nth-child(3) {
            margin-top: 20px;
            font-size: 18px;
          }
        }

        img {
          margin-top: 30px;
        }

        .time-run {
          margin-top: 30px;
          margin-left: 38px;
          text-align: center;
          line-height: 50px;
          color: rgba(255, 255, 255, 1);
          letter-spacing: 3px;

          div {
            float: left;
            width: 50px;
            height: 50px;
            margin-left: 10px;
            background: rgba(184, 12, 24, 1);
          }

          span {
            float: left;
            margin-left: 10px;
            color: rgba(184, 12, 24, 1);
          }
        }
      }

      .killmessage {
        .more {
          cursor: pointer;
          line-height: 32px;
          background-color: red;
          text-align: right;
          padding-right: 20px;
          &:hover {
            color: white;
          }
        }
      }
      .noActivity {
        width: 70%;
        line-height: 384px;
        font-size: 30px;
        color: white;
        text-align: center;
        background: red;
      }
    }
  }
  // 商品列表2
  .goods-list2 {
    .title {
      p {
        &:nth-child(3) {
          width: 323px;
          margin-top: 20px;
          margin-left: -70px;
          font-size: 16px;
          color: rgba(153, 153, 153, 1);
        }
      }
    }

    .goods-message {
      margin-top: 120px;
    }
  }
  // 商品日志部分
  .log {
    cursor: pointer;
    .title {
      p {
        &:nth-child(3) {
          width: 323px;
          margin-top: 20px;
          margin-left: -70px;
          font-size: 16px;
          color: rgba(153, 153, 153, 1);
        }
      }
    }

    .log-message {
      margin-top: 60px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;

      .logItem {
        width: 367px;
        margin-top: 40px;
        height: 545px;
        text-align: center;
        background: rgba(249, 245, 245, 1);
        box-shadow: 0px 6px 8px 0px rgba(35, 24, 21, 0.34);
        transition: all 0.5s;

        &:hover {
          transform: translateY(-10px);
        }

        img {
          margin-top: 8px;
          width: 73%;
        }

        .message {
          width: 340px;
          margin: 40px auto;

          p {
            margin-top: 20px;
            color: rgba(51, 51, 51, 1);

            &:nth-child(1) {
              margin-top: 50px;
              color: rgba(102, 102, 102, 1);
            }

            &:nth-child(2) {
              font-size: 22px;
              letter-spacing: 10px;
            }

            &:nth-child(4) {
              width: 270px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            &:nth-child(5) {
              font-size: 18px;

              &:hover {
                color: rgb(248, 171, 28);
              }
            }
          }

          hr {
            margin-top: 20px;
            border-top: 1px solid black;
          }
        }
      }
    }
  }
}
// banner部分
.banner {
  margin-top: 50px;

  img {
    width: 100%;
  }
}
</style>
