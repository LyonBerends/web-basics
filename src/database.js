const Database = require('better-sqlite3');
const db = new Database('database.db', { verbose: console.log });

exports.new_artist = function(name, icon="missing.png") {
    try {
        const stmt = db.prepare("INSERT INTO Artist (name, icon) VALUES (?, ?)");
        stmt.run(name, icon);
        return db.prepare("SELECT * FROM Artist ORDER BY artist_id DESC limit 1").get();
    }
    catch (e) {
        return e;
    }
}

exports.new_album = function(name, artist_id, icon="missing.png") {
    try {
        const stmt = db.prepare("INSERT INTO Album (artist_id, name, icon) VALUES (?, ?, ?)");
        stmt.run(artist_id, name, icon);
        return db.prepare("SELECT * FROM Album ORDER BY album_id DESC limit 1").get();
    }
    catch (e) {
        return e;
    }
}

exports.new_song = function(name, duration, album_id, lyrics = "null", icon="missing.png") {
    try {
        const stmt = db.prepare("INSERT INTO Song (name, duration, album_id, lyrics, icon) VALUES (?, ?, ?, ?, ?)");
        stmt.run(name, duration, album_id, lyrics, icon);
        return db.prepare("SELECT * FROM Song ORDER BY song_id DESC limit 1").get();
    }
    catch (e) {
        return e;
    }
}

exports.edit_artist = function(id, name, icon=null) {
    if(db.prepare("SELECT count(*) count FROM Artist WHERE artist_id = ?").get(id)["count"] === 0) {return 404;}
    if(icon === null) {
        db.prepare("UPDATE Artist SET name = ? WHERE artist_id = ?").run(name, id);
    } else {
        db.prepare("UPDATE Artist SET name = ?, icon = ? WHERE artist_id = ?").run(name, icon, id);
    }
    return db.prepare("SELECT * FROM Artist WHERE artist_id = ?").get(id);
}

exports.edit_album = function(id, name, release_date=null, icon=null, artist_id=null) {
    if(db.prepare("SELECT count(*) count FROM Album WHERE album_id = ?").get(id)["count"] === 0) {return 404;}
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

exports.edit_song = function(id, name, lyrics=null, duration=null, icon=null, album_id=null) {
    if(db.prepare("SELECT count(*) count FROM Song WHERE song_id = ?").get(id)["count"] === 0) {return 404;}
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

exports.delete_artist = function(id) {
    if(db.prepare("SELECT count(*) count FROM Artist WHERE artist_id = ?").get(id)["count"] === 0) {return 404;}
    const stmt = db.prepare("DELETE FROM Artist WHERE artist_id = ?");
    stmt.run(id);
    return 200;
}

exports.delete_album = function(id) {
    if(db.prepare("SELECT count(*) count FROM Album WHERE album_id = ?").get(id)["count"] === 0) {return 404;}
    const stmt = db.prepare("DELETE FROM Album WHERE album_id = ?");
    stmt.run(id);
    return 200;
}

exports.delete_song = function(id) {
    if(db.prepare("SELECT count(*) count FROM Song WHERE song_id = ?").get(id)["count"] === 0) {return 404;}
    const stmt = db.prepare("DELETE FROM Song WHERE song_id = ?");
    stmt.run(id);
    return 200;
}

exports.get_artist = {
    from_id : function(id) {
        const stmt = db.prepare("SELECT * FROM Artist WHERE artist_id = ?");
        return stmt.get(id);
    },
    from_name : function(name) {
        const stmt = db.prepare("SELECT * FROM Artist WHERE name = ?");
        return stmt.get(name);
    },
    all : function(limit=999) {
        return db.prepare(`SELECT * FROM Artist LIMIT ${limit}`).all();
    }
};

exports.get_album = {
    from_id : function(id) {
        const stmt = db.prepare("SELECT * FROM Album WHERE album_id = ?");
        return stmt.get(id);
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

exports.get_song = {
    from_id : function(id) {
        const stmt = db.prepare("SELECT * FROM Song WHERE song_id = ?");
        return stmt.get(id);
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