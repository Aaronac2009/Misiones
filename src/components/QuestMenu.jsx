import logo from "../assets/Imagen mision generica.jpg"

function QuestMenu({mision, onEliminar}){
    return(
        <div className="QuestMenu">
            <div className="logo">
                <img src={logo} />
            </div>
            <div className="quest-text">
                <div className="buttons">
                    <button className="completar">Editar</button>
                    <button className="eliminar" onClick={() => onEliminar(mision.id)}>Eliminar</button>
                </div>
                <h2 className="quest-title">{mision.nombre}</h2>
                <p className="quest-paragraph">{mision.descripcion}</p>
                <p className="quest-state">{mision.estado}</p>
                <p className="quest-difficulty">{mision.dificultad}</p>
            </div>

        </div>
    )
}

export default QuestMenu