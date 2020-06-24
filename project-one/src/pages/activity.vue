<template>
  <div class="page">
    <div class="image">
      <img src="../assets/activityBan.png" alt />
    </div>

    <div class="activity">
      <div class="activity-list container">
        <div class="time">
          <p>{{activityDate}}</p>
        </div>
        <div class="con">
          <div class="count-down">
            <div class="box">
              <div class="hours">{{hours}}</div>
            </div>
            <span>:</span>
            <div class="box">
              <div class="minutes">{{minutes}}</div>
            </div>
            <span>:</span>
            <div class="box">
              <div class="seconds">{{seconds}}</div>
            </div>
          </div>
          <div class="commodity">
            <goodsCard :cardData="skillGoods" :isShow="false" :isNewPrice="true"></goodsCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import goodsCard from "../../components/goodsCard";
export default {
  name: "Activity",
  data() {
    return {
      skillGoods: [],
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
        if (e.newPrice != 0) {
          // 将满足条件的结果放到一个数组中
          this.skillGoods = this.skillGoods.concat(e);
        }
      });
    });
  },
  methods: {
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
.image {
  width: 100%;
  img {
    width: 100%;
  }
}
.activity {
  padding-bottom: 80px;
  .time {
    width: 100%;
    text-align: center;
    background-color: #b80c18;
    margin: 40px 0 0 0;
    line-height: 65px;
    font-size: 30px;
    font-weight: 400;
    color: white;
  }
  .con {
    .count-down {
      height: 60px;
      text-align: center;
      font-size: 25px;
      margin: 0 0 15px 0;
      padding: 5px 0;
      background-color: #b80c18;
      .box {
        display: inline-block;
        width: 50px;
        line-height: 50px;
        background-color: white;
        color: black;
      }
      span {
        color: white;
      }
    }
    .commodity {
      width: 1200px;
      padding: 10px 10px 0;
      box-sizing: border-box;
      text-align: center;
      display: flex;
      justify-content: space-between;
      margin: 0 0 100px 0;
      .comm-box {
        width: 24%;
        transition: all 0.5s;
        background-color: #f9f5f5;
        .images {
          width: 90%;
          text-align: center;
          margin: 0 auto;
          padding: 15px 0;
          img {
            width: 100%;
            height: 100%;
          }
        }
        p {
          font-size: 15px;
          font-weight: 600;
          width: 80%;
          margin: 0 auto;
          height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .old-price {
          font-size: 15px;
          margin: 10px 0 5px;
          color: #999999;
          text-decoration: line-through #b53236;
        }
        .now-price {
          font-size: 20px;
          color: #b53236;
        }
        .buy-now {
          width: 50%;
          height: 30px;
          background-color: #b53236;
          color: white;
          margin: 10px auto 0;
          line-height: 30px;
          border-radius: 10px;
          margin-bottom: 10px;
          cursor: pointer;
        }
        .hidden-buy {
          background-color: #666666;
        }
        &:hover {
          transform: translateY(-10px);
          box-shadow: 0px 6px 8px 0px rgba(35, 24, 21, 0.34);
        }
      }
    }
  }
}
</style>