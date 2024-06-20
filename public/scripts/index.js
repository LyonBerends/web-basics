const host = window.location.origin.slice(0, window.location.origin.length - window.location.port.length) + "3000";

const album_container = document.getElementById("albums");

async function get_recommended_albums() {
    let recommended_albums = await fetch(`${host}/api/albums/recommended`);
    let json = await recommended_albums.json();

    for (let album of json) {
        const div = document.createElement("div");
        const image = document.createElement("img");
        const span = document.createElement("span");

        image.src = "images/" + album["icon"];
        span.innerText = album["name"];

        div.appendChild(image);
        div.appendChild(span);

        album_container.appendChild(div);

        console.log(album);
    }
}

get_recommended_albums();