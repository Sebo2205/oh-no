var vm2 = require('vm2')
const stuff = require('../../stuff')
module.exports = {
    name: 'eval',
    onlyFor: ['602651056320675840'],
    category: "Debug",
    run(message, args) {
        var context = {
            message,
            stuff,
            require(str) {
                return require(str)
            },
            client: message.client,
        }
        var vm = new vm2.VM({sandbox:context})
        var o = vm.run(args.join(' '))
        
        message.channel.send({content: o + '', code: 'js', split: true})
    }
}