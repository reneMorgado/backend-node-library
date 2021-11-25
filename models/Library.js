const { DataTypes } = require('sequelize')
const {sequelize} = require('../database')

const Autores = sequelize.define('Autores',{
    Id_Autor:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    Nombre_Autor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Apellido_Autor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Fecha_Nacimiento_Autor: {
        type: DataTypes.DATE,
        allowNull: false
    },
    Imagen_Autor:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

const Generos = sequelize.define('Generos',{
    Id_Genero:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    Genero: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Imagen_Genero:{
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
    Editorial: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

const Idiomas = sequelize.define('Idiomas',{
    Id_Idioma:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    Idioma: {
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
    Id_Idioma:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Idiomas',
            key: 'Id_Idioma'
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
    Edicion:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

const Usuarios = sequelize.define('Usuarios',{
    Id_Usuario:{
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
    Edad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Administrador: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue:false
    }
})

const Rentas = sequelize.define('Rentas',{
    Id_Renta:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    Id_Usuario:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Usuarios',
            key: 'Id_Usuario'
        }
    },
    Id_Libro:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Libros',
            key: 'Id_Libro'
        }
    },
    FechaRenta: {
        type: DataTypes.DATE,
        allowNull: false
    },
    FechaDevolucion: {
        type: DataTypes.DATE,
        allowNull: false
    }
})


Autores.hasMany(Libros)
Generos.hasMany(Libros)
Editoriales.hasMany(Libros)
Idiomas.hasMany(Libros)

Usuarios.hasMany(Rentas)
Libros.hasOne(Rentas)


module.exports = {Libros, Autores, Generos, Editoriales, Idiomas, Usuarios, Rentas}