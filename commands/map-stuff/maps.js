var fs = require('fs')
const stuff = require('../../stuff')
module.exports = {
    name: 'maps',
    category: "Map Manægment",
    run(message) {
        var files = fs.readdirSync('maps')
        var h = `>>> \`\`\`File name                         Map name                          File size  \n\n${files.map(el => {
            if (fs.statSync(`maps/${el}`).isDirectory()) {
                var stats = fs.statSync(`maps/${el}/data.json`)
                var name = fs.readFileSync(`maps/${el}/name.txt`, 'utf8')
                var size = stats.size + fs.statSync(`maps/${el}/map.fuc`).size
                return `${el.padEnd(32, ' ')}  ${name.padEnd(32, ' ')}  ${stuff.format(size, stuff.filesize).padStart(9, ' ')}`
            } else {
                var size = fs.statSync(`maps/${el}`).size
                return `${el.padEnd(32, ' ')}  ${(`Unknown, requires conversion`).padEnd(32, ' ')}  ${stuff.format(size, stuff.filesize).padStart(9, ' ')}` 
            }
        }).join('\n')}\`\`\``
        message.channel.send({content: h || 'empty', split: true})
    },
}