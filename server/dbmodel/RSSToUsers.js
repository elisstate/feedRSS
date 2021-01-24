
const mongoose = require('mongoose')
const rssToUsers = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    rssUrlId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RSSUrl"
    }
}, {
    timestamps: true,
    collection: 'RSSToUsers'
})

module.exports = mongoose.model('RSSToUsers', rssToUsers)