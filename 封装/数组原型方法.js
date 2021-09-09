Array.prototype.forEach1 = function (callback, thisArg) {
    if (this === null) throw new TypeError('this is null or not defined');
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')
     // this就是当前数组
    const O = Object(this);
    // O.length >>> 0 是什么操作？就是无符号右移 0 位，那有什么意义嘛？就是为了保证转换后的值为正整数。
    // 其实底层做了 2 层转换，第一是非 number 转成 number 类型，第二是将 number 转成 Uint32 类型
    const len = O.length >>> 0;
    let k = 0;
    while (k < len) {
        if (k in O) {
            // O[k]当前值, k索引， O原数组
            callback.call(thisArg, O[k], k, O)
        }
        k ++;
    }
    
}

Array.prototype.map1 = function (callback, thisArg) {
    if (this === null) throw new TypeError('this is null or not defined');
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')
    const O = Object(this);
    const len = O.length >>> 0;
    let k = 0;
    let res = []; // 返回数组
    while (k < len) {
        if (k in O) {
            res[key] = callback.call(thisArg, O[k], k, O);
        }
        k ++;
    }
    return res;
}

Array.prototype.filter1 = function (callback, thisArg) {
    if (this === null) throw new TypeError('this is null or not defined');
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')
    const O = Object(this);
    const len = O.length >>> 0;
    let k = 0;
    let res = []; // 返回数组
    while (k < len) {
        if (k in O) {
            if (callback.call(thisArg, O[k], k, O)) {
                res.push(O[k]);
            }
        }
        k ++;
    }
    return res;
}


Array.prototype.some1 = function (callback, thisArg) {
    if (this === null) throw new TypeError('this is null or not defined');
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')
    const O = Object(this);
    const len = O.length >>> 0;
    let k = 0;
    while (k < len) {
        if (k in O) {
            if (callback.call(thisArg, O[k], k, O)) {
                return true;
            }
        }
        k ++;
    }
    return false;
}


Array.prototype.reduce1 = function (callback, initialValue) {
    if (this === null) throw new TypeError('this is null or not defined');
    if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function')
    const O = Object(this);
    const len = O.length >>> 0;
    let k = 0, acc;
    
    if (arguments.length > 1) {
        acc = initialValue;
    } else {
        // 没传入初始值的时候，取数组中第一个非 empty 的值为初始值
        while (k < len && !(k in O)) {
            k++
        }
        if (k > len) {
            throw new TypeError( 'Reduce of empty array with no initial value' );
        }
        acc = O[k++]
    }
    while (k < len) {
        if (k in O) {
            acc = callback(acc, O[k], k, O)
        }
        k++
    }
    return acc
}
