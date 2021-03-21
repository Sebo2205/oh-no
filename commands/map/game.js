var stuff = require('../../stuff')
module.exports = {
    name: "game",
    category: "Map",
    run(message) { 
        var p = Object.values(stuff.players)
        message.channel.send({content: `Game Status:\nPlayers: ${p.length.toString().padStart(2, '0')}\tMap: ${stuff.map.name.toString().padEnd(32, ' ')}\tMap Size: ${stuff.map.width.toString().padStart(3, '0')}x${stuff.map.height.toString().padStart(3, '0')}\n${p.map(play => `${play.obj.icon} ${play.obj.name.padEnd(32, ' ')} Health ${'▰'.repeat(Math.clamp((play.health / play.maxHealth) * 10, 0, 10)).padEnd(10, '▱')} ${play.health}/${play.maxHealth}`).join('\n') || 'Empty'}`, code: true, split: true})
    }
}