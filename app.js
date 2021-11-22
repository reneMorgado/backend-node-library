const express = require('express')
const app = express()
const llave = "Esponja";
const jwt = require ('jsonwebtoken')
const cors = require('cors')
const bcrypt = require('bcryptjs');
const rondasEncriptacion = 10;
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')

const library = require ('./routes/library.js')
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

app.get('/',(req,res)=>{
    res.send('Hello world')
})

app.post('/loginSession', async (req,res) => {
    try {
        const items = await Usuarios.findOne({
            where: {
                Email: req.body.email
            }
        })
        if(items !== null){      
            const result = bcrypt.compareSync(req.body.password, items.dataValues.Password)
            if(result){
                const payload = {
                    check: true
                }
                const token = jwt.sign(payload, llave, {
                    expiresIn: 1440
                });
                res.status(200).send({success: true, message: "Sesion iniciada", token, items})
            }else{
                res.status(200).send({success:false, error: "Las contraseñas no coinciden"});
            }
        }else{
            res.status(500).send({success:false, error: "El usuario no existe"});
        }
    } catch (error) {
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

app.post('/addUser', async(req,res)=>{
    bcrypt.hash(req.body.password, rondasEncriptacion, async (err, hash) => {
        if(err){
            res.status(500).send({success:false, error: "Falla en la encriptacion de la contraseña"});
        }else{
            try{
                const items = await Usuarios.findOne({
                    where: {
                        Email: req.body.email
                    }
                })
                if(items !== null){  
                    res.status(200).send({success: false, message: "El usuario ya existe"})
                }else{
                    const created = await Usuarios.create({
                        Nombre: req.body.nombre,
                        Apellido: req.body.apellido,
                        Edad: req.body.edad,
                        Email: req.body.email,
                        Password: hash,
                        Administrador: req.body.administrador
                    })
                    const payload = {
                        check: true
                    }
                    const token = jwt.sign(payload, llave, {
                        expiresIn: 1440
                    });
                    res.status(200).send({success: true, token, created})
                }
            }catch(error){
                let e = error.toString()
                res.status(500).send({success:false, error: e})
                console.log(e)
            }
        }
    })
})

app.listen(port, ()=>{
    console.log('App corriendo en el puerto ' + port);
    connectDB()
    createTable()
})
