/* 
call
使用一个指定的this值和一个或多个参数来调用一个函数
this可能传入null, 可以传入一个或多个参数，函数可能有返回值
*/

Function.prototype.my_call = function (context) {
    // this可以不传，默认是window
    context = context || window;
    // 保证唯一性
    let fn = Symbol(context);
    context[fn] = this;
    // 参数处理
    let args = [...arguments].slice(1);
    // 函数执行后可能存在返回值
    let result = context[fn](...args);
    delete context[fn];

    return result;
}
/* 
apply
apply和call一样，唯一区别是call传入的参数个数不确定，而apply接受一个数组作为参数
this可能传入null，参数传入一个数组，函数可能有返回值
*/
Function.prototype.my_apply = function (context, arr) {
    context = context || window;
    let fn = Symbol(context);
    context[fn] = this;
    let result;
    if (!arr) {
        result = context[fn]();
    } else {
        result = context[fn](...arr);
    }
    delete context[fn];
    return result;
}

/* 
bind
bind会创建一个新的函数，在bind调用的时候，这个新函数的this被指定为bind调用时的第一个参数，而其余参数将作为新函数调用时的参数
bind除了绑定this外，还接受多个参数
bind创建的新函数可能接受多个参数
新函数(返回的函数)可能被当作构造函数调用
函数可能有返回值
*/
Function.prototype.my_bind = function (context) {
    context = context || window;
    const _this = this;
    let args = Array.prototype.slice.call(arguments, 1);
    return function Bind() {
        // 如果是new调用，绑定this为实例对象
        if (this instanceof Bind) {
            return _this.apply(this, [...args, ...arguments])
        }
        return _this.apply(context, [...args, ...arguments])
    }
}




