const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')

const library = require ('./routes/library.js')
const {connectDB} = require('./database')
const {Libros, Autores, Generos, Editoriales} = require('./models/Library.js')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send('Hello world')
})

app.use('/library', library)

const createTable = async () => {
    await Autores.sync()
    await Generos.sync()
    await Editoriales.sync()
    await Libros.sync()
}

app.listen(port, ()=>{
    console.log('App corriendo en el puerto ' + port);
    connectDB()
    createTable()
})
