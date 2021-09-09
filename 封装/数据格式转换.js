/**
 * 将对象转换成get请求后面的参数一样的字符串
 * @param obj
 * @return {string} ?a=1&b=2
 */
export const generParamsStr = (obj) => {
  let rangeArr = '';
  let param = '';
  if (obj && typeof obj === 'object') {
    for (let i in obj) {
      if (rangeArr === '') {
        rangeArr += '?'
      }
      if (Object.prototype.hasOwnProperty.call(obj, i) && obj[i] !== '') {
        rangeArr += `${i}=${obj[i]}&`
      }
    }
    return rangeArr.replace(/&$/, '')
  }
  return param
};

/**
 * 将url的参数转换成对象
 */
export const generParamObj = () => {
  let arr = decodeURI(window.location.href).split('?');
  let rst = {}
  if (arr && arr.length > 1) {
    let paramStr = arr[1]
    let params = paramStr.split('&');

    for (let item of params) {
      let keyAndVal = item.split('=');
      rst[keyAndVal[0]] = keyAndVal[1]
    }
  }
  return rst
};

export const deepClone = (obj) => {
  let objClone =  Array.isArray(obj) ? [] : {};
  if (obj && typeof obj === 'object') {
    for(let key in obj){
      if (obj[key] && typeof obj[key] === 'object'){
        objClone[key] = deepClone(obj[key]);
      }else{
        objClone[key] = obj[key]
      }
    }
  }
  return objClone;
};
