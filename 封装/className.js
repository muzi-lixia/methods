/* obj为dom节点，cls为class名称 */

/* 判断当前节点是否存在class */
export const hasClass = function(obj, cls) {
    return obj.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
};

/* 添加class */
export const addClass = function(obj, cls) {
    if (!hasClass(obj, cls)) obj.className += " " + cls;
};

/* 存在class则移除 */
export const removeClass = function(obj, cls) {
    if (hasClass(obj, cls)) {
        const reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
        obj.className = obj.className.replace(reg, " ");
    }
};

/* 切换class */
export const toggleClass = function(obj, cls) {
    if (hasClass(obj, cls)) {
        removeClass(obj, cls);
    } else {
        addClass(obj, cls);
    }
};
