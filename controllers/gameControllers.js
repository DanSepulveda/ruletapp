const Game = require('../models/Game')

const gameControllers = {
    addGame: async (req, res) => {
        const { players, winnerColor } = req.body
        const newGame = new Game({
            players,
            winnerColor
        })
        try {
            await newGame.save()
            let populatedGame = await Game.findOne({ _id: newGame._id }).populate({ path: 'players.playerId', model: 'player' })
            res.json({ success: true, response: populatedGame })
        } catch (error) {
            res.json({ success: false, error: error.message })
        }
    },
    getGames: async (req, res) => {
        try {
            const games = await Game.find().populate({ path: 'players.playerId', model: 'player' })
            res.json({ success: true, response: games })
        } catch (error) {
            res.json({ success: false, error: error.message })

        }
    },
}

module.exports = gameControllers