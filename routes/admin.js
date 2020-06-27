const admin = require('express').Router();

admin.post('/college', require('./actions/admin/createcoll'));
admin.get('/getcollege', require('./actions/admin/getcollege'));
admin.get('/getbyid/:id', require('./actions/admin/getbyid'));
admin.get('/getoday', require('./actions/admin/getoday'));
admin.put('/reset', require('./actions/admin/reset'));
admin.get('/getall', require('./actions/admin/getAll'));
admin.put('/updates/:id', require('./actions/admin/updatebyid'));
admin.get('/rank', require('./actions/admin/getrank'));
admin.get('/getallusers', require('./actions/admin/getalluser'));
admin.delete('/deleteuser/:id', require('./actions/admin/deleteuser'));
admin.post('/createcoll', require('./actions/admin/createcoll'));
admin.post('/adduser', require('./actions/admin/adduser'));
module.exports = admin;