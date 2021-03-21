var fs = require('fs/promises')
const stuff = require('../../stuff')
module.exports = {
    category: "Commands",
    name: "submissions",
    onlyFor: ['602651056320675840'],
    async run(message) {
        var files = await fs.readdir(`submissions`)
        var f = []
        for (var file of files) {
            var size = (await fs.stat('submissions/' + file)).size
            var content = await fs.readFile('submissions/' + file, 'utf8')
            var author = content.split('\n')[0].slice(2)
            f.push(`${file.padEnd(32, ' ')} ${author.padEnd(36, ' ')} ${stuff.format(size, stuff.filesize).padStart(9, ' ')}`)
        }
        message.channel.send({ code: true, content: `Submitted commands:\n${f.join('\n') || 'empty'}` })
    }
}