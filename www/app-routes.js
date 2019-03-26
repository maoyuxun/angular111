define(function (require) {
	//引入app对象
    var app = require('./app');

    // //定义路由！
   app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    
       $urlRouterProvider.otherwise('/home');

       $stateProvider
           .state('root', {
               templateUrl: 'ngApp/root/template.html',
               controllerUrl:'ngApp/root/rootctrl.js',
               controller:'Rootctrl as rootctrl'
           })
           .state('root.home', {
               url:'/home',
               templateUrl: 'ngApp/home/template.html',
               controllerUrl:'ngApp/home/homectrl.js',
               controller:'Homectrl as homectrl'
           })
           .state('root.music', {
               url:'/music',
               templateUrl: 'ngApp/music/template.html',
               controllerUrl:'ngApp/music/musicctrl.js',
               controller:'Musicctrl as musicctrl'
           })
           .state('root.regist', {
               url:'/regist',
               templateUrl: 'ngApp/regist/template.html',
               controllerUrl:'ngApp/regist/registctrl.js',
               controller:'Registctrl as registctrl'
           })
           .state('root.login', {
               url:'/login',
               templateUrl: 'ngApp/login/template.html',
               controllerUrl:'ngApp/login/loginctrl.js',
               controller:'Loginctrl as loginctrl'
           })
           .state('root.info', {
               url:'/info',
               templateUrl: 'ngApp/info/template.html',
               controllerUrl:'ngApp/info/infoctrl.js',
               controller:'Infoctrl as infoctrl'
           })


   }]);
});