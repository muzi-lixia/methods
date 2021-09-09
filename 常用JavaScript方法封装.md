# 常用JavaScript方法封装

### 1.输入一个值，返回其数据类型

```js
function type(data) {
    return Object.prototype.toString.call(data)
}
```

### 2.数组去重

```js
//方法一
function unique(arr) {
    return [...new Set(arr)];
}
//方法二
function unique(arr) {
    let obj = {}
    return arr.filter(ele => {
        if (!obj[ele]) {
            obj[ele] = true;
            return true;
        }
    })
}
//方法三
function unique(arr) {
    let result = []
    arr.forEach(item => {
        if (result.indexOf(item) === -1) {
            result.push(item)
        }
    });
    return result
}
```

### 3.字符串去重

```js
//在原型上添加方法
String.prototype.unique = function () {
    let obj = {},
        str = '',
        len = this.length;
    for (let i = 0; i < len; i++) {
        if (!obj[this[i]]) {
            str += this[i];
            obj[this[i]] = true;
        }
    }
    return str;
}
//去除连续字符串
function uni(str){
    return str.replace(/(\w)\1+/g, '$1');
}
```

### 4.深拷贝

```js
function deepClone(obj) {
    //根据传入的参数新建一个与之对应的数据类型的新变量
    let newObj = Array.isArray(obj) ? [] : {};
    if (obj && typeof obj === 'object') {
        for (let key in obj) {
            //忽略继承过来的的属性
            if (obj.hasOwnProperty(key)) {
                if (obj[key] && typeof obj[key] === 'object') {
                    newObj[key] = deepClone(obj[key]);
                } else {
                    newObj[key] = obj[key];
                }
            }
        }
    }
    return newObj
}
```

### 5.返回当前日期时间

```js
function getDateTime() {
    let date = new Date(),
        year = date.getFullYear(),
        month = (date.getMonth() + 1).toString().padStart(2, '0'),
        day = date.getDate().toString().padStart(2, '0'),
        hour = date.getHours().toString().padStart(2, '0'),
        minute = date.getMinutes().toString().padStart(2, '0'),
        second = date.getSeconds().toString().padStart(2, '0');
    return `${year}年${month}月${day}日${hour}时${minute}分${second}秒`
}
```

### 6.判断是否为回文

```js
//方法一
function isPalindrome(str) {
    if (Object.prototype.toString.call(str) !== '[object String]') {
        return false;
    }
    let len = str.length;
    for (let i = 0; i < len / 2; i++) {
        if (str[i] !== str[len - 1 - i]) {
            return false;
        }
    }
    return true;
}
// 方法二 （英文大小写转换）
function isPalindrome(str) {
    str = str.replace(/\W/g, '').toLowerCase();
    return (str === str.split('').reverse().join(''))
}
```

### 7.数组排序

```js
// 快排 [left] + min + [right]
function quick(arr){
    //4.结束递归，当arr中小于等于1项，则不用处理
    if(arr.length <= 1){
        return arr;
    }
    //1.找到数组的中间项，在原有的数组中把它移除
    let middleIndex = Math.floor(arr.length/2);
    let middleValue = arr.splice(middleIndex,1)[0];
    //2.创建左右两个数组，循环遍历剩下数组中的每一项，比当前项小的放在数组左边，大的放右边
    let leftArr = [],
        rightArr = [];
    for(let i = 0; i < arr.length; i++){
        let temp = arr[i];
        temp < middleValue ? leftArr.push(temp) : rightArr.push(temp);
    }
    //3.递归方式让左右两边的数组持续这样处理，一直到左右两边都排好序为止, 最后让左边数组 + 中间 + 右边数组拼接成为最后的结果
    return quick(leftArr).concat(middleValue,quick(rightArr));
}
// 冒泡
function bubble(arr){
    let temp = null;
    //外层循环控制比较的轮数
    for(let i = 0; i<arr.length-1; i++){
        //内层循环控制比较次数
        for(let j = 0; j<arr.length-1-i; j++){
            if(arr[j] > arr[j+1]){
                //当前项大于后一项
                temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
    return arr;
}
//插入排序
function insert(arr){
    //准备一个新数组，用来存储拿取到的第一个数
    let handle = [];
    handle.push(arr[0]);
    //从第二项开始依次拿取，直到全部拿完
    for(let i = 1; i<arr.length; i++){
        //A是最新拿取的数
        let A = arr[i];
        //和handle的依次比较（从后向前比）
        for(let j = handle.length - 1; j >= 0; j--){
            //手里每一次要比较的数
            let B = handle[j];
            //如果当前最新的数A 比 要比较的数B大，则把A放到B的后面
            if(A > B){
                handle.splice(j + 1, 0, A);
                break;
            }
            //已经比到第一项，就把最新的数据放到最前面即可
            if(j===0){
                handle.unshift(A);
            }
        }
    }
}
```

### 8.防抖

```js
function debounce(func, delay) {
    let timer = null;
    return function () {
        let _this = this,
            _args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            func.apply(_this, _args)
        }, delay)
    }
}
```

### 9.节流

```js
function throttle(func, wait) {
    let lastTime = 0;
    return function () {
        let nowTime = +new Date();
        if (nowTime - lastTime > wait) {
            func.apply(this, arguments);
            lastTime = nowTime;
        }
    }
}
```

### 10.获取url参数

```js
//方法一： 直接正则替换，但参数中如果包含URI需要转码、重复键值、无value值的不适用
function matchParam(url) {
    let obj = {};
    url.replace(/([^?&=]+)=([^&]+)/g,(_, k, v) => obj[k] = decodeURIComponent(v));
    return obj;
}
//方法二
function parseParam(url) {
    //取出参数字符串
    const paramsStr = /.+\?(.+)$/.exec(url)[1];
    //切割成数组
    const params = paramsStr.split('&');
    let paramsObj = {};
    //遍历
    params.forEach(param => {
        //有值的参数
        if (/=/.test(param)) {
            let [key, value] = param.split('=');
            //解码
            value = decodeURIComponent(value);
            //处理纯数字值
            value = /^\d+$/.test(value) ? parseInt(value) : value;
            if (paramsObj.hasOwnProperty(key)) {
                //如果当前key值已存在
                paramsObj[key] = [].concat(paramsObj[key], value);
            } else {
                paramsObj[key] = value;
            }
        } else {
            //没值的参数
            paramsObj[param] = true;
        }
    });
    return paramsObj;
}
```

### 11.常用验证规则

```js

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
```

### 12.将对象转换成get请求的参数字符串

```js
/**
 * 将对象转换成get请求后面的参数一样的字符串
 * @param obj
 * @return {string} ?a=1&b=2
 */
export const generParamsStr = (obj) => {
  let rangeArr = '';
  let param = '';
  if (obj && typeof obj === 'object') {
    for (let i in obj) {
      if (rangeArr === '') {
        rangeArr += '?'
      }
      if (Object.prototype.hasOwnProperty.call(obj, i) && obj[i] !== '') {
        rangeArr += `${i}=${obj[i]}&`
      }
    }
    return rangeArr.replace(/&$/, '')
  }
  return param
};
```

### 13.数组扁平化

```js
Array.prototype.myFlat = function() {
    let result = [],
        _this = this;
    //循环数组中的每一项，把不是数组的存储到数组中
    let fn = (arr)=>{
        for(let i = 0; i < arr.length; i++){
            let item = arr[i];
            if(Array.isArray(item)){
                fn(item);
                continue;
            }
            result.push(item);
        }
    }
    fn(_this);
    return result;
}
```

### 14.（145678 => 145，678.00）

```js
function filter (val) {
    if (val === '0' || val === '') {
        return '0';
    } else {
        val = val.replace(/(^|\s)\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
    }
    return val;
}
```

### 15.电话号码隐藏中间四位

```js
function phoneFilter (phone) {
    return phone.replace(/^(\d{3})\d{4}(\d+)/g, '$1****$2')
}
```

### 16.(1234567812345678 => 1234 5678 1234 5678)

```js
function setCardNo (cardNo) {
    return cardNo.replace(/\s/g, '').replace(/(.{4})/g, '$1 ');
}
```

### 17.对象转换为formData对象

```javascript
/**
 * 对象转化为formdata
 * @param {Object} object
 */
function getFormData(object) {
    const formData = new formData();
    Object.keys(object).forEach(key => {
        const value = object[key];
        if (Array.isArray(value)) {
            value.forEach((subValue, index) => {
                formData.append(key + `${index}`, subValue);
            })
        } else {
            formData.append(key, object[key]);
        }
    });
    return formData;
}
```

### 18.input输入框实现小数点后只输入两位

```javascript
<input type="number" v-model="num" oninput="value = value.match(/^\d+(?:\.\d{0, 2})?/)">
```

