const express = require ('express')
const Router = express.Router()

const Task = require('../models/task')

Router.get('/', async(req,res)=>{
    try {
        const items = await Task.findAll()
        res.status(200).send({success: true, items})
    } catch (error) {
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

Router.post('/add', async(req,res)=>{
    try{
        const created = await Task.create({
            title: req.body.title,
            prioridad: req.body.prioridad,
        })
        res.status(200).send({success: true, created})
    }catch(error){
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

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

Router.delete('/delete/:id', async(req,res)=>{
    try {
        const deleted = await Task.destroy({
            where:{
                id: req.params.id
            }
        })
        console.log(deleted)
        if(deleted == true){
            res.status(200).send({success: true, message: "Borrado exitoso"})
        }else{
            res.status(200).send({success: false, message: "La tarea no existe"})
        }
    }catch(error){
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

/************RUTAS DE BUSQUEDA**********/

Router.get('/search', async(req,res)=>{
    console.log(req.query)
    try {
        const items = await Task.findAll({
            where:{
                ...req.query
            }
        })
        res.status(200).send({success: true, items})
    } catch (error) {
        let e = error.toString()
        res.status(500).send({success:false, error: e})
        console.log(e)
    }
})

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