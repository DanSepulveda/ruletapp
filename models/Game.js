const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    players: [{
        playerId: { type: mongoose.Types.ObjectId, ref: "player" },
        bet: { type: Number, required: true },
        winner: { type: Boolean, required: true }
    }],
    winnerColor: { type: String, required: true }
})

const Game = mongoose.model('game', gameSchema)

module.exports = Game