/* 
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
有效字符串需满足：
    左括号必须用相同类型的右括号闭合。
    左括号必须以正确的顺序闭合。

示例 1：
输入：s = "()"
输出：true

示例 2：
输入：s = "()[]{}"
输出：true

示例 3：
输入：s = "(]"
输出：false
*/

const isValid = function (str) {
    //首先判断字符数是否为偶数，如果不是则直接返回false
    if(str.length % 2 === 1) return false;

    const regObj = {
        "(": ")",
        "[": "]",
        "{": "}"
    }
    let stack = [];

    for (let i = 0; i < str.length; i++) {
        if (str[i] === "[" || str[i] === "{" || str[i] === "(") {
            stack.push(str[i]);
        } else {
            const cur = stack.pop();
            if(str[i] !== regObj[cur]) {
                return false;
            }
        }
    }
    // 如果stack中还有数据，则说明不是有效字符串
    if(stack.length) return false;
    return true;
}


