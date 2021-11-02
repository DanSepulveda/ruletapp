const PlayerImage = ({ picture, player, setNewPlayer }) => {
    const handler = () => {
        setNewPlayer({
            ...player,
            image: `/assets/${picture}.png`
        })
    }

    const nameClass = player.image?.includes(picture) ? "picture selected" : "picture"

    return (
        <div onClick={handler} className={nameClass} style={{ backgroundImage: `url('/assets/${picture}.png')` }}></div>
    )
}

export default PlayerImage