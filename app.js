var express= require("express");
var mongoose = require("mongoose");
var session = require('express-session');
var user = require("./controllers/user.js")
mongoose.connect("mongodb://localhost/shuoshuo");
var app = express();


app.use(session({
    secret :  'mao', // 对session id 相关的cookie 进行签名
    resave : false,
    saveUninitialized: true, // 是否保存未初始化的会话
    cookie : {
        maxAge : 1000 * 60 * 10, // 设置 session 的有效时间，单位毫秒
    },
}));



//静态资源文件
app.use(express.static("www"));

//路由表
//检查email唯一
app.post("/checkemail",user.checkemail);
//进行注册
app.post("/user",user.doregist);
//检查是否已经登录
app.get("/checklogin",user.checklogin);
//登录操作
app.post("/login",user.login);
//信息修改接口
app.get("/info",user.info);
//上传头像接口
app.post("/upload",user.upload);
//裁切接口
app.get("/cut",user.cut);
//修改信息
app.post("/xiugai",user.xiugai);
//发布说说
app.post("/fabu",user.fabu);
//得到说说
app.get("/shuoshuo",user.getshuoshuo);
//404页面
app.use(function(req,res){
    res.send("你好，访问页面不存在");
})

app.listen(3000);