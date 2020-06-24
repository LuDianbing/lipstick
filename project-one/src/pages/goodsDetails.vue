<template>
  <div class="goodsDetails container">
    <div class="row details">
      <div class="details-left">
        <div class="left-message">
          <div class="left">
            <div class="left-top">
              <div class="big-img">
                <img v-if="isBigImg" :src="goodsDetails.imgUrl" alt="图片加载中" />
                <img v-else :src="bigImg" alt="图片加载中" />
              </div>
            </div>
            <div class="left-bottom" @click="getIndex($event)">
              <img
                v-for="(bottomImg,index) in goodsDetails.littleImg"
                :key="index"
                :src="bottomImg"
                alt="图片加载中"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <p class="goods-title">{{goodsDetails.title}}</p>
        <p class="introduce">{{goodsDetails.introduction}}</p>
        <hr />
        <div class="price-message">
          <p class="point">新品</p>
          <p>价格</p>
          <span v-if="this.goodsDetails.newPrice!=0" class="price">￥ {{goodsDetails.newPrice}}</span>
          <span v-else class="price">￥ {{goodsDetails.price}}</span>
        </div>
        <hr />
        <div class="color">
          <p>色系 :</p>
          <div class="color-circle">
            <div class="circle sel one"></div>
            <div class="circle two"></div>
            <div class="circle three"></div>
            <div class="circle four"></div>
          </div>
        </div>
        <hr />
        <div class="number-message">
          <div class="quantity">
            <p>数量 :</p>
            <el-input-number
              v-model="num"
              size="mini"
              @change="handleChange"
              :min="1"
              :max="10"
              label="购买数量"
            ></el-input-number>
            <p>件</p>
          </div>
          <div class="inventory">
            <p>库存 : 9999件</p>
          </div>
        </div>
        <div class="purchase-shopping">
          <div class="purchase" @click="toBuy()">
            <p>立即购买</p>
          </div>
          <div class="shopping" @click="toShopping()">
            <i class="iconfont iconjiarugouwuche"></i>
            <p>加入购物车</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row product-message">
      <div class="message-btn">
        <div class="btn sel">商品详情</div>
      </div>
      <div class="message">
        <div class="comments">
          <div class="datails-message">
            <p class="title">产品参数 ：</p>
            <div class="message">
              <p>品牌名称:嫣知</p>
              <p>嫣知单品: {{goodsDetails.title}}</p>
              <p>组合产地: 法国</p>
              <p>净含量: 3.5g</p>
            </div>
            <div class="message">
              <p>保质期: 3年</p>
              <p>规格类型: 正常规格</p>
              <p>适合肤质: 任何肤质</p>
              <p>功效: 遮瑕 滋润 保湿</p>
            </div>
            <div class="message">
              <p>上市时间: 2009年</p>
              <p>产品质量：极好</p>
              <p>生产日期 ：2019年11月20号</p>
              <p>厂家：四川</p>
            </div>
          </div>
          <div class="dateils-img">
            <img :src="goodsDetails.details" alt="图片加载中" />
          </div>
        </div>
      </div>
      <div class="page clearFix">
        <div class="next-page">
          <a href="javascript:;">下一页 &gt;&gt;</a>
        </div>
        <div class="three">
          <a href="javascript:;">3</a>
        </div>
        <div class="two">
          <a href="javascript:;">2</a>
        </div>
        <div class="one">
          <a href="javascript:;">1</a>
        </div>
        <div class="pre-page">
          <a href="javascript:;">&lt;&lt; 上一页</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
let Base64 = require("js-base64").Base64;
export default {
  name: "GoodsDetails",
  data() {
    return {
      num: 1,
      goodsDetails: {},
      isBigImg: true,
      bigImg: "",
      goodsImgUrl: "",
      isGetIndex: false
    };
  },
  created() {
    // 获取点击商品的id和类型
    let goodsId = this.$route.query.id;
    let goodsType = this.$route.query.type;
    this.$axios.get("/goods").then(res => {
      let goodsData = res.data.data;
      goodsData.forEach(e => {
        if (e.id == goodsId && e.type == goodsType) {
          this.goodsDetails = e;
        }
      });
    });
  },
  methods: {
    // 立即购买
    toBuy() {
      //判断是否登录
      let userToken = localStorage.getItem("token");
      if (!userToken) {
        this.$message({
          showClose: true,
          message: "请先登录",
          type: "error",
          offset: 100,
          center: true
        });
        // 跳转到登录页面
        this.$router.push({ path: "/login" });
      } else {
        let allGoodsPrice = 0;
        if (this.goodsDetails.newPrice != 0) {
          allGoodsPrice = Base64.encode(this.goodsDetails.newPrice);
        } else {
          allGoodsPrice = Base64.encode(this.goodsDetails.price);
        }
        this.$router.push({ path: `/orderForm?p=${allGoodsPrice}` });
      }
    },
    // 加入购物车
    toShopping() {
      //判断是否登录
      let userToken = localStorage.getItem("token");
      if (!userToken) {
        this.$message({
          showClose: true,
          message: "请先登录",
          type: "error",
          offset: 100,
          center: true
        });
        this.$router.push({ path: "/login" });
      } else {
        if (this.isGetIndex == false) {
          let leng = this.goodsDetails.imgUrl.lastIndexOf("/");
          let url = this.goodsDetails.imgUrl.slice(leng + 1);
          this.goodsImgUrl = url;
        }
        // 获取当前时间戳，作为购物车商品id
        let timestamp = Date.parse(new Date());
        let userPhone = localStorage.getItem("userPhone");
        // 若是活动价格，加入购物车的为活动价
        let goodsPrice = 0;
        if (this.goodsDetails.newPrice != 0) {
          goodsPrice = this.goodsDetails.newPrice;
        } else {
          goodsPrice = this.goodsDetails.price;
        }
        this.$axios
          .post(`/shoppingCart/add`, {
            userPhone: userPhone,
            carId: timestamp,
            imgUrl: this.goodsImgUrl,
            title: this.goodsDetails.title,
            goodsPrice: goodsPrice,
            introduction: this.goodsDetails.introduction,
            type: this.goodsDetails.type,
            number: this.num
          })
          .then(res => {
            if (res.data.code == 200) {
              this.$message({
                showClose: true,
                message: "添加成功",
                type: "success",
                offset: 100,
                center: true
              });
            }
          });
      }
    },
    handleChange(value) {
      this.num = value;
    },
    getIndex(e) {
      if (e.target.src == "" || e.target.src == undefined) {
        this.isBigImg = true;
      } else {
        this.isBigImg = false;
        this.isGetIndex = true;
        this.bigImg = e.target.src;
        let leng = this.goodsDetails.imgUrl.lastIndexOf("/");
        let url = this.goodsDetails.imgUrl.slice(leng + 1);
        this.goodsImgUrl = url;
      }
      console.log(e.target.src, "");
    }
  }
};
</script>
<style lang="less">
.details {
  margin-top: 20px;

  .left-message {
    .left {
      position: absolute;

      .left-top {
        .big-img {
          margin-top: 22px;
          img {
            width: 460px;
            height: 460px;
          }
        }
      }

      .left-bottom {
        margin-top: 20px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;

        img {
          width: 82px;
          height: 82px;

          cursor: pointer;
          border: 1px dotted;
        }
      }
    }
  }

  .right {
    float: right;
    width: 50%;
    margin-top: 16px;
    margin-left: 95px;
    text-align: left;

    .goods-title {
      font-size: 24px;
      color: rgba(51, 51, 51, 1);
    }

    .introduce {
      width: 200px;
      margin-top: 18px;
      font-size: 14px;
      line-height: 30px;
      color: rgba(153, 153, 153, 1);
    }

    hr {
      width: 100%;
      margin-top: 30px;
    }

    .price-message {
      position: relative;

      p {
        margin-top: 20px;
      }

      .point {
        width: 32px;
        background: rgba(94, 10, 18, 1);
        color: rgba(255, 255, 255, 1);
      }

      span {
        position: absolute;
        top: 40px;
        left: 80px;
        font-size: 20px;
        line-height: 20px;
        color: #f02125;
      }
    }

    .color {
      position: relative;

      p {
        margin-top: 36px;
      }

      .color-circle {
        position: absolute;
        top: -10px;
        left: 42px;

        .circle {
          float: left;
          width: 42px;
          height: 42px;
          margin-left: 16px;
          border-radius: 50%;
          cursor: pointer;
        }

        .one {
          background: rgba(163, 0, 3, 1);
        }

        .two {
          background: rgba(214, 0, 61, 1);
        }

        .three {
          background: rgba(197, 79, 26, 1);
        }

        .four {
          background: rgba(197, 79, 26, 1);
        }
      }
    }

    .number-message {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;

      .quantity {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        margin-top: 30px;
        line-height: 30px;
        p {
          padding: 0 10px;
        }
      }

      .inventory {
        margin-top: 30px;
        margin-left: 10px;
      }
    }

    .purchase-shopping {
      .purchase,
      .shopping {
        width: 237px;
        margin-top: 50px;
        line-height: 60px;
        text-align: center;
        border: 1px solid red;
        cursor: pointer;
      }

      .purchase {
        float: left;
        margin-left: 20px;
        border: 1px solid rgba(245, 32, 48, 1);
        border-radius: 10px;

        &:hover p {
          color: #000;
        }

        p {
          margin: 0;
          font-size: 24px;
          color: rgba(249, 4, 8, 1);
        }
      }

      .shopping {
        float: right;
        margin-right: 20px;
        background: rgba(163, 0, 3, 1);
        color: rgba(241, 240, 240, 1);
        border-radius: 10px;
        position: relative;

        &:hover p {
          color: #000;
        }

        i {
          position: absolute;
          left: 15px;
          font-size: 32px;
        }

        p {
          font-size: 24px;
          margin: 0;
        }
      }
    }
  }
}

.product-message {
  height: 200px;
  margin-top: 100px;

  .message-btn {
    border: 1px solid rgb(219, 218, 218);

    .btn {
      display: inline-block;
      width: 200px;
      line-height: 43px;
      text-align: center;
      border-right: 1px solid rgba(191, 191, 191, 1);
      cursor: pointer;

      &:hover {
        color: #fff;
        background-color: rgb(241, 40, 40);
      }
    }
  }

  .message {
    .comments {
      .dateils-img {
        img {
          width: 80%;
        }
        text-align: center;
      }
      .datails-message {
        margin-top: 20px;
        padding: 0 40px;
        background: rgb(241, 241, 241);

        .title {
          padding: 20px 0;
          font-size: 18px;
          color: rgba(102, 102, 102, 1);
        }

        .message {
          float: left;
          width: 360px;
          margin-bottom: 42px;

          p {
            font-size: 14px;
            color: rgba(153, 153, 153, 1);
          }
        }
      }

      .name {
        margin-top: 20px;
        padding-left: 60px;
        line-height: 60px;
        background: rgba(63, 19, 19, 1);
        font-size: 18px;
        color: rgba(255, 255, 255, 1);
      }

      .evaluate {
        background: rgba(255, 255, 255, 1);

        .evaluate_list {
          width: 300px;
          height: 120px;
          text-align: center;
        }

        .list_first {
          border-right: 1px solid rgba(255, 0, 0, 1);

          p {
            &:nth-child(1) {
              margin-top: 20px;
              font-size: 14px;
              color: rgba(102, 102, 102, 1);
            }

            &:nth-child(2) {
              font-size: 45px;
              color: rgba(102, 102, 102, 1);
            }
          }
        }

        .list_second {
          width: 200px;

          p {
            width: 12px;
            margin-left: 100px;
            font-size: 12px;
            color: rgba(102, 102, 102, 1);
          }
        }

        .list_third {
          width: 680px;
          display: flex;
          flex-flow: row wrap;
          justify-content: space-between;
          align-content: center;

          .praise {
            width: 147px;
            line-height: 30px;
            margin: 10px;
            font-size: 14px;
            color: rgba(250, 0, 0, 1);
            border: 1px solid rgba(210, 210, 210, 1);
          }
        }
      }

      .select {
        line-height: 40px;
        padding-left: 60px;
        background: rgb(226, 225, 225);

        input {
          margin-left: 20px;
        }
      }

      .comment {
        img {
          margin-top: 10px;
        }

        .bottom {
          height: 40px;
          border-bottom: 1px solid rgba(222, 216, 217, 1);
        }
      }
    }
  }

  .page {
    margin-top: 60px;

    div {
      float: right;
      width: 90px;
      line-height: 45px;
      border: 1px solid rgba(222, 216, 217, 1);
      text-align: center;

      a {
        display: block;
      }

      &:hover {
        font-size: 14px;
        background: rgba(163, 0, 3, 1);
        color: rgba(255, 255, 255, 1);
      }
    }

    .one,
    .two,
    .three {
      width: 45px;
    }
  }
}
</style>