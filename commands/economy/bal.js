const stuff = require("../../stuff")

module.exports = {
    name: 'bal',
    category: 'Economy',
    run(message) {
        var embed = {
            title: `Your moni lol`,
            description: `Cash: ${stuff.getMoney(message.author.id)}$\nBank: ${stuff.getBankMoney(message.author.id)}$\nNet worth or soemthing: ${stuff.getMoney(message.author.id) + stuff.getBankMoney(message.author.id)}$`
        }
        message.channel.send({embed: embed})
    }
}