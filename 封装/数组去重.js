//实现一个数组（包含对象等类型元素）去重函数

//获取类型

const getType = (function () {

    const class2type = {
        '[object Boolean]': 'boolean', '[object Number]': 'number',
        '[object String]': 'string', '[object Function]': 'function',
        '[object Array]': 'array', '[object Date]': 'date', '[object RegExp]': 'regexp',
        '[object Object]': 'object', '[object Error]': 'error', '[object Symbol]': 'symbol'
    }

    return function getType (obj) {
        if ( obj === null ) {
            return obj + '';
        }
        //用来判断 引用数据类型 和 原始数据类型
        const str = Object.prototype.toString.call(obj);
        return typeof obj === 'object' || typeof obj === 'function' ? class2type[str] || 'object' : typeof obj
    }
})();

/** 
*  判断两个元素是否相等
*  @params {any} o1 比较元素
*  @params {any} o2 其他元素
*  @return {Boolean} 是否相等
*/ 

const isEqual = (o1, o2) => {

    const t1 = getType(o1);
    const t2 = getType(o2);

    //比较类型是否一致
    if ( t1 !== t2 ) return false;

    //类型一致
    if ( t1 === 'array' ) {
        //首先判断元素个数是否相等
        if ( o1.length !== o2.length ) return false;
        //比较数组中的每个元素
        return o1.every(( item, index ) => {
            return isEqual(item, o2[index])
        })
    }

    if (t2 === 'object') {
        const keysArr = Object.keys(o1);
        //判断个数是否相等
        if (keysArr.length !== Object.keys(o2).length) return false;
        //比较每一个元素
        return keysArr.every(k => {
            return isEqual(o1[k], o2[k]);
        })
    }
    //相等返回true
    return o1 === o2;
}

//数组去重
const removeDuplicates = (arr) => {
    return arr.reduce((accumulator, current) => {
        const hasIndex = accumulator.findIndex(item => isEqual(current, item));
        if (hasIndex === -1) {
            accumulator.push(current);
        }
        return accumulator;
    }, []);
}


//测试
// removeDuplicates([123, {a: 1}, {a: {b: 1}}, {a: "1"}, {a: {b: 1}}, "meili", {a:1, b:2}, {b:2, a:1}])
console.log(removeDuplicates([123, {a: 1}, {a: {b: 1}}, {a: "1"}, {a: {b: 1}}, "meili", {a:1, b:2}, {b:2, a:1}]));

