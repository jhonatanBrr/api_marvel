import express from "express"
import cors from "cors"
import rutasPersonajes from './routes/personajes.routes.js'
import rutasVehiculos from './routes/vehiculos.routes.js'
import rutasCondiciones from './routes/condiciones.routes.js'
import rutasGrupos from './routes/grupos.routes.js'
import rutasPoderes from './routes/poderes.routes.js'

import {PORT} from './config.js'

const app  = express()

app.use(cors())

app.use(express.json())

app.use(rutasPersonajes)
app.use(rutasVehiculos)
app.use(rutasCondiciones)
app.use(rutasGrupos)
app.use(rutasPoderes)

app.listen(PORT)
console.log('corriendo servidor', PORT)


