const express = require ('express');
const jwt = require ('jsonwebtoken')
const decript = require('jwt-decode')
const booksRoutes = require('./booksRoutes')
const authorsRoutes = require('./authorsRoutes')
const gendersRoutes = require('./gendersRoutes')
const editorialsRoutes = require('./editorialsRoutes')
const languagesRoutes = require('./languagesRoutes')
const llave = "Esponja";
const Router = express.Router();

const {Rentas, Libros} = require('../models/Library.js');

Router.get('/getRents', async(req,res)=>{
    const payload = decript(req.headers['access-token'])
    if(payload.isAdmin){
        try {
            const items = await Rentas.sequelize.query('EXEC getRents', { type: Rentas.sequelize.QueryTypes.EXEC })
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

Router.get('/getRentsByUser/:id', async(req,res)=>{
    try {
        const items = await Rentas.sequelize.query('DECLARE @Id_Usuario INT EXEC getRentsByUser @Id_Usuario=:id',{ replacements: { id: req.params.id }, type: Rentas.sequelize.QueryTypes.EXEC })
        const [results] = items
        res.status(200).send({success: true, items:results})
    } catch (error) {
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.post('/addRent', async(req,res)=>{
    try{
        const edited = await Libros.sequelize.query('DECLARE @Id_Libro INT, @Prestado BIT EXEC setBookRented @Id_Libro=:libro, @Prestado=:prestado ',{ replacements: { libro: req.body.libro, prestado: true }, type: Libros.sequelize.QueryTypes.EXEC })
        const created = await Rentas.sequelize.query('DECLARE @Id_Usuario INT, @Id_Libro INT, @FechaRenta DATE, @FechaDevolucion DATE EXEC addRent @Id_Usuario=:usuario, @Id_Libro=:libro, @FechaRenta=:fecha, @FechaDevolucion=:entrega',
        { replacements: { usuario: req.body.usuario, libro: req.body.libro, fecha: req.body.fecha, entrega: req.body.entrega}, type: Rentas.sequelize.QueryTypes.EXEC })
        res.status(200).send({success: true, created: true})
    }catch(error){
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.delete('/deleteRent/:id', async(req,res)=>{
    try {
        const edited = await Libros.sequelize.query('DECLARE @Id_Libro INT, @Prestado BIT EXEC setBookRented @Id_Libro=:libro, @Prestado=:prestado ',{ replacements: { libro: req.body.libro, prestado: false }, type: Libros.sequelize.QueryTypes.EXEC })
        const deleted = await Rentas.sequelize.query('DECLARE @Id_Renta INT EXEC deleteRent @Id_Renta=:id',{ replacements: { id: req.params.id }, type: Rentas.sequelize.QueryTypes.EXEC })
        res.status(200).send({success: true, message: "Borrado exitoso"})
    }catch(error){
        let e = error.toString()
        res.status(500).send({success:false, error: e})
    }
})

module.exports = Router
