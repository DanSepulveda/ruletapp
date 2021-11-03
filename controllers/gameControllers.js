const Game = require('../models/Game')

const gameControllers = {
    addGame: async (req, res) => {
        const { players, winnerColor } = req.body
        const newGame = new Game({
            players,
            winnerColor
        })
        try {
            newGame.save()
            res.json({ success: true, response: newGame })
        } catch (error) {
            res.json({ success: false, error: error.message })
        }
    },
    getGames: async (req, res) => {
        try {
            const games = await Game.find()
            res.json({ success: true, response: games })
        } catch (error) {
            res.json({ success: false, error: error.message })

        }
    },
}

module.exports = gameControllers