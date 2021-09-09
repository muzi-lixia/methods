console.log(1);
console.log(...new Set([123, {a: 1}, {a: {b: 1}}, {a: "1"}, {a: {b: 1}}, "meili", {a:1, b:2}, {b:2, a:1}]));