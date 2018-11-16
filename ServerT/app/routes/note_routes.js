
const ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose');
const News = require('../models/news');
module.exports = (app, db) => {

    app.get('/news', async (req, res) => {
        try {
            News.find()
                .then(news => {
                    res.json({
                        confirmation: 'success',
                        data: news
                    });
                })
                .catch(err => {
                    res.json({
                        confirmation: 'fail',
                        message: err.message
                    })
                })
        } catch (err) {
            res.status(500).send(err);
        }
    })

    app.get('/news/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const details = {
                '_id': new ObjectID(id)
            };
            db.collection('newsFromPage').findOne(details, (err, item) => {
                if (err) {
                    res.send({ 'error': 'un error ocurrio' });
                } else {
                    res.send(item);
                }
            });
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.delete('/news/:id', async (req, res) => {
        try {
            const id = req.params.id;
            const details = {
                '_id': new ObjectID(id)
            };
            News.findByIdAndRemove(details, (err, todo) => {
                if (err) {
                    return next(new Error('Todo was not found!'));
                }
                res.json('Successfully removed');
            });
        } catch (err) {
            res.status(500).send(err);
        }
    });
}