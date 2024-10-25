import express from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';
import getMovieData from '../scraper/Movie/getMovieData'



const app = express();

app.use(express.json())






const url = "https://www.berlin.de/kino/_bin/index.php"

const url1 = "https://www.berlin.de/kino/_bin/filmdetail.php/301608/"




app.use(getMovieData)




const port = 4000;
app.listen(port, (err?: Error) => {
    if (err) throw err;
    console.log(`Ready on http://localhost:${port}`);
});





export default app
