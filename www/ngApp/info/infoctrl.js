define(function (require) {
    var app = require('app');


    require("../ngDirective/cut-pic");


    app.controller('Infoctrl', ["Mainservice","$http","FileUploader","$state",function (Mainservice,$http,FileUploader,$state) {
        // shortcut to get angular injected service.
        Mainservice.settitle("信息修改");
        this.infoform = {};
        this.v = {"w" : 0 , "h" : 0 , "x" : 0 ,"y" : 0};

        this.idx=0;
        this.getidx = function(num){
            this.idx = num;
        }
        var self =this;

        $http.get("/info").then(function(data){
            self.infoform = data.data;
        });

        //上传插件
        this.uploader = new FileUploader({
            url : "/upload",   	//配置上传到的路径
            autoUpload : true,	//在选择图片之后自动上传
            queueLimit  : 1,	//队列数量限制
            filters : [{
                fn : function(item){
                    //得到这个文件的MIME类型，就是item.type
                    if(
                        item.type.indexOf("jpg") != -1  ||
                        item.type.indexOf("gif") != -1 ||
                        item.type.indexOf("png") != -1 ||
                        item.type.indexOf("jpeg")  != -1  ||
                        item.type.indexOf("bmp")  != -1
                        ){
                        return true;
                        }
                    return false;
                }

            }],

            //添加完毕上传的文件之后要做的事情
            onAfterAddingFile : function(item){
                if(item.file.size > 2000 * 1024){
                    self.uploader.clearQueue();	//清空队列
                    $("#file").val("");
                    alert("请选择2000kb以内的图片");
                    return;
                }
            },
            //当添加文件失败的时候
            onWhenAddingFileFailed : function(){
                alert("请上传正确的文件类型！");
                self.uploader.clearQueue();	//清空队列
                $("#file").val("");
                return;
            },
            //当一个文件上传成功时候
            onCompleteItem : function(item, response, status, headers){
                if(response.result==-2){
                    alert("请上传高度宽度大于100的图片");
                    self.uploader.clearQueue();	//清空队列
                    $("#file").val("");
                    return;
                }

                // alert("图片已经上传到" + response.file.path);
                //显示大黑屏，让用户裁切图片
                self.url = response.file.path;
                console.log(response);
                var src = response.file.path.substr(4);
                self.imgsrc=src;
                self.showimage=true;
                self.uploader.clearQueue();	//清空队列
                $("#file").val("");

            }
        });
        this.showimage=false;
        this.imgsrc="";
        this.getimg = function(){
            return this.imgsrc;

        };

        this.cut = function(){
            console.log(this.url)

            $http.get("/cut",{
                params:{
                    w:this.v.w/ this.v.ratio,
                    h:this.v.h / this.v.ratio,
                    x:this.v.x / this.v.ratio,
                    y:this.v.y / this.v.ratio,
                    url:this.url
                }
            }).then(function(data){
                if(data.data.result ==1 ){
                    alert("裁切完毕！");
                    self.showimage=false;
                    self.infoform.avatar = self.url.substr(4)+"?"+Date.parse(new Date());
                }

            })
        };
        this.gettouxiang = function(){
            return this.infoform.avatar;
        };

        this.xiugai = function(){
            $http.post("/xiugai",{"data":this.infoform}).then(function(data){
                if(data.data.result==1){
                    alert("修改成功");
                    $state.go("root.home");
                }

            })
        }




    }]);

});