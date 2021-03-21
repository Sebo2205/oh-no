const fetch = require('node-fetch');
const JsonDB = require('node-json-db')
module.exports = {
    db: new JsonDB.JsonDB('userdata', true),
    items: {},
    addMoney(user, amount) {
        this.db.push(`/${user}/money`, this.getMoney(user) + amount)
    },
    getMoney(user) {
        return this.db.getData(`/${user}/money`) || 0;
    },
    addBankMoney(user, amount) {
        this.db.push(`/${user}/bank`, this.getBankMoney(user) + amount)
    },
    getBankMoney(user) {
        return this.db.getData(`/${user}/bank`) || 0;
    },
    getItems(user) {
        return this.db.getData(`/${user}/items`)
    },
    removeItems(user, slots) {
        var items = this.db.getData(`/${user}/items`)
        for (const slot of slots) {
            items[slot] = undefined;
        }
        this.db.push(`/${user}/items`, items.filter(el => el))
    },
    filesize: [
        { suffix: " B", min: 0, unchanged: true },
        { suffix: " KiB", min: 1024 },
        { suffix: " MiB", min: 1024 * 1024 },
        { suffix: " GiB", min: 1024 * 1024 * 1024 },
    ],
    number: [
        { suffix: "", min: 0, unchanged: true },
        { suffix: " K", min: 1000 },
        { suffix: " M", min: 1000000 }
    ],
    format(value, options) {
        if (typeof value != 'number' || isNaN(value)) return `invalid number`
        try {
            var f = options[0]
            for (const _f of options) {
                if (value >= _f.min) f = _f;
            }
            if (!f.unchanged) value /= f.min
            return `${value.toFixed(1)}${f.suffix}`
        } catch (err) {
            return value + ""
        }
    },
    async hastebin(str = '') {
        var res = await fetch(`https://hastebin.com/documents`, {
            body: str,
            method: "POST",
            headers: { "Content-Type": "text/plain" }
        })
        if (!res.ok) throw res.statusText
        var data = await res.json()
        //console.log(data.key)
    }
}