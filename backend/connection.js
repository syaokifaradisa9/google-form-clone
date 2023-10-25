import mongoose from 'mongoose'

const connection = () =>{
    mongoose.connect(`mongodb://0.0.0.0:27017`, {
        dbName: 'gformclone'
    })
    
    const connection = mongoose.connection
    connection.on('error', console.error.bind(console, 'connection error : '))
    connection.once('open', () => {
        console.log("Connected to MongoDB")
    })
}

export default connection