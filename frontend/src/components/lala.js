const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const getColor = () => {
    let number = randomNumber(1, 100)
    let chosenColor = ''
    if (number <= 2) {
        chosenColor = 'green'
    } else if (number <= 51) {
        chosenColor = 'red'
    } else {
        chosenColor = 'black'
    }
    return chosenColor
}

const bet = (user, winnerColor) => {
    let betCash = user.cash >= 1000 ? conservativeBet ? randomNumber(3, 7) * user.cash : randomNumber(8, 15) : user.cash
    let betColor = getColor()
    if (betColor === winnerColor) {
        setNewGame({
            winnerColor,
            players: [...newGame.players, { playerId: user._id, bet: betCash, winner: true }]
        })
    } else {
        setNewGame({
            winnerColor,
            players: [...newGame.players, { playerId: user._id, bet: betCash, winner: false }]
        })
    }
}

useEffect(() => {
    if (time === 0) {
        // let chosenColor = getColor()
        // players.map(player => bet(player, chosenColor))
        // createGame()
        setReload(!reload)
    }
}, [time])

const [conservativeBet, setConservativeBet] = useState(false)
const [newGame, setNewGame] = useState({
    players: [],
    winnerColor: ''
})



const getGames = async () => {
    try {
        let response = await axios.get('http://localhost:4000/api/games')
        if (response.data.success) {
            setGames(response.data.response)
        } else {
            message('error', response.data.error)
        }
    } catch (error) {
        message('error', error.message)
    }
    setLoader(false)
}