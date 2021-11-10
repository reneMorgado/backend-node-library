const { DataTypes } = require('sequelize')
const {sequelize} = require('../database')

const Task = sequelize.define('Task',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prioridad: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    terminada:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})

module.exports = Task