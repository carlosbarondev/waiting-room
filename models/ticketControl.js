const path = require('path');
const fs = require('fs');

class ticketControl {

    constructor() {
        this.last = 0;
        this.today = new Date().getDate();
        this.pending = [];
        this.last4 = [];

        this.init();
    }

    get toJson() {
        return {
            last: this.last,
            today: this.today,
            pending: this.pending,
            last4: this.last4
        }
    }

    init() {
        const { last, today, pending, last4 } = require('../db/data.json');
        if (today === this.today) { // El día del archivo data coincide con el día de hoy
            this.pending = pending;
            this.last = last;
            this.last4 = last4;
        } else { // El día del archivo data NO coincide con el día de hoy (es otro día)
            this.saveDB(); // Resetea el archivo data
        }
    }

    saveDB() {
        const dbPath = path.join(__dirname, '../db/data.json');
        fs.writeFileSync(dbPath, JSON.stringify(this.toJson));
    }

}

module.exports = ticketControl;