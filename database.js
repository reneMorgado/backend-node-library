const { Sequelize } = require('sequelize')

/* Conexión a la base de datos */
const sequelize = new Sequelize('IngWebDos', 'morgado', 'Pass1234!', {
    host: 'upiita-morgado.database.windows.net',
    dialect: 'mssql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    port: 1433
})

const connectDB = async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = {connectDB, sequelize}