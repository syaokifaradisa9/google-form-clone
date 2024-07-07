import express from 'express';

const app = express()

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.listen(3000, () => {
    console.log("Server started on port 3000");
});

app.get('/', (request, response) => {
    response.send("Hello World");
});