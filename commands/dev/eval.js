module.exports = {
    name: 'eval',
    onlyFor: ['602651056320675840'],
    category: "Dev",
    run(message, args) {
        var o = eval(args.join(' '))
        message.channel.send({content: o + '', code: 'js', split: true})
    }
}