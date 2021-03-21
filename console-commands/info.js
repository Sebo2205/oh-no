var { resolve } = require('path')
module.exports = {
    name: "info",
    run(client, args) {
        delete require.cache[resolve('./package.json')]
        var package = require(resolve('./package.json'))
        console.log(`oh no v${package.version}`)
    }
}