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

app.get('/', (req, res) =>
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
        }
    })
});
//data persistence on POST
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a review`);
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedNotes = JSON.parse(data);

                parsedNotes.push(newNote);

                fs.writeFile(`./db/db.json`, JSON.stringify(parsedNotes, null, 4), (writeErr) =>
                    writeErr
                        ? console.error(err)
                        : console.log(
                            `note for ${newNote.title} has been successfully updated!`
                        )
                )};
        })                        
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

//BONUS: delete notes by ID reference

app.delete('/api/notes/:id', (req, res) => {
    
    res.send('Got a DELETE request at /user')
  })












// app listening (starting server)

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🍆 `))