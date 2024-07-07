import express from 'express';
import apiRouter from './routes/api.js';

const app = express()

// Embedding Middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Embedding Routes
app.use('/api', apiRouter);

// Run Express
app.listen(3000, () => {
    console.log("Server started on port 3000");
});