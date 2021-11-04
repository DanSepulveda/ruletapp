const PlayerImage = ({ picture, player, setNewPlayer, editMode, user }) => {
    const handler = () => {
        setNewPlayer({
            ...player,
            image: `/assets/${picture}.png`
        })
    }
    // const nameClass = player.image?.includes(picture) ? "picture selected" : "picture"

    let nameClass
    if ((editMode && user?.image.includes(picture)) || player?.image?.includes(picture)) {
        nameClass = "picture selected"
    } else {
        nameClass = "picture"
    }

    return (
        <div onClick={handler} className={nameClass} style={{ backgroundImage: `url('/assets/${picture}.png')` }}></div>
    )
}

export default PlayerImage