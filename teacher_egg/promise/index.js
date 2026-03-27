// promise解决了回调地狱，
// 而且因为有了resolve和reject，可以进行异步处理并且得知任务进度

const isPregnant = true;

const promise = new Promise((resolve, reject) => {
    if (isPregnant) {
        resolve("孩子他爹");
    } else {
        reject("老公");
    }
})

promise
    .then( name => {
        console.log(`男人成为了${name}`);
    })
    .catch( name => {
        console.error(`男生成为了${name}`);
    })
    .finally(() => {
        console.log(`男人和女人最终结婚了！`);
    })