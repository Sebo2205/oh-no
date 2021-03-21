var fs = require('fs')
const stuff = require('../../stuff')
module.exports = {
    name: "mapinfo",
    category: "Map Manægment",
    async run(message, args) {
        var filename = args.join(" ")
        if (!fs.existsSync(`maps/${filename}`)) return message.channel.send(`no`)
        var msg = await message.channel.send({content:`Getting map info: Reading files`, code:true})
        var data = await fs.promises.readFile(`maps/${filename}/data.json`, 'utf8')
        var stats = fs.statSync(`maps/${filename}/data.json`)
        var d = await fs.promises.readFile(`maps/${filename}/map.fuc`)
        var width = (d[1]<<8) | d[0]
        var height = (d[3]<<8) | d[2]
        var t = stats.birthtime
        await msg.edit({content:`Getting map info: Parsing data JSON`,code:true})
        var info = JSON.parse(data)
        await msg.edit({content: '',embed:
{title: "Map info",description:
`\`\`\`
Map name        ${(fs.readFileSync(`maps/${filename}/name.txt`, 'utf8') || `Name not found`).padStart(42, ' ')} 
Data file size  ${stuff.format(stats.size, stuff.filesize).padStart(42, ' ')}
Tiles file size ${stuff.format(fs.statSync(`maps/${filename}/map.fuc`).size, stuff.filesize).padStart(42, ' ')} 
Map size        ${(`${width}x${height}`).padStart(42, ' ')} 
Creation time   ${(`${t.getHours().toString().padStart(2, '0')}:${t.getMinutes().toString().padStart(2, '0')} ${t.getDate()}/${t.getMonth()}/${t.getFullYear()}`).padStart(42, ' ')} 
\`\`\``}})
    }
}