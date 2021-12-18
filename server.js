const path = require('path');
const express = require('express');
// const { v4: uuidv4 } = require('uuid')
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');

// parse incoming string to array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// need this to connect server to public
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    try {
        const notes = fs.readFileSync('./db/db.json', 'utf8');
        const array = JSON.parse(notes)
        res.json(array);
    } catch (error) {
        res.send('failed to retrieve notes')
    }
});

app.post('/api/notes', (req, res) => {
    try {
        const notes = fs.readFileSync('./db/db.json', 'utf8');
        const array = JSON.parse(notes)
        req.body.id = Number(array[array.length - 1].id) + 1;
        req.body.id = req.body.id.toString();
        array.push(req.body);
        fs.writeFileSync('./db/db.json', JSON.stringify(array));
        res.json(req.body);
    } catch (error) {
        res.send('failed to save note');
    }
});

// delete function not working yet
// app.delete('/api/notes/:id', (req, res) => {
//     try {
//         const notes = fs.readFileSync('./db/db.json', 'utf8');
//         const array = JSON.parse(notes)
        
//         array.push(req.body);
//         fs.writeFileSync('./db/db.json', JSON.stringify(array));
//         res.json(req.body);
//     } catch (error) {
//         res.send('failed to delete note');
//     }
// });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
