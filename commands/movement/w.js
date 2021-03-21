var stuff = require('../../stuff')
module.exports = {
    name: "w",
    category: "Movement",
    run(message, args) {
        if (!stuff.players[message.author.id]) throw `You have to run \`.play\` first before you can move`
        var repeat = Math.clamp(parseInt(args[0]) || 1, 1, 16)
        for (var i = 0; i < repeat; i++) stuff.movePlayer(message.author.id, -1, 0)
        var p = stuff.players[message.author.id]
        stuff.displayMap(message, p)
    }
}