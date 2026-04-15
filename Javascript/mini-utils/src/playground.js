import {
  getType,
  isString,
  isNumber,
  isArray,
  isObject
} from './index.js';

import { shallowClone, deepClone } from './index.js';

// console.log('getType(null):', getType(null));           // null
// console.log('isString("hi"):', isString('hi'));         // true
// console.log('isNumber(123):', isNumber(123));           // true
// console.log('isNumber(NaN):', isNumber(NaN));           // false
// console.log('isArray([1,2]):', isArray([1, 2]));        // true
// console.log('isObject({a:1}):', isObject({ a: 1 }));    // true
// console.log('isObject(null):', isObject(null));         // false

// 浅拷贝会创建新的外层对象，但内部嵌套对象仍然共用原引用，所以改嵌套内容会互相影响。

// 1) 对象里套对象
const objA = { a: 1, nested: { b: 2 } };
const objB = shallowClone(objA);
console.log('objA === objB:', objA === objB); // false
console.log('objA.nested === objB.nested:', objA.nested === objB.nested); // true

// 2) 对象里套数组
const objC = { list: [1, 2, 3] };
const objD = shallowClone(objC);
console.log('objC === objD:', objC === objD); // false
console.log('objC.list === objD.list:', objC.list === objD.list); // true

// 3) 数组里套对象
const arrA = [{ x: 1 }, 2];
const arrB = shallowClone(arrA);
console.log('arrA === arrB:', arrA === arrB); // false
console.log('arrA[0] === arrB[0]:', arrA[0] === arrB[0]); // true

console.log('---------------- deepClone ----------------');

const deepObjA = { a: 1, nested: { b: 2 }, list: [1, { c: 3 }] };
const deepObjB = deepClone(deepObjA);

console.log('deepObjA === deepObjB:', deepObjA === deepObjB); // false
console.log('deepObjA.nested === deepObjB.nested:', deepObjA.nested === deepObjB.nested); // false
console.log('deepObjA.list === deepObjB.list:', deepObjA.list === deepObjB.list); // false
console.log('deepObjA.list[1] === deepObjB.list[1]:', deepObjA.list[1] === deepObjB.list[1]); // false

// 循环引用测试
const loopA = { name: 'loop' };
loopA.self = loopA;
const loopB = deepClone(loopA);
console.log('loopB !== loopA:', loopB !== loopA); // true
console.log('loopB.self === loopB:', loopB.self === loopB); // true