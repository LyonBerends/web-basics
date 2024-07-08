// const host = window.location.origin.slice(0, window.location.origin.length - window.location.port.length) + "3000";
const host = "http://127.0.0.1:3000";
const artist_id = (new URL(window.location)).searchParams.get("id");

const main_container = document.getElementById("left-div");
let song_container = document.getElementById("songs");

async function load_artist() {
    const artist = await fetch(`${host}/api/artist/${artist_id}`);
    var artist_json = await artist.json();

    if(artist_json.status === 404) {
        artist_json = {
            "artist_id": artist_id,
            "name":"404 Artist Not Found",
            "icon":"404.png",
            "status": 404
        }
    }

    const albums = await fetch(`${host}/api/artist/albums/${artist_id}`);
    const albums_json = await albums.json();

    const name = artist_json.name;
    document.getElementById("name").innerText = name;

    const div = document.createElement("div");
    const image = document.createElement("img");
    const name_input = document.createElement("input");
    const submit_changes = document.createElement("button");
    const delete_button = document.createElement("button");

    submit_changes.innerText = "Submit changes";
    submit_changes.className = "solid-button";
    if(artist_id === "0") {
        submit_changes.onclick = function() {
            newArtist();
        }
    }
    else {
        submit_changes.onclick = function() {
            editArtist();
        }
    }

    delete_button.innerText = "Delete";
    delete_button.className = "solid-button";
    delete_button.onclick = function () {
        deleteArtist(artist_id);
    };

    image.src = "./images/" + artist_json["icon"];
    name_input.id = "name_input";
    name_input.type = "text";
    name_input.value = artist_json["name"];


    div.appendChild(quickSpan(`Artist ID: ${artist_json.artist_id}`));

    div.appendChild(image);
    div.appendChild(name_input);
    div.appendChild(submit_changes);
    div.appendChild(delete_button);
    main_container.appendChild(div);

    second_div = document.createElement("div");


    const icon_input = document.createElement("input");
    icon_input.id = "icon_input";
    icon_input.type = "text";
    icon_input.value = artist_json["icon"];
    second_div.appendChild(quickSpan("ICON"));
    second_div.appendChild(icon_input);

    main_container.appendChild(second_div);

    let i = 0;
    for(album of albums_json){

        if(i % 8 === 0) {
            const div = document.createElement("div");
            div.className = "flex-container";
            div.id = "albums";
            document.body.appendChild(div);
            document.body.appendChild(document.createElement("br"));
            song_container = div;
        }
        const a = document.createElement("a");
        const div = document.createElement("div");
        const image = document.createElement("img");
        const span = document.createElement("span");

        a.href = "./album.html?id=" + album["album_id"];
        image.src = "./images/" + album["icon"];
        span.innerText = album["name"];

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

function getArtistData()
{
    const name = getValue("name_input");
    const icon = getValue("icon_input");

    const data = {
        "name": name,
        "icon": icon
    };

    return data;
}

async function editArtist()
{
    const data = getArtistData();

    const request = await(fetch(`${host}/api/artist/${artist_id}`, {method: "PUT", headers: {'Content-type': 'application/json'}, body: JSON.stringify(data)}));
    alert(await request.statusText);
}

async function newArtist() {
    const data = getArtistData();

    const request = await(fetch(`${host}/api/artist`, {method: "POST", headers: {'Content-type': 'application/json'}, body: JSON.stringify(data)}));
    alert(await request.statusText);
}

function quickSpan(text)
{
    const span = document.createElement("span");
    span.innerText = text;
    return span;
}

async function deleteArtist(album_id) {
    const request = await(fetch(`${host}/api/artist/${album_id}`, {method: "DELETE"}));
    alert(await request.statusText);
}

load_artist();