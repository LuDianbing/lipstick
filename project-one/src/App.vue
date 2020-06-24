<template>
  <div id="app">
    <!-- 头部 -->
    <header class="container">
      <!-- 头部导航栏 -->
      <nav class="navbar navbar-default">
        <!-- 响应式缩小后的显示 -->
        <div class="navbar-header">
          <!-- 响应式缩小后的按钮 -->
          <button
            type="button"
            class="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#top-nav"
            aria-expanded="false"
          >
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <!-- logo -->
          <div class="logo">
            <li>
              <router-link to="/">
                <img src="../src/assets/logo.png" alt="logo" />
              </router-link>
            </li>
          </div>
        </div>
        <!-- 主要显示内容 -->
        <div class="collapse navbar-collapse" id="top-nav">
          <ul class="nav navbar-nav">
            <li v-for="(item,index) in navData" :key="index">
              <router-link :to="item.url">{{item.navTitle}}</router-link>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right hidden-sm">
            <li class="search">
              <input type="text" v-model="goodsTitle" placeholder="搜索" maxlength="8" />
              <router-link to="/">
                <i class="iconfont icon-sousuo" @click="toSearch()"></i>
              </router-link>
            </li>
            <li>
              <div v-if="isUserToken" class="userPhotoBox" @click="toSet()">
                <div class="photo">
                  <img
                    v-if="this.userData.userPhoto=='undefined'"
                    src="../src/assets/userPhoto.png"
                    alt="用户头像"
                  />
                  <img v-else :src="userData.userPhoto" alt="用户头像" />
                </div>
                <div class="logout" @click="logout()">退出</div>
              </div>
              <router-link v-else to="/login">登录/注册</router-link>
            </li>
            <li class="shopping-cart">
              <router-link to="/shoppingCart">
                <i class="iconfont icon-gouwuche"></i>
                <p>购物车</p>
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <!-- 内容 -->
    <main>
      <router-view></router-view>
    </main>
    <!-- 尾部 -->
    <footer>
      <!-- 窗口右侧浮动 -->
      <div v-if="btnFlag" class="float-right">
        <div class="back-top" @click="backTop">
          <img src="../src/assets/top.png" alt="加载中" />
        </div>
        <div class="talk-us">
          <img src="../src/assets/kefu.png" alt="加载中" />
        </div>
        <div class="about-us">
          <router-link to="/about">
            <img src="../src/assets/mine.png" alt="加载中" />
          </router-link>
        </div>
      </div>
      <!-- 尾部内容 -->
      <div class="foot container">
        <div class="row foot-top hidden-xs">
          <div class="col-md-3 col-sm-3 text-center foot-left">
            <ul>
              <li class="foot-title">关于公司</li>
              <li v-for="(item,index) in footLeftData" :key="index" class="foot-list">{{item}}</li>
            </ul>
          </div>
          <div class="col-md-6 col-sm-5 text-center foot-center">
            <img src="../src/assets/map.png" alt />
            <p>
              <i class="iconfont icondizhi1"></i>
              成都市天府大道北段２３１号附５号
            </p>
          </div>
          <div class="col-md-3 col-sm-4 text-center foot-right">
            <ul>
              <li class="foot-title">YANZHI</li>
              <li v-for="(item,index) in footRightData" :key="index" class="foot-list">{{item}}</li>
            </ul>
          </div>
        </div>
        <div class="row text-center foot-bottom">
          <p>@沪公网安备 31010602002343号 沪ICP备19005922号尚圃电子商务（上海）有限公司上海市南京西路1266号恒隆广场1期29F</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      isUserToken: false,
      searchData: [],
      userData: [],
      goodsTitle: "",
      btnFlag: false,
      navData: [
        {
          url: "/",
          navTitle: "首页"
        },
        {
          url: "/productList?type=lipstick",
          navTitle: "唇膏"
        },
        {
          url: "/productList?type=lipgloss",
          navTitle: "唇彩"
        },
        {
          url: "/productList?type=lipglaze",
          navTitle: "唇釉"
        },
        {
          url: "/productList?type=lipprotector",
          navTitle: "润唇膏"
        },
        {
          url: "/productList?type=lipliner",
          navTitle: "唇线笔"
        },
        {
          url: "/productList?type=lipcolorplate",
          navTitle: "唇部彩盘"
        }
      ],
      footLeftData: [
        "联系我们",
        "配送及退货",
        "常见问题",
        "使用条款",
        "数据保护章程"
      ],
      footRightData: [
        "嫣知是全球第一美妆品牌",
        "凸显口红的精致",
        "口味人生的美丽",
        "我们注重细节"
      ]
    };
  },
  created() {
    let userToken = localStorage.getItem("token");
    let userPhone = localStorage.getItem("userPhone");
    if (userToken) {
      this.isUserToken = true;
      this.$axios
        .post("/user/userData", {
          userPhone: userPhone
        })
        .then(res => {
          this.userData = res.data.data;
        });
    }
  },
  // window对象，所有浏览器都支持window对象。它表示浏览器窗口，监听滚动事件
  mounted() {
    window.addEventListener("scroll", this.scrollToTop);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollToTop);
  },
  updated() {
    window.scroll(0, 0);
  },
  methods: {
    backTop() {
      const that = this;
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          that.scrollTop + ispeed;
        if (that.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
    },
    // 计算距离顶部的高度，当高度大于400显示回顶部图标，小400则隐藏
    scrollToTop() {
      const that = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      that.scrollTop = scrollTop;
      if (that.scrollTop > 400) {
        that.btnFlag = true;
      } else {
        that.btnFlag = false;
      }
    },
    toSearch() {
      this.$axios
        .post("/search", {
          title: this.goodsTitle
        })
        .then(res => {
          this.searchData = res.data.data;
          if (this.searchData.length != 0) {
            // 搜索成功后将数据保存在本地
            let searchSuccessData = JSON.stringify(this.searchData);
            localStorage.setItem("searchSuccessData", searchSuccessData);
            this.$router.push({ path: `/productList?type=search` });
          } else {
            this.$message({
              showClose: true,
              message: "未找到该类商品",
              type: "error",
              offset: 100,
              center: true
            });
          }
        });
    },
    toSet() {
      console.log("111", "");
      this.$router.push({ path: "/mine" });
    },
    logout() {
      localStorage.removeItem("userPhone");
      localStorage.removeItem("token");
      this.$router.push({ path: "/" });
      location.reload();
    }
  }
};
</script>

<style lang="less">
#app {
  position: relative;
  background: rgba(247, 244, 244, 1);
}
header {
  padding: 0 !important;
  .navbar-default {
    background: rgba(247, 244, 244, 1);
    border: 0;
    margin: 0;
    .navbar-header {
      .logo {
        margin-right: 30px;
      }
    }
    .search {
      line-height: 84px;
      input {
        width: 128px;
        height: 42px;
        padding-left: 17px;
        background: rgba(187, 11, 22, 1);
        border-radius: 21px;
        border: 0;
        outline: none;
        box-sizing: border-box;

        &::-webkit-input-placeholder {
          letter-spacing: 8px;
          color: rgba(255, 255, 255, 1);
        }
      }

      i {
        position: absolute;
        top: -46px;
        left: -38px;
        font-size: 24px;
        color: rgba(255, 255, 255, 1);
      }

      &:hover input {
        border: 1.5px solid rgb(13, 14, 13);

        &::-webkit-input-placeholder {
          color: rgba(255, 255, 255, 1);
        }
      }

      &:hover i {
        font-size: 18px;
      }
    }
    .shopping-cart {
      i {
        position: absolute;
        top: -25px;
        margin-left: 5px;
        font-size: 30px;
        color: rgba(180, 0, 11, 1);
      }

      p {
        position: absolute;
        top: 0;
        width: 42px;
        font-size: 14px;
        color: rgba(51, 51, 51, 1);
      }
    }

    li {
      list-style: none;
      height: 84px;
      text-align: center;
      a {
        display: inline-block;
        box-sizing: border-box;
        line-height: 84px !important;
        padding: 0 15px !important;
        font-size: 18px;
        color: black !important;
        &:hover {
          color: red !important;
        }
      }
    }
  }
  .userPhotoBox {
    display: flex;
    justify-content: space-between;
    width: 116px;
    margin: 12px 4px;
    .photo {
      cursor: pointer;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: black;
      img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
      }
    }
    .logout {
      cursor: pointer;
      line-height: 56px;
      font-size: 20px;
      &:hover {
        color: red;
      }
    }
  }
}

footer {
  margin: 30px 0;
  background-color: #3f1313;
  color: #fffbfb;
  font-family: "微软雅黑";
  padding: 50px 0 10px 0;
  position: relative;
  // 窗口右侧浮动
  .float-right {
    width: 65px;
    height: 220px;
    position: fixed;
    right: 15px;
    bottom: 80px;
    z-index: 10;
    div {
      width: 40px;
      line-height: 40px;
      text-align: center;
      cursor: pointer;
      background: #e0dddd;
      border-radius: 50%;
      margin-top: 30px;
      img {
        width: 20px;
        height: 20px;
      }
      &:hover {
        background: #bb3535;
      }
    }
  }
  li {
    list-style: none;
  }
  .foot {
    .foot-top {
      li {
        letter-spacing: 2px;
        line-height: 40px;
      }
      .foot-title {
        font-size: 20px;
      }
      .foot-list {
        font-size: 16px;
        color: #e7e3e3;
      }
      .foot-center {
        img {
          width: 85%;
        }
        p {
          letter-spacing: 3px;
          font-size: 12px;
          margin: 10px 0;
          i {
            margin-right: 5px;
          }
        }
      }
    }
    .foot-bottom {
      margin-top: 30px;
      line-height: 20px;
      font-size: 14px;
    }
  }
}
</style>
