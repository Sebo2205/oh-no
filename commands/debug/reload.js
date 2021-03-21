module.exports = {
    name: 'reload',
    onlyFor: ['602651056320675840'],
    category: "Debug",
    run(message) {
        require('../../stuff.js').reload()
        require('../../stuff.js').reloadConsoleCommands()
        message.channel.send(`Commands reloaded succesfully`)
    }
}