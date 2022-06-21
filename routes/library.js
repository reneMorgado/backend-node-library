const express = require ('express');
const jwt = require ('jsonwebtoken')
const booksRoutes = require('./booksRoutes')
const authorsRoutes = require('./authorsRoutes')
const gendersRoutes = require('./gendersRoutes')
const editorialsRoutes = require('./editorialsRoutes')
const languagesRoutes = require('./languagesRoutes')
const usersRoutes = require('./usersRoutes')
const rentsRoutes = require('./rentsRoutes')
const llave = "Esponja";
const Router = express.Router();
 
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

Router.use('/', booksRoutes)

Router.use('/', authorsRoutes)

Router.use('/', gendersRoutes)

Router.use('/', editorialsRoutes)

Router.use('/', languagesRoutes)

Router.use('/', rentsRoutes)

Router.use('/', usersRoutes)

module.exports = Router