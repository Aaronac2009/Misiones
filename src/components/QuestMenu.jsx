import logo from "../assets/Imagen mision generica.jpg"

function QuestMenu({mision, onEliminar, onEditar, onCompletar, onDescompletar}){
    return(
        <div className="QuestMenu">
            <div className="logo">
                <img src={logo} />
            </div>
            <div className="quest-text">
                <div className="buttons">
                    {mision.estado !== "completada" ? 
                        <button className="completar" onClick={() => onCompletar(mision.id)}>Completar</button>:
                        <button className="completar" onClick={() => onDescompletar(mision.id)}>Descompletar</button>
                    }
                    <button className="completar" onClick={() => onEditar(mision.id)}>Editar</button>
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