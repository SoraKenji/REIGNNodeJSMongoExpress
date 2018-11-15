// Cargamos el módulo de mongoose
const mongoose = require('mongoose');
// Usaremos los esquemas
const Schema = mongoose.Schema;

// Creamos el objeto del esquema y sus atributos
const NewsSchema = new mongoose.Schema({
    created_at: String,
    title: String,
    url: String,
    author: String,
    points: Number,
    story_text: String,
    comment_text: String,
    num_comments: Number,
    story_id: Number,
    story_title: String,
    parent_id: Number,
    created_at_i: Date,
    _tags: [String],
    objectID: String,
    _highlightResult: {
        title: {
            value: String,
            matchLevel: String,
            fullyHighlighted: Boolean,
            matchedWords: [String]
        },
        url: {
            value: String,
            matchLevel: String,
            matchedWords: [String]
        },
        author: {
            value: String,
            matchLevel: String,
            matchedWords: [String]
        }
    },
});
var News = mongoose.model('News', NewsSchema, 'newsFromPage');

// Exportamos el modelo para usarlo en otros ficheros
module.exports = News;