import axios from 'axios';
import { Builder, By, Browser } from 'selenium-webdriver';
import { Router } from "express"
const router = Router()
import * as cheerio from 'cheerio';



const getUserTitle = async () => {
    const dataLocation = await getMovieLoction();
    const Filmdatenscraper: any[]= [];

    if (dataLocation.length > 0) {
        for (let x of dataLocation) {
            try {
                const html = await axios.get(`https://www.berlin.de/kino/_bin/trefferliste.php?freitext=&kino=&datum=&genre=&stadtteil=${x}&suche=1`);
                const htmlData = html.data;
                const $ = cheerio.load(htmlData);
                $('.modul-accordion', htmlData).each(function () {
                    const title = $(this).find('h2').text();
                    Filmdatenscraper.push(title);
                });
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }

    console.log('Filmdatenscraper', Filmdatenscraper);

    return Filmdatenscraper;
};

const getMovieLoction = async () => {
    let driver = await new Builder().forBrowser(Browser.FIREFOX).build();
    try {
        console.time("Webdriver Execution:");
        await driver.get(`https://www.berlin.de/kino/_bin/trefferliste.php?freitext=&kino=&datum=&genre=&stadtteil=Charlottenburg&suche=1`);
        let selectElement = await driver.findElement(By.id('kino_stadtteil'));
        let options = await selectElement.findElements(By.tagName('option'));

        const Location = [];
        for (let option of options) {
            let value = await option.getAttribute('value');
            Location.push(value);
        }

        console.log('Location:', Location);

        return Location;
    } finally {
        await driver.quit();
    }
};

getUserTitle()

export default router;