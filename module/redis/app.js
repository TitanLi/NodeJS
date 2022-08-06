new Promise((resolve, rejects) => {
    setTimeout(() => {
        console.log(1);
        rejects();
    }, 5000);
}).catch(()=>{
    return new Promise((resolve, rejects) => {
        setTimeout(() => {
            console.log(2);
            resolve();
        }, 5000);
    })
})