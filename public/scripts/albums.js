const host = window.location.origin.slice(0, window.location.origin.length - window.location.port.length) + "3000";

let album_container = document.getElementById("albums");

async function get_albums() {
    let recommended_albums = await fetch(`${host}/api/albums/all`);
    let json = await recommended_albums.json();

    let i = 0;
    for (let album of json) {
        if(i % 8 === 0) {
            const div = document.createElement("div");
            div.className = "flex-container";
            div.id = "albums";
            document.body.appendChild(div);
            document.body.appendChild(document.createElement("br"));
            album_container = div;
        }
        const div = document.createElement("div");
        const image = document.createElement("img");
        const span = document.createElement("span");

        image.src = "images/" + album["icon"];
        span.innerText = album["name"];

        div.appendChild(image);
        div.appendChild(span);

        album_container.appendChild(div);

        console.log(album);

        i++
    }
}

get_albums();