// 1. 获取router实例
const router = require("express").Router();
const getConnection = require("../dbConfig.js");
const {
    host,
    port
} = require('../http');
// 2. 处理路由
// => 查询购物车商品
router.get(`/shoppingGoods`, (req, res) => {
    console.log(`「查询购物车商品接口」被调用...`);
    let {
        userPhone
    } = req.query;
    const db = getConnection();
    let sql = `SELECT * FROM shoppingCart WHERE userPhone = ${userPhone}`;
    db.connect();
    db.query(sql, (err, sqlRes) => {
        if (err) {
            console.log("GET_SHOPPINGCART_ERROR=>", err.message);
            res.send({
                code: 500,
                data: "服务器异常"
            })
        } else {
            // 拼接资源地址
            sqlRes = sqlRes.map(item => {
                item.imgUrl = `http://${host}${port === "80" ? "" : ":" + port }/images/${item.type}/${item.imgUrl}`;
                return item;
            });
            let data = sqlRes;
            res.send({
                code: 200,
                data
            });
        }
    });
    db.end();

});
// => 添加商品到购物车
router.post("/add", (req, res) => {
    console.log("「添加商品接口」被调用...");
    let {
        carId,
        imgUrl,
        title,
        goodsPrice,
        introduction,
        type,
        number,
        userPhone
    } = req.body;
    if (!req.body) {
        res.send({
            code: 204,
            data: "请求参数有误"
        });
        return false;
    };
    const db = getConnection();
    const sql = `INSERT INTO shoppingcart VALUES('${carId}', '${imgUrl}','${title}','${goodsPrice}','${introduction}','${type}','${number}','${userPhone}')`;
    db.connect();
    db.query(sql, (err, sqlRes) => {
        if (err) {
            console.log("ADD_SHOPPINGCART_ERROR=>", err.message);
            res.send({
                code: 500,
                data: "服务器异常"
            })
        } else {
            res.send({
                code: 200,
                data: "添加成功"
            });
        }
    });
    db.end();
});
// => 删除购物车商品
router.post("/delete", (req, res) => {
    console.log("「删除购物车商品接口」被调用...");
    let {
        cartId,
        userPhone
    } = req.body;
    if (!cartId) {
        res.send({
            code: 204,
            data: "请求参数有误"
        });
        return false;
    };
    const db = getConnection();
    const sql = `DELETE FROM shoppingcart WHERE cartId = ${cartId} AND userPhone = ${userPhone}`;
    db.connect();
    db.query(sql, (err, sqlRes) => {
        if (err) {
            console.log("DELETE_SHOPPINGCART_ERROR=>", err.message);
            res.send({
                code: 500,
                data: "服务器异常"
            })
        } else {
            res.send({
                code: 200,
                data: "删除成功"
            });
        }
    });
    db.end();
});


// 3. 导出路由
module.exports = router;