<template>
  <div class="page container">
    <div class="login">
      <div class="login-banner">
        <img src="../assets/loginBan-df3d33.png" alt="登录" />
      </div>
      <div class="login-right">
        <div class="login-cont">
          <div class="login-logo">
            <p>登录</p>
          </div>
          <form>
            <section class="input-box" :class="{'err':phone}" data-tips="*请输入正确账户名称">
              <label>您的用户名/手机号：</label>
              <input type="text" placeholder="请输入账户名/电话" v-model="userPhone" />
            </section>
            <section class="input-box" :class="{'err':password}" data-tips="*密码由6-20位字母，数字和符号组成">
              <label>密码：</label>
              <input type="password" placeholder="请输入密码" v-model="userPassword" />
            </section>
            <div class="btn" @click="loginBtn">登陆</div>
          </form>
          <div class="go-register">
            <router-link to="/register">账号不存在？立即注册!</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      phone: false,
      password: false,
      userPhone: "",
      userPassword: ""
    };
  },
  methods: {
    loginBtn() {
      let userPhone = /^1[3-9]\d{9}$/;
      let userPassword = /^\w{6,20}$/;
      !userPhone.test(this.userPhone)
        ? (this.phone = true)
        : (this.phone = false);
      !userPassword.test(this.userPassword)
        ? (this.password = true)
        : (this.password = false);
      if (
        userPhone.test(this.userPhone) &&
        userPassword.test(this.userPassword)
      ) {
        this.$axios
          .post("/user/login", {
            userPhone: this.userPhone,
            userPassword: this.userPassword
          })
          .then(res => {
            console.log(res, "");
            if (res.data.code == 200) {
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("userPhone", res.data.userPhone);
              this.$message({
                showClose: true,
                message: "登录成功",
                type: "success",
                offset: 100,
                center: true
              });
              this.$router.push({ path: "/" });
              location.reload();
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
.login {
  width: 85%;
  margin: 0 auto;
  padding: 100px 0 50px;
  display: flex;
  justify-content: space-between;
  .login-banner {
    width: 350px;
    margin: auto;
    img {
      width: 100%;
    }
  }
  .login-right {
    width: 450px;
    margin: auto;
    border-left: 1px solid #cccccc;
    text-align: center;
    .login-cont {
      width: 80%;
      margin: 40px 100px;
      .login-logo {
        p {
          font-size: 40px;
          text-align: left;
        }
      }
      .input-box {
        width: 100%;
        height: 75px;
        margin: 25px auto 0;
        position: relative;
        label {
          display: inline-block;
          width: 100%;
          height: 20px;
          text-align: left;
          margin-bottom: 10px;
        }
        input {
          width: 100%;
          height: 45px;
          border: 1px solid #cccccc;
          padding-left: 10px;
          box-sizing: border-box;
          font-size: 16px;
          letter-spacing: 2px;
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
      background-color: #bd2e23;
      color: white;
      margin: 50px auto 0;
      outline: none;
      cursor: pointer;
    }
    .go-register {
      width: 152px;
      height: 12px;
      margin: 50px auto;
      a {
        color: #b40c16;
        text-decoration: underline;
        font-size: 12px;
      }
    }
  }
}
</style>
