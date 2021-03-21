var stuff = require('../../stuff')
module.exports = {
    name: "tiles",
    category: "Commands",
    run(message) {
        var t = Object.entries(stuff.tiles)
        var o = Object.entries(stuff.objects)
        var m = el => `| ${(`0x${parseInt(el[0]).toString(16).toUpperCase().padStart(8, '0')}`).padEnd(16, ' ')} | ${el[0].toString().padStart(8, '0').padEnd(12, ' ')} | ${(el[1].name).padEnd(18, ' ')} | ${(el[1].collision ?? '?').toString().padEnd(9, ' ')} | ${(el[1].validSpawn ?? '?').toString().padEnd(11, ' ')} | ${(el[1].pushable ?? '?').toString().padEnd(8, ' ')} |`
        message.channel.send({content:             
`
| ID (Hexadecimal) | ID (Decimal) |        Name        | Collision | Valid spawn | Pushable |
|------------------|--------------|--------------------|-----------|-------------|----------|
${t.map(m).join('\n')}
|------------------|--------------|--------------------|-----------|-------------|----------|
${o.map(m).join('\n')}
`,code:true,split:true})
    }
}