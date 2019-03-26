var formidable = require('formidable');
var user = require("../models/user.js");
var crypto = require('crypto');
var gm = require("gm");
var url = require("url");
var shuoshuo = require("../models/shuoshuo.js");

exports.checkemail = function(req,res){

    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        var email = fields.email;
        user.find({"email":email},function(err,result){

            if(err){
                res.json({"result":-1})  //-1代表服务器错误
                return;
            }
            res.json({"result":result.length ==0})  //0 true代表email没有被占用

        })
    })
}
exports.doregist = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        var password = crypto.createHash('md5').update(fields.password).digest('hex');
        console.log("doregist的"+fields.email);
        var u = new user({
            "email":fields.email,
            "password":password,
            "nickname":"",
            "signature":"",
            "avatar":""
        })

        u.save(function(err,result){
            if(err){
                res.json({"result":-1});
                return
            }
            req.session.login =true;
            req.session.email = fields.email;
            req.session.avatar =""; //注册时候，头像信息是空的;
            res.json({"result":1});

        })
    })
}

exports.checklogin = function(req,res){
    if(req.session.login){
        res.json({"login":true,"email":req.session.email,"avatar":req.session.avatar || "/images/01.jpg"})
    }else {
        res.json({"login":false})
    }

}

exports.login = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){

        if(err){
            res.json({"result":-1});//-1服务错误
            return;
        }
        var password = crypto.createHash('md5').update(fields.password).digest('hex');
        user.find({"email":fields.email},function(err,result){
            if(err){
                res.json({"result":-1});//-1服务错误
                return;
            }
            if(result.length ==0 ){
                res.json({"result":-2})//用户名不存在
                return;
            }
            user.find({"password":password},function(err,result){
                if(err){
                    res.json({"result":-1});//-1服务错误
                    return;
                }
                if(result.length==0){
                    res.json({"result":-3})//密码不存在
                    return;
                }
                req.session.login = true;
                req.session.email = fields.email;
                req.session.avatar = result[0].avatar;
                res.json({"result":1});//登录成功
            })
        })

    })
}

exports.info = function(req,res){

    if(req.session.login){
        var email = req.session.email;
        console.log(req.session.email)
        user.find({"email":email},function(err,result){

            console.log(result.length);
            if(err){
                res.json({"result":-1});

                return
            }
            if(result.length == 1){
                res.json({
                    "email":email,
                    "nickname":result[0].nickname ||"",
                    "signature":result[0].signature || "这家伙很懒，什么都没有留下",
                    "avatar":result[0].avatar || "/images/01.jpg"
            })
            }
        })
    }
}

exports.upload = function(req,res){
    var form = new formidable.IncomingForm();
    form.uploadDir = "./www/upload";
    form.parse(req,function(err,fields,files){
        gm(files.file.path).size(function(err,size){
            if(err){
                console.log(err)
                return
            }
            if(size.width < 100 || size.height < 100){
                res.json({"result" : -2});		//-2表示尺寸不和规则
            }else{
                res.json(files);
            }
        });
    });

}

exports.cut = function(req,res){
    var w = url.parse(req.url,true).query.w;
    var h = url.parse(req.url,true).query.h;
    var x = url.parse(req.url,true).query.x;
    var y = url.parse(req.url,true).query.y;
    var myurl = url.parse(req.url,true).query.url;

    gm("./"+myurl).crop(w,h,x,y).resize(100,100,"!").write("./"+myurl,function(){
        res.json({"result":1});
    })
}

exports.xiugai = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        var email = fields.data.email;
        user.find({"email":email},function(err,result){
            if(err){
                res.json({"result":-1})//服务器出错
                return
            }
            if(result.length==1){

                var peo = result[0];
                peo.nickname = fields.data.nickname;
                peo.signature = fields.data.signature;
                peo.avatar = fields.data.avatar;
                req.session.avatar = fields.data.avatar;
                peo.save(function(err){
                    console.log(peo);
                    res.json({"result":1});
                })

            }
        })

    })
}

exports.fabu = function(req,res){

    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        var email = req.session.email;
        var content = fields.content;
        var data = new Date();

        var shuo = new shuoshuo({
            email:email,
            content:content,
            data:data
        });

        shuo.save(function(err){
            if(err){
                res.json({"result":-1})  //服务出错
                return
            }
            res.json({"result":1})  //成功
        })
    })
}

exports.getshuoshuo = function(req,res){

    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        var R =[];
        shuoshuo.find({},function(err,allresult){
            allresult.forEach(function(item){
                user.find({"email":item.email},function(err,result){
                    var u = result[0];
                    var e = {
                        email:item.email,
                        data:item.data,
                        content:item.content,
                        avatar: u.avatar || "/images/01.jpg",
                        signature: u.signature
                    };
                    R.push(e);
                    if(R.length == allresult.length){
                        res.json({"result":R});
                    }

                })
            })
        })

    })
}