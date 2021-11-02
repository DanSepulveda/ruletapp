const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
    username: { type: String, required: true },
    image: { type: String, required: true },
    admin: { type: Boolean, default: false },
    cash: { type: Number, default: 10000 }
})

const Player = mongoose.model('player', playerSchema)

module.exports = Player