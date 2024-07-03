// const db = require('./database.js');

import {get_artist, get_album, get_song, delete_album, delete_song, delete_artist, edit_album, edit_song, edit_artist, new_album, new_song, new_artist} from './database.mjs';

import express from 'express';
const app = express()

const hostname = '127.0.0.1';
const port = 3000;

let allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  next();
}

app.use(allowCrossDomain);

// app.use(express.static('../public'));
// app.use('/images', express.static('../images'));
app.use(express.json());


app.get('/albums/:query', (req, res) => {
  res.sendFile(__dirname.replace("src", "public/album.html"));
});

app.get('/songs/:query', (req, res) => {
  res.sendFile(__dirname.replace("src", "public/song.html"));
});

app.get('/artists/:query', (req, res) => {
  res.sendFile(__dirname.replace("src", "public/artist.html"));
});


app.get('/api/artists/:query', (req, res) => {
  if(req.params.query === "recommended") {
    res.send(get_artist.all(8))
  } else if(req.params.query === "all") {
    res.send(get_artist.all())
  }
  else {
    const artist = get_artist.from_id(req.params.query);
    res.send(artist);
  }
});

app.get('/api/albums/:query', (req, res) => {
  if(req.params.query === "recommended") {
    res.send(get_album.all(8))
  } else if(req.params.query === "all") {
    res.send(get_album.all())
  }
  else
  {
    const album = get_album.from_id(req.params.query);
    res.send(album);
  }
});

app.get('/api/albums/songs/:query', (req, res) => {
  res.send(get_song.from_album_id(req.params.query));
});

app.get('/api/artists/albums/:query', (req, res) => {
  res.send(get_album.from_artist_id(req.params.query));
});

app.get('/api/songs/:query', (req, res) => {
  if(req.params.query === "recommended") {
    res.send(get_song.all(8))
  } else if(req.params.query === "all") {
    res.send(get_song.all())
  }
  else {
    const song = get_song.from_id(req.params.query);
    res.send(song);
  }
});

app.post('/api/artists', (req, res) => {
  if(req.headers['content-type'] === 'json' || req.headers['content-type'] === 'application/json') {
    const name = req.body["name"];
    const icon = req.body["icon"];
    if(!name) { return res.sendStatus(400); }
    res.send(new_artist(name, icon));
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
    const release_date = req.body["release_date"];
    const icon = req.body["icon"];
    if(!name || !artist_id) { return res.sendStatus(400); }
    res.send(new_album(name, artist_id, icon));
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
    res.send(new_song(name, duration, album_id, lyrics, icon));
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
    const ret = edit_artist(artist_id, name, icon);
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
    const ret = edit_album(album_id, name, release_date, icon, artist_id);
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
    const ret = edit_song(song_id, name, lyrics, duration, icon, album_id);
    if(ret === 404) {res.sendStatus(404);}
    else {res.send(ret);}
  }else {res.sendStatus(400);}
});

app.delete('/api/artists/:query', (req, res) => {
  res.send(delete_artist(req.params.query));
});

app.delete('/api/albums/:query', (req, res) => {
  res.send(delete_album(req.params.query));
});

app.delete('/api/songs/:query', (req, res) => {
  res.send(delete_song(req.params.query));
});

app.listen(port, () => {
  console.log(`Site listening to ${port}`);
});