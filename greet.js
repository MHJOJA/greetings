module.exports = function greetings() {


    var namesList = {}


    function setNames(name) {
        if (namesList[name] === undefined) {
            namesList[name] = 0
        }
        namesList[name]++

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


    function users() {
        return namesList
    }

    function counter() {
        let listNames = Object.keys(namesList);
        return listNames.length
    }

    return {
        greeted,
        setNames,
        users,
        counter
    }
}