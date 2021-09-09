/* 
    冒泡排序
*/
function bubble(arr){
    let temp = null;
    //外层循环控制比较的轮数
    for(let i = 0; i<arr.length-1; i++){
        //内层循环控制比较次数
        for(let j = 0; j<arr.length-1-i; j++){
            if(arr[j] > arr[j+1]){
                //当前项大于后一项
                temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
    return arr;
}
let arr = [12,5,10,4,6];
console.log(bubble(arr));

/* 
    插入排序
*/
function insert(arr){
    //准备一个新数组，用来存储拿取到的第一个数
    let handle = [];
    handle.push(arr[0]);
    //从第二项开始依次拿取，直到全部拿完
    for(let i = 1; i<arr.length; i++){
        //A是最新拿取的数
        let A = arr[i];
        //和handle的依次比较（从后向前比）
        for(let j = handle.length - 1; j>=0; j--){
            //手里每一次要比较的数
            let B = handle[j];
            //如果当前最新的数A 比 要比较的数B大，则把A放到B的后面
            if(A>B){
                handle.splice(j+1,0,A);
                break;
            }
            //已经比到第一项，就把最新的数据放到最前面即可
            if(j===0){
                handle.unshift(A);
            }
        }
    }
}

/* 
    快速排序
*/
function quick(arr){
    //4.结束递归，当arr中小于等于1项，则不用处理
    if(arr.length<=1){
        return arr;
    }
    //1.找到数组的中间项，在原有的数组中把它移除
    let middleIndex = Math.floor(arr.length/2);
    let middleValue = arr.splice(middleIndex,1)[0];
    //2.创建左右两个数组，循环遍历剩下数组中的每一项，比当前项小的放在数组左边，大的放右边
    let leftArr = [],
        rightArr = [];
    for(let i = 0; i<arr.length; i++){
        let temp = arr[i];
        temp < middleValue ? leftArr.push(temp) : rightArr.push(temp);
    }
    //3.递归方式让左右两边的数组持续这样处理，一直到左右两边都排好序为止, 最后让左边数组 + 中间 + 右边数组拼接成为最后的结果
    return quick(leftArr).concat(middleValue,quick(rightArr));
}


