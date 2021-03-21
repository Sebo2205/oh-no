const { MessageAttachment } = require('discord.js')
var Jimp = require('jimp')
var stuff = require('../../stuff')
module.exports = {
    name: 'fullmap',
    category: "Map",
    async run(message) {
        message.channel.send(`Generating the map...`)
        var j = new Jimp(stuff.map.width, stuff.map.height, async (err, image) => {
            for (var x = 0; x < stuff.map.height; x++) {
                for (var y = 0; y < stuff.map.width; y++) {
                    var tile = stuff.map.getTile(x, y)
                    var color = tile?.object?.color || tile?.color || 0;
                    var _x = x
                    var _y = y 
                    image.setPixelColor(color, _y, _x)
                }
            }
            image.resize(Jimp.AUTO, 1024, Jimp.RESIZE_NEAREST_NEIGHBOR)
            try {
                var buffer = await image.getBufferAsync(Jimp.MIME_PNG)
                var attachment = new MessageAttachment(buffer)
                await message.channel.send(`Full map view:`, attachment)
            } catch (er) { message.channel.send(`Get error'd lol`);console.log(er) }
        })
    }
}