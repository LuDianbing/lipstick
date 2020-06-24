<template>
  <div class="page register">
    <div class="register-banner">
      <img src="../assets/registerBan.png" alt />
    </div>
    <div class="register-right">
      <div class="register-cont">
        <div class="register-logo">
          <p>注册</p>
        </div>
        <form>
          <!-- <section class="input-radio">
            <input type="radio" name="gender" class="gender" value="1" />先生 |
            <input type="radio" name="gender" class="gender" value="0" />女士
          </section> -->
          <section class="input-box" :class="{'err':phone}" data-tips="请输入正确电话号码">
            <input type="text" placeholder="请输入电话号码" v-model="userPhone" />
          </section>
          <!-- <section class="input-box" data-tips="*短信已发送，请注意查收。">
            <input type="text" data-reg placeholder="请输入验证码" />
            <div class="get-note">获取验证码</div>
            <div class="note">
              <span>60</span>s&nbsp;短信已发送
            </div>
          </section> -->
          <section class="input-box" :class="{'err':password}" data-tips="*密码由6-20位字母，数字和下划线组成">
            <input type="password" placeholder="密码由6-20位字母，数字和符号组成" v-model="userPassword" />
          </section>
          <section class="input-box" :class="{'err':rePassword}" data-tips="*密码输入不一致">
            <input type="password" placeholder="请再次输入密码" v-model="userRePassword" />
          </section>
          <div class="btn" @click="registerBtn">注册</div>
        </form>
        <div class="go-register">
          <router-link to="/login">已有账号？返回登陆!</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      phone: false,
      password: false,
      rePassword: false,
      userPhone: "",
      userPassword: "",
      userRePassword: ""
    };
  },
  methods: {
    registerBtn() {
      let userPhone = /^1[3-9]\d{9}$/;
      let userPassword = /^\w{6,20}$/;
      !userPhone.test(this.userPhone)
        ? (this.phone = true)
        : (this.phone = false);
      !userPassword.test(this.userPassword)
        ? (this.password = true)
        : (this.password = false);
      this.userPassword == this.userRePassword
        ? (this.rePassword = false)
        : (this.rePassword = true);

      if (
        userPhone.test(this.userPhone) &&
        userPassword.test(this.userPassword)
      ) {
        this.$axios
          .post("/user/register", {
            userPhone: this.userPhone,
            userPassword: this.userPassword
          })
          .then(res => {
            if (res.data.code == 200) {
              console.log(res, '')
              this.$message({
                showClose: true,
                message: "注册成功,请登录",
                type: "success",
                offset: 100,
                center: true
              });
              this.$router.push({ path: "/login" });
            } else {
              this.$message({
                showClose: true,
                message: res.data.data,
                type: "error",
                offset: 100,
                center: true
              });
            }
          });
      }
    }
  }
};
</script>

<style lang="less">
.register {
  width: 85%;
  margin: 0 auto;
  padding: 100px 0 50px;
  display: flex;
  justify-content: space-between;

  .register-banner {
    width: 350px;
    margin: auto;

    img {
      width: 100%;
    }
  }

  .register-right {
    width: 530px;
    border-left: 1px solid #cccccc;
    text-align: center;

    .register-cont {
      width: 70%;
      margin: 40px 100px;
      .register-logo {
        p {
          font-size: 40px;
          text-align: left;
        }
      }

      .input-radio {
        width: 418px;
        height: 15px;
        text-align: left;
        padding-top: 20px;
        input[type="radio"]:checked {
          background-color: #a30003;
        }
      }

      .input-box {
        width: 100%;
        height: 45px;
        position: relative;
        margin: 30px auto 0;
        border: 1px solid #cccccc;

        input {
          border: none;
          width: 100%;
          height: 100%;
          padding-left: 10px;
          box-sizing: border-box;
          font-size: 16px;
          letter-spacing: 2px;
        }

        .get-note {
          width: 158px;
          height: 37px;
          background-color: #a30003;
          color: white;
          position: absolute;
          right: 4px;
          top: 4px;
          line-height: 37px;
          cursor: pointer;
        }

        .note {
          width: 158px;
          height: 37px;
          background-color: #999999;
          position: absolute;
          right: 4px;
          top: 4px;
          line-height: 37px;
          cursor: pointer;
          display: none;
        }

        &::after {
          content: attr(data-tips);
          display: none;
          text-align: left;
          font-size: 12px;
          color: red;
          line-height: 25px;
        }

        &.err::after {
          display: block;
        }
      }
    }

    .btn {
      width: 50%;
      line-height: 38px;
      background-color: #a30003;
      color: white;
      margin: 47px auto 0;
      outline: none;
      cursor: pointer;
    }

    .go-register {
      width: 152px;
      height: 12px;
      margin: 40px auto 0;

      a {
        color: #b40c16;
        text-decoration: underline;
        font-size: 12px;
      }
    }
  }
}
</style>
