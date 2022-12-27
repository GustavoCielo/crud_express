const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const app = express();

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    }),
)

app.use(express.json())

app.get('/', (req, res) => {
    return res.json({message: 'Hello world'})
})

// CRUD
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

// Listener
mongoose
    .connect(process.env.DB)
    .then(() => {
        console.log('db connected.')
        app.listen(3000)
    })
    .catch((err) => console.log(err))