//this => module.exports
this.a = 100;
//global變數
global.a = 'apple';
//若未使用var、let、const宣告者皆指向global物件
globalText = 'global text';