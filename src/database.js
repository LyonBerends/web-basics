const Database = require('better-sqlite3');
const db = new Database('database.db', { verbose: console.log });

exports.get_artist = {
    from_id : function(id) {
        const stmt = db.prepare("SELECT * FROM Artist WHERE artist_id = ?");
        const artist = stmt.get(id);
        return artist;
    },
    from_name : function(name) {
        const stmt = db.prepare("SELECT * FROM Artist WHERE name = ?");
        const artist = stmt.get(name);
        return artist;
    },
    all : function() {
        const stmt = db.prepare("SELECT * FROM Artist");
        const artists = stmt.all();
        return artists;
    }
};

exports.new_artist = function(name, icon="missing.png") {
    try {
        const stmt = db.prepare("INSERT INTO Artist (name, icon) VALUES (?, ?)");
        stmt.run(name, icon);
        return 200;
    }
    catch (e) {
        return e;
    }
}

exports.get_album = {
    from_id : function(id) {
        const stmt = db.prepare("SELECT * FROM Album WHERE album_id = ?");
        const album = stmt.get(id);
        return album;
    },
    from_name : function(name) {
        const stmt = db.prepare("SELECT * FROM Album WHERE name = ?");
        const album = stmt.get(name);
        return album;
    },
    from_artist_id : function(artist_id) {
        const stmt = db.prepare("SELECT * FROM Album WHERE artist_id = ?");
        const albums = stmt.all(artist_id);
        return albums;
    }
}

exports.get_song = {
    from_id : function(id) {
        const stmt = db.prepare("SELECT * FROM Song WHERE song_id = ?");
        const song = stmt.get(id);
        return song;
    },
    from_name : function(name) {
        const stmt = db.prepare("SELECT * FROM Song WHERE name = ?");
        const song = stmt.get(name);
        return song;
    },
    from_album_id : function(album_id) {
        const stmt = db.prepare("SELECT * FROM Song WHERE album_id = ?");
        const songs = stmt.all(album_id);
        return songs;
    }
}