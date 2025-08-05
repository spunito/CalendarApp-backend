const mongoose = require('mongoose')

const dbConnection = async() => {
    console.log(process.env.DB_CNN)

    try{
        await mongoose.connect(process.env.DB_CNN);

        console.log('DB ONLINE')

    } catch(error){ 
        console.log(error)
        throw new Error("Error a la hora de inicializar base de datos");
        
    }
}

module.exports = {
    dbConnection
}