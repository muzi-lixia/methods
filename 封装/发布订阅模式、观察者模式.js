
// 发布订阅模式
class EventBus {
    constructor () {
        // 用来储存事件
        this.subs = {}
    }
    // 实现 $on 方法， type是任务队列的类型，fn是事件函数（方法）
    $on (type, fn) {
        // 判断 subs 是否存在当前类型的任务队列
        if (!this.subs[type]) {
            // 不存在就新增一个，默认为空数组
            this.subs[type] = []
        }
        // 存在就把该方法添加到 subs 中
        this.subs[type].push(fn)
    }

    // 实现 $emit 方法
    $emit (type) {
        // 该类型队列是否存在
        if (this.subs[type]) {
            // 获取参数
            const args = Array.prototype.slice.call(arguments, 1);
            console.log(args, '>>>>>>>>>>>')
            // 循环队列调用
            this.subs[type].forEach(fn => fn(...args));
        }
    }
}

// 使用
const bus = new EventBus()

bus.$on('aaa', function () {
    const count = [...arguments].reduce((x, y) => x + y)
    console.log(count);
})

bus.$emit('aaa', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10)


// 观察者模式
// 与发布订阅者不同 观察者中 发布者和订阅者(观察者)是相互依赖的 
// 必须要求观察者订阅内容改变事件 ，而发布订阅者是由调度中心进行调度，那么看看观察者模式 是如何相互依赖

// 目标
class Subject {
    constructor () {
        this.observerLists = [];
    }
    // 添加观察者
    addObserver (observer) {
        // 首先判断 observer是否存在 和 observer是否存在更新函数
        if (observer && observer.update) {
            this.observerLists.push(observer)
        }
    }

    // 通知观察者
    notify () {
        this.observerLists.forEach(obs => {
            // 每个观察者收到通知后执行事件
            obs.update()
        })
    }

    // 清空观察者
    empty () {
        this.observerLists = []
    }
}
// 观察者
class Observer {
    // 定义观察者内容更新事件
    update () {
        console.log('更新了')
    }
}

// 使用
const subject = new Subject();

const obs1 = new Observer();
const obs2 = new Observer();

subject.addObserver(obs1);
subject.addObserver(obs2);

subject.notify()
