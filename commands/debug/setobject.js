const stuff = require("../../stuff")

module.exports = {
    name: "setobject",
    category: "Debug",
    onlyFor: ['602651056320675840'],
    run(message, args) {
        var x = parseInt(args[1]) || 0
        var y = parseInt(args[0]) || 0
        var obj = args[2]
        if (!stuff.objects[obj]) throw `The object \`${obj}\` doesn't exist`
        stuff.map.setObject(x, y, obj)
        message.channel.send(`Placed object ${stuff.objects[obj].icon} ${stuff.objects[obj].name} at X${x} Y${y}`)
    }
}