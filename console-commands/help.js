module.exports = {
    name: "help",
    run(client) {
        console.log(`Command list: ${client.consoleCommands.map(el => el.name).join(', ')}`)
    }
}