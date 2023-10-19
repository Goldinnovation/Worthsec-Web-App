const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')

const dev = process.env.Node_ENV !== 'production'
const app = next({dev})


const handle = app.getRequestHandler()
const eventRequest = require('./router/eventprompt')



app.prepare().then(() => {
    const server = express()

    server.use(bodyParser.json())

    // area for the API endpoints of Next

   
    server.use('/api/events',eventRequest)
    // server.use(`/api/events/${eventid}`, eventRequest)
   

    server.all('*', (req,res) => {
        return handle(req,res)

    })

    server.listen(3000, (err) => {
        if(err) throw err; 
        console.log('> Ready on http://localhost:3000')
    })
    
})
