import mongoose from 'mongoose'

const connection = () => {
    mongoose.connect('mongodb://localhost:27017', {
        dbName: 'google-form-clone'
    })

    const connection = mongoose.connection;
    connection.on('error', console.log.bind(console, 'MongoDB connection error:'))
    connection.once('open', () => {
        console.log('MongoDB connected');
    })
}

export default connection