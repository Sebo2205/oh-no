const JsonDB = require('node-json-db')
module.exports = {
    db: new JsonDB.JsonDB('userdata.js', true),
    items: {},
    addMoney(user, amount) {
        this.db.push(`/${user}/money`, this.getMoney(user) + amount)
    },
    getMoney(user) {
        return this.db.getData(`/${user}/money`) || 0;
    },
}