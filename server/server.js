const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database/db.js')

const app = express();

app.listen(3000, () => console.log('listening on port 3000'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/newUser', (req, res) => {
    res.json('Username and Password Added');
    db.save(req.body);
})


app.get('/users/:userName', (req, res) => {
    db.find(req.params.userName, (err, data) => {
        if (err) res.send(err)
        else if (data) res.json(data);
        else res.status(200).end();
    })
})