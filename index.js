const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')
client.commands = new Discord.Collection()
const stuff = require('./stuff')
const fs = require('fs')
const { resolve } = require('path')
const { hastebin } = require('./stuff')
hastebin('egg')
stuff.scrollWidth = 14;
stuff.scrollHeight = 14;
Math.clamp = (x, min, max) => {
    if (x > max) return max;
    else if (x < min) return min;
    else return x;
}
stuff.tiles = {
    'grass': { name: "Grass", icon: '🟩', collision: false, color: 0x34eb37ff },
    'dirt': { name: "Dirt", icon: '🟫', collision: false, color: 0xeb6b34ff },
}
stuff.objects = {
    'player': { name: "EggEater69", collision: true, pushable: true, icon: '⚪', id: 'player', color: 0 },
    'none': { name: "Nothing", collision: false, icon: '', id: 'none', color: 0 },
    'moneybag': { name: "Money Bag", money: 150, collision: true, pushable: true, icon: '💰', color: 0xe5ff00ff, id: "moneybag", onInteract(message, p, x, y, o) { var m = o.money;p.money += m;message.channel.send({content: `You got ${m}$`, code: true});stuff.map.setObject(x, y, 'none')} },
    'rock': { name: "Rock", collision: true, pushable: true, icon: '🪨', id: "rock", color: 0xadadadff },
    'bomb': { name: "Bomb", collision: true, pushable: true, icon: '💣', id: 'bomb', color: 0x111111ff, onInteract(message, _p, x, y) {
        stuff.map.setObject(x, y, 'none')
        var players = []
        var left = stuff.map.getTile(x, y - 1)
        var right = stuff.map.getTile(x, y + 1)
        var up = stuff.map.getTile(x - 1, y)
        var down = stuff.map.getTile(x + 1, y)
        var bombs = []
        if (left && left.object.id == 'bomb') bombs.push([x, y - 1])
        if (right && right.object.id == 'bomb') bombs.push([x, y + 1])
        if (up && up.object.id == 'bomb') bombs.push([x - 1, y])
        if (down && down.object.id == 'bomb') bombs.push([x + 1, y])
        
        if (left && left.object.id == 'player') players.push(stuff.players[left.object.player])
        if (right && right.object.id == 'player') players.push(stuff.players[right.object.player])
        if (up && up.object.id == 'player') players.push(stuff.players[up.object.player])
        if (down && down.object.id == 'player') players.push(stuff.players[down.object.player])
        for (var pl of players) {
            stuff.takeDamage(pl, pl.maxHealth - 1)
        }
        for (var pos of bombs) {
            var b = stuff.map.getTile(pos[0], pos[1]).object
            if (b.onInteract) b.onInteract({ channel: { send() {} } }, _p, pos[0], pos[1])
        }
        message.channel.send({ code: true, content: `Bomb go boom and ${players.length} players go oof` })
    } }
}
stuff.getMapDisplay = (message, p) => {
    var center = stuff.map.getTile(p.x, p.y);
    var left = stuff.map.getTile(p.x, p.y - 1);
    var right = stuff.map.getTile(p.x, p.y + 1);
    var up = stuff.map.getTile(p.x - 1, p.y);
    var down = stuff.map.getTile(p.x + 1, p.y);
    var mapText = ``;
    var coolCounter = p.scrollY;
    for (var x = p.scrollX; x < p.scrollX + stuff.scrollWidth; x++) {
        for (var y = p.scrollY; y < p.scrollY + stuff.scrollHeight; y++) {
            if (coolCounter >= p.scrollY + stuff.scrollHeight) {mapText += '\n', coolCounter = p.scrollY}
            var tile = stuff.map.getTile(x, y)
            mapText += tile?.object?.icon || tile?.icon || '⬛'
            coolCounter++;
        }
    }
    var money = Math.floor(p.money).toString().padStart(9, '0')
    var money1 = money.slice(6, 9)
    var money2 = money.slice(3, 6)
    var money3 = money.slice(0, 3)
if (p.health <= 0) {
    mapText += 
`
\`\`\`
${p.obj.icon} ${p.obj.name} (Ded)
\`\`\`
`
} else {
mapText += 
`\`\`\`
${p.obj.icon} ${p.obj.name}
Health: ${Math.floor(p.health).toString().padStart(3, '0')}/${Math.floor(p.maxHealth).toString().padStart(3, '0')}\tAttack: ${Math.floor(p.attack).toString().padStart(3, '0')}\tMoney: ${money3} ${money2} ${money1}$
X=${Math.floor(p.x).toString().padStart(3, '0')}\tY=${Math.floor(p.y).toString().padStart(3, '0')}\tScroll Position: X=${Math.floor(p.scrollX).toString().padStart(3, '0')}\tY=${Math.floor(p.scrollY).toString().padStart(3, '0')}
Current Tile: ${center?.name || 'unknown'} (${center?.object?.name || 'unknown'})
Left Tile: ${left?.name || 'unknown'} (${left?.object?.name || 'unknown'})\tRight Tile: ${right?.name || 'unknown'} (${right?.object?.name || 'unknown'})\tDown Tile: ${down?.name || 'unknown'} (${down?.object?.name || 'unknown'})\tUp Tile: ${up?.name || 'unknown'} (${up?.object?.name || 'unknown'})
\`\`\``
}
    return mapText
}
stuff.displayMap = (message, p) => {
    var mapText  = stuff.getMapDisplay(message, p)
    message.channel.send({ content: mapText })
}
stuff.players = {}
stuff.map = {
    tiles: {},
    name: `Unnamed Map`,
    width: 256,
    height: 256,
    setTile(x, y, tile, removeObject = true) {
        if (removeObject) {
            stuff.map.tiles[`${x},${y}`] = { ...stuff.tiles[tile], object: stuff.objects.none, id: tile }
        } else {
            var o = stuff.map.tiles[`${x},${y}`].object
            stuff.map.tiles[`${x},${y}`] = { ...stuff.tiles[tile], object: o, id: tile }
        }
    },
    getTile(x, y) {
        return stuff.map.tiles[`${x},${y}`]
    },
    setObject(x, y, object) {
        var obj = object;
        if (typeof object == 'string') obj = stuff.objects[object];
        var t = stuff.map.tiles[`${x},${y}`]
        t.object = obj
    },
    checkCollision(x, y) {
        var tile = stuff.map.tiles[`${x},${y}`]
        // Return true if the tile doesn't exist, most likely because invalid or out of bounds position
        if (!tile) return true
        return tile.collision || tile.object.collision
    },
    generateObjects(options) {
        // Some crappy map generation
        if (!options) return;
        console.log(`Generating objects`)
        
        for (var y = 0; y < stuff.map.height; y++) {
            
            for (var x = 0; x < stuff.map.width; x++) {
                var obj = 'none'
                for (var o of options) {
                    if (Math.random() < o.spawnRate) obj = o.id
                }
                stuff.map.tiles[`${y},${x}`].object = stuff.objects[obj]
            }
        }
        console.log(`Generated objects`)
    },
    generate(options = {defaultTile: 'grass', spawnTiles: [{ id: "dirt", spawnRate: 0.4 }], spawnObjects: [{ id: "moneybag", spawnRate: 0.03 }, { id: "rock", spawnRate: 0.06 }]}) {
        // Some crappy map generation
        console.log(`Generating tiles`)
        for (var y = 0; y < stuff.map.height; y++) {
            for (var x = 0; x < stuff.map.width; x++) {
                var til = options.defaultTile;
                for (var t of options.spawnTiles) {
                    if (Math.random() < t.spawnRate) til = t.id
                }
                var t = {
                    ...stuff.tiles[til],
                    id: til,
                    object: stuff.objects.none
                }
                stuff.map.tiles[`${y},${x}`] = t
            }
        }
        console.log(`Finished generating tiles`)
        stuff.map.generateObjects(options.spawnObjects)
    }
}
stuff.takeDamage = (p, damage) => {
    p.health -= damage;
    p.health = Math.clamp(Math.floor(p.health), 0, p.maxHealth)
    if (p.health <= 0) stuff.killPlayer(p)
}
stuff.killPlayer = (p) => {
    var o = Object.create(stuff.objects.moneybag)
    o.money = p.money;
    if (p.tile?.object?.id == 'player') p.tile.object = o;

   delete stuff.players[p.user.id]
}
stuff.showInteractiveMap = async (message, p) => {
    var m = await message.channel.send({content: stuff.getMapDisplay(message, p)})
    var e = ['🔼', '🔽', '◀️', '▶️']
    for (const h of e) {
        await m.react(h)
    }
    var c = m.createReactionCollector((r, u) => e.includes(r.emoji.name) && u.id == message.author.id, { time: 7 * 60 * 1000 })
    c.on('collect', async (r, u) => {
        r.users.remove(u.id)
        var x = 0;
        var y = 0;
        if (r.emoji.name == e[0]) x = -1;
        if (r.emoji.name == e[1]) x = 1;
        if (r.emoji.name == e[2]) y = -1;
        if (r.emoji.name == e[3]) y = 1;
        stuff.movePlayer(message.author.id, x, y)
        m.edit({content: stuff.getMapDisplay(message, p)})
    })
}
stuff.movePlayer = (id, x, y) => {
    var p = stuff.players[id]
    if (p) {
        if (!stuff.map.checkCollision(p.x + x, p.y + y)) {
            stuff.map.setObject(p.x, p.y, 'none')
            p.x += x;
            p.y += y;
            stuff.map.setObject(p.x, p.y, p.obj)
            p.tile = stuff.map.getTile(p.x, p.y)
            if (p.y > p.scrollY + stuff.scrollHeight - 1) p.scrollY += stuff.scrollHeight;
            if (p.x > p.scrollX + stuff.scrollWidth - 1) p.scrollX += stuff.scrollWidth;
            if (p.y < p.scrollY) p.scrollY -= stuff.scrollHeight;
            if (p.x < p.scrollX) p.scrollX -= stuff.scrollWidth;
        } else {
            var obj = stuff.map.getTile(p.x + x, p.y + y)?.object;
            if (obj && obj.pushable) {
                var tileX = p.x + x
                var tileY = p.y + y
                if (!stuff.map.checkCollision(tileX + x, tileY + y)) {
                    var o = Object.create(obj)
                    stuff.map.setObject(tileX + x, tileY + y, o)
                    stuff.map.setObject(tileX, tileY, 'none')
                    stuff.movePlayer(id, x, y)
                    if (o.id == 'player' && o.player) {
                        var p = stuff.players[o.player]
                        p.x = tileX + x;
                        p.y = tileY + y;
                        p.tile = stuff.map.getTile(p.x, p.y)
                    }
                }
            }
        }
    }
}
stuff.map.generate()
stuff.client = client;
stuff.reload = (p = 'commands/') => {
    var files = fs.readdirSync(p)
    for (const f of files) {
        if (f.endsWith('.js')) {
            delete require.cache[resolve(`./${p}/${f}`)]
            var c = require(`./${p}/${f}`)
            client.commands.set(c.name, c)
        } else if (fs.statSync(resolve(`./${p}/${f}`)).isDirectory()) {
            stuff.reload(`${p}/${f}/`)
        }
    }
}
stuff.loadItems = () => {
    var files = fs.readdirSync('items/')
    stuff.items = {}
    for (const f of files) {
        delete require.cache[resolve(`./items/${f}`)]
        var c = require(`./items/${f}`)
        stuff.items[c.id] = c;
    }
}
client.on('ready', () => {
    stuff.reload()
    stuff.loadItems()
    console.log('ha ha yes')
})
client.on('message', async msg => {
    try {
        if (msg.author.bot) return;
        if (!msg.content.startsWith(config.prefix)) return;
        if (!stuff.db.exists(`/${msg.author.id}/`)) stuff.db.push(`/${msg.author.id}/`, {
            money: 0,
            items: [],
            bank: 0,
        })
        var args = msg.content.slice(config.prefix.length).split(' ');
        var cmdName = args.shift();
        var cmd = client.commands.get(cmdName)
        if (cmd) {
            if (cmd.onlyFor) if (!cmd.onlyFor.includes(msg.author.id)) throw `You can't use this command`;
            cmd.run(msg, args)
        }
    } catch (e) {
        var embed = {
            title: e.name || "Get error'd lol",
            color: 0xff0000,
            description: e.message || e || 'empty void of nothingness'
        }
        console.log(e)
        msg.channel.send({embed: embed});
    }
})
client.login(config.token)
