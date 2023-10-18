import express from 'express'
import router from './routes/api.js'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use('/api', router)

app.use((req, res) => {
    res.status(404).json({
        status: 404,
        message: "NOT FOUND"
    })
})

app.listen(3000, () => {
    console.log('Server listening on port 3000')
})