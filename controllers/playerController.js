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
            console.log(players)
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
    }
}

module.exports = playerControllers