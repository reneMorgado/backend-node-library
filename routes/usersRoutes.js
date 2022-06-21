const express = require ('express');
const decript = require('jwt-decode')
const Router = express.Router();

const { Usuarios } = require('../models/Library.js');
 
Router.get('/verifyToken', async(req,res)=>{
    res.status(200).send({success: true})
})

Router.get('/getUsers', async(req,res)=>{
    const payload = decript(req.headers['access-token'])
    if(payload.isAdmin){
        try {
            const items = await Usuarios.sequelize.query('EXEC getUsers', { type: Usuarios.sequelize.QueryTypes.EXEC })
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

Router.get('/getUserNameById/:id', async(req,res)=>{
    try {
        const items = await Usuarios.sequelize.query('DECLARE @Id_Usuario INT EXEC getUserNameById @Id_Usuario=:id',{ replacements: { id: req.params.id }, type: Usuarios.sequelize.QueryTypes.EXEC })
        const [results] = items
        const [user] = results
        res.status(200).send({success: true, name: user.Nombre + " " + user.Apellido})
    } catch (error) {
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.delete('/deleteUser/:id', async(req,res)=>{
    const payload = decript(req.headers['access-token'])
    if(payload.isAdmin){
        try {
            const deleted = await Usuarios.sequelize.query('DECLARE @Id_Usuario INT EXEC deleteUser @Id_Usuario=:id',{ replacements: { id: req.params.id }, type: Usuarios.sequelize.QueryTypes.EXEC })
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

module.exports = Router