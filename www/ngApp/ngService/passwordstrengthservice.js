define(function (require) {
    var app = require('app');



    app.factory("passwordstrengthservice",[function(){
        function getstrength(password) {
            // 0： 表示第一个级别 1：表示第二个级别 2：表示第三个级别
            // 3： 表示第四个级别 4：表示第五个级别
            var mo=0;


            //这个if可以防止密码输入后清空出现的length错误问题
            if(password == undefined){
                password = "";
            }

            if(password.length>6){
                if (/\d/.test(password)) {//如果用户输入的密码 包含了数字
                    mo++;
                }
                if (/[a-z]/.test(password)) {//如果用户输入的密码 包含了小写的a到z
                    mo++;
                }
                if (/[A-Z]/.test(password)) {//如果用户输入的密码 包含了大写的A到Z
                    mo++;
                }
                if (/\W/.test(password)) {//如果是非数字 字母 下划线
                    mo++;
                }
            }
            return mo;
        };
        return {
            "getstrength":getstrength
        }
    }])



});