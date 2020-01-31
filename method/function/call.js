function foo(x = this, y = this.value) {
    console.log(x);
    console.log(y);
}

// foo()

// foo({ value: 'apple' });
// { value: 'apple' }
// undefined

foo.call({ value: 'apple' });
// { value: 'apple' }
// apple