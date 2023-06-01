
async function start() {
     return await Promise.resolve('async is robit')
}

start().then(console.log) // function start comeback promise and in method then we deduce console.log


const unused = 42

class Util{
     static id = Date.now()
}

console.log('Ogo tu vyebavsya', Util.id)
console.log(unused)

import ('lodash').then( _ => {
     console.log('lodash', -_.random(0, 42, true))
})