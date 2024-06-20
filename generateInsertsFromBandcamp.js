var artist_id = 17;
var album_id = 16;

let out = "";

var artist_name = document.getElementById("name-section").children[1].innerText.slice(3);
var album_name = document.getElementById("name-section").children[0].innerText;
// var release_date = document.getElementById("trackInfoInner").children[4].innerText.slice(9);
var release_date = "";

out += `INSERT INTO Artist (name, icon) VALUES ("${artist_name}", "${artist_name.toLowerCase().replaceAll(" ", "")}.jpg")\n`;
out += `INSERT INTO Album (name, release_date, icon, artist_id) VALUES ("${album_name}", "${release_date}", "${album_name.toLowerCase().replaceAll(" ", "")}.jpg", ${artist_id})\n`;

var tracklist = document.getElementById("track_table").children[0];

for(let i = 0; i < tracklist.childElementCount; i++)
{
    const track = tracklist.children[i];
    // if(track.className.startsWith("track_row_view"))
    // {
    //
    // }

    const name = track.children[2].children[0].children[0].innerText;
    const duration = track.children[2].children[0].children[1].innerText;
    if(i == 0)
    {
        out += `INSERT INTO Song (name, duration, album_id, icon) VALUES ("${name}", "${duration}", ${album_id}, "${album_name.toLowerCase().replaceAll(" ", "")}.jpg")\n`;
    }
    else
    {
        out += `, ("${name}", "${duration}", ${album_id}, "${album_name.toLowerCase().replaceAll(" ", "")}.jpg")\n`;
    }
}

console.log(out);