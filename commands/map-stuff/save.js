const stuff = require("../../stuff");
var fs = require('fs');
const Jimp = require("jimp");
module.exports = {
    name: "save",
    category: "Map Manægment",
    onlyFor: ['602651056320675840'],
    async run(message, args) {
        var msg = await message.channel.send({content: `Saving map: Saving tiles`, code: true})
            var filename = args.join(" ").replace(/\/\\\:\*\?"\<\>\| {2,}/, '_').replace('con', 'no')
            if (!fs.existsSync(`maps/${filename}`)) fs.mkdirSync(`maps/${filename}`)
            var a = new Uint8Array(stuff.map.width * stuff.map.height + 4)
            a[0] = (stuff.map.width & 0xFF)
            a[1] = ((stuff.map.width >> 8) & 0xFF)
            a[2] = (stuff.map.height & 0xFF)
            a[3] = ((stuff.map.height >> 8) & 0xFF)
            var data = {
                objects: {}
            }
            var defaultProperties = ['onInteract', 'color', 'collision', 'icon', 'name', 'pushable']
            var i = 0;
            for (var x = 0; x < stuff.map.height; x++) {
                for (var y = 0; y < stuff.map.width; y++) {
                    var tile = stuff.map.getTile(x, y)
                    if (tile?.object && tile?.object.id != 0) {
                        var o = {}
                        for (var k of Object.keys(tile.object)) {
                            if (!defaultProperties.includes(k)) o[k] = tile.object[k]
                        }
                        data.objects[`${y},${x}`] = o
                    }
                    //var color = tile?.color || 0;
                    //var _x = x
                    //var _y = y 
                    //image.setPixelColor(color, _y, _x)
                    ////console.log(tile)
                    a[i + 4] = tile?.id || 0
                    i++
                }
            }
            //var b = await image.getBufferAsync(Jimp.MIME_BMP)
            //await msg.edit({content: `Saving map: Saving image`, code: true})
            //fs.writeFileSync(`maps/${filename}/map.bmp`, b)
            await msg.edit({content: `Saving map: Saving data JSON`, code: true})
            fs.writeFileSync(`maps/${filename}/data.json`, JSON.stringify(data), 'utf8')
            fs.writeFileSync(`maps/${filename}/name.txt`, args.join(" "), 'utf8')
            fs.writeFileSync(`maps/${filename}/map.fuc`, Buffer.from(a))
            await msg.edit({content: `Saved the map as '${filename}'`, code: true})
            //new Jimp(stuff.map.width, stuff.map.height, async (er, image) => {
            //})
        
    }
}