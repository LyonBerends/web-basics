import {delete_album, edit_album, get_album, get_song, new_album, new_artist} from "./database-queries.js";

export function getAlbums(req, res) {
    if(req.query.get === "all") {
        let albums = get_album.all();
        res.status(200).send({'albums': albums, 'status': 200});
    } else if(req.query.get === "recommended") {
        let albums = get_album.all(8);
        res.status(200).send({'albums': albums, 'status': 200});
    } else {
        res.status(400).send({'status': 400});
    }
}

export function getAlbum(req, res) {
    if(req.params.id.match(/[a-zA-Z]/gm) !== null) {res.status(400).send({"status": 400});}

    const album = get_album.from_id(req.params.id);
    res.status(album.status).send(album);
}

export function getAlbumSongs(req, res) {
    res.send(get_song.from_album_id(req.params.query));
}

export function postAlbum(req, res) {
    if(req.headers['content-type'] === 'json' || req.headers['content-type'] === 'application/json') {
        const name = req.body["name"];
        const artist_id = req.body["artist_id"];
        const release_date = req.body["release_date"];
        const icon = req.body["icon"];
        if(!name || !artist_id) { return res.status(400).send({'status': 400}); }
        res.send(new_album(name, artist_id, icon, release_date));
    }
    else
    {
        res.status(400).send({'status': 400});
    }
}

export function putAlbum(req, res) {
    if(req.headers['content-type'] === 'json' || req.headers['content-type'] === 'application/json') {
        const album_id = req.params.query;
        const name = req.body["name"];
        const release_date = req.body["release_date"];
        const icon = req.body["icon"];
        const artist_id = req.body["artist_id"];
        const ret = edit_album(album_id, name, release_date, icon, artist_id);
        if(ret === 404) {res.sendStatus(404);}
        else {res.send(ret);}
    } else {res.status(400).send({'status': 400});}
}

export function deleteAlbum(req, res) {
    const deletion = delete_album(req.params.query);
    res.status(deletion.status).send(deletion);
}