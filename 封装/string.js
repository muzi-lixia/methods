
var Muzi = (function (global, factory){
    return factory.call(global);
})(this, function(){
    var _TOOL_ = {};
    //功能
    //获取年
    _TOOL_.getYear = function(data){
        var year = data.getFullYear(data);
        return year;
    }
    //获取月
    _TOOL_.getMonth = function(data){
        var month = (data.getMonth(data) + 1) < 10 ? '0'+(data.getMonth(data) + 1) : data.getMonth(data) + 1;
        return month;
    }
    //获取日
    _TOOL_.getDate = function(data){
        var date = (data.getDate(data)) < 10 ? '0'+data.getDate(data) : data.getDate(data);
        return date;
    }
    //获取时
    _TOOL_.getHours = function(data){
        var hour = data.getHours(data) < 10 ? '0'+data.getHours(data) : data.getHours(data);
        return hour;
    }
    //获取分
    _TOOL_.getMinutes = function(data){
        var minute = data.getMinutes(data) < 10 ? '0'+data.getMinutes(data) : data.getMinutes(data);
        return minute;
    }
    //获取秒
    _TOOL_.getSeconds = function(data){
        var second = data.getSeconds(data) < 10 ? '0'+data.getSeconds(data) : data.getSeconds(data);
        return second;
    }
    return _TOOL_;
});

