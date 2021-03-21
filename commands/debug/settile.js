const stuff = require("../../stuff")

module.exports = {
    name: "settile",
    category: "Debug",
    onlyFor: ['602651056320675840'],
    run(message, args) {
        var x = parseInt(args[1]) || 0
        var y = parseInt(args[0]) || 0
        var tile = args[2]
        if (!stuff.tiles[tile]) throw `The tile \`${tile}\` doesn't exist`
        stuff.map.setTile(x, y, tile)
        message.channel.send(`Placed tile ${stuff.tiles[tile].icon} ${stuff.tiles[tile].name} at X${x} Y${y}`)
    }
}