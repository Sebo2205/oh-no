module.exports = {
    name: 'send',
    run(client, args) {
        if (!client.curChannel) throw `No channel selected`
        client.curChannel.send(args.join(' '))
    }
}