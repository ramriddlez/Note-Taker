//load libraries
const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid');

// load express into memory 
const PORT = process.env.PORT || 3001

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// define routes

app.get('/', (req,res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//load routes

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
    } else {
        const parsedNote = JSON.parse(data);
        res.json(parsedNote);
    }})
});    
//data persistence on POST
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a review`);
    const { title, text, id } = req.body;

    if (title && text && id) {
        const newNote = {
            title,
            text,
            id :uuid(),
        };
    
//convert data into string so we can save it
    const reviewNote = JSON.stringify(newNote);
    
    fs.writeFile (`./db/${newNote.title}.json`, reviewNote, (err) =>
    err
    ? console.error(err)
    :console.log(
        `note for ${newNote.title} has been successfully updated!`
    )
    );

    const response = {
        status: 'success',
        body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
   } else {
       res.status(500).json('Error in posting Note');
   } 
});


// app listening (starting server)

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🍆 `))