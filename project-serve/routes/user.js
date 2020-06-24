// nodeJS => 模块化导入 require();
//        => 模块化导出 module.exports 

// 1. 获取router实例
const router = require("express").Router();
const fs = require('fs');
const getConnection = require("../dbConfig.js");
// 引入jwt token工具
const JwtUtil = require('../jwt.js');
const multer = require('multer');
const {
    host,
    port
} = require('../http');
// 2. 处理路由
//查询用户信息
router.post("/userData", (req, res) => {
    console.log(`「查询用户信息接口」被调用...`);
    let {
        userPhone
    } = req.body;
    if (!userPhone) {
        res.send({
            code: 204,
            data: "请求参数有误"
        });
        return false;
    }
    const db = getConnection();
    const sql = `SELECT * FROM users WHERE userPhone = ${userPhone}`;
    db.connect();
    db.query(sql, (err, sqlRes) => {
        if (err) {
            console.log("GET_USERDATA_ERROR=>", err.message);
            res.send({
                code: 500,
                data: "服务器异常"
            })
        } else {
            let data = sqlRes[0];
            delete data.userPassword;
            // 拼接资源地址
            sqlRes = sqlRes.map(item => {
                if (item.userPhoto != 'undefined') {
                    item.userPhoto = `http://${host}${port === "80" ? "" : ":" + port }/images/usersPhoto/${item.userPhoto}`;
                }
                return item;
            });
            res.send({
                code: 200,
                data
            });
        }
    });
    db.end();

});
//修改用户信息
router.post("/setUserMessage", (req, res) => {
    console.log("「修改用户信息接口」被调用...");
    let {
        userPhone,
        userName,
        userPassword,
        userAddress
    } = req.body;
    // 判断是否正确传递参数
    if (!userPhone) {
        res.send({
            code: 204,
            data: "请求参数有误"
        });
        return false;
    };
    const db = getConnection();
    let sql = "";
    if (userPassword) {
        sql = `UPDATE users SET userName='${userName}',userPassword='${userPassword}',userAddress='${userAddress}' WHERE userPhone = ${userPhone}`;
    } else {
        sql = `UPDATE users SET userName='${userName}',userAddress='${userAddress}'  WHERE userPhone = ${userPhone}`;
    }
    db.connect();
    db.query(sql, (err, sqlRes) => {
        if (err) {
            console.log("SETUSERMESSAGE__ERROR=>", err.message);
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

//接收图片上传
router.post('/upload', multer({
    //设置文件存储路径
    dest: './www/images/usersPhoto/'
}).array('file', 1), function (req, res) {
    console.log("「图片接口」被调用...");
    let userPhone = req.body.userPhone;
    let files = req.files;
    let file = files[0];
    let fileInfo = {};
    let path = './www/images/usersPhoto/' + file.originalname;
    let imgName = file.originalname
    fs.renameSync('./www/images/usersPhoto/' + file.filename, path);
    //获取文件基本信息
    fileInfo.type = file.mimetype;
    fileInfo.name = file.originalname;
    fileInfo.size = file.size;
    fileInfo.path = path;
    const db = getConnection();
    const sql = `UPDATE users SET userPhoto='${imgName}' WHERE userPhone = ${userPhone}`
    db.connect();
    db.query(sql, (err, sqlRes) => {
        if (err) {
            console.log("UPLOAD_ERROR=>", err.message);
            res.send({
                code: 500,
                data: "服务器异常"
            })
        } else {
            res.send({
                code: 200,
                data: "上传成功"
            });
        }
    });
    db.end();
});

// => 登陆
router.post("/login", (req, res) => {
    console.log("「登陆接口」被调用...");
    // 解构参数
    let {
        userPhone,
        userPassword
    } = req.body;
    if (!userPhone || !userPassword) {
        res.send({
            code: 204,
            data: "请求参数有误"
        });
        return false;
    }
    // 数据库操作
    const db = getConnection();
    const sql = `SELECT * FROM users WHERE userPhone = '${userPhone}'`;
    db.connect();
    db.query(sql, (err, sqlRes) => {
        if (err) {
            console.log("LOGIN_ERROR=>: ", err.message);
            res.send({
                code: 500,
                data: "服务器异常"
            })
        } else if (sqlRes.length === 0) {
            res.send({
                code: 201,
                data: "用户不存在"
            });
        } else {
            let user = sqlRes[0];
            if (user.userPhone == userPhone && user.userPassword == userPassword) {
                delete user.userPassword;
                // 登陆成功，添加token验证
                let _user = user.toString();
                // 将用户id传入并生成token
                let jwt = new JwtUtil(_user);
                let token = jwt.generateToken();
                // 将 token 返回给客户端
                res.send({
                    code: 200,
                    msg: '登陆成功',
                    token: token,
                    userPhone: user.userPhone
                });
            } else if (user.userPhone != userPhone) {
                res.send({
                    code: 201,
                    data: "账户名错误"
                });
            } else if (user.userPassword != userPassword) {
                res.send({
                    code: 201,
                    data: "密码错误"
                });
            }
        }
    });
    db.end();
});

// => 注册
router.post("/register", (req, res) => {
    console.log("「注册接口」被调用...");
    // 解构参数
    let {
        userPhone,
        userPassword,
        userName,
        userAddress,
        userPhoto
    } = req.body;
    // 判断是否正确传递参数
    if (!userPhone || !userPassword) {
        res.send({
            code: 204,
            data: "请求参数有误"
        });
        return false;
    }
    // 数据库操作
    const db = getConnection();
    const sql = `INSERT INTO users VALUES('${userPhone}', '${userPassword}','${userName}','${userAddress}','${userPhoto}')`;
    db.connect();
    db.query(sql, (err, sqlRes) => {
        if (err) {
            console.log("REGISTER_ERROR=>: ", err.message);
            switch (err.errno) {
                case 1062: {
                    res.send({
                        code: 202,
                        data: "用户已存在"
                    })
                }
                break;
            default: {
                res.send({
                    code: 500,
                    data: "服务器异常"
                })
            }
            }
        } else {
            res.send({
                code: 200,
                msg: '注册成功'
            });
        }
    });
    db.end();
});

// 3. 导出路由
module.exports = router;