const express = require('express')
const playerControllers = require('../controllers/playerController')


const router = express.Router()

//PLAYERS
router.route('/users')
    .post(playerControllers.addNewPlayer)
    .get(playerControllers.getUsers)

router.route('/user/:id')
    .delete(playerControllers.deleteUser)

//GAMES


module.exports = router
