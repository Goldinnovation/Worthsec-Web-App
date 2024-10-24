import express from 'express';
import axios from 'axios';
import * as cheerio from 'cheerio';




const app = express();

app.use(express.json())


// app.use('/api/events', eventRequest);
// app.use('/api/signUpAcc', signupRequest);
// app.use('/api/login', loginReq);
// app.use('/api/login-token',LoginToken)
// app.use('/api/logout', logoutReq);
// app.use('/api/user', userReq);
// app.use('/user', isAuth);
// app.use('/api/search', searchUserReq);
// app.use('/api/userTouser', userFollowUser);
// app.use('/api/explore', exploreEvents);
// app.use('/api/favorEvent', userFavorEvent);
// app.use('/api/JoinEvent', userJoinEvent);
// app.use('/api/DisplayJoinedEvent', displayUserJoinEvent);
// app.use('/api/searchforclosefriends', searchForCloseFriend);
// app.use('/api/invite', inviteCloseFriends);
// app.use('/api/notifications', userNotifications);
// app.use('/api/userInterest', userInterestDatarouter)
// app.use('/api/eventCategory', userCategoryEventReq)
// app.use('/api/favorEventMobile', userFavorEventReqMob)




const url = "https://www.berlin.de/kino/_bin/index.php"

const url1 = "https://www.berlin.de/kino/_bin/filmdetail.php/301608/"



const html = await axios.get(url1, {
    method: "GET"
})

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

// console.log('Description', Description);
// console.log("Array",article);
// console.log('Image:', foundImag);
const FilmtextScraper: any = []
const Filmdatenscraper: any = []

 $('.list--horizontal', htmlData).each(function() {
    // const Filmdaten = $(this).find('h2').text().trim()
    const Filmtitle = $(this).find('dt').text()
    const Filmtext = $(this).find('dd').text()

    const description = $(this).find('p').text().trim()
    Filmdatenscraper.push(Filmtitle)
    FilmtextScraper.push(Filmtext)

    // foundImag.push(img)
    // Description.push(description)
   


})
console.log("Array",Filmdatenscraper);
console.log("Array",FilmtextScraper);


const port = 4000;
app.listen(port, (err?: Error) => {
    if (err) throw err;
    console.log(`Ready on http://localhost:${port}`);
});





export default app
