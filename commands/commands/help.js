module.exports = {
    name: "help",
    category: "Commands",
    run(message, args) {
        if (args[0]) {

        } else {
            var categories = [...new Set(message.client.commands.map(el => el.category))]
            var embed = {
                title: `Command list`,
                fields: []
            }
            for (const c of categories) {
                embed.fields.push({
                    name: c,
                    value: message.client.commands.filter(el => el.category == c).map(el => `\`${el.name}\``).join(', '),
                    inline: true,
                })
            }
            message.channel.send({embed: embed})
        }
    }
}