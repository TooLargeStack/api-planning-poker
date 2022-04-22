
class SessionController {
    constructor(server) {
        this.session = require('socket.io')(server);
        this.cards = null
    }

    connect() {
        this.session.on('connection', (socket) => {
            console.log(`Session started, socket: ${socket.id}`)
            this.onChooseCard(socket)
            this.showAllPickedCards(socket)
        })
    }

    showAllPickedCards(socket) {
        socket.emit('showAllPickedCards', this.cards)
    }

    onChooseCard(socket) {
        socket.on('choose', card => {
            cards.append(card)
            socket.broadcast.emit('pickedCard', card)
        })
    }
}

module.exports = SessionController
