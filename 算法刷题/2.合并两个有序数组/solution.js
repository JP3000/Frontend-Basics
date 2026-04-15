var merge = function(nums1, m, nums2, n) {
    let i = 0; // nums1的指针
    let j = 0; // nums2的指针

    let result = []; // 存储合并后的结果

    while (i < m && j < n) {
        // 比较nums1和nums2当前指针指向的元素，选择较小的一个加入结果数组
        if (nums1[i] < nums2[j]) {
            result.push(nums1[i]);
            i++;
        // 否则，选择nums2的元素加入结果数组
        } else {
            result.push(nums2[j]);
            j++;
        }
    }

    // 如果nums1还有剩余元素，将其全部加入结果数组
    while (i < m) {
        result.push(nums1[i]);
        i++;
    }

    // 如果nums2还有剩余元素，将其全部加入结果数组
    while (j < n) {
        result.push(nums2[j]);
        j++;
    }

    // 将合并后的结果复制回nums1
    for (let k = 0; k < result.length; k++) {
        nums1[k] = result[k];
    }
};

// 示例
let nums1 = [1, 2, 3, 0, 0, 0];
let m = 3;
let nums2 = [2, 5, 6];
let n = 3;

merge(nums1, m, nums2, n);
console.log(nums1); // 输出: [1, 2, 2, 3, 5, 6]