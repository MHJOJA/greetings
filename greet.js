module.exports = function greet(pool) {


    //var namesList = {}


    // function setNames(name) {
    //     if (namesList[name] === undefined) {
    //         namesList[name] = 0
    //     }
    //     namesList[name]++

    // }

    async function storeNames(name) {

        await pool.query('insert into greet(names,counters) values ($1,$2)', [name, 1])


    }


    async function updateNames(name) {
        await pool.query('UPDATE greet set counters = counters+1 WHERE names = $1', [name])
        if(name === undefined){
            return ('please entert name below')
        }    }

    async function setAnUpdate(name) {
        const setName = await pool.query('SELECT names FROM greet WHERE names= $1', [name])
        if (setName.rowCount === 0) {
           storeNames(name)
        }
       await updateNames(name)
    }



    async function personsCount(name) {
        const setName = await pool.query('SELECT counters FROM greet WHERE names= $1', [name])
        return setName.rows[0].counters
    }



    function greeted(name, language) {



        if (language == "xhosa") {
            return "Molo, " + name;
        }

        else if (language == "english") {
            return "Hello, " + name;
        }

        else if (language == "sotho") {
            return "Dumelang, " + name
        }
    }
    

    async function users() {
        let setName = await pool.query('SELECT names FROM greet')
        console.log(setName.rows)
        return setName.rows;
    }

    async function counter() {
        let counts = await pool.query('SELECT * FROM greet')
        return counts.rowCount;
    }
    async function selectName (){
        let select = await pool.query('select name from greet WHERE names = $1')
        return select.rowCount;
    }
    async function usersList (){
        return namesList

    }

    async function remove(){
     await pool.query("delete from greet")
    }


    
    return {
        greeted,
        storeNames,
        users,
        counter,
        updateNames,
        setAnUpdate,
        personsCount,
        remove,
        selectName,
        usersList
    }
}