import express from 'express';

const router = express.Router();

router.get('/', (request, response) => {
    response.send("Hello World");
});

export default router