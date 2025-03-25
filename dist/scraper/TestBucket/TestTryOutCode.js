import { Router } from "express";
const router = Router();
import * as cheerio from 'cheerio';
import axios from "axios";
import { BerlinKinoURL } from "../URL/Movie";
// const url = "https://www.berlin.de/kino/_bin/index.php"
// const url1 = "https://www.berlin.de/kino/_bin/filmdetail.php/301608/"
router.get('/', () => {
});
const html = await axios.get(BerlinKinoURL, {
    method: "GET"
});
const htmlData = html.data;
// console.log(html.data);
const $ = cheerio.load(htmlData);
// console.log($);
const article = [];
const foundImag = [];
const Description = [];
// const metag = $('.modul-teaser', htmlData).each(function() {
//     const title = $(this).find('h3').text().trim()
//     const img = $(this).find('img').attr('src')
//     const description = $(this).find('p').text().trim().concat()
//     article.push(title)
//     foundImag.push(img)
//     Description.push(description)
// })
// console.log('Description', Description);
// console.log("Array",article);
// console.log('Image:', foundImag);
const FilmtextScraper = [];
const Filmdatenscraper = [];
$('.list--horizontal', htmlData).each(function () {
    // const Filmdaten = $(this).find('h2').text().trim()
    const Filmtitle = $(this).find('dt').text();
    const Filmtext = $(this).find('dd').text();
    const description = $(this).find('p').text().trim();
    Filmdatenscraper.push(Filmtitle);
    FilmtextScraper.push(Filmtext);
    // foundImag.push(img)
    // Description.push(description)
});
console.log("Array", Filmdatenscraper);
console.log("Array", FilmtextScraper);
export default router;
