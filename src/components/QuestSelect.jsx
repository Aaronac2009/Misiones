function QuestSelect({mision, onCargarMision}){
    const id = mision.id
    return(
        <button onClick={(e) => onCargarMision(id)} className="quest"> 
            <h2 className="quest-title">{mision.nombre}</h2>
            <p className="quest-paragraph">{mision.descripcion}</p>
        </button>
    )
}

export default QuestSelect