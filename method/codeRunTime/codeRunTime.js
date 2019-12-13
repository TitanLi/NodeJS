async function codeRunTime(){
    console.time("codeRunTime");
    await new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve();
        },3000);
    });
    console.timeEnd("codeRunTime");
}

codeRunTime();