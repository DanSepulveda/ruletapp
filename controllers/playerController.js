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
            if (user) throw new Error('Ya existe el usuario.')
            newPlayer.save()
            res.json({ success: true })
        } catch (e) {
            res.json({ success: false, error: e.message })
        }

    }
}

module.exports = playerControllers