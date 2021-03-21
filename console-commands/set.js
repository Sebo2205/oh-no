module.exports = {
    name: "set",
    run(client, args) {
        var v = args.slice(1).join(' ')
        client.consoleConfig[args[0]] = v
        console.log(`Set ${args[0]} to ${v}`)
    }
}