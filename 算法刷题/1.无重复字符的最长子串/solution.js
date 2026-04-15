var lengthOfLongestSubstring = function(s) {
    // left指针表示当前子串的起始位置
    let left = 0;
    // maxLen用于记录最长子串的长度
    let maxLen = 0;
    // seen是一个集合，用于存储当前子串中已经出现的字符
    const seen = new Set();

    // 从左到右遍历字符串
    for (let right = 0; right < s.length; right++) {
        // char保存当前字符
        const char = s[right];

        // 如果当前字符不在seen中，说明没有重复，可以继续向右扩展
        while (seen.has(char)) {
            // 如果当前字符已经在seen中，说明有重复了
            // 从左边开始移除字符，直到移除掉重复的那个字符
            seen.delete(s[left]);
            left++;
        }

        // 将当前字符添加到seen中
        seen.add(char);
        console.log(seen)
        // 更新最长子串长度
        maxLen = Math.max(maxLen, right - left + 1); 
    }
    return maxLen;
}


// 测试
console.log(lengthOfLongestSubstring("abcabcbb")); // 输出 3
console.log(lengthOfLongestSubstring("bbbbb")); // 输出 1
console.log(lengthOfLongestSubstring("pwwkew")); // 输出 3