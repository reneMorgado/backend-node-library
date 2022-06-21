const express = require ('express');
const decript = require('jwt-decode')
const Router = express.Router();
 
const {Autores} = require('../models/Library.js');

Router.get('/getAuthors', async(req,res)=>{
    try {
        const items = await Autores.sequelize.query('EXEC getAuthors', { type: Autores.sequelize.QueryTypes.EXEC })
        const [results] = items
        res.status(200).send({success: true, items: results})
    } catch (error) {
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.get('/getAuthorsName/:id', async(req,res)=>{
    try {
        const items = await Autores.sequelize.query('DECLARE @Id_Autor INT EXEC getAuthorById @Id_Autor=:id',{ replacements: { id: req.params.id }, type: Autores.sequelize.QueryTypes.EXEC })
        const [results] = items
        res.status(200).send({success: true, items:results})
    } catch (error) {
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.post('/addAuthor', async(req,res)=>{
    const payload = decript(req.headers['access-token'])
    if(payload.isAdmin){
        try{
            const items = await Autores.sequelize.query('DECLARE @Nombre_Autor VARCHAR(50), @Apellido_Autor VARCHAR(50) EXEC getAuthorByName @Nombre_Autor=:nombre, @Apellido_Autor=:apellido',{ replacements: { nombre: req.body.nombre, apellido: req.body.apellido }, type: Autores.sequelize.QueryTypes.EXEC })
            const [result] = items
            if(result.length > 0){
                res.status(200).send({success: false, message: "El autor ya esta registrado"})
            }else{
                const created = await Autores.sequelize.query('DECLARE @Nombre_Autor VARCHAR(50), @Apellido_Autor VARCHAR(50), @Fecha_Nacimiento_Autor DATE, @Imagen_Autor VARCHAR(100) EXEC addAuthor @Nombre_Autor=:nombre, @Apellido_Autor=:apellido, @Fecha_Nacimiento_Autor=:fechaNacimiento, @Imagen_Autor=:imagen'
                ,{ replacements: { nombre: req.body.nombre, apellido: req.body.apellido, fechaNacimiento: req.body.fechaNacimiento, imagen: req.body.imagen }, type: Autores.sequelize.QueryTypes.EXEC })
                res.status(200).send({success: true, created: true})
            }
        }catch(error){
            let e = error.toString()
            res.status(500).send({success:false, error: e})
            console.log(e)
        }
    }else{
        res.status(401).send({success:false, message: 'Acceso no autorizado'})
    }
})

Router.delete('/deleteAuthor/:id', async(req,res)=>{
    const payload = decript(req.headers['access-token'])
    if(payload.isAdmin){
        try {
            const deleted = await Autores.sequelize.query('DECLARE @Id_Autor INT EXEC deleteAuthor @Id_Autor=:id',{ replacements: { id: req.params.id }, type: Autores.sequelize.QueryTypes.EXEC })
            res.status(200).send({success: true, message: "Borrado exitoso"})
        }catch(error){
            let e = error.toString()
            res.status(500).send({success:false, error: e})
            console.log(e)
        }
    }else{
        res.status(401).send({success:false, message: 'Acceso no autorizado'})
    }
})

Router.put('/editAuthor/:id', async(req,res) => {
    try {
        const edited = await Autores.sequelize.query('DECLARE @Id_Autor INT, @Nombre_Autor VARCHAR(50), @Apellido_Autor VARCHAR(50), @Fecha_Nacimiento_Autor DATE, @Imagen_Autor VARCHAR(100) EXEC editAuthor @Id_Autor=:id, @Nombre_Autor=:nombre, @Apellido_Autor=:apellido, @Fecha_Nacimiento_Autor=:fechaNacimiento, @Imagen_Autor=:imagen'
        ,{ replacements: { id: req.params.id, nombre: req.body.Nombre_Autor, apellido: req.body.Apellido_Autor, fechaNacimiento: req.body.Fecha_Nacimiento_Autor, imagen: req.body.Imagen_Autor }, type: Autores.sequelize.QueryTypes.EXEC })
        res.status(200).send({success: true, message: "Editado exitoso"})
    } catch (error) {
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

module.exports = Router