var stuff = require('../../stuff')
module.exports = {
    name: "map",
    category: "Map",
    run(message) {
        if (!stuff.players[message.author.id]) throw `You have to run \`.play\` first before you can see the map`
        var p = stuff.players[message.author.id]
        stuff.showInteractiveMap(message, p)
    }
}