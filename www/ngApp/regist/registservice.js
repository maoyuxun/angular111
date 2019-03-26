define(function (require) {
    var app = require('app');



    app.factory("registservice",["$http",function($http){
        function checkemail(email,callback){
            $http.post("/checkemail",{"email":email}).then(callback);
        }
        function doregist(email,password,callback){
            $http.post("/user",{"email":email,"password":password}).then(callback);
        }

        return {
            "checkemail":checkemail,
            "doregist":doregist

        }
    }])

});