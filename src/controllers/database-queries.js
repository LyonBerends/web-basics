// const Database = require('better-sqlite3');
import {db} from './database.js';

const new_artist = function(name, icon="missing.png") {
    if(name == null || icon == null) {return {'status': 400}}
    try {
        const stmt = db.prepare("INSERT INTO Artist (name, icon) VALUES (?, ?)");
        stmt.run(name, icon);
        return db.prepare("SELECT * FROM Artist ORDER BY artist_id DESC limit 1").get();
    }
    catch (e) {
        return {'status': 500};
    }
}

const new_album = function(name, artist_id, icon="missing.png", release_date="null") {
    if(name == null || artist_id == null) {return {'status': 400}}
    try {
        const stmt = db.prepare("INSERT INTO Album (artist_id, name, icon, release_date) VALUES (?, ?, ?, ?)");
        stmt.run(artist_id, name, icon, release_date);
        return db.prepare("SELECT * FROM Album ORDER BY album_id DESC limit 1").get();
    }
    catch (e) {
        return {'status': 500};
    }
}

const new_song = function(name, duration, album_id, lyrics = "null", icon="missing.png") {
    if(name == null || duration == null || album_id == null) {return {'status': 400}}
    try {
        const stmt = db.prepare("INSERT INTO Song (name, duration, album_id, lyrics, icon) VALUES (?, ?, ?, ?, ?)");
        stmt.run(name, duration, album_id, lyrics, icon);
        return db.prepare("SELECT * FROM Song ORDER BY song_id DESC limit 1").get();
    }
    catch (e) {
        return {'status': 500};
    }
}

const edit_artist = function(id, name, icon=null) {
    if(db.prepare("SELECT count(*) count FROM Artist WHERE artist_id = ?").get(id)["count"] === 0) {return {'status': 404};}
    if(icon === null) {
        db.prepare("UPDATE Artist SET name = ? WHERE artist_id = ?").run(name, id);
    } else {
        db.prepare("UPDATE Artist SET name = ?, icon = ? WHERE artist_id = ?").run(name, icon, id);
    }
    return db.prepare("SELECT * FROM Artist WHERE artist_id = ?").get(id);
}

const edit_album = function(id, name, release_date=null, icon=null, artist_id=null) {
    if(db.prepare("SELECT count(*) count FROM Album WHERE album_id = ?").get(id)["count"] === 0) {return {'status': 404};}
    if(release_date === null) {
        db.prepare("UPDATE Album SET name = ? WHERE album_id = ?").run(name, id);
    }
    else if(icon === null) {
        db.prepare("UPDATE Album SET name = ?, release_date = ? WHERE artist_id = ?").run(name, release_date, id);
    }
    else if(artist_id === null) {
        db.prepare("UPDATE Album SET name = ?, release_date = ?, icon = ? WHERE artist_id = ?").run(name, release_date, icon, id);
    }
    else {
        db.prepare("UPDATE Album SET name = ?, release_date = ?, icon = ?, artist_id = ? WHERE album_id = ?").run(name, release_date, icon, artist_id, id);
    }
    return db.prepare("SELECT * FROM Artist WHERE artist_id = ?").get(id);
}

const edit_song = function(id, name, lyrics=null, duration=null, icon=null, album_id=null) {
    if(db.prepare("SELECT count(*) count FROM Song WHERE song_id = ?").get(id)["count"] === 0) {return {'status': 404};}
    if(lyrics === null) {
        db.prepare("UPDATE Song SET name = ? WHERE song_id = ?").run(name, id);
    }
    else if(duration === null) {
        db.prepare("UPDATE SONG SET name = ?, lyrics = ? WHERE song_id = ?").run(name, lyrics, id);
    }
    else if(icon === null) {
        db.prepare("UPDATE SONG SET name = ?, lyrics = ?, duration = ? WHERE song_id = ?").run(name, lyrics, duration, id);
    }
    else if(album_id === null) {
        db.prepare("UPDATE SONG SET name = ?, lyrics = ?, duration = ?, icon = ? WHERE song_id = ?").run(name, lyrics, duration, icon, id);
    }
    else {
        db.prepare("UPDATE SONG SET name = ?, lyrics = ?, duration = ?, icon = ?, album_id = ? WHERE song_id = ?").run(name, lyrics, duration, icon, album_id, id);
    }
    return db.prepare("SELECT * FROM Artist WHERE artist_id = ?").get(id);
}

const delete_artist = function(id) {
    if(db.prepare("SELECT count(*) count FROM Artist WHERE artist_id = ?").get(id)["count"] === 0) {return 404;}
    try {
        const stmt = db.prepare("DELETE FROM Artist WHERE artist_id = ?");
        stmt.run(id);
    }
    catch(e) {
        return {'status': 500}
    }
    return {'status': 200}
}

const delete_album = function(id) {
    if(db.prepare("SELECT count(*) count FROM Album WHERE album_id = ?").get(id)["count"] === 0) {return 404;}
    try {
        const stmt = db.prepare("DELETE FROM Album WHERE album_id = ?");
        stmt.run(id);
    }
    catch(e) {
        return {'status': 500}
    }
    return {'status': 200}
}

const delete_song = function(id) {
    if(db.prepare("SELECT count(*) count FROM Song WHERE song_id = ?").get(id)["count"] === 0) {return 404;}
    try {
        const stmt = db.prepare("DELETE FROM Song WHERE song_id = ?");
        stmt.run(id);
    }
    catch(e) {
        return {'status': 500}
    }
    return {'status': 200}
}

const get_artist = {
    from_id : function(id) {
        const stmt = db.prepare("SELECT * FROM Artist WHERE artist_id = ?");
        const artist = stmt.get(id);
        if(artist == null) {
            return {"status": 404};
        } else {
            artist.status = 200;
            return artist;
        }
    },
    from_name : function(name) {
        const stmt = db.prepare("SELECT * FROM Artist WHERE name = ?");
        return stmt.get(name);
    },
    all : function(limit=999) {
        return db.prepare(`SELECT * FROM Artist LIMIT ${limit}`).all();
    }
};

const get_album = {
    from_id : function(id) {
        const stmt = db.prepare("SELECT * FROM Album WHERE album_id = ?");
        const album = stmt.get(id);
        if(album == null) {
            return {"status": 404};
        } else {
            album.status = 200;
            return album;
        }
    },
    from_name : function(name) {
        const stmt = db.prepare("SELECT * FROM Album WHERE name = ?");
        return stmt.get(name);
    },
    from_artist_id : function(artist_id) {
        const stmt = db.prepare("SELECT * FROM Album WHERE artist_id = ?");
        return stmt.all(artist_id);
    },
    all : function(limit=999) {
        return db.prepare(`SELECT * FROM Album LIMIT ${limit}`).all();
    }
}

const get_song = {
    from_id : function(id) {
        const stmt = db.prepare("SELECT * FROM Song WHERE song_id = ?");
        const song = stmt.get(id);
        if(song == null) {
            return {"status": 404};
        } else {
            song.status = 200;
            return song;
        }
    },
    from_name : function(name) {
        const stmt = db.prepare("SELECT * FROM Song WHERE name = ?");
        return stmt.get(name);
    },
    from_album_id : function(album_id) {
        const stmt = db.prepare("SELECT * FROM Song WHERE album_id = ?");
        return stmt.all(album_id);
    },
    all : function(limit=999) {
        return db.prepare(`SELECT * FROM Song LIMIT ${limit}`).all();
    }
}

export {get_artist, get_album, get_song, delete_album, delete_song, delete_artist, edit_album, edit_song, edit_artist, new_album, new_song, new_artist};
