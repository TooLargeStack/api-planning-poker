
OPTIONS = {
    cors: {
        origin: [
			'http://localhost:3000',
			'http://localhost:5000',
			'*',
			'https://toolargestack.github.io/planning-poker-client/',
			'https://toolargestack.github.io/'
		],
        credentials: true,
    }
}

const SessionController = {

    cards: {},

    connect(server) {
        try {
            const io = require("socket.io")(server, OPTIONS);
            console.log('connecting')
            io.on('connection', socket => {
                console.log(`Session started, socket: ${socket.id}`)
                this.onChooseCard(socket)
                this.showAllPickedCards(socket)
                this.onDisconnect(socket)
            })
        } catch (e) {
            console.log(`Error: ${e}`)
        }
    },

    showAllPickedCards(socket) {
        console.log('Emit all cards')
        socket.emit('showAllPickedCards', this.cards)
    },

    onDisconnect(socket) {
        socket.on('disconnect', function() {
            console.log('Client disconnected.');
        });
    },

    onChooseCard(socket) {
        socket.on('choose', ({ username, value }) => {
            console.log('Choosen card received: ', { username, value })
            this.cards[username] = value
            socket.broadcast.emit('pickedCard', this.cards)
        })
    }
}

module.exports = SessionController
