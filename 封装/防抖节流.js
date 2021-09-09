// 防抖
function debounce(fn, time = 1000) {
    let timer = null;
    return function () {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.call(this, arguments);
        }, time)
    }
}


// 节流
function throttle(fn, time = 1000) {
    let lastTime = 0;
    return function () {
        let nowTime = +new Date();
        if(nowTime - lastTime > time) {
            fn.call(this, arguments);
            lastTime = nowTime;
        }
    }
}

