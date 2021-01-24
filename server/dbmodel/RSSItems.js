const mongoose = require('mongoose')

const rssItems = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        default: ""
    },
    xml: {
        type: String,
        required: true,
        default: ""
    },
    pubDate: {
        type: Date,
        required: false,
        default: ""
    },
    guid: {
        type: String,
        required: true,
        default: ""
    }
}, {
    timestamps: true,
    collection: 'RSSItems'
}

)

module.exports = mongoose.model('RSSItems', rssItems)