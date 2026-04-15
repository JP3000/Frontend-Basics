var merge = function(nums1, m, nums2, n) {
    // 1. 先把 nums2 的元素复制到 nums1 后面
    for (let i = 0; i < n; i++) {
        nums1[m + i] = nums2[i];
    }
    
    // 2. 对整个数组排序（a-b降序，b-a升序）
    nums1.sort((a, b) => a - b);
};