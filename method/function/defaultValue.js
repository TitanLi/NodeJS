function func1({ a, b } = { a: 1, b: 2 }) {
    console.log(a, b);
}
func1();  // 1 2
func1({ a: 5 });  // 5 undefined
func1({ a: 10, b: 22 });  // 10 22

function func2({ a = 1, b = 2 } = {}) {
    console.log(a, b);
}

func2();  // 1 2
func2({ a: 5 });  // 5 2
func2({ a: 10, b: 22 });  // 10 22

function func3(name = 'Titan') {
    console.log(name);
}

func3();  // Titan
func3('Hello Titan');  // Hello Titan