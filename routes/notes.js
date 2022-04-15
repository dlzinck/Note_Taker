const notes = require('express').Router();
const storage = require('../db/storage.js')

// Requesting the existing notes from previous sessions
notes.get('/notes', (req, res) =>{
    storage
    .getNote()
    .then(notes => {
        res.json(notes);
    })
    .catch(err =>{
        res.status(500).json(err)
    })
});

// Posting the note function route
notes.post('/notes', (req, res) => {
    storage
    .addNote(req.body)
    .then(note =>{
        res.json(note)
    })
    .catch(err => {
        res.status(500).json(err)
    })
});

// Deleting the note function route
notes.delete('/notes/:id', (req, res) => {
    storage
    .removeNote(req.params.id)
    .then(() => res.json({ ok: true }))
    .catch(err => res.status(500).json(err))
});

module.exports = notes;