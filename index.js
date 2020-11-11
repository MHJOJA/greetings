let express = require('express');
let exphbs = require('express-handlebars')
var bodyparser = require('body-parser')
const Greet = require('./greet')
const flash = require('express-flash')
const session = require('express-session')
const routes = require('./routes')
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

var Routes = routes(greet);


app.get('/the-route', Routes.flashMessages);

app.get('/', Routes.home)

app.post('/greet', Routes.greets)

app.get('/counter/:user', Routes.counter)

app.get('/greeted', Routes.greeted)

app.get('/reset', Routes.reset)

app.get('/back', Routes.back)




const PORT = process.env.PORT || 3019
app.listen(PORT, function () {
    console.log('App started at port:', PORT)
})

