## 变量声明与作用域
**题目**：解释 `var`、`let` 和 `const` 的区别

**解答**：

| <font style="color:rgba(0, 0, 0, 0.9);">特性</font> | <font style="color:rgba(0, 0, 0, 0.9);">var</font> | <font style="color:rgba(0, 0, 0, 0.9);">let</font> | <font style="color:rgba(0, 0, 0, 0.9);">const</font> |
| --- | --- | --- | --- |
| <font style="color:rgba(0, 0, 0, 0.9);">作用域</font> | <font style="color:rgba(0, 0, 0, 0.9);">函数作用域</font> | <font style="color:rgba(0, 0, 0, 0.9);">块级作用域</font> | <font style="color:rgba(0, 0, 0, 0.9);">块级作用域</font> |
| <font style="color:rgba(0, 0, 0, 0.9);">变量提升</font> | <font style="color:rgba(0, 0, 0, 0.9);">是</font> | <font style="color:rgba(0, 0, 0, 0.9);">否（暂时性死区）</font> | <font style="color:rgba(0, 0, 0, 0.9);">否（暂时性死区）</font> |
| <font style="color:rgba(0, 0, 0, 0.9);">重复声明</font> | <font style="color:rgba(0, 0, 0, 0.9);">允许</font> | <font style="color:rgba(0, 0, 0, 0.9);">不允许</font> | <font style="color:rgba(0, 0, 0, 0.9);">不允许</font> |
| <font style="color:rgba(0, 0, 0, 0.9);">初始值</font> | <font style="color:rgba(0, 0, 0, 0.9);">可不初始化</font> | <font style="color:rgba(0, 0, 0, 0.9);">可不初始化</font> | <font style="color:rgba(0, 0, 0, 0.9);">必须初始化</font> |
| <font style="color:rgba(0, 0, 0, 0.9);">重新赋值</font> | <font style="color:rgba(0, 0, 0, 0.9);">可以</font> | <font style="color:rgba(0, 0, 0, 0.9);">可以</font> | <font style="color:rgba(0, 0, 0, 0.9);">不可以</font> |


**示例**：

```javascript
function example() {
  console.log(a); // undefined (变量提升)
  var a = 1;

  console.log(b); // ReferenceError (暂时性死区)
  let b = 2;

  const c = 3;
  c = 4; // TypeError
}
```

## 数据类型
**题目**：JavaScript 有哪些数据类型？如何判断数据类型？

**解答**：**基本****数据类型**：

1. `undefined`
2. `null`
3. `boolean`
4. `number`
5. `string`
6. `symbol` (ES6)
7. `bigint` (ES2020)

**引用****数据类型**：

+ `object` (包括数组、函数、日期等)

**判断方法**：

```jsx
typeof 42;                  // "number"
typeof 'str';               // "string"
typeof true;                // "boolean"
typeof undefined;           // "undefined"
typeof Symbol();            // "symbol"
typeof 123n;                // "bigint"
typeof null;                // "object" (历史遗留问题)
typeof {};                  // "object"
typeof [];                  // "object"
typeof function(){};        // "function"
// 更精确的判断
Object.prototype.toString.call(null);     // "[object Null]"
Object.prototype.toString.call([]);       // "[object Array]"
Array.isArray([]);                        // true
```

**<font style="color:#DF2A3F;">判断方法的区别要会</font>**

### typeof
+ 判断基本类型
+ null 会返回"object"（历史遗留 bug）
+ 不能准确区分 Array 和 Object

### instanceof
+ 判断原型链
+ 判断对象是否属于某个构造函数
+ 原理：判断右侧构造函数的 prototype 是否在左侧对象的原型链上

## 数组方法
**题目**：分类列举 JavaScript 数组方法，并说明哪些会改变原数组

**解答**：

**会改变原数组的方法**：

+ `push()` - 末尾添加元素
+ `pop()` - 删除末尾元素
+ `shift()` - 删除首元素
+ `unshift()` - 开头添加元素
+ `splice()` - 添加/删除元素
+ `sort()` - 排序
+ `reverse()` - 反转数组

**不改变原数组的方法**：

+ `concat()` - 合并数组
+ `slice()` - 截取数组
+ `join()` - 连接为字符串
+ `map()` - 映射新数组
+ `filter()` - 过滤数组
+ `reduce()` - 累计计算
+ `some()` - 测试某些元素
+ `every()` - 测试所有元素
+ `find()` - 查找元素
+ `findIndex()` - 查找索引
+ `includes()` - 是否包含

## 原型与原型链
**题目**：解释原型和原型链的概念

**解答**：

**原型**：

+ 每个函数都有一个 `prototype` 属性，指向原型对象
+ 原型对象包含共享的属性和方法
+ 实例通过 `proto` 访问其构造函数的原型

**原型链**：

+ 当访问对象属性时，如果对象本身没有，会通过 `proto` 向上查找
+ 直到找到 `Object.prototype` (顶层原型，`proto` 为 `null`)
+ 这种链式查找机制称为原型链

**示例**：

```jsx
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function() {
  console.log(`Hello, I'm ${this.name}`);
};

const person = new Person('Alice');
person.sayHello(); // 通过原型链访问方法

console.log(person.__proto__ === Person.prototype); // true
console.log(Person.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__); // null
```

## 闭包
**题目**：什么是闭包？闭包有哪些应用场景？

**解答**：

**闭包**：函数与其词法环境的组合，即使函数在其词法环境之外执行，也能访问该环境中的变量。

**特点**：

1. 函数嵌套函数
2. 内部函数可以访问外部函数的变量
3. 外部函数的变量会被保存在内存中

**应用场景**：

1. 私有变量
2. 函数工厂
3. 模块模式
4. 记忆化
5. 事件处理

**示例**：

```jsx
// 计数器闭包
function createCounter() {
  let count = 0;
  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}
const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2
```

## this 指向
**题目**：解释 JavaScript 中 `this` 的指向规则

**解答**：

`this` 的指向取决于函数的调用方式：

1. **默认绑定**：独立函数调用，`this` 指向全局对象（严格模式下为 `undefined`）

```jsx
function foo() {
  console.log(this); // 浏览器中为 window
}
foo();
```

1. **隐式绑定**：作为对象方法调用，`this` 指向调用对象

```jsx
const obj = {
  name: 'Alice',
  sayName: function() {
    console.log(this.name);
  }
};
obj.sayName(); // "Alice"
```

1. **显式绑定**：通过 `call`、`apply`、`bind` 指定 `this`

```jsx
function greet() {
  console.log(
    Hello, ${this.name}
  );
}
const person = { name: 'Bob' };
greet.call(person); // "Hello, Bob"
```

1. **new 绑定**：构造函数调用，`this` 指向新创建的对象

```jsx
function Person(name) {
  this.name = name;
}
const p = new Person('Charlie');
console.log(p.name); // "Charlie"
```

1. **箭头函数**：没有自己的 `this`，继承外层作用域的 `this`

```jsx
const obj = {
  name: 'Dave',
  sayName: () => {
    console.log(this.name); // 取决于外层作用域
  }
};
obj.sayName(); // 可能不是 "Dave"
```

## Promise
**题目**：解释 Promise 的概念及其常用方法

**解答**：

**Promise** 是异步编程的解决方案，表示一个异步操作的最终完成或失败。

**状态**：

+ `pending`：初始状态
+ `fulfilled`：操作成功完成
+ `rejected`：操作失败

**方法**：

1. `Promise.resolve()` - 返回一个 resolved 状态的 Promise
2. `Promise.reject()` - 返回一个 rejected 状态的 Promise
3. `Promise.all()` - 所有 Promise 都成功时返回结果数组
4. `Promise.race()` - 第一个完成的 Promise 的结果
5. `Promise.allSettled()` - 所有 Promise 完成后返回结果
6. `Promise.prototype.then()` - 添加成功回调
7. `Promise.prototype.catch()` - 添加失败回调
8. `Promise.prototype.finally()` - 无论成功失败都执行

**示例**：

```jsx
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});
const promise3 = Promise.reject('error');
Promise.all([promise1, promise2])
  .then(values => console.log(values)) // [3, "foo"]
  .catch(error => console.error(error));
Promise.race([promise1, promise2])
  .then(value => console.log(value)); // 3 (更快完成)
```

1. 事件循环

**题目**：解释 JavaScript 的事件循环机制

**解答**：

JavaScript 是单线程语言，通过事件循环实现异步。

**执行顺序**：

1. 执行同步代码（主线程）
2. 遇到异步任务，交给相应模块处理（如定时器、I/O）
3. 异步任务完成，回调放入任务队列
4. 主线程空闲时，检查任务队列并执行回调

**任务队列**：

1. **宏任务**：`script`、`setTimeout`、`setInterval`、`setImmediate`、I/O、UI渲染
2. **微任务**：`Promise.then`、`process.nextTick`、`MutationObserver`

**执行规则**：

1. 执行一个宏任务（从宏任务队列）
2. 执行所有微任务（清空微任务队列）
3. 如有必要渲染UI
4. 重复上述过程

**示例**：

```jsx
console.log('1'); // 同步
setTimeout(() => {
  console.log('2'); // 宏任务
}, 0);
Promise.resolve().then(() => {
  console.log('3'); // 微任务
});
console.log('4'); // 同步
// 输出顺序: 1, 4, 3, 2
```

## ES6+ 新特性
**题目**：列举 10 个 ES6+ 的重要新特性

**解答**：

1. **let/const** - 块级作用域变量声明
2. **箭头函数** - `() => {}` 简洁语法，无自己的 `this`
3. **模板字符串** - ``Hello ${name}`` 支持插值
4. **解构赋值** - `const {a, b} = obj`
5. **默认参数** - `function(a = 1) {}`
6. **展开/剩余运算符** - `...arr` / `function(...args)`
7. **类语法** - `class` 关键字
8. **模块化** - `import/export`
9. **Promise** - 异步编程解决方案
10. **Symbol/Map/Set** - 新的数据类型
11. **async/await** - 更优雅的异步处理
12. **可选链** - `?.` 安全访问属性
13. **空值合并** - `??` 提供默认值
14. **BigInt** - 大整数支持
15. **全局对象标准化** - `globalThis`
16. 手写代码题

**题目1**：实现防抖函数

**解答**：

```jsx
function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
```

**题目2**：实现节流函数

**解答**：

```jsx
function throttle(fn, interval) {
  let lastTime = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      fn.apply(this, args);
      lastTime = now;
    }
  };
}
```

**题目3**：实现深拷贝

**解答**：

```jsx
function deepClone(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (map.has(obj)) {
    return map.get(obj);
  }

  const clone = Array.isArray(obj) ? [] : {};
  map.set(obj, clone);

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key], map);
    }
  }

  return clone;
}
```

**题目4**：实现 Promise.all

**解答**：

```jsx
Promise.myAll = function(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let count = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = value;
          count++;
          if (count === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
};
```

+ Promise原理与使用
+ 原型与原型链机制
+ let/const/var区别
+ JavaScript数据类型
+ 类型判断方法
+ 数组方法全解析
    - 改变原数组的方法：push/pop/shift/unshift/splice/sort/reverse
    - 不改变原数组的方法：slice/concat/join/map/filter/every/some
+ ES6+新特性
+ this指向规则
+ bind/apply/call区别
+ 箭头函数特性
+ 闭包原理与应用
+ 事件循环机制
    - 宏任务与微任务
    - 执行顺序规则

#### Proxy
Proxy对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用）

```javascript
const p = new Proxy(target, handler)
```

<img src="https://cdn.nlark.com/yuque/0/2024/png/27092124/1732522478977-48970d74-cfc6-41f1-9d12-b5e1b1adef33.png" width="773" title="" crop="0,0,1,1" id="u10b09708" class="ne-image">

#### js数组方法
forEach map push pop shift unshift splice slice concat join sort reverse some every filter

#### Promise
Promise 对象是异步编程的一种解决方案。Promise 是一个构造函数，接收一个函数作为参数，返回一个 Promise 实例。一个 Promise 实例有三种状态，分别是pending、_<font style="color:rgb(27, 27, 27);">fulfilled </font>_ 和 rejected。实例的状态只能由 pending 转变 _<font style="color:rgb(27, 27, 27);">fulfilled </font>_ 或者 rejected 状态，并且状态一经改变，无法再被改变了。

状态的改变是通过传入的 resolve() 和 reject() 函数来实现的，当我们调用resolve回调函数时，会执行Promise对象的then方法传入的第一个回调函数，当我们调用reject回调函数时，会执行Promise对象的then方法传入的第二个回调函数，或者catch方法传入的回调函数。

Promise的实例有**两个过程**：

+ pending -> fulfilled : Resolved（已完成）
+ pending -> rejected：Rejected（已拒绝）

一旦从进行状态变成为其他状态就永远不能更改状态了。

 在通过new创建Promise对象时，我们需要传入一个回调函数，我们称之为executor 

✓ 这个回调函数会被立即执行，并且给传入另外两个回调函数resolve、reject； 

✓ 当我们调用resolve回调函数时，会执行Promise对象的then方法传入的回调函数； 

✓ 当我们调用reject回调函数时，会执行Promise对象的catch方法传入的回调函数；  

情况一：如果resolve传入一个普通的值或者对象，那么这个值会作为then回调的参数；

情况二：如果resolve中传入的是另外一个Promise，那么这个新Promise会决定原Promise的状态： 

情况三：如果resolve中传入的是一个对象，并且这个对象有实现then方法，那么会执行该then方法，并且根据then方法的结 果来决定Promise的状态：  

**then方法接受两个参数**： 

fulfilled的回调函数：当状态变成fulfilled时会回调的函数； 

reject的回调函数：当状态变成reject时会回调的函数；  

**Promise有三种状态，那么这个Promise处于什么状态呢？** 

当then方法中的回调函数本身在执行的时候，那么它处于pending状态； 

当then方法中的回调函数返回一个结果时，那么它处于fulfilled状态，并且会将结果作为resolve的参数；

 ✓ 情况一：返回一个普通的值； 

 ✓ 情况二：返回一个Promise；

 ✓ 情况三：返回一个thenable值； 

当then方法抛出一个异常时，那么它处于reject状态  

Promise有五个常用的方法：then()、catch()、all()、race()、finally。

**<font style="color:rgb(27, 27, 27);">Promise.allSettled()</font>**<font style="color:rgb(27, 27, 27);"> 方法以 promise 组成的可迭代对象作为输入，并且返回一个 </font>[Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)<font style="color:rgb(27, 27, 27);"> 实例。当输入的所有 promise 都已敲定时（包括传递空的可迭代类型），返回的 promise 将兑现，并带有描述每个 promsie 结果的对象数组。</font>

#### async & await
<font style="color:rgb(51, 51, 51);">ES7提出的关于异步的终极解决方案 </font>

<font style="color:rgb(51, 51, 51);">async/await是Generator的语法糖</font>

    - <font style="color:rgb(51, 51, 51);">内置执行器：Generator函数的执行必须靠执行器，不能一次执行完成</font>
    - <font style="color:rgb(51, 51, 51);">可读性更好：async和 await，比起使用 *号和 yield，语义清晰明了</font>

<font style="color:rgb(51, 51, 51);">如果不使用async/await的话，Promise需要通过链式调用执行then之后的代码</font>

_**<u><font style="color:rgb(51, 51, 51);">Promise搭配async/await的使用才是正解！</font></u>**_

<font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">async/await</font><font style="color:rgb(51, 51, 51);">基于</font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">Promise</font><font style="color:rgb(51, 51, 51);">。async把promise包装了一下，async函数更简洁，不需要像promise一样需要写then，不需要写匿名函数处理promise的resolve值。</font>

<font style="color:rgb(51, 51, 51);">async是Generator函数的语法糖，</font>**<font style="color:rgb(51, 51, 51);">async函数返回值是promise对象</font>**<font style="color:rgb(51, 51, 51);">，比</font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">generator</font><font style="color:rgb(51, 51, 51);">函数返回值 iterator对象更方便，</font>_<u><font style="color:rgb(51, 51, 51);">可使用 await 代替then 指定下一步操作(await==promise.then)</font></u>_

#### 原型与原型链
每个构造函数都有一个prototype属性，该属性指向的就是显示原型对象，这个对象包含了可以由该构造函数的所有实例共享的属性和方法，每个实例对象上有一个`__proto__`属性，该属性指向的就是隐式原型对象。

查找一个属性先在自身查找，如果找不到，就沿着`__proto__`属性在原型对象上进行查找，如果还找不到，就沿着原型对象的`__proto__`属性进行查找，直到查找到直到找到Object的原型对象，如果还没有找到就会返回undefined，沿着__proto__查找属性(方法)的这条链就是原型链。

原型链终点是`Object.prototype.__proto__`

使用`hasOwnProperty()`方法来判断属性是否属于原型链的属性：

<font style="color:rgb(51, 51, 51);">每个实例对象都有私有属性（</font>**<font style="color:rgb(51, 51, 51);">proto</font>**<font style="color:rgb(51, 51, 51);">）指向它构造函数的原型对象。</font>

<font style="color:rgb(51, 51, 51);">每个构造函数都有prototype原型对象</font>

<font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">prototype</font><font style="color:rgb(51, 51, 51);">原型对象的</font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">constructor</font><font style="color:rgb(51, 51, 51);">指向构造函数本身</font>

<font style="color:rgb(51, 51, 51);">有默认</font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">constructor</font><font style="color:rgb(51, 51, 51);">属性，记录实例由哪个构造函数创建</font>

  <img src="https://cdn.nlark.com/yuque/0/2022/png/27092124/1669192924523-f121e479-969c-43ed-b248-5bf53259d1e5.png" width="470" title="" crop="0,0,1,1" id="u8a6a66a3" class="ne-image">

#### ES6新特性
1. <font style="color:rgb(51, 51, 51);">const、let</font>
2. <font style="color:rgb(51, 51, 51);">模板字符串</font>
3. <font style="color:rgb(51, 51, 51);">箭头函数</font>
4. <font style="color:rgb(51, 51, 51);">函数参数默认值</font>
5. <font style="color:rgb(51, 51, 51);">解构赋值</font>
6. <font style="color:rgb(51, 51, 51);">for...of 用于数组，for...in用于对象</font>
7. <font style="color:rgb(51, 51, 51);">Promise</font>
8. <font style="color:rgb(51, 51, 51);">展开运算符(...)</font>
9. <font style="color:rgb(51, 51, 51);">对象字面量、class(原型链的语法糖)</font>

#### 匿名函数
匿名函数在声明时不用带上函数名 没有函数提升

<font style="color:rgb(51, 51, 51);">匿名函数可以有效的保证在页面上写入Javascript，而不会造成全局变量的污染。</font>

#### <font style="color:rgb(51, 51, 51);">不改变原数组</font>
+ <font style="color:rgb(51, 51, 51);">concat()  map()</font>

<font style="color:rgb(51, 51, 51);">返回新数组</font>

+ <font style="color:rgb(51, 51, 51);">slice(start,end)左闭右开，可以为负数</font>

**<font style="color:rgb(51, 51, 51);">返回一个包含原有数组中一个或多个元素的新数组</font>**

+ <font style="color:rgb(51, 51, 51);">filter</font>

**<font style="color:rgb(51, 51, 51);">判断所有元素，将满足条件的元素作为一个新的数组返回</font>**

+ <font style="color:rgb(51, 51, 51);">join()</font>
+ <font style="color:rgb(51, 51, 51);">find()</font>
+ <font style="color:rgb(51, 51, 51);">findIndex()</font>
+ <font style="color:rgb(51, 51, 51);">indexOf()</font>
+ <font style="color:rgb(51, 51, 51);">includes()</font>

#### <font style="color:rgb(0, 0, 0);">let const var 相关</font>
<font style="color:rgb(51, 51, 51);">var没有块级作用域，只有函数作用域。var只有在function{ }内部才有作用域的概念，其他地方没有。意味着函数以外用var定义的变量是同一个，我们所有的修改都是针对他的</font>

1. <font style="color:rgb(51, 51, 51);">let和const增加</font>**<font style="color:rgb(51, 51, 51);">块级作用域</font>**<font style="color:rgb(51, 51, 51);">（JS没有块级作用域）</font>
2. <font style="color:rgb(51, 51, 51);">let和const存在</font>**<font style="color:rgb(51, 51, 51);">暂时性死区</font>**<font style="color:rgb(51, 51, 51);">，不存在</font>**<font style="color:rgb(51, 51, 51);">变量提升</font>**<font style="color:rgb(51, 51, 51);">，不能在初始化前引用，调用 返回 </font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">uninitialized</font>
3. <font style="color:rgb(51, 51, 51);">let和const禁止</font>**<font style="color:rgb(51, 51, 51);">重复声明</font>**<font style="color:rgb(51, 51, 51);">，不能重新声明</font>
4. <font style="color:rgb(51, 51, 51);">let和</font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">const</font><font style="color:rgb(51, 51, 51);">不会成为全局对象属性，var声明的变量自动成为全局对象属性</font>
5. <font style="color:rgb(51, 51, 51);">var 存在变量提升（执行前，编译器对代码预编译，当前作用域的变量/函数提升到作用域顶部），</font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">let</font><font style="color:rgb(51, 51, 51);">约束变量提升。let和var都发生了变量提升，只是</font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">es6</font><font style="color:rgb(51, 51, 51);">进行了约束，在我们看来，就像</font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">let</font><font style="color:rgb(51, 51, 51);">禁止了变量提升</font>
6. <font style="color:rgb(51, 51, 51);">使用</font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">var</font><font style="color:rgb(51, 51, 51);">，我们能对变量多次声明，后面声明的变量会覆盖前面的声明 </font>

```plain
var a = 123
if (true) {
    a = 'abc' // ReferenceError 因为下面的 let
    let a;
}
```

<font style="color:rgb(119, 119, 119);background-color:rgb(243, 244, 244);">const</font><font style="color:rgb(119, 119, 119);">实际保证的并不是变量的值，而是变量指向的内存地址</font>

#### 闭包
<font style="color:rgb(51, 51, 51);">内部函数 可以访问其外部函数中声明变量，调用 外部函数返回 内部函数后，即使 外部函数执行结束了，但 内部函数引用外部函数的变量依然保存在内存 ，这些变量的集合——闭包</font>

##### <font style="color:rgb(51, 51, 51);">作用</font>
1. <font style="color:rgb(51, 51, 51);">独立作用域，避免变量污染</font>
2. <font style="color:rgb(51, 51, 51);">实现缓存计算结果，延长变量生命周期</font>
3. <font style="color:rgb(51, 51, 51);">创建私有变量</font>

##### <font style="color:rgb(51, 51, 51);">运用：</font>
防抖节流 模拟块级作用域 对象中创建私有变量 

#### <font style="color:rgb(51, 51, 51);">内存管理GC</font>
栈中的变量js会自动清除

<font style="color:rgb(51, 51, 51);">JS单线程机制，GC过程阻碍了主线程 执行</font>

<font style="color:rgb(119, 119, 119);">堆内存中的变量只有在 所有对它的引用都 结束 时被回收</font>

<font style="color:rgb(51, 51, 51);">自动垃圾回收机制：找出不使用的值，释放内存</font>

<font style="color:rgb(51, 51, 51);">函数运行结束，没有闭包或引用，局部变量被 标记 清除</font>

<font style="color:rgb(51, 51, 51);">全局变量：浏览器卸载页面 被清除</font>

<font style="color:rgb(51, 51, 51);">引用：显式引用（对象有对其属性的引用） 和 隐式引用（对象对其原型的引用）</font>

<font style="color:rgb(51, 51, 51);">引用计数 标记清除</font>

#### <font style="color:rgb(51, 51, 51);">事件流？</font>
<font style="color:rgb(51, 51, 51);">JS和HTML的交互 通过 事件 实现，使用侦听器 预定事件，便于事件发生时执行相应代码</font>

<font style="color:rgb(51, 51, 51);">手指放在一组同心圆的圆心上，手指指向不是一个圆 ，而是纸上的所有圆，单击按钮时 单击事件不止发生在按钮上，同时 也单击了按钮的容器元素，甚至也单击了整个页面</font>

_**<u><font style="color:rgb(51, 51, 51);">事件流描述 从页面接收事件的顺序</font></u>**_

**<font style="color:rgb(51, 51, 51);">事件发生时会在元素节点和根节点之间按照特定的顺序传播，路径所经过的节点都会收到该事件——DOM事件流</font>**

1. <font style="color:rgb(51, 51, 51);">捕获：不太具体的节点应该更早接收到事件，而最具体的节点最后收到事件。目的是在事件到达预定目标之前捕获它</font>
2. <font style="color:rgb(51, 51, 51);">冒泡：事件开始由最具体的元素接收，逐级向上传播到不具体的节点，document对象首先收到click事件，事件沿着DOM树依次往下，传播到事件的具体目标</font>
3. <font style="color:rgb(51, 51, 51);">DOM标准规定事件流包括3个阶段：事件捕获、处于目标阶段和事件冒泡</font>
+ <font style="color:rgb(51, 51, 51);">事件捕获——为截获事件提供机会</font>
+ <font style="color:rgb(51, 51, 51);">处于目标阶：事件在</font><font style="color:rgb(167, 167, 167);"><div></font><font style="color:rgb(51, 51, 51);">上发生并处理</font>
+ <font style="color:rgb(51, 51, 51);">冒泡阶段：事件又传播回文档</font>

<font style="color:rgb(51, 51, 51);">所有事件都要经过捕获阶段和处于目标阶段</font>

**<font style="color:rgb(51, 51, 51);">focus(获得输入焦点)和失去焦点blur事件没有冒泡，</font>**<font style="color:rgb(51, 51, 51);">无法委托</font>

##### <font style="color:rgb(51, 51, 51);">原始事件模型</font>
```plain
<input type="button" onclick="fun()">
var btn = document.getElementById('.btn');
btn.onclick = fun;
```

+ <font style="color:rgb(51, 51, 51);">绑定速度快</font>

<font style="color:rgb(51, 51, 51);">页面还未完全加载，事件可能无法正常运行</font>

+ <font style="color:rgb(51, 51, 51);">只支持冒泡，不支持捕获</font>
+ <font style="color:rgb(51, 51, 51);">同一个类型的事件只能绑定一次</font>

```plain
<input type="button" id="btn" onclick="fun1()">

var btn = document.getElementById('.btn');
btn.onclick = fun2;
//出错 后绑定的事件会覆盖掉之前的事件
```

<font style="color:rgb(51, 51, 51);">删除事件处理程序 将对应事件属性置为</font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">null</font>

<font style="color:rgb(51, 51, 51);">btn.onclick = null;</font>

##### <font style="color:rgb(51, 51, 51);">标准事件模型</font>
+ <font style="color:rgb(51, 51, 51);">事件捕获：从</font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">document</font><font style="color:rgb(51, 51, 51);">一直向下传播到目标元素， 依次检查经过节点是否绑定了事件监听函数，有则执行</font>
+ <font style="color:rgb(51, 51, 51);">事件处理：到达目标元素， 触发目标元素的监听函数</font>
+ <font style="color:rgb(51, 51, 51);">事件冒泡：从目标元素冒泡到</font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">document</font><font style="color:rgb(51, 51, 51);">， 依次检查经过节点是否绑定了事件监听函数，如果有则执行</font>

<font style="color:rgb(51, 51, 51);">事件绑定监听函数</font>

<font style="color:rgb(51, 51, 51);">addEventListener(eventType, handler, useCapture)</font>

<font style="color:rgb(51, 51, 51);">事件移除监听函数</font>

<font style="color:rgb(51, 51, 51);">removeEventListener(eventType, handler, useCapture)</font>

+ <font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">eventType</font><font style="color:rgb(51, 51, 51);">事件类型(不要加on)</font>
+ <font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">handler</font><font style="color:rgb(51, 51, 51);">事件处理函数</font>
+ _**<u><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">useCapture</font></u>**__**<u><font style="color:rgb(51, 51, 51);">，是否在捕获阶段处理，默认false</font></u>**_

<font style="color:rgb(51, 51, 51);">举个例子：</font>

```plain
var btn = document.getElementById('.btn');
    btn.addEventListener('click', showMessage, false);
    btn.removeEventListener('click', showMessage, false);
```

<font style="color:rgb(119, 119, 119);">一个</font><font style="color:rgb(119, 119, 119);background-color:rgb(243, 244, 244);">DOM</font><font style="color:rgb(119, 119, 119);">上绑定多个事件处理器，不会冲突</font>

```plain
btn.addEventListener(‘click’, showMessage1, false);
btn.addEventListener(‘click’, showMessage2, false);
btn.addEventListener(‘click’, showMessage3, false);
```

##### <font style="color:rgb(51, 51, 51);">事件代理</font>
**<font style="color:rgb(51, 51, 51);">原理</font>**

<font style="color:rgb(51, 51, 51);">事件委托，把一个或者一组元素的事件委托到它的父层或者更外层元素上，真正绑定事件的是外层元素，不是目标元素</font>

<font style="color:rgb(51, 51, 51);">只指定一个事件处理程序，管理某一类型 所有事件</font>

<font style="color:rgb(51, 51, 51);">把一个元素响应事件（</font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">click</font><font style="color:rgb(51, 51, 51);">、</font><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">keydown</font><font style="color:rgb(51, 51, 51);">......）的函数委托到另一个元素，冒泡阶段完成</font>

<font style="color:rgb(51, 51, 51);">对“事件处理程序过多”问题的解决方案就是事件委托</font>

<font style="color:rgb(51, 51, 51);">使用事件委托，只需在DOM树中尽量高的一层添加一个事件处理程序</font>

<font style="color:rgb(119, 119, 119);">举例</font>

<font style="color:rgb(51, 51, 51);">代 取快递</font>

<font style="color:rgb(51, 51, 51);">优点</font>

+ <font style="color:rgb(51, 51, 51);">节省内存，减少dom操作</font>
+ <font style="color:rgb(51, 51, 51);">不需要给子节点注销事件</font>
+ <font style="color:rgb(51, 51, 51);">动态绑定事件</font>
+ <font style="color:rgb(51, 51, 51);">提高性能</font>
+ **<font style="color:rgb(51, 51, 51);">新添加的元素还会有之前的事件</font>**

<font style="color:rgb(119, 119, 119);">为啥用</font>

**<font style="color:rgb(51, 51, 51);">事件冒泡过程中上传到父节点，</font>**<font style="color:rgb(51, 51, 51);">父节点通过事件对象获取到目标节点，把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理子元素的事件</font>

<font style="color:rgb(51, 51, 51);">比如100个li，每个都有click，如果使用for遍历 添加事件，关系页面整体性能，需要不断交互 访问dom次数过多，引起重排，延长交互时间</font>

<font style="color:rgb(51, 51, 51);">事件委托的话，将操作放进JS，只需要和dom交互一次，提高性能，还节约内存</font>

_**<u><font style="color:rgb(51, 51, 51);">第三个参数(</font></u>**__**<u><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">useCapture</font></u>**__**<u><font style="color:rgb(51, 51, 51);">)为</font></u>**__**<u><font style="color:rgb(51, 51, 51);background-color:rgb(243, 244, 244);">true</font></u>**__**<u><font style="color:rgb(51, 51, 51);">在捕获过程执行，反之在冒泡过程执行</font></u>**_
