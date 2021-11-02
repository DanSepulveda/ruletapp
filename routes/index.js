const express = require('express')
const playerControllers = require('../controllers/playerController')


const router = express.Router()

//PLAYERS
router.route('/newuser')
    .post(playerControllers.addNewPlayer)


//GAMES


module.exports = router
