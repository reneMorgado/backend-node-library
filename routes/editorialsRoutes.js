const express = require ('express');
const decript = require('jwt-decode')
const Router = express.Router();

const { Editoriales } = require('../models/Library.js');
 
Router.get('/getEditorials', async(req,res)=>{
    const payload = decript(req.headers['access-token'])
    if(payload.isAdmin){
        try {
            const items = await Editoriales.sequelize.query('EXEC getEditorials', { type: Editoriales.sequelize.QueryTypes.EXEC })
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

Router.get('/getEditorialsName/:id', async(req,res)=>{
    try {
        const items = await Editoriales.sequelize.query('DECLARE @Id_Editorial INT EXEC getEditorialById @Id_Editorial=:id',{ replacements: { id: req.params.id }, type: Editoriales.sequelize.QueryTypes.EXEC })
        const [results] = items
        res.status(200).send({success: true, items:results})
    } catch (error) {
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.post('/addEditorial', async(req,res)=>{
    const payload = decript(req.headers['access-token'])
    if(payload.isAdmin){
        try{
            const items = await Editoriales.sequelize.query('DECLARE @Editorial VARCHAR(50) EXEC getEditorialByName @Editorial=:editorial',{ replacements: { editorial: req.body.editorial }, type: Editoriales.sequelize.QueryTypes.EXEC })
            const [result] = items
            if(result.length > 0){
                res.status(200).send({success: false, message: "La editorial ya esta registrada"})
            }else{
                const created = await Editoriales.sequelize.query('DECLARE @Editorial VARCHAR(50) EXEC addEditorial @Editorial=:editorial'
                ,{ replacements: { editorial: req.body.editorial }, type: Editoriales.sequelize.QueryTypes.EXEC })
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

Router.delete('/deleteEditorial/:id', async(req,res)=>{
    const payload = decript(req.headers['access-token'])
    if(payload.isAdmin){
        try {
            const deleted = await Editoriales.sequelize.query('DECLARE @Id_Editorial INT EXEC deleteEditorial @Id_Editorial=:id',{ replacements: { id: req.params.id }, type: Editoriales.sequelize.QueryTypes.EXEC })
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

Router.put('/editEditorial/:id', async(req,res) => {
    try {
        const edited = await Editoriales.sequelize.query('DECLARE @Id_Editorial INT, @Editorial INT EXEC editEditorial @Id_Editorial=:id, @Editorial=:editorial'
        ,{ replacements: { id: req.params.id, editorial: req.body.editorial }, type: Editoriales.sequelize.QueryTypes.EXEC })
        res.status(200).send({success: true, message: "Editado exitoso"})
    } catch (error) {
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

module.exports = Router