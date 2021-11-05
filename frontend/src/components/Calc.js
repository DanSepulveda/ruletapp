export const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const getColor = () => {
    let number = randomNumber(1, 100)
    let chosenColor = ''
    if (number <= 2) {
        chosenColor = 'Verde'
    } else if (number <= 51) {
        chosenColor = 'Rojo'
    } else {
        chosenColor = 'Negro'
    }
    return chosenColor
}

export const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
})

export const percentPerColor = (games, color) => {
    let qty = games.filter(game => game.winnerColor === color).length
    let percentage = (qty * 100) / games.length
    percentage = percentage.toFixed(2)
    return percentage
}