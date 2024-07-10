import {delete_artist, edit_artist, get_album, get_artist, new_artist} from "./database-queries.js";

export function getArtist(req, res) {
    if(req.params.id.match(/[a-zA-Z]/gm) !== null) {res.status(400).send({"status": 400});}

    const artist = get_artist.from_id(req.params.id);
    res.status(artist.status).send(artist);
}
export function getArtists(req, res) {
    if(req.query.get === "all") {
        let artists = get_artist.all();
        res.status(200).send({'artists': artists, 'status': 200});
    } else if(req.query.get === "recommended") {
        let artists = get_artist.all(8);
        res.status(200).send({'artists': artists, 'status': 200});
    } else {
        res.status(400).send({'status': 400});
    }
}
export function getArtistAlbums(req, res) {
    res.send(get_album.from_artist_id(req.params.query));
}
export function postArtist(req, res) {
    if(req.headers['content-type'] === 'json' || req.headers['content-type'] === 'application/json') {
        const name = req.body["name"];
        const icon = req.body["icon"];
        if(!name) { return res.status(400).send({'status': 400}); }
        res.send(new_artist(name, icon));
    }
    else
    {
        res.status(400).send({'status': 400});
    }
}
export function putArtist(req, res) {
    if(req.headers['content-type'] === 'json' || req.headers['content-type'] === 'application/json') {
        const artist_id = req.params.query;
        const name = req.body["name"];
        const icon = req.body["icon"];
        const ret = edit_artist(artist_id, name, icon);
        if(ret === 404) {res.sendStatus(404);}
        else {res.send(ret);}
    }else {res.status(400).send({'status': 400});}
}
export function deleteArtist(req, res) {
    res.send(delete_artist(req.params.query));
}
