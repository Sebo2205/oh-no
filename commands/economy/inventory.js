var Discord = require('discord.js')
const stuff = require('../../stuff')
module.exports = {
    name: 'inventory',
    category: 'Economy',
    /**
     * 
     * @param { Discord.Message } message 
     */
    async run(message) {
        Math.clamp = function (x, min, max) {
            if (x < min) return min
            else if (x > max) return max
            else return x
        }
        var items = stuff.getItems(message.author.id)
        var selectedItems = []
        var cursor = 0;
        var page = 0;
        var startFrom = page * 20;
        var e = ['🔼', '🔽', '◀️', '▶️', '🅰️', '✅']
        var embed = {
            title: `Items`,
            description: `${items.map((el, i) => `${i == cursor ? '► ' : ''}${stuff.items[el]?.icon || '❔'} ${selectedItems.includes(i) ? '**' : ''}${stuff.items[el]?.name || '???'}${selectedItems.includes(i) ? '**' : ''}`).slice(startFrom, startFrom + 20).join('\n') || 'empty lol'}`,
            footer: { text: `🔼 🔽: Move cursor\n◀️ ▶️: Switch page\n🅰️: Select\n✅: Next` }
        }
        var msg = await message.channel.send({embed: embed})
        async function updateEmbed() {
            items = stuff.getItems(message.author.id)
            startFrom = page * 20
            embed.description = `${items.map((el, i) => `${i == cursor ? '► ' : ''}${stuff.items[el]?.icon || '❔'} ${selectedItems.includes(i) ? '**' : ''}${stuff.items[el]?.name || '???'}${selectedItems.includes(i) ? '**' : ''}`).slice(startFrom, startFrom + 20).join('\n') || 'empty lol'}`
            await msg.edit({embed: embed})
        }
        for (const emoji of e) {
            await msg.react(emoji)
        }
        var c = msg.createReactionCollector((r, u) => u.id == message.author.id && e.includes(r.emoji.name), {time: 1000 * 120})
        c.on('collect', async (r, u) => {
            await r.users.remove(u.id)
            if (r.emoji.name == e[0]) cursor--
            if (r.emoji.name == e[1]) cursor++
            if (r.emoji.name == e[2]) {page--; cursor -= 20}
            if (r.emoji.name == e[3]) {page++; cursor += 20}
            page = Math.clamp(page, 0, Math.ceil(items.length / 20))
            cursor = Math.clamp(cursor, startFrom, startFrom + 19)
            if (r.emoji.name == e[4]) {
                if (!selectedItems.includes(cursor)) {
                    selectedItems.push(cursor)
                } else {
                    selectedItems.splice(selectedItems.indexOf(cursor), 1)
                }
            }
            updateEmbed()
            //console.log(r.emoji.name)
            if (r.emoji.name == e[5]) {
                if (selectedItems.length < 1) return;
                await r.message.reactions.removeAll()
                var _e = ['❔', '💵', '🔥']
                embed = {
                    title: `Choose action`,
                    description: ``
                }
                if (selectedItems.length < 2) {embed.description += `${_e[0]}: Use\n`; await msg.react(_e[0])}
                embed.description += `${_e[1]}: Sell\n${_e[2]}: Perish`
                var m = await msg.edit({embed: embed})
                await msg.react(_e[1])
                await msg.react(_e[2])
                var c = msg.createReactionCollector((r, u) => u.id == message.author.id && _e.includes(r.emoji.name), {time: 1000 * 120})
                c.on('collect', (r, u) => {
                    if (selectedItems.length < 2 && r.emoji.name == _e[0]) {
                        var use = stuff.items[items[selectedItems[0]]].use
                        if (use) use(message, selectedItems[0])
                        else {message.channel.send(`You can't use that item`);m.delete()}
                    } else if (r.emoji.name == _e[1]) {
                        var stonks = 0;
                        for (const slot of selectedItems) {
                            var price = stuff.items[items[slot]]?.price || 0;
                            stonks += price;
                        }
                        stuff.addMoney(message.author.id, stonks)
                        stuff.removeItems(message.author.id, selectedItems)
                        message.channel.send(`Sold ${selectedItems.length} items for ${stonks}$`)
                    } else if (r.emoji.name == _e[2]) {
                        stuff.removeItems(message.author.id, selectedItems)
                        message.channel.send(`Perished ${selectedItems.length} items out of existence`)
                    }
                })
                return;
            }
        })
    }
}