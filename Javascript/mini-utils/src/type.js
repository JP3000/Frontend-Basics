export function getType(value) {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}

export function isString(value) {
  return getType(value) === 'string';
}

export function isNumber(value) {
  return getType(value) === 'number' && !Number.isNaN(value);
}

export function isArray(value) {
  return Array.isArray(value);
}

export function isObject(value) {
  return getType(value) === 'object';
}