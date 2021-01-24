const express = require('express')
const router = express.Router()
const RSSUrl = require('../dbmodel/RSSUrl')
const RSSToUsers = require('../dbmodel/RSSToUsers')
const RSSItems = require('../dbmodel/RSSItems')
let Parser = require('rss-parser');
let parser = new Parser();

const mongo = require('mongodb')

// Get all RSS Urls
router.get('/', async (req, res, next) => {
    return getAllUrls(req, res, next)
})

// Get one url
// router.get('/:id', getRssUrl, (req, res) => {
//     res.json(res.rssUrl)
// })

router.get('/:userId', async (req, res) => {
    try {
        const rssToUsers = await RSSToUsers.find({userId: req.params.userId}).populate('rssUrlId')
        const data = await Promise.all(rssToUsers.map(async v => await RSSItems.find({url: v.rssUrlId.url})))
        const toSend = rssToUsers.map((v, index) => ({info: v.rssUrlId, items: data[index]}))
        return res.json(toSend)
    } catch(err) {
        res.status(500).json(err.message)
    }
})


//Add url
router.post('/', async (req, res) => {

    parser.parseURL(req.body.url).then(feed => {
        const newUrl = new RSSUrl({
            url: req.body.url,
            title: feed.title,
            description: feed.description
        });
        try {
            newUrl.save().then(rssUrl => {
                RSSToUsers.create({
                    userId: req.body.userId,
                    rssUrlId: rssUrl._id
                })
                return res.status(200).json({message: 'Feed RSS added!'})
            })
  
        } catch (err) {
            return res.status(500).json({message: err.message})
        }
    })
})

async function getAllUrls(req, res, next) {
    try {
        const rssUrls = await RSSUrl.find()
        return res.json(rssUrls)
    } catch (err) {
        res.status(500).json(err.message)
    }
    next()
}

async function getRssUrl(req, res, next) {
    try {
        rssurl = await RSSUrlModel.findById(req.params.id)
        if (rssurl == null) {
            return res.status(404).json({
                message: 'Cant find parking spot!'
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

    res.rssUrl = rssurl
    next()
}

module.exports = {
    router
}
