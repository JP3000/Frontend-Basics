const isPregnant = false;

const promise = new Promise((resolve, reject) => {
    if (isPregnant) {
        resolve('孩子他爹');
    } else {
        reject('老公');
    }
});

promise
    .then((res) => {
        console.log(`男人成为了${res}`);
    })
    .catch((err) => {
        console.error(`男生成为了${err}`);
    })
    .finally(() => {
        console.log(`男人和女人最终结婚了！`);
    })

