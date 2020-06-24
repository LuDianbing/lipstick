<template>
  <div class="mine container">
    <div class="container">
      <div class="userPhoto">
        <el-upload
          class="upload-demo"
          action="http://127.0.0.1:8081/user/upload/"
          :on-success="uploadSuccess"
          :before-upload="uploadBefore"
          :data="uploadData()"
        >
          <el-button size="small" type="primary">
            <img
              v-if="this.userData.userPhoto=='undefined'"
              src="../assets/userPhoto.png"
              alt="用户头像"
            />
            <img v-else :src="userData.userPhoto" alt="用户头像" />
          </el-button>
        </el-upload>
      </div>
      <div class="center">
        <el-tabs tabPosition="left">
          <el-tab-pane label="我的信息">
            <div class="myMessage">
              <div class="title">个人中心</div>
              <div class="userName comment">
                <div
                  v-if="this.userData.userName=='undefined'||this.userData.userName==''"
                  class="name"
                >用户 {{userData.userPhone}}</div>
                <div v-else class="name">姓名 ： {{userData.userName}}</div>
              </div>
              <div class="userPhone comment">
                <div class="phone">电话 ：{{userData.userPhone}}</div>
              </div>
              <div class="userAddress comment">
                <div
                  v-if="this.userData.userAddress=='undefined'||this.userData.userAddress==''"
                  class="address"
                >收货地址 ： 请前去填写</div>
                <div v-else class="address">收货地址 ：{{userData.userAddress}}</div>
              </div>
              <div class="setMessageBox">
                <div></div>
                <div class="setMessage" @click="toSetMessage()">修改信息</div>
              </div>
              <div v-if="isToSetMessage==true" class="new-add">
                <section>
                  <div>
                    <p>姓名</p>
                    <input type="text" v-model="userName" />
                  </div>
                </section>
                <section>
                  <div>
                    <p>密码</p>
                    <input type="password" v-model="userPassword" />
                  </div>
                </section>
                <section>
                  <div class="my-address">
                    <p>地址</p>
                    <input type="text" v-model="userAddress" />
                  </div>
                </section>
                <div class="add-btn" @click="setMessageSuccess()">确认并保存</div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "mine",
  data() {
    return {
      userData: [],
      isToSetMessage: false,
      userName: "",
      userPassword: "",
      userAddress: "",
      localPhone: ""
    };
  },
  created() {
    let userToken = localStorage.getItem("token");
    let userPhone = localStorage.getItem("userPhone");
    this.localPhone = userPhone;
    // 是否有用户登录
    if (userToken) {
      // 获取用户信息
      this.$axios
        .post("/user/userData", {
          userPhone: userPhone
        })
        .then(res => {
          console.log(res, "");
          this.userData = res.data.data;
        });
    }
  },
  methods: {
    //是否有点击修改
    toSetMessage() {
      this.isToSetMessage = true;
    },
    //修改用户信息
    setMessageSuccess() {
      this.isToSetMessage = false;
      this.$axios
        .post("/user/setUserMessage", {
          userName: this.userName,
          userPassword: this.userPassword,
          userPhone: this.localPhone,
          userAddress: this.userAddress
        })
        .then(res => {
          if (res.data.code == 200) {
            this.isToSetMessage = false;
            location.reload();
          }
        });
    },
    // 上传指定用户的头像信息，用电话号码区分
    uploadData() {
      let userPhone = localStorage.getItem("userPhone");
      let uploadData = { userPhone: userPhone };
      return uploadData;
    },
    // 上传头像成功做的操作
    uploadSuccess(res) {
      console.log(res, "");
      location.reload();
    },
    // 上传用户头像之前判断图片大小
    uploadBefore(file) {
      let limitMax = 5000 * 1024;
      if (file.size > limitMax) {
        this.$messageTips("大小超出限制");
        return false;
      }
    }
  }
};
</script>
<style lang="less">
.userPhoto {
  text-align: center;
  margin: 50px 0;
  .upload-demo {
    .el-upload__input {
      display: none;
    }
    .el-button--primary {
      background: rgba(247, 244, 244, 1);
      border-color: rgba(247, 244, 244, 1);
      img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
      }
    }
    .el-upload-list {
      display: none;
    }
  }
}

.center {
  .myMessage {
    margin-left: 30px;
    .comment {
      margin: 20px 0;
      font-size: 18px;
    }
    .title {
      height: 42px;
      background-color: #a40000;
      color: white;
      font-size: 18px;
      line-height: 42px;
      padding: 0 10px;
    }
    .setMessageBox {
      display: flex;
      justify-content: space-between;
      .setMessage {
        cursor: pointer;
        margin: 10px 0;
        width: 100px;
        line-height: 40px;
        background: #a40000;
        color: white;
        text-align: center;
        &:hover {
          color: #333333;
        }
      }
    }
    .new-add {
      section {
        display: flex;
        justify-content: space-between;
        width: 800px;
        font-size: 16px;
        margin: 25px 0;

        p {
          margin: 10px 0;
        }

        input {
          width: 318px;
          height: 40px;
          border: 1px solid black;
          padding: 0 10px;
          box-sizing: border-box;
        }

        select {
          width: 200px;
          height: 40px;
          border: 1px solid black;
          outline: none;
        }

        .my-address {
          width: 100%;
          #my-add {
            width: 100%;
          }
        }
      }
      .add-btn {
        width: 120px;
        height: 46px;
        border-radius: 10px;
        background-color: #a40000;
        color: white;
        line-height: 46px;
        text-align: center;
        font-size: 14px;
        margin: 0 auto;
        cursor: pointer;
      }
    }
  }
}
</style>