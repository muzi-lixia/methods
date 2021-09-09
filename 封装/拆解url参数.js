const url = 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=%E6%B5%8B%E8%AF%95&fenlei=256&rsv_pq=ce1229e6000174c8&rsv_t=d1bdO0she5TwU3wfq0QLRc16%2BtaDrv%2FwdAC2HSd2md0e%2FTEa5qYfvcei33E&rqlang=cn&rsv_enter=1&rsv_dl=tb&rsv_sug3=7&rsv_sug1=7&rsv_sug7=101&rsv_sug2=0&rsv_btype=i&prefixsug=%25E6%25B5%258B%25E8%25AF%2595&rsp=5&inputT=1401&rsv_sug4=1813';

const getUrlParams = (str) => {

    let obj = {};
    str.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => obj[k] = v);
    console.log(obj);
    return obj;

}

getUrlParams(url);
