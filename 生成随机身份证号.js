// 生成随机数字，max限制最大值，base限制最小值
function getRandom(max, base) { 
    return Math.floor(Math.random() * max + (base ? base : 0));
}

// 根据前17位生成末位
// 生成随机数字，max限制最大值，base限制最小值
function getRandom(max, base) { 
    return Math.floor(Math.random() * max + (base ? base : 0));
}

// 根据前17位生成末位
function cnNewID(idcard) {
    var arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; // 加权因子
    var arrValid = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2]; // 校验码
    var sum = 0, idx;
    for (var j = 0; j < 17; j++) {
      // 对前17位数字与权值乘积求和
      sum += parseInt(idcard[j], 10) * arrExp[j];
    }
    return arrValid[sum % 11];
}

// 生成身份证号
function getIdcard() {
    var idcard = '';
    for(var i = 0; i < 18; i++) {
        if(i < 6) {
            idcard += getRandom(10)
        }else if(i == 6) {
            idcard += getRandom(2, 1) //年份第一位仅支持1和2
        }else if(i == 7) { 
            idcard += idcard[6] == '1' ? 9 : 0;//两位年份规则，仅支持19和20
        }else if(i == 8) {
            idcard += idcard[6] == '1' ? getRandom(7, 3) : getRandom(2); //三位年份规则，仅支持193-199、200、201这些值
        }else if(i == 9) {
            idcard += getRandom(10) //四位年份规则,0-9
        }else if(i == 10) {
            idcard += getRandom(2);//首位月份规则
        }else if(i == 11) {
            idcard += idcard[10] == '0' ? getRandom(9, 1) : getRandom(3);//末位月份规则
        }else if(i == 12) {
            var maxDays = new Date(idcard.substr(6, 4), idcard.substr(10, 2), 0).getDate(); // 获取当月最大天数
            var day = getRandom(maxDays, 1)
            idcard += day < 10 ? ('0' + day) : day;
            i++
        }else if(i > 13 && i < 17) {
            idcard += getRandom(10)
        }else if(i == 17) {
            idcard += cnNewID(idcard);
        }
    }
    return idcard;
}

console.log(getIdcard()) // 身份证号


// 身份证各位校验规则
let withBirthRE1 = /^\d{6}[03-9]$/; // 年份第一位
let withBirthRE2 = /^\d{6}(19|20)$/; //两位年份规则
let withBirthRE3 = /^\d{6}(19[3-9]|20[01])$/; //三位年份规则，仅支持193-199、200、201这些值
let withBirthRE4 = /^\d{6}(19[3-9][0-9]|20[1-2][0-9])$/; //四位年份规则
let withBirthRE5 = /^\d{10}[01]$/; //月份首位规则
let withBirthRE6 = /^\d{10}(0[1-9]|1[012])$/; //月份末位规则
let withBirthRE7 = /^\d{12}[0-3]$/; //日期首位规则
let withBirthRE8 = /^\d{12}([012][0-9]|3[01])$/; //日期末位规则


// 生成随即名字
function getName(){
    var familyNames = new Array(
    "赵", "钱", "孙", "李", "周", "吴", "郑", "王", "冯", "陈", 
    "褚", "卫", "蒋", "沈", "韩", "杨", "朱", "秦", "尤", "许",
    "何", "吕", "施", "张", "孔", "曹", "严", "华", "金", "魏", 
    "陶", "姜", "戚", "谢", "邹", "喻", "柏", "水", "窦", "章",
    "云", "苏", "潘", "葛", "奚", "范", "彭", "郎", "鲁", "韦", 
    "昌", "马", "苗", "凤", "花", "方", "俞", "任", "袁", "柳",
    "酆", "鲍", "史", "唐", "费", "廉", "岑", "薛", "雷", "贺", 
    "倪", "汤", "滕", "殷", "罗", "毕", "郝", "邬", "安", "常",
    "乐", "于", "时", "傅", "皮", "卞", "齐", "康", "伍", "余", 
    "元", "卜", "顾", "孟", "平", "黄", "和", "穆", "萧", "尹"
    );
    var givenNames = new Array(
    "子璇", "淼", "国栋", "夫子", "瑞堂", "甜", "敏", "尚", "国贤", "贺祥", "晨涛", 
    "昊轩", "易轩", "益辰", "益帆", "益冉", "瑾春", "瑾昆", "春齐", "杨", "文昊", 
    "东东", "雄霖", "浩晨", "熙涵", "溶溶", "冰枫", "欣欣", "宜豪", "欣慧", "建政", 
    "美欣", "淑慧", "文轩", "文杰", "欣源", "忠林", "榕润", "欣汝", "慧嘉", "新建", 
    "建林", "亦菲", "林", "冰洁", "佳欣", "涵涵", "禹辰", "淳美", "泽惠", "伟洋", 
    "涵越", "润丽", "翔", "淑华", "晶莹", "凌晶", "苒溪", "雨涵", "嘉怡", "佳毅", 
    "子辰", "佳琪", "紫轩", "瑞辰", "昕蕊", "萌", "明远", "欣宜", "泽远", "欣怡", 
    "佳怡", "佳惠", "晨茜", "晨璐", "运昊", "汝鑫", "淑君", "晶滢", "润莎", "榕汕", 
    "佳钰", "佳玉", "晓庆", "一鸣", "语晨", "添池", "添昊", "雨泽", "雅晗", "雅涵", 
    "清妍", "诗悦", "嘉乐", "晨涵", "天赫", "玥傲", "佳昊", "天昊", "萌萌", "若萌"
    );
    var i = getRandom(99, 0);
    var familyName = familyNames[i];
    var j = getRandom(101, 0);
    var givenName = givenNames[j];
    var name = familyName + givenName;
    return name
} 
getName()
