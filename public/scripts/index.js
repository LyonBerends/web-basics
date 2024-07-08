// const host = window.location.origin.slice(0, window.location.origin.length - window.location.port.length) + "3000";
const host = "http://127.0.0.1:3000"

let container = document.getElementById("albums");

async function get_recommended_albums() {
    const recommended_albums = await fetch(`${host}/api/albums?sort=recommended`);
    const recommended_albums_json = await recommended_albums.json();

    const recommended_artists = await fetch(`${host}/api/artists?sort=recommended`);
    const recommended_artists_json = await recommended_artists.json();

    for (let album of recommended_albums_json.albums) {
        const div = document.createElement("div");
        const image = document.createElement("img");
        const span = document.createElement("span");
        const a = document.createElement("a");

        image.src = "./images/" + album["icon"];
        span.innerText = album["name"];

        a.href = "./album.html?id=" + album["album_id"];

        a.appendChild(span);
        div.appendChild(image);
        div.appendChild(a);

        container.appendChild(div);
    }

    container = document.getElementById("artists");

    for (let artist of recommended_artists_json.artists) {
        const div = document.createElement("div");
        const image = document.createElement("img");
        const span = document.createElement("span");
        const a = document.createElement("a");

        image.src = "./images/" + artist["icon"];
        span.innerText = artist["name"];

        a.href = "./artist.html?id=" + artist["artist_id"];

        a.appendChild(span);
        div.appendChild(image);
        div.appendChild(a);

        container.appendChild(div);
    }
}

get_recommended_albums();