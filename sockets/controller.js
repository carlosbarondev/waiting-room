const TicketControl = require("../models/ticketControl");

const ticketControl = new TicketControl();

const socketController = (socket) => {

    socket.emit('last-ticket', ticketControl.last);

    socket.on('next-ticket', (payload, callback) => {
        const next = ticketControl.next();
        callback(next);
    });

    socket.on('attend-ticket', (payload, callback) => {

        if (!payload.desktop) {
            return callback({
                ok: false,
                msg: 'El escritorio es obligatorio'
            })
        }

        const ticket = ticketControl.attendTicket(payload.desktop);
        if (!ticket) {
            callback({
                ok: false,
                msg: 'No hay tickets pendientes'
            });
        } else {
            callback({
                ok: true,
                ticket
            });
        }

    });

}

module.exports = {
    socketController
}