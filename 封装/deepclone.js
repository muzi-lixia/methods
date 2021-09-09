//深拷贝  -->   递归
const deepClone = (obj)=>{
    //判断obj是否是数组，如果是，则定为[] , 否则为{}
    let newObj = Array.isArray(obj) ? [] : {};
    //类型检测
    if(obj && typeof obj === 'object'){
        for(let key in obj){
            //忽略继承过来的属性
            if(obj.hasOwnProperty(key)){
                //判断obj 的子元素是否是 object
                if(obj[key] && typeof obj[key] === 'object'){
                    newObj[key] = deepClone(obj[key]);
                }else{
                    newObj[key] = obj[key];
                }
            }
        }
    }
    return newObj;
}

let richGirl = {
    name: 'max',
    age: undefined,
    car: ["aa","bb"],
    drive: function(){}
}

let richBoy = deepClone(richGirl);
richBoy.drive = "大奔";
richBoy.age = 20;
richBoy.name = "小明";

console.log(richGirl);
console.log(richBoy);