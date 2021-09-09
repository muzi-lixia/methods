/* 
实现对象的flatten
例如：let obj = {a: 1, b: {c: '1'} }
结果：obj = {a: 1, a.b.c: '1'}
*/


function isObject(obj) {
    return typeof obj === 'object' && obj !== null;
}

function flatten(obj) {
    if (!isObject(obj)) return;
    let res = {};
    const def = (cur, prefix) => {
        if (isObject(cur)) {
            if (Array.isArray(cur)) {
                cur.forEach((item, index) => {
                    def(item, `${prefix}[${index}]`);
                })
            } else {
                for (const key in cur) {
                    def(cur[key], `${prefix}${prefix ? '.' : ''}${key}`);
                }
            }
        } else {
            res[prefix] = cur;
        }
    }
    def(obj, '');
    return res;
}
const obj = {
    a: {
        b: 1,
        c: 2,
        d: { e: 5 }
    },
    b: [1, 3, { a: 2, b: 3 }],
    c: 3
}
// {
//     'a.b': 1,   
//     'a.c': 2,   
//     'a.d.e': 5, 
//     'b[0]': 1,  
//     'b[1]': 3,  
//     'b[2].a': 2,
//     'b[2].b': 3,
//     c: 3        
//   }

console.log(flatten(obj));
