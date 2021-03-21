var stuff = require('../../stuff')
module.exports = {
    name: "deltile",
    onlyFor: ['602651056320675840'],
    category: "Debug",
    run(message, args) {
        var x = parseInt(args[0]) || 0
        var y = parseInt(args[1]) || 0
        message.channel.send(stuff.map.tiles[`${y},${x}`])
        stuff.map.tiles[`${y},${x}`] = undefined;
        message.channel.send(`Deleted the tile at X${x} Y${y}`)
    }
}