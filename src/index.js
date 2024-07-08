// const db = require('./database.js');

import {get_artist, get_album, get_song, delete_album, delete_song, delete_artist, edit_album, edit_song, edit_artist, new_album, new_song, new_artist} from './database.js';

import express from 'express';
import artistRouter from "./routers/artist-router.js";
import artistsRouter from "./routers/artists-router.js";
import albumsRouter from "./routers/albums-router.js";
import albumRouter from "./routers/album-router.js";
import songsRouter from "./routers/songs-router.js";
import songRouter from "./routers/song-router.js";

const app = express()

// const hostname = '127.0.0.1';
const port = 3000;

const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
  res.header('Access-Control-Allow-Methods', "*");
  next();
}

app.use(allowCrossDomain);

// app.use(express.static('../public'));
// app.use('/images', express.static('../images'));
app.use(express.json());

app.use('/api/artist', artistRouter);
app.use('/api/artists', artistsRouter);

app.use('/api/album', albumRouter);
app.use('/api/albums', albumsRouter);

app.use('/api/song', songRouter);
app.use('/api/songs', songsRouter);

app.listen(port, () => {
  console.log(`Site listening to ${port}`);
});