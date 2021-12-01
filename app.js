const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000

const bodyParser = require('body-parser')

const library = require ('./routes/library.js')
const auth = require ('./routes/authRoutes')

const {connectDB} = require('./database')
const {Libros, Autores, Generos, Editoriales, Idiomas, Usuarios, Rentas} = require('./models/Library.js')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

const createTable = async () => {
    await Autores.sync()
    await Generos.sync()
    await Editoriales.sync()
    await Idiomas.sync()
    await Libros.sync()
    await Usuarios.sync()
    await Rentas.sync()
}

app.use('/library', library)
app.use('/', auth)

app.listen(port, ()=>{
    console.log('App corriendo en el puerto ' + port);
    connectDB()
    createTable()
})
