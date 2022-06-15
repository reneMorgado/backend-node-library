const express = require ('express');
const llave = "Esponja";
const jwt = require ('jsonwebtoken')
const bcrypt = require('bcryptjs');
const rondasEncriptacion = 10;
const Router = express.Router();

const {Libros, Autores, Generos, Editoriales, Idiomas, Usuarios, Rentas} = require('../models/Library')

Router.post('/loginSession', async (req,res) => {
    try {
        const items = await Usuarios.sequelize.query('DECLARE @Email VARCHAR(100) EXEC getUserByEmail @Email=:email',{ replacements: { email: req.body.email }, type: Usuarios.sequelize.QueryTypes.EXEC })
        const [result] = items
        const [user] = result
        if(result.length > 0){
            const passed = bcrypt.compareSync(req.body.password, user.Password)
            if(passed){
                const payload = {
                    isAdmin: user.Administrador
                }
                const token = jwt.sign(payload, llave);
                res.status(200).send({success: true, message: "Sesion iniciada", token, items:result})
            }else{
                res.status(200).send({success:false, error: "Las contraseñas no coinciden"});
            }
        }else{
            res.status(200).send({success: false, message: "El usuario no existe"})
        }
    } catch (error) {
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.post('/addUser', async(req,res)=>{
    bcrypt.hash(req.body.password, rondasEncriptacion, async (err, hash) => {
        if(err){
            res.status(500).send({success:false, error: "Falla en la encriptacion de la contraseña"});
        }else{
            try{
                const items = await Usuarios.sequelize.query('DECLARE @Email VARCHAR(100) EXEC getUserByEmail @Email=:email',{ replacements: { email: req.body.email }, type: Usuarios.sequelize.QueryTypes.EXEC })
                const [result] = items
                if(result.length > 0){  
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
                        isAdmin: created.dataValues.Administrador
                    }
                    const token = jwt.sign(payload, llave);
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

module.exports = Router