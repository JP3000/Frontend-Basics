import { isArray, isObject } from './type.js';

export function shallowClone(value) {
  // 数组：用 slice 复制一份新数组（只复制第一层）
  if (isArray(value)) {
    return value.slice();
  }

  // 普通对象：用展开运算符复制第一层属性
  if (isObject(value)) {
    // 注意：展开运算符只复制第一层属性，如果属性值是对象/数组，仍然是引用
    return { ...value };
  }

  // 其他值（基本类型等）直接返回
  // 浅拷贝不会递归复制 nested 对象/数组
  return value;
}

export function deepClone(value, cache = new WeakMap()) {
  // 基本类型直接返回；函数也按引用返回（常见基础版行为）
  if (!isArray(value) && !isObject(value)) {
    return value;
  }

  // 处理循环引用：如果拷贝过，直接复用缓存结果
  if (cache.has(value)) {
    return cache.get(value);
  }

  const result = isArray(value) ? [] : {};
  cache.set(value, result);

  // 递归复制每个属性/元素
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      result[key] = deepClone(value[key], cache);
    }
  }

  return result;
}