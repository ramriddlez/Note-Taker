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

app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a review`);

    // destructuring assignment for the items in req.body
    const { 
}


// app listening (starting server)

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🍆 `))