// 合併陣列
const params = ["hello", true, 7];
const other = [1, 2, ...params];  // [ 1, 2, 'hello', true, 7 ] 

// 複製陣列使其互不影響
const arr1 = [1, 2, 3, 4];
const arr2 = [...arr1];
arr2.push(5);
console.log(arr1, arr2);

// 字串轉換為單詞陣列
const aString = "apple";
const chars = [...aString];  // [ 'a', 'p', 'p', 'l', 'e' ]