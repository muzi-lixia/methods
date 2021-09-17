const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class Promise {
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.error = undefined;
        this.onResolvedCallbacks = [];
        this.onRejectedCallbacks = [];

        let resolve = (value) => {
            if (this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value;
                this.onResolvedCallbacks.forEach(fn => fn());
            }
            /* resolvePromise(this, value, (value) => {
                if (this.status === PENDING) {
                    this.status = FULFILLED
                    this.value = value
                    this.onResolvedCallbacks.forEach(fn => fn());
                }
            }, reject) */
        }

        let reject = (error) => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.error = error;
                this.onRejectedCallbacks.forEach(fn => fn());
            }
        }

        try {
            executor(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }

    then(onFulfilled, onRejected) {
        // 解决 onFulfilled，onRejected 没有传值的问题
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (v) => v;
        // 因为错误的值要让后面访问到，所以这里也要抛出错误，不然会在之后 then 的 resolve 中捕获
        onRejected = typeof onRejected === 'function' ? onRejected : (err) => { throw err };

        // 每次调用then都返回一个新的promise
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        // x可能是一个promise
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e)
                    }

                }, 0)
            }

            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.error);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e)
                    }
                }, 0)
            }
            if (this.status === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                });
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.error);
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
            }
        });
        return promise2;
    }

    catch(onRejected) {
        return this.then(null, onRejected);
    }
}

const resolvePromise = (promise2, x, resolve, reject) => {
    // 自己等待自己完成是错误的实现(循环引用)，用一个类型错误，结束掉 promise
    if (promise2 === x) return reject(new TypeError("Chaining cycle detected for promise #<Promise>"));

    // Promise/A+ 2.3.3.3.3 只能调用一次（防止多次调用）
    let called;
    // 后续的条件要严格判断 保证代码能和别的库一起使用
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        try {
            // 为了判断 resolve 过的就不用再 reject 了（比如 reject 和 resolve 同时调用的时候）
            let then = x.then;
            if (typeof then === 'function') {
                // 不要写成 x.then，直接 then.call 就可以了 因为 x.then 会再次取值，Object.defineProperty
                then.call(x, y => {
                    // 根据 promise 的状态决定是成功还是失败
                    if (called) return;
                    called = true;
                    // 递归解析的过程（因为可能 promise 中还有 promise）
                    resolvePromise(promise2, y, resolve, reject);
                }, r => {
                    // 只要失败就失败
                    if (called) return;
                    called = true;
                    reject(r);
                })
            } else {
                // 如果 x.then 是个普通值就直接返回 resolve 作为结果
                resolve(x);
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e)
        }
    } else {
        // 如果 x 是个普通值就直接返回 resolve 作为结果
        resolve(x)
    }
}

Promise.resolve = function (value) {
    // 如果是 Promise，则直接输出它
    if (value instanceof Promise) {
        return value
    }
    return new Promise(resolve => resolve(value))
}

Promise.reject = function (error) {
    return new Promise((resolve, reject) => reject(error))
}

Promise.all = function (promise) {
    return new Promise((resolve, reject) => {
        let count = 0;
        let result = [];
        for (let i = 0; i < promise.length; i++) {
            promise[i].then(function (data) {
                result[i] = data;
                if (++count === promise.length) {
                    resolve(result)
                }
            }, function (error) {
                reject(error)
            })
        }
    })
}
// Promise.all = function(promiseArr) {
//     let index = 0, result = []
//     return new Promise((resolve, reject) => {
//         promiseArr.forEach((p, i) => {
//             Promise.resolve(p).then(val => {
//                 index++
//                 result[i] = val
//                 if (index === promiseArr.length) {
//                     resolve(result)
//                 }
//             }, err => {
//                 reject(err)
//             })
//         })
//     })
// }


Promise.race = function (promise) {
    return new Promise((resolve, reject) => {
        for (let i = 0; i < promise.length; i++) {
            promise[i].then(function (data) {
                resolve(data)
            }, function (error) {
                reject(error)
            })
        }
    })
}
// Promise.race = function(promiseArr) {
//     return new Promise((resolve, reject) => {
//         promiseArr.forEach(p => {
//             Promise.resolve(p).then(val => {
//                 resolve(val)
//             }, err => {
//                 reject(err)
//             })
//         })
//     })
// }

