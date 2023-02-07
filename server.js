const express = require('express')

const app = express()

const port = 8080

const authRouter = require('./src/routes/authRoutes')

app.use('/', authRouter)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
