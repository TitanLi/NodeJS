let setTimeout_test = setTimeout(() => {
    console.log('apple');
},6000);

setTimeout(() => {
    clearTimeout(setTimeout_test);
    console.log('stop');
},4000);