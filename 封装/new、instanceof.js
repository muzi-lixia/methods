/* 
    实现 new 关键字
    new 运算符用来创建用户自定义的对象类型的实例或者具有构造函数的内置对象的实例
        实现要点：
        1.new 会产生一个新对象
        2.新对象需要能够访问到构造函数的属性，所以需要重新指定它的原型
        3.构造函数可能显示返回
*/
/* 
    MDN对于new关键字的描述
        1.创建一个空的简单JavaScript对象（即{}）
        2.为步骤1新创建的对象添加属性__proto__，将该属性连接至构造函数的原型对象
        3.将步骤1新创建的对象作为this的上下文
        4.如果该函数没有返回对象，则返回this上下文
*/
function objectFactory() {
    let obj = new Object();
    let Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    let res = Constructor.apply(obj, arguments);
    // ret || obj 这里这么写考虑了构造函数显示返回 null 的情况
    return typeof res === 'object' ? res || obj : obj;
}
function person(name, age) {
    this.name = name;
    this.age = age;
}
console.log(objectFactory(person, '哈哈', 18)); // ==> person {name: "哈哈", age: 18}

/* 
    实现 instanceof 
    instanceof就是判断构造函数的prototype属性是否在实例的原型链上
*/
function my_instanceof(left, right) {
    const baseType = ['string', 'number','boolean','undefined','symbol']
    if(baseType.includes(typeof left)) return false;
    // let proto = left.__proto__;
    let proto = Object.getPrototypeOf(left);
    while(true) {
        if (proto === null) return null;
        if (proto === right.prototype) return true;
        proto = proto.__proto__;
    }
}
function Person1(name, age) {
    this.name = name;
    this.age = age;
}
let person1 = new Person1('muzi', 18)
console.log(person1); // ==> Person1 {name: "muzi", age: 18}
console.log( my_instanceof(person1, Person1) ); // ==> true
