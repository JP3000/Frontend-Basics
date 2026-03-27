const imgAddress = "https://picsum.photos/800/600"  

const imgPromise = (url) => {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.src = url;
        
        img.onload = () => { 
            resolve(img);
        };
        
        img.onerror = () => {
            reject(new Error("图片加载失败"));
        };
    });
}

imgPromise(imgAddress)
    .then(img => {
        document.body.appendChild(img);
    })
    .catch(err => {
        document.body.innerHTML = err;
    });