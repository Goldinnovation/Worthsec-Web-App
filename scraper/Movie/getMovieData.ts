import { Router, response } from "express"
const router = Router()
import * as cheerio from 'cheerio';
import axios from "axios";
import { BerlinKinoURL } from "../URL/Movie";

// const url = "https://www.berlin.de/kino/_bin/index.php"

// const url1 = "https://www.berlin.de/kino/_bin/filmdetail.php/301608/"




router.get('/', () => {

})



const html = await axios.get(BerlinKinoURL, {
    method: "GET"
})
.then()
.catch()

const htmlData = html.data
// console.log(html.data);


const $ = cheerio.load(htmlData)
// console.log($);
const article: any = []
const foundImag: any = []
const Description: any = []
// const metag = $('.modul-teaser', htmlData).each(function() {
//     const title = $(this).find('h3').text().trim()
//     const img = $(this).find('img').attr('src')
//     const description = $(this).find('p').text().trim().concat()
//     article.push(title)
//     foundImag.push(img)
//     Description.push(description)

// })




export default router