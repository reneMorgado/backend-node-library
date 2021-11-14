const { Sequelize } = require('sequelize')

/* Conexión a la base de datos */
const sequelize = new Sequelize('NodeTest', 'SA', 'Pass123!', {
    host: '127.0.0.1',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    port: 3306
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