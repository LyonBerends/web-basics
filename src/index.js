const db = require('./database.js');
const express = require('express');
const app = express()

const hostname = '127.0.0.1';
const port = 3000;

app.use(express.static('../public'));
app.use('/images', express.static('../images'));

app.get('/api/artists/:query', (req, res) => {
  const artist = db.get_artist.from_id(req.params.query);
  res.send(artist);
});

app.get('/api/albums/:query', (req, res) => {
  const album = db.get_album.from_id(req.params.query);
  res.send(album);
});

app.get('/api/songs/:query', (req, res) => {
  const song = db.get_song.from_id(req.params.query);
  res.send(song);
});

app.post('/api/artists', (req, res) => {
  if(req.headers['content-type'] == 'json' || req.headers['content-type'] == 'application/json') {
    res.send({"hello": "world"});
  }
  else
  {
    res.send("Hello, world!");
  }
});

app.put('/api', (req, res) => {
  res.send('Got a PUT request at /user')
});

app.delete('/api', (req, res) => {
  res.send('Got a DELETE request at /user')
});

app.listen(port, () => {
  console.log(`Site listening to ${port}`);
});