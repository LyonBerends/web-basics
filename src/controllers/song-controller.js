import {delete_song, edit_song, get_song, new_song} from "./database-queries.js";

export function getSong(req, res) {
    if(req.params.id.match(/[a-zA-Z]/gm) !== null) {res.status(400).send({"status": 400});}

    const song = get_song.from_id(req.params.id);
    res.status(song.status).send(song);
}

export function getSongs(req, res) {
    if(req.query.get === "all") {
        let songs = get_song.all();
        res.status(200).send({'songs': songs, 'status': 200});
    } else if(req.query.get === "recommended") {
        let songs = get_song.all(8);
        res.status(200).send({'songs': songs, 'status': 200});
    } else {
        res.status(400).send({'status': 400});
    }
}

export function postSong(req, res) {
    if(req.headers['content-type'] === 'json' || req.headers['content-type'] === 'application/json') {
        const name = req.body["name"];
        const duration = req.body["duration"];
        const album_id = req.body["album_id"];
        const lyrics = req.body["lyrics"];
        const icon = req.body["icon"];
        if(!name || !album_id || !duration) { return res.status(400).send({'status': 400}); }
        res.send(new_song(name, duration, album_id, lyrics, icon));
    }
    else
    {
        res.status(400).send({'status': 400});
    }
}

export function putSong(req, res) {
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
    }else {res.status(400).send({'status': 400});}
}

export function deleteSong(req, res) {
    res.send(delete_song(req.params.query));
}
