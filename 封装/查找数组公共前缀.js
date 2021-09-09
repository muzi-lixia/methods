/* 
编写一个函数来查找字符串数组中的最长公共前缀。
如果不存在公共前缀，返回空字符串 ""。

示例 1：
输入：strs = ["flower","flow","flight"]
输出："fl"

示例 2：
输入：strs = ["dog","racecar","car"]
输出：""
解释：输入不存在公共前缀。
*/
const commonPrefix = (arr) => {
    const str = arr[0];
    let index = 0;
    while (index < arr.length) {
        const strPub = str.slice(0, index + 1);
        for (let i = 0; i < arr.length; i++) {
            if(!arr[i] || !arr[i].startsWith(strPub)) {
                return str.slice(0, index);
            }
        }
        index ++;
    }
    return str;
}
const strs = ["dog","racecar","car"]
console.log(commonPrefix(strs));
