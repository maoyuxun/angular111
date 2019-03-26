define(function (require) {
    var app = require('app');


    require("../ngService/changeservice");



    app.controller('Rootctrl', ["changeservice",function (changeservice) {


        changeservice.changelogin();


        this.login =function(){
            return changeservice.getlogin();
        }
        this.email = function(){
            return changeservice.getemail();
        }
        this.getttoptouxiang = function(){
            return changeservice.gettoptouxiang();
        }
    }]);

});