const mongoose = require('mongoose')

const rssUrl = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        default: ""
    },
    title: {
        type: String,
        required: false,
        default: ""
    },
    description: {
        type: String,
        required: false,
        default: ""
    }
}, {
    timestamps: true,
    collection: 'RSSUrl'
}

)

module.exports = mongoose.model('RSSUrl', rssUrl)