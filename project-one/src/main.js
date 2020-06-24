import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 导入bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Axios from "axios";
import "./assets/iconfont/iconfont.css";
//引入Element-ui组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false;
Vue.prototype.$axios = Axios;

Axios.defaults.baseURL = 'http://127.0.0.1:8081';


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");