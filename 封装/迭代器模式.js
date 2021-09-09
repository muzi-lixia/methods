

const iterator = function (arr) {
    let current = 0;

    const next = function () {
        return current += 1;
    }

    const done = function () {
        return current >= arr.length;
    }

    const value = function () {
        return arr[current];
    }

    return {
        next, done, value
    }
}

const arr1 = [1, 2, 3];
const arr2 = [1, 2, 3];

const iterator1 = iterator(arr1);
const iterator2 = iterator(arr2);

const compare = function (iterator1, iterator2) {
    while (!iterator1.done() && !iterator2.done()) {
        if (iterator1.value() !== iterator2.value()) {
            console.log('不等');
            return
        }
        iterator1.next();
        iterator2.next();
    }
    console.log('相等');
}

compare(iterator1,iterator2)
