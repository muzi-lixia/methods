// call 使用一个指定的 this 值和一个或多个参数来调用一个函数。

// 实现要点：
// this 可能传入 null；
// 传入不固定个数的参数；
// 函数可能有返回值；
Function.prototype.call1 = function (context) {
    var context = context || window;
    context.fn = this;

    var args = [];
    for(var i = 1, len = arguments.length; i < len; i++) {
        args.push('arguments[' + i + ']');
    }

    var result = eval('context.fn(' + args +')');

    delete context.fn
    return result;
}

// apply apply 和 call 一样，唯一的区别就是 call 是传入不固定个数的参数，而 apply 是传入一个数组。

// 实现要点：
// this 可能传入 null；
// 传入一个数组；
// 函数可能有返回值；
Function.prototype.apply1 = function (context, arr) {
    var context = context || window;
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn();
    } else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
    }

    delete context.fn
    return result;
}

// bind  bind 方法会创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，
// 而其余参数将作为新函数的参数，供调用时使用。

// 实现要点：
// bind() 除了 this 外，还可传入多个参数；
// bing 创建的新函数可能传入多个参数；
// 新函数可能被当做构造函数调用；
// 函数可能有返回值；
Function.prototype.bind1 = function (context) {
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function () {};

    var fBound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }

    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}



