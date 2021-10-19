const carry = (func, ...args) => {
    // 获取函数的参数个数
    const funLength = func.length;
    return function (...arguments) {
        arguments = args.concat(arguments);
        // 判断参数个数是否收集足，不足则递归收集
        if (arguments.length < funLength) {
            return carry.call(this, func, ...arguments);
        } else {
            // 调用函数
            func.apply(this, arguments);
        }
    }
}

const add = carry((a, b, c) => {
    console.log(a, b, c, a + b + c);
});

add(1)(2)(3)
add(1)(2,3)
add(1,2)(3)
add(1,2,3)

