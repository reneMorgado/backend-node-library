const express = require ('express');
const decript = require('jwt-decode')
const Router = express.Router();

const {Idiomas} = require('../models/Library.js');

Router.get('/getLanguages', async(req,res)=>{
    const payload = decript(req.headers['access-token'])
    if(payload.isAdmin){
        try {
            const items = await Idiomas.sequelize.query('EXEC getLanguages', { type: Idiomas.sequelize.QueryTypes.EXEC })
            const [results] = items
            res.status(200).send({success: true, items: results})
        } catch (error) {
            let e = error.toString()
            res.status(500).send({success:false, error: e})
            console.log(e)
        }
    }else{
        res.status(401).send({success:false, message: 'Acceso no autorizado'})
    }
})

Router.get('/getLanguagesName/:id', async(req,res)=>{
    try {
        const items = await Idiomas.sequelize.query('DECLARE @Id_Idioma INT EXEC getLanguageById @Id_Idioma=:id',{ replacements: { id: req.params.id }, type: Idiomas.sequelize.QueryTypes.EXEC })
        const [results] = items
        res.status(200).send({success: true, items:results})

    } catch (error) {
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.post('/addLanguage', async(req,res)=>{
    const payload = decript(req.headers['access-token'])
    if(payload.isAdmin){
        try{
            const items = await Idiomas.sequelize.query('DECLARE @Idioma VARCHAR(50) EXEC getLanguageByName @Idioma=:idioma',{ replacements: { idioma: req.body.idioma }, type: Idiomas.sequelize.QueryTypes.EXEC })
            const [result] = items
            if(result.length > 0){
                res.status(200).send({success: false, message: "El idioma ya esta registrado"})
            }else{
                const created = await Idiomas.sequelize.query('DECLARE @Idioma VARCHAR(50) EXEC addLanguage @Idioma=:idioma'
                ,{ replacements: { idioma: req.body.idioma }, type: Idiomas.sequelize.QueryTypes.EXEC })
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

Router.delete('/deleteLanguage/:id', async(req,res)=>{
    const payload = decript(req.headers['access-token'])
    if(payload.isAdmin){
        try {
            const deleted = await Idiomas.sequelize.query('DECLARE @Id_Idioma INT EXEC deleteLanguage @Id_Idioma=:id',{ replacements: { id: req.params.id }, type: Idiomas.sequelize.QueryTypes.EXEC })
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

Router.put('/editLanguage/:id', async(req,res) => {
    try {
        const edited = await Idiomas.sequelize.query('DECLARE @Id_Idioma INT, @Idioma INT EXEC editLanguage @Id_Idioma=:id, @Idioma=:idioma'
        ,{ replacements: { id: req.params.id, idioma: req.body.idioma }, type: Idiomas.sequelize.QueryTypes.EXEC })
        res.status(200).send({success: true, message: "Editado exitoso"})
    } catch (error) {
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})


module.exports = Router
