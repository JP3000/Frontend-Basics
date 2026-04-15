var lengthOfLongestSubstring = function(s) {
    var seen = new Set();
    var maxLen = 0;

    for(var left = 0, right = 0; right < s.length; right++) {
        var char = s[right]; // right指向的元素，也是当前要考虑的元素

        // set中有char，则缩短左边界，同时从set集合出元素
        while(seen.has(char)) {
            seen.delete(s[left]);
            left++;
        }

        // 别忘了，将当前元素加入set集合
        seen.add(char);
        console.log(seen)
        maxLen = Math.max(maxLen, right - left + 1); // 更新最长子串长度
    }
    return maxLen;
};

// 测试
console.log(lengthOfLongestSubstring("abcabcbb")); // 输出 3
console.log(lengthOfLongestSubstring("bbbbb")); // 输出 1
console.log(lengthOfLongestSubstring("pwwkew")); // 输出 3