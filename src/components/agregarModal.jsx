function AgregarModal({nuevaMision, setNuevaMision, funcionAgregarMision, funcionCerrarModal}) {
    return(
        <div className="agregar-modal">
            <div className="agregar-modal-bar">
                <h2>Agregar Misión</h2>
                <button onClick={funcionCerrarModal}>X</button>
            </div>
            <div className="form">
                <input type="text" placeholder="Nombre de la misión" value={nuevaMision.nombre} onChange={(e) => (setNuevaMision({...nuevaMision, nombre: e.target.value}))} />
                <input type="text" placeholder="Descripción de la misión" value={nuevaMision.descripcion} onChange={(e) => (setNuevaMision({...nuevaMision, descripcion: e.target.value}))} />
                <input type="text" placeholder="Dificultad de la misión" value={nuevaMision.dificultad} onChange={(e) => (setNuevaMision({...nuevaMision, dificultad: e.target.value}))} />
                <button onClick={() => funcionAgregarMision()}>Agregar</button>
            </div>

        </div>
    )
}

export default AgregarModal