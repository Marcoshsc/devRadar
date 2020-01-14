const express = require('express');
const devRoute = require('./src/routes/devRoute');
const searchRoute = require('./src/routes/searchRoute');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb+srv://default:default@cluster0-dcpec.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());
app.use('/devs', devRoute);
app.use('/search', searchRoute);

app.listen(3333);