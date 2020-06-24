// 1. 获取router实例
const router = require("express").Router();
const getConnection = require("../dbConfig.js");
const {
    host,
    port
} = require('../http');
// 2. 处理路由
// => 查询商品
router.get("/goods", (req, res) => {
    console.log(`「查询商品接口」被调用...`);
    const db = getConnection();
    const sql = `SELECT * FROM goods`;
    db.connect();
    db.query(sql, (err, sqlRes) => {
        if (err) {
            console.log("GET_GOODS_ERROR=>", err.message);
            res.send({
                code: 500,
                data: "服务器异常"
            })
        } else {
            // 拼接资源地址
            sqlRes = sqlRes.map(item => {
                item.imgUrl = `http://${host}${port === "80" ? "" : ":" + port }/images/${item.type}/${item.imgUrl}`;
                item.littleImg = (item.littleImg || "").split(",");
                item.littleImg.forEach((e, index) => {
                    item.littleImg[index] = `http://${host}${port === "80" ? "" : ":" + port }/images/${item.type}/littleImg/${e}`;
                });
                item.details = `http://${host}${port === "80" ? "" : ":" + port }/images/${item.type}/littleImg/${item.details}`;
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
// => 搜索商品
router.post("/search", (req, res) => {
    console.log(`「搜索接口」被调用...`);
    let {
        title
    } = req.body;
    if (!req.body) {
        res.send({
            code: 204,
            data: "请求参数有误"
        });
        return false;
    };
    const db = getConnection();
    const sql = `SELECT * FROM goods WHERE title regexp "${title}"`;
    db.connect();
    db.query(sql, (err, sqlRes) => {
        if (err) {
            console.log("SEARCH_GOODS_ERROR=>", err.message);
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

// 3. 导出路由
module.exports = router;