define(function (require) {
    var app = require('app');

    require("./musicservice");



    app.controller('Musicctrl', ["musicservice",function (musicservice) {
        // shortcut to get angular injected service.
        this.a = musicservice.m;
    }]);

});