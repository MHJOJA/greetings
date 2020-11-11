const assert = require('assert')
let  Greet = require('../greet')
const pg = require('pg');
// const { count } = require('console');
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/my_greetings';
const pool = new Pool({
    connectionString
})
const greet = Greet(pool)

describe('The greetings application', async function () {

    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query("delete from greet;");

    });
    

it('should be able to greet Thabo in Xhosa',function(){
    assert.equal('Molo, Thabo',greet.greeted('Thabo','xhosa'))
})
it('should be able to greet Thabo in English',function(){
    assert.equal('Hello, Thabo', greet.greeted('Thabo','english'))
})
it('should be able to greet Thabo in Sotho',function(){
    assert.equal('Dumelang, Thabo',greet.greeted('Thabo','sotho'))

});
it('should return the total number of the names which has been greeted',async function(){
    await greet.storeNames('Sizwe');
    await greet.storeNames('Ludwe');



    assert.equal(2, await greet.counter())
})

it('should return how many times a person has been greeted',async function(){

     await greet.storeNames('Mattew');

     await greet.setAnUpdate('Mattew')
     await greet.setAnUpdate('Mattew')

    assert.equal( 3,await greet.personsCount('Mattew'));
})




after(function () {
    pool.end();
})
})




// it('should be able to greet Thabo in Xhosa',function(){
//     var result =greet.greeted('Thabo','xhosa')
//     assert.equal('Molo, Thabo',result)
// })