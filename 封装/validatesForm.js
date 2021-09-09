
var WC = (function (global, factory){
    return factory.call(global);//_TOOL_
})(this, function(){
    var _TOOL_ = {};
    //用户名验证
    _TOOL_.validateUserName = function(str){
        const reg = /^[\w\u4e00-\u9fa5]{3,10}$/;//数字、字母、_、中文
        return reg.test(str);
    }
    //手机号验证
    _TOOL_.validateMobile = function(num){
        const reg = /^1[3-9]\d{9}$/;
        return reg.test(num); 
    }
    //密码验证
    _TOOL_.validatePassword = function(str){
        const reg = /^[\w.?!*<>{},;'"^\/\\\[\]]{6,12}$/;//6-12位，数字、字母、_.?!*<>{},;^/\'\\[]
        return reg.test(str); 
    }
    //邮箱验证
    _TOOL_.validateEmail = function(str){
        const reg = /^\w+@[\da-z{2,}]+(\.[a-z]{2,})$/i;
        return reg.test(str);
    }
    //qq号验证
    _TOOL_.validateQQ = function(num){
        const reg = /^[1-9]\d{4,9}$/;//5-10位 ， 第一位非0
        return reg.test(num);
    }
    return _TOOL_;
});

