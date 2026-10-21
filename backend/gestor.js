import express from "express"
import cors from "cors"
import {writeFile, readFile} from "node:fs/promises"
import path from "path"
import { fileURLToPath } from "url";
import { parse } from "path";

// Configuración de la ruta del archivo JSON
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 
const archivoMisiones = path.join(__dirname, "misiones.json");

// Configuración del servidor
const app = express();
app.use(cors());
app.use(express.json());

let misiones = JSON.parse(await readFile(archivoMisiones, "utf-8"));


async function guardarMisiones() {
    await writeFile(archivoMisiones, JSON.stringify(misiones, null, 2), "utf-8")
}
// Obtiene la lista completa de misiones
app.get("/API/misiones", (req, res) => {
    res.json(misiones);
    console.log("Se ha solicitado la lista completa de misiones");
});

// Mete datos al json
app.post("/API/misiones", async (req, res) => {
    console.log("Se ha recibido una solicitud para agregar una nueva misión");
    const nuevaMision = req.body;

    // Verificaciones por etica
    if(!nuevaMision.nombre || !nuevaMision.descripcion){
        console.log("Debe tener nombre y descripcion")
        return res.status(400).json({error:"Debe tener nombre y descripcion"})
        
    }

    if(misiones.findIndex(mision => mision.id === nuevaMision.id) !== -1){
        console.log("ERROR: ID duplicada")
        return res.status(400).json({error:"ERROR: ID duplicada"})
    }

    // Lo mete en la lista de tareas, pero aun no al json
    misiones.push(nuevaMision);
    await guardarMisiones();
    res.status(201).json(nuevaMision);
    console.log(`Se ha agregado una nueva misión: ${JSON.stringify(nuevaMision)}`);
})

app.delete("/API/misiones/:id", async (req, res) => {
    try{
        console.log("Se ha recibido una solicitud para eliminar una misión");
        const id = req.params.id;
        const index = misiones.findIndex(mision => mision.id === parseInt(id));
        if (index === -1){
            console.log(`No se encontró la misión con id: ${id}`);
            return res.status(404).json({ error: "Misión no encontrada" });
        }
        misiones.splice(index, 1);
        await guardarMisiones();
        res.json(misiones);
        console.log(`Se ha eliminado la misión con id: ${id}`);
    }
    catch(error){
        
        console.log(error)
        return res.status(500).json({error:"Error interno del servidor"})
    }
})

app.put("/API/misiones/:id", async (req,res) =>{
    try{
        console.log("Se ha recibido una solicitud para editar una mision")
        const id = parseInt(req.params.id)
        const tareaEditar = req.body
        
        if(misiones.findIndex(mision=> mision.id === id) === -1){
            return res.status(400).json({error:"ID No encontrada"})
        }

        misiones[misiones.findIndex(mision => mision.id===id)] = tareaEditar
        await guardarMisiones()
        res.json(misiones);
    }
    catch{
        console.log(error)
        return res.status(500).json({error:"Error interno del servidor"})
    }
})


app.patch("/API/misiones/completar/:id", async (req, res) => {
    try{
        console.log("Se ha recibido una solicitud para completar una misión");
        const id =  parseInt(req.params.id);

        // Verufica si la id para editar existe
        if(misiones.findIndex(mision=> mision.id === id) === -1){
            return res.status(400).json({error:"ID No encontrada"})
        }

        // Modifica una mision para que cambie de estado
        misiones = misiones.map(mision => {
            if(mision.ID === parseInt(id)){
                return {...mision, estado: "completada"}
            }
            return mision
        })
        await guardarMisiones();
        res.json(misiones);
    }
    catch(error){
        console.log(error)
        return res.status(500).json({error:"Error interno del servidor"})
    }
})

app.patch("/API/misiones/descompletar/:id", async (req, res) => {
    try{
        console.log("Se ha recibido una solicitud para descompletar una misión");
        const id =  parseInt(req.params.id);

        // Verufica si la id para editar existe
        if(misiones.findIndex(mision=> mision.id === id) === -1){
            return res.status(400).json({error:"ID No encontrada"})
        }

        // Modifica una mision para cambiar su estado
        misiones = misiones.map(mision => {
            if(mision.ID === parseInt(id)){
                return {...mision, estado: "pendiente"}
            }
            return mision
        })
        await guardarMisiones();
        res.json(misiones);
    }
    catch(error){
        console.log(error)
    }
})


// Prueba de conexion
app.listen(3000, () => {
    console.log("Servidor escuchando en el puerto 3000");
});