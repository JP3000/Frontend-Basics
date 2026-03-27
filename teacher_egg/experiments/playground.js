function bubbleSort(input) {
  const arr = [...input];

  for (let i = 0; i < arr.length - 1; i += 1) {
    for (let j = 0; j < arr.length - 1 - i; j += 1) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }

  return arr;
}

function makeRandomArray(size, maxValue = 100000) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * maxValue));
}

function benchmarkSort(size) {
  const data = makeRandomArray(size);

  const startBubble = performance.now();
  const bubbleResult = bubbleSort(data);
  const bubbleMs = performance.now() - startBubble;

  const startNative = performance.now();
  const nativeResult = [...data].sort((a, b) => a - b);
  const nativeMs = performance.now() - startNative;

  const sameResult = bubbleResult.every((value, idx) => value === nativeResult[idx]);

  return {
    size,
    bubbleMs: Number(bubbleMs.toFixed(2)),
    nativeMs: Number(nativeMs.toFixed(2)),
    sameResult
  };
}

const sizes = [100, 500, 1000, 2000];
const report = sizes.map(benchmarkSort);

console.table(report);
