<template>
  <div class="page container">
    <div class="order-shell">
      <!-- 收货信息 -->
      <div class="order-address">
        <div class="address">
          <div class="add-address">
            <span>收货信息</span>
          </div>
          <div class="message">
            <div class="username">姓名： {{userData.userName}}</div>
            <div class="userPhone">手机号码： {{userData.userPhone}}</div>
            <div
              v-if="this.userData.userAddress=='undefined'||this.userData.userAddress==''"
              class="userAdress"
            >收货地址： 请前去添加收货地址</div>
            <div v-else class="userAdress">收货地址： {{userData.userAddress}}</div>
          </div>
        </div>
      </div>
      <div class="buy-now">
        <div class="title_price">
          <h3>总价:</h3>
          <p>￥ {{allGoodsPrice}} 元</p>
        </div>
        <div class="rinow" @click="toPay()">确认支付</div>
      </div>
    </div>
    <!-- 订单总结和购物车内容 -->
    <div class="order-total">
      <h3>您的购物车</h3>
      <ul>
        <li v-for="(item,index) in shoppingCartData" :key="index" @click="toGoodsCart()">
          <div class="shop-car-img">
            <img :src="item.imgUrl" alt="图片加载中" />
          </div>
          <div class="goods-des">
            <p>{{item.title}}</p>
            <span>￥ {{item.goodsPrice}}</span>
            <div class="how-many">
              <span>数量：{{item.number}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
let Base64 = require("js-base64").Base64;
export default {
  name: "OrderForm",
  data() {
    return {
      shoppingCartData: [],
      allGoodsPrice: 0,
      userData: []
    };
  },
  created() {
    this.allGoodsPrice = Base64.decode(this.$route.query.p);
    let userPhone = localStorage.getItem("userPhone");
    this.$axios
      .get(`/shoppingCart/shoppingGoods?userPhone=${userPhone}`)
      .then(res => {
        this.shoppingCartData = res.data.data;
      });
    //获取用户信息
    this.$axios
      .post("/user/userData", {
        userPhone: userPhone
      })
      .then(res => {
        this.userData = res.data.data;
        console.log(this.userData, "");
      });
  },
  methods: {
    toGoodsCart() {
      this.$router.push({ path: "/shoppingCart" });
    },
    toPay() {
      if (
        this.userData.userAddress == "undefined" ||
        this.userData.userAddress == ""
      ) {
        this.$message({
          showClose: true,
          message: "请前去添加收货地址",
          type: "error",
          offset: 100,
          center: true
        });
      } else {
        this.$message({
          dangerouslyUseHTMLString: true,
          message: `"<img src="http://127.0.0.1:8081/images/order.jpg" width="50%"></img>"`,
          offset: 100,
          center: true,
          duration: 3000
        });
      }
    }
  }
};
</script>
<style lang="less">
.el-message {
  top: 0 !important;
  background-color: rgba(247, 244, 244, 1) !important;
  border: 0 !important;
  i {
    display: none;
  }
  .el-message__content {
    text-align: center;
  }
}
.order-shell {
  margin-top: 40px;
  .order-address {
    width: 70%;
    background: #f2f2f2;
    box-sizing: border-box;
    padding-bottom: 10px;
    .address {
      .add-address {
        padding-left: 10px;
        background: #a30003;
        color: #d2d2d2;
        font-size: 19px;
        line-height: 40px;
        letter-spacing: 0.2rem;
      }
      .message {
        div {
          margin: 40px 0;
          font-size: 18px;
        }
      }
    }
  }

  .buy-now {
    width: 250px;
    margin-left: 648px;
    .title_price {
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
      line-height: 60px;
      box-sizing: border-box;
      p {
        font-size: 20px;
        margin-top: 5px;
      }
    }

    .rinow {
      background: #a30003;
      color: whitesmoke;
      line-height: 40px;
      font-size: 14px;
      text-align: center;
      cursor: pointer;
      &:hover {
        color: black;
      }
    }
  }
}

.order-total {
  width: 25%;
  margin-top: 50px;
  margin-right: 20px;
  padding: 3px;
  background: #f2f2f2;

  h3 {
    font-weight: 400;
    text-align: center;
    margin-top: 10px;
  }

  ul {
    li {
      cursor: pointer;
      width: 100%;
      background: #f2f2f2;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid rgb(201, 193, 193);
      box-sizing: border-box;
      margin-top: 20px;
      padding: 5px 0;

      .shop-car-img {
        width: 40%;
        height: 100px;
        background: rgb(146, 185, 185);

        img {
          width: 100%;
          height: 100%;
        }
      }

      .goods-des {
        width: 55%;

        > p {
          font-size: 13px;
          line-height: 40px;

          &:nth-child(2) {
            display: inline-block;
          }
        }

        .how-many {
          font-size: 13px;
          margin-left: 50px;
          display: inline-block;
        }
      }
    }
  }
}
</style>