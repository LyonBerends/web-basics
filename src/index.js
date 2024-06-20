const db = require('./database.js');
const express = require('express');
const app = express()

const hostname = '127.0.0.1';
const port = 3000;

app.use(express.static('../public'));
app.use('/images', express.static('../images'));
app.use(express.json());

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
  if(req.headers['content-type'] === 'json' || req.headers['content-type'] === 'application/json') {
    const name = req.body["name"];
    const icon = req.body["icon"];
    if(!name) { return res.sendStatus(400); }
    res.send(db.new_artist(name, icon));
  }
  else
  {
    res.sendStatus(400);
  }
});

app.post('/api/albums', (req, res) => {
  if(req.headers['content-type'] === 'json' || req.headers['content-type'] === 'application/json') {
    const name = req.body["name"];
    const artist_id = req.body["artist_id"];
    const icon = req.body["icon"];
    if(!name || !artist_id) { return res.sendStatus(400); }
    res.send(db.new_album(name, artist_id, icon));
  }
  else
  {
    res.sendStatus(400);
  }
});

app.post('/api/songs', (req, res) => {
  if(req.headers['content-type'] === 'json' || req.headers['content-type'] === 'application/json') {
    const name = req.body["name"];
    const duration = req.body["duration"];
    const album_id = req.body["album_id"];
    const lyrics = req.body["lyrics"];
    const icon = req.body["icon"];
    if(!name || !album_id || !duration) { return res.sendStatus(400); }
    res.send(db.new_song(name, duration, album_id, lyrics, icon));
  }
  else
  {
    res.sendStatus(400);
  }
});

app.put('/api/artists/:query', (req, res) => {
  if(req.headers['content-type'] === 'json' || req.headers['content-type'] === 'application/json') {
    const artist_id = req.params.query;
    const name = req.body["name"];
    const icon = req.body["icon"];
    const ret = db.edit_artist(artist_id, name, icon);
    if(ret === 404) {res.sendStatus(404);}
    else {res.send(ret);}
  }else {res.sendStatus(400);}
});

app.put('/api/albums/:query', (req, res) => {
  if(req.headers['content-type'] === 'json' || req.headers['content-type'] === 'application/json') {
    const album_id = req.params.query;
    const name = req.body["name"];
    const release_date = req.body["release_date"];
    const icon = req.body["icon"];
    const artist_id = req.body["artist_id"];
    const ret = db.edit_album(album_id, name, release_date, icon, artist_id);
    if(ret === 404) {res.sendStatus(404);}
    else {res.send(ret);}
  }else {res.sendStatus(400);}
});

app.put('/api/songs/:query', (req, res) => {
  if(req.headers['content-type'] === 'json' || req.headers['content-type'] === 'application/json') {
    const song_id = req.params.query;
    const name = req.body["name"];
    const duration = req.body["duration"];
    const lyrics = req.body["lyrics"];
    const icon = req.body["icon"];
    const album_id = req.body["album_id"];
    const ret = db.edit_song(song_id, name, lyrics, duration, icon, album_id);
    if(ret === 404) {res.sendStatus(404);}
    else {res.send(ret);}
  }else {res.sendStatus(400);}
});

app.delete('/api/artists/:query', (req, res) => {
  res.send(db.delete_artist(req.params.query));
});

app.delete('/api/albums/:query', (req, res) => {
  res.send(db.delete_album(req.params.query));
});

app.delete('/api/songs/:query', (req, res) => {
  res.send(db.delete_song(req.params.query));
});

app.listen(port, () => {
  console.log(`Site listening to ${port}`);
});