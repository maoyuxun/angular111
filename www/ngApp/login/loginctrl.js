define(function (require) {
    var app = require('app');


    app.controller('Loginctrl', ["Mainservice","$state","changeservice","$http",function (Mainservice,$state,changeservice,$http) {



        this.loginform = {
            email:"",
            password:""
        }
        Mainservice.settitle("登录");

        var self =this;
        this.showtip=false;
        this.tip="";

        this.dologin = function(){
            var email = this.loginform.email;
            var password= this.loginform.password;
            $http.post("/login",this.loginform).then(function(data){
                if(data.data.result == 1){
                    alert("登录成功");
                    $state.go("root.home");
                    changeservice.changelogin();
                }else if(data.data.result ==-1){
                    alert("服务器出错");
                }else if(data.data.result ==-2){
                    self.showtip=true;
                    self.tip="用户名不存在";
                }
                else if(data.data.result ==-3){
                    self.showtip=true;
                    self.tip="密码错误";
                }
            })

        }
    }]);

});