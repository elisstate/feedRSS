
const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    pass: {
        type: String,
        minlength: 2,
        required: true
    }
}, {
    timestamps: true,
    collection: 'Users'
})

module.exports = mongoose.model('Users', userSchema)