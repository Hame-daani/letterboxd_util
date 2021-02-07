const imdb_button_selector = "#film-page-wrapper > div.col-17 > section.section.col-10.col-main > p > a:nth-child(1)";
const panel_selector = "#film-page-wrapper > div.col-17 > section.section.col-10.col-main > p";
const year_selector = "#featured-film-header > p > small > a";
const services_panel_selector = "#watch > section";

const base_30nama = "https://30nama.com/movies/";
const base_digimoviez = "https://digimoviez.com/?s=";
const base_limetorrent = "https://www.limetorrents.info/search/movies/";
const base_torrentgalaxy = "https://torrentgalaxy.to/torrents.php?search=";
const base_1337x = "https://1337x.to/search/";

const icon_30nama = "https://30nama.com/wp-content/themes/wdmovie/assets/images/favicon.png";
const icon_digimoviez = "https://digimoviez.com/wp-content/uploads/2020/12/favicon.png";
const icon_limetorrent = "https://www.limetorrents.info/favicon.ico";
const icon_torrentgalaxy = "https://torrentgalaxy.to/common/favicon/favicon.ico";
const icon_1337x = "https://1337x.to/favicon.ico";

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

    //todo maybe better digimoviez?
    if (!movie_name.match(ends_with_year_pattern)) {
        var url_digimoviez = `${base_digimoviez}${movie_name.replace(/-/g, '+')}+${movie_year}`;
        var url_1337x = `${base_1337x}${movie_name.replace(/-/g, '+')}+${movie_year}/1/`;
        var url_limetorrent = `${base_limetorrent}${movie_name}-${movie_year}/seeds/1/`;
    }
    else {
        var url_digimoviez = `${base_digimoviez}${movie_name.replace(/-/g, '+')}`;
        var url_1337x = `${base_1337x}${movie_name.replace(/-/g, '+')}/1/`;
        var url_limetorrent = `${base_limetorrent}${movie_name}/seeds/1/`;
    }

    var url_30nama = `${base_30nama}${imdb_id}.html`;
    var url_torrentgalaxy = `${base_torrentgalaxy}tt${imdb_id}&sort=seeders&order=desc`;

    await build_service(url_30nama, url_digimoviez, url_limetorrent, url_torrentgalaxy, url_1337x);

    console.log("30nama done!");
}

async function build_service(url_30nama, url_digimoviez, url_limetorrent, url_torrentgalaxy, url_1337x) {
    while (!document.querySelector(services_panel_selector)) {
        await new Promise(r => setTimeout(r, 500));
    }
    console.log("start building service.");

    var services_panel = document.querySelector(services_panel_selector);

    while (services_panel.firstChild) {
        services_panel.removeChild(services_panel.lastChild);
    }

    add_service(url_30nama, "30Nama", icon_30nama, services_panel);
    add_service(url_digimoviez, "Digimoviez", icon_digimoviez, services_panel);
    add_service(url_limetorrent, "Lime Torrent", icon_limetorrent, services_panel);
    add_service(url_torrentgalaxy, "Torrent Galaxy", icon_torrentgalaxy, services_panel);
    add_service(url_1337x, "1337x Torrent", icon_1337x, services_panel);

}

function add_service(service_url, service_name, icon_url, services_panel) {
    console.log(`add ${service_name} service.`);

    var ptag = document.createElement('p');
    ptag.className = "service";
    ptag.id = `${service_name} panel`

    var atag = document.createElement('a');
    atag.href = service_url;
    atag.className = "label track-event tooltip";

    var brandspan = document.createElement('span');
    brandspan.className = "brand";

    var img = document.createElement('img');
    img.src = icon_url;

    var titlespan = document.createElement('span');
    titlespan.className = "title";

    var namespan = document.createElement('span');
    namespan.className = "name";

    var text = document.createTextNode(service_name);

    namespan.appendChild(text);
    titlespan.appendChild(namespan);
    brandspan.appendChild(img);
    atag.appendChild(brandspan);
    atag.appendChild(titlespan);
    ptag.appendChild(atag);

    services_panel.appendChild(ptag);
}

