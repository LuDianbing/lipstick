import Vue from "vue";
import Router from "vue-router";

import Home from "../pages/home.vue";
import Login from "../pages/login.vue";
import ProductList from "../pages/productList.vue";
import About from "../pages/about.vue";
import Register from "../pages/register.vue";
import GoodsDetails from "../pages/goodsDetails.vue";
import Activity from "../pages/activity.vue";
import ShoppingCart from "../pages/shoppingCart.vue";
import OrderForm from "../pages/orderForm.vue";
import Mine from "../pages/mine.vue";

Vue.use(Router);

// 导出路由配置
export default new Router({
  mode: "history",
  routes: [{
      path: "/", // => 设置路径
      name: "Home", // => 主页
      component: Home
    },
    {
      path: "/login", // => 设置路径
      name: "Login", // => 登录页
      component: Login
    },
    {
      path: "/register", // => 设置路径
      name: "Register", // => 注册页
      component: Register
    },
    {
      path: "/productList", // => 设置路径
      name: "ProductList", // => 商品分类页
      component: ProductList
    },
    {
      path: "/about", // => 设置路径
      name: "About", // => 关于公司页
      component: About
    },
    {
      path: "/goodsDetails", // => 设置路径
      name: "GoodsDetails", // => 商品详情页
      component: GoodsDetails
    },
    {
      path: "/activity", // => 设置路径
      name: "Activity", // => 秒杀活动页
      component: Activity
    },
    {
      path: "/shoppingCart", // => 设置路径
      name: "ShoppingCart", // => 购物车页
      component: ShoppingCart
    },
    {
      path: "/orderForm", // => 设置路径
      name: "OrderForm", // => 结算页
      component: OrderForm
    },
    {
      path: "/mine", // => 设置路径
      name: "Mine", // => 我的信息页
      component: Mine
    }
  ]
});