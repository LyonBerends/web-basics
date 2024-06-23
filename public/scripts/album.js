const host = window.location.origin.slice(0, window.location.origin.length - window.location.port.length) + "3000";
const album_id = window.location.pathname.slice(8);

const main_container = document.getElementById("left-div");
let song_container = document.getElementById("songs");

async function load_album() {
    console.log(`${host}/api/albums/${album_id}`);
    const album = await fetch(`${host}/api/albums/${album_id}`);
    const album_json = await album.json();

    const artist = await fetch(`${host}/api/artists/${album_json["artist_id"]}`);
    const artist_json = await artist.json();

    const songs = await fetch(`${host}/api/albums/songs/${album_id}`);
    const songs_json = await songs.json();

    const name = album_json.name;
    document.getElementById("name").innerText = name;

    const div = document.createElement("div");
    const image = document.createElement("img");
    const name_input = document.createElement("input");
    const submit_changes = document.createElement("button");
    const delete_button = document.createElement("button");

    submit_changes.innerText = "Submit changes";
    submit_changes.className = "solid-button";
    if(album_id === "0") {
        submit_changes.onclick = function() {
            newAlbum();
        }
    }
    else
    {
        submit_changes.onclick = function() {
            editAlbum();
        }
    }

    delete_button.innerText = "Delete";
    delete_button.className = "solid-button";
    delete_button.onclick = function () {
        deleteAlbum(album_id);
    };

    image.src = "../images/" + album_json["icon"];
    name_input.id = "name_input";
    name_input.type = "text";
    name_input.value = album_json["name"];

    div.appendChild(quickSpan(`Album ID: ${album_json["album_id"]}`))
    div.appendChild(image);
    div.appendChild(name_input);
    div.appendChild(submit_changes);
    div.appendChild(delete_button);
    main_container.appendChild(div);

    second_div = document.createElement("div");

    const release_date_input = document.createElement("input");
    release_date_input.id = "release_date_input";
    release_date_input.type = "text";
    release_date_input.value = album_json["release_date"];
    second_div.appendChild(quickSpan("Release Date"));
    second_div.appendChild(release_date_input);

    const icon_input = document.createElement("input");
    icon_input.id = "icon_input";
    icon_input.type = "text";
    icon_input.value = album_json["icon"];
    second_div.appendChild(quickSpan("ICON"));
    second_div.appendChild(icon_input);

    const artist_id_input = document.createElement("input");
    artist_id_input.id = "artist_id_input";
    artist_id_input.type = "text";
    artist_id_input.value = album_json["artist_id"];
    second_div.appendChild(quickSpan("Artist ID"));
    second_div.appendChild(artist_id_input);

    main_container.appendChild(second_div);

    let i = 0;
    for(song of songs_json){

        if(i % 8 === 0) {
            const div = document.createElement("div");
            div.className = "flex-container";
            div.id = "songs";
            document.body.appendChild(div);
            document.body.appendChild(document.createElement("br"));
            song_container = div;
        }
        const a = document.createElement("a");
        const div = document.createElement("div");
        const image = document.createElement("img");
        const span = document.createElement("span");

        a.href = "../songs/" + song["song_id"];
        image.src = "../images/" + song["icon"];
        span.innerText = song["name"];

        a.appendChild(span);
        div.appendChild(image);
        div.appendChild(a);

        song_container.appendChild(div);

        i++
    }
}

function getValue(elementId) {
    return document.getElementById(elementId).value;
}

function getAlbumData() {
    const name = getValue("name_input");
    const release_date = getValue("release_date_input");
    const icon = getValue("icon_input");
    const artist_id = getValue("artist_id_input");

    const data = {
        "name": name,
        "release_date": release_date,
        "icon": icon,
        "artist_id": artist_id
    };

    return data;
}

async function editAlbum()
{
    const data = getAlbumData();

    const request = await(fetch(`${host}/api/albums/${album_id}`, {method: "PUT", headers: {'Content-type': 'application/json'}, body: JSON.stringify(data)}));
    alert(await request.statusText);
}

async function newAlbum()
{
    const data = getAlbumData();

    const request = await(fetch(`${host}/api/albums`, {method: "POST", headers: {'Content-type': 'application/json'}, body: JSON.stringify(data)}));
    alert(await request.statusText);
}

function quickSpan(text)
{
    const span = document.createElement("span");
    span.innerText = text;
    return span;
}

async function deleteAlbum(album_id) {
    const request = await(fetch(`${host}/api/albums/${album_id}`, {method: "DELETE"}));
    alert(await request.statusText);
}

load_album();