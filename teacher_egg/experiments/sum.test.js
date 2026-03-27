const test = require("node:test");
const assert = require("node:assert/strict");

function sum(a, b) {
  return a + b;
}

test("sum adds two numbers", () => {
  assert.equal(sum(2, 3), 5);
});
