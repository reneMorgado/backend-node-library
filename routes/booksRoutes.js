const express = require ('express');
const decript = require('jwt-decode')
const Router = express.Router();

const { Libros } = require('../models/Library.js');

Router.get('/getBooks', async(req,res)=>{
    const payload = decript(req.headers['access-token'])
    if(payload.isAdmin){
        try {
            const items = await Libros.sequelize.query('EXEC getBooks', { type: Libros.sequelize.QueryTypes.EXEC })
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

Router.get('/getBookById/:id', async(req,res)=>{
    try {
        const items = await Libros.sequelize.query('DECLARE @Id_Libro INT EXEC getBookById @Id_Libro=:id',{ replacements: { id: req.params.id }, type: Libros.sequelize.QueryTypes.EXEC })
        const [results] = items
        res.status(200).send({success: true, items: results})
    } catch (error) {
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.get('/getAvailableBooks', async(req,res)=>{
    try {
        const items = await Libros.sequelize.query('DECLARE @Prestado Bit EXEC getAvailableBooks @Prestado=:prestado',{ replacements: { prestado: false }, type: Libros.sequelize.QueryTypes.EXEC })
        const [results] = items
        res.status(200).send({success: true, items: results})
    } catch (error) {
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.get('/getBooksByAuthor/:id', async(req,res)=>{
    try {
        console.log(req.params.id)
        const items = await Libros.sequelize.query('DECLARE @Id_Autores INT EXEC getBooksByAuthor @Id_Autores=:id',{ replacements: { id: req.params.id }, type: Libros.sequelize.QueryTypes.EXEC })
        const [results] = items
        res.status(200).send({success: true, items: results})
    } catch (error) {
        let e = error.toString()
        res.status(500).send({success:false, error: e})
    }
})

Router.get('/getBooksByGender/:id', async(req,res)=>{
    try {
        const items = await Libros.sequelize.query('DECLARE @Id_Genero INT EXEC getBooksByGender @Id_Genero=:id',{ replacements: { id: req.params.id }, type: Libros.sequelize.QueryTypes.EXEC })
        const [results] = items
        res.status(200).send({success: true, items: results})
    } catch (error) {
        let e = error.toString()
        res.status(500).send({success:false, error: e})
    }
})

Router.post('/addBook', async(req,res)=>{
    const payload = decript(req.headers['access-token'])
    if(payload.isAdmin){
        try{
            let copys = parseInt(req.body.cantidad,10)
            let created;
            for (let index = 0; index <= copys - 1; index++) {
                created = await Libros.sequelize.query('DECLARE @Id_Autores INT, @Id_Genero INT, @Id_Editorial INT, @Id_Idioma INT, @Titulo VARCHAR(100), @Sinopsis VARCHAR(100), @FechaPublicacion VARCHAR(100), @ImgUrl VARCHAR(200), @Edicion INT EXEC addBook @Id_Autores=:autor, @Id_Genero=:genero, @Id_Editorial=:editorial, @Id_Idioma=:idioma , @Titulo=:titulo, @Sinopsis=:sinopsis, @FechaPublicacion=:fechaPublicacion, @ImgUrl=:imgurl, @Edicion=:edicion',
                { replacements: { autor: req.body.autor, genero: req.body.genero, editorial: req.body.editorial, idioma: req.body.idioma,
                    titulo: req.body.titulo, sinopsis: req.body.sinopsis, fechaPublicacion: req.body.fechaPublicacion, imgurl: req.body.imgurl,
                    edicion: req.body.edicion,  }, type: Libros.sequelize.QueryTypes.EXEC })
            }
            res.status(200).send({success: true, created: true})
        }catch(error){
            let e = error.toString()
            res.status(500).send({success:false, error: e})
            console.log(e)
        }
    }else{
        res.status(401).send({success:false, message: 'Acceso no autorizado'})
    }
})

Router.delete('/deleteBook/:id', async(req,res)=>{
    const payload = decript(req.headers['access-token'])
    if(payload.isAdmin){
        try {
            const deleted = await Libros.sequelize.query('DECLARE @Id_Libro INT EXEC deleteBook @Id_Libro=:id',{ replacements: { id: req.params.id }, type: Libros.sequelize.QueryTypes.EXEC })
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