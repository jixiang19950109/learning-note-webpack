//es module
import sum from './sum'

//commonjs
var minus = require('./minus')

//amd
require(['./multi'], function(multi) {
    console.log('multi(4, 6)=', multi(4, 6))
})

console.log('sum(23, 34)=', sum(23, 24))
console.log('minus(23, 17)=', minus(23, 17))