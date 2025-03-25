import express from 'express';
import getMovieData from '../scraper/Movie/getMovieData';
import RaData from '../scraper/Events/RaData';
const app = express();
app.use(express.json());
app.use(getMovieData);
app.use(RaData);
const port = 4000;
app.listen(port, (err) => {
    if (err)
        throw err;
    console.log(`Ready on http://localhost:${port}`);
});
export default app;
