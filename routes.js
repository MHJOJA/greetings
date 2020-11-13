module.exports = function routes(greet) {

    let greetings = require ('./greet');

    async function home (req, res){
        req.flash('error','please entert name below')

        res.render('index', {
            count : await greet.counter()
        })
    }

    async function greets (req, res){
          var name = req.body.name;
    var lang = req.body.language

    if (name === '' ) {
        req.flash('info','please entert name below')
    } 
    
   else if(lang == undefined){
        req.flash('info','please select language')
    }
    else {
        await greet.setAnUpdate(req.body.name)
        var count = await greet.counter()
    }
    
  

    res.render('index', {
        count: count,

        message: greet.greeted(req.body.name, req.body.language),
    })
    }

    async function counter(req, res){

        let username = req.params.user;
    let nameList = await greet.personsCount(username)
   
    console.log(nameList);

    res.render('user', {
        name: username,
        count: nameList

    })

    }

    async function greeted (req, res){

        res.render('greeted', {
            names: await greet.users(),
        })

    }

    async function reset (req, res){

        req.flash('success','successfully reseted counter')
    await greet.remove()

    res.render('index')

    }

    async function back (req, res){
        res.redirect('/')
    }

    async function flashMessages (req, res){

        req.flash('info', 'Flash Message Added');
    res.redirect('/');

    }

    return{
        home,
        greets,
        counter,
        greeted,
        reset,
        back,
        flashMessages

    }

}