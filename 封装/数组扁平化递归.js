~ function (){
    function myFlat(){
        let result = [],
        _this = this;
        //循环数组中的每一项，把不是数组的存储到数组中
        let fn = (arr)=>{
            for(let i = 0; i < arr.length; i++){
                let item = arr[i];
                if(Array.isArray(item)){
                    fn(item);
                    continue;
                }
                result.push(item);
            }
        }
        fn(_this);
        return result;
    }
    Array.prototype.myFlat = myFlat;
}();
arr = arr.myFlat();