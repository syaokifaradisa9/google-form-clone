import mongoose from 'mongoose'
import dotenv from 'dotenv'

const env = dotenv.config().parsed

const connection = () => {
    mongoose.connect(env.MONGODB_URI, {
        dbName: env.MONGODB_NAME
    })

    const connection = mongoose.connection;
    connection.on('error', console.log.bind(console, 'MongoDB connection error:'))
    connection.once('open', () => {
        console.log('MongoDB connected, database name : ' + env.MONGODB_NAME);
    })
}

export default connection