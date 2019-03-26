define(function (require) {
    var app = require('app');

    require("./homeservice");
    require("jquery");



    app.controller('Homectrl', ["homeservice","Mainservice","$http","$state","changeservice",function (homeservice,Mainservice,$http,$state,changeservice) {
        // shortcut to get angular injected service.
        Mainservice.settitle("首页");

        this.content = "";
        this.shuoshuo = [];
        var self= this;


        this.checklogin = function(){
            return changeservice.getlogin();
        }

        $http.get("/shuoshuo").then(function(data){
            self.shuoshuo = data.data.result;
        })

        this.fabu = function(){
            $http.post("/fabu",{"content":this.content}).then(function(data){
                if(data.data.result == -1){
                    alert("服务器出错");

                }else if(data.data.result ==1){
                    alert("发布成功");

                    $("#content").val("");
                    $state.go("/root.home");
                }

            })
        };







    }]);

});