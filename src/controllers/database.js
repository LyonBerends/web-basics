import Database from 'better-sqlite3';
const db = new Database('../database.db');

import queries_json from '../create-queries.json' assert {type: 'json'};

const start_queries = [
    {
        "check": "SELECT * FROM Artist WHERE artist_id = 0",
        "create": function() {
            let stmt = db.prepare("INSERT INTO Artist (artist_id, name, icon) VALUES (?, ?, ?)");
            stmt.run(0, "New Artist", "new.png");
        }
    },
    {
        "check": "SELECT * FROM Album WHERE album_id = 0",
        "create": function() {
            let stmt = db.prepare("INSERT INTO Album (album_id, name, release_date, icon, artist_id) VALUES (?, ?, ?, ?, ?)");
            stmt.run(0, "New Album", "New Release Date", "new.png", 0);
        }
    },
    {
        "check": "SELECT * FROM Song WHERE song_id = 0",
        "create": function() {
            let stmt = db.prepare("INSERT INTO Song (song_id, name, duration, lyrics, icon, album_id) VALUES (?, ?, ?, ?, ?, ?)");
            stmt.run(0, "New Song", "New Duration", "New Lyrics", "new.png", 0);
        }
    }
]

function startDatabase() {
    queries_json.queries.forEach(json => {
        let stmt = db.prepare(json.query);
        let info = stmt.run();
        console.log(`Lines changed after running start query: ${info.changes}`);
    });

    start_queries.forEach(query => {
        let stmt = db.prepare(query.check);
        if(stmt.get() === undefined) {
            query.create();
        }
    })
}

export {db, startDatabase};