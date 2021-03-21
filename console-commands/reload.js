const stuff = require("../stuff")

module.exports = {
    name: 'reload',
    run(client) {
        stuff.reload()
        stuff.reloadConsoleCommands()
        console.log('Commands reloaded succesfully')
    }
}