const Database = require('better-sqlite3');
const db = new Database('database.db', { verbose: console.log });

exports.get_artist = {
    from_id : function(id) {
        const stmt = db.prepare("SELECT * FROM Artist WHERE artist_id = ?");
        return stmt.get(id);
    },
    from_name : function(name) {
        const stmt = db.prepare("SELECT * FROM Artist WHERE name = ?");
        return stmt.get(name);
    },
    all : function() {
        return db.prepare("SELECT * FROM Artist").all();
    }
};

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
    all : function() {
        return db.prepare("SELECT * FROM Album").all();
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
    all : function() {
        return db.prepare("SELECT * FROM Song").all();
    }
}