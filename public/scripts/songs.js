const host = window.location.origin.slice(0, window.location.origin.length - window.location.port.length) + "3000";

let songs_container = document.getElementById("songs");

async function get_songs() {
    let songs = await fetch(`${host}/api/songs/all`);
    let json = await songs.json();

    let i = 0;
    for (let song of json) {
        if(i % 8 === 0) {
            const div = document.createElement("div");
            div.className = "flex-container";
            div.id = "songs";
            document.body.appendChild(div);
            document.body.appendChild(document.createElement("br"));
            songs_container = div;
        }
        const a = document.createElement("a");
        const div = document.createElement("div");
        const image = document.createElement("img");
        const span = document.createElement("span");

        a.href = "./songs/" + song["song_id"];
        image.src = "images/" + song["icon"];
        span.innerText = song["name"];

        a.appendChild(span);
        div.appendChild(image);
        div.appendChild(a);

        songs_container.appendChild(div);

        i++
    }
}

get_songs();