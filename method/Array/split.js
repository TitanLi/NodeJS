var str="How are you ?"
var splits1 = str.split(" ");
var splits2 = str.split("");
var splits3 = str.split(" ",3);

console.log(splits1);
//splits1 contains ["How", "are", "you", "?"]
console.log(splits2);
//splits2 contains ["H", "o", "w", " ", "a", "r", "e", " ", "y", "o", "u", " ", "?"]
console.log(splits3);
//splits3 contains ["How", "are", "you"]