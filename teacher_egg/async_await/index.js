// async/await是基于promise的语法糖，
// async函数会返回一个promise对象，


async function bb() {
    // 其实async默认返回的是promise.resolve('别bb，专心学习');
    
    console.log("1");

    let two = await Promise.resolve('2');
    console.log(two);

    console.log("3");

    // return '别bb，专心学习';
    return Promise.resolve('别bb，专心学习');
}

// async返回的对象是一个promise对象。
// console.log(bb());

bb().then((value) => {
    console.log(value);
})