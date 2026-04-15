var compareVersion = function(version1, version2) {
    // 1. 分割成数组
    const v1 = version1.split('.');
    const v2 = version2.split('.');
    
    // 2. 取最大长度
    const maxLen = Math.max(v1.length, v2.length);
    
    // 3. 逐位比较
    for (let i = 0; i < maxLen; i++) {
        // 获取当前位的数值，没有则默认为 0
        const num1 = i < v1.length ? parseInt(v1[i]) : 0;
        const num2 = i < v2.length ? parseInt(v2[i]) : 0;
        
        // 比较
        if (num1 < num2) return -1;
        if (num1 > num2) return 1;
    }
    
    // 所有位都相等
    return 0;
};