/* 
    实现 JSON.stringify
    JSON.stringify([, replacer [, space]) 方法是将一个 JavaScript 值(对象或者数组)转换为一个 JSON 字符串。此处模拟实现，不考虑可选的第二个参数 replacer 和第三个参数 space
    基本数据类型：
        undefined 转换之后仍是 undefined(类型也是 undefined)
        boolean 值转换之后是字符串 "false"/"true"
        number 类型(除了 NaN 和 Infinity)转换之后是字符串类型的数值
        symbol 转换之后是 undefined
        null 转换之后是字符串 "null"
        string 转换之后仍是string
        NaN 和 Infinity 转换之后是字符串 "null"
    函数类型：转换之后是 undefined
    如果是对象类型(非函数)
        如果是一个数组：如果属性值中出现了 undefined、任意的函数以及 symbol，转换成字符串 "null" ；
        如果是 RegExp 对象：返回 {} (类型是 string)；
        如果是 Date 对象，返回 Date 的 toJSON 字符串值；
    如果是普通对象；
        如果有 toJSON() 方法，那么序列化 toJSON() 的返回值。
        如果属性值中出现了 undefined、任意的函数以及 symbol 值，忽略。
        所有以 symbol 为属性键的属性都会被完全忽略掉。
    对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。
*/
function jsonStringify(data) {
    let dataType = typeof data;
    if (dataType !== 'object') {
        let result = data;
        //data 可能是 string/number/null/undefined/boolean
        if (Number.isNaN(data) || data === Infinity) {
            // NaN 和 Infinity 直接序列化返回null
            result = "null";
        } else if (dataType === 'function' || dataType === 'undefined' || dataType === 'symbol') {
            // function undefined symbol序列化返回undefined
            return undefined;
        } else if (dataType === 'string') {
            result = '"' + data + '"';
        }
        // boolean 返回String()
        return String(result);
    } else if (dataType === 'object') {
        if (data === null) {
            return "null";
        } else if (data.toJSON && typeof data.toJSON === 'function') {
            return jsonStringify(data.toJSON())
        } else if (data instanceof Array) {
            let result = [];
            // 如果是数组
            data.forEach((item, index) => {
                let itemType = typeof item;
                if (itemType === 'function' || itemType === 'undefined' || itemType === 'symbol') {
                    result[index] = "null";
                } else {
                    result[index] = jsonStringify(item);
                }
            });
            result = "[" + result + "]";
            return result.replace(/'/g, '"');
        } else {
            // 普通对象
            /**
             * 循环引用抛错(暂未检测，循环引用时，堆栈溢出)
             * symbol key 忽略
             * undefined、函数、symbol 为属性值，被忽略
             */
            let result = [];
            Object.keys(data).forEach((item, index) => {
                if (typeof item !== 'symbol') {
                    // key 是Symbol对象则忽略
                    let itemType = typeof data[item];
                    if (itemType !== 'undefined' && itemType !== 'function' && itemType !== 'symbol') {
                        // 键值如果是undefined、function、symbol则忽略
                        result.push('"' + item + '"' + ':' + jsonStringify(data[item]));
                    }
                }
            });
            return ("{" + result + "}").replace(/'/g, '"');
        }
    }
}


/* 
    实现JSON.parse
    两种实现方式
        eval()
        new Function()
*/
// eval()实现，直接调用eval()函数，如果传入的参数不是json数据，是一段代码，容易存在xss攻击，eval本身是执行一段JavaScript代码
// let json = '{"a":"1", "b":2}';
// let obj = eval("(" + json + ")");  // obj 就是 json 反序列化之后得到的对象
// 为了避免传入的不是json，而导致可能存在的xss攻击，所以在解析数据之前，要进行数据校验
function parse(json) {
    let rx_one = /^[\],:{}\s]*$/;
    let rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
    let rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
    let rx_four = /(?:^|:|,)(?:\s*\[)+/g;
    if (rx_one.test(
        json.replace(rx_two, '@')
            .replace(rx_three, ']')
            .replace(rx_four, '')
    )) {
        return eval('(' + json + ')');
    }
}

// new Function实现   Function 与 eval 具有相同的字符串参数特性
// let obj1 = (new Function('return ' + json))();

// 测试
let obj = {
    a: [1,2,3,4],
    b: {
        c: 1,
        d: '哈哈哈'
    },
    c: false,
    d: true,
    f: null,
    ee: undefined,
    aa: 'string',
    bb: 12345
}
// 序列化
console.log(jsonStringify(obj));
// 反序列化
console.log(parse(jsonStringify(obj)));

