let setInterval_test = setInterval(()=>{
    console.log('apple');
},6000);

setTimeout(() => {
    clearInterval(setInterval_test);
},10000)