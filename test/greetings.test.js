const assert = require('assert')
let  greet = requie('./greet')

describe('the greet application',async function(){
    let
    
})
it('should be able to greet Thabo in Xhosa',function(){
    assert.equal('Molo Thabo',greet.greeted('Thabo','Xhosa'))
})