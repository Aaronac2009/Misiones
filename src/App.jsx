import { useState, useEffect } from 'react'
import './App.css'

// Componentes
import AgregarModal from './components/agregarModal'
import QuestBar from './components/QuestBar'
import QuestMenu from './components/QuestMenu'

//App
function App() {
  // Se obtiene desde el backend
  const [misiones, setMisiones] = useState([])

  // Constante para Enviar Mision
  const [nuevaMision, setNuevaMision] = useState({ id: null, nombre: "", descripcion: "", estado: "", dificultad: "" })

  // Identifica la ID de la mision que se va a eliminar
  const [misionEliminada, setMisionEliminada] = useState("")


  // Identifican la ID de una mision que va a cambiar de estado
  const [misionCompletada, setMisionCompletada] = useState("")
  const [misionDescompletada, setMisionDescompletada] = useState("")

  // No hace falta decir que hace
  const [misionMostrar, setMisionMostrar] = useState(0)

  // Modals estado
  const [modalAgregarVisible, setAgregarModalVisible] = useState(false)

  // Obtiene el JSON con las misiones en formato js
  async function fetchMisiones() {

    try {
      const respuesta = await fetch("http://localhost:3000/API/misiones")
      if (!respuesta.ok) {
        throw new Error(`Error al obtener las misiones: ${respuesta.status}`)
      }
      const data = await respuesta.json()

      setTimeout(() => {
        setMisiones(data)
      }, 0)
    }
    catch (error) {
      console.log(error)
      setTimeout(() => {
        setMisiones([])
      }, 0)
    }
  }

  async function enviarMision() {
    try {
      const id = misiones.length > 0 ? misiones[misiones.length-1].id + 1 : 0
      const respuesta = await fetch("http://localhost:3000/API/misiones", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ 
          id: id, 
          nombre: nuevaMision.nombre,
          descripcion: nuevaMision.descripcion, 
          estado: "pendiente", 
          dificultad: nuevaMision.dificultad })
      })
      if (!respuesta.ok) {
        throw new Error(`Error al enviar la misión: ${respuesta.status}`)
      }
      const data = await respuesta.json()
      setMisiones([...misiones, data])
      setNuevaMision({ id: null, nombre: "", descripcion: "", estado: "", dificultad: "" })
      setAgregarModalVisible(false)
    }
    catch (error) {
      console.log(error)
    }
  }

  async function eliminarMision(id) {
    try {
      const respuesta = await fetch(`http://localhost:3000/API/misiones/${id}`, {
        method: "DELETE"
      })

      if (!respuesta.ok) {
        throw new Error(`Error al eliminar la misión: ${respuesta.status}`)
      }
      const datos = await respuesta.json()
      setMisiones(datos)
    }
    catch (error) {
      console.log(error)
    }
  }

  async function completarMision(id) {
    try {
      const respuesta = await fetch(`http://localhost:3000/API/misiones/completar/${id}`, {
        method: "PUT"
      })
      if (!respuesta.ok) {
        throw new Error(`Error al completar la misión: ${respuesta.status}`)
      }
      const datos = await respuesta.json()
      setMisiones(datos)
    }
    catch (error) {
      console.log(error)
    }
  }

  async function descompletarMision(id) {
    try {
      const respuesta = await fetch(`http://localhost:3000/API/misiones/descompletar/${id}`, {
        method: "PUT"
      })
      if (!respuesta.ok) {
        throw new Error(`Error al completar la misión: ${respuesta.status}`)
      }
      const datos = await respuesta.json()
      setMisiones(datos)
    }
    catch (error) {
      console.log(error)
    }
  }


  function cargarMision(id) {
    setMisionMostrar(id)
  }


  // Actualiza la lista de misiones al cargar el componente

  useEffect(() => { fetchMisiones() }, [])

  // Renderizado de prueba antes de implementar la interfaz completa
  return (
    <div className="app">
      <div className="header">
        <h1>QuestLog</h1>
        <p> Mision:  {misionMostrar}</p>
        <div className="linea"></div>
        <p>Gestion en tiempo real de misiones</p>
      </div>
      <div className="main">
        <div className="superior">
          <button onClick="">FILTRO 1</button>
          <button onClick="">FILTRO 2</button>
          <button onClick="">FILTRO 3</button>
          <div className="linea-superior"></div>
        </div>

        <div className="inferior">
          <div className="inferior-izquierda">
            <QuestBar misiones={misiones} onCargarMision={cargarMision}></QuestBar>
          </div>
          <div className="inferior-derecha">
            {misiones.findIndex(mision => mision.id === misionMostrar) !== -1 ?
              <QuestMenu
                mision={misiones[misiones.findIndex(mision => mision.id === misionMostrar)]}
                onEliminar={eliminarMision}>
              </QuestMenu> : null}
            <div className="boton-agregar">
              <button button className='agregar' onClick={() => setAgregarModalVisible(true)}>Agregar</button>
            </div>
          </div>


        </div>

      </div>
      {modalAgregarVisible ?
        <AgregarModal className="modal-agregar"
          nuevaMision={nuevaMision}
          setNuevaMision={setNuevaMision}
          funcionAgregarMision={enviarMision}
          funcionCerrarModal={() => setAgregarModalVisible(false)}>
        </AgregarModal> : null}

    </div>
  )


}
export default App
