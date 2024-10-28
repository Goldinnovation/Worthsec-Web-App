import axios from 'axios';
import { Builder, By, Browser } from 'selenium-webdriver';
import { Router } from "express"
const router = Router()
import * as cheerio from 'cheerio';



const getUserTitle = async () => {
    // const dataLocation = await getMovieLoction();
    const dataLocation =   ['Charlottenburg','Friedrichshain','Neukölln', 'Schöneberg','Wilmersdorf', 'Wedding',]
    const locationData: {[key: string]: string[]}= {}

 

    const promises = dataLocation.map(async(location: string) => {

        try{
            const html =  await axios.get(`https://www.berlin.de/kino/_bin/trefferliste.php?freitext=&kino=&datum=&genre=&stadtteil=${location}&suche=1`);
            if(html.data){
                const data = html.data
                const $ = cheerio.load(data)
                const kinos: string[]= [];
                

                $('.modul-accordion', data).each(function () {
                    const kinoNames = $(this).find('h2').text().trim();
                    const kinoSpecificTitle = kinoNames.replace(`/${location}/g`, "").trim()
                    console.log('kinoSpecificTitle:', kinoSpecificTitle);
                    if(kinoNames){
                        kinos.push(kinoSpecificTitle);
                    }
                })

                locationData[location] = kinos
            }


        }catch(error){
             console.error('Error on fetching data for specfific location:', error);
        }
                       
    })

    await Promise.all(promises).then(function(){
        console.log(locationData);
        console.log(`Number of keys: ${Object.keys(locationData).length}`);

        const specfificLocation = locationData["Neukölln"]
        console.log('SpecificLocation:', specfificLocation);
    })


    return locationData;
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

const getMovieTitle = async () => {
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

// getUserTitle()

export default router;