const Player = require('../models/Player')

const playerControllers = {
    addNewPlayer: async (req, res) => {
        const { username, image } = req.body
        const newPlayer = new Player({
            username,
            image
        })
        try {
            let user = await Player.findOne({ username })
            if (user) throw new Error('Ya existe el usuario. Seleccione otro nombre.')
            newPlayer.save()
            res.json({ success: true, response: newPlayer })
        } catch (error) {
            res.json({ success: false, error: error.message })
        }

    },
    getUsers: async (req, res) => {
        try {
            const players = await Player.find()
            res.json({ success: true, response: players })
        } catch (error) {
            res.json({ success: false, error: error.message })

        }
    },
    deleteUser: async (req, res) => {
        try {
            await Player.findOneAndDelete({ _id: req.params.id })
            res.json({ success: true })
        } catch (error) {
            res.json({ success: false, error: error.message })
        }
    },
    editPlayer: async (req, res) => {
        try {
            let user = await Player.findOneAndUpdate(
                { _id: req.params.id },
                { ...req.body },
                { new: true }
            )
            res.json({ success: true, response: user })
        } catch (error) {
            res.json({ success: false, error: error.message })
        }
    },
    addCash: async (req, res) => {
        try {
            let players = await Player.find()
            let updatedPlayers = []
            const updateCash = async (player) => {
                let newCash = player.cash + 10000
                let changes = player.cash === 0 ? { cash: newCash, active: true } : { cash: newCash }
                let updatedPlayer = await Player.findOneAndUpdate(
                    { _id: player._id },
                    { ...changes },
                    { new: true }
                )
                return updatedPlayer
            }
            for (const player of players) {
                const singlePlayer = await updateCash(player)
                updatedPlayers.push(singlePlayer)
            }
            res.json({ success: true, response: updatedPlayers });
        } catch (error) {
            res.json({ success: false, error: error.message });
        }
    }
}

module.exports = playerControllers