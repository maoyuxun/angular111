define(function (require) {
    var app = require('app');



    app.factory("changeservice",["$http",function($http){
        var login = false;
        var email="";
        var avatar = "";
        return {
            changelogin :function(){
                $http.get("/checklogin").then(function(data){
                    login = data.data.login;
                    email = data.data.email;
                    avatar = data.data.avatar
                })
            },
            getlogin : function(){
                return login;
            },
            getemail :function(){
                return email;
            },
            gettoptouxiang :function(){
                return avatar;
            }
        }

    }])

});