import dotenv from 'dotenv'
import express from 'express'
import apiRouter from './routes/api.js'
import connection from './connection.js'

// Load environment variables
const env = dotenv.config().parsed

// Create express object
const app = express()

// Embedding Middleware
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// Embedding Routes
app.use('/api', apiRouter)
app.use((req, res) => {
    res.status(404).json({
        message: '404_NOT_FOUND'
    });
});

// Connect to MongoDB
connection()

// Run Express
app.listen(env.APP_PORT, () => {
    console.log(`Server started on port ${env.APP_PORT}`);
})