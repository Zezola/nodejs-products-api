const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const morgan = require('morgan');

const routes = require('./routes/routes');

const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
})

database.once('connected', () => {
    console.log("Database conneceted");
})

const app = express();

app.use(morgan('combined'));
app.use(express.json());
app.use('/api', routes);



app.listen(3000, () => {
    console.log("Server started at port 3000")
})