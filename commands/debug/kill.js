const stuff = require("../../stuff")

module.exports = {
    name: "kill",
    onlyFor: ['602651056320675840'],
    category: "Debug",
    run(message, args) {
        var i = Object.values(stuff.players).map(el => el.user.username).indexOf(args.join(" "))
        var p = stuff.players[Object.keys(stuff.players)[i]]
        if (!p) throw `Player \`${args.join(" ")}\` existn't in the map`
        stuff.killPlayer(p)
        message.channel.send({ content: `Killed ${p.user.username}`, code: true })
    }
}