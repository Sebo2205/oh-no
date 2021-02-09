module.exports = {
    name: 'reload',
    onlyFor: ['602651056320675840'],
    category: "Dev",
    run(message) {
        require('../../stuff.js').reload()
        message.channel.send(`Commands reloaded succesfully`)
    }
}