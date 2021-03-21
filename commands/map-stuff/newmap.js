const stuff = require("../../stuff");
var fs = require('fs')
module.exports = {
    name: "newmap",
    category: "Map Manægment",
    onlyFor: ['602651056320675840'],
    async run(message, args) {
        var width = parseInt(args[0]) || 128;
        var height = parseInt(args[1]) || 128;
        var options = undefined
        try {
            options = JSON.parse(args.slice(2).join(" "))
        } catch (e) {
            options = undefined;
        }
        if (width * height > 1048576) throw `The map size is too big, ${width * height} > 1048576`
        var msg = await message.channel.send({content: `Generating map: Resetting tiles`, code: true})
        stuff.map.tiles = {}
        stuff.map.height = height
        stuff.map.width = width
        if (options) {
            await msg.edit({content: `Generating map: Generating tiles`,code:true})
            stuff.map.generate(options)
            await msg.edit({code:true,content:`Generating map: Generating objects`})
            stuff.map.generateObjects(options.spawnObjects)
        }
        else {
            await msg.edit({content: `Generating map: Generating tiles`,code:true})
            stuff.map.generate()
            await msg.edit({code:true,content:`Generating map: Generating objects`})
            stuff.map.generateObjects()
        }
        stuff.players = {}
        await msg.edit({code:true,content:`Generated a ${width}x${height} map`})
    }
}