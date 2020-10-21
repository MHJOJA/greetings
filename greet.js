module.exports = function greet(pool) {


    var namesList = {}


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
    }

    async function setAnUpdate(name) {
        const setName = await pool.query('SELECT names FROM greet WHERE names= $1', [name])
        if (setName.rowCount === 0) {
            storeNames(name)
        }
        updateNames(name)
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
        return setName.rows;
    }

    async function counter() {
        let counts = await pool.query('SELECT * FROM greet')
        return counts.rowCount;
    }

    return {
        greeted,
        storeNames,
        users,
        counter,
        updateNames,
        setAnUpdate,
        personsCount
    }
}