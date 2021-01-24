require('dotenv').config()

const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const mongoose = require('mongoose')

let Parser = require('rss-parser');
let parser = new Parser();
const RSSUrl = require('./dbmodel/RSSUrl')
const RSSItems = require('./dbmodel/RSSItems')
const Users = require('./dbmodel/Users')

const {router} = require('./routes/rssUrlRouter');
const userRouter = require('./routes/users');
const RSSToUsers = require('./dbmodel/RSSToUsers');
const port = process.env.PORT || 5000;
var bodyParser = require('body-parser')

/**
 * database Connection
 */
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database...'))



app.use(cors())
// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// // create a GET route
app.get('/express_backend', (req, res) => {


    // http.get('http://www.meteoromania.ro/anm2/avertizari-rss.php', function(response) {
    //     response.on("data", function(chunk) {
    //         console.log("BODY: " + chunk);
    //       });
    // });

//     (async () => {
// // http://www.meteoromania.ro/anm2/avertizari-rss.php
//     let feed = await parser.parseURL('http://www.meteoromania.ro/anm2/avertizari-rss.php');
//     console.log(feed.title);
//     let content = '';
//     feed.items.forEach(item => {
//         content += item.content
//     });
//     console.log(content)
//     res.send(content)
//     })();

});

app.use('/api/rssUrl', router)
app.use('/api/user', userRouter)


// const addUrlToUser = async (url, user) => {
//     const newItem = new RSSToUsers({
//         userId: user._id,
//         rssUrlId: url._id
//     })

//     try {
//         const newItemAdded = await newItem.save()
//         console.log('Added new item in db: ', newItemAdded)
//     } catch (err) {
//         console.log(err.message)
//     }
// }



var syncJob = setInterval(function() {
    (async () => {
        // http://www.meteoromania.ro/anm2/avertizari-rss.php
        //https://www.reddit.com/.rss
            // let stff = http.get('http://www.meteoromania.ro/anm/prognoza-orase-xml.php', function(res) {
            //     var body = '';
            //     res.on('data', function(chunk) {
            //       body += chunk;
            //     });
            //     res.on('end', function() {
            //       console.log(body);
            //     });
            // })
            let urls = await RSSUrl.find()
            const rssItemExisting = await RSSItems.find()
            urls.forEach(async urlData => {
                if (urlData.url) {
                    let feed = await parser.parseURL(urlData.url);
                    feed.items.forEach(async item => {
                        const itemAlreadyExists = rssItemExisting.find(v => JSON.stringify(v.guid) === JSON.stringify(item.guid) && 
                            JSON.stringify(v.url) === JSON.stringify(urlData.url))
                            if (!itemAlreadyExists) {
                                const newItem = new RSSItems({
                                    url: urlData.url,
                                    xml: item.content,
                                    guid: item.guid,
                                    pubDate: item.pubDate
                                })

                                try {
                                    const newItemAdded = await newItem.save()
                                    console.log('Added new item in db: ', newItemAdded)
                                } catch (err) {
                                    console.log(err.message)
                                }
                            }
                    });
                }
            })
    })();
}, 100000);

