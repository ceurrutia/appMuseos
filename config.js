const mongoose = require('mongoose')
require('dotenv').config()

const dbconnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Conexión exitosa a la base de datos");
    } catch (err) {
        console.error("Error de conexión:", err);
    }
};

module.exports = dbconnect;