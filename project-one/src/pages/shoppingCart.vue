<template>
  <div class="page">
    <div class="shop-car-user container">
      <div class="your-shopcar">
        <span>您的购物车</span>
      </div>
    </div>
    <!-- 购物车为空时显示 -->
    <div v-if="isData==true" class="epmty-shop-car">
      <img src="../assets/epty.jpg" alt />
    </div>
    <!-- 购物车有商品时显示 -->
    <div v-else class="cont container">
      <div class="goods-detail">
        <div class="shop-car-goods-nav">
          <ul>
            <li>
              <input
                type="checkbox"
                class="chose-all cos-all"
                @click="allCheck"
                :checked="checkAll"
              /> 全选
            </li>
            <li class="pro">产品</li>
            <li class="goods-color">色系</li>
            <li>单价</li>
            <li>数量</li>
            <li>总价</li>
          </ul>
        </div>
        <div class="goodsBox">
          <div class="shop-car-goods" v-for="(item,index) in shoppingCartData" :key="index">
            <ul class="shop-car-goods-list">
              <li>
                <div class="left">
                  <input
                    type="checkbox"
                    class="chose-all i-chose-this"
                    @click="checked(index)"
                    :checked="item.checked"
                  />
                  <div class="shop-car-goods-img">
                    <img :src="item.imgUrl" alt="图片加载中" />
                  </div>
                  <div class="shop-car-goods-des">
                    <span>{{item.title}}</span>
                  </div>
                  <div class="shop-car-color">
                    <span>#999</span>
                  </div>
                </div>
                <div class="right">
                  <span class="single-price">￥ {{item.goodsPrice}}</span>
                  <div class="goods-amount">
                    <input type="text" readonly :value="item.number" />
                  </div>
                  <div class="delete-goods">
                    <span class="abc">￥ {{item.goodsPrice*item.number}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="delete-all">
          <el-button class="delete-box" :plain="true" @click="remove()">删除</el-button>
        </div>
      </div>
      <!-- 订单总价部分 -->
      <div class="goods-total">
        <h3>订单总结</h3>
        <div class="toBuy" @click="toOrderForm()">立即结算</div>
        <div class="total-message">
          <div class="goods-price">
            <span>商品价格</span>
            <b class="all-total">￥ {{allGoodsPrice}}</b>
          </div>
          <div class="on-sale">
            <span>优惠价格</span>
            <b>￥ 0</b>
          </div>
          <div class="freight">
            <span>运费</span>
            <b>￥ 0</b>
          </div>
        </div>
        <div class="total-price">
          <span>总价</span>
          <b class="all-total">￥ {{allGoodsPrice}}</b>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
let Base64 = require("js-base64").Base64;
export default {
  name: "ShoppingCart",
  data() {
    return {
      isData: true,
      shoppingCartData: [],
      checkedGoods: [],
      checkAll: false,
      allGoodsPrice: 0
    };
  },
  created() {
    //判断是否登录
    let userToken = localStorage.getItem("token");
    let userPhone = localStorage.getItem("userPhone");
    if (!userToken) {
      this.$message({
        showClose: true,
        message: "请先登录",
        type: "error",
        offset: 100,
        center: true
      });
      this.$router.push({ path: "/login" });
    }
    this.$axios
      .get(`/shoppingCart/shoppingGoods?userPhone=${userPhone}`)
      .then(res => {
        this.shoppingCartData = res.data.data;
        console.log(this.shoppingCartData, "");
        if (this.shoppingCartData.length != 0) {
          this.isData = false;
        }
      });
    // 判断商品是否删除成功
    let a = localStorage.getItem("isDelete");
    if (a == "true") {
      this.$message({
        showClose: true,
        message: "删除成功",
        type: "success",
        offset: 100,
        center: true
      });
      localStorage.removeItem("isDelete");
    }
  },
  methods: {
    // 单选购物车商品
    checked(index) {
      this.shoppingCartData[index].checked = !this.shoppingCartData[index]
        .checked;
      var goods = this.shoppingCartData.filter(it => it.checked);
      this.checkedGoods = goods;
      this.allPrice();
    },
    // 全选购物车商品
    allCheck() {
      var flag = !this.checkAll;
      this.checkAll = flag;
      this.shoppingCartData.forEach(it => {
        it.checked = flag;
      });
      var goods2 = this.shoppingCartData.filter(it => it.checked);
      this.checkedGoods = goods2;
      this.allPrice();
    },
    //删除商品
    remove() {
      let userPhone = localStorage.getItem("userPhone");
      this.checkedGoods.forEach(e => {
        this.$axios
          .post(`/shoppingCart/delete`, {
            cartId: e.cartId,
            userPhone: userPhone
          })
          .then(res => {
            if (res.data.code == 200) {
              localStorage.setItem("isDelete", "true");
              location.reload();
            }
          });
      });
    },
    //计算选中商品的总价
    allPrice() {
      let price = 0;
      let checkedItem = this.checkedGoods;
      for (var i = 0; i < checkedItem.length; i++) {
        price += parseInt(checkedItem[i].goodsPrice) * checkedItem[i].number;
      }
      this.allGoodsPrice = price;
    },
    //去结算
    toOrderForm() {
      if (this.allGoodsPrice != 0) {
        let allGoodsPrice = Base64.encode(this.allGoodsPrice);
        this.$router.push({
          path: `/orderForm?p=${allGoodsPrice}`
        });
      } else {
        this.$message({
          showClose: true,
          message: "请勾选商品",
          type: "error",
          offset: 100,
          center: true
        });
      }
    }
  }
};
</script>
<style lang="less">
.shop-car-user {
  height: 60px;
  font-size: 18px;
}

.cont {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  .goods-detail {
    width: 75%;
    min-height: 400px;

    .shop-car-goods-nav {
      ul {
        display: flex;
        justify-content: space-between;
        background: #a30003;
        color: white;
        font-size: 16px;
        line-height: 40px;
        padding-left: 10px;
        padding-right: 10px;
        li {
          list-style: none;
        }

        .goods-color {
          padding-left: 20px;
        }
      }
    }
    .chose-all {
      background: #fff;
      border: #999 solid 1px;
      min-height: 12px;
      min-width: 12px;
      appearance: none;

      &:checked {
        background: #a30003;
      }
    }
    .goodsBox {
      min-height: 350px;
      .shop-car-goods {
        width: 100%;

        ul {
          li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #f2f2f2;
            margin-top: 20px;
            padding: 10px;
            border-bottom: 1px solid #e8e8e8;
            padding-left: 10px;
            margin-bottom: 20px;

            .left {
              width: 49%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              .shop-car-goods-img {
                // outline: 1px solid red;
                width: 125px;
                height: 125px;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
            }

            .right {
              width: 38%;
              display: flex;
              justify-content: space-between;
              height: 138px;
              align-items: center;
            }

            .shop-car-goods-des {
              width: 40%;
              font-size: 14px;
              margin-right: 25px;
            }

            .goods-amount {
              width: 18%;
              padding-left: 10px;

              input {
                width: 15px;
                outline: none;
                border: none;
                background: #f2f2f2;
                box-sizing: border-box;
              }
            }

            .delete-goods {
              position: relative;
              height: 70px;
              margin-top: 48px;
            }
          }
        }
      }
    }
  }

  .goods-total {
    width: 20%;
    background: #f2f2f2;
    padding: 20px;
    box-sizing: border-box;
    height: 300px;
    margin-bottom: 60px;

    h3 {
      text-align: center;
      margin-bottom: 30px;
      font-weight: 500;
    }

    .toBuy {
      display: block;
      width: 90%;
      line-height: 35px;
      text-align: center;
      margin: auto;
      background: #a30003;
      color: white;
      font-size: 12px;

      &:hover {
        background: white;
        color: black;
        outline: 1px solid black;
      }
    }

    .total-message {
      width: 90%;
      margin: auto;
      margin-top: 20px;
      font-size: 13px;

      div {
        width: 100%;
        display: flex;
        justify-content: space-between;
        line-height: 35px;
      }

      .freight {
        border-bottom: 1px solid white;
      }
    }

    .total-price {
      font-size: 13px;
      margin: auto;
      width: 90%;
      display: flex;
      justify-content: space-between;
      line-height: 50px;
    }
  }
}

.pro {
  box-sizing: border-box;
  padding-left: 70px;
}
.epmty-shop-car {
  width: 0%;
  margin: auto;
}

.delete-all {
  position: relative;
  background: #a30003;
  color: white;
  font-size: 16px;
  text-align: right;
  .delete-box {
    cursor: pointer;
    display: inline-block;
    right: 10px;
    width: 100px;
    background: black;
    text-align: center;
  }
}
</style>