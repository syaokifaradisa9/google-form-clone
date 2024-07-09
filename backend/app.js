import express from 'express'
import apiRouter from './routes/api.js'
import connection from './connection.js'

const app = express()

// Embedding Middleware
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

// Embedding Routes
app.use('/api', apiRouter)

// Connect to MongoDB
connection()

// Run Express
app.listen(3000, () => {
    console.log("Server started on port 3000");
})