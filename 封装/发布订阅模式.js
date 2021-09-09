class EventEmitter {
    constructor() {
        this.event = {};
    }

    // 实现订阅
    on(type, callback) {
        if (!this.event[type]) {
            this.event[type] = [callback]
        } else {
            this.event[type].push(callback);
        }
    }

    // 清除订阅
    off(type, callback) {
        if (!this.event[type]) return;
        this.event[type] = this.event[type].filter(item => item !== callback);
    }
    // 只执行一次
    once(type, callback) {
        if(this.event[type]) {
            callback();
            this.off(type, callback)
        }
        this.on(type, callback);
    }

    // 实现发布
    emit(type) {
        if (this.event[type]) {
            const args = Array.prototype.splice.call(arguments, 1);
            this.event[type].forEach(fn => fn(args));
        }
    }
}


