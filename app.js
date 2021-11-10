const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')

const tasks = require ('./routes/tasks')
const {connectDB, sequelize} = require('./database')
const Task = require('./models/task')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send('Hello world')
})

app.use('/tasks', tasks)

const createTable = async () => {
    await Task.sync()
}

app.listen(port, ()=>{
    console.log('App corriendo en el puerto ' + port);
    connectDB()
    createTable()
})
