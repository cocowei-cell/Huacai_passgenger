const User = require('express').Router();

User.post('/register', require('./actions/user/register'));
User.get('/findUser', require('./actions/user/findUser'));
User.put('/modifynick', require('./actions/user/modifynick'));
User.post('/apply', require('./actions/user/apply'));
User.post('/modifypass', require('./actions/user/modifypass'));
User.get('/getactions', require('./actions/user/getactions'));
module.exports = User;