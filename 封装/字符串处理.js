
//方式一：(常规处理)
function mostCharInStr(str){
    let obj = {}
    let arr = str.split('');
    let max = 1;
    let s = arr[0]
    for(let i=1;i<arr.length;i++){
        if(obj[arr[i]]){
            let count = ++obj[arr[i]]
            if(count > max){
                max = count
                s = arr[i]
            }
        }else{
            obj[arr[i]] = 1
        }
    }
    return [s,max]
}


//方式二：(正则处理)
const mostCharInStr = (str) => {
    let temp = str.split('').sort().join('')
    // 先进行排序处理，然后重新组装成字符串
    let reg = /(\w)\1+/g
    let num = 0
    let value = null
    temp.replace(reg, function($0, $1){
        if (num < $0.length) {
            num = $0.length
            value = $1
        };
    });
    return {num, value}
}
