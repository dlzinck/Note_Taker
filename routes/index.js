const path = require('path');

const index = require('express').Router();

// Sends notes to the notes.html file
index.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
})

// Sends to the homepage if an issue exists
index.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

module.exports = index;