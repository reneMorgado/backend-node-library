const express = require ('express');
const jwt = require ('jsonwebtoken')
const bcrypt = require('bcryptjs');
const llave = "Esponja";
const rondasEncriptacion = 10;
const Router = express.Router();

const {Libros, Autores, Generos, Editoriales, Idiomas, Usuarios, Rentas} = require('../models/Library.js');

Router.use((req, res, next) => {
    const token = req.headers['access-token'];
    if (token) {
      jwt.verify(token, llave, (err, decoded) => {      
        if (err) {
            return res.status(400).send({success:false, error: err, message: "Token invalido"})  
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
        return res.status(400).send({success:false, message: "Token no proporcionado"})  
    }
 });

Router.get('/verifyToken', async(req,res)=>{
    res.status(200).send({success: true})
})

Router.get('/getBooks', async(req,res)=>{
    try {
        const items = await Libros.findAll()
        res.status(200).send({success: true, items})
    } catch (error) {
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.get('/getBookById/:id', async(req,res)=>{
    try {
        const items = await Libros.findOne({
            where: {
                Id_Libro: req.params.id,
            }
        })
        res.status(200).send({success: true, items})
    } catch (error) {
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.get('/getAvailableBooks', async(req,res)=>{
    try {
        const items = await Libros.findAll({
            where:{
                Prestado: false
            }
        })
        res.status(200).send({success: true, items})
    } catch (error) {
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.get('/getBooksByAuthor/:id', async(req,res)=>{
    try {
        const items = await Libros.findAll({
            where: {
                Id_Autores: req.params.id
            }
        })
        res.status(200).send({success: true, items})
    } catch (error) {
        let e = error.toString()
        res.status(500).send({success:false, error: e})
    }
})

Router.get('/getBooksByGender/:id', async(req,res)=>{
    try {
        const items = await Libros.findAll({
            where: {
                Id_Genero: req.params.id
            }
        })
        res.status(200).send({success: true, items})
    } catch (error) {
        let e = error.toString()
        res.status(500).send({success:false, error: e})
    }
})

Router.get('/getAuthors', async(req,res)=>{
    try {
        const items = await Autores.findAll()
        res.status(200).send({success: true, items})
    } catch (error) {
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.get('/getAuthorsName/:id', async(req,res)=>{
    try {
        const items = await Autores.findOne({
            where: {
                Id_Autor: req.params.id,
            }
        })
        res.status(200).send({success: true, items})
    } catch (error) {
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.get('/getGenders', async(req,res)=>{
    try {
        const items = await Generos.findAll()
        res.status(200).send({success: true, items})
    } catch (error) {
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.get('/getGendersName/:id', async(req,res)=>{
    try {
        const items = await Generos.findOne({
            where: {
                Id_Genero: req.params.id,
            }
        })
        res.status(200).send({success: true, items})
    } catch (error) {
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.get('/getEditorials', async(req,res)=>{
    try {
        const items = await Editoriales.findAll()
        res.status(200).send({success: true, items})
    } catch (error) {
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.get('/getEditorialsName/:id', async(req,res)=>{
    try {
        const items = await Editoriales.findOne({
            where: {
                Id_Editorial: req.params.id,
            }
        })
        res.status(200).send({success: true, items})
    } catch (error) {
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.get('/getLanguages', async(req,res)=>{
    try {
        const items = await Idiomas.findAll()
        res.status(200).send({success: true, items})
    } catch (error) {
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.get('/getLanguagesName/:id', async(req,res)=>{
    try {
        const items = await Idiomas.findOne({
            where: {
                Id_Idioma: req.params.id,
            }
        })
        res.status(200).send({success: true, items})
    } catch (error) {
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.get('/getUsers', async(req,res)=>{
    try {
        const items = await Usuarios.findAll()
        res.status(200).send({success: true, items})
    } catch (error) {
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.get('/getUserNameById/:id', async(req,res)=>{
    try {
        const items = await Usuarios.findOne({
            where:{
                Id_Usuario: req.params.id
            }
        })
        res.status(200).send({success: true, name: items.dataValues.Nombre + " " + items.dataValues.Apellido})
    } catch (error) {
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.get('/getRents', async(req,res)=>{
    try {
        const items = await Rentas.findAll()
        res.status(200).send({success: true, items})
    } catch (error) {
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.get('/getRentsByUser/:id', async(req,res)=>{
    try {
        const items = await Rentas.findAll({
            where:{
                Id_Usuario: req.params.id
            }
        })
        res.status(200).send({success: true, items})
    } catch (error) {
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.post('/addAuthor', async(req,res)=>{
    try{
        const items = await Autores.findOne({
            where: {
                Nombre_Autor: req.body.nombre,
                Apellido_Autor: req.body.apellido
            }
        })
        if(items !== null){
            res.status(200).send({success: false, message: "El autor ya esta registrado"})
        }else{
            const created = await Autores.create({
                Nombre_Autor: req.body.nombre,
                Apellido_Autor: req.body.apellido,
                Fecha_Nacimiento_Autor: req.body.fechaNacimiento,
                Imagen_Autor: req.body.imagen
            })
            res.status(200).send({success: true, created})
        }
    }catch(error){
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.post('/addGender', async(req,res)=>{
    try{
        const items = await Generos.findOne({
            where: {
                Genero: req.body.genero,
            }
        })
        if(items !== null){
            res.status(200).send({success: false, message: "El genero ya esta registrado"})
        }else{
            const created = await Generos.create({
                Genero: req.body.genero,
                Imagen_Genero: req.body.imagen
            })
            res.status(200).send({success: true, created})
        }
    }catch(error){
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.post('/addEditorial', async(req,res)=>{
    try{
        const items = await Editoriales.findOne({
            where: {
                Editorial: req.body.editorial,
            }
        })
        if(items !== null){
            res.status(200).send({success: false, message: "La editorial ya esta registrada"})
        }else{
            const created = await Editoriales.create({
                Editorial: req.body.editorial,
            })
            res.status(200).send({success: true, created})
        }
    }catch(error){
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.post('/addLanguage', async(req,res)=>{
    try{
        const items = await Idiomas.findOne({
            where: {
                Idioma: req.body.idioma,
            }
        })
        if(items !== null){
            res.status(200).send({success: false, message: "El idioma ya esta registrado"})
        }else{
            const created = await Idiomas.create({
                Idioma: req.body.idioma,
            })
            res.status(200).send({success: true, created})
        }
    }catch(error){
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.post('/addBook', async(req,res)=>{
    try{
        let copys = parseInt(req.body.cantidad,10)
        let created;
        for (let index = 0; index <= copys - 1; index++) {
            created = await Libros.create({
                Id_Autores: req.body.autor,
                Id_Genero: req.body.genero,
                Id_Editorial: req.body.editorial,
                Id_Idioma: req.body.idioma,
                Titulo: req.body.titulo,
                Sinopsis: req.body.sinopsis,
                FechaPublicacion: req.body.fechaPublicacion,
                ImgUrl: req.body.imgurl,
                Edicion: req.body.edicion
            })
        }
        res.status(200).send({success: true, created})
    }catch(error){
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.post('/addRent', async(req,res)=>{
    try{
        const edited = await Libros.update({Prestado: true}, {
            where: {
              Id_Libro: req.body.libro
            }
        });
        if(edited[0] == true){
            const created = await Rentas.create({
                Id_Usuario: req.body.usuario,
                Id_Libro: req.body.libro,
                FechaRenta: req.body.fecha,
                FechaDevolucion: req.body.entrega
            })
            res.status(200).send({success: true, created})
        }else{
            res.status(200).send({success: false, message: "El libro no existe"})
        }
    }catch(error){
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.delete('/deleteAuthor/:id', async(req,res)=>{
    try {
        const deleted = await Autores.destroy({
            where:{
                Id_Autor: req.params.id
            }
        })
        if(deleted == true){
            res.status(200).send({success: true, message: "Borrado exitoso"})
        }else{
            res.status(200).send({success: false, message: "El autor no existe"})
        }
    }catch(error){
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.delete('/deleteGender/:id', async(req,res)=>{
    try {
        const deleted = await Generos.destroy({
            where:{
                Id_Genero: req.params.id
            }
        })
        if(deleted == true){
            res.status(200).send({success: true, message: "Borrado exitoso"})
        }else{
            res.status(200).send({success: false, message: "El genero no existe"})
        }
    }catch(error){
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.delete('/deleteEditorial/:id', async(req,res)=>{
    try {
        const deleted = await Editoriales.destroy({
            where:{
                Id_Editorial: req.params.id
            }
        })
        if(deleted == true){
            res.status(200).send({success: true, message: "Borrado exitoso"})
        }else{
            res.status(200).send({success: false, message: "La editorial no existe"})
        }
    }catch(error){
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.delete('/deleteLanguage/:id', async(req,res)=>{
    try {
        const deleted = await Idiomas.destroy({
            where:{
                Id_Idioma: req.params.id
            }
        })
        if(deleted == true){
            res.status(200).send({success: true, message: "Borrado exitoso"})
        }else{
            res.status(200).send({success: false, message: "El idioma no existe"})
        }
    }catch(error){
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.delete('/deleteBook/:id', async(req,res)=>{
    try {
        const deleted = await Libros.destroy({
            where:{
                Id_Libro: req.params.id
            }
        })
        if(deleted == true){
            res.status(200).send({success: true, message: "Borrado exitoso"})
        }else{
            res.status(200).send({success: false, message: "El libro no existe"})
        }
    }catch(error){
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.delete('/deleteUser/:id', async(req,res)=>{
    try {
        const deleted = await Usuarios.destroy({
            where:{
                Id_Usuario: req.params.id
            }
        })
        if(deleted == true){
            res.status(200).send({success: true, message: "Borrado exitoso"})
        }else{
            res.status(200).send({success: false, message: "El usuario no existe"})
        }
    }catch(error){
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.delete('/deleteRent/:id', async(req,res)=>{
    try {
        const edited = await Libros.update({Prestado: false}, {
            where: {
              Id_Libro: req.body.libro
            }
        });
        console.log(edited)
        if(edited[0] == true){
            const deleted = await Rentas.destroy({
                where:{
                    Id_Renta: req.params.id
                }
            })
            if(deleted == true){
                res.status(200).send({success: true, message: "Borrado exitoso"})
            }else{
                res.status(200).send({success: false, message: "La renta no existe"})
            }
        }else{
            res.status(200).send({success: false, message: "El libro no existe"})
        }
    }catch(error){
        let e = error.toString()
        res.status(500).send({success:false, error: e})
    }
})



/*


Router.put('/edit/:id', async(req,res) => {
    try {
        const edited = await Task.update({...req.body}, {
            where: {
              id: req.params.id
            }
        });
        if(edited[0] == true){
            res.status(200).send({success: true, message: "Editado exitoso"})
        }else{
            res.status(200).send({success: false, message: "La tarea no existe o los datos enviados son inválidos"})
        }
    } catch (error) {
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})
*/

module.exports = Router


/*  Más ejemplos de busqueda

    const getPropsFromItems = async () => {
        const items = await Task.findAll({
            attributes: ['title', 'terminada']
        })
        console.log(items)
    }

    const getPropsAndRenameFromItems = async () => {
        const items = await Task.findAll({
            attributes: ['title', ['terminada', 'done']]
        })
        console.log(items)
    }

    const filterItemsAndOperator = async () => {
        const items = await Task.findAll({
            where: {
                [Op.and]:[
                    { title: 'Aprender ORM' },
                    { prioridad: 1 },
                ]
                
            }
        })
        console.log(items)
    }

*/