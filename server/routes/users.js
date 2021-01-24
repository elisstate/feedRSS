const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('../config')
const verifyToken = require('../token')

const router = express.Router()
const User = require('../dbmodel/Users')
const mongoose = require('mongoose')
const ObjectID = mongoose.Types.ObjectId
const mongo = require('mongodb')
const {signin} = require('../middleware/authJwt')

// Login: find user and return it or insert new user
router.post('/login', async (req, res) => {
    try {
        return signin(req, res)
    } catch (err) {
        return res.status(500).json({message: 'Server error. Please try again.'});
    }
});

router.post('/create', async (req, res) => {
    try {
        return signup(req, res)
    } catch (err) {
        return res.status(500).json({message: 'Server error. Please try again.'});
    }
});

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

module.exports = router