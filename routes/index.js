const express = require('express')
const playerControllers = require('../controllers/playerControllers')
const gameControllers = require('../controllers/gameControllers')


const router = express.Router()

//PLAYERS
router.route('/users')
    .post(playerControllers.addNewPlayer)
    .get(playerControllers.getUsers)
    .put(playerControllers.addCash)

router.route('/user/:id')
    .delete(playerControllers.deleteUser)
    .put(playerControllers.editPlayer)

//GAMES
router.route('/games')
    .post(gameControllers.addGame)
    .get(gameControllers.getGames)



module.exports = router
