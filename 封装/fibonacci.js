//斐波那契数列
/* function fibonacci(n){
    if(n<=1) return 1;
    let arr = [1,1];
    //=>即将要创建多少个
    let i = n+1 - 2;
    while(i>0){
        let a = arr[arr.length - 2],
            b= arr[arr.length - 1];
        arr.push(a+b);
        i--;
    }
    return arr[arr.length - 1];
} */
 
//递归 1
/* function fibonacci(count){
    function fn(count,curr=1,next=1){
        if(count == 0){
            return curr;
        }else{
            return fn(count - 1, next, curr + next);
        }
    }
    return fn(count);
} */


/* 递归 2*/
function fibonacci(n){
    if(n-2 >= 0){
        return fibonacci(n-1) + fibonacci(n-2);
    }else{
        return 1;
    }
}

console.log(fibonacci(4)); 

