import 'babel-polyfill'

let func = () => {}
const NUM = 34
let arr = [2, 4, 5]
let arrB = arr.map(item => item * 2)

console.log('new Set(arrB)', new Set(arrB))