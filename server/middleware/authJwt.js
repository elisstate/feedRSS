const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config.js");
const User = require('../dbmodel/Users')
const RSSToUsers = require('../dbmodel/RSSToUsers')

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};
signin = (req, res) => {
    console.log(req.body.body.email)
    User.findOne({
            email: req.body.body.email
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.body.pass,
                user.pass
              );


            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            res.status(200).send({
                id: user.id,
                email: user.email,
                accessToken: token
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

signup = (req, res) => {
    console.log(req.body.body.email)
    User.create({
        email: req.body.body.email,
        pass: bcrypt.hashSync(req.body.body.pass, 8)
    })
        .then(user => {
            Promise.all([
                RSSToUsers.create({
                    userId: user.id,
                    rssUrlId: '600433807e3140b81d05767a'
                }),
                RSSToUsers.create({
                    userId: user.id,
                    rssUrlId: '6004a00920e00e8b06ff3ee0'
                }),

            ]).then(() => {
                res.send({ message: "User was registered successfully!", newUser: 'OK'});
            })
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};


const authJwt = {
    verifyToken: verifyToken,
    signin: signin,
    signup: signup
};
module.exports = authJwt;