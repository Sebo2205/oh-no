module.exports = {
    name: "channels",
    run(client) {
        console.log(`Currently available channels:\n${client.channels.cache.filter(el => el.send).map(el => `#${el.name} (${el.id})`).join('\n') || 'No'}`)
    }
}