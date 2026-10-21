import { useState } from "react"

function EditarModal({mision, funcionEditarMision, funcionCerrarModal}) {
    const [misionEditada, setMisionEditada] = useState({id:mision.id, nombre:mision.nombre, descripcion:mision.descripcion, estado:mision.estado, dificultad:mision.dificultad})
    return(
        <div className="agregar-modal">
            <div className="agregar-modal-bar">
                <h2>Editar Misión</h2>
                <button onClick={funcionCerrarModal}>X</button>
            </div>
            <div className="form">
                <input type="text" placeholder="Nombre de la misión" value={misionEditada.nombre} onChange={(e) =>setMisionEditada({...misionEditada, nombre:e.target.value})} />
                <input type="text" placeholder="Descripción de la misión" value={misionEditada.descripcion} onChange={(e) =>setMisionEditada({...misionEditada, descripcion:e.target.value})} />
                <input type="text" placeholder="Dificultad de la misión" value={misionEditada.dificultad} onChange={(e) =>setMisionEditada({...misionEditada, dificultad:e.target.value})}/>
                <button onClick={() => funcionEditarMision(mision.id, misionEditada)}>Editar</button>
            </div>
        </div>
    )
}

export default EditarModal