define(function (require) {
    var app = require('app');

    require("./registservice");
    require("../ngDirective/password-strength-bar");
    require("../ngService/passwordstrengthservice");


    app.controller('Registctrl', ["registservice","Mainservice","passwordstrengthservice","$state","changeservice",function (registservice,Mainservice,passwordstrengthservice,$state,changeservice) {
        this.registform = {
            password:"",
            password2:""
        };

        Mainservice.settitle("注册");



        var self =this;
        this.tip="";
        this.showemail=false;
        this.emailtipstyle = "";
        this.checkemail = function(){


            if(this.showemail = angular.element(registform.email).hasClass("ng-invalid-pattern")){
                console.log("11")
                this.showemail=true;
                this.emailtipstyle = "alert-danger";
                this.tip="不合法的地址";
                return
            }


            registservice.checkemail(this.registform.email,function(data){
                console.log(this.registform.email)
                if(data.data.result){
                    self.showemail=true;
                    self.tip="恭喜可用";
                    self.emailtipstyle="alert-success"
                }else {
                    self.showemail=true;
                    self.tip=" 邮箱被占用";
                    self.emailtipstyle="alert-danger"
                }
            })



        };

        this.doregist = function(){
            var email = this.registform.email;
            console.log(email);
            var password= this.registform.password;
            registservice.doregist(email,password,function(data){
                if(data.data.result ==1){
                    alert("注册成功");

                    $state.go("root.home");
                    changeservice.changelogin();

                }else {
                    alert("注册失败");
                }
            })
        }


        //密码提示栏，一开始不显示
        this.showstrength=false;


        //密码强度一开始设为0；
        this.passwordstrength=0;

        //得到密码强度
        this.getpasswordstrength = function(){
            this.passwordstrength=passwordstrengthservice.getstrength(this.registform.password);
            return this.passwordstrength
        };


        //根据密码强度，<3登记就显示
        this.getcheckstrength = function(){


            this.showstrength =  this.passwordstrength<3
        }



        //确认密码栏，一开始不显示
        this.showpass = false;

        //检查确认密码栏，不相同就显示
        this.checkpassworddiff = function(){
            if(this.registform.password !="" && this.registform.password2!=""){
                if(this.registform.password == this.registform.password2){
                    this.showpass=false;
                }else {
                    this.showpass = true;
                }
            }
        }

    }]);

});