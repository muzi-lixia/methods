// 定义一个类
function Animal(name) {
    // 属性
    this.name = name || 'Animal'
    // 实例方法
    this.sleep = function () {
        console.log(this.name + '正在睡觉');
    }
}
// 原型方法
Animal.prototype.eat = function (food) {
    console.log(this.name + '正在吃：' + food);
}

/*
* 一、原型链继承
*   核心：将父类的实例作为子类的原型
* */
function Cat() {}
Cat.prototype = new Animal();
Cat.prototype.name = 'cat';

let cat = new Cat();
console.log(cat.name); // cat
cat.eat('fish'); // cat正在吃：fish
cat.sleep(); // cat正在睡觉
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); // true
/*
* 优点：
*   1.非常纯粹的继承关系，实例是子类的实例，也是父类的实例
*   2.父类新增原型方法/属性，子类都能访问到
*   3.简单，易于实现
* 缺点：
*   1.想要为子类新增属性和方法，必须要在new Animal()这样的语句之后，不能放构造器中
*   2.来自原型对象的所有属性被所有实例共享
*   3.创建子实例时，无法向父类构造函数传参
*   4.不支持多继承
* */

/*
* 二：构造继承
*   核心：使用父类的构造器来增强子类的实例，等于是复制父类的实例属性给子类（没用到原型）
* */
function Dog(name) {
    Animal.call(this);
    this.name = name || '汪汪';
}
let dog = new Dog();
console.log(dog.name); // 汪汪
dog.sleep(); // 汪汪正在睡觉
// dog.eat('lalla'); // 报错，不能继承原型的属性和方法
console.log(dog instanceof Animal); // false
console.log(dog instanceof Dog); // true
/*
* 优点：
*   1.解决了原型链中子类实例共享父类引用属性的问题
*   2.创建子类实例时，可以向父类传递参数
*   3.可以实现多继承（call多个父类对象）
* 缺点：
*   1.实例不是父类的实例，只是子类的实例
*   2.能继承父类实例的属性和方法，但是不能继承原型的属性和方法
*   3.无法实现函数复用，每个子类都有父类实例函数的副本，影响性能
* */

/*
*  三：实例继承
*   核心：为父类实例添加新特性，作为子类实例返回
* */
function Pig(name) {
    let instance = new Animal();
    instance.name = name || 'pig';
    return instance;
}
let pig = new Pig();
console.log(pig.name); // pig
pig.sleep(); // 睡觉
console.log(pig instanceof Animal); // true
console.log(pig instanceof Pig); // false
/*
* 优点：
*   1.不限制调用方式，不管是new 子类()还是子类()，返回具有相同的效果
* 缺点：
*   1.实例是父类的实例，不是子类的实例
*   2.不支持多继承
* */

/*
* 四：拷贝继承
*   核心：就一个一个拷贝
* */
function Ship(name) {
    let animal = new Animal();
    for (let p in animal) {
        Ship.prototype[p] = animal[p];
    }
    this.name = name || 'ship'
}
let ship = new Ship();
console.log(ship.name); // ship
ship.sleep(); // 睡觉
console.log(ship instanceof Animal); // false
console.log(ship instanceof Ship); // true
/*
* 优点:
*   1.支持多继承
* 缺点：
*   1.效率低，内存占用高（因为要拷贝父类的属性）
*   2.不能获取父类不可枚举方法（不可枚举方法不能使用for in获取）
* */

/*
* 五：组合继承
*   核心：通过父类构造，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型，实现函数复用
* */
function Snake(name) {
    Animal.call(this);
    this.name = name || 'snake';
}
Snake.prototype = new Animal();
Snake.prototype.constructor = Snake;
let snake = new Snake();
console.log(snake.name); // snake
snake.sleep() // snake！
snake.eat('虫子'); // 正在吃：虫子
console.log(snake instanceof Animal); // true
console.log(snake instanceof Snake); // true
/*
* 优点：
*   1.弥补了构造继承的缺陷，可以继承实例属性/方法，也可以继承原型属性/方法
*   2.既是子类的实例，也是父类的实例
*   3.不存在引用共享问题
*   4.支持传参
*   5.函数可复用
* 缺点：
*   1.调用了两次父类构造函数，生成了两份实例(子类实例将子类原型上的那份屏蔽了)
* */

/*
* 六：寄生组合继承
*   核心：通过寄生方式，砍掉父类的实例属性，这样，在调用两次父类的构造时，就不会初始化两次实例属性/方法，避免组合继承的缺陷
* */
function Chicken(name) {
    Animal.call(this);
    this.name = name || 'chicken'
}
// 创建一个没有实例方法的类
let Super = function(){}
Super.prototype = Animal.prototype;
// 将实例作为子类的原型
Chicken.prototype = new Super();

let chicken = new Chicken();
console.log(chicken.name); // chicken
chicken.sleep() // chicken！
console.log(chicken instanceof Animal); // true
console.log(chicken instanceof Chicken); // true
/*
  优点：
    1.基本完美
* 缺点：
*   1.实现复杂
* */
