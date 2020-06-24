<template>
  <div class="page">
    <!-- banner2 -->
    <div class="top_banner">
      <img src="http://127.0.0.1:8081/images/banner2.png" alt="图片加载中" />
    </div>

    <!-- 筛选 -->
    <div class="filtrate container">
      <div class="filtrate_all">
        <div class="filtrate_moisten filtrateBox">
          <p>滋润度</p>
          <div class="sqaure commen">
            <span>哑光</span>
            <input type="checkbox" />
          </div>
          <div class="sqaure commen">
            <span>滋润</span>
            <input type="checkbox" />
          </div>
          <div class="sqaure commen">
            <span>雾面</span>
            <input type="checkbox" />
          </div>
          <div class="sqaure commen">
            <span>镜面</span>
            <input type="checkbox" />
          </div>
        </div>
        <div class="filtrate_color filtrateBox">
          <span>色号</span>
          <div class="color_shell commen">
            <div class="color_change red"></div>
            <input type="checkbox" />
          </div>
          <div class="color_shell commen">
            <div class="color_change blue"></div>
            <input type="checkbox" />
          </div>
          <div class="color_shell commen">
            <div class="color_change yellow"></div>
            <input type="checkbox" />
          </div>
        </div>
        <div class="filtrate_others">
          <div class="full">
            <div class="filtrate_price com">
              <p>价格</p>
              <select v-model="selected" @click="toSeleted(selected)">
                <option v-for="(item,index) in selectedData" :key="index">{{item}}</option>
              </select>
            </div>
            <div class="filtrate_sell com">
              <p>销量</p>
            </div>
            <div class="filtrate_new_product com">
              <p>收藏</p>
            </div>
          </div>
        </div>
        <div class="blank"></div>
      </div>
    </div>

    <!-- 商品列表 -->
    <div class="mid_contanier container">
      <goodsCard :cardData="testData" :isShow="false"></goodsCard>
    </div>
  </div>
</template>

<script>
import goodsCard from "../../components/goodsCard";
export default {
  name: "ProductList",
  data() {
    return {
      testData: [],
      goodsRouter: [
        "lipstick",
        "lipgloss",
        "lipglaze",
        "lipprotector",
        "lipliner",
        "lipcolorplate"
      ],
      selectedData: ["从高到低", "从低到高"],
      selected: ""
    };
  },
  components: {
    goodsCard
  },
  created() {
    // 主页点击商品类别进入商品列表页并渲染对应的数据
    this.$axios.get("/goods").then(res => {
      console.log(res.data.data, '')
      let goodsData = res.data.data;
      goodsData.forEach(e => {
        if (this.$route.query.type == e.type) {
          this.testData = this.testData.concat(e);
        }
      });
    });
    // 获取搜索成功后保存在本地的数据
    if (this.$route.query.type == "search") {
      this.testData = JSON.parse(localStorage.getItem("searchSuccessData"));
      localStorage.removeItem("searchSuccessData");
    }
  },
  watch: {
    $route(val) {
      this.$axios.get("/goods").then(res => {
        let goodsData = res.data.data;
        goodsData.forEach(e => {
          if (val.query.type == e.type) {
            this.testData = this.testData.concat(e);
            location.reload();
          }
        });
      });
    }
  },
  methods: {
    toSeleted(selected) {
      if (selected == "从高到低") {
        this.testData.sort((a, b) => {
          return b["price"] - a["price"];
        });
      } else if (selected == "从低到高") {
        this.testData.sort((a, b) => {
          return a["price"] - b["price"];
        });
      }
    }
  }
};
</script>

<style lang="less">
.top_banner {
  width: 100%;

  img {
    width: 100%;
  }
}

.filtrate {
  height: 30px;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  background: rgb(219, 216, 216);
  padding-right: 5px;
  box-sizing: border-box;

  .filtrate_all {
    width: 75%;
    display: flex;
    justify-content: space-between;

    .filtrateBox {
      display: flex;
      justify-content: space-around;
      background: rgb(219, 216, 216);
      p {
        line-height: 160%;
        width: 60px;
        text-align: center;
        border-right: 1px solid white;
      }
      .commen {
        display: flex;
        justify-content: space-around;
        align-items: center;
        border-right: 1px solid white;
        input {
          cursor: pointer;
          background: #fff;
          border: #999 solid 1px;
          min-height: 12px;
          min-width: 12px;
          appearance: none;
          &:checked {
            background: #a30003;
          }
        }
      }
    }
    .filtrate_moisten {
      width: 35%;
      line-height: 40px;
      padding-left: 4px;

      .sqaure {
        width: 70px;
        font-size: 14px;
      }
    }

    .filtrate_color {
      width: 35%;
      height: 100%;

      .red {
        background: #c54f1a;
      }

      .blue {
        background: #d6003d;
      }

      .yellow {
        background: #a30003;
      }

      .color_shell {
        width: 25%;
        height: 100%;

        .color_change {
          height: 20px;
          width: 30px;
        }
      }
    }

    .filtrate_others {
      width: 35%;
      height: 100%;
      display: flex;
      justify-content: space-between;

      .full {
        width: 50%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .com {
          height: 100%;
          display: flex;
          justify-content: space-around;
          font-size: 14px;
          background: rgb(219, 216, 216);
          border-right: 1px solid white;
          p {
            width: 28px;
            line-height: 30px;
            margin: 0 10px;
          }
          select {
            cursor: pointer;
          }
        }
      }
    }
  }
}
.mid_contanier {
  margin-top: 30px;
}
</style>
