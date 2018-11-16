const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
const mongoose = require('mongoose');
const app = express();

var cron = require('node-cron');

const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(db.url, { useNewUrlParser: true });

MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err);
    cron.schedule('* 1 * * *', () => {
        console.log('running a task every 1 hour');
        // database
    });
    require('./app/routes')(app, database);
    app.listen(port, () => {
        console.log('Abierto en puerto ' + port);
    });
});
