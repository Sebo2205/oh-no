module.exports = {
    name: "channel",
    run(client, args) {
        var id = args[0]
        var c = client.channels.cache.filter(el => el.send).get(id) || client.channels.cache.filter(el => el.send && el.name == args[0]).first()
        if (!c) throw `Channel ${c} not found`
        client.curChannel = c
        console.log(`Switched channel to #${c.name}`)
    }
}