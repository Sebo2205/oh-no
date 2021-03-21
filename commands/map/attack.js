var stuff = require('../../stuff')
module.exports = {
    name: "attack",
    category: "Map",
    run(message, args) {
        var p = stuff.players[message.author.id]
        if (!p) throw `You have to type \`.play\` before attacking a player`
        var dir = args[0].toLowerCase()
        var x = 0;
        var y = 0;
        switch (dir) {
            case 'up':
                x = -1
                break;
            case 'down':
                x = 1
                break;
            case 'left':
                y = -1
                break;
            case 'right':
                y = 1
                break;
            default:
                throw `Invalid direction`
        }
        var obj = stuff.map.getTile(p.x + x, p.y + y)?.object
        if (obj) {
            if (obj.id != 0x01) throw `This tile doesn't have a player in it`
            var pl = stuff.players[obj.player]
            var dmg = Math.round(p.attack * (1 + (2 * Math.random()))) // ▱
            stuff.takeDamage(pl, dmg)
            message.channel.send({ content: `${obj.icon} ${obj.name}: ${(`${'▰'.repeat(Math.clamp((pl.health / pl.maxHealth) * 20, 0, 20))}${'▱'.repeat(Math.clamp((dmg / pl.maxHealth) * 20, 0, 20))}`).padEnd(20, '_')} -${dmg}`, code: true })    
        } else throw `This tile doesn't have an object attached to it, somehow`
        //stuff.displayMap(message, p)
    }
}