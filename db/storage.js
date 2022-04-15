const util = require('util');
const fs = require('fs');
const uuid = require('uuid').v1;

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Storage {
    read(){
        return readFileAsync('db/db.json', 'utf8')
    }
    write(note){
        return writeFileAsync('db/db.json', JSON.stringify(note))
    }
    addNote(note){
        const { title, text} = note
        if (!title || !text){
            throw new Error('Title and text can not be blank!')
        }
        const newNote = { title, text, id: uuid() }
        return this.getNote()
        .then(notes => [...notes, newNote])
        .then(updatedNotes => this.write(updatedNotes))
        .then (() => this,newNote)
    }
    getNote() {
        return this.read()
        .then(notes => {
            return JSON.parse(notes) || [];
        })
    }
    removeNote(id){
        return this.getNote()
        .then(notes => notes.filter(note => note.id !== id))
        .then(storedNotes => this.write(storedNotes))
    }
}

module.exports = new Storage();