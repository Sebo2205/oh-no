const stuff = require("../../stuff")

module.exports = {
    name: "selfperish",
    category: "Map",
    run(message) {
        if (!stuff.players[message.author.id]) throw `You have to join the map before committing self perish`
        stuff.killPlayer(stuff.players[message.author.id])
        message.channel.send(`You killed yourself`)
    }
}