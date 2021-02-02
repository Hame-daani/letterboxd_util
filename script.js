const imdb_button_selector = "#film-page-wrapper > div.col-17 > section.section.col-10.col-main > p > a:nth-child(1)";
const panel_selector = "#film-page-wrapper > div.col-17 > section.section.col-10.col-main > p";

const base_url = "https://30nama.com/movies/";
const movie_name_pattern = /(?<=^https:\/\/letterboxd.com\/film\/)(.*)(?=[\/])/;
const imdb_id_pattern = /(?<=^http:\/\/www.imdb.com\/title\/tt)(.*)(?=[\/])/;

main();

async function main() {
    console.log("30nama starts!");

    var imdb_button = document.querySelector(imdb_button_selector);
    var imdb_link = imdb_button.getAttribute("href");
    var page_url = document.URL;

    var movie_name = page_url.match(movie_name_pattern)[1];
    var imdb_id = imdb_link.match(imdb_id_pattern)[1];

    var final_url = `${base_url}${imdb_id}-${movie_name}.html`;

    await build_service(final_url);

    console.log("30nama done!");
}

async function build_service(movie_url) {
    while (!document.querySelector(panel_selector)) {
        await new Promise(r => setTimeout(r, 500));
    }
    var services_panel = document.querySelector(panel_selector);
    var atag = document.createElement('a');
    atag.href = movie_url;
    atag.className = "micro-button track-event";
    // atag.target = "_blank";
    var text = document.createTextNode("30Nama");
    atag.appendChild(text);
    services_panel.appendChild(atag);
}

