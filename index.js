let express = require('express');
let exphbs = require('express-handlebars')
var bodyparser = require('body-parser')
const Greet = require('./greet')

let app = express();
let greet = Greet()

app.use(express.static('public'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyparser.urlencoded({extended: false}))
app.set(bodyparser.json())


app.get('/the-route', function (req, res) {
    req.flash('info', 'Flash Message Added');
    res.redirect('/');
});


app.get('/', function (req,res){
    res.render('index')

})
app.post('/greeted',function (req,res){
    greet.setNames(req.body.name)

    res.render('index', {
        message: greet.greeted(req.body.name, req.body.language),
        count:  greet.counter()
    })

})

app.get('/counter/:user', function (req, res) {

    //  namesList = greet(req.params.user)
    
  
   let  username = req.params.user;
   let nameList = greet.users()


    res.render('user',{
       name : username,
       count : nameList[username]
     })
  
  
  })
app.get('/greeted',function(req,res){
    
    

    res.render('greeted',{
        names :  greet.users(),
    })
})





const PORT = process.env.PORT || 3018
app.listen(PORT,function(){
    console.log('App started at port:', PORT)
})

