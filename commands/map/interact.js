var stuff = require('../../stuff')
module.exports = {
    name: "interact",
    category: "Map",
    run(message, args) {
        var p = stuff.players[message.author.id]
        if (!p) throw `You have to type \`.play\` before interacting with an object`
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
            var onInteract = stuff.objects[obj.id].onInteract;
            if (onInteract) {
                onInteract(message, p, p.x + x, p.y + y, obj)
            }
        } else throw `This tile doesn't have an object attached to it, somehow`
        stuff.showInteractiveMap(message, p)
    }
}