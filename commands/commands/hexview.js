var fetch = require('node-fetch');
const stuff = require('../../stuff');
module.exports = {
    name: "hexview",
    category: "Commands",
    async run(message, args) {
        var a = message.attachments.first();
        if (!a) return message.channel.send(`no`)
        if (a.size > 4096) return message.channel.send(`no but filesize (${stuff.format(a.size, stuff.filesize)} > ${stuff.format(4096, stuff.filesize)})`)
        var res = await fetch(a.url)
        if (res.ok) {
            var buffer = await res.buffer()
            var str = '           | '
            var bytesPerLine = 16;
            var coolCounter = 0;
            for (var i = 0; i < bytesPerLine; i++) {
                str += i.toString(16).padStart(2, '0').toUpperCase() + ' '
            }
            str += `\n${'-'.repeat(bytesPerLine * 3 + 12)}\n`
            for (var i = 0; i < buffer.length; i++) {
                if (coolCounter == 0) str += `0x${i.toString(16).padStart(8, '0').toUpperCase()} | `
                str += buffer[i].toString(16).padStart(2, '0').toUpperCase() + ' '
                coolCounter++;
                if (coolCounter >= bytesPerLine) {str += '\n';coolCounter = 0}
            }
            message.channel.send({content: str, code: true, split: true})
        } else message.channel.send(`no but delayed`)
    }
}