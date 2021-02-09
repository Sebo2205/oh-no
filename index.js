const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./config.json')
client.commands = new Discord.Collection()
const stuff = require('./stuff')
const fs = require('fs')
const { resolve } = require('path')
stuff.client = client;
stuff.reload = (p = 'commands/') => {
    var files = fs.readdirSync(p)
    for (const f of files) {
        if (f.endsWith('.js')) {
            delete require.cache[resolve(`./${p}/${f}`)]
            var c = require(`./${p}/${f}`)
            client.commands.set(c.name, c)
        } else if (fs.statSync(resolve(`./${p}/${f}`)).isDirectory()) {
            stuff.reload(`${p}/${f}/`)
        }
    }
}
client.on('ready', () => {
    stuff.reload()
    console.log('ha ha yes')
})
client.on('message', async msg => {
    try {
        if (msg.author.bot) return;
        if (!msg.content.startsWith(config.prefix)) return;
        var args = msg.content.slice(config.prefix.length).split(' ');
        var cmdName = args.shift();
        var cmd = client.commands.get(cmdName)
        if (cmd) {
            if (cmd.onlyFor) if (!cmd.onlyFor.includes(msg.author.id)) throw `You can't use this command`;
            cmd.run(msg, args)
        }
    } catch (e) {
        var embed = {
            title: e.name || "Get error'd lol",
            color: 0xff0000,
            description: e.message || ''
        }
        console.log(e)
        msg.channel.send({embed: embed});
    }
})
client.login(config.token)
