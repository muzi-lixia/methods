/*
* 1. forEach
* params: callback(item: any, index: number, arr: Array): Function
*   item: 当前项，index: 当前项索引，arr: 原始数组
* return: void
* */
Array.prototype.my_forEach = function (callback) {
    for (let i = 0; i < this.length; i++) {
        callback(this[i], i, this);
    }
}
// let arr = [1,2,3,4,5,6]
// arr.my_forEach((item, index, arr) => {
//     console.log(item, index, arr);
// })

/*
* 2.map
* params: callback(item: any, index: number, arr: Array): Function
*   item: 当前项，index: 当前索引，arr: 原始数组
* return: new []
* */
Array.prototype.my_map = function (callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        result.push(callback(this[i], i, this));
    }
    return result;
}
// let arr = [1,2,3,4,5,6]
// let res = arr.my_map((item, index, arr) => item+1)
// console.log(res);


/*
* 3.filter
* params: callback(item: any, index: number, arr: Array): Function
*   item: 当前项，index: 当前项索引，arr: 原始数组
* return：new []
* */
Array.prototype.my_filter = function (callback) {
    const result = [];
    for(let i = 0; i < this.length; i++) {
        callback(this[i], i, this) && result.push(this[i]);
    }
    return result;
}
// let arr = [12,23,14,15,25,20]
// let res = arr.my_filter((item, index) => item >= 20)
// console.log(res);


/*
* 4.every
* params: callback(item: any, index: number, arr: Array): Function
* return: boolean
* */
Array.prototype.my_every = function (callback) {
    let flag = true;
    for (let i = 0; i < this.length; i++) {
        flag = callback(this[i], i, this);
        if (!flag) break;
    }
    return flag
}
// let arr = [1,23,4,5,65];
// let res = arr.my_every((item, index) => item > 0)
// console.log(res);


/*
* 5.some
* params: callback(item: any, index: number, arr: Array): Function
* return: boolean
* */
Array.prototype.my_some = function (callback) {
    let flag = false;
    for (let i = 0; i < this.length; i++) {
        flag = callback(this[i], i, this);
        if (flag) break;
    }
    return flag;
}
// let arr = [13,34,23,54]
// console.log(arr.my_some((item, index) => item === 44));


/*
* 6.reduce
*   params: callback(pre: any, curr: any, index: number, arr: Array): Function, initValue: any
*       pre: 前一项，curr: 当前项，index: 当前索引，arr: 原始数组，initValue: 初始值
*   return: pre: any
* */
Array.prototype.my_reduce = function (callback, initValue) {
    let start = 0;
    let pre;
    if (initValue) {
        pre = initValue;
    } else {
        pre = this[0];
        start = 1;
    }
    for (let i = start; i < this.length; i++) {
        pre = callback(pre, this[i], i, this);
    }
    return pre;
}
// let arr = [10,5,15,20]
// console.log(arr.my_reduce((pre, curr, index) => pre + curr, 0));


/*
* 7.findIndex
*   params: callback(item: any, index: number, arr: Array): Function
*   return: index: number || -1
* */
Array.prototype.my_findIndex = function (callback) {
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            return i
        }
    }
    return -1
}
// let arr = [1,23,4,6,24]
// console.log(arr.my_findIndex((item, index) => item === 5));


/*
* 8.find
* params: callback(item: any, index: number, arr: Array): Function
* return: item: any || undefined
* */
Array.prototype.my_find = function (callback) {
    for (let i = 0; i < this.length; i++) {
        if (callback(this[i], i, this)) {
            return this[i];
        }
    }
    return undefined;
}
// const arr = [{ name: '科比', num: 24 }, { name: '詹姆斯', num: 23 }, { name: '保罗', num: 3 },]
// console.log(arr.my_find((item, index) => item.num === 3));


/*
* 9.fill
* params: initValue: (any)填充的值，start: (number)开始填充索引默认0，end: (number)结束填充索引默认length-1(不包括结束位置)
* return: []
* */
Array.prototype.my_fill = function (initValue, start = 0, end) {
    end = end || this.length;
    for (let i = start; i < end; i++) {
        this[i] = initValue;
    }
    return this;
}
// console.log(new Array(5).my_fill(10, 1, 3));

/*
* 10.includes
*   params: value: 查找值(any)，start: 查找起始位置默认0(number)
*   return: boolean
* */
Array.prototype.my_includes = function (value, start = 0) {
    if (start < 0) {
        start = this.length + start;
    }
    for (let i = start; i < this.length; i++) {
        if (this[i] === value || Number.isNaN(this[i]) === Number.isNaN(value)) {
            return true
        }
    }
    return false
}
// let arr = [1, 23, 4, NaN, 5]
// console.log(arr.my_includes(NaN, -2));


/*
* 11.join
*   params: str: (string)分隔符
*   return: string
* */
Array.prototype.my_join = function (str) {
    let result = '';
    for (let i = 0; i < this.length; i++) {
        result = i === 0 ? `${result}${this[i]}` : `${result}${str}${this[i]}`
    }
    return result;
}
// let arr = [1,2,3,4,5]
// console.log(arr.my_join(','));


/*
* 12.
* */


