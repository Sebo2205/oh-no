var c = require('child_process')
module.exports = {
    name: "restart",
    category: "Debug",
    onlyFor: ['602651056320675840'],
    async run(message) {
        await message.channel.send(`Restarting...`)
        c.exec(`start start.bat`, () => {})
        setTimeout(() => process.exit(0), 2500)
    }
}