import axios from 'axios';
import { Router } from "express";
const router = Router();
import * as cheerio from 'cheerio';
const getUserEventCover = async () => {
    // const dataLocation = await getMovieLoction();
    const eventCover = [];
    const html = await axios.get("https://de.ra.co/events/de/berlin/techno", {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
            'Referer': 'https://de.ra.co/',
            'Accept-Language': 'en-US,en;q=0.9',
        }
    });
    if (html.data) {
        const data = html.data;
        const $ = cheerio.load(data);
        $('.Box-sc-abq4qd-0 Lazy__Wrapper-sc-11a2pmb-0 fBwvRH dRcsgM', data).each(function () {
            // const EventName = $(this).find('h2').text().trim();
            const img = $(this).find('img').attr('src');
            if (img) {
                eventCover.push(img);
            }
        });
    }
    console.log(eventCover);
};
getUserEventCover();
export default router;
