const imdb_button_selector = "#film-page-wrapper > div.col-17 > section.section.col-10.col-main > p > a:nth-child(1)";
const panel_selector = "#film-page-wrapper > div.col-17 > section.section.col-10.col-main > p";
const year_selector = "#featured-film-header > p > small > a";

const base_30nama = "https://30nama.com/movies/";
const base_digimoviez = "https://digimoviez.com/?s=";
const base_limetorrent = "https://www.limetorrents.info/search/movies/";

const movie_name_pattern = /(?<=^https:\/\/letterboxd.com\/film\/)(.*)(?=[\/])/;
const imdb_id_pattern = /(?<=^http:\/\/www.imdb.com\/title\/tt)(.*)(?=[\/])/;
const ends_with_year_pattern = /^(.+)[12][0-9]{3}$/;

main();

async function main() {
    console.log("30nama starts!");

    var year_field = document.querySelector(year_selector);
    var imdb_button = document.querySelector(imdb_button_selector);
    var imdb_link = imdb_button.getAttribute("href");
    var page_url = document.URL;

    var movie_name = page_url.match(movie_name_pattern)[1];
    var movie_year = year_field.textContent;
    var imdb_id = imdb_link.match(imdb_id_pattern)[1];

    if (!movie_name.match(ends_with_year_pattern)) {
        var url_digimoviez = `${base_digimoviez}${movie_name.replace('-', '+')}+${movie_year}`;
        var url_limetorrent = `${base_limetorrent}${movie_name}-${movie_year}/seeds/1/`;
    }
    else {
        var url_digimoviez = `${base_digimoviez}${movie_name.replace('-', '+')}`;
        var url_limetorrent = `${base_limetorrent}${movie_name}/seeds/1/`;
    }

    var url_30nama = `${base_30nama}${imdb_id}.html`;

    await build_service(url_30nama, url_digimoviez, url_limetorrent);

    console.log("30nama done!");
}

async function build_service(url_30nama, url_digimoviez, url_limetorrent) {
    while (!document.querySelector(panel_selector)) {
        await new Promise(r => setTimeout(r, 500));
    }
    var services_panel = document.querySelector(panel_selector);
    var atag = document.createElement('a');
    atag.href = url_30nama;
    atag.className = "micro-button track-event";
    var text = document.createTextNode("30Nama");
    atag.appendChild(text);
    services_panel.appendChild(atag);

    var atag = document.createElement('a');
    atag.href = url_digimoviez;
    atag.className = "micro-button track-event";
    var text = document.createTextNode("digimoviez");
    atag.appendChild(text);
    services_panel.appendChild(atag);

    var atag = document.createElement('a');
    atag.href = url_limetorrent;
    atag.className = "micro-button track-event";
    var text = document.createTextNode("limetorrent");
    atag.appendChild(text);
    services_panel.appendChild(atag);
}

