
const keys = require('../keys/keys');


let mongoURI =keys.mongoURI,
    googleClientID = keys.googleClientID,
    googleClientSecret = keys.googleClientSecret


module.exports = {
    mongoURI,
    googleClientID,
    googleClientSecret,
}