// const host = window.location.origin.slice(0, window.location.origin.length - window.location.port.length) + "3000";
const host = "http://127.0.0.1:3000";

let artists_container = document.getElementById("songs");

async function get_artists() {
    let artists = await fetch(`${host}/api/artists/all`);
    let json = await artists.json();

    let i = 0;
    for (let artist of json) {
        if(i % 8 === 0) {
            const div = document.createElement("div");
            div.className = "flex-container";
            div.id = "artists";
            document.body.appendChild(div);
            document.body.appendChild(document.createElement("br"));
            artists_container = div;
        }
        const a = document.createElement("a");
        const div = document.createElement("div");
        const image = document.createElement("img");
        const span = document.createElement("span");

        a.href = "./artist.html?id=" + artist["artist_id"];
        image.src = "./images/" + artist["icon"];
        span.innerText = artist["name"];

        a.appendChild(span);
        div.appendChild(image);
        div.appendChild(a);

        artists_container.appendChild(div);

        i++
    }
}

get_artists();