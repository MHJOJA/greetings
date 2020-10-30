let express = require('express');
let exphbs = require('express-handlebars')
var bodyparser = require('body-parser')
const Greet = require('./greet')
const flash = require('express-flash')
const session = require('express-session')
let app = express();




const pg = require("pg");
const Pool = pg.Pool;

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/my_greetings';

const pool = new Pool({
    connectionString,
    // ssl : useSSL
});




let greet = Greet(pool)


app.use(express.static('public'));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(bodyparser.urlencoded({ extended: false }))
app.set(bodyparser.json())

app.use(session({
    secret: "<add a secret string here>",
    resave: false,
    saveUninitialized: true
}));

app.use(flash());


app.get('/the-route', function (req, res) {
    req.flash('info', 'Flash Message Added');
    res.redirect('/');
});


app.get('/', async function (req, res) {
    req.flash('error','please entert name below')

    res.render('index', {
        count : await greet.counter()
    })
})

app.post('/greet', async function (req, res) {
    var name = req.body.name;
    var lang = req.body.language

    if (name === '' ) {
        req.flash('info','please entert name below')
    } 
    
    if(lang == undefined){
        req.flash('info','please select language')
    }
    // else {  await greet.setAnUpdate(req.body.name)
        await greet.setAnUpdate(req.body.name)
        var count = await greet.counter()

    // }
  

    res.render('index', {
        count: count,

        message: greet.greeted(req.body.name, req.body.language),
    })

})

app.get('/counter/:user',  async function (req, res) {



    let username = req.params.user;
    let nameList = await greet.personsCount(username)
    console.log(nameList);

    

    for (const key in nameList) {
      
            var element = nameList[key];
            
    }


    // console.log(element);

    res.render('user', {
        name: username,
        count: nameList

    })


})
app.get('/greeted', async function (req, res) {


// console.log(await greet.users())
    res.render('greeted', {
        names: await greet.users(),
    })
})

app.get('/reset',async function (req, res) {
    await greet.remove()

    res.render('index')
})
app.get('/back', function (req, res) {
    res.redirect('/')
})




const PORT = process.env.PORT || 3019
app.listen(PORT, function () {
    console.log('App started at port:', PORT)
})

