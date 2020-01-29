var name = "";
var value = "";
var objectValue = {};

// ES5
name = "Apple1";
value = "apple1";
objectValue = {}
objectValue[name] = value;
console.log(objectValue);

// ES6
name = "Apple2";
value = "apple2";
objectValue = {
    [name] : value
};
console.log(objectValue);
