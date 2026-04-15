# 第一梯队（极高频）
这些基本 **每个公司都可能会问，别去赌不考的概率**

## 什么是 JavaScript 事件循环（Event Loop）？宏任务和微任务执行顺序是怎样的？
### 为什么需要事件循环
JavaScript 是 **单线程语言**，同一时间只能执行一个任务。但浏览器中存在大量 **异步任务**（网络请求、定时器、DOM事件等），因此需要一种机制协调 **同步代码和异步回调的执行顺序**，这就是 **Event Loop**。

### 执行模型
JS 运行时主要包含：

1. **Call Stack（调用栈）**
2. **Web APIs / Node APIs**
3. **Task Queue（任务队列）**

异步任务执行流程：

```plain
同步代码 → 调用栈执行

异步任务：
    ↓
Web API执行
    ↓
回调进入任务队列
    ↓
事件循环检测
    ↓
调用栈为空 → 执行队列任务
```

### 宏任务和微任务
JS 任务分为两类：

#### 宏任务（MacroTask）
常见：

+ script
+ setTimeout
+ setInterval
+ setImmediate（Node）
+ I/O
+ UI 渲染

#### 微任务（MicroTask）
常见：

+ Promise.then
+ MutationObserver
+ queueMicrotask
+ process.nextTick（Node）

### 执行顺序
事件循环规则：

```plain
执行一个宏任务
      ↓
执行所有微任务
      ↓
渲染页面
      ↓
进入下一个宏任务
```

流程：

```plain
script (宏任务)

→ 执行同步代码

→ 执行微任务队列

→ 渲染

→ 下一个宏任务
```

### 经典面试代码
**<font style="color:#DF2A3F;">更多题型请看代码输出题专题</font>**

```jsx
console.log(1)

setTimeout(()=>{
  console.log(2)
})

Promise.resolve().then(()=>{
  console.log(3)
})

console.log(4)
```

执行顺序：

```plain
1
4
3
2
```

原因：

```plain
script
  1
  4

微任务
  3

宏任务
  2
```

## Promise 的状态有哪些？状态如何变化？
Promise 有 **3 个状态**

```plain
pending   初始状态
fulfilled 成功
rejected  失败
```

状态转换：

```plain
pending → fulfilled
pending → rejected
```

特点：

1. **状态一旦改变不可逆**
2. 只能从 pending 改变一次
3. fulfilled / rejected 都属于 **settled**

### 示例
```jsx
const p = new Promise((resolve,reject)=>{
  resolve(1)
})
```

状态变化：

```plain
pending → fulfilled
```

### 注意
```jsx
resolve()
reject()
```

谁先执行谁生效。

## Promise.then 返回值规则是什么？（返回普通值 / Promise / 抛异常）
then 会 返回一个新的 Promise

规则：

### 返回普通值
```jsx
Promise.resolve(1)
  .then(v=>{
    return v+1
  })
```

等价于：

```jsx
Promise.resolve(2)
```

### 返回 Promise
```jsx
.then(()=>{
  return Promise.resolve(5)
})
```

新的 Promise 会 **等待内部 Promise 结果**

### 抛异常
```jsx
.then(()=>{
  throw new Error()
})
```

等价于

```jsx
return Promise.reject()
```

### 返回 nothing
```jsx
.then(()=>{
})
```

返回

```jsx
Promise.resolve(undefined)
```

### 面试总结口诀
```plain
return value → fulfilled(value)

return promise → 状态跟随 promise

throw error → rejected(error)
```

## async / await 和 Promise 的关系是什么？
### 本质
async / await 是 Promise 的语法糖

### async 函数
特点：返回值一定是 **Promise**

```jsx
async function test(){
  return 1
}
```

等价于：

```jsx
Promise.resolve(1)
```

await

作用：

```plain
等待 Promise 结果
```

示例：

```jsx
async function test(){
  const res = await fetch()
}
```

执行过程：

```plain
暂停函数执行
等待 Promise 完成
恢复执行
```

### await 原理
本质等价：

```jsx
promise.then()
```

### 示例
```jsx
async function test(){
  console.log(1)
  await Promise.resolve()
  console.log(2)
}
test()
console.log(3)
```

输出：

```plain
1
3
2
```

原因：

```plain
await → 微任务
```

## JavaScript 有哪些数据类型？
JS 有 **8 种数据类型**

分两类：

### 原始类型（Primitive）
1. number
2. string
3. boolean
4. null
5. undefined
6. symbol
7. bigint

### 引用类型（Reference）
```plain
object
```

包括：

```plain
Object
Array
Function
Date
Map
Set
```

### 存储区别
原始类型：

```plain
栈内存
```

引用类型：

```plain
栈存引用
堆存数据
```

## 如何判断数据类型？（typeof / instanceof / Object.prototype.toString）他们之间的区别
三种常见方式：

### （1）typeof
```plain
typeof 1
```

结果：

```plain
number
string
boolean
undefined
symbol
bigint
function
object
```

问题：

```plain
typeof null === "object"
```

历史 bug。

### （2）instanceof
判断 **原型链**

```plain
[] instanceof Array
```

原理：

```plain
看 prototype 是否在原型链上
```

局限：

```plain
不能判断 primitive
```

例如：

```plain
1 instanceof Number // false
```

### （3）Object.prototype.toString
最准确方法

```jsx
Object.prototype.toString.call([])
```

结果：

```plain
[object Array]
```

例子：

```plain
[object Object]
[object Array]
[object Number]
[object String]
```

### 三者区别总结
| 方法 | 作用 |
| --- | --- |
| typeof | 判断基础类型 |
| instanceof | 判断对象类型 |
| toString | 最准确 |


## 原型链是什么？JavaScript 的继承是如何实现的？
JS 是 **基于原型的继承**

### 原型结构
每个对象都有：[[Prototype]]

访问方式：__proto__

函数有：prototype

结构：

```plain
实例
 ↓
prototype
 ↓
Object.prototype
 ↓
null
```

这条链叫：原型链

### 作用
实现：

1. 属性查找
2. 方法复用
3. 继承

### 示例
```jsx
function Person(){}

Person.prototype.sayHi = function(){
  console.log("hi")
}

const p = new Person()
p.sayHi()
```

查找过程：

```plain
p
↓
Person.prototype
↓
Object.prototype
```

### 继承实现方式
常见：

1. 原型链继承
2. 构造函数继承
3. 组合继承
4. **寄生组合继承（推荐）**
5. class extends

### class 本质
```plain
class A {}
class B extends A {}
```

本质仍然是：

```plain
prototype 继承
```

## 闭包是什么？有哪些应用场景？可能产生什么问题？
### 定义
函数 + 其词法作用域

简单说：函数可以访问外部函数变量

### 示例
```jsx
function outer(){
  let a = 1

  return function inner(){
    console.log(a)
  }
}

const fn = outer()
fn()
```

inner 访问 outer 的变量。

### 原理
JS 采用：词法作用域

函数会记住定义时的作用域

### 应用场景
1️⃣ 数据私有化

```jsx
function counter(){
  let count = 0
  return ()=>{
    count++
  }
}
```

2️⃣ 函数柯里化

```jsx
add(1)(2)(3)
```

3️⃣ 模块封装

早期 JS：IIFE

### 可能问题
**内存泄漏**

例如：DOM 引用未释放

因为闭包会保持变量引用。

解决：手动置 null

## var / let / const 的区别是什么？
| 特性 | var | let | const |
| --- | --- | --- | --- |
| 作用域 | 函数 | 块级 | 块级 |
| 变量提升 | 有 | 有（TDZ） | 有（TDZ） |
| 重复声明 | 可以 | 不行 | 不行 |
| 修改值 | 可以 | 可以 | 不行 |


### TDZ（暂时性死区）
```jsx
console.log(a)
let a = 1
```

报错。

### const 注意
```jsx
const obj = {}
obj.a = 1
```

允许。

const 只是：引用不可变

## 箭头函数和普通函数的区别是什么？
核心区别：

### this
箭头函数：没有自己的 this

继承外层 this。

普通函数：this 动态绑定

示例：

```jsx
const obj = {
  a:1,
  fn:()=>{
    console.log(this.a)
  }
}
```

this 指向：window

### arguments
箭头函数没有：arguments

### 不能 new
```plain
new Arrow()
```

报错。

### 没有 prototype
普通函数：function.prototype

箭头函数：没有

### 更适合回调
常用于：map、then、filter

# 第二梯队（高频）
这些也是 **大厂常问**

1. **JavaScript 为什么是单线程？如何实现异步编程？**
2. **宏任务和微任务分别有哪些？**
3. **Promise.all / Promise.race / Promise.allSettled 的区别是什么？**
4. **事件循环相关代码输出题（Promise + setTimeout）**
5. **new 一个构造函数时内部发生了什么？**
6. **call、apply、bind 的区别是什么？**
7. **this 的指向规则是什么？**
8. **深拷贝有哪些实现方式？**
9. **垃圾回收机制是什么？新生代和老生代如何工作？**
10. **栈和堆的区别是什么？**

## **第二梯队（高频）**
### **1. JavaScript 为什么是单线程？如何实现异步编程？**
#### **为什么是单线程？**
```javascript
// 1. 避免 DOM 操作冲突
// 如果多线程同时操作 DOM，会导致不可预知的结果
// 例如：线程 A 删除节点，线程 B 修改该节点

// 2. 简化编程模型
// 单线程无需考虑锁、死锁、竞态条件等并发问题
// 代码执行顺序确定，易于理解和调试

// 3. 历史原因
// JavaScript 最初设计用于浏览器表单验证等简单操作
// 单线程足以满足早期需求
```

#### **如何实现异步编程？**
```javascript
// 1. 回调函数（Callback）- 最早的方式
function fetchData(callback) {
  setTimeout(() => {
    callback('data');
  }, 1000);
}

// 2. Promise - ES6
function fetchDataPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('data');
    }, 1000);
  });
}

fetchDataPromise()
  .then(data => console.log(data))
  .catch(err => console.error(err));

// 3. async/await - ES2017（Promise 的语法糖）
async function getData() {
  try {
    const data = await fetchDataPromise();
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

// 4. Generator + 自动执行器
function* gen() {
  const data = yield fetchDataPromise();
  console.log(data);
}

// 5. 事件监听/DOM 事件
button.addEventListener('click', () => {
  console.log('clicked');
});
```

#### **异步编程演进**
```plain
回调函数 -> Promise -> Generator -> async/await
  嵌套地狱      链式调用      协程       同步写法
```

### **2. 宏任务和微任务分别有哪些？**
**难度****：**🔴** 高频 | ****出现次数****：10+**

#### **宏任务（Macrotask）**
```javascript
// 宏任务来源：
// 1. script 整体代码
// 2. setTimeout / setInterval
// 3. I/O 操作（如文件读取、网络请求）
// 4. UI 渲染
// 5. setImmediate（Node.js）
// 6. MessageChannel
// 7. requestAnimationFrame

setTimeout(() => console.log('setTimeout'), 0);
setInterval(() => console.log('setInterval'), 1000);
```

#### **微任务（Microtask）**
```javascript
// 微任务来源：
// 1. Promise.then / catch / finally
// 2. MutationObserver
// 3. queueMicrotask()
// 4. process.nextTick（Node.js，优先级最高）

Promise.resolve().then(() => console.log('Promise'));
queueMicrotask(() => console.log('queueMicrotask'));
```

#### **执行顺序**
```javascript
console.log('1');  // 同步

setTimeout(() => {
  console.log('2');  // 宏任务
}, 0);

Promise.resolve().then(() => {
  console.log('3');  // 微任务
});

console.log('4');  // 同步

// 输出顺序：1 -> 4 -> 3 -> 2
// 1. 执行同步代码
// 2. 执行所有微任务
// 3. 执行一个宏任务
// 4. 重复 2-3
```

#### **完整执行流程**
```plain
1. 执行同步代码
2. 执行所有微任务（直到微任务队列为空）
3. 执行一个宏任务
4. 回到步骤 2
```

### **3. Promise.all / Promise.race / Promise.allSettled 的区别是什么？**
#### **对比表**
| **方法** | **成功条件** | **失败条件** | **返回值** |
| --- | --- | --- | --- |
| `**Promise.all**` | **所有 Promise 成功** | **任一 Promise 失败** | **所有结果的数组** |
| `**Promise.race**` | **任一 Promise 完成** | **任一 Promise 失败** | **最快完成的那个结果** |
| `**Promise.allSettled**` | **所有 Promise 完成（无论成功失败）** | **不会失败** | **包含状态的对象数组** |
| `**Promise.any**` | **任一 Promise 成功** | **所有 Promise 失败** | **第一个成功的结果** |


#### **Promise.all**
```javascript
// 所有成功才成功，一个失败就失败
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

Promise.all([p1, p2, p3])
  .then(values => console.log(values))  // [1, 2, 3]
  .catch(err => console.error(err));

// 有一个失败
const p4 = Promise.reject('error');
Promise.all([p1, p4])
  .then(values => console.log(values))
  .catch(err => console.error(err));  // 'error'

// 使用场景：并行请求多个接口，需要所有结果
Promise.all([
  fetch('/api/user'),
  fetch('/api/orders'),
  fetch('/api/settings')
]).then(([user, orders, settings]) => {
  // 处理所有数据
});
```

#### **Promise.race**
```javascript
// 返回最快完成的那个（无论成功或失败）
const fast = new Promise(resolve => setTimeout(() => resolve('fast'), 100));
const slow = new Promise(resolve => setTimeout(() => resolve('slow'), 500));

Promise.race([fast, slow])
  .then(result => console.log(result));  // 'fast'

// 使用场景：设置超时
function fetchWithTimeout(url, timeout = 5000) {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), timeout)
    )
  ]);
}
```

#### **Promise.allSettled**
```javascript
// 等待所有 Promise 完成，无论成功或失败
const promises = [
  Promise.resolve('success'),
  Promise.reject('error'),
  Promise.resolve('another success')
];

Promise.allSettled(promises)
  .then(results => {
    console.log(results);
    // [
    //   { status: 'fulfilled', value: 'success' },
    //   { status: 'rejected', reason: 'error' },
    //   { status: 'fulfilled', value: 'another success' }
    // ]
  });

// 使用场景：批量操作，需要知道每个的结果，不因一个失败而中断
```

#### **Promise.any**
```javascript
// 任一成功就成功，全部失败才失败
const p1 = Promise.reject('error1');
const p2 = Promise.resolve('success');
const p3 = Promise.reject('error2');

Promise.any([p1, p2, p3])
  .then(result => console.log(result))  // 'success'
  .catch(err => console.log(err.errors));  // ['error1', 'error2']

// 使用场景：多个 CDN 地址，取最快可用的
```

### **4. 事件循环相关代码输出题（Promise + setTimeout）**
#### **经典题目**
```javascript
console.log('1');

setTimeout(() => {
  console.log('2');
  Promise.resolve().then(() => {
    console.log('3');
  });
}, 0);

Promise.resolve().then(() => {
  console.log('4');
  setTimeout(() => {
    console.log('5');
  }, 0);
});

console.log('6');
```

**答案****：**`**1 6 4 2 3 5**`

**解析****：**

```plain
1. 同步代码：1, 6
2. 微任务队列：[4]
3. 执行微任务 4，遇到 setTimeout，宏任务队列：[2, 5]
4. 宏任务队列执行 2，输出 2，遇到 Promise，微任务队列：[3]
5. 执行微任务 3，输出 3
6. 执行宏任务 5，输出 5
```

#### **async/await 版本**
```javascript
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
}

console.log('script start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

async1();

new Promise(resolve => {
  console.log('promise1');
  resolve();
}).then(() => {
  console.log('promise2');
});

console.log('script end');
```

**答案****：**`**script start -> async1 start -> async2 -> promise1 -> script end -> async1 end -> promise2 -> setTimeout**`

**解析****：**

```javascript
// await 后面的代码相当于放入微任务队列
// await async2() 等价于：
// Promise.resolve(async2()).then(() => console.log('async1 end'))
```

### **5. new 一个构造函数时内部发生了什么？**
**难度****：**🔴** 高频 | ****出现次数****：4+**

#### **new 操作符执行过程**
```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function() {
  console.log(`Hi, I'm ${this.name}`);
};

const person = new Person('Tom');
```

**内部执行步骤****：**

```javascript
function myNew(Constructor, ...args) {
  // 1. 创建一个空对象
  const obj = {};
  
  // 2. 将对象的原型指向构造函数的 prototype
  Object.setPrototypeOf(obj, Constructor.prototype);
  // 或者：obj.__proto__ = Constructor.prototype;
  
  // 3. 执行构造函数，this 绑定到新对象
  const result = Constructor.apply(obj, args);
  
  // 4. 如果构造函数返回对象，则返回该对象；否则返回新对象
  return (result !== null && (typeof result === 'object' || typeof result === 'function')) 
    ? result 
    : obj;
}

// 使用
const person = myNew(Person, 'Tom');
person.sayHi();  // Hi, I'm Tom
```

#### **完整手写实现**
```javascript
function myNew(Constructor, ...args) {
  // 1. 创建对象，原型指向 Constructor.prototype
  const obj = Object.create(Constructor.prototype);
  
  // 2. 执行构造函数
  const result = Constructor.apply(obj, args);
  
  // 3. 返回对象
  return (typeof result === 'object' && result !== null) ? result : obj;
}

// 测试
function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.greet = function() {
  return `Hello, I'm ${this.name}`;
};

const p = myNew(Person, 'Tom', 20);
console.log(p.name);      // Tom
console.log(p.age);       // 20
console.log(p.greet());   // Hello, I'm Tom
console.log(p instanceof Person);  // true
```

### **6. call、apply、bind 的区别是什么？**
**难度****：**🔴** 高频 | ****出现次数****：5+**

#### **对比表**
| **特性** | `**call**` | `**apply**` | `**bind**` |
| --- | --- | --- | --- |
| **执行时机** | **立即执行** | **立即执行** | **返回新函数，不立即执行** |
| **参数形式** | **逐个传递** | **数组传递** | **逐个传递** |
| **返回值** | **函数执行结果** | **函数执行结果** | **绑定 this 的新函数** |


#### **基本用法**
```javascript
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person = { name: 'Tom' };

// call - 立即执行，参数逐个传递
greet.call(person, 'Hello', '!');  // Hello, Tom!

// apply - 立即执行，参数数组传递
greet.apply(person, ['Hi', '?']);  // Hi, Tom?

// bind - 返回新函数，不立即执行
const boundGreet = greet.bind(person, 'Hey');
boundGreet('!!!');  // Hey, Tom!!!
```

#### **手写实现**
```javascript
// 手写 call
Function.prototype.myCall = function(thisArg, ...args) {
  // 1. 处理 thisArg
  thisArg = thisArg || globalThis;
  
  // 2. 将函数作为 thisArg 的方法
  const fnSymbol = Symbol('fn');
  thisArg[fnSymbol] = this;
  
  // 3. 执行函数
  const result = thisArg[fnSymbol](...args);
  
  // 4. 清理
  delete thisArg[fnSymbol];
  
  return result;
};

// 手写 apply
Function.prototype.myApply = function(thisArg, argsArray) {
  thisArg = thisArg || globalThis;
  const fnSymbol = Symbol('fn');
  thisArg[fnSymbol] = this;
  
  const result = thisArg[fnSymbol](...argsArray);
  
  delete thisArg[fnSymbol];
  return result;
};

// 手写 bind
Function.prototype.myBind = function(thisArg, ...bindArgs) {
  const originalFn = this;
  
  return function(...callArgs) {
    return originalFn.apply(thisArg, [...bindArgs, ...callArgs]);
  };
};

// 测试
function sum(a, b) {
  return this.base + a + b;
}

const obj = { base: 10 };
console.log(sum.myCall(obj, 1, 2));    // 13
console.log(sum.myApply(obj, [1, 2])); // 13
const boundSum = sum.myBind(obj, 1);
console.log(boundSum(2));              // 13
```

#### **使用场景**
```javascript
// 1. 借用方法
const arr = Array.prototype.slice.call(arguments);

// 2. 判断数据类型
Object.prototype.toString.call([]);   // [object Array]
Object.prototype.toString.call({});   // [object Object]

// 3. 实现继承（ES5）
function Parent(name) {
  this.name = name;
}

function Child(name, age) {
  Parent.call(this, name);  // 借用父类构造函数
  this.age = age;
}

// 4. 函数柯里化
function multiply(a, b, c) {
  return a * b * c;
}

const multiplyByTwo = multiply.bind(null, 2);
console.log(multiplyByTwo(3, 4));  // 24
```

### **7. this 的指向规则是什么？**
**难度****：**🔴** 高频 | ****出现次数****：5+**

#### **this 指向规则（优先级从高到低）**
```javascript
// 1. new 绑定（最高优先级）
function Person(name) {
  this.name = name;  // this 指向新创建的实例
}
const person = new Person('Tom');

// 2. 显式绑定（call/apply/bind）
function greet() {
  console.log(this.name);
}
greet.call({ name: 'Tom' });  // this 指向传入的对象

// 3. 隐式绑定（对象方法调用）
const user = {
  name: 'Tom',
  greet() {
    console.log(this.name);  // this 指向 user
  }
};
user.greet();

// 4. 默认绑定（直接调用）
function sayHi() {
  console.log(this);  // 严格模式：undefined；非严格模式：window/global
}
sayHi();

// 5. 箭头函数（没有自己的 this，继承外层 this）
const obj = {
  name: 'Tom',
  regularFunc: function() {
    console.log(this.name);  // Tom
  },
  arrowFunc: () => {
    console.log(this.name);  // undefined（继承全局 this）
  }
};
```

#### **优先级验证**
```javascript
// new 绑定 > 显式绑定
function Foo() {
  this.name = 'Foo';
}

const obj = { name: 'obj' };
const foo = new Foo.call(obj);  // 报错，不能同时使用

// 显式绑定 > 隐式绑定
function greet() {
  console.log(this.name);
}

const obj1 = { name: 'obj1', greet };
const obj2 = { name: 'obj2' };

obj1.greet.call(obj2);  // obj2（显式绑定胜）
```

#### **常见陷阱**
```javascript
// 1. 方法作为回调函数
const user = {
  name: 'Tom',
  greet() {
    console.log(this.name);
  }
};

setTimeout(user.greet, 100);  // undefined（this 丢失）

// 解决
setTimeout(() => user.greet(), 100);  // Tom
setTimeout(user.greet.bind(user), 100);  // Tom

// 2. 嵌套函数
const obj = {
  name: 'Tom',
  outer() {
    console.log(this.name);  // Tom
    
    function inner() {
      console.log(this.name);  // undefined（默认绑定）
    }
    inner();
    
    // 解决
    const arrow = () => {
      console.log(this.name);  // Tom（继承 outer 的 this）
    };
    arrow();
  }
};
```

### **8. 深拷贝有哪些实现方式？**
**难度****：**🔴** 高频 | ****出现次数****：4+**

#### **方法对比**
| **方法** | **优点** | **缺点** |
| --- | --- | --- |
| `**JSON.parse(JSON.stringify())**` | **简单** | **不能处理函数、Date、RegExp、循环引用等** |
| `**structuredClone()**` | **原生支持，功能完整** | **浏览器兼容性、不能克隆函数** |
| `**_.cloneDeep()**` | **功能完善** | **需要引入库** |
| **递归实现** | **可控、可定制** | **代码复杂** |


#### **1. JSON 方法（最简单，但有局限）**
```javascript
const obj = { a: 1, b: { c: 2 } };
const clone = JSON.parse(JSON.stringify(obj));

// 缺点：
// 1. 不能拷贝函数
// 2. 不能拷贝 Date（会变成字符串）
// 3. 不能拷贝 RegExp、Map、Set 等
// 4. 不能处理循环引用
// 5. 会忽略 undefined、Symbol
```

#### **2. structuredClone（现代浏览器）**
```javascript
const obj = { a: 1, b: new Date(), c: new Map() };
const clone = structuredClone(obj);

// 优点：原生支持，能处理大多数数据类型
// 缺点：
// 1. 不能克隆函数
// 2. 不能克隆 DOM 节点
// 3. 浏览器兼容性（IE 不支持）
```

#### **3. 递归实现（面试常考）**
```javascript
function deepClone(obj, hash = new WeakMap()) {
  // 处理 null 或基本类型
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  
  // 处理日期
  if (obj instanceof Date) {
    return new Date(obj);
  }
  
  // 处理正则
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  
  // 处理循环引用
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  
  // 处理 Map
  if (obj instanceof Map) {
    const cloneMap = new Map();
    hash.set(obj, cloneMap);
    obj.forEach((value, key) => {
      cloneMap.set(deepClone(key, hash), deepClone(value, hash));
    });
    return cloneMap;
  }
  
  // 处理 Set
  if (obj instanceof Set) {
    const cloneSet = new Set();
    hash.set(obj, cloneSet);
    obj.forEach(value => {
      cloneSet.add(deepClone(value, hash));
    });
    return cloneSet;
  }
  
  // 处理数组
  if (Array.isArray(obj)) {
    const cloneArr = [];
    hash.set(obj, cloneArr);
    for (let i = 0; i < obj.length; i++) {
      cloneArr[i] = deepClone(obj[i], hash);
    }
    return cloneArr;
  }
  
  // 处理普通对象
  const cloneObj = Object.create(Object.getPrototypeOf(obj));
  hash.set(obj, cloneObj);
  
  for (const key of Reflect.ownKeys(obj)) {
    const value = obj[key];
    cloneObj[key] = deepClone(value, hash);
  }
  
  return cloneObj;
}

// 测试
const obj = {
  a: 1,
  b: { c: 2 },
  d: [1, 2, 3],
  e: new Date(),
  f: /abc/g,
  g: new Map([['key', 'value']]),
  h: new Set([1, 2, 3])
};
obj.self = obj;  // 循环引用

const cloned = deepClone(obj);
console.log(cloned.b === obj.b);  // false（深拷贝）
console.log(cloned.self === cloned);  // true（循环引用正确处理）
```

### **9. 垃圾回收机制是什么？新生代和老生代如何工作？**
**难度****：**🔴** 高频 | ****出现次数****：3+**

#### **垃圾回收原理**
```javascript
// JavaScript 使用自动垃圾回收（Garbage Collection）
// 核心概念：找出不再使用的内存，然后释放

// 判断对象是否可回收：
// 1. 引用计数（早期，有循环引用问题）
// 2. 标记-清除（现代浏览器主流）
```

#### **标记-清除算法**
```javascript
// 1. 标记阶段：从根对象（全局对象）出发，遍历所有可到达的对象，标记为"活动"
// 2. 清除阶段：遍历堆内存，清除未标记的对象

// 根对象包括：
// - 全局变量
// - 当前执行栈中的变量
// - 被闭包引用的变量
```

#### **V8 分代回收**
```javascript
// V8 将堆内存分为两个代：
// 1. 新生代（Young Generation）：存放存活时间短的对象
// 2. 老生代（Old Generation）：存放存活时间长的对象
```

#### **新生代（Young Generation）**
```javascript
// 新生代特点：
// - 容量小（默认 1-8MB）
// - 对象存活时间短
// - 使用 Scavenge 算法

// Scavenge 算法：
// 1. 将新生代分为两个半空间：From 空间和 To 空间
// 2. 新对象分配在 From 空间
// 3. 垃圾回收时，将 From 空间的存活对象复制到 To 空间
// 4. 清空 From 空间
// 5. 交换 From 和 To 空间

// 对象晋升：
// - 经过两次垃圾回收仍然存活的对象，晋升到老生代
// - To 空间使用率超过 25% 时，对象直接晋升（防止复制大量数据）
```

#### **老生代（Old Generation）**
```javascript
// 老生代特点：
// - 容量大
// - 对象存活时间长
// - 使用标记-清除和标记-整理算法

// 标记-清除（Mark-Sweep）：
// 1. 标记所有存活对象
// 2. 清除未标记的对象
// 3. 产生内存碎片

// 标记-整理（Mark-Compact）：
// 1. 标记所有存活对象
// 2. 将存活对象向一端移动
// 3. 清理边界外的内存
// 4. 无内存碎片，但耗时更长

// 使用场景：
// - 标记-清除：快速回收，但产生碎片
// - 标记-整理：碎片严重时使用
```

#### **垃圾回收优化**
```javascript
// 1. 增量标记（Incremental Marking）
//    - 将标记过程拆分成小步骤，穿插在 JS 执行中
//    - 减少卡顿

// 2. 惰性清理（Lazy Sweeping）
//    - 不立即清理所有垃圾
//    - 按需清理，减少暂停时间

// 3. 并发标记（Concurrent Marking）
//    - 辅助线程并行标记
//    - 主线程继续执行 JS
```

#### **内存泄漏预防**
```javascript
// 1. 及时解除引用
let data = fetchLargeData();
processData(data);
data = null;  // 解除引用

// 2. 使用 WeakMap/WeakSet
const cache = new WeakMap();  // 键是弱引用，不影响垃圾回收

// 3. 清除定时器
const timer = setInterval(() => {}, 1000);
clearInterval(timer);

// 4. 移除事件监听
element.removeEventListener('click', handler);
```

### **10. 栈和堆的区别是什么？**
**难度****：**🔴** 高频 | ****出现次数****：4+**

#### **对比表**
| **特性** | **栈（Stack）** | **堆（Heap）** |
| --- | --- | --- |
| **存储内容** | **基本类型、函数调用、局部变量** | **对象、数组、函数等引用类型** |
| **内存分配** | **自动分配，固定大小** | **动态分配，不固定大小** |
| **访问速度** | **快** | **慢** |
| **内存管理** | **自动（函数执行完自动释放）** | **垃圾回收器管理** |
| **存储结构** | **线性、连续** | **树形、不连续** |
| **大小限制** | **较小（通常 1-2MB）** | **较大（看系统内存）** |
| **线程安全** | **每个线程独立栈** | **多线程共享堆** |


#### **栈（Stack）**
```javascript
// 栈存储：
// 1. 基本类型的值
let num = 10;        // num 的值 10 在栈中
let str = 'hello';   // str 的值 'hello' 在栈中
let bool = true;     // bool 的值 true 在栈中

// 2. 函数调用帧（Call Stack）
function a() {
  let x = 1;  // x 在栈中
  b();
}

function b() {
  let y = 2;  // y 在栈中
}

a();
// 调用栈：
// 1. a() 入栈
// 2. b() 入栈
// 3. b() 执行完，出栈
// 4. a() 执行完，出栈
```

#### **堆（Heap）**
```javascript
// 堆存储引用类型的数据
const obj = { name: 'Tom' };  // obj 在栈中（存储地址），{ name: 'Tom' } 在堆中
const arr = [1, 2, 3];        // arr 在栈中（存储地址），[1, 2, 3] 在堆中

// 多个变量引用同一对象
const a = { x: 1 };  // 堆中创建 { x: 1 }，a 存储地址
const b = a;         // b 复制 a 的地址，指向同一对象
b.x = 2;
console.log(a.x);    // 2（a 和 b 指向同一对象）
```

#### **内存分配图示**
```plain
栈（Stack）                    堆（Heap）
┌──────────┐                 ┌──────────────┐
│ num: 10  │                 │ { name: 'Tom'}│ <- 0x001
├──────────┤                 ├──────────────┤
│ str: ptr │ ---------------->│ 'hello'      │ <- 0x002
├──────────┤                 ├──────────────┤
│ obj: 0x01│ ---------------->│ [1, 2, 3]    │ <- 0x003
├──────────┤                 ├──────────────┤
│ arr: 0x03│ ---------------->│ function(){} │ <- 0x004
└──────────┘                 └──────────────┘
```

#### **实际应用**
```javascript
// 1. 基本类型赋值是值复制
let a = 10;
let b = a;  // b 得到 10 的副本
b = 20;
console.log(a);  // 10（互不影响）

// 2. 引用类型赋值是地址复制
let obj1 = { x: 1 };
let obj2 = obj1;  // obj2 得到 obj1 的地址
obj2.x = 2;
console.log(obj1.x);  // 2（互相影响）

// 3. 函数参数传递
function changeValue(num, obj) {
  num = 100;      // 修改栈中的副本
  obj.x = 100;    // 修改堆中的对象
}

let n = 1;
let o = { x: 1 };
changeValue(n, o);
console.log(n);  // 1（不变）
console.log(o.x);  // 100（改变）
```

#### **栈溢出**
```javascript
// 栈空间有限，递归过深会导致栈溢出
function infiniteRecursion() {
  infiniteRecursion();
}

infiniteRecursion();  // RangeError: Maximum call stack size exceeded

// 解决：尾递归优化（ES6）
function factorial(n, acc = 1) {
  if (n <= 1) return acc;
  return factorial(n - 1, n * acc);  // 尾调用
}
```

# 第三梯队（中高频）
1. **JavaScript 数组有哪些常用方法？**
2. **哪些数组方法会改变原数组？**
3. **for...in 和 for...of 的区别是什么？**
4. **map 和 forEach 的区别是什么？**
5. **reduce 的使用场景是什么？**
6. **数组去重有哪些方法？**
7. **数组扁平化如何实现？**
8. **如何判断一个对象是空对象？**
9. **Object 和其他数据类型的本质区别是什么？**
10. **Object.defineProperty 和 Proxy 的区别是什么？**

# 第四梯队（中频）
1. **JavaScript 模块化机制是什么？ESM 如何运行？**
2. **JS 模块导入时会不会执行 IIFE？**
3. **ES6 有哪些新特性？**
4. **class 和 function 构造函数的区别是什么？**
5. **WeakMap 和 Map 的区别是什么？**
6. **WeakMap 的应用场景有哪些？**
7. **typeof null 为什么是 object？**
8. **为什么不可迭代对象不能用 for...of？**

# 代码输出 / 场景题
1. **作用域链和变量提升相关代码输出题**
2. **async / await / Promise / setTimeout 执行顺序输出题**
3. **class 继承代码输出题**
4. **toSorted 和 sort 的代码输出结果**

# JS 手写题高频
1. 手写 **防抖（debounce）函数**
2. 手写 **节流（throttle）函数**
3. 手写 **数组 map 方法**
4. 手写 **深拷贝函数**
5. 手写 **EventEmitter（发布订阅模式）**
6. 手写 **Promise 各种方法**
7. 手写 **数组扁平化**
8. 手写 **数组去重**
9. 手写 **LRU 缓存**
10. 手写 **Proxy 代理对象**

# JS 场景 / 机制类
1. **setTimeout(1000) 一定是 1000ms 吗？为什么？跟 RAF 的对比**
2. **定时器不准确的原因是什么？**
3. **为什么 Promise 可以解决回调地狱？**
4. **Promise 链式调用是如何实现的？**
5. **为什么会出现内存泄漏？JS 中有哪些情况会造成内存泄漏？**

# 出现频率统计（根据这批面经）
大致统计：

| 类型 | 出现次数 |
| --- | --- |
| 事件循环 | 10+ |
| Promise | 10+ |
| 数据类型 | 8+ |
| 原型链 | 7+ |
| var/let/const | 6+ |
| 箭头函数 | 5+ |
| call/apply/bind | 5+ |
| 数组方法 | 5+ |
| 深拷贝 | 4+ |
| new 过程 | 4+ |
| 垃圾回收 | 3+ |
| WeakMap | 2~3 |

