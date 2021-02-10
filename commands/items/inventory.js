var Discord = require('discord.js')
const stuff = require('../../stuff')
module.exports = {
    name: 'inventory',
    category: 'Items',
    /**
     * 
     * @param { Discord.Message } message 
     */
    async run(message) {
        var items = stuff.getItems(message.author.id)
        var selectedItems = []
        var cursor = 0;
        var embed = {
            title: `Items`,
            description: `${items.map(el => `${stuff.items[el].icon || '❔'} ${stuff.items[el].name || '???'}`).join('\n') || 'empty lol'}`
        }
        async function updateEmbed() {
            items = stuff.getItems(message.author.id)
            embed.description
        }
    }
}