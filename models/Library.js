const { DataTypes } = require('sequelize')
const {sequelize} = require('../database')

const Autores = sequelize.define('Autores',{
    Id_Autor:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    FechaNacimiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
})

const Generos = sequelize.define('Generos',{
    Id_Genero:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

const Editoriales = sequelize.define('Editoriales',{
    Id_Editorial:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

const Libros = sequelize.define('Libros',{
    Id_Libro:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    Id_Autores:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Autores',
            key: 'Id_Autor'
        }
    },
    Id_Genero:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Generos',
            key: 'Id_Genero'
        }
    },
    Id_Editorial:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Editoriales',
            key: 'Id_Editorial'
        }
    },
    Titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Sinopsis: {
        type: DataTypes.STRING(1024),

        allowNull: false
    },
    FechaPublicacion: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Prestado:{
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    ImgUrl:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Idioma:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Edicion:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
})



Autores.hasMany(Libros)
Generos.hasMany(Libros)
Editoriales.hasMany(Libros)

module.exports = {Libros, Autores, Generos, Editoriales}