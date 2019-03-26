define(function (require) {
    var app = require('app');


    require("jquery");

    app.directive("passwordStrengthBar",[function(){

        return {
            scope:{
                "strength":"@"
            },
            restrict:"E",
            templateUrl:"ngApp/ngDirective/password-strength-bar.html",
            link:function($scope,ele){
                  //0,1,2,3,4

                var arrowwidth = $(ele).find(".arrow").width();
                var barwidth = $(ele).find(".password-strength-bar").width();

                $scope.getposition = function(){

                    return {
                        "left":barwidth/5*$scope.strength+(barwidth/5-arrowwidth)/2+"px"
                    }
                }



            }

        }
    }])




});