/* 
给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。
示例 1:
输入: s = "abcabcbb"
输出: 3
解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。

示例 2:
输入: s = "bbbbb"
输出: 1
解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。

示例 3:

输入: s = "pwwkew"
输出: 3
解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
     请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。

示例 4:
输入: s = ""
输出: 0
*/


const lengthOfLongestSubstring = (str) => {
    if(str.length === 0) return 0;
    let left = 0;
    let right = 1;
    let max = 0;
    while (right <= str.length) {
        // 截取字符串
        let sl = str.slice(left, right);
        // 判断截取的字符串 的 右边的第一个字符 是否 在截取的字符串中
        const index = sl.indexOf(str[right]);
        if(index > -1) {
            // 存在则重新选择起始值（起始值为原left值+重复字符串的位置+1）
            left = left + index + 1;
        } else {
            // 不存在，则向右移动一位截取字符串
            sl = str.slice(left, right + 1);
            max = Math.max(max, sl.length);
        }
        right ++;
    }
    return max;
}
// let s = "abcabcbb"
// let s = "bbbbb"
// let s = "pwwkew"
let s = ""

console.log(lengthOfLongestSubstring(s));
