const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const db = require('./config/db');
const mongoose = require('mongoose');
const request = require('request');
const https = require('https');
const app = express();

var cron = require('node-cron');

var dato = [];

const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect(db.url, { useNewUrlParser: true });

MongoClient.connect(db.url, async (err, database) => {
    if (err) return console.log(err);
    cron.schedule('* 1 * * *', async () => {
        console.log('running a task every 1 hour');
        database.collection('lastDate').findOne((err, item) => {
            if (err) {
                throw err;
            } else {
                const dateI = item;
                try {
                    request('https://hn.algolia.com/api/v1/search_by_date?query=nodejs', { json: true }, (err, res, body) => {
                        if (err) { return console.log(err); }
                        for (let hit of body.hits) {
                            var d1 = new Date(hit['created_at']);
                            var d2 = new Date(dateI['created_at']);
                            console.log(d1);
                            console.log(d2);
                            if (d1 > d2) {
                                database.collection("newsFromPage").insertOne(hit, (err, res) => {
                                    if (err) throw err;
                                    console.log("1 document inserted");
                                });
                            }
                        }
                    });
                } catch (err) {
                    console.log(e);
                }
            }
        });
    });


    require('./app/routes')(app, database);
    app.listen(port, () => {
        console.log('Abierto en puerto ' + port);
    });
});
