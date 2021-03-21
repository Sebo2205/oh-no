const stuff = require("../../stuff")

module.exports = {
    name: "setsize",
    category: "Debug",
    onlyFor: ['602651056320675840'],
    run(message, args) {
        var width = parseInt(args[0]) || 0
        var height = parseInt(args[1]) || 0
        stuff.map.width = width
        stuff.map.height = height
        message.channel.send(`Set map size to ${width}x${height}`)
    }
}