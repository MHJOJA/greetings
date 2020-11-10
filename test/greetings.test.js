const assert = require('assert')
let  Greet = require('../greet')
const greet = Greet()
const pg = require('pg')
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/my_greetings';
const pool = new Pool({
    connectionString
})
//const greetings = greet(pool)
describe('The greetings application', async function () {

    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query("delete from greet;");

    });
    
})
it('should be able to greet Thabo in Xhosa',function(){
    assert.equal('Molo, Thabo',greet.greeted('Thabo','xhosa'))
})
// it('should be able to greet Thabo in Xhosa',function(){
//     var result =greet.greeted('Thabo','xhosa')
//     assert.equal('Molo, Thabo',result)
// })