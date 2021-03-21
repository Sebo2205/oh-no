module.exports = {
    name: "emojis",
    async run(client) {
        if (!client.curChannel) throw `no`
        var emoji = (await client.curChannel.guild.fetch()).emojis.cache
        console.log(`Emoji list: ${emoji.map(el => `${el.name} (${el})`).join('\n')}`)
    }
}