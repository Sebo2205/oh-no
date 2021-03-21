var stuff = require('../../stuff')
module.exports = {
    name: "play",
    category: "Map",
    run(message, args) {
        if (!stuff.players[message.author.id]) {
            var colors = ['🔵','🟠','🟣','⚪','🟡','🟢','🔴','🥚']
            var c = colors.indexOf(args[0])
            var colorNames = {
                blue: 0,
                orange: 1,
                purple: 2,
                white: 3,
                yellow: 4,
                green: 5,
                red: 6,
                egg: 7,
            }
            if (!colors[c]) c = colorNames[(args[0] || '').toLowerCase()]
            var obj = Object.create(stuff.objects[1]);
            obj.name = message.author.username
            var playerCount = Object.keys(stuff.players).length;
            obj.icon = colors[c] || colors[Math.floor(colors.length * Math.random())]
            var validX = 0;
            var validY = 0;
            var foundPos = false;
            for (var x = 0; x < stuff.map.width; x++) {
                for (var y = 0; y < stuff.map.height; y++) {
                    var t = stuff.map.getTile(x, y)
                    if (t?.validSpawn) { validX = x; validY = y; foundPos = true; break }
                }
                if (foundPos) break;
            }
            var tile = stuff.map.getTile(validX, validY)
            stuff.players[message.author.id] = {
                user: message.author,
                maxHealth: 20,
                health: 20,
                money: 0,
                scrollX: 0,
                scrollY: 0,
                attack: 1,
                x: validX,
                y: validY,
                obj,
                tile,
            }
            obj.player = message.author.id;
            stuff.map.setObject(validX, validY, obj)
            message.channel.send(`Joined the map at coordinates X${validX} Y${validY} as ${obj.icon}`)
        } else throw `You can't join the map because you're already there`
    }
}