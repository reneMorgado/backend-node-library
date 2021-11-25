const express = require ('express');
const decript = require('jwt-decode')
const Router = express.Router();

const { Generos } = require('../models/Library.js');

Router.get('/getGenders', async(req,res)=>{
    try {
        const items = await Generos.sequelize.query('EXEC getGenders', { type: Generos.sequelize.QueryTypes.EXEC })
        const [results] = items
        res.status(200).send({success: true, items: results})
    } catch (error) {
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.get('/getGendersName/:id', async(req,res)=>{
    try {
        const items = await Generos.sequelize.query('DECLARE @Id_Genero INT EXEC getGenderById @Id_Genero=:id',{ replacements: { id: req.params.id }, type: Generos.sequelize.QueryTypes.EXEC })
        const [results] = items
        res.status(200).send({success: true, items:results})
    } catch (error) {
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.post('/addGender', async(req,res)=>{
    const payload = decript(req.headers['access-token'])
    if(payload.isAdmin){
        try{
            const items = await Generos.sequelize.query('DECLARE @Genero VARCHAR(50) EXEC getGenderByName @Genero=:genero',{ replacements: { genero: req.body.genero }, type: Generos.sequelize.QueryTypes.EXEC })
            const [result] = items
            if(result.length > 0){
                res.status(200).send({success: false, message: "El genero ya esta registrado"})
            }else{
                const created = await Generos.sequelize.query('DECLARE @Genero VARCHAR(50), @Imagen_Genero VARCHAR(100) EXEC addGender @Genero=:genero, @Imagen_Genero=:imagen'
                ,{ replacements: { genero: req.body.genero, imagen: req.body.imagen }, type: Generos.sequelize.QueryTypes.EXEC })
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

Router.delete('/deleteGender/:id', async(req,res)=>{
    const payload = decript(req.headers['access-token'])
    if(payload.isAdmin){
        try {
            const deleted = await Generos.sequelize.query('DECLARE @Id_Genero INT EXEC deleteGender @Id_Genero=:id',{ replacements: { id: req.params.id }, type: Generos.sequelize.QueryTypes.EXEC })
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

Router.put('/editGender/:id', async(req,res) => {
    try {
        const edited = await Generos.sequelize.query('DECLARE @Id_Genero INT, @Genero VARCHAR(50), @Imagen_Genero VARCHAR(100) EXEC editGender @Id_Genero=:id, @Genero=:genero, @Imagen_Genero=:imagen'
        ,{ replacements: { id: req.params.id, genero: req.body.genero, imagen: req.body.imagen }, type: Generos.sequelize.QueryTypes.EXEC })
        res.status(200).send({success: true, message: "Editado exitoso"})
    } catch (error) {
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

module.exports = Router