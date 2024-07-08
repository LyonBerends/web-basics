// const host = window.location.origin.slice(0, window.location.origin.length - window.location.port.length) + "3000";
const host = "http://127.0.0.1:3000";
const song_id = (new URL(window.location)).searchParams.get("id");

const main_container = document.getElementById("left-div");

async function load_album() {
    const song = await fetch(`${host}/api/song/${song_id}`);
    var song_json = await song.json();

    if(song_json.status === 404) {
        song_json = {
            "song_id":song_id,
            "name":"404 Song Not Found",
            "duration":"4:04",
            "lyrics":"404 Not Found",
            "icon":"404.png",
            "album_id":0,
            "status":404
        }
    }

    const name = song_json.name;
    document.getElementById("name").innerText = name;

    const div = document.createElement("div");
    const image = document.createElement("img");
    const name_input = document.createElement("input");
    const submit_changes = document.createElement("button");
    const delete_button = document.createElement("button");

    submit_changes.innerText = "Submit changes";
    submit_changes.className = "solid-button";
    if(song_id === "0")
    {
        submit_changes.onclick = function() {
            newSong();
        }
    }
    else
    {
        submit_changes.onclick = function() {
            editSong();
        }
    }

    delete_button.innerText = "Delete";
    delete_button.className = "solid-button";
    delete_button.onclick = function () {
        deleteSong();
    };

    image.src = "./images/" + song_json["icon"];
    name_input.id = "name_input";
    name_input.type = "text";
    name_input.value = song_json["name"];


    div.appendChild(image);
    div.appendChild(name_input);
    div.appendChild(submit_changes);
    div.appendChild(delete_button);
    main_container.appendChild(div);

    second_div = document.createElement("div");
    const duration = document.createElement("input");
    duration.id = "duration_input";
    duration.type = "text";
    duration.value = song_json["duration"];
    second_div.appendChild(quickSpan("Duration:"))
    second_div.appendChild(duration);

    const lyrics = document.createElement("input");
    lyrics.id = "lyrics_input";
    lyrics.type = "text";
    lyrics.value = song_json["lyrics"];
    second_div.appendChild(quickSpan("Lyrics:"))
    second_div.appendChild(lyrics);

    const album_id_input = document.createElement("input");
    album_id_input.id = "album_id_input";
    album_id_input.type = "text";
    album_id_input.value = song_json["album_id"];
    second_div.appendChild(quickSpan("Album ID:"))
    second_div.appendChild(album_id_input);

    const icon_input = document.createElement("input");
    icon_input.id = "icon_input";
    icon_input.type = "text";
    icon_input.value = song_json["icon"];
    second_div.appendChild(quickSpan("ICON:"))
    second_div.appendChild(icon_input);

    main_container.appendChild(second_div);
}

function quickSpan(text)
{
    const span = document.createElement("span");
    span.innerText = text;
    return span;
}

async function deleteSong() {
    const request = await(fetch(`${host}/api/song/${song_id}`, {method: "DELETE"}));
    alert(await request.statusText);
}

function getSongData() {
    const name = getValue("name_input");
    const duration = getValue("duration_input");
    const lyrics = getValue("lyrics_input");
    const album_id = getValue("album_id_input");
    const icon = getValue("icon_input");

    const data = {
        "name": name,
        "duration": duration,
        "lyrics": lyrics,
        "album_id": album_id,
        "icon": icon
    };

    return data;
}

function getValue(elementId) {
    return document.getElementById(elementId).value;
}

async function editSong()
{
    const data = getSongData();

    const request = await(fetch(`${host}/api/song/${song_id}`, {method: "PUT", headers: {'Content-type': 'application/json'}, body: JSON.stringify(data)}));
    alert(await request.statusText);
}

async function newSong()
{
    const data = getSongData();

    const request = await(fetch(`${host}/api/song`, {method: "POST", headers: {'Content-type': 'application/json'}, body: JSON.stringify(data)}));

    if(await request.status === 500)
    {
        alert(await request.body);
    }
    else
    {
        alert(await request.statusText);
    }
}

load_album();