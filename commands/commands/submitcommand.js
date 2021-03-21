const stuff = require("../../stuff")
var fetch = require('node-fetch')
var fs = require('fs')
module.exports = {
    name: "submitcommand",
    category: "Commands",
    async run(message) {
        var a = message.attachments.first()
        if (a) {
            if (a.size > 1024 * 512) return message.channel.send(`File too big (${stuff.format(a.size, stuff.filesize)} > ${stuff.format(1024 * 512, stuff.filesize)})`)
            if (!a.name.endsWith('.js')) return message.channel.send(`File must end with .js`)
            if (fs.existsSync(`submissions/${a.name}`)) return message.channel.send(`File already exists`)
            var res = await fetch(a.url)
            if (res.ok) {
                var txt = `// ${message.author.tag}\n`
                txt += await res.text()
                await fs.promises.writeFile(`submissions/${a.name}`, txt)
                message.channel.send(`Submitted command ${a.name} successfully, now wait a solar eclipse until it's approved`)
            } else return message.channel.send('no but delayed')
        } else message.channel.send(`no`)
    }
}