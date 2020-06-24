<template>
  <div class="goodsCard">
    <div
      v-for="(item) in cardData"
      :key="item.id"
      class="goods"
      @click="toGoodsDetails(item.id,item.type)"
    >
      <span class="newProduct"></span>
      <img :src="item.imgUrl" alt="图片加载中" />
      <p>{{item.title}}</p>
      <p>{{item.introduction}}</p>
      <div v-if="isNewPrice" class="priceBox">
        <div class="oldPrice">
          <span v-if="isShow">{{lastData}}</span>
          <span v-else>￥ {{item.newPrice}}</span>
        </div>
        <span class="newPrice">￥{{item.price}}</span>
      </div>
      <div v-else class="priceBox">
        <div class="oldPrice">
          <span v-if="isShow">{{lastData}}</span>
          <span v-else>￥ {{item.price}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "goodsCard",
  data() {
    return {};
  },
  props: {
    cardData: {
      type: Array,
      default: null
    },
    lastData: {
      type: String || Array,
      default: null
    },
    isShow: {
      type: Boolean,
      default: true
    },
    isNewPrice: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toGoodsDetails(id, type) {
      this.$router.push({ path: `/goodsDetails?id=${id}&type=${type}` });
    }
  }
};
</script>

<style lang="less">
.goodsCard {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  .goods {
    width: 237px;
    height: 302px;
    margin: 24px;
    cursor: pointer;
    text-align: center;
    transition: all 0.5s;
    position: relative;

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0px 6px 8px 0px rgba(35, 24, 21, 0.34);
    }

    .newProduct {
      display: block;
      width: 56px;
      position: absolute;
      top: 0;
      right: 0;
      font-size: 12px;
      background: rgba(184, 12, 24, 1);
      border-radius: 2px;
      color: rgba(255, 255, 255, 1);
    }

    img {
      margin-top: 8px;
      width: 80%;
    }

    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;

      &:nth-child(3) {
        margin-top: 6px;
        padding: 0 5px;
        font-size: 18px;
      }

      &:nth-child(4) {
        margin-top: 6px;
        font-size: 14px;
        color: rgba(155, 155, 155, 1);
      }
    }
    .priceBox {
      display: flex;
      justify-content: center;
      flex-wrap: nowrap;
      box-sizing: border-box;
      height: 20px;
      .oldPrice {
        font-size: 16px;
        width: 77px;
        background: rgba(184, 12, 24, 1);
        border-radius: 3px 3px 3px 3px;
        color: rgba(255, 255, 255, 1);
      }
      .newPrice {
        margin-left: 10px;
        font-size: 14px;
        padding-top: 4px;
        text-decoration: line-through;
      }
    }
  }
}
</style>