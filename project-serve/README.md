# 如何设计接口？ restfulAPI
GET /orders
GET /articles/news/published 不可取
GET /articles?type=news&published=true
POST /login

# 模块化设置路由？
- 用户接口 user
> 登录接口：POST /login
参数1 => username:string required
参数2 => password:string required

> 注册接口：POST /register
参数1 => username:string required
参数2 => password:string required
参数3 => tel: string options


- 订单接口 order
> 增 POST /order/add
> 删 GET  /order/delete
> 查 GET  /order/query
> 改 POST /order/modify

# 小程序上线对于文件包大小的要求是不超过2M
所以我们在做小程序开发的时候需要将图片
存储在服务器上，不能存在本地。
