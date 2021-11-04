const Game = require('../models/Game')
const Player = require('../models/Player')

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
            const updateUser = async (player) => {
                let changes = player.newCash === 0 ? { cash: player.newCash, active: false } : { cash: player.newCash }
                await Player.findOneAndUpdate(
                    { _id: player.playerId },
                    { ...changes }
                )
            }
            players.map(player => updateUser(player))
            let updatedPlayers = await Player.find()
            res.json({ success: true, response: { game: populatedGame, players: updatedPlayers } })
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