var fs = require('fs')
var Jimp = require('jimp')
const stuff = require('../../stuff')
module.exports = {
    name: "load",
    category: "Map Manægment",
    onlyFor: ['602651056320675840'],
    async run(message, args) {
        var msg = await message.channel.send({content: `Loading map: Detecting map type`, code: true})
        if (fs.statSync(`maps/${args.join(" ")}`).isDirectory()) {
            await msg.edit(`\`\`\`Loading map: Reading extra map data JSON\`\`\``)
            stuff.map.tiles = {}
            stuff.players = {}
            var data = JSON.parse(fs.readFileSync(`maps/${args.join(" ")}/data.json`, 'utf8'))
            var t = {}
            await msg.edit(`\`\`\`Loading map: Reading map.fuc\`\`\``)
            var d = fs.readFileSync(`maps/${args.join(" ")}/map.fuc`)
            var width = (d[1]<<8) | d[0]
            var height = (d[3]<<8) | d[2]
            //return //console.log(`${width}x${height}`)
            var i = -1;
            for (var x = 0; x < width; x++) {
                for (var y = 0; y < height; y++) {
                    i++
                    var tile = d[4 + i]
                    if (tile) {
                        t[`${x},${y}`] = {
                           ...stuff.tiles[tile],
                           id: tile,
                           object: {...stuff.objects[data.objects[`${x},${y}`]?.id || 0], ...(data.objects[`${x},${y}`] || {})}
                        }
                    } else continue
                }
            }
            stuff.map.tiles = t;
            stuff.map.width = width
            stuff.map.height = height
            stuff.map.name = fs.readFileSync(`maps/${args.join(" ")}/name.txt`, 'utf8')
            await msg.edit(`\`\`\`Loaded map '${args.join(" ")}' succesfully\`\`\``)
            //new Jimp(`maps/${args.join(" ")}/map.bmp`, async (er, img) => {
            //})
        } else {
            await msg.edit(`\`\`\`Loading .json maps is not supported, now go delete yourself (jk)\`\`\``)
        }
    }
}